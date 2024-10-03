document.addEventListener('DOMContentLoaded', () => {
    const tutor = localStorage.getItem('userId');
    
    const availabilityList = document.getElementById('availability-list');

            // Get All Feedback of a tutor
            const getAvailabilityByTutor = async (tutor) => {
                fetch(`${API_BASE_URL}/availability/${tutor}`, {
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
                const availabilityElement = document.createElement('form');
                availabilityElement.classList.add('availability-card');
                availabilityElement.innerHTML = `
                    <h3>Availability:${availability._id}</h3>
                    
                    <label for="start">Start Date:</label>
                    <input type="date" id="start" name="start" value="${(availability.startDate).slice(0,10)}">
                    <label for="end">End Date:</label>
                    <input type="date" id="end" name="end" value="${(availability.endDate).slice(0,10)}">
                `;
                let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for(let i=0; i<7; i++) {
                    const avail = document.createElement('div');
                    avail.classList.add('avail');
                    avail.innerHTML = `
                        <label id="day">Day:${days[i]}</label>
                    `;
                    for(let j=0; j<3;j++){
                        const slotElement = document.createElement('div');
                        slotElement.classList.add('slot');
                        slotElement.innerHTML += `
                        <label for="start">Slot:${j+1}</label>
                        <input type="time" id="start${availability._id + days[i] + j}" name="start" >
                        <span>To</span>
                        <input type="time" id="end${availability._id + days[i] + j}" name="end" >
                        `;
                        avail.appendChild(slotElement);
                    }  
                    availabilityElement.appendChild(avail);
                }
                
                availabilityElement.innerHTML += `
                <button class="edit-btn" type="submit">Save Changes</button>
                <button class="edit-btn" onclick="deleteAvailability(this)">Delete</button>
                `
                availabilityList.appendChild(availabilityElement);

                //display times
                (availability.availability).forEach(av => {
                    let slotnum = 0;
                    (av.slots).forEach(slot => {
                        document.getElementById(`start${availability._id}${av.date}${slotnum}`).value = slot.start;
                        document.getElementById(`end${availability._id}${av.date}${slotnum}`).value = slot.end;
                        slotnum++;
                    });
                    
                });

                availabilityElement.addEventListener('submit', async function (event) {
                    event.preventDefault();
                    let id = (((availabilityElement).querySelector('h3')).textContent).split(':')[1];
                    //get details from form
                    let startDate = ((availabilityElement).querySelector('#start')).value;
                    let endDate = ((availabilityElement).querySelector('#end')).value;
                    let availability = [];
                    let avails = (availabilityElement).querySelectorAll('.avail');
                    for(let i=0; i<avails.length; i++){
                        let date = (((avails[i]).querySelector('#day')).textContent).split(':')[1];
                        let slots = [];
                        let slotElements = (avails[i]).querySelectorAll('.slot');
                        for(let j=0; j<slotElements.length; j++){
                            let start = ((slotElements[j]).querySelector(`#start${id}${date}${j}`)).value;
                            let end = ((slotElements[j]).querySelector(`#end${id}${date}${j}`)).value;
                            slots.push({start: start, end: end});
                            console.log(start, end)
                        }
                        availability.push({date: date, slots: slots});
                    }
                    const availData = {
                        availability: availability,
                        startDate: startDate,
                        endDate: endDate
                    }

                    await fetch(`${API_BASE_URL}/availability/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(availData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            confirm(error);
                        });
                
                        //reload the page
                        location.reload();
                });
            });

            //Add empty availabilityElement for adding new availability
            const availabilityElement = document.createElement('form');
                availabilityElement.classList.add('availability-card');
                availabilityElement.innerHTML = `
                    <h3>Add New Availability</h3>
                    
                    <label for="start">Start Date:</label>
                    <input type="date" id="start" name="start" >
                    <label for="end">End Date:</label>
                    <input type="date" id="end" name="end" >
                `;
                let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for(let i=0; i<7; i++) {
                    const avail = document.createElement('div');
                    avail.classList.add('avail');
                    avail.innerHTML = `
                        <label id="day">Day:${days[i]}</label>
                    `;
                    for(let j=0; j<3;j++){
                        const slotElement = document.createElement('div');
                        slotElement.classList.add('slot');
                        slotElement.innerHTML += `
                        <label for="start">Slot:${j+1}</label>
                        <input type="time" id="start${days[i] + j}" name="start" >
                        <span>To</span>
                        <input type="time" id="end${days[i] + j}" name="end" >
                        `;
                        avail.appendChild(slotElement);
                    }  
                    availabilityElement.appendChild(avail);
                }
                
                availabilityElement.innerHTML += `
                <button class="edit-btn" type="submit">Save Changes</button>
                `
                availabilityList.appendChild(availabilityElement);

                availabilityElement.addEventListener('submit', async function (event) {
                    event.preventDefault();
                    //get details from form
                    let startDate = ((availabilityElement).querySelector('#start')).value;
                    let endDate = ((availabilityElement).querySelector('#end')).value;
                    let availability = [];
                    let avails = (availabilityElement).querySelectorAll('.avail');
                    for(let i=0; i<avails.length; i++){
                        let date = (((avails[i]).querySelector('#day')).textContent).split(':')[1];
                        let slots = [];
                        let slotElements = (avails[i]).querySelectorAll('.slot');
                        for(let j=0; j<slotElements.length; j++){
                            let start = ((slotElements[j]).querySelector(`#start${date}${j}`)).value;
                            let end = ((slotElements[j]).querySelector(`#end${date}${j}`)).value;
                            slots.push({start: start, end: end});
                        }
                        availability.push({date: date, slots: slots});
                    }
                    const availData = {
                        user: tutor,
                        availability: availability,
                        startDate: startDate,
                        endDate: endDate
                    }

                    await fetch(`${API_BASE_URL}/availability/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(availData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            confirm(error);
                        });
                
                        //reload the page
                        location.reload();
                });

            
        }


        getAvailabilityByTutor(tutor);

        
        
});

function deleteAvailability(button) {
    let id = (((button.parentElement).querySelector('h3')).textContent).split(':')[1];
    fetch(`${API_BASE_URL}/availability/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            confirm(error);
        });
}