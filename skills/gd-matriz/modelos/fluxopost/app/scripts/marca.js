// Marca do FluxoPost (07/11/2026, referência do Nilton): símbolo de dois painéis inclinados formando um "P", no degradê
// roxo (claro em cima à direita, profundo embaixo à esquerda) + o nome "FluxoPost" em Figtree 600 (escrito na
// tela com a fonte, ver logo() em src/painel/layout.js). Aqui saem o símbolo em vetor e os ícones do app instalável.
// Rodar só quando a marca mudar: node scripts/marca.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const COR = { claro: '#A646FF', fundo: '#5B10D2', noite: '#120F1F' };

// O desenho do símbolo (quadro 192 x 258, ângulo isométrico de 30°): painel da esquerda mais baixo, painel da direita mais alto com o "bojo" do P
const PAINEIS = [
  'M4.3 41 L69.7 78.7 Q74 81.2 74 86.2 L74 248.2 Q74 253.2 69.7 250.7 L4.3 213 Q0 210.5 0 205.5 L0 43.5 Q0 38.5 4.3 41 Z',
  'M82.3 2.5 L183.7 61 Q188 63.5 188 68.5 L188 142 Q188 147 183.7 149.5 L120.3 186.1 Q116 188.6 116 183.6 L116 110.5 Q116 105.5 111.7 103 L82.3 86 Q78 83.5 78 78.5 L78 5 Q78 0 82.3 2.5 Z',
];
const degrade = id => `<linearGradient id="${id}" x1="0.85" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="${COR.claro}"/><stop offset="1" stop-color="${COR.fundo}"/></linearGradient>`;
const paineis = cor => PAINEIS.map(d => `<path fill="${cor}" d="${d}"/>`).join('');
const simbolo = (cor = 'degrade', id = 'fp') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 192 258" role="img" aria-label="FluxoPost">${cor === 'degrade' ? `<defs>${degrade(id)}</defs>${paineis(`url(#${id})`)}` : paineis(cor)}</svg>`;
// Ícone do app: quadro com o degradê e o símbolo em branco (folga = margem para o recorte redondo do Android)
const icone = (folga = 0.22, raio = 0.22) => {
  const t = 100, m = t * folga, lado = t - 2 * m;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>${degrade('i')}</defs>
  <rect width="100" height="100" rx="${100 * raio}" fill="url(#i)"/>
  <g transform="translate(${50 - (lado / 258) * 94} ${m}) scale(${lado / 258}) translate(2 2)">${paineis('#FFFFFF')}</g></svg>`;
};

const VERSOES = {
  'simbolo.svg': simbolo(),
  'simbolo-branco.svg': simbolo('#FFFFFF'),
  'simbolo-escuro.svg': simbolo(COR.noite),
  'icone.svg': icone(),
  'icone-maskable.svg': icone(0.28, 0),
};

async function gerar() {
  const pub = path.join(__dirname, '..', 'public');
  const pasta = path.join(pub, 'marca');
  for (const f of fs.readdirSync(pasta)) fs.unlinkSync(path.join(pasta, f));   // tira os arquivos da marca antiga
  for (const [arq, svg] of Object.entries(VERSOES)) fs.writeFileSync(path.join(pasta, arq), svg);
  fs.writeFileSync(path.join(pub, 'favicon.svg'), simbolo('degrade', 'fav'));
  const png = (svg, tam, arq) => sharp(Buffer.from(svg), { density: 600 }).resize(tam, tam).png().toFile(path.join(pub, arq));
  await png(icone(), 192, 'icon-192.png');
  await png(icone(), 512, 'icon-512.png');
  await png(icone(0.28, 0), 512, 'icon-maskable-512.png');
  await png(icone(0.2, 0), 180, 'apple-touch-icon.png');
  await png(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-35 -2 258 258">${paineis('#FFFFFF')}</svg>`, 96, 'badge-96.png');
  console.log('Marca gerada em public/marca e ícones em public/.');
}

if (require.main === module) gerar().catch(e => { console.error(e); process.exit(1); });
module.exports = { PAINEIS, COR };
