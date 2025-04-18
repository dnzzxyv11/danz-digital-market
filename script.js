// Mobile Menu Toggle
document.querySelector('.menu-bar').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
    this.classList.toggle('fa-times');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update URL without reload
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
            
            // Close mobile menu if open
            if (document.querySelector('.menu').classList.contains('active')) {
                document.querySelector('.menu').classList.remove('active');
                document.querySelector('.menu-bar').classList.remove('fa-times');
            }
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active menu item on scroll
    const sections = document.querySelectorAll('section, div[id]');
    const navItems = document.querySelectorAll('.menu li');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('a').getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Click effect on boxes
document.querySelectorAll('.box-services .box, .box-products .box, .social-btn').forEach(box => {
    box.addEventListener('click', function(e) {
        // Skip if clicked on a link inside the box
        if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
            return;
        }
        
        // Create click effect
        const clickEffect = document.createElement('span');
        clickEffect.classList.add('click-effect');
        
        // Get click position
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position the effect
        clickEffect.style.left = `${x}px`;
        clickEffect.style.top = `${y}px`;
        
        // Add to box
        this.appendChild(clickEffect);
        
        // Remove after animation
        setTimeout(() => {
            clickEffect.remove();
        }, 600);
        
        // Scale effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Scroll Animation for Items
function animateOnScroll() {
    const servicesBoxes = document.querySelectorAll('.box-services .box');
    const productBoxes = document.querySelectorAll('.box-products .box');
    
    const triggerBottom = window.innerHeight / 5 * 4;
    
    servicesBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        
        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
    
    productBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        
        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}

// Run once on page load
window.addEventListener('load', animateOnScroll);

// Run on scroll
window.addEventListener('scroll', animateOnScroll);