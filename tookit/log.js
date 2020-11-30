const chalk = require('chalk')
const error = (...error) => {
    console.log(chalk.red(error.join("")))
    process.exit()
}
const warn = (...warn) => {
    console.log(chalk.yellow(warn.join("")))
}
const normal = (...out) => {
    console.log(out)
}
const success = (...success) => {
    console.log(chalk.green(success.join("")))
}

module.exports = {
    error, warn, normal, success
}