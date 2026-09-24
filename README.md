# Page to Markdown Chrome Extension

A simple Chrome extension that converts selected text on webpages to Markdown format, using the Turndown library for reliable HTML-to-Markdown conversion.

## Installation

1. Ensure you have `icon-master.png` (1024x1024) in the project root
2. Build the extension: `npm run build`
3. Open Google Chrome
4. Navigate to `chrome://extensions/`
5. Enable "Developer mode" using the toggle in the top right corner
6. Click the "Load unpacked" button
7. Select the `dist` directory (the folder containing the built files)
8. The extension will now appear in your extensions list

## Development

- `npm run dev` - Build in watch mode for development
- `npm run build` - Build the extension for production

## Usage

1. Navigate to any webpage
2. Select the text you want to convert to Markdown
3. Click the Page to Markdown extension icon in your browser toolbar
4. Click "Convert Selection" button
5. The Markdown version will appear in the popup
6. Click "Copy to Clipboard" to copy the result

## Features

- Converts HTML formatting to Markdown:
  - Headers (h1-h6)
  - Bold and italic text
  - Links and images
  - Code blocks and inline code
  - Lists (ordered and unordered)
  - Blockquotes
  - Line breaks and paragraphs

## Files

- `manifest.json` - Extension configuration
- `content.js` - Content script that handles text selection and conversion (uses Turndown)
- `popup.html` - Popup interface HTML and CSS
- `popup.js` - Popup interface logic
- `icon-master.png` - Master icon file (1024x1024) - required for build
- `generate-icons.js` - Script to resize master icon to required sizes
- `vite.config.js` - Vite build configuration
- `package.json` - Node.js dependencies and scripts
- `dist/` - Built extension files (load this directory in Chrome)

## Development

This extension uses Manifest V3 and works on all websites. It uses the Turndown library for HTML-to-Markdown conversion. To modify the conversion logic, you can customize the Turndown service options in `content.js`.