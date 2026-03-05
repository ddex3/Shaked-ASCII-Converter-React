# ASCII Converter

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)

A clean, minimal web app for converting text to ASCII codes and ASCII codes back to text - instantly, right in your browser.

## Features

- **Bidirectional conversion** - Convert text to comma-separated ASCII codes, or ASCII codes back to readable text
- **Swap mode** - Toggle between Text-to-ASCII and ASCII-to-Text with one click
- **Dark / Light theme** - Switch themes on the fly (preference saved to localStorage)
- **Copy to clipboard** - One-click copy for the output (or input)
- **Responsive layout** - Works on desktop and mobile screens
- **Zero backend** - Everything runs client-side, no data leaves your browser

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/ddex3/Shaked-ASCII-Converter-React.git
cd Shaked-ASCII-Converter-React

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in your terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

The optimized output is written to the `dist/` directory.

## Usage

1. Type or paste text into the **Text** field - the corresponding ASCII codes appear instantly in the output.
2. Click the swap button to switch to **ASCII-to-Text** mode, then enter comma or space-separated ASCII codes.
3. Use the copy button next to any field to copy its contents, or the trash button to clear the input.

## Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| UI          | React 18, TypeScript             |
| Build       | Vite 6                           |
| Styling     | Custom CSS with CSS variables    |
| Fonts       | Inter, JetBrains Mono            |
| Icons       | Font Awesome 6                   |

## Project Structure

```
├── index.html          # HTML entry point
├── src/
│   ├── main.tsx        # React root
│   ├── App.tsx         # Application component (converter logic, theme, layout)
│   └── styles.css      # All styles (theme variables, responsive)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Support

If you run into a bug or have a feature request, please [open an issue](https://github.com/ddex3/Shaked-ASCII-Converter-React/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by **[@ddex3](https://github.com/ddex3)**
