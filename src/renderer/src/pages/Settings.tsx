import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BLUE = '#1A1AE8'
const TEAL = '#3EC4C0'
const NAVY = '#0a0a5c'
const MUTED = '#9999bb'
const LIGHT_BLUE = '#f7f7fc'

const monoFont = "'Space Mono', monospace"
const sansFont = "'DM Sans', sans-serif"

type Tab = 'ai' | 'about'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: monoFont, fontSize: 11, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </p>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('ai')
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

  const tabs: { id: Tab; label: string }[] = [
    { id: 'ai', label: 'AI Settings' },
    { id: 'about', label: 'About' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      {/* Side Tab Navigation */}
      <div
        style={{
          width: 200,
          borderRight: '1px solid #e0e0f0',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px',
              border: 'none',
              borderRadius: 8,
              background: activeTab === tab.id ? LIGHT_BLUE : 'transparent',
              color: activeTab === tab.id ? BLUE : NAVY,
              fontFamily: sansFont,
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 500 : 400,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        {/* AI Settings Tab */}
        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
                {ctxSize === 2048 && ' (Lightweight, faster) - Lower context window.'}
                {ctxSize === 4096 && ' (Balanced) - Default setting.'}
                {ctxSize === 8192 && ' (Extended) - Requires more memory.'}
              </p>
            </div>

            {/* Reload Model Button */}
            <div style={{ marginBottom: 24 }}>
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

            <div
              style={{
                padding: 20,
                background: LIGHT_BLUE,
                borderRadius: 8,
                borderLeft: `3px solid ${TEAL}`,
              }}
            >
              <p style={{ fontFamily: sansFont, fontSize: 13, color: MUTED, margin: 0 }}>
                <strong>Note:</strong> Reloading the model will apply your new context size setting. The app will navigate to Chat when ready.
              </p>
            </div>
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionLabel>Application</SectionLabel>
            <h1 style={{ fontFamily: sansFont, fontSize: 28, fontWeight: 300, color: NAVY, margin: '0 0 32px 0', lineHeight: 1.2 }}>
              <strong style={{ fontWeight: 500 }}>About</strong> MedPsy Doctor
            </h1>

            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: sansFont, fontSize: 20, fontWeight: 500, color: NAVY, margin: '0 0 8px 0' }}>
                MedPsy Doctor
              </h2>
              <p style={{ fontFamily: monoFont, fontSize: 12, color: MUTED, margin: 0 }}>
                Version 1.0.0-beta.1
              </p>
            </div>

            <p style={{ fontFamily: sansFont, fontSize: 14, color: MUTED, lineHeight: 1.6, marginBottom: 24 }}>
              A free, open-source desktop application for QVAC MedPsy - the medical language model launched by Tether AI. 
              This app brings on-device AI medical assistance to your computer with privacy-first design.
            </p>

            <div
              style={{
                padding: 20,
                background: LIGHT_BLUE,
                borderRadius: 8,
                borderLeft: `3px solid ${BLUE}`,
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontFamily: sansFont, fontSize: 14, fontWeight: 500, color: NAVY, margin: '0 0 8px 0' }}>
                QVAC MedPsy
              </h3>
              <p style={{ fontFamily: sansFont, fontSize: 13, color: MUTED, margin: 0 }}>
                A cutting-edge medical language model from Tether AI, designed to run directly on devices with limited processing power.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontFamily: sansFont, fontSize: 13, color: MUTED }}>
                <strong>AI Model:</strong> Medpsy-1.7B (GGUF format)
              </p>
              <p style={{ fontFamily: sansFont, fontSize: 13, color: MUTED }}>
                <strong>Context Size:</strong> {ctxSize} tokens
              </p>
              <p style={{ fontFamily: sansFont, fontSize: 13, color: MUTED }}>
                <strong>Framework:</strong> Electron + React
              </p>
            </div>

            <div style={{ marginTop: 32 }}>
              <a
                href="https://github.com/pisuthd/medpsy-doctor"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: BLUE,
                  color: '#fff',
                  fontFamily: sansFont,
                  fontSize: 13,
                  textDecoration: 'none',
                  borderRadius: 8,
                }}
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}