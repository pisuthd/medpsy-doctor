import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProfile } from '../context/ProfileContext'

// const BLUE = '#1A1AE8'
const TEAL = '#3EC4C0'
const NAVY = '#0a0a5c'
const MUTED = '#9999bb'
const LIGHT_BLUE = '#f7f7fc'

const monoFont = "'Space Mono', monospace"
const sansFont = "'DM Sans', sans-serif"

interface Session {
  slug: string
  name: string
  createdAt: string
  messageCount: number
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: monoFont, fontSize: 11, letterSpacing: '0.14em', color: MUTED, textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </p>
  )
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

export default function Sessions() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  // Load sessions on mount
  useEffect(() => {
    if (!profile) {
      setLoading(false)
      return
    }

    const loadSessions = async () => {
      try {
        const list = await window.api.sessions.list(profile.id)
        setSessions(list)
      } catch (error) {
        console.error('Failed to load sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [profile])

  const handleSessionClick = (slug: string) => {
    navigate(`/chat?session=${slug}`)
  }

  const handleClearMessages = async (slug: string, name: string) => {
    if (!profile) return
    
    const confirmed = window.confirm(`Clear all messages in "${name}"?`)
    if (!confirmed) return

    try {
      await window.api.sessions.clearMessages(profile.id, slug)
      // Refresh list
      const list = await window.api.sessions.list(profile.id)
      setSessions(list)
    } catch (error) {
      console.error('Failed to clear messages:', error)
    }
  }

  const handleDeleteSession = async (slug: string, name: string) => {
    if (!profile) return
    
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      await window.api.sessions.delete(profile.id, slug)
      // Refresh list
      const list = await window.api.sessions.list(profile.id)
      setSessions(list)
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }

  return (
    <div style={{ padding: '32px', fontFamily: sansFont }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel>Sessions</SectionLabel>
        <h1 style={{ fontFamily: sansFont, fontSize: 28, fontWeight: 300, color: NAVY, margin: 0, lineHeight: 1.2 }}>
          <strong style={{ fontWeight: 500 }}>Your</strong> conversations
        </h1>
      </div>

      {/* Sessions Table */}
      <div style={{ background: '#fff', border: '1px solid #e0e0f0', borderRadius: 8, overflow: 'hidden' }}>
        {/* Teal top accent */}
        <div style={{ height: 3, background: TEAL }} />
        
        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 60px', padding: '12px 16px', background: LIGHT_BLUE, borderBottom: '1px solid #e0e0f0' }}>
          <span style={{ fontFamily: monoFont, fontSize: 10, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase' }}>Conversation</span>
          <span style={{ fontFamily: monoFont, fontSize: 10, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase' }}>Date</span>
          <span style={{ fontFamily: monoFont, fontSize: 10, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase', textAlign: 'right' }}>Messages</span>
          <span style={{ fontFamily: monoFont, fontSize: 10, letterSpacing: '0.12em', color: MUTED, textTransform: 'uppercase', textAlign: 'center' }}>Actions</span>
        </div>

        {/* Table Rows */}
        <div>
          {loading ? (
            <div style={{ padding: 24, textAlign: 'center', color: MUTED }}>
              Loading...
            </div>
          ) : sessions.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: MUTED }}>
              No conversations yet. Start chatting!
            </div>
          ) : (
            sessions.map((session, index) => (
              <motion.div
                key={session.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 140px 100px 60px',
                  padding: '16px',
                  borderBottom: index < sessions.length - 1 ? '1px solid #e0e0f0' : 'none',
                  alignItems: 'center',
                }}
              >
                <div 
                  onClick={() => handleSessionClick(session.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ fontFamily: sansFont, fontSize: 14, color: NAVY, fontWeight: 500 }}>{session.name}</span>
                </div>
                <span style={{ fontFamily: monoFont, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{formatDate(session.createdAt)}</span>
                <span style={{ fontFamily: monoFont, fontSize: 12, color: MUTED, textAlign: 'right' }}>{session.messageCount}</span>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  {/* Clear button - only for main session */}
                  {session.slug === 'main' && (
                    <button
                      onClick={() => handleClearMessages(session.slug, session.name)}
                      title="Clear messages"
                      style={{
                        padding: '6px 10px',
                        background: '#fff',
                        border: '1px solid #e0e0f0',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 11,
                        color: MUTED,
                      }}
                    >
                      Clear
                    </button>
                  )}
                  {/* Delete button - only for non-main sessions */}
                  {session.slug !== 'main' && (
                    <button
                      onClick={() => handleDeleteSession(session.slug, session.name)}
                      title="Delete session"
                      style={{
                        padding: '6px 10px',
                        background: '#fff',
                        border: '1px solid #ffcccc',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 11,
                        color: '#cc4444',
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}