class Scripts {
    request = (path, data, accessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios(`http://127.0.0.1:3500/launcher/${path}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: JSON.stringify(accessToken ? { ...data, accessToken: content.accessToken } : data)
                })
                if (response.data.status === true) {
                    console.log(`Received a positive response from the server ${response.request.path} with a status code ${response.status}, after sending the request`)
                    resolve(response.data.response)
                } else {
                    console.log(`A negative response was received from the server ${response.request.path} with a status code ${response.status}, after sending the request`)
                    reject(response.error)
                }
            } catch (error) {
                console.log(`An unknown error occurred while sending the request to the server (${error.message})`)
                reject(error.message)
            }
        })
    }
    sendCrash = () => {
    }
    saveSettings = () => {
        // fs.writeFileSync(`${process.resourcesPath}\\settings.json`, JSON.stringify(settingData));
    }
}

global.scripts = new Scripts()