import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/sessions', label: 'Sessions', icon: '💬' },
  { path: '/chat', label: 'New Chat', icon: '➕' },
  { path: '/documents', label: 'Documents', icon: '📁' },
  { path: '/tools', label: 'Tools', icon: '🔧' },
]

export default function Sidebar({ profileName }: { profileName: string }) {
  return (
    <div className="w-64 bg-gradient-to-b from-primary-800 to-primary-900 min-h-screen p-4 text-white">
      <div className="mb-8">
        <h1 className="text-xl font-bold">My Doctor AI</h1>
        <p className="text-primary-300 text-sm mt-1">Welcome, {profileName}</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-200 hover:bg-primary-700/50'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-primary-700/30 rounded-lg">
          <p className="text-sm text-primary-200">AI Status</p>
          <p className="text-primary-400 font-medium">Ready</p>
        </div>
      </div>
    </div>
  )
}