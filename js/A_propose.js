document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.to('.hero-content', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });

    // Stats animation
    gsap.to('.stat-item', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.5 });

    // --- Service Info Section Animations ---
    gsap.to('.service-text', {
        scrollTrigger: { trigger: '.service-info', start: 'top 80%' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out'
    });
    gsap.to('.service-image', {
        scrollTrigger: { trigger: '.service-info', start: 'top 80%' },
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3
    });
    gsap.from('.expertise-categories', {
        scrollTrigger: { trigger: '.service-info', start: 'top 70%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
    });
     gsap.from('.expertise-guarantee', {
        scrollTrigger: { trigger: '.expertise-guarantee', start: 'top 90%' },
        scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.5)'
    });
    // --- End Service Info Animations ---


    // --- Steps animation ---
    gsap.to('.step-item', {
        scrollTrigger: { trigger: '.service-steps', start: 'top 70%' },
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)'
    });

    // --- Route path animation (Desktop Only) ---
    const routePath = document.querySelector('.route-path');
    if (routePath && window.matchMedia("(min-width: 769px)").matches) {
        const pathLength = routePath.getTotalLength();
        gsap.set(routePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(routePath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.service-steps',
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: 1
            }
        });
    }

    // --- Initialize Swiper for Testimonials ---
    const testimonialSwiper = new Swiper('.testimonial-slider.swiper', {
         slidesPerView: 1,
         spaceBetween: 30,
         direction: 'horizontal',
         loop: true,
         autoplay: {
             delay: 6000,
             disableOnInteraction: false,
             pauseOnMouseEnter: true,
         },
         pagination: {
             el: '.swiper-pagination',
             clickable: true,
         },
         keyboard: {
            enabled: true,
          },
    });


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        questionButton.addEventListener('click', () => {
            const currentlyActive = item.parentElement.querySelector('.faq-item.active');

            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });
    // --- END: FAQ Accordion Logic ---

});