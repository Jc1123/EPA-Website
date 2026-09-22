const API_URL = 'http://localhost:3000/api'; // Altere no deploy

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            navButtons.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            // Adiciona active
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });
});