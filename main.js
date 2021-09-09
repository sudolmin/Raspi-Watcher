const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path')
const ipc=ipcMain;

const defaultFilter = [
    { name: 'All Files', extensions: ['*'] }
]

function createWindow () {
    const win = new BrowserWindow({
    height: 500,
    width: 700,
    minHeight: 500,
    minWidth: 700,
    maxHeight: 500,
    maxWidth: 700,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        preload: path.join(__dirname, 'preload.js')
    }
    })

    win.loadFile('./frontend/index.html');

    ////IPC////
    ipc.on("closeApp", ()=>{
        win.close();
    })
    ipc.on("minimizeApp", ()=>{
        win.minimize();
    })
    
    ipc.on("maximizeApp", ()=>{
        if (!win.isMaximized()) {
            win.maximize();          
        } else {
            win.unmaximize();
        }
    })
    
    win.on("maximize", ()=>{
        win.webContents.send("maximized");
    })
    win.on("unmaximize", ()=>{
        win.webContents.send("restored");
    })
    ipc.handle('openFileExp', async (event, prop, filter=defaultFilter) => {
        const path =dialog.showOpenDialogSync({
            properties: prop,
            filters: filter
        });
        return path
    })
}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
