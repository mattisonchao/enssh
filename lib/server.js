const {connect} = require("./connect");
const {RUN_MODE_ENUM} = require("./enum");
const {addServer, getServer, removeServer} = require("./configFile");
const {error} = require("../tookit/log")
const {serverChoicePrompt} = require("./prompt")

const run = (mode,command) => {
    const serversName = getServer().map(server => server.name)
    serversName.length < 1 && error("Fail to start enssh, please add new service use ", "enssh add <name> <user> <host>")
    serverChoicePrompt(serversName)
        .run()
        .then(serverName => {
            const server = getServer(serverName);
            if (!server) {
                error("Cannot find server")
                return;
            }
            connect(server, mode,command)
        })
        .catch(console.error)
}

const addNew = argv => {
    getServer(argv.name) && error("Add new server fail, because of duplicated key, that name is :", argv.name)
    const serverObj = {
        mode: RUN_MODE_ENUM.LOGIN,
        name: argv.name,
        user: argv.user,
        host: argv.host
    }
    if (argv.password) {
        serverObj.password = argv.password
        serverObj.mode = RUN_MODE_ENUM.PASSWORD
    }
    if (argv.keyPath) {
        serverObj.keyPath = argv.keyPath
        serverObj.mode = RUN_MODE_ENUM.KEYFILE
    }
    addServer(serverObj)
}

const remove = (serverName) => {
    !getServer(serverName) && error("Remove service ", serverName, "fail, because of not found!")
    removeServer(serverName)
}

const list = () =>
    process.stdout.write(getServer().map(service => service["name"]).join("\t")+'\n')
module.exports = {
    run, addNew, remove, list
}