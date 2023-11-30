import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
    ipcMain
} from 'electron';
import {platform} from 'process';
import * as path from "path";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow: BrowserWindow | null;
const createWindow = function () {
    const config: BrowserWindowConstructorOptions = {
        width: 800,
        height: 600,
        fullscreenable: true,
        fullscreen: false,
        resizable: true,
        maximizable: true,
        backgroundColor: '#F5F5F5',
        webPreferences: {
            nodeIntegration: false, // default in Electron >= 5
            contextIsolation: true, // default in Electron >= 12
            preload: path.join(__dirname, 'preload.cjs')
        }
    };

    mainWindow = new BrowserWindow(config);
    if (process.argv[2]) {
        mainWindow.loadURL(process.argv[2]);
    }
};
ipcMain.on('asynchronous', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = arg
})

ipcMain.handle('invoke-handle-message', (event, arg) => {
    console.log(arg)
    return arg
})

app.whenReady().then(() => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (platform !== 'darwin') {
        app.quit();
    } else {
        app.exit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
