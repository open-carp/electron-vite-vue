import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('clipboard', {
    readText: () => ipcRenderer.invoke('clipboard:readText'),
    writeText: (text) => ipcRenderer.invoke('clipboard:writeText', text)
})
