console.log('Boborahim Mashrab Website Loaded');

// DOM Elements
const header = document.getElementById('main-header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const langBtns = document.querySelectorAll('.lang-btn');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.classList.remove('scrolled');
        header.style.padding = '20px 0';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
    }
});

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active'); // Animate hamburger

        // Simple hamburger animation toggle
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        });
    });
}

// Translations Data (Simplified for Demo)
const translations = {
    uz: {
        nav_home: "Bosh sahifa",
        nav_courses: "Kurslar",
        nav_teachers: "O‘qituvchilar",
        nav_results: "Natijalar",
        nav_branches: "Filiallar",
        nav_contact: "Bog‘lanish",
        btn_register: "Ro‘yxatdan o‘tish",
        hero_title: "Kelajagingizni Biz Bilan Quring",
        hero_subtitle: "Sifatli ta’lim – muvaffaqiyat garovi. Bizning o‘quv markazimizda eng yaxshi ustozlardan ta’lim oling.",
        btn_courses: "Kurslarni ko‘rish",
        btn_contact: "Bog‘lanish",
        section_courses: "Bizning Kurslar"
    },
    ru: {
        nav_home: "Главная",
        nav_courses: "Курсы",
        nav_teachers: "Учителя",
        nav_results: "Результаты",
        nav_branches: "Филиалы",
        nav_contact: "Контакты",
        btn_register: "Регистрация",
        hero_title: "Постройте своё будущее с нами",
        hero_subtitle: "Качественное образование - залог успеха. Учитесь у лучших учителей в нашем учебном центре.",
        btn_courses: "Посмотреть курсы",
        btn_contact: "Связаться",
        section_courses: "Наши Курсы"
    },
    en: {
        nav_home: "Home",
        nav_courses: "Courses",
        nav_teachers: "Teachers",
        nav_results: "Results",
        nav_branches: "Branches",
        nav_contact: "Contact",
        btn_register: "Register",
        hero_title: "Build Your Future With Us",
        hero_subtitle: "Quality education is the key to success. Learn from the best teachers at our learning center.",
        btn_courses: "View Courses",
        btn_contact: "Contact Us",
        section_courses: "Our Courses"
    }
};

// Language Switcher Logic
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        langBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});

function updateLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            el.textContent = data[key];
        }
    });

    document.documentElement.lang = lang;
}

// Chat Widget Logic
function initChatWidget() {
    // Check if widget already exists (to avoid duplicates or if manually added)
    if (document.getElementById('chat-widget')) return;

    const chatWidgetHTML = `
    <div id="chat-widget" class="chat-widget">
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <h3>Biz bilan bog‘laning</h3>
                <button class="close-chat" aria-label="Close Chat">&times;</button>
            </div>
            <div class="chat-body" id="chat-body">
                <p class="chat-welcome">Assalomu alaykum! Qaysi filialimizga yozmoqchisiz?</p>
                <div class="registrar-options">
                    <button class="registrar-btn" data-registrar="Filial 1">Filial 1 (Markaz)</button>
                    <button class="registrar-btn" data-registrar="Filial 2">Filial 2 (Chilonzor)</button>
                    <button class="registrar-btn" data-registrar="Filial 3">Filial 3 (Yunusobod)</button>
                    <button class="registrar-btn" data-registrar="Filial 4">Filial 4 (Sergeli)</button>
                    <button class="registrar-btn" data-registrar="Filial 5">Filial 5 (Ko‘kcha)</button>
                </div>
                <div class="chat-messages" id="chat-messages" style="display: none;"></div>
            </div>
            <div class="chat-footer" style="display: none;" id="chat-footer">
                <input type="text" placeholder="Xabaringizni yozing..." id="chat-input">
                <button id="send-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
        <button class="chat-toggle-btn" id="chat-toggle-btn" aria-label="Open Chat">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
    setupChatListeners();
}

function setupChatListeners() {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.querySelector('.close-chat');
    const registrarBtns = document.querySelectorAll('.registrar-btn');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        registrarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const registrar = btn.getAttribute('data-registrar');
                startChat(registrar);
            });
        });

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

// Initialize Chat
document.addEventListener('DOMContentLoaded', initChatWidget);

// We need to re-query these inside functions or use a better structure, but for this simple script:

function startChat(registrar) {
    const registrarOptions = document.querySelector('.registrar-options');
    const chatMessages = document.getElementById('chat-messages');
    const chatFooter = document.getElementById('chat-footer');

    registrarOptions.style.display = 'none';
    chatMessages.style.display = 'flex';
    chatMessages.style.flexDirection = 'column';
    chatFooter.style.display = 'flex';

    addMessage(`Siz ${registrar} bilan bog‘landingiz. Sizga qanday yordam bera olamiz?`, 'received');
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'sent');
    chatInput.value = '';

    setTimeout(() => {
        addMessage('Xabaringiz qabul qilindi. Tez orada operatorimiz javob beradi.', 'received');
    }, 1000);
}

function addMessage(text, type) {
    const chatMessages = document.getElementById('chat-messages');
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatBody.scrollTo(0, chatBody.scrollHeight);
}
