<<<<<<< HEAD
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
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
>>>>>>> 173fd773768a57c4c8d859048b9c15bfa0987d65
