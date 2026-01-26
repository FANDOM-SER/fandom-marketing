// FNDM Marketing Site Tracking
// Captures UTM params and tracks funnel events

(function() {
  'use strict';

  // Configuration
  const API_BASE = 'https://fndm-backend.onrender.com/api';
  const VISITOR_ID_KEY = 'fndm_visitor_id';
  const UTM_PARAMS_KEY = 'fndm_utm_params';
  const FIRST_VISIT_KEY = 'fndm_first_visit';

  // Generate a unique visitor ID
  function generateVisitorId() {
    return 'v_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Get or create visitor ID
  function getVisitorId() {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  }

  // Parse UTM params from URL
  function parseUtmParams() {
    const params = new URLSearchParams(window.location.search);
    const utm = {};

    if (params.get('utm_source')) utm.utmSource = params.get('utm_source');
    if (params.get('utm_medium')) utm.utmMedium = params.get('utm_medium');
    if (params.get('utm_campaign')) utm.utmCampaign = params.get('utm_campaign');
    if (params.get('utm_content')) utm.utmContent = params.get('utm_content');
    if (params.get('utm_term')) utm.utmTerm = params.get('utm_term');

    return utm;
  }

  // Store UTM params in localStorage
  function storeUtmParams(utm) {
    if (Object.keys(utm).length > 0) {
      localStorage.setItem(UTM_PARAMS_KEY, JSON.stringify(utm));
    }
  }

  // Get stored UTM params
  function getStoredUtmParams() {
    try {
      const stored = localStorage.getItem(UTM_PARAMS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  // Get first visit timestamp
  function getFirstVisit() {
    let firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
    if (!firstVisit) {
      firstVisit = new Date().toISOString();
      localStorage.setItem(FIRST_VISIT_KEY, firstVisit);
    }
    return firstVisit;
  }

  // Detect device type
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  // Detect browser
  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
    if (ua.includes('Firefox')) return 'firefox';
    if (ua.includes('Edg')) return 'edge';
    return 'other';
  }

  // Send tracking data to API
  async function sendTrackingData(endpoint, data) {
    try {
      await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('Tracking failed:', err.message);
    }
  }

  // Track funnel event
  function trackFunnelEvent(eventType, eventData = {}) {
    const visitorId = getVisitorId();
    const utm = getStoredUtmParams();

    sendTrackingData('/analytics/funnel-event', {
      visitorId,
      eventType,
      eventData,
      ...utm,
      page: window.location.pathname
    });
  }

  // Initialize tracking
  function init() {
    const visitorId = getVisitorId();
    const utmFromUrl = parseUtmParams();
    const storedUtm = getStoredUtmParams();

    // If URL has UTM params, update storage
    if (Object.keys(utmFromUrl).length > 0) {
      storeUtmParams(utmFromUrl);
    }

    // Use URL params first, fall back to stored
    const utm = Object.keys(utmFromUrl).length > 0 ? utmFromUrl : storedUtm;
    getFirstVisit();

    // Record visitor session
    sendTrackingData('/analytics/visitor', {
      visitorId,
      ...utm,
      referrer: document.referrer || null,
      landingPage: window.location.pathname,
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      browser: getBrowser()
    });

    // Track landing page view
    trackFunnelEvent('landing_page_view', { page: window.location.pathname });
  }

  // Track CTA clicks
  function trackCtaClick(destination) {
    trackFunnelEvent('cta_click', { destination });
  }

  // Expose to global scope
  window.fndmTracking = {
    trackCtaClick,
    trackFunnelEvent,
    getVisitorId,
    getStoredUtmParams
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
