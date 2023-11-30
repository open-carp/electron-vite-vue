import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('ipcAPI', {
    synchronous: (msg) => ipcRenderer.sendSync('synchronous', msg),
    handleMsg: (msg: string) => ipcRenderer
        .invoke('invoke-handle-message', msg)
})
