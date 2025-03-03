document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    const countdownDate = new Date('March 15, 2025 19:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Check if elements exist before updating them
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const countdownEl = document.getElementById('countdown');
        
        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (countdownEl) countdownEl.innerHTML = '<h3>Le webinaire a commencé !</h3>';
        }
    }
    
    // Declare countdownInterval before it's used
    let countdownInterval;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto change testimonial every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
        });
    });
    
    // Form Submission
    const signupForm = document.getElementById('signup-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();
    
        // Récupérer les données du formulaire
        const formData = new FormData(signupForm);
    
        try {
            // Envoyer les données à Formspree
            const response = await fetch("https://formspree.io/f/xbldnqrk", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData,
            });
    
            if (response.ok) {
                // Afficher l'animation de succès
                successModal.style.display = "flex";
    
                // Réinitialiser le formulaire
                signupForm.reset();
    
                // Fermer le modal après 3 secondes
                setTimeout(() => {
                    successModal.style.display = "none";
                }, 3000);
            } else {
                alert("Une erreur est survenue lors de l'envoi du formulaire.");
            }
        } catch (error) {
            alert("Impossible d'envoyer le formulaire. Vérifiez votre connexion.");
        }
    });
    
    
    function closeSuccessModal() {
        successModal.style.display = 'none';
    }
    
    closeModal.addEventListener('click', closeSuccessModal);
    closeBtn.addEventListener('click', closeSuccessModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to buttons
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Spots left counter animation (random decrease for demo)
    const spotsCount = document.getElementById('spots-count');
    let spots = parseInt(spotsCount.innerText);
    
    // Simulate spots decreasing randomly
    setInterval(() => {
        if (spots > 5) {
            if (Math.random() > 0.7) {
                spots--;
                spotsCount.innerText = spots;
                
                // Flash effect
                spotsCount.style.color = 'white';
                setTimeout(() => {
                    spotsCount.style.color = 'var(--secondary-color)';
                }, 300);
            }
        }
    }, 8000);
});
