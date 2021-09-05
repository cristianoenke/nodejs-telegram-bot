const TelegramBot = require('node-telegram-bot-api');
const dialogFlow =  require('./dialogflow.js');
const youtube = require('./youtube.js')
const token = '1992620689:AAEiaDYaUFS--X9Y427rum1lU1cZ-gHeSwo';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);
    //bot.sendMessage(chatId, 'Oi');
    const dfResponse = await dialogFlow.sendMessage(chatId.toString(),msg.text);
    let responseText = dfResponse.text;
    // esse intent foi configurado la no site do dialogflow 
    console.log('os fields: ',dfResponse.fields)
    console.log('os generos: ',dfResponse.fields.genero)
    if (dfResponse.intent == 'Músicas'){
        // 'genero' também foi definido la no dialogflow
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.genero.stringValue)
    }
    bot.sendMessage(chatId, responseText);
})