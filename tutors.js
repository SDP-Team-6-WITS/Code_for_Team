document.addEventListener('DOMContentLoaded', () => {
    const tutorList = document.getElementById('tutor-list');



    const getTutors = async () => {
        fetch(`http://localhost:3000/api/users/tutors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Tutors:', data);
                displayTutors(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Display tutors and their availability
    const displayTutors = (tutors) => {
        tutorList.innerHTML = '';

        tutors.forEach(tutor => {
            const tutorCard = document.createElement('div');
            tutorCard.className = 'section';

            // Set profile picture
            const profilePicture = tutor.profilePicture
                ? `data:${tutor.profilePicture.contentType};base64,${tutor.profilePicture.data}`
                : './Icons/default-profile.png'; // Default picture

            tutorCard.innerHTML = `
                <img src="${profilePicture}" alt="${tutor.firstName} ${tutor.lastName}">
                <h2>${tutor.fname} ${tutor.lname}</h2>
                <p>Available on:</p>
                ${displayAvailability(tutor.availability)}
            `;

            tutorList.appendChild(tutorCard);
        });
    };

    // Create availability HTML
    const displayAvailability = (availability) => {
        if (!availability || availability.length === 0) {
            return '<p>No availability data.</p>';
        }

        return availability.map(avail => `
            <div>
                <strong>${avail.date}:</strong>
                <ul>
                    ${avail.slots.map(slot => `<li>${slot}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    };

    // Call displayTutors with mock data
    getTutors();
    displayTutors(tutors);
});
