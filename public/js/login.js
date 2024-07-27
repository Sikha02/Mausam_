document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');

    signupBtn.addEventListener('click', () => {
        window.location.href = '/registration'; // Change this path if registration.html is in a different directory
    });
});