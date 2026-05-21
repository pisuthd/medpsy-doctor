import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BLUE = '#1A1AE8'
const NAVY = '#0a0a5c'
const MUTED = '#9999bb'

const monoFont = "'Space Mono', monospace"
const sansFont = "'DM Sans', sans-serif"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: monoFont, fontSize: 11, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </p>
  )
}

export default function Settings() {
  const [ctxSize, setCtxSize] = useState(4096)
  const [isReloading, setIsReloading] = useState(false)
  const [reloadError, setReloadError] = useState('')
  const navigate = useNavigate()

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await window.api.settings.get()
        setCtxSize(settings.ctx_size)
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
    loadSettings()
  }, [])

  const handleCtxSizeChange = async (newSize: number) => {
    setCtxSize(newSize)
    try {
      await window.api.settings.setCtxSize(newSize)
    } catch (error) {
      console.error('Failed to save ctx_size:', error)
    }
  }

  const handleReloadModel = async () => {
    setIsReloading(true)
    setReloadError('')
    
    try {
      const result = await window.api.ai.reload()
      if (result.success) {
        // Model reloaded successfully, navigate to chat
        navigate('/chat')
      } else {
        setReloadError(result.error || 'Failed to reload model')
      }
    } catch (error) {
      setReloadError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsReloading(false)
    }
  }

  return (
    <div style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
      <SectionLabel>Model Settings</SectionLabel>
      <h1 style={{ fontFamily: sansFont, fontSize: 28, fontWeight: 300, color: NAVY, margin: '0 0 32px 0', lineHeight: 1.2 }}>
        <strong style={{ fontWeight: 500 }}>AI</strong> Configuration
      </h1>

      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: sansFont, fontSize: 14, color: MUTED, marginBottom: 16 }}>
          Context size determines how much conversation history the AI can process. Higher values allow for longer conversations but use more memory.
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          {[2048, 4096, 8192].map((size) => (
            <button
              key={size}
              onClick={() => handleCtxSizeChange(size)}
              style={{
                padding: '12px 24px',
                background: ctxSize === size ? BLUE : '#fff',
                color: ctxSize === size ? '#fff' : NAVY,
                border: ctxSize === size ? 'none' : '1px solid #e0e0f0',
                borderRadius: 8,
                fontFamily: monoFont,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {size} tokens
            </button>
          ))}
        </div>

        <p style={{ fontFamily: sansFont, fontSize: 12, color: MUTED, marginTop: 12 }}>
          Current: {ctxSize} tokens
          {ctxSize === 2048 && ' (Lightweight, faster)'}
          {ctxSize === 4096 && ' (Balanced)'}
          {ctxSize === 8192 && ' (Extended)'}
        </p>
      </div>

      {/* Reload Model Button */}
      <div>
        <p style={{ fontFamily: sansFont, fontSize: 14, color: MUTED, marginBottom: 16 }}>
          After changing context size, reload the model to apply the new setting.
        </p>
        
        {reloadError && (
          <div
            style={{
              padding: '12px 16px',
              background: '#fff0f0',
              border: '1px solid #ffcccc',
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <p style={{ fontFamily: monoFont, fontSize: 11, color: '#cc0000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Error
            </p>
            <p style={{ fontFamily: sansFont, fontSize: 13, color: '#660000', margin: 0 }}>
              {reloadError}
            </p>
          </div>
        )}
        
        <button
          onClick={handleReloadModel}
          disabled={isReloading}
          style={{
            padding: '12px 24px',
            background: isReloading ? MUTED : BLUE,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontFamily: monoFont,
            fontSize: 12,
            fontWeight: 500,
            cursor: isReloading ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.2s',
          }}
        >
          {isReloading ? 'Reloading...' : 'Reload Model'}
        </button>
      </div>
    </div>
  )
}
