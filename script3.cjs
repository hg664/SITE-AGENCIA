const fs = require('fs');

// 1. Append CSS to style.css
const newCss = `
        .google-summary-card .google-reviews-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 5px;
        }

        .google-summary-card .google-reviews-header h4 {
            font-size: 2.5rem;
            color: var(--ocean-blue-dark);
            margin: 0;
            line-height: 1;
            font-family: var(--font-heading);
        }

        .google-summary-card .stars {
            color: #ffb400;
            font-size: 1.2rem;
            display: flex;
            gap: 3px;
        }

        .google-summary-card .google-reviews-total {
            color: var(--text-light);
            font-size: 0.95rem;
            margin-bottom: 25px;
        }

        .google-summary-card .rating-bar-row {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 0.85rem;
            color: var(--text-light);
        }

        .google-summary-card .rating-bar-label {
            width: 60px;
            font-weight: 500;
        }

        .google-summary-card .rating-bar-track {
            flex-grow: 1;
            height: 8px;
            background: rgba(0,0,0,0.06);
            border-radius: 4px;
            margin: 0 15px;
            overflow: hidden;
        }

        .google-summary-card .rating-bar-fill {
            height: 100%;
            background: #ffb400;
            border-radius: 4px;
        }

        .google-summary-card .rating-bar-percent {
            width: 35px;
            text-align: right;
            font-weight: 500;
        }

        html[data-theme="dark"] .google-summary-card .google-reviews-header h4 {
            color: #fff;
        }
        
        html[data-theme="dark"] .google-summary-card .rating-bar-track {
            background: rgba(255,255,255,0.1);
        }
        
        html[data-theme="dark"] .google-summary-card .rating-bar-row {
            color: rgba(255,255,255,0.7);
        }
`;

let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.google-summary-card')) {
    css += newCss;
    fs.writeFileSync('style.css', css);
}

// 2. Insert card into index.html
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<div class="testimonials-grid">';
const newCardHtml = `
                <!-- Google Reviews Summary -->
                <div class="testimonial-card google-summary-card js-scroll">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <i class="fab fa-google" style="font-size: 2rem; color: #4285F4;"></i>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style="width: 24px; display: none;">
                    </div>
                    <div class="google-reviews-header">
                        <h4>4.9</h4>
                        <div class="stars">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <div class="google-reviews-total">
                        Baseado em 1.745 avaliações
                    </div>
                    <div class="google-rating-bars">
                        <div class="rating-bar-row">
                            <span class="rating-bar-label">5 estrelas</span>
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 70%;"></div></div>
                            <span class="rating-bar-percent">70%</span>
                        </div>
                        <div class="rating-bar-row">
                            <span class="rating-bar-label">4 estrelas</span>
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 17%;"></div></div>
                            <span class="rating-bar-percent">17%</span>
                        </div>
                        <div class="rating-bar-row">
                            <span class="rating-bar-label">3 estrelas</span>
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 8%;"></div></div>
                            <span class="rating-bar-percent">8%</span>
                        </div>
                        <div class="rating-bar-row">
                            <span class="rating-bar-label">2 estrelas</span>
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 4%;"></div></div>
                            <span class="rating-bar-percent">4%</span>
                        </div>
                        <div class="rating-bar-row">
                            <span class="rating-bar-label">1 estrela</span>
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 1%;"></div></div>
                            <span class="rating-bar-percent">1%</span>
                        </div>
                    </div>
                    <a href="https://www.google.com/travel/search?q=Higor%20Passagens%20A%C3%A9reas&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350&hl=pt-BR&gl=br&cs=1&ssta=1&ts=CAEaKwopEicyJTB4OTE3ZjhjNTE5Mjg1ZjgyNzoweDVmMmNmNzBiZTQwNjI5MGQ&qs=CAEyE0Nnb0lqZEtZb0w3aHZaWmZFQUU4Ag&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjAyYDHit2UAxUAAAAAHQAAAAAQAw" target="_blank" class="btn btn-primary" style="margin-top: 25px; width: 100%; justify-content: center; background: var(--bg-light); color: var(--ocean-blue-dark); border: 1px solid rgba(0,0,0,0.1);">
                        Ver no Google <i class="fas fa-external-link-alt" style="margin-left: 5px; font-size: 0.9em;"></i>
                    </a>
                </div>
`;

if (html.includes(targetStr) && !html.includes('google-summary-card')) {
    html = html.replace(targetStr, targetStr + newCardHtml);
    html = html.replace(/href="style\.css\?v=\d+"/, 'href="style.css?v=5"');
    fs.writeFileSync('index.html', html);
    console.log("Card inserted.");
} else {
    console.log("Could not find target or already inserted.");
}
