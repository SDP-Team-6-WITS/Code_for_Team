document.addEventListener('DOMContentLoaded', () => {
    const tutor = localStorage.getItem('userId');
    
    const pendingSessions = document.getElementById('pending-list');
    const upcomingSessions = document.getElementById('session-list');
    const completedSessions = document.getElementById('completed-list');
    const cancelledSessions = document.getElementById('cancelled-list');

            // Get All Feedback of a tutor
        const getAllSessionsByTutor = async (tutor) => {
            fetch(`http://localhost:3000/api/bookings/tutor/${tutor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displaySessions(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        const displaySessions = (sessions) => {
            upcomingSessions.innerHTML = '';
            sessions.forEach(session => {
                const sessionsElement = document.createElement('div');
                sessionsElement.classList.add('session-highlighted');
                sessionsElement.innerHTML = `
                    <div class="date">${(session.sessionDate).slice(0, 10)}</div>
                    <div class="info">
                        <h3>${session.subject}</h3>
                        <p>${session.sessionTime} | Student: ${session.student}</p>
                    </div>
                    
                    
                `;
                
                if(session.status == "Scheduled"){
                    sessionsElement.innerHTML += `<button class="confirm-btn" onclick="confirmBooking(this)">Confirm</button>`;
                    sessionsElement.innerHTML += `<button class="delete-btn" onclick="deleteBooking(this)">Delete</button>`;
                    pendingSessions.appendChild(sessionsElement);
                }
                else if(session.status == "Confirmed"){
                    sessionsElement.innerHTML += `<button class="delete-btn" onclick="deleteBooking(this)">Delete</button>`;
                    upcomingSessions.appendChild(sessionsElement);
                }
                else if(session.status == "Completed"){
                    sessionsElement.innerHTML += `<button class="delete-btn" onclick="deleteBooking(this)">Delete</button>`;
                    completedSessions.appendChild(sessionsElement);
                }
                else if(session.status == "Completed"){
                    sessionsElement.innerHTML += `<button class="delete-btn" onclick="deleteBooking(this)">Delete</button>`;
                    cancelledSessions.appendChild(sessionsElement);
                }
            });
        }

        getAllSessionsByTutor(tutor);
})