# System Patterns

## Architecture Overview
- **Framework**: Electron with electron-vite
- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS with blue theme
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Structure**: Main process / Preload / Renderer separation

## Directory Structure
```
src/
├── main/           # Electron main process
├── preload/        # Context bridge for IPC
└── renderer/       # React frontend
    └── src/
        ├── components/
        │   ├── ProfileSelector/
        │   ├── Dashboard/
        │   ├── Sessions/
        │   ├── Chat/
        │   ├── Loading/
        │   └── DocumentManager/
        ├── pages/
        ├── hooks/
        ├── stores/
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

## Page Structure
1. **LoadingScreen** - Model loading with progress
2. **ProfileSelector** - Profile selection/creation with contextual forms
3. **MainLayout** - Sidebar + Content area
   - **Dashboard** - Health insights, recent chats
   - **Sessions** - Table list of all conversations
   - **Chat** - Conversation interface
   - **Tools** - Enable integrations

## Key Technical Decisions
- Use React Router for page navigation
- State management with Zustand or React Context
- Framer Motion for page transitions and micro-animations
- @dnd-kit for document upload drag & drop

## Design Patterns in Use
- Component-based architecture
- Page-based routing
- Contextual form validation based on profile type

## Component Relationships
- Main process → Preload → Renderer (IPC communication)
- App.tsx manages page routing
- Pages wrap shared layout (Sidebar + Content)