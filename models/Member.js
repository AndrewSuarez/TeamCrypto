const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    
    groupId: {
        type: String
    },

    userId: { 
        type: String
    },

    role: {
        type: String,
        default: ""
    },

    tareas: {
        type: Array,
        default: []
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Member', MemberSchema);