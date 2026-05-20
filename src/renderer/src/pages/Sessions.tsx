import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface Session {
  id: string
  title: string
  date: string
  messages: number
  status: 'active' | 'archived'
}

export default function Sessions() {
  const navigate = useNavigate()

  const sessions: Session[] = [
    { id: '1', title: 'Headache and fatigue', date: '2024-05-20', messages: 15, status: 'active' },
    { id: '2', title: 'Chest pain consultation', date: '2024-05-19', messages: 28, status: 'active' },
    { id: '3', title: 'Medication review', date: '2024-05-17', messages: 8, status: 'archived' },
    { id: '4', title: 'Seasonal allergies', date: '2024-05-15', messages: 12, status: 'archived' },
    { id: '5', title: 'Sleep issues', date: '2024-05-10', messages: 22, status: 'archived' },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Sessions</h1>
        <button
          onClick={() => navigate('/chat')}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          New Session
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Title</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Messages</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.map((session, index) => (
              <motion.tr
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{session.title}</td>
                <td className="px-6 py-4 text-gray-500">{session.date}</td>
                <td className="px-6 py-4 text-gray-500">{session.messages}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      session.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate('/chat', { state: { sessionId: session.id } })}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}