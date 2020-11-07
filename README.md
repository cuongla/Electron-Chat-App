# Electron Chat App

A simple chat application using React and Electron to improve user experience.

## Installation

`$ git clone https://github.com/tinla94/Electron-Chat-App` or click `Clone or download`.

### Code Folder

1. Install node packages: `npm install`
2. Start up browser to see UI: `npm start`.
3. Electron will load its own window

## Technology Use

### Front-End

1. `React` - an open-source JavaScript library which is used for building user interfaces specifically for single page applications

2. `React Hooks` - functions that let us hook into the React state and lifecycle features from function components

3. `Electron` - a framework that enables you to create desktop applications with JavaScript, HTML, and CSS. These applications can then be packaged to run directly on macOS, Windows, or Linux, or distributed via the Mac App Store or the Microsoft Store.

4. `CSS` ( Cascading Style Sheets ) - used to style the web page.

5 `SCSS` ( Syntactically Awesome Style Sheet ) - the superset of CSS. SCSS is the more advanced version of CSS.

### Other Tools

1. `Firebase` - a Google's mobile application development platform that helps you build, improve, and grow your app.

2. `Google Analytics` - uses a JavaScript code to collect information from websites.

3. `webpack` -  a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

## App Setup

1. Check out `main.js` file

This is where you will set up Electron for the app

```
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
```

2. Check out `preload.js` file
Bridge electron and your application

```
const { ipcRenderer, contextBridge } = require('electron');


contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotification(message) {
            ipcRenderer.send('notify', message);
        }
    },
    appApi: {
        quitApp() {
          ipcRenderer.send('app-quit');
        }
    },
})
```



## Deployment

You can use any Cloud Server to deploy your application.

In this project, I have used `Netlify` service to deploy my application.

### Who is Netlify?

`Netlify` a web developer platform that multiplies productivity. By unifying the elements of the modern decoupled web, from local development to advanced edge logic, `Netlify` enables a 10x faster path to much more performant, secure, and scalable websites and apps.

You can learn more about how to deploy your app with `Netlify` here: https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/

## Authors

- **Tin La**
