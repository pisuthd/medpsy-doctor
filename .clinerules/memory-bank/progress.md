# Progress

## What Works
- [x] Project scaffold initialized (electron-vite template)
- [x] Electron main process structure
- [x] React renderer with TypeScript
- [x] IPC communication setup
- [x] Development mode with HMR
- [x] TailwindCSS 4.x configured
- [x] Framer Motion installed for animations
- [x] @dnd-kit installed for drag & drop
- [x] React Router with HashRouter (Electron-compatible)
- [x] Loading screen with new design
- [x] Profile selector with contextual forms
- [x] Main layout with sidebar navigation
- [x] Dashboard, Sessions, Chat, Documents, Tools pages
- [x] Profile persistence with IPC (local JSON file)
- [x] **Phase 2** Complete UI redesign with design system
- [x] **Phase 2.1** Fixed sidebar to be sticky
- [x] **Phase 2.2** Sidebar labels, Chat session dropdown, Dashboard hero
- [x] **Phase 3** QVAC AI model loading with download support
- [x] **Phase 3.1** Fire-and-forget model loading, simplified uptime
- [x] **Phase 4** Sessions + Chat + AI integration
- [x] **Phase 4.1** Model loading on startup, LoadingScreen simplified
- [x] **Phase 4.2** ProfileContext for global state, session dropdown fix
- [x] **Phase 4.3** Thinking box above response, trim leading \n
- [x] **Phase 4.4** Session delete/clear functionality
- [x] **Phase 5** Documents storage + AI tools
- [x] **Phase 5.1** Documents page with drag & drop, OCR support
- [x] **Phase 5.2** Tools persistence + system prompt for AI
- [x] **Phase 5.3** Tool call handling loop (like everclaw)
- [x] **Phase 5.4** Fix profile for documentsStore in tool calls
- [x] **Phase 6** Settings page + LoadingScreen reload
  - [x] Settings page with side-tab layout (AI, Tools, About)
  - [x] ctx_size selector (2048, 4096, 8192)
  - [x] LoadingScreen error state with reload button
  - [x] settingsStore for persistent settings
- [x] **Phase 6.1** Simplify nav + model reload
  - [x] Remove Documents and Tools from sidebar (simplified nav)
  - [x] Add model reload IPC handler (ai:reload)
  - [x] Reload Model button in Settings page
  - [x] Navigate to Chat after successful reload
- [x] **Phase 7** Cleanup & UI improvements
  - [x] **Phase 7.1** Profile context in system prompt
  - [x] **Phase 7.2** Remove menubar, tools from prompt, simplify Settings
  - [x] **Phase 7.3** Add Free & Open Source card on Dashboard

## What's Left to Build
- [ ] RAG implementation with embeddings (future)

## Current Status
- Phase 7 complete - cleanup and UI polish done
- Model loads on app startup (download + load)
- Documents page with drag & drop, OCR, quick notes
- Tool system exists but tools removed from prompts (Phase 7.2)
- Simplified navigation: Chat, Dashboard, Sessions, Settings
- Free & Open Source card on Dashboard
- Profile context passed to AI for personalized responses

## Known Issues
- None identified

## AI Model Configuration
- **Model file**: `medpsy-1.7b-q4_k_m-imat.gguf`
- **Download URL**: `https://github.com/pisuthd/medpsy-doctor/releases/download/v.0.1.0/medpsy-1.7b-q4_k_m-imat.gguf`
- **Storage**: `{userData}/medpsy-1.7b-q4_k_m-imat.gguf`
- **GitHub**: Ignored via `.gguf` pattern

## Rebrand (2026-05-21)
- Rebranded from MyDoctorAI to MedPsy Doctor
- Updated GitHub URLs to medpsy-doctor repo
- README rewritten with QVAC MedPsy SEO focus
- References Tether AI launch (May 2025)

## Navigation Structure
- **Chat** - Main chat interface with AI
- **Dashboard** - Hero section with stats, Free & Open Source card, Start Chatting button
- **Sessions** - Table list of conversations
- **Settings** - AI Configuration (ctx_size selector, Reload Model button)

## System Prompt
- Profile context included: name, type, age, gender
- Tools section removed (Phase 7.2)

## Evolution of Project Decisions
- 2026-05-20: Project scaffolded using electron-vite template
- 2026-05-20: Phase 1 - Built all UI page components
- 2026-05-20: Phase 1.1 - Added default Electron menu
- 2026-05-20: Phase 1.2 - UI redesign
- 2026-05-20: Phase 1.3 - Profile persistence with IPC
- 2026-05-20: Phase 2 - Complete UI redesign with design system
- 2026-05-20: Phase 2.1 - Fixed sidebar to be sticky
- 2026-05-20: Phase 2.2 - Sidebar labels, Chat dropdown, Dashboard hero
- 2026-05-20: Phase 3 - QVAC AI model loading with download support
- 2026-05-20: Phase 3.1 - Fire-and-forget model loading, simplified uptime
- 2026-05-20: Phase 4 - Sessions + Chat + AI integration
- 2026-05-20: Phase 4.1 - Model loading on startup, LoadingScreen simplified
- 2026-05-20: Phase 4.2 - ProfileContext, session dropdown fix, new session modal
- 2026-05-20: Phase 4.3 - Thinking box above response, trim leading \n
- 2026-05-20: Phase 4.4 - Session delete/clear functionality
- 2026-05-20: Phase 5 - Documents storage with JSON + AI tools
- 2026-05-20: Phase 5.1 - Documents page with OCR, notes
- 2026-05-20: Phase 5.2 - Tools persistence + system prompt
- 2026-05-20: Phase 5.3 - Tool call handling loop (like everclaw)
- 2026-05-20: Phase 5.4 - Set profile for documentsStore in tool calls
- 2026-05-20: Phase 6 - Settings page + LoadingScreen reload
- 2026-05-21: Phase 6.1 - Simplified nav + model reload
- 2026-05-21: Phase 7.1 - Profile context in system prompt
- 2026-05-21: Phase 7.2 - Remove menubar, tools from prompt, simplify Settings
- 2026-05-21: Phase 7.3 - Add Free & Open Source card on Dashboard