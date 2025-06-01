# 🧩 FrameKit

A pluggable, modular dashboard shell built with Expo + React (with a special nod to web). Designed to let you plug-n-play your own interface panels, controls, and layouts without reinventing the scaffolding every time. **Unofficially nicknamed: UIKEA — Some Assembly Required.**

---

## 🚀 Quickstart

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npm start
```

> This launches the Expo Dev Server. Once it’s up:

- Press `w` to open the app in your browser (Web is the primary target here).
- Or scan the QR code with Expo Go to test on mobile.

---

## 📁 File Structure

```
.
├── app/                        # Routes, layouts, and AppShell
│   ├── (tabs)/                # Tab-based navigation
│   └── _layout.tsx           # Global layout wrapper
├── assets/                    # Fonts and images
├── components/                # UI primitives & core modules
│   └── ui/                   # Platform-specific UI helpers
├── constants/                 # Theme & constants (e.g. Colors)
├── hooks/                     # Reusable logic hooks (e.g. color schemes, plugin registry)
├── services/                  # Plugin system core
│   └── registration/         # Registerable plugin hooks
├── store/                     # Zustand-based state management
├── supabase/                  # Supabase types and migrations
├── scripts/                   # Project scripts (e.g. reset-project)
├── app.json / appdev.json     # Expo project config
├── architecture.md            # Overview of modular design (read this!)
├── .expo/ / .gitignore / ...  # Project metadata, logs, and environment configs

```

---

## 🧠 Philosophy

FrameKit is built on three pillars:

- 🧩 **Modularity** – Panels, views, and tools are plugins. You bring the logic; FrameKit snaps it into place.
- 🌐 **Web-first** – Built with Expo + React Native Web in mind. It works elsewhere but thrives in the browser.
- 💅 **Minimal opinions** – Comes with basic layout and structure; you control the flow and design.

The goal is to minimize boilerplate while staying completely extendable. Everything's a slot or a service waiting to be wired up.

---

## 🛠 Available Scripts

| Command               | Description                          |
|-----------------------|------------------------------------|
| `npm start`           | Starts the Expo Dev Server          |
| `npm run web`         | Shortcut to open directly in browser |
| `npm run reset-project` | Resets the app/ folder and archives example |

---

## 📚 Learn More

- [Expo Docs](https://docs.expo.dev/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [File-based Routing (Expo Router)](https://expo.github.io/router/docs)
- [Supabase](https://supabase.com/docs)

---

## ✨ Extra Notes

You might need to manually press `w` after running `npm start` to launch the webserver.

If you're not seeing changes, try clearing Metro’s cache with:

```bash
npx expo start -c
```

---

## 🧪 Fun Stuff

- `architecture.md` contains high-level design thoughts and architectural vision.
- UIKEA shows up in internal jokes, dev logs, and whispered source comments.
- Built with love, caffeine, and chronic plugin attachment issues.

---

> FrameKit is a foundation. UIKEA is a vibe. You? You're the architect.


