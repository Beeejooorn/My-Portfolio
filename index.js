        // Cursor trailer effect
        const cursorTrailer = document.querySelector('.cursor-trailer');
        let mouseX = 0;
        let mouseY = 0;
        let trailerX = 0;
        let trailerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorTrailer.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorTrailer.classList.remove('active');
        });

        document.addEventListener('mousedown', () => {
            cursorTrailer.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            cursorTrailer.classList.remove('clicking');
        });

        function animateTrailer() {
            const distX = mouseX - trailerX;
            const distY = mouseY - trailerY;
            
            trailerX += distX * 0.1;
            trailerY += distY * 0.1;
            
            cursorTrailer.style.left = trailerX - 20 + 'px';
            cursorTrailer.style.top = trailerY - 20 + 'px';
            
            requestAnimationFrame(animateTrailer);
        }

        animateTrailer();

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Animate skill bars on scroll (for About page)
        const skillsCard = document.querySelector('.skills-card');
        if (skillsCard) {
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            bar.classList.add('animate');
                        });
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillObserver.observe(skillsCard);
        }

        // Generic scroll animation setup
        function setupScrollReveal(selector, animationClass, options = {}) {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let delay = 0;
                        if (options.delayByIndex) {
                            const index = Array.from(elements).indexOf(entry.target);
                            delay = index * options.delayByIndex;
                        } else if (entry.target.hasAttribute('data-delay')) {
                            delay = parseInt(entry.target.getAttribute('data-delay'), 10);
                        }

                        setTimeout(() => {
                            entry.target.classList.add(animationClass);
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, options.observerOptions);

            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Scroll animation for project cards (for Works page) - AUTO DELAY
        setupScrollReveal('.project-card', 'scroll-reveal', {
            delayByIndex: 100, // 100ms delay between each card
            observerOptions: {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        });

        // Auto-scroll image animation for project cards
            const projectImages = document.querySelectorAll('.project-image img');

            if (projectImages.length > 0) {
                projectImages.forEach((img, index) => {
                    // Add slight delay between each card's animation
                    img.style.animationDelay = `${index * 0.5}s`;
            });
        }


        // Scroll animation for testimonial cards
        setupScrollReveal('.testimonial-card', 'scroll-reveal', {
            observerOptions: {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        });