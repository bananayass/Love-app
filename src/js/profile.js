// Generate floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💗', '💖', '💝', '💘', '💓'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
        container.appendChild(heart);
    }
}

// Generate rose petals
function createRosePetals() {
    const container = document.getElementById('petalsContainer');

    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(petal);
    }
}

// Heart cursor trail
function createHeartCursor(event) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 1rem;
        z-index: 9999;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        opacity: 0.8;
        animation: heartFade 1s ease forwards;
    `;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
}

// Add heart cursor style
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFade {
        0% { transform: scale(1) translateY(0); opacity: 0.8; }
        100% { transform: scale(1.5) translateY(-50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Continue button handler
document.getElementById('continueBtn').addEventListener('click', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'cause.html';
    }, 500);
});

// Calculate days together from Aug 30, 2025
function calculateDaysTogether() {
    const startDate = new Date('2025-08-30');
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysTogether').textContent = diffDays + ' days';
}

// Initialize
window.addEventListener('load', () => {
    createFloatingHearts();
    createRosePetals();
    calculateDaysTogether();

    document.addEventListener('mousemove', (e) => {
        createHeartCursor(e);
    });
});