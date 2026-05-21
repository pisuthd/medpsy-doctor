# Active Context

## Current Work Focus
- Phase 7 complete: Cleanup & UI improvements

## Recent Changes
- Phase 7.1: Profile context in system prompt (name, type, age, gender)
- Phase 7.2: Removed menubar, tools from prompt, simplified Settings page
- Phase 7.3: Added Free & Open Source card on Dashboard above Start Chatting button

## Next Steps
1. Test full app flow
2. Build production package

## Active Decisions and Considerations
- Using QVAC SDK for AI model management
- Model file: medpsy-1.7b-q4_k_m-imat.gguf (local)
- Model loads on app startup with download-if-needed
- Session storage: `{userData}/profiles/{profileSlug}/sessions/{sessionSlug}/messages.json`
- Default session: `main`
- Chat loads/saves messages per session
- ProfileContext provides global profile state
- System prompt only includes profile context (no tools)
- No menubar (removed in Phase 7.2)

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
- Tools removed from system prompt to simplify AI responses
- Simplified Settings page with only ctx_size selector and Reload Model button