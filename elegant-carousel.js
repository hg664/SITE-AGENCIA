const elegantSlides = [
    {
        title: 'Dubai',
        subtitle: 'Destino dos Sonhos',
        description: 'Explore o luxo incomparável e arquitetura futurista da jóia dos Emirados Árabes Unidos.',
        accent: '#C4956A',
        imageUrl: 'public/dubai-hero.jpg',
    },
    {
        title: 'Paris',
        subtitle: 'Cidade Luz',
        description: 'Perca-se nas ruas românticas e viva o charme atemporal da capital francesa.',
        accent: '#D4AF37',
        imageUrl: 'public/paris-hero.jpg',
    },
    {
        title: 'Maldivas',
        subtitle: 'Paraíso Tropical',
        description: 'Bangalôs luxuosos sobre águas cristalinas do Oceano Índico.',
        accent: '#2A9D8F',
        imageUrl: 'public/maldivas-hero.jpg',
    },
    {
        title: 'Grécia',
        subtitle: 'Berço da Civilização',
        description: 'Explore ruínas milenares, ilhas de águas cristalinas e a rica história de Atenas e Santorini.',
        accent: '#2980b9',
        imageUrl: 'public/grecia-hero.jpg',
    },
    {
        title: 'Rio de Janeiro',
        subtitle: 'Cidade Maravilhosa',
        description: 'A energia contagiante do povo carioca emoldurada pelo Cristo Redentor e praias icônicas.',
        accent: '#2ecc71',
        imageUrl: 'public/rio-hero.jpg',
    },
    {
        title: 'Maceió',
        subtitle: 'Caribe Brasileiro',
        description: 'Piscinas naturais, praias de areia branca e coqueirais a perder de vista.',
        accent: '#3498db',
        imageUrl: 'public/maceio-hero.jpg',
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

    const SLIDE_DURATION = 5000; // ms
    const TRANSITION_DURATION = 800; // ms

    // Gerar camadas de background para fade suave
    const bgContainer = document.createElement('div');
    bgContainer.className = 'carousel-bg-layers';
    bgContainer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    carouselWrapper.style.position = 'relative';
    carouselWrapper.style.overflow = 'hidden';
    carouselWrapper.prepend(bgContainer);

    const bgLayers = elegantSlides.map(slide => {
        const layer = document.createElement('div');
        layer.className = 'carousel-bg-layer';
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.backgroundSize = 'cover';
        layer.style.backgroundPosition = 'center';
        layer.style.backgroundImage = `url('${slide.imageUrl}')`;
        layer.style.opacity = '0';
        layer.style.zIndex = '0';
        layer.style.transition = 'opacity 0.8s ease-in-out';
        bgContainer.appendChild(layer);
        return layer;
    });

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

        // Immersive layout logic for all slides
        carouselWrapper.classList.add('slide-immersive');

        // Fade background layers
        bgLayers.forEach((layer, i) => {
            layer.style.opacity = (i === index) ? '1' : '0';
            layer.style.zIndex = (i === index) ? '1' : '0';
        });

        // Garantir que o conteúdo textual fique acima das camadas de fundo
        const innerEl = carouselWrapper.querySelector('.carousel-inner');
        if (innerEl) innerEl.style.zIndex = '10';
        const progressBar = carouselWrapper.querySelector('.carousel-progress-bar');
        if (progressBar) progressBar.style.zIndex = '10';

        document.querySelector('.carousel-image-container').style.display = 'none';
        els.bgWash.style.display = 'none';
        document.querySelector('.carousel-content').classList.add('slide-overlay-immersive');
        document.querySelector('.carousel-content-inner').classList.add('text-content-overlay');
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
