<div align="center">
  
  <img src="src/assets/images/UTILIFY.png" alt="Utilify Logo" width="220" />
  
  # Utilify
  
  ### *A Premium, Developer-Focused, 100% Client-Side Web Utility Suite*
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Vite Version](https://img.shields.io/badge/Vite-v8.0.9-blue.svg)](https://vite.dev)
  [![React Version](https://img.shields.io/badge/React-v19.2.5-blue.svg)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-v6.0.2-blue.svg)](https://www.typescriptlang.org)
  [![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-success.svg)](#-privacy-first-architecture)

  [Overview](#-overview) • [Key Features](#-key-features) • [Tool Categories](#-tool-categories) • [Tech Stack](#-technology-stack) • [Quick Start](#-quick-start) • [Architecture](#-architecture--design)

</div>

---

## <img src="https://api.iconify.design/lucide:info.svg?color=%233b82f6" height="22" valign="middle" /> Overview

**Utilify** is a professional, high-fidelity browser-based workspace containing over 60 utility tools tailored for developers, designers, and power users. Unlike traditional online utility suites that upload your private files, documents, and credentials to remote servers, **Utilify operates entirely client-side**, guaranteeing absolute data privacy and sub-millisecond execution times.

---

## <img src="https://api.iconify.design/lucide:shield-check.svg?color=%2310b981" height="22" valign="middle" /> Privacy-First Architecture

Utilify processes all files, passwords, images, and data packets locally inside the browser sandbox:
*   **Zero Server Uploads**: No external API endpoints are touched during document parsing, image extraction, or cryptographic functions.
*   **WASM & Web APIs**: Heavy workloads (like OCR text recognition and PDF manipulation) are executed inside isolated Web Workers using compiled WebAssembly binaries.
*   **Blob URLs**: Output buffers and processed files are loaded into local browser memory as Object Blobs, which are automatically revoked upon tab destruction to prevent memory leakage.

---

## <img src="https://api.iconify.design/lucide:list-todo.svg?color=%233b82f6" height="22" valign="middle" /> Key Features

*   **<img src="https://api.iconify.design/lucide:zap.svg?color=%2310b981" height="16" valign="middle" /> Sub-Millisecond Speed**: Runs on React 19 and Vite for lighting-fast component mounts and real-time state changes.
*   **Procedural Step Wizards**: Documents tools (Word to PDF, Word to TXT, etc.) guide users through a clean, stepwise path: **Upload ➔ Convert ➔ Download**.
*   **Two-Column PDF Workspace**: PDF tools (Merger & Splitter) are partitioned into an Input control panel on the left and Output file queues / action controls on the right.
*   **Filename Prompts & Progress Bars**: User-configurable naming dialogs and responsive animated progress loading bars for long-running batches.
*   **Glassmorphic Design**: Clean black, green, white, and blue visual token palette with smooth hover transitions, card glows, and dark-mode support.
*   **Launch History Tracker**: Logs your last 24 launched tools using browser-local storage, letting you quickly re-open tools from the **History** tab.

---

## <img src="https://api.iconify.design/lucide:layout-grid.svg?color=%233b82f6" height="22" valign="middle" /> Tool Categories

Utilify divides its 60+ utilities into dedicated modules:

| Category | Primary Tools | Core Libraries / APIs |
| :--- | :--- | :--- |
| **<img src="https://api.iconify.design/lucide:file-text.svg?color=%233b82f6" height="16" valign="middle" /> Documents & PDF** | Word/Excel/PowerPoint to PDF, PDF Merger & Splitter, Image to PDF, OCR Image-to-Text, ZIP Compressor | `pdf-lib`, `mammoth`, `xlsx`, `jszip`, `tesseract.js` |
| **<img src="https://api.iconify.design/lucide:palette.svg?color=%2310b981" height="16" valign="middle" /> Image & Design** | Background Remover, Favicon Generator, Image Resizer & Compressor, Canvas Logo Generator, Meme Creator | Canvas API, `browser-image-compression` |
| **<img src="https://api.iconify.design/lucide:lock.svg?color=%233b82f6" height="16" valign="middle" /> Security & Crypto**| Hash Generator (MD5, SHA), Password Strength Analyser, IP/VPN Lookup, Local Password Generator | `crypto-js`, `zxcvbn-ts` |
| **<img src="https://api.iconify.design/lucide:code.svg?color=%2310b981" height="16" valign="middle" /> Developer Utilities**| API Tester, JSON Formatter & Validator, Code Minifier (HTML/CSS/JS), Regex Parser, Code Beautifier | `js-beautify`, Fetch API |
| **<img src="https://api.iconify.design/lucide:qr-code.svg?color=%233b82f6" height="16" valign="middle" /> Scanners & Codes** | Barcode/QR Code Generator, Custom QR Styler, Secure Encrypted QR Scanner, vCard Maker | `qrcode.react`, `html5-qrcode` |
| **<img src="https://api.iconify.design/lucide:settings.svg?color=%2310b981" height="16" valign="middle" /> Miscellaneous** | Random Fake Data Generator, Monospace Text Case Converter, Morse Code Translator, Dice/Number Generator | `@faker-js/faker` |

---

## <img src="https://api.iconify.design/lucide:layers.svg?color=%2310b981" height="22" valign="middle" /> Technology Stack

```mermaid
graph TD
    UI[React 19 + Framer Motion] -->|State Management| State[Local State & localStorage]
    UI -->|Actions| Workers[WebAssembly / Web Workers]
    Workers -->|Document Processing| PDF[pdf-lib & Mammoth]
    Workers -->|OCR & Extraction| Tess[Tesseract.js]
    Workers -->|Compression| JSZip[JSZip]
    Workers -->|Parsing| XLSX[xlsx]
    UI -->|Output| Blobs[Local Browser Blob URLs]
```

*   **Build Pipeline**: Vite + TypeScript + ESLint
*   **UI Components**: React 19 (Functional Hooks + Memoization)
*   **Interactions**: Framer Motion 12
*   **Styling**: Raw Vanilla CSS Custom Properties (Tokens)
*   **Core Libraries**: `pdf-lib`, `jszip`, `xlsx`, `tesseract.js`, `mammoth`, `crypto-js`, `qrcode.react`

---

## <img src="https://api.iconify.design/lucide:terminal.svg?color=%233b82f6" height="22" valign="middle" /> Quick Start

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm (v9.0.0 or higher)

### Installation

1.  **Clone the repository** (if setting up on a new environment):
    ```bash
    git clone https://github.com/Mwenda-Boniface/Utilify.git
    cd Utilify
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch the local development server**:
    ```bash
    npm run dev
    ```
    *Open [http://localhost:5173](http://localhost:5173) in your browser.*

4.  **Build production artifacts**:
    ```bash
    npm run build
    ```
    *The optimized build output will be placed in the `/dist` folder.*

---

## <img src="https://api.iconify.design/lucide:file-text.svg?color=%233b82f6" height="22" valign="middle" /> License

This project is open-source software licensed under the **MIT License**. Under this license, you are free to download, modify, distribute, and build upon this codebase for both personal and commercial projects. See the [LICENSE](LICENSE) file for the full terms and conditions.

---

## <img src="https://api.iconify.design/lucide:git-pull-request.svg?color=%2310b981" height="22" valign="middle" /> Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Mwenda-Boniface/Utilify/issues) or submit a pull request.

---

<div align="center">

  ### Utilify • Open Source Utility Suite

  [![GitHub Stars](https://img.shields.io/github/stars/Mwenda-Boniface/Utilify?style=social)](https://github.com/Mwenda-Boniface/Utilify)
  [![GitHub Forks](https://img.shields.io/github/forks/Mwenda-Boniface/Utilify?style=social)](https://github.com/Mwenda-Boniface/Utilify)
  
  <sub>Copyright © 2026 [Mwenda Boniface](https://github.com/Mwenda-Boniface). All rights reserved.</sub>
  
  <sub>Built with <img src="https://api.iconify.design/lucide:heart.svg?color=%23ef4444" height="12" valign="middle" /> locally inside your browser sandbox. 100% Secure. 100% Private.</sub>

</div>
