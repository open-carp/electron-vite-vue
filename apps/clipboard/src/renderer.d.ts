export interface IClipboardAPI {
    readText: () => Promise<string>
    writeText: (txt: string) => Promise<void>
}

declare global {
    interface Window {
        clipboard: IClipboardAPI
    }
}