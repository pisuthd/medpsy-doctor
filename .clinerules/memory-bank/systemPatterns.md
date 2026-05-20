# System Patterns

## Architecture Overview
- **Framework**: Electron with electron-vite
- **Frontend**: React 19 + TypeScript
- **Structure**: Main process / Preload / Renderer separation

## Directory Structure
```
src/
├── main/           # Electron main process
├── preload/        # Context bridge for IPC
└── renderer/       # React frontend
    └── src/
        ├── components/
        ├── assets/
        ├── App.tsx
        └── main.tsx
```

## Key Technical Decisions
- [Document key technical decisions here]

## Design Patterns in Use
- [Document design patterns used]

## Component Relationships
- Main process → Preload → Renderer (IPC communication)
- Renderer uses React with component-based architecture

## Critical Implementation Paths
- [Document critical paths]