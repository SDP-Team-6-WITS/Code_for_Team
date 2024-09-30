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

        const update = document.getElementById('update');
update.addEventListener('submit', () => {
    const tutor = localStorage.getItem('userId');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const qualification = document.getElementById('qualification').value;
    const courses = document.getElementById('courses').value;
    const password = document.getElementById('password').value;

    const updatedProfile = {
        fname: name.split(' ')[0],
        lname: name.split(' ')[1],
        email: email,
        qualifications: qualification,
        courses: courses,
        password: password
    }

    fetch(`http://localhost:3000/api/users/${tutor}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Profile updated successfully');
            window.location.href = 'profile.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

        getTutorProfile(tutor);
})

