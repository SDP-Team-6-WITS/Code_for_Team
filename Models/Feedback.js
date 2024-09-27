import mongoose from'mongoose';

const FeedbackSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: [true, "Please give a rating"]
    },
    comment:{
        type: String,
        required: [true, "Please enter your feedback"]
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;