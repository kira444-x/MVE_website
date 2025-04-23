// Header & Footer script
  document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksMobile = mobileMenu.querySelectorAll('a'); // Get all links in mobile menu

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
      });

      // Close menu when a link is clicked (for hash links on the same page or external links)
      navLinksMobile.forEach(link => {
          link.addEventListener('click', () => {
              if (mobileMenu.classList.contains('active')) {
                  menuToggle.classList.remove('active');
                  mobileMenu.classList.remove('active');
                  menuToggle.setAttribute('aria-expanded', 'false');
              }
          });
      });


      // Optional: Close menu if clicked outside
      document.addEventListener('click', (event) => {
        const isClickInsideNav = menuToggle.contains(event.target) || mobileMenu.contains(event.target) || (event.target.closest && event.target.closest('header'));
        if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    // --- Header Hide/Show on Scroll --- // *** NEW ***
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const delta = 5; // Minimum scroll distance to trigger hide/show
    const headerHeight = header ? header.offsetHeight : 70; // Get header height or default

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Make sure scroll distance is more than delta
        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > headerHeight){
            // Scroll Down -> Hide Header
            header.style.transform = 'translateY(-100%)';
            // If mobile menu is open, close it when hiding header
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        } else {
            // Scroll Up -> Show Header
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);


    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]'); // Get sections within main with an ID
    const navLinksDesktop = document.querySelectorAll('.desktop-nav a[href^="#"], .desktop-nav a[href^="/#"]'); // Include links starting with /#
    const navLinksMobileAll = document.querySelectorAll('.mobile-menu a[href^="#"], .mobile-menu a[href^="/#"]'); // Include links starting with /#
    const headerElement = document.querySelector('header'); // Get the header element

    function setActiveLink() {
      let currentSectionId = '';
      // Use the calculated or default header height, add a buffer
      const scrollOffset = (headerElement ? headerElement.offsetHeight : 70) + 15;

      const scrollPosition = window.scrollY;

      // Find the current section in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop - scrollOffset;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Handle case for scrolling near the top (highlight Home)
      // Check if scroll is above the first section's top offset or if no section is matched
      const firstSectionTop = sections[0] ? sections[0].offsetTop - scrollOffset : 200;
      if (scrollPosition < firstSectionTop || (currentSectionId === '' && scrollPosition < (document.body.scrollHeight - window.innerHeight - 50)) /* Avoid highlighting home at bottom */ ) {
          currentSectionId = ''; // Representing the 'Accueil' link target ('#')
      }


      // Update Desktop Nav Links
      navLinksDesktop.forEach(link => {
          link.classList.remove('active');
          const linkHrefTarget = link.getAttribute('href').substring(link.getAttribute('href').lastIndexOf('#') + 1);
          const isHomeLink = link.getAttribute('href') === '#' || link.getAttribute('href') === '/#';

          if ((linkHrefTarget === currentSectionId && currentSectionId !== '') || (isHomeLink && currentSectionId === '')) {
              link.classList.add('active');
          }
      });

      // Update Mobile Nav Links
      navLinksMobileAll.forEach(link => {
          link.classList.remove('active');
          const linkHrefTarget = link.getAttribute('href').substring(link.getAttribute('href').lastIndexOf('#') + 1);
          const isHomeLink = link.getAttribute('href') === '#' || link.getAttribute('href') === '/#';

           if ((linkHrefTarget === currentSectionId && currentSectionId !== '') || (isHomeLink && currentSectionId === '')) {
               link.classList.add('active');
          }
      });
    }

    // Throttle scroll event listener for active link highlighting
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                setActiveLink();
                scrollTimeout = null;
            }, 100); // Throttle delay in ms
        }
    });

    setActiveLink(); // Initial check on page load

  });