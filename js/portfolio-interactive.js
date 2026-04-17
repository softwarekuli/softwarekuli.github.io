// Portfolio Showcase Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const fill = bar.querySelector('.skill-fill');
                const level = bar.dataset.level;
                fill.style.width = level + '%';
            }
        });
    };

    // Initial check
    animateSkillBars();

    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');

    const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible && !item.classList.contains('animated')) {
                setTimeout(() => {
                    item.classList.add('animated');
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    };

    // Set initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
    });

    // Initial timeline check
    animateTimeline();

    // Check on scroll
    window.addEventListener('scroll', animateTimeline);

    // KPI counter animation
    const kpiCards = document.querySelectorAll('.kpi-card');

    const animateKPIs = () => {
        kpiCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible && !card.classList.contains('animated')) {
                card.classList.add('animated');

                const valueElement = card.querySelector('.kpi-value');
                const targetValue = parseFloat(valueElement.textContent.replace(/[^\d.]/g, ''));
                const isPercentage = valueElement.textContent.includes('%');

                let currentValue = 0;
                const increment = targetValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    valueElement.textContent = isPercentage ?
                        Math.round(currentValue) + '%' :
                        currentValue % 1 === 0 ?
                            Math.round(currentValue) :
                            currentValue.toFixed(1);
                }, 30);
            }
        });
    };

    // Initial KPI check
    animateKPIs();

    // Check on scroll
    window.addEventListener('scroll', animateKPIs);

    // Testimonial card stagger animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const animateTestimonials = () => {
        testimonialCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible && !card.classList.contains('animated')) {
                setTimeout(() => {
                    card.classList.add('animated');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };

    // Set initial state for testimonial cards
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    // Initial testimonial check
    animateTestimonials();

    // Check on scroll
    window.addEventListener('scroll', animateTestimonials);

    // Skill tooltip functionality
    skillBars.forEach(bar => {
        const skillName = bar.dataset.skill;
        const skillLevel = bar.dataset.level;

        bar.addEventListener('mouseenter', function(e) {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `${skillName}: ${skillLevel}% proficiency`;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '1000';
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 10 + 'px';

            document.body.appendChild(tooltip);

            // Update tooltip position on mouse move
            const updateTooltip = (e) => {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
            };

            bar.addEventListener('mousemove', updateTooltip);

            bar.addEventListener('mouseleave', function() {
                document.body.removeChild(tooltip);
                bar.removeEventListener('mousemove', updateTooltip);
            });
        });
    });

    // Add loading animation for project cards
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

    // Observe project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Add smooth scrolling for anchor links
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

    // Add particle effect for hero section (optional enhancement)
    const createParticles = () => {
        const hero = document.querySelector('.portfolio-hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';

            hero.appendChild(particle);
        }
    };

    createParticles();
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }

    .particle {
        pointer-events: none;
    }

    .skill-tooltip {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);