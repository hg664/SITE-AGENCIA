const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

// 1. Remove the theme toggle from the header (the <label class="switch"> block)
const switchRegex = /\s*<label class="switch" aria-label="Alternar modo escuro">[\s\S]*?<\/label>/;
const switchMatch = html.match(switchRegex);
if (switchMatch) {
    // Save the switch HTML for insertion into menu
    const switchHtml = switchMatch[0].trim();
    
    // Remove from header
    html = html.replace(switchRegex, '');
    
    // 2. Insert inside the site-menu, after the WhatsApp link, wrapped in a div for padding
    const menuCloseTag = '</nav>';
    const menuInsert = `
                <div style="padding: 12px 14px;">
                    ${switchHtml}
                </div>
            </nav>`;
    
    // Replace only the first </nav> (the site-menu one)
    html = html.replace(menuCloseTag, menuInsert);
    
    console.log("Toggle moved into menu.");
} else {
    console.log("Toggle not found.");
}

// 3. Re-apply Elfsight replacement
const testimonialsRegex = /<div class="testimonials-grid">[\s\S]*?<!-- Imagem do Grupo Real -->/;
if (html.match(testimonialsRegex)) {
    html = html.replace(testimonialsRegex, `<!-- Elfsight Google Reviews | Untitled Google Reviews -->
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div class="elfsight-app-df42bc05-507e-42b1-96ae-2ed6fe2631f2" data-elfsight-app-lazy style="margin-bottom: 50px;"></div>

            <!-- Imagem do Grupo Real -->`);
    console.log("Elfsight applied.");
}

// 4. Re-apply padding changes
html = html.replace(
    /<section class="why-choose" id="diferenciais">/,
    '<section class="why-choose" id="diferenciais" style="padding-bottom: 30px;">'
);
html = html.replace(
    /<!-- 5\. Destinos -->\s*<section id="destinos">/,
    '<!-- 5. Destinos -->\n    <section id="destinos" style="padding-top: 10px;">'
);

// 5. Bump cache version
html = html.replace(/href="style\.css(\?v=\d+)?"/, 'href="style.css?v=6"');

fs.writeFileSync('../index.html', html);
console.log("All changes applied.");
