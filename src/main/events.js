class Events {
    constructor () {
        ipcMain.on('app-quit', (_) => {
            app.quit()
        })
        
        ipcMain.on(`open-link`, (_, link) => {
            shell.openExternal(link)
        })


    }    
}

global.events = new Events()