# 💝 Parents Anniversary Website

A cinematic 3-phase anniversary website for Dad & Mom's **21st Anniversary**.

---

## 🚀 Setup Instructions

### Step 1 — Install dependencies
Open a terminal inside this folder and run:
```bash
npm install
```

### Step 2 — Add your Photos
Rename and copy your 5 family photos into the `public/images/` folder:

| File Name | Photo |
|---|---|
| `public/images/family1.jpg` | Aquarium selfie (family of 4) |
| `public/images/family2.jpg` | Campus outdoor selfie (matching maroon) |
| `public/images/family3.jpg` | Airport selfie (family of 5 with grandpa) |
| `public/images/family4.jpg` | Temple night festival selfie |
| `public/images/family5.jpg` | Couple selfie at temple (Mom & Dad alone) |

### Step 3 — Add Background Music
Place any `.mp3` file into:
```
public/audio/music.mp3
```
> 💡 **Recommended**: Download a free piano piece from [pixabay.com/music](https://pixabay.com/music/) — search "romantic piano" or "emotional piano". Download and rename it to `music.mp3`.

### Step 4 — Run the website
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 Experience Guide

| Phase | What Happens |
|---|---|
| **Phase 1** | Cinematic scrolling credits with emotional speech (auto-plays, ~75 sec) |
| **Phase 2** | A glowing floating "Click Me ❤️" button roams the screen |
| **Phase 3** | Full-screen panoramic memory gallery with your family photos |

---

## 📁 Project Structure
```
src/
├── app/
│   ├── page.tsx          ← Main orchestrator
│   ├── layout.tsx        ← HTML head / metadata
│   └── globals.css       ← All animations & styles
└── components/
    ├── ParticleCanvas.tsx ← Floating bokeh/star particles
    ├── CreditScroll.tsx   ← Phase 1 cinematic credits (GSAP)
    ├── FloatingButton.tsx ← Phase 2 roaming button (Framer Motion)
    ├── MemoryGallery.tsx  ← Phase 3 photo slideshow
    └── AudioPlayer.tsx    ← Auto-playing background music
```
