# Tech Context

## Technologies Used
- **Runtime**: Electron 39.x
- **Frontend**: React 19.2.1, React DOM 19.2.1
- **Styling**: TailwindCSS 4.x, Framer Motion 12.x
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Build Tool**: Vite 7.2.6, electron-vite 5.0.0
- **Language**: TypeScript 5.9.3
- **Bundler**: electron-builder 26.0.12

## Development Setup
- Node.js based project
- Use `npm install` to install dependencies
- Use `npm run dev` for development with HMR
- Use `npm run build:win/mac/linux` for production builds

## Key Dependencies
- `@electron-toolkit/preload`: ^3.0.2
- `@electron-toolkit/utils`: ^4.0.0
- `@vitejs/plugin-react`: ^5.1.1
- `tailwindcss`: ^4.x
- `@tailwindcss/vite`: latest
- `framer-motion`: ^12.x
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`: latest

## Tool Usage Patterns
- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking
- electron-vite for build tooling

## Technical Constraints
- Initial version is UI-only placeholder
- No real AI backend yet (mock data)
- Local storage for profiles and sessions