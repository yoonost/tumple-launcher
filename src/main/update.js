class Update {
    constructor () {
        this.filesList = []
    }
    async initialize () {
        try {
            mainWindow.webContents.send('launch-update-status', 'Обновление лаунчера')

            let response = await scripts.request('releases', {
                version: content.releases[0].version
            }, true)

            response.forEach((data) => {
                if (fs.existsSync(join(appData.mainPath, data.name))) {
                    if (md5File.sync(join(appData.mainPath, data.name)) === data.hash) {
                        return true
                    }
                }
                this.filesList.push(data)
            })

            if (this.filesList.length !== 0) {
                for (let i = 0; i < this.filesList.length; i++) {
                    await this.downloadFile(this.filesList[i], i+1)
                }
            } else {
                console.log('Error occurred during launcher update. Necessary files for replacement not found')
                return mainWindow.webContents.send('modal-show', {
                    status: 'error',
                    title: 'Ошибка обновления лаунчера',
                    text: 'Произошла ошибка во время обновления лаунчера. Лаунчер не смог найти нужные файлы для замены, повторите попытку позже.',
                })
            }
        } catch (e) {
            console.log('An unknown error occurred during the update of the launcher')
            return mainWindow.webContents.send('modal-show', {
                status: 'error',
                title: 'Ошибка обновления лаунчера',
                text: 'Произошла неизвестная ошибка во время обновления лаунчера. Пожалуйста, перезапустите приложение и попробуйте снова.',
            })
        }
    }
    async downloadFile (data, downloadedFiles) {
        return new Promise((resolve) => {
            var last_slash = data.name.lastIndexOf('\\')
            var file = data.name.substring(last_slash + 1)
            var filePath = join(
                appData.resourcesPath,
                `caches`,
                content.releases[0].token,
                data.name.substring(0, last_slash)
            )
            download(mainWindow, `http://cdn.tumple-rp.su/releases/${content.releases[0].token}/${data.name}`, {
                directory: filePath,
                filename: file,
                size: data.size,
                onStarted: () => {
                    console.log(`The file download has started ${data.name} (${content.releases[0].token})`)
                },
                onProgress: () => {
                    mainWindow.webContents.send('launch-update-status', `Загрузка обновления (${downloadedFiles}/${this.filesList.length})`)
                },
                showProgressBar: false
            }).then(() => {
                if (this.filesList.length === downloadedFiles) {
                    this.filesDownloaded()
                }
                resolve()
            })
        })
    }
    async filesDownloaded () {
        try {
            spawn(`start ${join(appData.resourcesPath, 'updater.exe')}`, [join(appData.resourcesPath, `caches`, content.releases[0].token), appData.mainPath], {
                encoding: 'utf8',
                shell: true,
                detached: true
            })
            app.quit()
        } catch (e) {
            return mainWindow.webContents.send('modal-show', {
                status: 'error',
                title: 'Ошибка обновления лаунчера',
                text: 'Произошла ошибка во время запуска обновления лаунчера. Пожалуйста, перезапустите приложение и попробуйте снова.'
            })
        }
    }
}

global.update = new Update()