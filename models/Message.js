const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = mongoose.model('User')

const MessageSchema = new Schema({
    conversationId:{
        type:String
    },
    sender: { 
        type: Schema.ObjectId, ref: 'User' 
    },
    text: {
        type: String
    },
    fileName: {
        type: String
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Message', MessageSchema);