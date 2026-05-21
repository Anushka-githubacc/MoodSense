// ============================================
// MoodSense - JavaScript Logic
// Emotion Detection & Animation Controller
// ============================================

// Mood Detection Database
// Each mood has: emoji, message, color class, and detection keywords
const moodDatabase = {
    happy: {
        emoji: '😄',
        messages: [
            'That\'s wonderful! Your happiness is contagious! 🌟',
            'Amazing! Keep spreading that positive energy! ✨',
            'Love the enthusiasm! The world needs more joy like this! 🎉',
            'Fantastic! Your smile can light up any room! 💫'
        ],
        colorClass: 'mood-happy',
        keywords: ['happy', 'joyful', 'glad', 'delighted', 'cheerful', 'great', 'awesome', 'amazing', 'wonderful']
    },
    sad: {
        emoji: '💙',
        messages: [
            'I sense some sadness here. Remember, tough times don\'t last, but tough people do. 💪',
            'It\'s okay to feel sad sometimes. Reach out to someone you care about. 🤝',
            'Your feelings are valid. Take time to heal and be kind to yourself. 🌸',
            'Every cloud has a silver lining. Better days are ahead! 🌈'
        ],
        colorClass: 'mood-sad',
        keywords: ['sad', 'unhappy', 'down', 'depressed', 'miserable', 'upset', 'hurt', 'lonely', 'broken']
    },
    excited: {
        emoji: '🤩',
        messages: [
            'WOW! That energy is absolutely electrifying! ⚡🚀',
            'Your excitement is contagious! Keep riding that wave! 🌊',
            'This is the spirit! Let\'s go make things happen! 💥',
            'Phenomenal! You\'re ready to conquer the world! 🏆'
        ],
        colorClass: 'mood-excited',
        keywords: ['excited', 'thrilled', 'pumped', 'energized', 'hyped', 'stoked', 'enthusiastic', 'wild', 'crazy']
    },
    sleepy: {
        emoji: '😴',
        messages: [
            'Getting drowsy? Maybe it\'s time for a cozy nap! 😴💤',
            'Your body is telling you it needs rest. Listen to it! 🛏️',
            'Feeling sleepy? How about some coffee and a power nap? ☕✨',
            'Rest is important! Go get some quality sleep soon. 🌙'
        ],
        colorClass: 'mood-sleepy',
        keywords: ['sleepy', 'tired', 'exhausted', 'drowsy', 'fatigued', 'weary', 'worn out', 'lazy']
    },
    hungry: {
        emoji: '🍕',
        messages: [
            'Rumbling tummy detected! Time for a delicious meal! 🍔',
            'Your stomach\'s calling! Grab something tasty to eat! 🍜',
            'Hunger is calling! How about a snack break? 🍪',
            'Fuel up! Your body needs some nourishment! 🥗'
        ],
        colorClass: 'mood-hungry',
        keywords: ['hungry', 'starving', 'ravenous', 'peckish', 'famished', 'appetite', 'craving', 'food']
    }
};

// Default message for unrecognized emotions
const unknownMood = {
    emoji: '🤔',
    messages: [
        'I don\'t quite understand that emotion yet! 🤷‍♂️ Try one of our suggestions!',
        'That\'s an interesting feeling! I\'m still learning. Try another emotion! 📚',
        'Hmm, that\'s a new one for me! Can you be more specific? 💭'
    ],
    colorClass: 'mood-unknown'
};

// ============= DOM Elements =============
const moodInput = document.getElementById('moodInput');
const checkMoodBtn = document.getElementById('checkMoodBtn');
const resultContainer = document.getElementById('resultContainer');
const resultBox = document.getElementById('resultBox');
const resultEmoji = document.getElementById('resultEmoji');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const loadingSpinner = document.getElementById('loadingSpinner');

// ============= Initialize =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 MoodSense Initialized Successfully!');
    
    // Add event listeners
    checkMoodBtn.addEventListener('click', detectMood);
    moodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            detectMood();
        }
    });

    // Auto-focus input on load for better UX
    moodInput.focus();
});

// ============= Main Mood Detection Function =============
function detectMood() {
    const userInput = moodInput.value.trim().toLowerCase();

    // Validate input
    if (!userInput) {
        showAlert('Please type an emotion! 💭');
        return;
    }

    // Show loading animation
    showLoading();

    // Simulate processing delay for better UX (100-300ms)
    setTimeout(() => {
        hideLoading();
        
        // Find matching mood
        const detectedMood = findMood(userInput);
        
        // Display result
        displayResult(detectedMood);
        
        // Clear input for next query
        moodInput.value = '';
    }, 200);
}

