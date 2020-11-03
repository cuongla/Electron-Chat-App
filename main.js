const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png');



function createSecondWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#6e707e',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
        }
    })

    win.loadFile('second.html')
}

// Main Process
function createWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#6e707e',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    isDev && win.webContents.openDevTools();
}

// reload electron in dev mode
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

if (process.platform === 'darwin') {
    app.dock.setIcon(dockIcon);
}

// create browser windows when Electron has finished initialization
let tray = null;
app.whenReady()
    .then(() => {
        const template = require('./utils/Menu').createTemplate(app);
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        tray = new Tray(trayIcon);
        tray.setContextMenu(menu);
        
        createWindow();
        createSecondWindow();
    });

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show();
})

ipcMain.on('app-quit', () => {
    app.quit();
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

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