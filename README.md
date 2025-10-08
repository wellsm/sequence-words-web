# Sequence Words Frontend

Interactive frontend for the Sequence Words game. Players authenticate, create or join rooms, and play collaborative word rounds while the UI stays in sync with the backend in real time.

## ✨ Features
- Token-based authentication with protected routes and graceful logout.
- Room management flows: create, join, wait for players, and follow the game state.
- Real-time updates using STOMP/WebSocket push notifications.
- Responsive UI built with Tailwind and Radix primitives.
- Seamless navigation powered by TanStack Router.

## 🛠️ Tech Stack
- React 19 + TypeScript
- Vite 7
- TanStack Router & TanStack Query
- Tailwind CSS 4
- Radix UI & shadcn-inspired components
- STOMP.js & SockJS for push updates

## 🚀 Getting Started
1. **Prerequisites**
   - Node.js 20 or newer
   - pnpm 10 or newer (Corepack recommended)
   - The backend service running: [sequence-words-api](https://github.com/well/sequence-words-api)
2. **Clone & install**
   ```bash
   git clone https://github.com/well/sequence-words.git
   cd sequence-words
   pnpm install
   ```
3. **Environment**
   - Copy `.env.example` to `.env` (or create `.env`) and set the API URL (see [🔧 Configuration](#-configuration)).
4. **Start the app**
   ```bash
   pnpm dev
   ```
   Open http://localhost:5173 once the dev server boots.

## 🏗️ Project Structure
```text
src/
├── components/       # UI components (forms, game screens, layout helpers)
├── hooks/            # React Query hooks and domain-specific logic
├── providers/        # Context providers (auth, push updates, theming)
├── routes/           # TanStack Router file-based routes
├── lib/              # Utility modules (API client, helpers, schemas)
└── config/           # Runtime configuration parsing
```

## 🌐 Deployment
- **Static build:** `pnpm build` outputs production assets to `dist/`; serve them with any static file server.
- **Preview:** `pnpm preview` serves the built files locally.
- **Docker:** Use the provided multi-stage `Dockerfile`.
  ```bash
  docker build -t sequence-words-frontend .
  docker run --rm -p 8080:8080 sequence-words-frontend
  ```
  The container uses Caddy to serve the compiled app.

## 🔧 Configuration
- `VITE_API_URL` – base URL of the Sequence Words API (default example: `http://localhost:8080`).

Set these variables in `.env` or via your deployment platform. The frontend expects the API to expose both REST and WebSocket endpoints.

## 🤝 Contributing
Contributions are welcome! Fork the repo, create a feature branch, and submit a pull request. Please open an issue first for major changes so we can align on the approach.

## 📝 License
License information has not been provided yet. If you plan to use this project, please reach out to clarify terms.

## 🆘 Support
Encountered a bug or need help? Open an issue in this repository with detailed reproduction steps. For backend-related issues, check the API project first.

## 🔗 Related Projects
- [sequence-words-api](https://github.com/well/sequence-words-api) – backend REST/WebSocket service consumed by this frontend.
