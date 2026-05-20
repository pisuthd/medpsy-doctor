# Active Context

## Current Work Focus
- Phase 4: Sessions + Chat + AI integration

## Recent Changes
- Phase 4.3: Thinking box above response, trim leading \n
- Phase 4.2: ProfileContext for global state, session dropdown fix, new session modal
- Phase 4.1: Model loading on startup, LoadingScreen simplified
- Chat page with session param support (?session=slug)
- AI streaming with thinking box display
- Session table shows conversations list
- Click session → navigates to chat with session param
- Session dropdown in Chat page header with New Session modal
- Model loads on app startup with download-if-needed

## Next Steps
1. Test chat with AI streaming
2. RAG implementation for document analysis

## Active Decisions and Considerations
- Using QVAC SDK for AI model management
- Model file: medpsy-1.7b-q4_k_m-imat.gguf (local)
- Model loads on app startup with download-if-needed
- Session storage: `{userData}/profiles/{profileSlug}/sessions/{sessionSlug}/messages.json`
- Default session: `main`
- Chat loads/saves messages per session
- ProfileContext provides global profile state (replaces localStorage)

## Important Patterns and Preferences
- Blue gradient theme (Slack-style)
- Component-based page structure
- Phase-by-phase development with Git commits
- IPC handlers for main process communication

## Learnings and Project Insights
- QVAC SDK provides loadModel/unloadModel for local GGUF models
- completion() with stream: true and captureThinking: true for streaming
- Events: contentDelta, thinkingDelta for UI updates
- Model registry persists across app restarts (MODEL_ALREADY_REGISTERED error)
- Model loading should happen once on startup, not triggered by UI
- ProfileContext better than localStorage for profile state