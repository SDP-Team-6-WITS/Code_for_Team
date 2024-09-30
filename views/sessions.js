document.addEventListener('DOMContentLoaded', () => {
    const tutor = localStorage.getItem('userId');
    
    const pendingSessions = document.getElementById('pending-list');
    const upcomingSessions = document.getElementById('confirmed-list');
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
                    <h3>Session:${session._id}</h3>
                    <div class="date">${(session.sessionDate).slice(0, 10)}</div>
                    <div class="info">
                        <h4>${session.subject}</h4>
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
});

function confirmBooking(button) {
    let id = button.parentElement.querySelector('h3').textContent.split(':')[1];
    fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Confirmed' })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        //reload the page
        location.reload();
}

function deleteBooking(button) {
    let id = button.parentElement.querySelector('h3').textContent.split(':')[1];
    fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        //reload the page
        location.reload();
}