const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    // Set environment for production (disable security warnings)
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'false';  // Disable security warnings for production

    const mainWindow = new BrowserWindow({
        title: 'Electron',
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,  // Disable nodeIntegration in production for security
            contextIsolation: true,
            sandbox: true,  // Enable sandboxing for extra security
        },
    });

    // Do not open dev tools in production
    // mainWindow.webContents.openDevTools();

    // Load the production build of the app
    mainWindow.loadFile(path.join(__dirname, 'Frontend/build/index.html'));
}

app.whenReady().then(createMainWindow);

ipcMain.on('submit:todoForm', (event, opts) => {
    console.log(opts);
});
