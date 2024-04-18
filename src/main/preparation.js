class Preparation {
    constructor () {
        this.preparationStep = 1
        this.preparationUnSuccessfulAttempts = 0
        this.preparationStatus = [
            'Получение сведений о клиенте',
            'Авторизация клиента',
            'Проверка обновлений',
            'Загрузка настроек',
            'Загрузка навигации',
            'Загрузка новостей',
            'Загрузка событий',
            'Загрузка серверов',
        ]
        this.serialNum = null
        this.version = null
    }
    async initialize () {
        return new Promise(async (resolve, reject) => {
            while (this.preparationStep <= 8) {
                if (this.preparationUnSuccessfulAttempts > 10) {
                    console.log(`An error occurred during preparation (step ${this.preparationStep})`)
                    return mainWindow.webContents.send('modal-show', {
                        status: 'error',
                        title: 'Ошибка подготовки',
                        text: 'Произошла ошибка во время подготовки. Пожалуйста, перезапустите приложение и попробуйте снова.',
                    })
                }

                switch (this.preparationStep) {
                    case 1:
                        try {
                            this.serialNum = await getSerialNumber()
                            this.version = app.getVersion()
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 2:
                        try {
                            let response = await scripts.request('authorization', {
                                serial: this.serialNum, version: this.version, platform: 'windows'
                            })
                            content.accessToken = response.accessToken
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 3:
                        try {
                            let response = await scripts.request('releases', [], true)
                            if (response[0].version !== this.version) {
                                if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
                                    console.log('The update installation was missed due to the application running in development mode')
                                    this.preparationUnSuccessfulAttempts = 0
                                    this.preparationStep++
                                } else {
                                    content.releases = response
                                    return resolve('update')   
                                }
                            } else {
                                this.preparationUnSuccessfulAttempts = 0
                                this.preparationStep++
                            }
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 4:
                        try {
                            const filePath = `${appData.resourcesPath}\\settings.json`
                            const response = await fs.readFileAsync(filePath, { encoding: 'utf-8' })
                            content.settings = JSON.parse(response)
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (error) {
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        }
                        break;
                    case 5:
                        try {
                            content.navigations = await scripts.request('navigations', [], true)
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 6:
                        try {
                            content.news = await scripts.request('news', [], true)
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 7:
                        try {
                            content.events = await scripts.request('events', [], true)
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                    case 8:
                        try {
                            content.servers = await scripts.request('servers', [], true)
                            this.preparationUnSuccessfulAttempts = 0
                            this.preparationStep++
                        } catch (e) {
                            this.preparationUnSuccessfulAttempts++
                        }
                        break;
                }
            }
            if (this.preparationStep >= 8) return resolve('success')
        })
    }
}

async function getSerialNumber() {
    return new Promise((resolve, reject) => {
        serialNumber((err, value) => {
            if (err) {
                reject(err)
            } else {
                resolve(value)
            }
        })
    })
}

global.preparation = new Preparation()