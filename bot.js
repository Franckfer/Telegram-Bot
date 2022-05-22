require('dotenv').config();
const axios = require('axios');
const { Telegraf, Context } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.command('hi', (ctx) => {
//     const { first_name } = ctx.message.from

//     ctx.reply('hi ' + first_name)
// })

// // escucha la interacciones del usuario
// bot.on('text', (ctx)=> {
//     const msg = ctx.message.text
//     // capturo el mensaje del chat
//     console.log(msg)
    
//     ctx.reply(`usted envio el mensaje ${msg}`)
// })


// // el bot escucha un palabra en especifico 
// bot.hears('solo', (ctx) => {
//     ctx.reply('bien descubriste la palabra secreta!')
// })


//! ********************************************************    Inicializacion de Telegram   *******************************************************************

bot.command('start', ctx => {
    const { first_name } = ctx.message.from
    ctx.reply(`🎉🥂✨ Bienvenid@ ${first_name} ! ✨🥂🎉`)
    
    sendStartMessage(ctx)
    // inicializamos la funcion
})

const sendStartMessage = ctx => {
    const nameBot = ctx.botInfo.first_name
    const startMessage = `El bot ${nameBot} esta en desarrollo por el momento para mas info puede comunicarse con "GUNZ"`
    
    const { id } = ctx.chat
    
    bot.telegram.sendMessage(id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Nuestro grupo: Crypto para todos", url: "https://t.me/+7B-FtXcXHpxiOTVh" }],
                [{ text: "Creditos", callback_data: 'credits' }], // por callback_data ingresamos en nombre de la accion
                [{ text: "🤖 Menu", callback_data: 'menu' }] // por callback_data ingresamos en nombre de la accion
            ]
        }
    })
}

// creamos la accion que se ejecuta en callback_data con el mismo nombre
bot.action('credits', ctx => {
    ctx.answerCbQuery() // quitamos el spinner
    ctx.reply("Creado por Franco Fernandez")
})

//! **********************************************************************************************************************************************************

//?************************************************************************    Menu    ************************************************************************

bot.action('menu', ctx => {
    ctx.answerCbQuery() // quitamos el spinner

    const { id } = ctx.chat // obtenemos el id del usuario para mostrarle especificamente a ese id las acciones

    const menuMsg = "Ingresa una opcion"

    bot.telegram.sendMessage(id, menuMsg, {
        reply_markup: {
            keyboard: [
                [{ text: '💰 Balance', callback_data: 'process' }],

                [{ text: '💵 Deposito', callback_data: 'process' },{ text: '💸 Reinvertir', callback_data: 'process' },{ text: '🤑 Retiro', callback_data: 'process'}],
                [{ text: '👨‍👩‍👦 Referidos', callback_data: 'process' },{ text: '🎫 Transacciones', callback_data: 'process' },{ text: '📘 Mis Inversiones', callback_data: 'process'}],
                [{ text: '💻 Soporte', callback_data: 'process' },{ text: '👛 Billetera', callback_data: 'process' },{ text: '💹 Centro de Pagos', callback_data: 'process'}],

                [{ text: '⬅ Atras', callback_data: 'back' }],

            ],
            resize_keyboard: true, // redimensiona el tamaño de keyboard cuando esta en true
            remove_keyboard: true // oculta el keyboard despues de utilizarlo cuando esta en true

        }
    })
})

bot.hears('⬅ Atras', ctx => {
    const { id } = ctx.chat
    //ctx.answerCbQuery() // quitamos el spinner
    bot.telegram.sendMessage(id, "Cierre de Menu", {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

const container = ['💰 Balance', '💵 Deposito', '💸 Reinvertir', '🤑 Retiro', '👨‍👩‍👦 Referidos', '🎫 Transacciones', '📘 Mis Inversiones', '💻 Soporte', '👛 Billetera', '💹 Centro de Pagos']

bot.hears(container, (ctx) => {
    //ctx.answerCbQuery() // quitamos el spinner
    ctx.reply('En Desarrollo!')
})

//?***************************************************************************************************************************************************************************




bot.launch()
//inicializamos el bot de Telegram que escucha las interacciones del usuario