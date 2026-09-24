<div align="center">

# <img src="https://api.iconify.design/tabler:repeat.svg?color=%23ff6b6b&width=40" width="34" style="vertical-align:middle" /> Rentify

**Why buy it when you can rentify it? A peer-to-peer rental platform landing experience, built for CC106**

<img src="https://img.shields.io/badge/status-coursework-ff6b6b?style=for-the-badge" />
<img src="https://img.shields.io/badge/course-CC106-1a2440?style=for-the-badge" />

<br />

<img src="https://skillicons.dev/icons?i=html,css,js" />

<br />

<img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=googlefonts&logoColor=white" />

<br />

<p>
  <a href="https://retlify-v2-g8.netlify.app/pages/index.html">Live Demo</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#pages">Pages</a> &middot;
  <a href="#tech-stack">Tech Stack</a>
</p>

</div>

<br />

> This repository mirrors the live deployment. The original local project files were no longer available, so this copy was recovered directly from the deployed site. Frontend only, the rent/lend/sign-in actions are UI only and are not wired to a real backend.

Rentify is a concept landing page for a peer-to-peer rental marketplace, connecting people who need to rent an item with people willing to lend theirs, instead of buying something they'll use once.

## Live Demo

**[retlify-v2-g8.netlify.app](https://retlify-v2-g8.netlify.app/pages/index.html)**

## Features

- **Animated gradient hero** with a dual call to action, "I Want to Rent" and "I Want to Lend"
- **Trusted-by marquee**, an auto-scrolling row of company logos for social proof
- **How It Works accordion**, a 4-step expandable breakdown of the rental flow
- **Responsive navbar** with a mobile hamburger menu
- Dedicated **About** and **Sign In** pages

## Pages

| Page | Path |
|---|---|
| Landing | `pages/index.html` |
| About | `pages/about.html` |
| Sign In / Auth | `pages/auth.html` |

## Tech Stack

Plain HTML5, CSS3, and vanilla JavaScript, no framework or build step. Icons from Font Awesome, type set in Poppins via Google Fonts.

```
assets/
  images/logos/   brand and partner logos
  scripts/        main.js, auth.js, auth-check.js
  styles/         base.css, layout.css, landing.css, auth.css
pages/
  index.html      landing page
  about.html
  auth.html
```

## Course Context

Built as a frontend project for **CC106**. Deployed on Netlify.
