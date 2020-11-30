const fs = require("fs")
const path = require("path")
const {success} = require("../tookit/log")
const dirPath = path.join(process.env.HOME || process.env.USERPROFILE, ".enssh")
const filePath = path.join(dirPath, "config.json")

const writeConfigFile = (configJson) => {
    fs.writeFileSync(filePath, JSON.stringify(configJson, null, 4))
}
const initConfigFileIfIsNotExist = () => {
    if (!fs.existsSync(dirPath))
        fs.mkdirSync(dirPath, {recursive: true})
    if (!fs.existsSync(filePath))
        fs.writeFileSync(filePath, JSON.stringify({servers: []}, null, 4), {mode: 400})
}
const getConfigFile = () => {
    initConfigFileIfIsNotExist()
    const rawFile = fs.readFileSync(filePath)
    return JSON.parse(rawFile.toString())
}

const getServer = serverName =>
    serverName ?
        getConfigFile().servers.find(innerServerObj => innerServerObj.name === serverName) :
        getConfigFile().servers

const addServer = serverObj => {
    const configObj = getConfigFile()
    configObj.servers.push(serverObj)
    writeConfigFile(configObj)
    success("Add new server", serverObj.name, "  success!")
}
const removeServer = serverName => {
    const configObj = getConfigFile()
    configObj.servers = configObj.servers.filter(serverObj => serverObj.name !== serverName)
    writeConfigFile(configObj)
    success("Remove server ", serverName, "  success!")
}

module.exports = {
    addServer, removeServer, getServer
}

