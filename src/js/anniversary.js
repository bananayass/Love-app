// Milestone data (placeholder - edit with your real data)
const milestones = {
    1: { title: "Ngày đầu tiên", desc: "Anh còn nhớ lần đầu gặp em, em cười thật xinh 💕", image: "../images/d1.jpg" },
    2: { title: "Lời yêu đầu tiên", desc: "Trái tim anh rung lên khi nghe giọng em nói yêu anh 💗", image: "../images/d2.jpg" },
    3: { title: "Những buổi đi chơi", desc: "Chúng ta đi khắp nơi, mỗi khoảnh khắc đều đáng nhớ 🎉", image: "../images/d3.jpg" },
    4: { title: "Sinh nhật đầu bên nhau", desc: "Sinh nhật của em, anh chúc em luôn vui vẻ nhé 🎂", image: "../images/d4.jpg" },
    5: { title: "100 ngày bên nhau", desc: "Một trăm ngày bên em, anh chưa bao giờ hạnh phúc thế 💖", image: "../images/d1.jpg" },
    6: { title: "Chuyến đi đầu tiên", desc: "Chuyến đi đầu cùng nhau, em là người đồng hành tuyệt vời ✈️", image: "../images/d2.jpg" },
    7: { title: "Lần đầu nấu ăn", desc: "Bữa ăn đầu tiên anh nấu cho em, còn nhiều thiếu sót 🍳", image: "../images/d3.jpg" },
    8: { title: "Xem phim cùng nhau", desc: "Những buổi xem phim với em luôn là khoảnh khắc đẹp 🎬", image: "../images/d4.jpg" },
    9: { title: "Gặp gia đình", desc: "Anh vui vì được gặp gia đình em, cảm ơn em đã tin tưởng 👨‍👩‍👧", image: "../images/d1.jpg" },
    10: { title: "Kỷ niệm 1 năm", desc: "Một năm trôi qua, anh yêu em nhiều hơn mỗi ngày 💍", image: "../images/d2.jpg" },
    11: { title: "Đêm trăng đầu", desc: "Đêm trăng đẹp nhất bên cạnh em, mong được thế mãi 🌙", image: "../images/d3.jpg" },
    12: { title: "Tương lai", desc: "Anh mong tương lai có em, từng ngày từng tháng từng năm 💝", image: "../images/d4.jpg" }
};

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

// Heart cursor trail (throttled)
let lastHeartTime = 0;
const heartThrottle = 150; // ms between hearts

function createHeartCursor(event) {
    const now = Date.now();
    if (now - lastHeartTime < heartThrottle) return;
    lastHeartTime = now;

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
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFade {
        0% { transform: scale(1) translateY(0); opacity: 0.8; }
        100% { transform: scale(1.5) translateY(-50px); opacity: 0; }
    }
`;
document.head.appendChild(heartStyle);

// Generate SVG paths between nodes
function generatePaths() {
    const svg = document.getElementById('pathsSvg');
    const roadmap = document.getElementById('roadmap');
    const nodes = document.querySelectorAll('.node');

    svg.innerHTML = '';

    const roadmapRect = roadmap.getBoundingClientRect();

    const nodePositions = [];
    nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        nodePositions.push({
            x: rect.left + rect.width / 2 - roadmapRect.left,
            y: rect.top + rect.height / 2 - roadmapRect.top
        });
    });

    // Create curved paths with gradient
    for (let i = 0; i < nodePositions.length - 1; i++) {
        const start = nodePositions[i];
        const end = nodePositions[i + 1];

        const ctrl1x = start.x + (Math.random() * 60 - 30);
        const ctrl1y = start.y + Math.abs(end.y - start.y) * 0.4;
        const ctrl2x = end.x - (Math.random() * 60 - 30);
        const ctrl2y = end.y - Math.abs(end.y - start.y) * 0.4;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${start.x} ${start.y} C ${ctrl1x} ${ctrl1y}, ${ctrl2x} ${ctrl2y}, ${end.x} ${end.y}`);
        path.classList.add('path-line');
        svg.appendChild(path);
    }

    // Animate paths with drawing effect
    setTimeout(() => {
        document.querySelectorAll('.path-line').forEach((path, index) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                delay: index * 0.15,
                ease: "power2.inOut"
            });
        });
    }, 100);
}

