// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
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

// Observe elements for animation
document.querySelectorAll('.stat, .skill-item, .project-card, .education-card, .achievement-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for the main heading
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heading = document.querySelector('.home-text h1');
    if (heading) {
        const originalText = heading.innerHTML;
        typeWriter(heading, originalText, 50);
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards click effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1)';
        }, 200);
    });
});

// Download CV button enhancement
const downloadBtn = document.querySelector('.btn-primary');
if (downloadBtn && downloadBtn.textContent.includes('Download CV')) {
    downloadBtn.addEventListener('click', function(e) {
        // Add a small delay to show the click effect
        this.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    });
}

// Parallax effect for the home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        const rate = scrolled * -0.5;
        homeSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h4');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Add some interactive hover effects
document.querySelectorAll('.timeline-content, .education-card, .achievement-card, .contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) translateY(0)';
    });
});

// Project Screenshot Modal Functionality
const modal = document.getElementById('screenshotModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDots = document.getElementById('modalDots');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

// Project data with screenshots and descriptions
const projectData = {
    'lpg-gap-analyzer': {
        title: 'LPG Gap Analyzer (Resume Verifier Tool)',
        images: ['images/LPG-1.jpg', 'images/LPG-2.jpg', 'images/LPG-3.jpg', 'images/LPG-4.jpg', 'images/LPG-5.jpg', 'images/LPG-6.jpg'],
        description: 'A comprehensive resume analysis tool that compares resumes with job descriptions and provides actionable recommendations to improve alignment. Features include AI-powered analysis, multiple format support, and detailed gap reports.'
    },
    'heart-disease-prediction': {
        title: 'Heart Disease Prediction Using Machine Learning',
        images: ['heart-1.png', 'heart-2.png'],
        description: 'Machine learning application that predicts cardiovascular heart disease risk based on medical attributes. The interface allows users to input patient data and receive probability assessments with confidence scores.'
    },
    'steganography': {
        title: 'Passing Messages Using Steganography',
        images: ['steg-1.png', 'steg-2.png'],
        description: 'Secure messaging application that embeds data, text, and files within images using advanced encryption. The user-friendly interface supports JPEG and PNG formats with real-time encryption status.'
    },
    'homeeshop': {
        title: 'homeEShop - Online Grocery Platform',
        images: ['images/homeeshop-1.jpg', 'images/homeeshop-2.jpg', 'images/homeeshop-3.jpg', 'images/homeeshop-4.jpg', 'images/homeeshop-5.jpg'],
        description: 'Full-featured e-commerce platform for grocery shopping with home delivery. Features include user authentication, product catalog, shopping cart, order management, and payment integration.'
    },
    'ecommerce': {
        title: 'E-Commerce Website Designing',
        images: ['ecom-1.jpg', 'ecom-2.jpg'],
        description: 'General-purpose e-commerce store supporting various product categories. Includes user registration, product browsing, secure checkout, order tracking, and admin panel for inventory management.'
    }
};

let currentImages = [];
let currentIndex = 0;

function renderDots() {
    modalDots.innerHTML = '';
    currentImages.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'modal-dot' + (idx === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = idx;
            updateImage();
        });
        modalDots.appendChild(dot);
    });
}

function updateImage() {
    if (!currentImages.length) return;
    modalImage.src = currentImages[currentIndex];
    Array.from(modalDots.children).forEach((el, idx) => {
        el.classList.toggle('active', idx === currentIndex);
    });
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    currentImages = project.images && project.images.length ? project.images : [project.image];
    currentIndex = 0;
    renderDots();
    updateImage();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Open modal when View Live button is clicked
document.querySelectorAll('.view-screenshot').forEach(button => {
    button.addEventListener('click', function() {
        openProjectModal(this.getAttribute('data-project'));
    });
});

// Close modal when clicking the X button
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Prev/Next controls
prevBtn.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
});

nextBtn.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
});

// Keyboard left/right
document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    }
});

// Console welcome message
console.log(`
%cWelcome to Tanushree Mondal's Portfolio! 👋
%c
%cFeel free to explore the code and get in touch!
%c
%cEmail: tanushreemondalo21@gmail.com
%cLinkedIn: https://www.linkedin.com/in/tanushreemondal1/
%cGitHub: https://github.com/tanushreemondal1
`,
'color: #007bff; font-size: 18px; font-weight: bold;',
'',
'color: #666; font-size: 14px;',
'',
'color: #007bff; font-size: 12px;',
'color: #007bff; font-size: 12px;',
'color: #007bff; font-size: 12px;'
);
