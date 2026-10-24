# Sree Ranganadha Jewellers

Premium responsive showcase website for Sree Ranganadha Jewellers, built as a modern React application with TypeScript and Vite.

## Architecture

- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Handcrafted typography and luxury palette (Italiana serif, Manrope sans, Noto Serif Telugu)
- **Icons**: Lucide React (`lucide-react`)
- **State**: Reactive local state with browser `localStorage` persistence

## Included Interactions & Features

- Fully bilingual Telugu-first / English-supporting luxury storefront with animated collection filters
- 18 enquiry-ready collection cards across bridal, gold, everyday, silver, gifting, and men's jewellery
- WhatsApp enquiry modal and persistent floating chat button with automatic message composition
- Maps search link based on Kollabazar / M.G. Road address in Vizianagaram
- Refined crest treatment and owner story featuring proprietor portraits
- Owner admin console (passcode: `SRJ2026`) for live editing of business details, brand message, phone number, and collection items
- Local storage syncing with toast notifications and starter content restoration

## Development & Build

```bash
# Start development server
npm run dev

# Run type check
npm run lint

# Build production bundle
npm run build
```

## Admin Access

1. Click **Owner admin** in the footer.
2. Enter starter passcode `SRJ2026`.
3. Update content in the dashboard. Edits persist in local storage.
