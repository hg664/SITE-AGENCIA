const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

const videoInsert = `<div class="featured-video-container js-scroll" style="margin-bottom: 60px;">
                <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk" title="Travel Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="section-header js-scroll">`;

const destinosRegex = /<!-- 5\. Destinos -->\s*<section id="destinos">\s*<div class="container">\s*<div class="section-header js-scroll">/;
const replacedDestinos = `<!-- 5. Destinos -->
    <section id="destinos">
        <div class="container">
            ` + videoInsert;

if (destinosRegex.test(html)) {
    html = html.replace(destinosRegex, replacedDestinos);
    fs.writeFileSync('../index.html', html);
    console.log('Video inserted successfully');
} else {
    console.log('Video insert target NOT FOUND');
}
