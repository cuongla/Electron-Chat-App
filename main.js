const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// Main Process
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 1000,
        backgroundColor: '#6e707e',
        show: true,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    isDev && win.webContents.openDevTools();
    return win;
}

// reload electron in dev mode
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

// create browser windows when Electron has finished initialization
app.whenReady().then(createWindow)

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message })
});

ipcMain.on('app-quit', () => {
    app.quit();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
})


/* NOTE */
// Chromium -> web engine for rendering the UI, full Chrome-like web browser
// V8 -> engine that provides capabilities to execute, run, JS code in the browser
// NODE JS(V8) -> we are able to tun JS code + provides more features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in the browser  
// Babel -> JS complier