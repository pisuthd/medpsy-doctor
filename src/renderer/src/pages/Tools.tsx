import { useState } from 'react'
import { motion } from 'framer-motion'

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  status: 'available' | 'coming_soon'
}

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: '1',
      name: 'Clinic Scheduling',
      description: 'Schedule appointments with local clinics directly from chat',
      icon: '📅',
      enabled: false,
      status: 'available',
    },
    {
      id: '2',
      name: 'Medication Reminders',
      description: 'Set reminders for taking medications',
      icon: '💊',
      enabled: false,
      status: 'available',
    },
    {
      id: '3',
      name: 'Health Records',
      description: 'Connect to your electronic health records',
      icon: '🏥',
      enabled: false,
      status: 'coming_soon',
    },
    {
      id: '4',
      name: 'Emergency Contacts',
      description: 'Quick access to emergency services and contacts',
      icon: '🚨',
      enabled: false,
      status: 'coming_soon',
    },
  ])

  const toggleTool = (id: string) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id && tool.status === 'available'
          ? { ...tool, enabled: !tool.enabled }
          : tool
      )
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Tools & Integrations</h1>
      <p className="text-gray-500 mb-8">Enable tools to connect with real-world services</p>

      <div className="grid grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
              tool.status === 'coming_soon' ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{tool.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{tool.description}</p>
                  {tool.status === 'coming_soon' && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => toggleTool(tool.id)}
                disabled={tool.status === 'coming_soon'}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  tool.enabled ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    tool.enabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}