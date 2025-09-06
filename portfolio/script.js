        let scene, camera, renderer, avatar;
        let particles;
        let mouseX = 0, mouseY = 0;

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeWebsite();
        });

        function initializeWebsite() {
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1500);

            // Initialize all components
            initParticles();
            init3DAvatar();
            initScrollAnimations();
            initTypewriter();
            initThemeToggle();
            initSmoothScrolling();
            initContactForm();
            initSkillBars();
            initMobileMenu();
            initTimelineAnimations();
            initProjectCardAnimations();
            initFloatingElements();
            
            // Start hero animations
            setTimeout(startHeroAnimations, 2000);
        }

        // Particles.js initialization
        function initParticles() {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: 100, 
                        density: { enable: true, value_area: 1000 } 
                    },
                    color: { 
                        value: ['#6366f1', '#8b5cf6', '#06b6d4'] 
                    },
                    shape: { 
                        type: ['circle', 'triangle'],
                        stroke: { width: 0, color: '#000000' }
                    },
                    opacity: { 
                        value: 0.6, 
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: { 
                        value: 4, 
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#6366f1',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'bounce',
                        bounce: true,
                        attract: { enable: true, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: ['grab', 'bubble'] },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 200, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }

        // 3D Avatar initialization
        function init3DAvatar() {
            const container = document.getElementById('avatar-canvas');
            if (!container) return;

            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
            renderer.setSize(300, 300);
            renderer.setClearColor(0x000000, 0);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Create a group for the avatar
            avatar = new THREE.Group();
            scene.add(avatar);

            // Create multiple geometric shapes for a more complex avatar
            const geometries = [
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.SphereGeometry(0.6, 16, 16),
                new THREE.ConeGeometry(0.5, 1, 8)
            ];

            const materials = [
                new THREE.MeshLambertMaterial({ 
                color: 0x6366f1,
                transparent: true,
                opacity: 0.8
                }),
                new THREE.MeshLambertMaterial({ 
                    color: 0x8b5cf6,
                    transparent: true,
                    opacity: 0.6
                }),
                new THREE.MeshLambertMaterial({ 
                    color: 0x06b6d4,
                    transparent: true,
                    opacity: 0.7
                })
            ];

            // Create meshes and add to group
            geometries.forEach((geometry, index) => {
                const mesh = new THREE.Mesh(geometry, materials[index]);
                mesh.position.set(
                    (index - 1) * 0.3,
                    (index - 1) * 0.2,
                    (index - 1) * 0.1
                );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                avatar.add(mesh);
            });

            // Add ambient lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
            scene.add(ambientLight);
            
            // Add directional lighting
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(2, 2, 2);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 512;
            directionalLight.shadow.mapSize.height = 512;
            scene.add(directionalLight);

            // Add point light for accent
            const pointLight = new THREE.PointLight(0x6366f1, 0.5, 10);
            pointLight.position.set(-2, 1, 2);
            scene.add(pointLight);

            camera.position.z = 4;

            // Mouse interaction
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            });

            // Start animation loop
            animate3D();
        }

        function animate3D() {
            requestAnimationFrame(animate3D);
            
            if (avatar) {
                // Rotate the entire group
                avatar.rotation.x += 0.005;
                avatar.rotation.y += 0.01;
                
                // Mouse interaction
                avatar.rotation.x += mouseY * 0.001;
                avatar.rotation.y += mouseX * 0.001;
                
                // Floating animation
                avatar.position.y = Math.sin(Date.now() * 0.001) * 0.1;
                
                // Individual mesh animations
                avatar.children.forEach((mesh, index) => {
                    mesh.rotation.x += 0.01 * (index + 1);
                    mesh.rotation.y += 0.015 * (index + 1);
                    mesh.position.y += Math.sin(Date.now() * 0.002 + index) * 0.001;
                });
            }
            
            renderer.render(scene, camera);
        }

        // Typewriter effect
        function initTypewriter() {
            const text = "UI/UX Designer & Front-End Developer";
            const element = document.querySelector('.typewriter');
            if (!element) return;
            
            element.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }

        // Hero animations
        function startHeroAnimations() {
            // Create a timeline for coordinated animations
            const tl = gsap.timeline({ ease: "power3.out" });
            
            // Staggered entrance animation for hero elements
            tl.fromTo('.hero-title', {
                opacity: 0,
                y: 100,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)"
            })
            .fromTo('.hero-subtitle', {
                opacity: 0,
                y: 50,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .fromTo('.cta-buttons .btn', {
                opacity: 0,
                y: 30,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.4)"
            }, "-=0.6")
            .fromTo('.avatar-container', {
                opacity: 0,
                scale: 0.5,
                rotation: 180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }, "-=1.2")
            .fromTo('.floating-element', {
                opacity: 0,
                scale: 0,
                rotation: 360
            }, {
                opacity: 0.6,
                scale: 1,
                rotation: 0,
                duration: 1,
                stagger: 0.3,
                ease: "back.out(1.7)"
            }, "-=1");

            // Add hover animations for CTA buttons
            gsap.utils.toArray('.cta-buttons .btn').forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }

        // Scroll animations
        function initScrollAnimations() {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Hero section parallax effect
            gsap.to('.hero::after', {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Staggered fade-in animations for sections
            gsap.utils.toArray('.fade-in').forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                }, {
                opacity: 1,
                y: 0,
                    scale: 1,
                duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Slide-in animations
            gsap.utils.toArray('.slide-in-left').forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    x: -100,
                    rotation: -5
                }, {
                    opacity: 1,
                    x: 0,
                    rotation: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
            
            gsap.utils.toArray('.slide-in-right').forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    x: 100,
                    rotation: 5
                }, {
                    opacity: 1,
                    x: 0,
                    rotation: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Project cards stagger animation
            gsap.fromTo('.project-card', {
                opacity: 0,
                y: 100,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Skill categories stagger animation
            gsap.fromTo('.skill-category', {
                opacity: 0,
                y: 50,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Navbar background change on scroll
            gsap.to('.navbar', {
                background: 'rgba(255, 255, 255, 0.95)',
                scrollTrigger: {
                    trigger: "body",
                    start: "top -100",
                    end: "bottom bottom",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        // Timeline animations with Anime.js
        function initTimelineAnimations() {
            const timelineItems = document.querySelectorAll('.timeline-item');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Animate timeline dot
                        anime({
                            targets: entry.target.querySelector('.timeline-dot'),
                            scale: [0, 1.2, 1],
                            opacity: [0, 1],
                            duration: 800,
                            delay: index * 200,
                            easing: 'easeOutElastic(1, 0.5)'
                        });

                        // Animate timeline content
                        anime({
                            targets: entry.target.querySelector('.timeline-content'),
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 1000,
                            delay: index * 200 + 200,
                            easing: 'easeOutCubic'
                        });

                        // Animate timeline line
                        anime({
                            targets: '.timeline::before',
                            scaleY: [0, 1],
                            duration: 1500,
                            delay: index * 100,
                            easing: 'easeOutQuart'
                        });
                    }
                });
            }, { threshold: 0.5 });

            timelineItems.forEach(item => observer.observe(item));
        }

        // Enhanced skill bars with Anime.js
        function initSkillBars() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach((bar, index) => {
                            const width = bar.getAttribute('data-width');
                            
                            anime({
                                targets: bar,
                                width: [0, width + '%'],
                                duration: 1500,
                                delay: index * 100,
                                easing: 'easeOutQuart',
                                update: function(anim) {
                                    bar.style.width = anim.animations[0].currentValue;
                                }
                            });
                        });
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.skill-category').forEach(category => {
                observer.observe(category);
            });
        }

        // Enhanced project card animations
        function initProjectCardAnimations() {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // Animate card elements on hover
                    anime({
                        targets: card.querySelectorAll('.project-title, .project-description, .project-tags, .project-links'),
                        translateY: [-10, 0],
                        opacity: [0.8, 1],
                        duration: 300,
                        easing: 'easeOutCubic',
                        delay: anime.stagger(50)
                    });
                });

                card.addEventListener('mouseleave', () => {
                    // Reset card elements
                    anime({
                        targets: card.querySelectorAll('.project-title, .project-description, .project-tags, .project-links'),
                        translateY: [0, 0],
                        opacity: [1, 1],
                        duration: 200,
                        easing: 'easeOutCubic'
                    });
                });
            });
        }

        // Floating elements animation with Anime.js
        function initFloatingElements() {
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                anime({
                    targets: element,
                    translateY: [0, -30, 0],
                    translateX: [0, 20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                    duration: 4000 + index * 500,
                    delay: index * 200,
                    easing: 'easeInOutSine',
                    loop: true,
                    direction: 'alternate'
                });
            });
        }

        // Theme toggle
        function initThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            document.documentElement.setAttribute('data-theme', currentTheme);
            themeToggle.textContent = currentTheme === 'dark' ? '' : '';
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                themeToggle.textContent = newTheme === 'dark' ? '' : '';
            });
        }

        // Smooth scrolling
        function initSmoothScrolling() {
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
        }

        // Contact form
        function initContactForm() {
            const form = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span><span>⏳</span>';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent!</span><span>✅</span>';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 2000);
            });
        }

        // Mobile menu
        function initMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const navLinks = document.querySelector('.nav-links');
            const navbar = document.querySelector('.navbar');
            
            mobileMenu.addEventListener('click', () => {
                const isOpen = navLinks.classList.contains('mobile-open');
                
                if (isOpen) {
                    // Close menu
                    navLinks.classList.remove('mobile-open');
                    mobileMenu.classList.remove('active');
                    gsap.to(navLinks, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            navLinks.style.display = 'none';
                        }
                    });
                } else {
                    // Open menu
                    navLinks.style.display = 'flex';
                    navLinks.classList.add('mobile-open');
                    mobileMenu.classList.add('active');
                    gsap.fromTo(navLinks, {
                        opacity: 0,
                        y: -20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('mobile-open');
                        mobileMenu.classList.remove('active');
                        gsap.to(navLinks, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            ease: "power2.out",
                            onComplete: () => {
                                navLinks.style.display = 'none';
                            }
                        });
                    }
                });
            });
        }

        // Resume download
        document.getElementById('downloadResume').addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a temporary download link
            const link = document.createElement('a');
            link.href = '#'; // Would be actual resume URL
            link.download = 'Resume_Madushan_101.5.pdf';
            
            // Simulate download
            const btn = e.target.closest('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Downloading...</span><span>⬇️</span>';
            
            setTimeout(() => {
                btn.innerHTML = '<span>Downloaded!</span><span>✅</span>';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            }, 1500);
        });

         // Resume download functionality
        function downloadResume() {
            // Replace this with your actual resume file path
            const resumeUrl = './assets/resume.pdf'; // Use relative path
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Madushan_Resume.pdf';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Track download analytics
            console.log('Resume downloaded');
            
            // You can add Google Analytics or other tracking here
            // gtag('event', 'download', {
            //     'event_category': 'Resume',
            //     'event_label': 'PDF Download'
            // });
        }

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);



        // Add sparkle effect on hover
        document.querySelector('.resume-download-btn').addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
        });

        document.querySelector('.resume-download-btn').addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });