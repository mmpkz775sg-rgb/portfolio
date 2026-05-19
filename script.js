
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');


    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursorDot.style.transform = `translate(${mx}px, ${my}px)`; });
    function animateCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .goodie-item, .swatch, .logo-img-wrap').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });

    // ── Nav scroll ──
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Intersection Obs animations ──
    const observerOpts = { threshold: 0.15 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, observerOpts);
    document.querySelectorAll('.section, .identity-intro, .keywords-cloud, .logo-showcase, .brand-tokens, .card-showcase, .goodies-grid, .goodie-item, .kw').forEach(el => observer.observe(el));

    // ── Card 3D ──

    const card3d = document.getElementById('card-3d');
    const scene = document.getElementById('card-3d-scene');
    if (scene && card3d) {
      scene.addEventListener('mousemove', e => {
        const r = scene.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card3d.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 15}deg) scale(1.03)`;
      });
      scene.addEventListener('mouseleave', () => {
        card3d.style.transform = 'rotateY(-8deg) rotateX(4deg)';
      });
    }


    // ── Keywords stagger ──
    document.querySelectorAll('.kw').forEach((kw, i) => {
      kw.style.transitionDelay = `${i * 80}ms`;
    });


    // ── Parallax hero shapes ──
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      document.querySelectorAll('.shape').forEach((sh, i) => {
        sh.style.transform = `translateY(${s * (0.1 + i * 0.05)}px)`;
      });
    });


    // ── Goodies image switcher ──
    const goodieItems = document.querySelectorAll('.goodie-item');
    const goodieImages = document.querySelectorAll('.goodie-img');
    
    goodieItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Enlever la classe active de toutes les images
        goodieImages.forEach(img => img.classList.remove('goodie-img-active'));
        
        // Ajouter la classe active à l'image correspondante
        goodieImages[index].classList.add('goodie-img-active');
        
        // Mettre à jour l'état actif des items
        goodieItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // ── Research carousel ──
    const researchModal = document.getElementById('research-modal');
    const researchTrigger = document.getElementById('research-trigger');
    const researchClose = document.getElementById('research-close');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const slides = document.querySelectorAll('.carousel-slide');
    const carouselCurrent = document.getElementById('carousel-current');
    
    let currentSlide = 0;
    
    function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[n].classList.add('active');
      carouselCurrent.textContent = n + 1;
    }
    
    function openCarousel() {
      researchModal.classList.add('open');
      showSlide(0);
    }
    
    function closeCarousel() {
      researchModal.classList.remove('open');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Event listeners
    researchTrigger.addEventListener('click', openCarousel);
    researchClose.addEventListener('click', closeCarousel);
    carouselNext.addEventListener('click', nextSlide);
    carouselPrev.addEventListener('click', prevSlide);
    
    // Fermer en cliquant en dehors du contenu
    researchModal.addEventListener('click', (e) => {
      if (e.target === researchModal) {
        closeCarousel();
      }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
      if (researchModal.classList.contains('open')) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'Escape') closeCarousel();
      }
    });