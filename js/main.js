// XashPay Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Partner logos data
    const partners = [
        { name: 'DSTV', color: '#0077c8' },
        { name: 'Telcom', color: '#00a651' },
        { name: 'ZESA', color: '#ffd200' },
        { name: 'Econet', color: '#00a651' },
        { name: 'NetOne', color: '#0077c8' },
        { name: 'Telecel', color: '#e31b23' },
        { name: 'Vodacom', color: '#e60000' },
        { name: 'OTT', color: '#ff6600' },
        { name: 'Blu Voucher', color: '#0066cc' },
        { name: 'Cell C', color: '#000000' },
        { name: 'MTN', color: '#ffcc00' },
        { name: 'EScom', color: '#003366' }
    ];

    // Initialize partners carousel
    initPartnersCarousel();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Partners carousel function
    function initPartnersCarousel() {
        const track = document.querySelector('.partners-track');
        
        // Create partner logos
        partners.forEach(partner => {
            const logo = createPartnerLogo(partner);
            track.appendChild(logo);
        });
        
        // Clone partners for infinite scroll effect
        const partnerLogos = document.querySelectorAll('.partner-logo');
        partnerLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Create partner logo element
    function createPartnerLogo(partner) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'partner-logo flex items-center justify-center';
        
        // Create a styled div with the partner name (as a placeholder for actual logos)
        const logoPlaceholder = document.createElement('div');
        logoPlaceholder.className = 'px-6 py-3 rounded-lg font-bold text-white';
        logoPlaceholder.style.background = partner.color;
        logoPlaceholder.textContent = partner.name;
        
        logoContainer.appendChild(logoPlaceholder);
        return logoContainer;
    }

    // Mobile menu function
    function initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and times
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth scrolling function
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Scroll to element without changing URL hash
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add active class to navbar items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-xashPink');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-xashPink');
            }
        });
    });
});
