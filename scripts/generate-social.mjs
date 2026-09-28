import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Arte tipográfica, criada a partir do conteúdo autorizado do briefing.
// Sem fotografias, marcas de terceiros ou imagem sintética da pessoa.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4efe6"/>
  <path d="M70 113H1130" stroke="#c9c3b6"/>
  <text x="70" y="77" font-family="Georgia,DejaVu Serif,serif" font-size="35" fill="#1e2727">Everton Gabriel<tspan fill="#a3442b">.</tspan></text>
  <text x="70" y="171" font-family="Arial,DejaVu Sans,sans-serif" font-size="15" letter-spacing="3" fill="#59605b">DADOS · PESQUISA · AÇÃO COLETIVA</text>
  <text x="65" y="300" font-family="Georgia,DejaVu Serif,serif" font-size="98" letter-spacing="-4" fill="#1e2727">Dados, pessoas</text>
  <text x="65" y="401" font-family="Georgia,DejaVu Serif,serif" font-size="98" letter-spacing="-4" fill="#a3442b">e oportunidades.</text>
  <path d="M167 427Q430 407 690 424" fill="none" stroke="#a3442b" stroke-width="3"/>
  <path d="M73 540C330 540 650 463 1126 535" fill="none" stroke="#a3442b" stroke-width="2"/>
  <circle cx="73" cy="540" r="5" fill="#a3442b"/><circle cx="1126" cy="535" r="5" fill="#a3442b"/>
  <text x="70" y="582" font-family="Arial,DejaVu Sans,sans-serif" font-size="17" fill="#1e2727">Cubatão, SP</text>
  <text x="1130" y="582" text-anchor="end" font-family="Arial,DejaVu Sans,sans-serif" font-size="17" fill="#1e2727">João Pessoa, PB · UFPB</text>
</svg>`;

await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og/social.png', import.meta.url).pathname);
console.log('Imagem social gerada: public/og/social.png (1200 × 630).');
