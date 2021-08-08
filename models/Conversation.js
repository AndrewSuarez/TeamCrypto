const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    groupId:{
        type: String,
        required: true
    },
    members: {
        type: Array
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Conversation', ConversationSchema);