// ============= Find Matching Mood =============
function findMood(input) {
    // Search through mood database
    for (const [moodType, moodData] of Object.entries(moodDatabase)) {
        for (const keyword of moodData.keywords) {
            if (input.includes(keyword)) {
                return moodType;
            }
        }
    }
    
    // Return unknown if no match found
    return 'unknown';
}

// ============= Display Result Function =============
function displayResult(moodType) {
    // Get mood data
    const moodData = moodType !== 'unknown' 
        ? moodDatabase[moodType] 
        : unknownMood;
    
    // Get random message
    const message = moodData.messages[
        Math.floor(Math.random() * moodData.messages.length)
    ];
    
    // Reset result box classes
    resultBox.className = 'glass-card result-box';
    
    // Update result box with mood-specific color
    if (moodType !== 'unknown') {
        resultBox.classList.add(moodData.colorClass);
    }
    
    // Update emoji and title
    resultEmoji.textContent = moodData.emoji;
    resultTitle.textContent = moodType !== 'unknown' 
        ? moodType.charAt(0).toUpperCase() + moodType.slice(1) 
        : 'Unknown Emotion';
    
    // Clear previous text
    resultText.innerHTML = '';
    
    // Show result container
    resultContainer.classList.remove('hidden');
    
    // Typing animation for result text
    typeMessage(message);
    
    // Play subtle animation
    animateResultBox();
}

// ============= Typing Animation =============
function typeMessage(message, speed = 30) {
    let index = 0;
    resultText.innerHTML = '';

    function type() {
        if (index < message.length) {
            resultText.textContent += message[index];
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============= Result Box Animation =============
function animateResultBox() {
    // Add animation class
    resultBox.style.animation = 'none';
    
    // Trigger reflow to restart animation
    void resultBox.offsetWidth;
    
    resultBox.style.animation = 'fade-in-up 0.6s ease-out';
}

// ============= Loading Animation Functions =============
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// ============= Show Alert Function =============
function showAlert(message) {
    // Create temporary alert element
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ef4444, #f97316);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slide-down 0.3s ease-out;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'fade-out 0.3s ease-out forwards';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ============= Set Mood Function (for chips) =============
function setMood(emotion) {
    moodInput.value = emotion;
    moodInput.focus();
    
    // Optional: Auto-detect after setting mood
    // Uncomment the line below to auto-detect when clicking chips
    // setTimeout(detectMood, 100);
}

// ============= Utility: Smooth Scroll Navigation =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============= Input Focus Effects =============
moodInput.addEventListener('focus', () => {
    moodInput.style.transform = 'scale(1.02)';
});

moodInput.addEventListener('blur', () => {
    moodInput.style.transform = 'scale(1)';
});

// ============= Button Ripple Effect =============
checkMoodBtn.addEventListener('mousedown', (e) => {
    const ripple = document.createElement('span');
    const rect = checkMoodBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    `;

    // Add ripple animation style if not exists
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple-animation {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    checkMoodBtn.style.position = 'relative';
    checkMoodBtn.style.overflow = 'hidden';
    checkMoodBtn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// ============= Easter Egg: Keyboard Shortcuts =============
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        moodInput.focus();
    }

    // Shift + Enter to detect mood (alternative shortcut)
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        detectMood();
    }
});

// ============= Console Message =============
console.log('%c🌟 Welcome to MoodSense! 🌟', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cA smart emotion detection webpage using HTML, CSS & JavaScript', 'color: #a855f7; font-size: 14px;');
console.log('%cTip: Use Ctrl+K to focus on the input field!', 'color: #06b6d4; font-size: 12px;');

// ============= Performance Optimization =============
// Lazy load non-critical animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ============= Mobile Touch Optimization =============
if ('ontouchstart' in window) {
    document.querySelectorAll('button').forEach(btn => {
        btn.style.webkitTapHighlightColor = 'transparent';
    });
}

// ============= Advanced Feature: Voice Input (Optional) =============
// Uncomment to enable voice input functionality
/*
function initVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log('Speech Recognition not supported');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        moodInput.value = transcript;
        detectMood();
    };

    // Add voice button listener
    document.addEventListener('voiceInputTriggered', () => {
        recognition.start();
    });
}
*/
