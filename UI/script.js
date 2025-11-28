// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize dashboard tabs
    initDashboardTabs();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize button event listeners
    initButtonEvents();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            // Change icon based on state
            if (mobileNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('fa-bars');
                mobileMenuToggle.classList.add('fa-times');
            } else {
                mobileMenuToggle.classList.remove('fa-times');
                mobileMenuToggle.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('fa-times');
                mobileMenuToggle.classList.add('fa-bars');
            });
        });
    }
}

// Dashboard Tabs Functionality
function initDashboardTabs() {
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    
    dashboardTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.dashboard-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-dashboard`).classList.add('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Observe stat cards for animation
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button Event Listeners
function initButtonEvents() {
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login functionality would be implemented here');
            // In a real application, this would open a login modal or redirect to login page
        });
    }
    
    // Signup button
    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('Signup functionality would be implemented here');
            // In a real application, this would open a signup modal or redirect to signup page
        });
    }
    
    // Demo exam interface interaction
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            this.style.backgroundColor = '#4361ee';
            this.style.color = 'white';
            this.style.borderColor = '#4361ee';
        });
    });
}

// Utility function to simulate API calls
function simulateAPICall(endpoint, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API Call to ${endpoint}`, data);
            resolve({ success: true, data: {} });
        }, 1000);
    });
}

// Feature detection for modern browser features
function checkBrowserCompatibility() {
    const features = {
        'IntersectionObserver': 'IntersectionObserver' in window,
        'Promise': 'Promise' in window,
        'CSSGrid': 'CSS' in window && 'supports' in window.CSS && 
                   window.CSS.supports('display', 'grid')
    };
    
    if (!features.CSSGrid) {
        console.warn('CSS Grid is not supported in this browser. Layout may not appear correctly.');
    }
    
    return features;
}

// Initialize browser compatibility check
checkBrowserCompatibility();

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initMobileMenu,
        initDashboardTabs,
        simulateAPICall,
        checkBrowserCompatibility
    };
}