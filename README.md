# SwapStyle — Clothing Exchange & Swap Marketplace

SwapStyle is a React single-page demo marketplace for listing clothing, comparing estimated barter values, and coordinating clothing swaps.

## Project guide

- [Project guide (Word)](./docs/SWAPSTYLE_PROJECT_GUIDE.docx)
- [Project guide (PDF)](./docs/SWAPSTYLE_PROJECT_GUIDE.pdf)
- [Guide source (HTML)](./docs/SWAPSTYLE_PROJECT_GUIDE.html)

The guide describes the project as currently implemented, including setup, architecture, demo features, valuation rules, and prototype limitations.

## Run locally

Requirements: Node.js `^20.19.0` or `>=22.12.0` and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Available commands

```powershell
npm run dev      # Start the Vite development server
npm run lint     # Run Oxlint
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

The application currently uses sample data and browser `localStorage`; it does not connect to a backend database or provide production authentication.
