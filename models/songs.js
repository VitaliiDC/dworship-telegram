const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    tonality: {type: String, required: true},
    link: {type: String},
    creator: {type: String},
    date: {type: Date, default: Date.now}
})

module.exports = model("Songs", schema);