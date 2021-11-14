const token = "2050024625:AAGawaBHuUfOzWJsOrGRgnUmoQMrn475sy8";
const Songs = require("./models/songs");
const {
    INFO_TEXT,
    TONALITIES
} = require("./const/index")


const mongoose = require("mongoose");

const botCreator = require("node-telegram-bot-api");

let start = () => {
    const bot = new botCreator(token, {polling: true});

    let data = {};
    let enterName = false;
    let enterTonality = false;
    let enterLink = false;

    //   info
    bot.onText(/\/info/, async msg => {
        bot.sendMessage(msg.chat.id, INFO_TEXT);
    })

    //   addSong
    bot.onText(/\/addSong/, async (msg) => {
        bot.sendMessage(msg.chat.id, "Enter the name of song");
        enterName = true;
    })


    bot.on("message", msg => {
        if(enterName){
            data["name"] = msg.text;
            enterName = false;
            enterTonality = true;
            bot.sendMessage(msg.chat.id, "Enter a tonality", {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: 'Development',
                            callback_data: 'development'
                        }, {
                            text: 'Lifestyle',
                            callback_data: 'lifestyle'
                        }, {
                            text: 'Other',
                            callback_data: 'other'
                        }
                    ]]
                }
            })
        }
    })
}


// const song = new Songs({
//     name: obj.name, 
//     tonality: obj.tonality, 
//     link: obj.link,
//     creator: msg.from.username    
// });
// await song.save();
// obj = {};

// Songs.find({name: msg.text}, (err, result) => {
//     if(err) throw err
//     else{
//         bot.sendMessage(chatId, JSON.stringify(result
//             ))
//     }
// })

const password = "9VxXRtOUZ7eQJowV";

mongoURI = `mongodb+srv://Vitalii_Drobit:${password}@cluster0.6leiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    start();
    console.log("connected")
}).catch(err => console.log(err))