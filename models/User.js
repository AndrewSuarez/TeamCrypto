const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 5,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      requier: true,
      min: 5,
      unique: true,
    },

    password: {
      type: String,
      require: true,
      min: 6,
    },

    profilePicture: {
      type: String,
      default: '',
    },

    nombre: {
      type: String,
      require: true,
    },

    apellido: {
      type: String,
      require: true,
    },

    contactos: [
      {
        type: Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],

    solicitudes: [
      {
        type: Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],

    publicKey: {
      type: String,
      default: '',
      require: true,
    },

    privateKey: {
      type: String,
      default: '',
      require: true,
    },

    resetLink: {
      data: String,
      default: '',
    },
    _2faEnabled: {
      data: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
