import { app } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'

export interface Profile {
  id: string
  name: string
  type: 'self' | 'family' | 'doctor' | 'community'
  age?: number
  gender?: 'male' | 'female'
  createdAt: string
}

class ProfileStore {
  private filePath: string
  private profiles: Profile[] = []

  constructor() {
    const userDataPath = app.getPath('userData')
    if (!existsSync(userDataPath)) {
      mkdirSync(userDataPath, { recursive: true })
    }
    this.filePath = join(userDataPath, 'profiles.json')
    this.load()
  }

  private load(): void {
    try {
      if (existsSync(this.filePath)) {
        const data = readFileSync(this.filePath, 'utf-8')
        this.profiles = JSON.parse(data)
      }
    } catch (error) {
      console.error('Failed to load profiles:', error)
      this.profiles = []
    }
  }

  private save(): void {
    try {
      writeFileSync(this.filePath, JSON.stringify(this.profiles, null, 2), 'utf-8')
    } catch (error) {
      console.error('Failed to save profiles:', error)
    }
  }

  getAll(): Profile[] {
    return this.profiles
  }

  add(profile: Omit<Profile, 'id' | 'createdAt'>): Profile {
    const newProfile: Profile = {
      ...profile,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    this.profiles.push(newProfile)
    this.save()
    return newProfile
  }

  remove(id: string): boolean {
    const index = this.profiles.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.profiles.splice(index, 1)
      this.save()
      return true
    }
    return false
  }
}

export const profileStore = new ProfileStore()