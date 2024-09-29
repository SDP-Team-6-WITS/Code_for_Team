document.addEventListener('DOMContentLoaded', () => {
    const tutor = localStorage.getItem('userId');
    
    const availabilityList = document.getElementById('availability-list');

            // Get All Feedback of a tutor
        const getAvailabilityByTutor = async (tutor) => {
            fetch(`http://localhost:3000/api/availability/${tutor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayAvailabilitys(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        const displayAvailabilitys = (availabilitys) => {
            availabilityList.innerHTML = '';
            availabilitys.forEach(availability => {
                const availabilityElement = document.createElement('div');
                availabilityElement.classList.add('availability-card');
                availabilityElement.innerHTML = `
                    <h3>Availability</h3>
                    <p>Starts:${(availability.startDate).slice(0,10)}  | Ends: ${(availability.endDate).slice(0,10)}</p>
                `;
                (availability.availability).forEach(av => {
                    const avail = document.createElement('div');
                    avail.classList.add('avail');
                    avail.innerHTML = `
                        <p>Date: ${av.date}</p>
                    `;
                    (av.slots).forEach(slot => {
                        const slotElement = document.createElement('p');
                        slotElement.textContent = `${slot.start} - ${slot.end}`;
                        avail.appendChild(slotElement);
                    });
                    availabilityElement.appendChild(avail);
                });
                availabilityList.appendChild(availabilityElement);
            });
        }

        getAvailabilityByTutor(tutor);
})