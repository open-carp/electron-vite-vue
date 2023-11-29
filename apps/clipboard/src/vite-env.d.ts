/// <reference types="vite/client" />
export interface IClipboardApi {
    writeText: (txt: string) => Promise<void>
    readText: () => Promise<string>
}

declare global {
    interface Window {
        clipboardApi: IClipboardApi
    }
}
export {}
