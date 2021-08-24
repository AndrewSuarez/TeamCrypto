const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min: 5,
        max: 20,
        unique: true
    },
    
    email:{
        type:String,
        requier:true,
        min: 5,
        unique:true
    },

    password:{
        type:String,
        require:true,
        min:6
    },

    profilePicture:{
        type:String,
        default:''
    },

    nombre:{
        type: String,
        require: true
    },

    apellido:{
        type: String,
        require: true
    },

    contactos:{
        type: Array,
        default: []
    },

    solicitudes:{
        type: Array,
        default: []
    },

    publicKey:{
        type: String,
        default: '',
        require: true,
    },

    privateKey:{
        type:String,
        default: '',
        require:true
    }

},
{timestamps:true}
);

module.exports = mongoose.model('User', UserSchema);