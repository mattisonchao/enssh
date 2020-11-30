#!/usr/bin/env node

const server = require("./server")

require('yargs')
    .usage('$0 <cmd> [args]')
    .command('add <name> <user> <host>', 'Add new server ', yargs => yargs
            .option('password', {alias: 'p', type: 'string', description: 'Password'})
            .option('keyPath', {alias: 'k', type: 'string', description: 'Private ssh key path (absolutely path)'})
            .positional('name', {describe: 'User custom server name', type: "string"})
            .positional('user', {describe: 'Remote server login user', type: "string"})
            .positional('host', {describe: 'Remote server login host', type: "string"}),
        argv => server.addNew(argv))
    .command('rm  <name>', 'Remove server by name', yargs => yargs
            .positional('name', {describe: 'Custom server name', type: "string"}),
        argv => server.remove(argv.name))
    .command('run [mode]', 'Run enssh', yargs => yargs
            .option('cmd', {alias: 'c', type: 'string', description: 'Run with command'})
            .positional('mode', {describe: 'Set run mode [LOGIN] [PASSWORD] [KEYFILE]', type: "string"}),
        argv => server.run(argv.mode, argv.cmd))
    .command('ls', 'Remove server by name', () => null, () => server.list())
    .help("h")
    .showHelpOnFail(true)
    .demandCommand(1, '')
    .argv
