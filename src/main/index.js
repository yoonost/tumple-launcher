const { app, shell, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const { electronApp, optimizer, is } = require('@electron-toolkit/utils')
const { download } = require('electron-dl')
const log = require('electron-log')
const { join, resolve } = require('path')
const fs = require('original-fs')
const axios = require('axios')
const md5File = require('md5-file')
const serialNumber = require('serial-number')
const { spawn, execFile } = require('child_process')

global.app = app, global.shell = shell, global.BrowserWindow = BrowserWindow
global.electronApp = electronApp, global.optimizer = optimizer, global.is = is
global.join = join, global.resolve = resolve, global.fs = fs, global.download = download
global.axios = axios, global.md5File = md5File, global.serialNumber = serialNumber
global.ipcMain = ipcMain, serialNumber.preferUUID = true, global.Tray = Tray
global.spawn = spawn, global.execFile = execFile, global.Menu = Menu

//! global variables

global.isDev = is.dev && process.env['ELECTRON_RENDERER_URL']
global.mainWindow = null
global.appData = {}
global.content = {
    accessToken: null,
    settings: {
        nickname: '',
        server: 0,
        setting: {
            toolbar: false
        }
    },
    releases: [],
    navigations: [],
    news: [],
    events: [],
    servers: []
}

//! path configuration

if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    global.appData.mainPath = join(app.getAppPath(), 'out/resources')
    global.appData.resourcesPath = join(app.getAppPath(), 'out/resources')
    if (!fs.existsSync(appData.mainPath)) fs.mkdirSync(appData.mainPath)
} else {
    global.appData.mainPath = resolve(app.getAppPath(), '../..')
    global.appData.resourcesPath = resolve(app.getAppPath(), '..')
}

//! logging configuration

if(!fs.existsSync(join(appData.mainPath, 'logging'))) fs.mkdirSync(join(appData.mainPath, 'logging'))
let logDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '-')

log.transports.file.level = 'info'
log.transports.file.format = '[{h}:{i}:{s}:{ms}] {text}'
log.transports.file.maxSize = 5 * 1024 * 1024
log.transports.file.resolvePathFn = () => join(appData.mainPath, `logging/${logDate}.log`)
console.log = (msg) => log.info(msg)

//! import dependencies

require(join(__dirname, 'events.js'))
require(join(__dirname, 'preparation.js'))
require(join(__dirname, 'scripts.js'))
require(join(__dirname, 'update.js'))

//! entry point

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 812, 
        height: 580,
        frame: false,
        transparent: true,
        resizable: false,
        maximizable: false,
        webPreferences: {
            devTools: isDev,
            contextIsolation: true,
            preload: join(__dirname, '../preload/index.js'),
            nodeIntegration: true
        },
        icon: join(__dirname, '../build/icon.png')
    })

    let mainTray = new Tray(join(__dirname, isDev ? '../../build/icon.png' : '../../resources/icon.png'))

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Открыть',
        click: () => mainWindow.show()
    }, {
        label: 'Выйти',
        click: () => mainWindow.close()
    }])
    
    mainTray.setToolTip('TUMPLE LAUNCHER')
    mainTray.setContextMenu(contextMenu)

    mainWindow.on('ready-to-show', async () => {
        mainWindow.show()
        preparation.initialize().then((data) => {
            if (data !== 'update') {
                mainWindow.webContents.send('update-content', content)
                mainWindow.webContents.send('change-window', 'main')
            } else {
                update.initialize()
            }
        }).catch(() => {
            app.quit()
        })
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })
  
    if (isDev) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.tumple.launcher')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

process.noAsar = true