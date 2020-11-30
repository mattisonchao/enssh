const {serverPassPrompt} = require("./prompt");
const {NodeSSH} = require('node-ssh')
const {RUN_MODE_ENUM} = require("./enum")
const {error} = require("../tookit/log")
const fs = require('fs')

const connect = (serverObj, mode,command) => {
    const serverConfig = {
        host: serverObj.host,
        username: serverObj.user,
        agent: process.env.SSH_AUTH_SOCK,
        compress: true,
    }
    switch (mode || serverObj.mode) {
        case RUN_MODE_ENUM.LOGIN: {
            serverPassPrompt().run()
                .then(password => {
                    serverConfig.password = password
                    connectBySsh(serverConfig,command)
                })
                .catch(error);
            break
        }
        case RUN_MODE_ENUM.PASSWORD: {
            !serverObj.password && error("You don't have password in server", serverObj.name)
            serverConfig.password = serverObj.password
            connectBySsh(serverConfig,command)
            break
        }
        case RUN_MODE_ENUM.KEYFILE: {
            const keyPath = serverObj.keyPath;
            !keyPath && error("You don't have keyPath in server ", serverObj.name)
            const isFileExists = fs.existsSync(keyPath);
            !isFileExists && error("Wrong file path, can not found file! ", keyPath)
            serverConfig.privateKey = fs.readFileSync(keyPath).toString()
            connectBySsh(serverConfig,command)
        }
    }


}
const connectBySsh = (connectConfig,command) => {
    (async () => {
        const ssh = new NodeSSH()
        await ssh.connect(connectConfig)
        const pipeStream = stream => {
            const {stdin, stdout, stderr} = process
            const {isTTY} = stdout
            if (isTTY && stdin.setRawMode) stdin.setRawMode(true)
            stream.pipe(stdout)
            stream.stderr.pipe(stderr)
            stdin.pipe(stream)
            const onResize =
                isTTY && (() => stream.setWindow(stdout.rows, stdout.columns, null, null))
            if (isTTY) {
                stream.once('data', onResize)
                process.stdout.on('resize', onResize)
            }
            stream.on('close', () => {
                if (isTTY) process.stdout.removeListener('resize', onResize)
                stream.unpipe()
                stream.stderr.unpipe()
                stdin.unpipe()
                if (stdin.setRawMode) stdin.setRawMode(false)
                stdin.unref()
            })
        }
        await new Promise((resolve, reject) => {
            ssh.connection.shell({term: process.env.TERM || 'vt100'}, (err, stream) => {
                if (err) {
                    reject(err)
                    return
                }
                pipeStream(stream)
                if (command) stream.stdin.write(command+"\n")
                stream.on('close', () => resolve(true))
            })
        })
        ssh.dispose()
    })()
}

module.exports = {
    connect
}