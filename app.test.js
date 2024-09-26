import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './Authentication/RouteA.js'; 
import userRoutes from './Routes/User_Routes/UserR.js'; 
import resourceRoutes from './Routes/Resource_Routes/ResourceR.js';
import resourcefileRoutes from './Routes/Resourcefile_Routes/ResourcefileR.js';
import bookingRoutes from './Routes/Booking_Routes/BookingR.js';
import notificationRoutes from './Routes/Notification_Routes/NotificationR.js';
import virtualtutoringRoutes from './Routes/VirtualTutoring_Routes/VirtualTutoringR.js';
import './Authentication/passport.js';
import { authenticateToken } from './tokenmiddleware.js';
import { fileURLToPath } from 'url';
import request from 'supertest';

// Setup the app
const app = express();

const mongoURI = 'mongodb+srv://pravirstudy:l9bCqH0MJzLQOtFl@backenddb.li8va.mongodb.net/?retryWrites=true&w=majority&appName=BackEndDB';

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 50000 
})

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/virtualtutoring', virtualtutoringRoutes);
app.use('/api/resourcesfile', resourcefileRoutes);

const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get('/test', (req, res) => {
  res.send('test');
});

describe('User Unit Tests', () => {
  it('should return "test"', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('test');
  });


  it('should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a specific user by ID', async () => {
    const userId = '66e8a4235629979b7e8f6236'; 
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', userId);
  });

  it('should return 404 for non-existent user', async () => {
    const nonExistentUserId = '66e8a4235629979b7e8f6235';
    const res = await request(app).get(`/api/users/${nonExistentUserId}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe("Error fetching user");
  });

  it('should create a new user', async () => {
    const newUser = {
      email: 'test1@example.com',
      password: 'password123',
      fname: 'John',
      lname: 'Doe',
      role: 'student'
    };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('_id');
  });


  it('should invalid login a user', async () => {
    const loginDetails = {
      email: 'test@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/api/users/login').send(loginDetails);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should update a user', async () => {
    const userId = '66e8a4235629979b7e8f6236'; 
    const updatedUser = { fname: 'Jane' };
    const res = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.fname).toBe('Jane');
  });
  

  it('should delete a user', async () => {
    const userId = '66e8c2edc1dd61f97b6bc845'; 
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User deleted successfully');
  });

   afterAll((done) => {
     mongoose.connection.close();
     done();
   });
});


describe('Virtualtutoring Unit Tests', () => {

  // it('should return all sessions', async () => {
  //   const res = await request(app).get('/api/virtualtutoring');
  //   expect(res.statusCode).toEqual(200);
  //   expect(Array.isArray(res.body)).toBe(true);
  // });

  // it('should return a specific session by ID', async () => {
  //   const sessionId = '66e8cd3cac4c2138d5b1ca37'; 
  //   const res = await request(app).get(`/api/virtualtutoring/${sessionId}`);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('_id', sessionId);
  // });

  // it('should return 404 for non-existent session', async () => {
  //   const nonExistentSessionId = '66e8cd3cac4c2138d5b1ca36';
  //   const res = await request(app).get(`/api/virtualtutoring/${nonExistentSessionId}`);
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body.message).toBe('Error fetching session');
  // });

  // it('should create a new session', async () => {
  //   const tutorId = '60c72b2f9b1d8f4d2e3f8d6d'; 
  //   const studentId = '60c72b2f9b1d8f4d2e3f8d6e'; 
  
  //   const newSession = {
  //     tutorId: tutorId,
  //     studentId: studentId,
  //     scheduledTime: '2024-10-01T10:00:00.000Z',
  //     videoConferenceUrl: 'https://example.com/conference/12345',
  //     status: 'scheduled',
  //     notes: 'A session on advanced algebra'
  //   };
  
  //   const res = await request(app).post('/api/virtualtutoring').send(newSession);
    
  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty('_id');
  //   expect(res.body).toMatchObject({
  //     tutorId: newSession.tutorId,
  //     studentId: newSession.studentId,
  //     scheduledTime: newSession.scheduledTime,
  //     videoConferenceUrl: newSession.videoConferenceUrl,
  //     status: newSession.status,
  //     notes: newSession.notes
  //   });
  // });

  // it('should update a session', async () => {
  //   const sessionId = '66e8cd3cac4c2138d5b1ca37'; 
  //   const updatedSession = { notes: 'Updated Math Tutoring' };
  
  //   const res = await request(app)
  //     .put(`/api/virtualtutoring/${sessionId}`)
  //     .send(updatedSession);
  
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.notes).toBe('Updated Math Tutoring');
  // });

  // it('should delete a session', async () => {
  //   const sessionId = '66e8cd3cac4c2138d5b1ca37'; 
  //   const res = await request(app).delete(`/api/virtualtutoring/${sessionId}`);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.message).toBe('Session deleted successfully');
  // });
  // afterAll((done) => {
  //   mongoose.connection.close();
  //   done();
  // });



  // describe('Bookings Unit Test', () => {
  //   let bookingId = '66e8a4e25629979b7e8f628f';
  
  //   // Create a new booking before tests
  //   beforeAll(async () => {
  //     const res = await request(app)
  //       .post('/api/bookings')
  //       .send({
  //         tutorId: '001',
  //         studentId: '002',
  //         sessionId: '002',
  //         scheduledTime: '2024-10-01T10:00:00Z'
  //       });
  //     bookingId = res.body._id;
  //   });
  
  //   it('should create a new booking', async () => {
  //     const newBooking = {
  //       student: '64e5e2c6c5e6f1a0d0d1e4b0', 
  //       tutor: '64e5e2c6c5e6f1a0d0d1e4b1', 
  //       subject: 'Advanced Algebra',
  //       sessionDate: '2024-10-01T00:00:00.000Z',
  //       sessionTime: '10:00 AM',
  //       duration: 60,
  //     };
      
  //     const res = await request(app).post('/api/bookings').send(newBooking);
      
  //     expect(res.statusCode).toEqual(201);
  //     expect(res.body).toHaveProperty('_id');
  //     expect(res.body.subject).toBe(newBooking.subject);
  //     expect(new Date(res.body.sessionDate).toISOString()).toBe(newBooking.sessionDate);
  //     expect(res.body.sessionTime).toBe(newBooking.sessionTime);
  //     expect(res.body.duration).toBe(newBooking.duration);
  //   });
  
  //   it('should get all bookings', async () => {
  //     const res = await request(app).get('/api/bookings');
  //     expect(res.statusCode).toEqual(200);
  //     expect(Array.isArray(res.body)).toBe(true);
  //   });
  
  //   it('should get a booking by ID', async () => {
  //     const bookid = '66e8d9c10520ed18c5b83183';
  //     const res = await request(app).get(`/api/bookings/${bookid}`);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty('_id', bookid);
  //   });
  
  //   it('should update or cancel a booking', async () => {
  //     const bookingId = '66e8d9c10520ed18c5b83183'; 
  //     const updatedBooking = { 
  //       status: 'Completed', 
  //       cancellationReason: 'No longer needed' 
  //     };
  
  //     const res = await request(app).put(`/api/bookings/${bookingId}`).send(updatedBooking);
      
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.status).toBe(updatedBooking.status);
  //     expect(res.body.cancellationReason).toBe(updatedBooking.cancellationReason);
  //   });

  
  //   it('should delete a booking', async () => {
  //     const bookingId = '66e8d9c10520ed18c5b83183'; 
  //     const res = await request(app).delete(`/api/bookings/${bookingId}`);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.message).toBe('Booking deleted successfully');
  //   });
  //     afterAll((done) => {
  //   mongoose.connection.close();
  //   done();
  // });
  // });
  
































});
