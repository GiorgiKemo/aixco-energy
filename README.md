# AIXCO Energy

AIXCO Energy renewable infrastructure website built with React, Vite, and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Custom Domain

This repo is configured for GitHub Pages at `energy.aixco.global` through `public/CNAME`.

To finish the domain connection, add this DNS record where `aixco.global` is managed:

```text
Type: CNAME
Name: energy
Value: GiorgiKemo.github.io
```

After DNS propagates, set the GitHub Pages custom domain for `GiorgiKemo/aixco-energy` to `energy.aixco.global` and enforce HTTPS.
