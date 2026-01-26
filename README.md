# FNDM Marketing Sites

Static marketing website for FNDM - the airport gaming app.

## Structure

```
fandom-marketing/
├── index.html          # Main landing page
├── sponsors/
│   └── index.html      # Sponsors/advertisers page
├── css/
│   └── styles.css      # Shared cosmic luxury styles
├── assets/             # Images, screenshots, etc.
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## Tech Stack

- **Pure HTML/CSS/JS** - No build step required
- **No frameworks** - Fast, lightweight, zero dependencies
- **Netlify-ready** - Just deploy and go

## Local Development

### Option 1: Open directly
Just open `index.html` in your browser.

### Option 2: Local server (recommended)
```bash
# Using npx (no install needed)
npx serve .

# Or with Python
python -m http.server 8000

# Or with PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deploy to Netlify

### Option 1: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Log in or create account
3. Drag the entire `fandom-marketing` folder to the deploy dropzone
4. Done! You'll get a random netlify.app URL

### Option 2: Git Deploy (Recommended)
1. Push this folder to a GitHub repo
2. Connect the repo to Netlify
3. Netlify auto-deploys on every push to main

### Option 3: Netlify CLI
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (from this folder)
netlify deploy --prod
```

## DNS Setup

### Main site (fndm.app)
In your DNS provider:
1. Add an A record pointing to Netlify's load balancer
2. Or add a CNAME record pointing to your Netlify site URL

In Netlify:
1. Go to Site settings → Domain management
2. Add custom domain: `fndm.app`
3. Add `www.fndm.app` as an alias (optional)

### SSL
Netlify automatically provisions SSL certificates via Let's Encrypt.

## Pages

### Landing Page (/)
- Hero with CTA to play the app
- How it works (4 steps)
- Features grid
- App preview mockups
- Coming soon teaser (Data Wallet, $FNDM Token)
- Final CTA banner

### Sponsors Page (/sponsors)
- Hero targeting advertisers
- The opportunity stats
- Ad format examples
- Audience snapshot
- Founding sponsors program
- Pricing tiers
- Contact form (Netlify Forms)

## Forms

The sponsors contact form uses Netlify Forms:
- Form submissions are saved in Netlify dashboard
- Email notifications can be configured in Netlify
- No backend required

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --accent-purple: #8b5cf6;
  --accent-blue: #3b82f6;
  --accent-cyan: #06b6d4;
  /* ... */
}
```

### Content
Edit the HTML directly. All text is in the HTML files.

### Images
Add images to `assets/` folder and reference them in HTML.

## Browser Support

- Chrome, Firefox, Safari, Edge (last 2 versions)
- iOS Safari, Android Chrome
- No IE11 support (uses CSS custom properties, backdrop-filter)

## Performance

- No external dependencies
- Minimal CSS (~15KB)
- No JavaScript frameworks
- Images should be optimized before adding

## License

Copyright 2026 FNDM. All rights reserved.
