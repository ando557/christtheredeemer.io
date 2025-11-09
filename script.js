/* ================================================= */
/* КОМПОНЕНТ 1: PRELOADER (ЭКРАН ЗАГРУЗКИ)       */
/* ================================================= */
// Этот код должен выполниться ДО всего остального

// Находим preloader
const preloader = document.getElementById('preloader');

// Вешаем слушателя на событие 'load' (когда ВСЯ страница, вкл. картинки, загружена)
window.addEventListener('load', () => {
    // Добавляем класс, который плавно его скроет (см. CSS)
    preloader.classList.add('hidden');
});


/* ================================================= */
/* ОСНОВНОЙ КОД (когда HTML-структура готова)  */
/* ================================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* ================================= */
    /* КОМПОНЕНТ 2: ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ  */
    /* ================================= */
    const langButtons = document.querySelectorAll('.lang-btn');
    const contentBlocks = document.querySelectorAll('.content-lang');

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');

            langButtons.forEach(btn => btn.classList.remove('active'));
            contentBlocks.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById('content-' + lang).classList.add('active');
        });
    });

    /* ============================================ */
    /* КОМПОНЕНТ 3: "УМНАЯ" АНИМАЦИЯ ПРИ ПРОКРУТКЕ */
    /* ============================================ */
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });

    /* ============================================ */
    /* КОМПОНЕНТ 4: НОВЫЙ 3D-TILT ЭФФЕКТ        */
    /* ============================================ */
    
    // Находим ВСЕ карточки фактов
    const tiltCards = document.querySelectorAll('.info-item');

    tiltCards.forEach(card => {
        // Слушаем движение мыши НАД карточкой
        card.addEventListener('mousemove', (e) => {
            // Находим размеры и положение карточки
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Координата X мыши внутри карты
            const y = e.clientY - rect.top;  // Координата Y мыши внутри карты
            
            const width = card.offsetWidth;
            const height = card.offsetHeight;
            
            // Максимальный угол наклона
            const maxTilt = 15; 

            // Считаем наклон: (0.5 - (x / width)) * maxTilt
            // (0.5 - ...) дает нам диапазон от -0.5 до 0.5
            const tiltX = (maxTilt * (y / height - 0.5)).toFixed(2); // Наклон по оси X
            const tiltY = (maxTilt * (0.5 - x / width)).toFixed(2); // Наклон по оси Y
            
            // Применяем магию CSS
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });

        // Слушаем, когда мышь УШЛА с карточки
        card.addEventListener('mouseleave', () => {
            // Возвращаем карту в исходное положение
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

});