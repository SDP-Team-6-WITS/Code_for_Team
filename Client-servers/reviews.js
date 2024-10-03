const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

document.getElementById('submit-feedback').addEventListener('click', () => {
    const comments = document.getElementById('comments').value;
    
    if (selectedRating === 0) {
        alert('Please select a star rating before submitting.');
        return;
    }

    const feedbackData = {
        rating: selectedRating,
        comments: comments
    };

    // Here you can handle the form submission (e.g., send the feedback to your server)
    console.log('Submitted feedback:', feedbackData);
    
    // Show success notification
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('show');

    // Hide the notification after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);

    // Clear the form after submission
    document.getElementById('comments').value = '';

    // Clear the form after submission
    document.getElementById('comments').value = '';
    highlightStars(0); // Reset stars
});
