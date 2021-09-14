import mongoose from 'mongoose';
require('mongoose-type-email');

let User = new mongoose.Schema({
    email: { type: mongoose.SchemaTypes.Email, unique: true, required: true },
    password: { type: String, required: true },
}, { versionKey: false });

export default mongoose.model('User', User);