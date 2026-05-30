const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

const regex = /<div class="testimonials-grid">[\s\S]*?<!-- Imagem do Grupo Real -->/;
const replacement = `<!-- Elfsight Google Reviews | Untitled Google Reviews -->
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div class="elfsight-app-df42bc05-507e-42b1-96ae-2ed6fe2631f2" data-elfsight-app-lazy style="margin-bottom: 50px;"></div>

            <!-- Imagem do Grupo Real -->`;

if (html.match(regex)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('../index.html', html);
    console.log("Replaced successfully");
} else {
    console.log("Regex not found");
}
