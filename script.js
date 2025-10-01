// Recargar página
const title = document.getElementById('reload-page');
title.addEventListener('click', function() {
    location.reload();
});

// Menú hamburguesa corregido
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');

menu.addEventListener('click', function() {
    nav.classList.toggle('show');
    
    // Cambiar icono de hamburguesa
    if (nav.classList.contains('show')) {
        menu.innerHTML = '×';
    } else {
        menu.innerHTML = '☰';
    }
});

// Cerrar menú al hacer click en un enlace (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            nav.classList.remove('show');
            menu.innerHTML = '☰';
        }
    });
});

// Cerrar menú al redimensionar ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        nav.classList.remove('show');
        menu.innerHTML = '☰';
    }
});

// NUEVAS FUNCIONALIDADES

// 1. Modo oscuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Cambiar icono
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// 2. Animaciones en scroll con Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animar contadores si los hay
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(animateCounter);
        }
    });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// 3. Contador animado
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        counter.textContent = Math.ceil(current);
        
        if (current < target) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// 4. Filtros de proyectos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remover clase activa de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Añadir clase activa al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// 6. Formulario mejorado con validación
const form = document.querySelector('.contact-form');
const formInputs = form.querySelectorAll('input, textarea');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar campos
    formInputs.forEach(input => {
        const errorMsg = input.parentNode.querySelector('.error-message');
        
        if (!input.value.trim()) {
            errorMsg.textContent = 'Este campo es obligatorio';
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            errorMsg.textContent = 'Email no válido';
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorMsg.textContent = '';
            input.style.borderColor = '#27ae60';
        }
    });
    
    if (isValid) {
        // Mostrar estado de carga
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Simular envío (reemplazar con envío real)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            showNotification('¡Mensaje enviado correctamente!', 'success');
            form.reset();
            formInputs.forEach(input => input.style.borderColor = '');
        }, 2000);
    }
});

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 6. Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// 7. Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Añadir animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
