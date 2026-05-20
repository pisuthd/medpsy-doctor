import { motion } from 'framer-motion'
import { useState } from 'react'

type ProfileType = 'self' | 'family' | 'doctor' | 'community'

interface Profile {
  id: string
  name: string
  type: ProfileType
  age?: number
  role?: string
}

export default function ProfileSelector({ onSelect }: { onSelect: (profile: Profile) => void }) {
  const [showForm, setShowForm] = useState(false)
  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const profileTypes = [
    { id: 'self', label: 'Check symptoms for yourself', icon: '👤' },
    { id: 'family', label: 'Check symptoms for family member', icon: '👨‍👩‍👧' },
    { id: 'doctor', label: 'You are a doctor', icon: '👨‍⚕️' },
    { id: 'community', label: 'You are a community leader', icon: '🏘️' },
  ]

  const handleTypeSelect = (type: ProfileType) => {
    setProfileType(type)
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (!name.trim()) return
    const profile: Profile = {
      id: Date.now().toString(),
      name,
      type: profileType!,
      age: profileType === 'self' || profileType === 'family' ? parseInt(age) || undefined : undefined,
    }
    onSelect(profile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Welcome to My Doctor AI</h1>
        <p className="text-gray-500 text-center mb-8">Select or create a profile to continue</p>

        {!showForm ? (
          <div className="space-y-3">
            {profileTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTypeSelect(type.id as ProfileType)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-primary-50 rounded-xl border-2 border-transparent hover:border-primary-400 transition-all flex items-center gap-4"
              >
                <span className="text-3xl">{type.icon}</span>
                <span className="text-gray-700 font-medium">{type.label}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <button onClick={() => setShowForm(false)} className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
              ← Back
            </button>

            <h2 className="text-xl font-semibold text-gray-800">
              {profileTypes.find((t) => t.id === profileType)?.label}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Enter name"
              />
            </div>

            {(profileType === 'self' || profileType === 'family') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Enter age"
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Chat
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}