# DuoAudio Landing Page 🎧✨

An award-winning, futuristic dark-mode product landing page for **DuoAudio** — a lightweight, open-source Windows 11 utility that duplicates system audio so two people can listen together using two separate pairs of Bluetooth earbuds or headphones at the exact same time.

Designed with an aesthetic inspired by **Linear**, **Raycast**, and **Apple**, featuring glassmorphic design, smooth 3D tilt interactions, and dynamic soundwave visualizations.

---

## 🌟 Key Features of the Landing Page

- **Sticky Glassmorphic Navbar:** 4-bar animated soundwave logo, section anchors, GitHub star badge, and glowing Windows 11 download trigger.
- **Unified 3D Stage / Cockpit Hero:**
  - Shimmering pill badge (`✨ DuoAudio v1.0.2 is live • Zero Setup Required`)
  - Framer Motion 3D mouse-tilt parallax effect (`useMotionValue`, `useTransform`, `useSpring`)
  - Centerpiece 3D hardware render of laptop running DuoAudio with floating earbuds
  - Ambient radial glow orbs in Electric Blue (`#3B82F6`) and Neon Purple (`#8B5CF6`)
  - Floating status badges: `Airdopes 161 • Connected • 49% vol` and `realme Buds T310 • Connected • 88% vol`
- **Live Interactive Audio Equalizer:**
  - Interactive simulator toggling synchronized dual-channel stereo output
  - Sample-accurate real-time pulsing frequency bars
  - Track switcher (Cinematic Film Score, Lo-Fi Beats, Acoustic Session)
  - Low-latency synchronized dual playback status
- **Problem vs. Solution Bento Grid:**
  - Explains the Windows single-endpoint limitation, earbud splitting downsides, and fragile virtual cables
  - Highlights DuoAudio's dual WASAPI streams, automatic routing, and Silent Room Guarantee
- **6 Interactive Bento Cards:**
  1. *Zero-Configuration Routing* with auto endpoint reversion
  2. *Silent Room Guarantee* with live speaker hardware mute guard toggle
  3. *Independent Volume Controls* with real interactive draggable sliders
  4. *Low-Latency WASAPI Core* (16-bit / 48 kHz linear PCM, sub-10ms overhead)
  5. *100% Offline & Private* (zero network telemetry, MIT licensed)
  6. *Clean C++ COM Helper* (`duoaudio_endpoint.exe` with `IPolicyConfig`)
- **How It Works 3-Step Timeline:**
  - Interactive step cards illustrating Bluetooth pairing, output selection, and 1-click stream activation
- **Architecture Systems Deep Dive (For Engineers & Recruiters):**
  - Interactive tabbed code explorer with syntax-highlighted snippets for:
    - `WASAPI Loopback Capture` (`AUDCLNT_STREAMFLAGS_LOOPBACK`)
    - `C++ COM Helper` (`IPolicyConfig::SetDefaultEndpoint`)
    - `PCM Frame Conversion & Rate Pacing` (uniform 20ms Float32 frames with 10ms high-resolution timer pacing)
    - `Decoupled Electron Supervisor` (Node.js 22 + Electron 33 lifecycle supervisor)
- **Real Desktop Application Showcase:**
  - High-resolution frame featuring `screenshot-main.png` with interactive hotspot callouts
- **Interactive FAQ Accordion:**
  - Answers questions on AirPods/Galaxy Buds support, Windows 11 architecture, zero antivirus false-positives, and latency
- **High-Impact Download Banner:**
  - Direct download for `DuoAudio Setup 1.0.2.exe` (110.39 MB)
  - 1-click SHA-256 Checksum copy button with celebration confetti burst (`canvas-confetti`)
- **Footer:**
  - Open source repository links, MIT license, release notes, and developer credits to Divyanshu Kumar

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation & Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Confetti Celebration:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment Targets:** Vercel, GitHub Pages, Netlify

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to preview in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized static bundle will be built in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📦 DuoAudio Release Metadata

- **Current Version:** `v1.0.2`
- **Installer:** `DuoAudio Setup 1.0.2.exe` (110.39 MB)
- **Target OS:** Windows 11 (64-bit)
- **SHA-256 Checksum:** `64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25`
- **Official Repository:** [https://github.com/Divyanshu0902/DuoAudio](https://github.com/Divyanshu0902/DuoAudio)
- **Developer:** Divyanshu Kumar
- **License:** MIT
