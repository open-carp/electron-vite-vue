/// <reference types="vite/client" />
declare global {
    interface Window {
        ipcAPI: {
            synchronous: (msg: string) => string,
            handleMsg: (msg: string) => Promise<string>,
        }
    }
}
export {}