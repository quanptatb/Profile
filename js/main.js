/**
 * Premium Profile Interface - Main JavaScript
 * Handles animations, interactions, and dynamic effects
 */

// ===================================
// Smooth Scroll Handling
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar-glass');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe profile cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach(card => observer.observe(card));
});

// ===================================
// Skill Badge Interactions
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const skillBadges = document.querySelectorAll('.skill-badge');

    skillBadges.forEach(badge => {
        // Add ripple effect on click
        badge.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Add random animation delay for staggered effect
        const delay = Math.random() * 0.5;
        badge.style.animationDelay = `${delay}s`;
    });
});

// Add ripple animation via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .skill-badge {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ===================================
// Parallax Effect on Scroll
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroSection.style.opacity = 1 - (scrolled / 500);
    }
});

// ===================================
// Mobile Navigation Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarToggler.click();
                }
            });
        });
    }
});

// ===================================
// Profile Card Tilt Effect (Desktop Only)
// ===================================
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', () => {
        const profileCards = document.querySelectorAll('.profile-card');

        profileCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    });
}

// ===================================
// Dynamic Skill Count Animation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.skill-badge');
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.opacity = '0';
                        badge.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            badge.style.transition = 'all 0.5s ease-out';
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsGrids = document.querySelectorAll('.skills-grid');
    skillsGrids.forEach(grid => skillsObserver.observe(grid));
});

// ===================================
// Image Slider / Carousel Functionality
// ===================================
class Slider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.track = this.slider.querySelector('.slider-track');
        this.slides = this.slider.querySelectorAll('.slider-slide');
        this.prevBtn = this.slider.querySelector('.slider-prev');
        this.nextBtn = this.slider.querySelector('.slider-next');
        this.indicators = this.slider.querySelectorAll('.slider-indicator');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        // Button event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicator event listeners
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.nextSlide();
            if (touchEndX > touchStartX + 50) this.prevSlide();
        };

        this.handleSwipe = handleSwipe;

        // Start autoplay
        this.startAutoplay();

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentSlide = index;
        const offset = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        this.updateIndicators();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        new Slider(sliderWrapper.closest('.slider-container'));
    }
});

// ===================================
// Animated Statistics Counters
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat cards and animate when visible
document.addEventListener('DOMContentLoaded', () => {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                const targetValue = parseInt(numberElement.getAttribute('data-target'));
                animateCounter(numberElement, targetValue);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statObserver.observe(card));
});

// ===================================
// Skill Progress Bars Animation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-fill');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 100);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const progressItems = document.querySelectorAll('.skill-progress-item');
    progressItems.forEach(item => progressObserver.observe(item));
});

// ===================================
// Floating Particles Background
// ===================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '-20px';

        // Random animation duration between 10-20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// ===================================
// Scroll Progress Indicator
// ===================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;

    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Theme Toggle
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('light-theme')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===================================
// Contact Form Validation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');

        let isValid = true;

        // Simple validation
        if (!name.value.trim()) {
            name.style.borderColor = '#f5576c';
            isValid = false;
        } else {
            name.style.borderColor = '';
        }

        if (!email.value.trim() || !email.value.includes('@')) {
            email.style.borderColor = '#f5576c';
            isValid = false;
        } else {
            email.style.borderColor = '';
        }

        if (!message.value.trim()) {
            message.style.borderColor = '#f5576c';
            isValid = false;
        } else {
            message.style.borderColor = '';
        }

        if (isValid) {
            // Success animation
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }
    });
});

// ===================================
// Page Loader
// ===================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// ===================================
// Timeline Scroll Animation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
});

// ===================================
// Enhanced Particle Effects on Hover
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.profile-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add subtle particle burst effect
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c🎨 Premium Profile Interface', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with ❤️ using modern web technologies', 'color: #f093fb; font-size: 12px;');
console.log('%cFeatures: Glassmorphism • Gradients • Animations', 'color: #00f2fe; font-size: 12px;');
console.log('%c✨ New: Particles • Theme Toggle • Timeline • And More!', 'color: #30cfd0; font-size: 12px; font-weight: bold;');

