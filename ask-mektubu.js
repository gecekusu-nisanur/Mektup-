// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞', '💟'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 1000);
}

// Create music notes
function createMusicNotes() {
    const notesContainer = document.getElementById('musicNotes');
    const notes = ['🎵', '🎶', '🎼'];
    
    setInterval(() => {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.animationDuration = (4 + Math.random() * 3) + 's';
        notesContainer.appendChild(note);
        
        setTimeout(() => {
            note.remove();
        }, 7000);
    }, 1500);
}

// Envelope opening animation
const openBtn = document.getElementById('openBtn');
const envelope = document.querySelector('.envelope');
const letter = document.getElementById('letter');
const bottomMessage = document.getElementById('bottomMessage');

openBtn.addEventListener('click', () => {
    // Hide button
    openBtn.classList.add('hidden');
    
    // Open envelope
    setTimeout(() => {
        envelope.classList.add('opened');
    }, 100);
    
    // Show letter
    setTimeout(() => {
        letter.classList.add('show');
    }, 800);
    
    // Show bottom message
    setTimeout(() => {
        bottomMessage.style.display = 'block';
    }, 2000);
    
    // Create burst of hearts
    createHeartBurst();
    
    // Start continuous animations
    setTimeout(() => {
        createFloatingHearts();
        createMusicNotes();
    }, 1500);
});

// Create heart burst effect
function createHeartBurst() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 200;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.style.setProperty('--end-x', endX + 'px');
            heart.style.setProperty('--end-y', endY + 'px');
            heart.style.animation = 'heartBurst 1.5s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1500);
        }, i * 50);
    }
}

// Add heart burst animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--end-x) - var(--start-x, 0)), calc(var(--end-y) - var(--start-y, 0))) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add click effect on letter
letter.addEventListener('click', (e) => {
    const clickHeart = document.createElement('div');
    clickHeart.textContent = '💕';
    clickHeart.style.position = 'fixed';
    clickHeart.style.left = e.clientX + 'px';
    clickHeart.style.top = e.clientY + 'px';
    clickHeart.style.fontSize = '25px';
    clickHeart.style.pointerEvents = 'none';
    clickHeart.style.zIndex = '1000';
    clickHeart.style.animation = 'clickHeart 1s ease-out forwards';
    
    document.body.appendChild(clickHeart);
    
    setTimeout(() => {
        clickHeart.remove();
    }, 1000);
});

// Add click heart animation
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickHeart {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(0, -30px) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(0, -60px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !envelope.classList.contains('opened')) {
        openBtn.click();
    }
});

// Touch support for mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!envelope.classList.contains('opened')) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 50) {
            openBtn.click();
        }
    }
});

// Parallax effect for stars
window.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.stars, .stars2, .stars3');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        star.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add sparkle effect on envelope hover
const envelopeWrapper = document.getElementById('envelopeWrapper');
envelopeWrapper.addEventListener('mousemove', (e) => {
    if (!envelope.classList.contains('opened')) {
        const rect = envelopeWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '15px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        sparkle.style.animation = 'sparkleFade 0.8s ease-out forwards';
        
        envelopeWrapper.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
});

// Add sparkle fade animation
const sparkleFadeStyle = document.createElement('style');
sparkleFadeStyle.textContent = `
    @keyframes sparkleFade {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(10px, -10px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(20px, -20px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleFadeStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💌 Aşk Mektubun Hazır 💌', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
    console.log('%cMektubu açmak için butona tıkla veya Enter tuşuna bas ❤️', 'color: #f5576c; font-size: 14px;');
});

// Add typing effect to letter (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
