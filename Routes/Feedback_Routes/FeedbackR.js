import express from 'express';
import {
    createFeedback,
    getFeedbackBySession,
    updateFeedback,
    deleteFeedback,
    getTutorFeedback
 } from '../../Controllers/Feedback_Controller/FeedbackC.js';
import { get } from 'mongoose';

//initialise express
const router = express.Router();

//Post feedback
router.post('/submit', (request, context) => {
    const feedback = request.body;
    //Put feedback in database
    createFeedback(feedback);
    context.json({message: 'Feedback submitted successfully', feedback: 'string'});
});

//Get a specific tutor's rating
router.get('/rating/:id', (request, context) => {
    const id = request.params.id;
    //Get rating form database
    const rating = {"rating": 4};
    context.json(rating);
});

//Get feedback by tutor id
router.get('/:tutorId', async (request, context) => {
    const tutorId = request.params.tutorId;
    //Get feedback from database
    const feedback  = await getTutorFeedback(tutorId);
    context.json(feedback);
});


//Get feedback of a session
router.get('/session/:session', (request, context) => {
    const session = request.params.session;
    //Get feedback from database
    const feedback = getFeedbackBySession(session);
    context.json(feedback);
});

//Update specific feedback
router.put('/:id', (request, context) => {
    const id = request.params.sessionId;
    const feedback = request.body;
    //Change feedback in the database
    const updatedFeedback = updateFeedback(id, feedback);
    context.json({message: 'Feedback updated successfully'});
});

//Delete specific feedback
router.delete('/:feedbackId', (request, context) => {
    feedbackId = request.params.feedbackId;
    //Delete feedback in the database
    const result = deleteFeedback(feedbackId);
    context.json({message: 'Feedback deleted successfully'});
});

export default router;