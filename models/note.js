import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;


const noteSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    completed: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;