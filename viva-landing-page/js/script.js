/* =========================================================
   Nutritva Landing Page — script.js
   =========================================================
   Sections:
     1. Navbar Scroll Shadow
     2. Hamburger / Mobile Menu
     3. Auth Dropdowns (Sign In / Sign Up)
     4. Hero Carousel
     5. FAQ Accordion
     6. Hamper Tabs
     7. Pincode Input (numbers only)
   ========================================================= */


/* ---------------------------------------------------------
   1. NAVBAR — add shadow class on scroll
--------------------------------------------------------- */
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});


/* ---------------------------------------------------------
   2. HAMBURGER — toggle mobile menu open/close
--------------------------------------------------------- */
document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('open');
});


/* ---------------------------------------------------------
   3. AUTH DROPDOWNS — close when clicking outside
--------------------------------------------------------- */
document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-auth-dropdown').forEach(function (dropdown) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});


/* ---------------------------------------------------------
   4. HERO CAROUSEL — auto-play, arrows, dots
--------------------------------------------------------- */
const slides = document.getElementById('carouselSlides');
const dots   = document.querySelectorAll('.carousel-dot');
let cur   = 0;
let total = 4;
let timer;

// Move carousel to slide index i
function goTo(i) {
    cur = (i + total) % total;
    slides.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dots.forEach(function (dot, j) {
        dot.classList.toggle('active', j === cur);
    });
}

// Start auto-play every 3.6 seconds
function startCarousel() {
    timer = setInterval(function () { goTo(cur + 1); }, 3600);
}

// Stop auto-play (called before manual navigation)
function stopCarousel() {
    clearInterval(timer);
}

// Next / Prev arrow buttons
document.getElementById('nextSlide').addEventListener('click', function () {
    stopCarousel();
    goTo(cur + 1);
    startCarousel();
});

document.getElementById('prevSlide').addEventListener('click', function () {
    stopCarousel();
    goTo(cur - 1);
    startCarousel();
});

// Dot indicators
dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
        stopCarousel();
        goTo(i);
        startCarousel();
    });
});

startCarousel(); // kick off on page load


/* ---------------------------------------------------------
   5. FAQ ACCORDION — expand / collapse questions
--------------------------------------------------------- */
document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item');
        const wasActive = item.classList.contains('active');

        // Close all FAQs first
        document.querySelectorAll('.faq-item').forEach(function (i) {
            i.classList.remove('active');
        });

        // If it wasn't active, open it
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});


/* ---------------------------------------------------------
   6. HAMPER TABS — highlight active tab
--------------------------------------------------------- */
document.querySelectorAll('.htab').forEach(function (tab) {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.htab').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
    });
});


/* ---------------------------------------------------------
   7. PINCODE INPUT — allow numbers only
--------------------------------------------------------- */
document.getElementById('pincodeInput').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});
