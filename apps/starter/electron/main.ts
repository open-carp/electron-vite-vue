import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
} from 'electron';

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
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
