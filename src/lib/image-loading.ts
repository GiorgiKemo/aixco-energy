const placeholderSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f9f7f3"/>
      <stop offset="46%" stop-color="#f3eee6"/>
      <stop offset="100%" stop-color="#ded4c5"/>
    </linearGradient>
    <linearGradient id="s" x1="0" x2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="32" height="24" fill="url(#g)"/>
  <path d="M4 18 12 10l5 5 4-4 7 7H4Z" fill="#ad7a2e" opacity="0.18"/>
  <rect x="-10" width="8" height="24" fill="url(#s)" opacity="0.65"/>
</svg>`;

export const imageBlurDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(placeholderSvg)}`;
