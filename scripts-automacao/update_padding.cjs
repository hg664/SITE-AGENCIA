const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

html = html.replace(
    /<section class="why-choose" id="diferenciais">/,
    '<section class="why-choose" id="diferenciais" style="padding-bottom: 30px;">'
);

html = html.replace(
    /<!-- 5\. Destinos -->\s*<section id="destinos">/,
    '<!-- 5. Destinos -->\n    <section id="destinos" style="padding-top: 10px;">'
);

fs.writeFileSync('../index.html', html);
console.log("Padding updated.");
