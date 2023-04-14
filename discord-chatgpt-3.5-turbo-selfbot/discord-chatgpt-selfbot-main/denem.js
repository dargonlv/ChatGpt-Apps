const { Client } = require('discord.js-selfbot-v13')
const config = require('./config.json')

const client = new Client({
    checkUpdate: false,
})

client.on('ready', () => {
    console.log('Ready!')
})

client.login(config.token)
