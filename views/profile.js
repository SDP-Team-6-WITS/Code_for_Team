document.addEventListener('DOMContentLoaded', () => {
    const tutor = localStorage.getItem('userId');
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const qualification = document.getElementById('qualification');
    const courses = document.getElementById('courses');
    const password = document.getElementById('password');

            // Get All Feedback of a tutor
        const getTutorProfile = async (tutor) => {
            fetch(`http://localhost:3000/api/users/${tutor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayProfile(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        const displayProfile = (profile) => {
            name.value = profile.fname + ' ' + profile.lname;
            email.value = profile.email;
            qualification.value = profile.qualifications;
            courses.value = profile.courses;
            password.value = profile.password;
        }

        getTutorProfile(tutor);
})