import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

interface Profile {
  id: string
  name: string
  type: string
  age?: number
}

export default function MainLayout({ profile }: { profile: Profile }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar profileName={profile.name} />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}