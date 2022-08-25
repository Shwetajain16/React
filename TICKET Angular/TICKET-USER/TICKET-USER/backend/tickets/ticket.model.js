const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ticket_no: { type: String, unique: true, required: true },
    ticket_desc: { type: String, required: true },
    created_at: {type: Date, default: Date.now},
    updated_at: { type: Date},
    username: { type: String},
    deleted_at: { type: Date }
   
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // delete ret.hash;
    }
});

module.exports = mongoose.model('Ticket', schema);