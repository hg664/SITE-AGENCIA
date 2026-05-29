const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace the word "memória" with the container in the h1
const heroTitleRegex = /<h1>Sua próxima memória inesquecível começa aqui\.<\/h1>/;
if (html.match(heroTitleRegex)) {
    html = html.replace(heroTitleRegex, '<h1>Sua próxima <span id="revealTextMemory"></span> inesquecível começa aqui.</h1>');
}

// Inject the JS script before closing body
const scriptInjection = `
        // Reveal Text Effect for "memória"
        const revealContainer = document.getElementById('revealTextMemory');
        if (revealContainer) {
            const text = "memória";
            const letterDelay = 0.08;
            const overlayDelay = 0.05;
            const springDuration = 600;
            const letterImages = [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            ];
            
            revealContainer.classList.add('reveal-text-container');
            
            let htmlContent = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const img = letterImages[i % letterImages.length];
                htmlContent += \`
                    <span class="reveal-letter" style="animation-delay: \${i * letterDelay}s">
                        <span class="base-text">\${char}</span>
                        <span class="image-text" style="background-image: url('\${img}')">\${char}</span>
                        <span class="overlay-text" style="animation-delay: \${i * overlayDelay}s">\${char}</span>
                    </span>
                \`;
            }
            revealContainer.innerHTML = htmlContent;

            const lastLetterDelay = (text.length - 1) * letterDelay;
            const totalDelay = (lastLetterDelay * 1000) + springDuration;
            
            setTimeout(() => {
                const overlays = revealContainer.querySelectorAll('.overlay-text');
                overlays.forEach(overlay => overlay.classList.add('animate-sweep'));
            }, totalDelay);
        }
    </script>
</body>`;

html = html.replace(/\s*<\/script>\s*<\/body>/, scriptInjection);
fs.writeFileSync('index.html', html);
console.log("Updated index.html");

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
const revealCss = `
/* Reveal Text Effect */
.reveal-text-container {
    display: inline-flex;
    position: relative;
    cursor: default;
}

.reveal-letter {
    position: relative;
    display: inline-block;
    overflow: hidden;
    transform: scale(0);
    opacity: 0;
    animation: springIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes springIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.base-text {
    position: relative;
    color: inherit;
    transition: opacity 0.1s;
}

.image-text {
    position: absolute;
    inset: 0;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0% center;
    opacity: 0;
    transition: opacity 0.1s, background-position 3s ease-in-out;
}

.reveal-letter:hover .base-text {
    opacity: 0;
}

.reveal-letter:hover .image-text {
    opacity: 1;
    background-position: 10% center;
}

.overlay-text {
    position: absolute;
    inset: 0;
    color: #ef4444; /* text-red-500 */
    pointer-events: none;
    opacity: 0;
}

.overlay-text.animate-sweep {
    animation: sweepOpacity 0.4s ease-in-out forwards;
}

@keyframes sweepOpacity {
    0% { opacity: 0; }
    10% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
}
`;

if (!css.includes('.reveal-text-container')) {
    css += '\n' + revealCss;
    fs.writeFileSync('style.css', css);
    console.log("Updated style.css");
}
