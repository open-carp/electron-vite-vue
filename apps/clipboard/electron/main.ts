import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
    ipcMain,
    clipboard
} from 'electron';
import {platform} from 'process';
import path from 'path'


process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

ipcMain.handle('clipboard:readText', () => {
    return clipboard.readText()
})

ipcMain.handle('clipboard:writeText', (event, text) => {
    clipboard.writeText(text)
})
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
            preload: path.join(__dirname, 'preload.cjs')
        }
    };

    mainWindow = new BrowserWindow(config);
    if (process.argv[2]) {
        mainWindow.loadURL(process.argv[2]);
    }
};

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
