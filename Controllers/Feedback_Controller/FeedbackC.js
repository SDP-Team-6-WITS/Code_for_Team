import Feedback from '../../Models/Feedback.js';

//Create new Feedback
export const createFeedback = async (payload) => {
    try {
        const newFeedback = new Feedback(payload);
        const savedFeedback = await newFeedback.save();
        return savedFeedback;
    } catch (error) {
        throw new Error(`Error creating feedback: ${error.message}`);
    }
};

//Get the feedback of a session
export const getFeedackBySession = async (id) => {
    try {
        const feedback = await Feedback.find({session: id});
        if (!feedback) throw new Error('Feedback not found');
        return feedback;
    } catch (error) {
        throw new Error(`Error fetching feedback: ${error.message}`);
    }
};

//Get the feedback of a tutor
export const getTutorFeedback = async (id) => {
    try {
        const feedback = await Feedback.find({tutor: id});
        if (!feedback) throw new Error('Feedback not found');
        return feedback;
    } catch (error) {
        throw new Error(`Error fetching feedback: ${error.message}`);
    }
};

//Change Session Feedback
export const changeFeedback = async (id, payload) => {
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) throw new Error('Feedback not found');

        Object.keys(payload).forEach((key) => {
            feedback[key] = payload[key];
        });

        const updatedFeedback = await feedback.save();
        return updatedFeedback;
    } catch (error) {
        throw new Error(`Error updating feedback: ${error.message}`);
    }
};

//Delete Feedback
export const deleteFeedback = async (id) => {
    try {
        const result = await Feedback.findByIdAndDelete(id);
        if (!result) throw new Error('Feedback not found');
        return result;
    } catch (error) {
        throw new Error(`Error deleting feedback: ${error.message}`);
    }
};

