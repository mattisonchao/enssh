const {AutoComplete, Password} = require("enquirer");
const serverChoicePrompt = (serversName) => new AutoComplete({
    name: 'server',
    message: 'Pick you need connect server',
    limit: 5,
    choices: serversName
})
const serverPassPrompt = () => new Password({
    name: 'password',
    message: 'What is your password?'
});
module.exports = {
    serverChoicePrompt,
    serverPassPrompt
}