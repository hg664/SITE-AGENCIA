const elegantSlides = [
    {
        title: 'Dubai',
        subtitle: 'Destino dos Sonhos',
        description: 'Explore o luxo incomparável e arquitetura futurista da jóia dos Emirados Árabes Unidos.',
        accent: '#C4956A',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Paris',
        subtitle: 'A Cidade Luz',
        description: 'Romantismo, cultura e gastronomia no coração da Europa.',
        accent: '#8BA7B8',
        imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Maldivas',
        subtitle: 'Paraíso Tropical',
        description: 'Bangalôs luxuosos sobre águas cristalinas do Oceano Índico.',
        accent: '#7A9E7E',
        imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Grécia',
        subtitle: 'Magia Mediterrânea',
        description: 'História milenar, pôr do sol inesquecível e mar azul-turquesa.',
        accent: '#D4A955',
        imageUrl: 'https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Rio de Janeiro',
        subtitle: 'Cidade Maravilhosa',
        description: 'Belezas naturais estonteantes, praias icônicas e a alegria contagiante do povo carioca.',
        accent: '#4A8E5E',
        imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Maceió',
        subtitle: 'Caribe Brasileiro',
        description: 'Piscinas naturais de águas quentes e praias de tirar o fôlego no Nordeste brasileiro.',
        accent: '#5E9EA0',
        imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.getElementById('elegantCarousel');
    if (!carouselWrapper) return;

    let currentIndex = 0;
    let isTransitioning = false;
    let progress = 0;
    let isPaused = false;
    let intervalId = null;
    let progressId = null;

    const SLIDE_DURATION = 6000;
    const TRANSITION_DURATION = 800;

    const els = {
        bgWash: carouselWrapper.querySelector('.carousel-bg-wash'),
        numText: carouselWrapper.querySelector('.carousel-num-text'),
        title: carouselWrapper.querySelector('.carousel-title'),
        subtitle: carouselWrapper.querySelector('.carousel-subtitle'),
        desc: carouselWrapper.querySelector('.carousel-description'),
        img: carouselWrapper.querySelector('.carousel-image'),
        imgOverlay: carouselWrapper.querySelector('.carousel-image-overlay'),
        corners: carouselWrapper.querySelectorAll('.carousel-frame-corner'),
        progressItems: carouselWrapper.querySelectorAll('.carousel-progress-item'),
        progressFills: carouselWrapper.querySelectorAll('.carousel-progress-fill'),
        animatables: carouselWrapper.querySelectorAll('.visible, .carousel-title, .carousel-subtitle, .carousel-description, .carousel-collection-num, .carousel-image-frame')
    };

    function updateDOM(index) {
        const slide = elegantSlides[index];
        els.bgWash.style.background = `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 70%)`;
        els.numText.textContent = `${String(index + 1).padStart(2, '0')} / ${String(elegantSlides.length).padStart(2, '0')}`;
        els.title.textContent = slide.title;
        els.subtitle.textContent = slide.subtitle;
        els.subtitle.style.color = slide.accent;
        els.desc.textContent = slide.description;
        els.img.src = slide.imageUrl;
        els.img.alt = slide.title;
        els.imgOverlay.style.background = `linear-gradient(135deg, ${slide.accent}22 0%, transparent 50%)`;
        els.corners.forEach(c => c.style.borderColor = slide.accent);
        
        els.progressItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        els.progressFills.forEach((fill, i) => {
            if (i < index) fill.style.width = '100%';
            else if (i > index) fill.style.width = '0%';
            fill.style.backgroundColor = (i === index) ? slide.accent : '';
        });
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;
        progress = 0;

        // Animate out
        els.animatables.forEach(el => el.classList.remove('visible'));

        setTimeout(() => {
            currentIndex = index;
            updateDOM(currentIndex);
            
            // Animate in
            setTimeout(() => {
                els.animatables.forEach(el => el.classList.add('visible'));
                isTransitioning = false;
            }, 50);
        }, TRANSITION_DURATION / 2);
    }

    function goNext() {
        goToSlide((currentIndex + 1) % elegantSlides.length);
    }

    function goPrev() {
        goToSlide((currentIndex - 1 + elegantSlides.length) % elegantSlides.length);
    }

    // Controls
    carouselWrapper.querySelector('.btn-next').addEventListener('click', goNext);
    carouselWrapper.querySelector('.btn-prev').addEventListener('click', goPrev);

    els.progressItems.forEach((item, i) => {
        item.addEventListener('click', () => goToSlide(i));
    });

    // Hover pause
    carouselWrapper.addEventListener('mouseenter', () => isPaused = true);
    carouselWrapper.addEventListener('mouseleave', () => isPaused = false);

    // Touch swipe
    let touchStartX = 0;
    carouselWrapper.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    carouselWrapper.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 60) {
            if (diff > 0) goNext();
            else goPrev();
        }
    });

    // Loops
    function startLoops() {
        progressId = setInterval(() => {
            if (isPaused || isTransitioning) return;
            progress += 100 / (SLIDE_DURATION / 50);
            if (progress >= 100) progress = 100;
            els.progressFills[currentIndex].style.width = `${progress}%`;
        }, 50);

        intervalId = setInterval(() => {
            if (!isPaused) goNext();
        }, SLIDE_DURATION);
    }

    // Init
    updateDOM(0);
    setTimeout(() => {
        els.animatables.forEach(el => el.classList.add('visible'));
        startLoops();
    }, 100);
});
