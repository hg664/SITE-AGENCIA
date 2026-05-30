const fs = require('fs');

let html = fs.readFileSync('../index.html', 'utf8');

// Replace the specific h2 with the wrapped version
const targetH2 = '<h2 class="section-title">O que preparamos para você</h2>';
const replacementH2 = `
                <div class="animated-underline-container" style="position: relative; display: inline-block; margin-bottom: 40px;">
                    <h2 class="section-title" style="margin-bottom: 0;">O que preparamos para você</h2>
                    <svg width="100%" height="20" viewBox="0 0 300 20" class="animated-underline-svg" style="position: absolute; bottom: -15px; left: 0; color: var(--gold, #d4af37);">
                        <path class="animated-underline-path" d="M 0,10 Q 75,0 150,10 Q 225,20 300,10" pathLength="1" stroke="currentColor" stroke-width="4" fill="none" />
                    </svg>
                </div>
`;

if (html.includes(targetH2)) {
    html = html.replace(targetH2, replacementH2);
    console.log("Updated h2 in index.html");
} else {
    console.log("Target h2 not found.");
}

// Add CSS to style.css
let css = fs.readFileSync('../style.css', 'utf8');

const additionalCss = `
/* Animated Underline Effect */
.animated-underline-container {
    cursor: pointer;
    transition: transform 0.6s ease;
}

.animated-underline-container:hover {
    transform: scale(1.02);
}

.animated-underline-path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: drawPath 1.5s ease-in-out forwards;
    /* transition for hover */
    transition: d 0.8s ease, stroke-width 0.3s ease;
}

@keyframes drawPath {
    to { stroke-dashoffset: 0; }
}

.animated-underline-container:hover .animated-underline-path {
    d: path('M 0,10 Q 75,20 150,10 Q 225,0 300,10');
}
`;

if (!css.includes('.animated-underline-container')) {
    css += '\n' + additionalCss;
    fs.writeFileSync('../style.css', css);
    console.log("Updated style.css");
}

fs.writeFileSync('../index.html', html);
