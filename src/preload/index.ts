import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  profiles: {
    getAll: () => ipcRenderer.invoke('profiles:getAll'),
    add: (profile: { name: string; type: string; age?: number; gender?: string }) => 
      ipcRenderer.invoke('profiles:add', profile),
    remove: (id: string) => ipcRenderer.invoke('profiles:remove', id),
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}