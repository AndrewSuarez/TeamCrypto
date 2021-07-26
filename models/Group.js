const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    
    name: {
        type: String
    },

    groupPicture: {
        type:String,
        default:''
    },


},
{timestamps:true}
);

module.exports = mongoose.model('Group', GroupSchema);