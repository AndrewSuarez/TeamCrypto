const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const MemberSchema = new Schema(
  {
    groupId: {
      type: String,
    },

    userId: { type: Schema.ObjectId, ref: 'User' },

    role: {
      type: String,
      default: '',
    },

    tareas: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', MemberSchema);
