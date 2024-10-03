import express from 'express';
import {
    createFeedback,
    getFeedbackBySession,
    updateFeedback,
    deleteFeedback,
    getTutorFeedback,
    getAllFeedback  
} from '../../Controllers/Feedback_Controller/FeedbackC.js';

//initialize express
const router = express.Router();

//Post feedback
router.post('/submit', async (request, context) => {
    const feedback = request.body;
    const savedFeedback = await createFeedback(feedback);
    context.json({ message: 'Feedback submitted successfully', feedback: savedFeedback });
});

//Get a specific tutor's rating
router.get('/rating/:id', (request, context) => {
    const id = request.params.id;
    //Get rating form database (example response)
    const rating = { "rating": 4 };
    context.json(rating);
});

//Get all feedbacks (NEW ROUTE)
router.get('/', async (request, context) => {
    const feedbacks = await getAllFeedback();  // Fetch all feedbacks
    context.json(feedbacks);
});

//Get feedback by tutor id
router.get('/:tutorId', async (request, context) => {
    const tutorId = request.params.tutorId;
    const feedback  = await getTutorFeedback(tutorId);
    context.json(feedback);
});

//Get feedback of a session
router.get('/session/:session', async (request, context) => {
    const session = request.params.session;
    const feedback = await getFeedbackBySession(session);
    context.json(feedback);
});

//Update specific feedback
router.put('/:id', async (request, context) => {
    const id = request.params.sessionId;
    const feedback = request.body;
    const updatedFeedback = await updateFeedback(id, feedback);
    context.json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
});

//Delete specific feedback
router.delete('/:feedbackId', async (request, context) => {
    const feedbackId = request.params.feedbackId;
    const result = await deleteFeedback(feedbackId);
    context.json({ message: 'Feedback deleted successfully' });
});

export default router;
