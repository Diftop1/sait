// Файл: snow.js - Анимация падающих снежинок
document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для снежинок
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'snowflakes';
    snowflakesContainer.id = 'snow-container';
    document.body.appendChild(snowflakesContainer);
    
    // Создаем стили для снежинок
    const snowStyles = document.createElement('style');
    snowStyles.textContent = `
        .snowflakes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .snowflake {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            animation: snowFall linear infinite;
            pointer-events: none;
        }
        
        .snowflake:before {
            content: '❄';
            position: absolute;
            color: white;
            font-size: inherit;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        
        @keyframes snowFall {
            0% {
                transform: translateY(-10px) translateX(0) rotate(0deg);
                opacity: 0.8;
            }
            70% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(100vh) translateX(20px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .snowflake.small {
            width: 8px;
            height: 8px;
            filter: blur(0.5px);
        }
        
        .snowflake.medium {
            width: 12px;
            height: 12px;
            filter: blur(1px);
        }
        
        .snowflake.large {
            width: 16px;
            height: 16px;
            filter: blur(1.5px);
        }
        
        /* Разные типы снежинок */
        .snowflake.type1:before {
            content: '❄';
        }
        
        .snowflake.type2:before {
            content: '･';
            font-size: 1.5em;
        }
        
        .snowflake.type3:before {
            content: '❅';
        }
        
        .snowflake.type4:before {
            content: '❆';
        }
        
        /* Для страниц разных годов - разные цвета снежинок */
        body[data-year="1975"] .snowflake {
            background: #ffebee;
            color: #ffebee;
        }
        
        body[data-year="1990"] .snowflake {
            background: #e3f2fd;
            color: #e3f2fd;
        }
        
        body[data-year="2000"] .snowflake {
            background: #f3e5f5;
            color: #f3e5f5;
        }
        
        body[data-year="2010"] .snowflake {
            background: #e8f5e8;
            color: #e8f5e8;
        }
        
        body[data-year="2025"] .snowflake {
            background: #fff8e1;
            color: #fff8e1;
        }
    `;
    document.head.appendChild(snowStyles);
    
    // Функция создания одной снежинки
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Случайный размер
        const sizes = ['small', 'medium', 'large'];
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        snowflake.classList.add(sizeClass);
        
        // Случайный тип снежинки
        const types = ['type1', 'type2', 'type3', 'type4'];
        const typeClass = types[Math.floor(Math.random() * types.length)];
        snowflake.classList.add(typeClass);
        
        // Случайная начальная позиция
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `${-Math.random() * 50}px`;
        
        // Случайная скорость падения
        const duration = Math.random() * 15 + 10; // от 10 до 25 секунд
        snowflake.style.animationDuration = `${duration}s`;
        
        // Случайная задержка начала анимации
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        // Случайное боковое движение
        const sway = (Math.random() - 0.5) * 100;
        snowflake.style.setProperty('--sway', `${sway}px`);
        
        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Случайный z-index для эффекта глубины
        snowflake.style.zIndex = Math.floor(Math.random() * 3);
        
        snowflakesContainer.appendChild(snowflake);
        
        // Удаление снежинки после завершения анимации
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
            }
        }, (duration + 5) * 1000);
    }
    
    // Создаем начальные снежинки
    function createInitialSnowflakes() {
        const snowflakeCount = Math.min(window.innerWidth / 10, 150); // Адаптивное количество
        
        for (let i = 0; i < snowflakeCount; i++) {
            setTimeout(() => {
                createSnowflake();
            }, i * 100); // Постепенное появление
        }
    }
    
    // Функция для управления интенсивностью снегопада
    function adjustSnowIntensity() {
        const container = document.getElementById('snow-container');
        if (!container) return;
        
        // Меньше снега на мобильных устройствах
        const isMobile = window.innerWidth < 768;
        const intensity = isMobile ? 0.5 : 1;
        
        // Адаптируем количество снежинок
        const snowflakeCount = Math.min(window.innerWidth / (isMobile ? 15 : 10), 150);
        const currentCount = container.children.length;
        
        if (currentCount > snowflakeCount) {
            // Удаляем лишние снежинки
            const toRemove = currentCount - snowflakeCount;
            for (let i = 0; i < toRemove && container.firstChild; i++) {
                container.removeChild(container.firstChild);
            }
        }
    }
    
    // Инициализация снегопада
    createInitialSnowflakes();
    
    // Создаем новые снежинки с интервалом
    const snowInterval = setInterval(() => {
        const container = document.getElementById('snow-container');
        if (container && container.children.length < 200) { // Максимум 200 снежинок
            createSnowflake();
        }
    }, 300);
    
    // Адаптация к размеру окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustSnowIntensity();
        }, 250);
    });
    
    // Пауза при скрытии вкладки
    document.addEventListener('visibilitychange', () => {
        const snowflakes = document.querySelectorAll('.snowflake');
        if (document.hidden) {
            snowflakes.forEach(snowflake => {
                snowflake.style.animationPlayState = 'paused';
            });
        } else {
            snowflakes.forEach(snowflake => {
                snowflake.style.animationPlayState = 'running';
            });
        }
    });
    
    // Добавляем год как data-атрибут для body
    function detectYearFromPage() {
        const path = window.location.pathname;
        const yearMatch = path.match(/(\d{4})\.html$/);
        
        if (yearMatch) {
            document.body.setAttribute('data-year', yearMatch[1]);
        } else if (path.includes('index.html') || path === '/') {
            document.body.setAttribute('data-year', 'index');
        }
    }
    
    detectYearFromPage();
    
    // Экспорт функций для возможного использования
    window.SnowAnimation = {
        createSnowflake,
        adjustSnowIntensity,
        setIntensity: function(multiplier) {
            const interval = Math.max(100, 300 / multiplier);
            clearInterval(snowInterval);
            setInterval(() => {
                if (document.getElementById('snow-container').children.length < 200) {
                    createSnowflake();
                }
            }, interval);
        },
        stop: function() {
            clearInterval(snowInterval);
            const container = document.getElementById('snow-container');
            if (container) {
                container.remove();
            }
        }
    };
    
    console.log('❄ Снегопад активирован! С Новым Годом! ❄');
});