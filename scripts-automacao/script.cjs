const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="../style.css">');

const headerRegex = /<header id="header">[\s\S]*?<\/header>/;
const newHeader = `<header id="header">
        <div class="container nav-container">
            <a href="#home" class="logo-link"><img src="logo.png" alt="Higor Viagens" class="logo-img"></a>
            <div class="nav-actions">
                <button class="menu-toggle" id="menuToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="siteMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <label class="switch" aria-label="Alternar modo escuro">
                    <input id="themeToggle" class="input" type="checkbox">
                    <span class="slider">
                        <span class="sun">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="#ffd43b" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 8a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm15.07 7.07a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 1.42-1.42l.7.7a1 1 0 0 1 0 1.42ZM7.05 7.05a1 1 0 0 1-1.42 0l-.7-.7A1 1 0 0 1 6.35 4.93l.7.7a1 1 0 0 1 0 1.42Zm12.02-2.12a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0ZM7.05 16.95a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0Z"/>
                            </svg>
                        </span>
                        <span class="moon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M21 14.7A8.5 8.5 0 0 1 9.3 3a9 9 0 1 0 11.7 11.7Z"/>
                            </svg>
                        </span>
                    </span>
                </label>
                <a href="https://wa.me/556892088000" target="_blank" class="btn btn-primary" style="padding: 10px 24px; font-size: 0.9rem;">
                    <i class="fab fa-whatsapp"></i> Fale Conosco
                </a>
            </div>
            <nav class="site-menu" id="siteMenu" aria-label="Menu principal">
                <a href="#home">Início</a>
                <a href="#servicos">Serviços</a>
                <a href="#diferenciais">Diferenciais</a>
                <a href="#contato">Contato</a>
                <a href="https://wa.me/556892088000" target="_blank">WhatsApp</a>
            </nav>
        </div>
    </header>`;
html = html.replace(headerRegex, newHeader);

const videoInsert = `<div class="featured-video-container js-scroll" style="margin-bottom: 60px;">
                <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk" title="Travel Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="section-header js-scroll">`;
const targetDestinos = `    <!-- 5. Destinos -->
    <section id="destinos">
        <div class="container">
            <div class="section-header js-scroll">`;
const replacedDestinos = `    <!-- 5. Destinos -->
    <section id="destinos">
        <div class="container">
            ` + videoInsert;
html = html.replace(targetDestinos, replacedDestinos);

html = html.replace('https://images.unsplash.com/photo-1518182170546-076616fdcd80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

const footerRegex = /<footer>[\s\S]*?<\/footer>/;
const newFooter = `<footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-contact-info">
                    <img src="logo.png" alt="Higor Viagens" class="footer-logo-img">
                    <div class="footer-contact-item"><i class="fab fa-whatsapp"></i> +55 68 9208-8000</div>
                    <div class="footer-contact-item"><i class="fas fa-envelope"></i> contato@higorviagens.com.br</div>
                    <div class="footer-contact-item"><i class="fas fa-map-marker-alt"></i> Rio Branco, AC</div>
                </div>
                <div class="footer-column">
                    <h4>Links Úteis</h4>
                    <ul>
                        <li><a href="#home">Início</a></li>
                        <li><a href="#servicos">Serviços</a></li>
                        <li><a href="#diferenciais">Diferenciais</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Higor Viagens. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>`;
html = html.replace(footerRegex, newFooter);

const jsAppend = `
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('higor-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        document.documentElement.dataset.theme = initialTheme;
        if (themeToggle) {
            themeToggle.checked = initialTheme === 'dark';
            themeToggle.addEventListener('change', () => {
                const nextTheme = themeToggle.checked ? 'dark' : 'light';
                document.documentElement.dataset.theme = nextTheme;
                localStorage.setItem('higor-theme', nextTheme);
            });
        }

        // Header Menu
        const menuToggle = document.getElementById('menuToggle');
        const siteMenu = document.getElementById('siteMenu');

        if(menuToggle && siteMenu) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('active');
                siteMenu.classList.toggle('active');
            });
        }
    </script>`;
html = html.replace('</script>', jsAppend);

fs.writeFileSync('../index.html', html);
console.log('done');
