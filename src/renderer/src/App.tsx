import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoadingScreen from './pages/LoadingScreen'
import ProfileSelector from './pages/ProfileSelector'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import Chat from './pages/Chat'
import Documents from './pages/Documents'
import Tools from './pages/Tools'

interface Profile {
  id: string
  name: string
  type: 'self' | 'family' | 'doctor' | 'community'
  age?: number
  gender?: 'male' | 'female'
  createdAt: string
}

function App() {
  const [appState, setAppState] = useState<'loading' | 'profile' | 'main'>('loading')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      const loadedProfiles = await window.api.profiles.getAll()
      setProfiles(loadedProfiles)
    } catch (error) {
      console.error('Failed to load profiles:', error)
    }
  }

  const handleLoadingComplete = () => {
    setAppState('profile')
  }

  const handleProfileSelect = (selectedProfile: Profile) => {
    setProfile(selectedProfile)
    setAppState('main')
  }

  const handleProfileCreate = async (profileData: { name: string; type: 'self' | 'family' | 'doctor' | 'community'; age?: number; gender?: 'male' | 'female' }) => {
    try {
      const newProfile = await window.api.profiles.add(profileData)
      setProfiles((prev) => [...prev, newProfile])
      setProfile(newProfile)
      setAppState('main')
    } catch (error) {
      console.error('Failed to create profile:', error)
    }
  }

  if (appState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (appState === 'profile' || !profile) {
    return <ProfileSelector profiles={profiles} onSelect={handleProfileSelect} onCreateProfile={handleProfileCreate} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout profile={profile} />}>
          <Route index element={<Dashboard />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="chat" element={<Chat />} />
          <Route path="documents" element={<Documents />} />
          <Route path="tools" element={<Tools />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App