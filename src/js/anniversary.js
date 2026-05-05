// Milestone data (placeholder - edit with your real data)
const milestones = {
    1: { title: "Ngày đầu tiên", desc: "Ngày đó bé khóc rất nhiều vì sợ a biết em là con bru chứ không phải con doàn 💕", image: "../images/th.jpg" },
    2: { title: "Lời yêu đầu tiên", desc: "Anh rất vui khi nghe giọng em nói yêu anh, lúc đó cười tủm tỉm ha 💗", image: "../images/first.jpg" },
    3: { title: "Những buổi đi chơi", desc: "Lần đầu ăn mà bị cấm chat không được cho nói =))) 🎉", image: "../images/donhat.jpg" },
    4: { title: "Sinh nhật đầu bên nhau", desc: "Sinh nhật của Anh, được bé tặng quà vs đi ăn, đã nhất Trí Dũng 🎂", image: "../images/sn.jpg" },
    5: { title: "Lại thêm sinh nhật anh", desc: "Hôm đó anh cảm động nhiều vì có người dành nhiều tình cảm cho anh đém vậy, cô gái này thật thú vị cô phải là của tôi 💖", image: "../images/trangden.jpg" },
    6: { title: "Chuyến đi đầu tiên", desc: "Chuyến đi đầu cùng nhau, theo trai về nhà sau 1 ngày yêu nhau ha ✈️", image: "../images/chuyendidau.jpg" },
    7: { title: "Lần đầu tô tượng", desc: "Bữa tô tượng đầu tiên với em, 2 đứa chọn cái gì mà khó vữ nè, iu bé nắm 🎨", image: "../images/totuong.jpg" },
    8: { title: "Đi cổ vũ bé", desc: "Đi coi bé múa nè, ngày đó a cool ngầu còn bé đẹp gái 🎶", image: "../images/covu.jpg" },
    9: { title: "Gặp gia đình", desc: "Anh vui vì được gặp gia đình em, cảm ơn em đã tin tưởng 👨‍👩‍👧", image: "../images/giad.jpg" },
    10: { title: "Yêu xa", desc: "Hic phải yêu xa một thời gian, anh nhớ bé nhìuuu, chúng ta vượt qua cùng nhau 🏢", image: "../images/tuyenmay.jpg" },
    11: { title: "Lần chèo súp đầu", desc: "Lần đầu được đi chèo súp và ăn mì mực với bé, Đi tìm kho báu và cái kết gặp chị huệ 🛶", image: "../images/cheosup.jpg" },
    12: { title: "Camping", desc: "Chuyến đi camping mặc dù còn rất gì và này nọ nhưng mà kỷ niệm rất vui vứi anh, bé bơi như cá vị đóa⛺ ", image: "../images/anor.jpg" }
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
        z-index: 5;
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
        0% { transform: scale(1) translateY(0); opacity: 0.8; pointer-events: none; }
        100% { transform: scale(1.5) translateY(-50px); opacity: 0; pointer-events: none; }
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
        const popupHeight = 300;
        const offset = 15; // Gap between node and popup

        // Left-side popup nodes: 3, 5, 8, 10, 11
        const leftSideNodes = ['3', '5', '8', '10', '11'];
        const showOnLeft = leftSideNodes.includes(info);

        // Position popup - directly adjacent to node
        let left, top;

        if (showOnLeft) {
            // Show popup on the left side of the node with gap
            left = nodeRect.left - popupWidth - offset;
        } else {
            // Show popup on the right side of the node with gap
            left = nodeRect.right + offset;
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