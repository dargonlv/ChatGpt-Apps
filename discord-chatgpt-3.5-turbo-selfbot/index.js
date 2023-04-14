import {Configuration,OpenAIApi} from "openai"
import {ChatGPTAPI} from "chatgpt"
import { Client } from "discord.js-selfbot-v13"
import config from "./config.json" assert { type: "json" };

// const { Client } = require('discord.js-selfbot-v13')
// const config = require('./config.json')

const client = new Client({
    checkUpdate: false,
})

client.on('ready', () => {
    console.log('Ready!')
    
})

// async function askGPT(question, channel, args) {
    

//     channel.send('Thinking...').then(async msg => {
//         const api = new ChatGPTAPI({
//             apiKey: config.key
//         })

//         const res = await api.sendMessage(question)

//         msg.edit('```\n' + res.text + '\n```').then(() => {
//         }).catch(err => {
//             message.channel.send('**ChatGPT » ** ' + '`' + args.join(' ') + '` | ' + 'Error: ' + err)
//         })
//     })
// }

async function GptYeni(channel,mesaj) {
    const configuration= new Configuration({
        organization:config.organization,
        apiKey:config.key
    });

    const openai = new OpenAIApi(configuration)

    const compolation = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {role:"user",
            content: mesaj,
            // prompt:"Sen bir discord kullanıcısın senle sohbet eden insanlarla insan gibi konuş"
            }
        ]
    })

    channel.send(compolation.data.choices[0].message)
    console.log(compolation.data.choices[0].message)
    
}

// async function Gpt(channel,mesaj){
//     // const {ChatGPTAPI} = await import('chatgpt')

//     channel.send().then(async msg => {
//         const api = new ChatGPTAPI({
//             apiKey: config.key
//         })

//         const res = await api.sendMessage(mesaj)

//         msg.edit('```\n' + res.text + '\n```').then(() => {
//         }).catch(err => {
//             message.channel.send('**ChatGPT » ** ' + '`' + mesaj + '` | ' + 'Error: ' + err)
//         })
//     })


// }

// client.on('messageCreate', async (message) => {
//     let args = message.content.split(" ").slice(1)
//     console.log(args)
//     if (message.author !== client.user) return
//     if (!message.content.startsWith(config.prefix)) return
//     if (message.content.toLocaleLowerCase().split(" ")[0].slice(config.prefix.length) == 'gpt') {
//         askGPT(args.join(' '), message.channel, args)
//         message.delete()
//     }
// })

client.on('message', async(message)=>{
    if(message.author.bot || message.author.username=='dargoncs')return;
    if (message.author.tag==="FATİH#0913") {
        
        console.log(`Yeni mesaj alındı: "${message.content}" gönderen: ${message.author.tag}`)
        // Gpt(message.channel,message.content.join(' '))
        // GptYeni(message.channel,)
        const mesaj = message.content.split(" ").join(" ")//bu şekilde metin halinde elde ettik
        GptYeni(message.channel,mesaj)
    }    
    
})

client.login(config.token)