// Popup handling with spring physics
const popupCard = document.getElementById('popupCard');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const popupClose = document.getElementById('popupClose');

// Node hover effects
let isShowingPopup = false;
let currentNodeInfo = null;

function closePopup() {
    isShowingPopup = false;
    currentNodeInfo = null;
    gsap.to(popupCard, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            popupCard.classList.remove('visible');
        }
    });
}

function showPopup(node) {
    const info = node.dataset.info;
    const data = milestones[info];

    if (data) {
        currentNodeInfo = info;
        isShowingPopup = true;
        popupImage.src = data.image;
        popupTitle.textContent = data.title;
        popupDesc.textContent = data.desc;

        // Get node position
        const nodeRect = node.getBoundingClientRect();
        const popupWidth = 320;
        const popupHeight = 400;
        const offset = 5; // Small gap between node and popup

        // Left-side popup nodes: 3, 5, 8, 10, 11
        const leftSideNodes = ['3', '5', '8', '10', '11'];
        const showOnLeft = leftSideNodes.includes(info);

        // Position popup - directly adjacent to node
        let left, top;

        if (showOnLeft) {
            // Show popup directly on the left side of the node (edge to edge)
            left = nodeRect.left - popupWidth;
        } else {
            // Show popup directly on the right side of the node (edge to edge)
            left = nodeRect.right;
        }

        // Center popup vertically relative to node
        top = nodeRect.top + (nodeRect.height / 2) - (popupHeight / 2);

        // Clamp to viewport boundaries
        if (left < 20) left = 20;
        if (left + popupWidth > window.innerWidth - 20) {
            left = window.innerWidth - popupWidth - 20;
        }
        if (top < 20) top = 20;
        if (top + popupHeight > window.innerHeight - 20) {
            top = window.innerHeight - popupHeight - 20;
        }
        if (top < 20) top = 20;
        if (top + popupHeight > window.innerHeight - 20) {
            top = window.innerHeight - popupHeight - 20;
        }

        // Position and show popup
        popupCard.style.left = left + 'px';
        popupCard.style.top = top + 'px';
        popupCard.style.transform = 'none';
        popupCard.classList.add('visible');

        gsap.fromTo(popupCard,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    }
}

let isMouseOverPopup = false;

document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        showPopup(node);
    });

    node.addEventListener('mouseleave', () => {
        // Only close if mouse is not moving toward popup
        if (!isMouseOverPopup) {
            closePopup();
        }
    });
});

popupCard.addEventListener('mouseenter', () => {
    isMouseOverPopup = true;
});

popupCard.addEventListener('mouseleave', () => {
    isMouseOverPopup = false;
    closePopup();
});

// Close popup on close button click
popupClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closePopup();
});

// Close popup when clicking outside (on roadmap but not on node or popup)
document.getElementById('roadmap').addEventListener('click', (e) => {
    if (isShowingPopup &&
        !e.target.closest('.node') &&
        !e.target.closest('.popup-card')) {
        closePopup();
    }
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isShowingPopup) {
        closePopup();
    }
});

// Continue button
document.getElementById('continueBtn').addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            window.location.href = 'last.html';
        }
    });
});

// Initialize
window.addEventListener('load', () => {
    createFloatingHearts();
    createRosePetals();
    setTimeout(generatePaths, 200);

    // Heart cursor trail
    document.addEventListener('mousemove', (e) => {
        createHeartCursor(e);
    });
});

window.addEventListener('resize', () => {
    setTimeout(generatePaths, 100);
});