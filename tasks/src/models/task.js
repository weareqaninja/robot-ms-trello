import mongoose from 'mongoose';

let Task = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: String },
    done: { type: Boolean, default: false }
},{ versionKey: false });

export default mongoose.model('Task', Task);