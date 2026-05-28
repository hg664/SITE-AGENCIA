const fs = require('fs');

// Update style.css
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(
    /grid-template-columns: 2fr 1fr;[\s\S]*?max-width: 900px;/,
    `grid-template-columns: 2fr 1fr 1fr;
            gap: 40px;
            align-items: flex-start;
            max-width: 1100px;`
);

css = css.replace(
    /max-width: 250px;/,
    `max-width: 250px;
            margin-bottom: 20px;`
);

fs.writeFileSync('style.css', css);

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const footerRegex = /<div class="footer-grid">[\s\S]*?<\/div>\s*<\/div>\s*<div class="footer-bottom">/;

const newFooterHtml = `<div class="footer-grid">
                <div class="footer-contact-info">
                    <img src="logo.png" alt="Higor Viagens" class="footer-logo-img">
                    <div class="footer-contact-item" style="margin-bottom: 15px;"><i class="fas fa-map-marker-alt"></i> R. Mal. Deodoro, Nº 825 - Ipase, Rio Branco - AC</div>
                    <div class="footer-contact-item" style="margin-bottom: 15px;"><i class="fas fa-map-marker-alt"></i> BR-364 – Via Verde Shopping loja 09, 2320, Floresta Sul Rio Branco - AC</div>
                    <div class="footer-contact-item" style="margin-bottom: 8px;"><i class="fas fa-phone-alt"></i> (68) 3227-6933</div>
                    <div class="footer-contact-item" style="margin-bottom: 8px;"><i class="fab fa-whatsapp"></i> (68) 99208-8000</div>
                    <div class="footer-contact-item" style="margin-bottom: 8px;"><i class="fas fa-envelope"></i> financeiro@higorpassagens.com.br</div>
                </div>
                <div class="footer-column">
                    <h4>Empresa</h4>
                    <ul>
                        <li><a href="#sobre">Sobre</a></li>
                        <li><a href="#ajuda">Ajuda ao viajante</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Serviços</h4>
                    <ul>
                        <li><a href="#pacotes-nacionais">Pacotes Nacionais</a></li>
                        <li><a href="#pacotes-internacionais">Pacotes Internacionais</a></li>
                        <li><a href="#hotel">Hotel</a></li>
                        <li><a href="#cruzeiros">Cruzeiros</a></li>
                        <li><a href="#aluguel-carro">Aluguel de Carro</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">`;

html = html.replace(footerRegex, newFooterHtml);

// Cache bust CSS
html = html.replace(/href="style\.css\?v=\d+"/, 'href="style.css?v=4"');

fs.writeFileSync('index.html', html);
console.log("Footer updated");
