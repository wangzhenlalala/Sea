let chcekExt = () => {
    return new Promise((resolve, reject) => {
        // resolve('check ext ok')
        reject('EXT_ERROR')
    }).catch( error => {
        throw `check ext error -> ${error}`
    })
    /**
     * 每个独立的异步逻辑(promise)，自己管理自己的 error
     * 如果每个error需要被后续catch到，需要在catch中
     * throw该错误
     */
}

let notifyMedia = () => {
    return new Promise( (resolve, reject) => {
        resolve('notify media ok');
    }).catch(error => {
        return `notify media error -> ${error}`
    })
}

let notifyRwg = () => {
    return new Promise( (resolve, reject) => {
        resolve('notify rwg ok');
    }).catch(error => {
        return `notify rwg error -> ${error}`
    })
}

chcekExt()
    .then( (result) => {
        console.log(result)
        return notifyMedia()
    })
    .then( (result) => {
        console.log(result)
        return notifyRwg()
    })
    .then( (result) => {
        console.log(result)
    })