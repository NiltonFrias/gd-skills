// Manual de marca do FluxoPost (/marca, aberto): logo, símbolo, cores, fonte e os arquivos em vetor para baixar.
// O símbolo e os ícones saem de scripts/marca.js (public/marca/); o nome é escrito com a Figtree 600.
const V = '?v=6';
const SIMB = (id, cor) => `<svg viewBox="-2 -2 192 258" aria-hidden="true" style="height:100%;width:auto;display:block">${cor ? '' : `<defs><linearGradient id="${id}" x1="0.85" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="#A646FF"/><stop offset="1" stop-color="#5B10D2"/></linearGradient></defs>`}<path fill="${cor || `url(#${id})`}" d="M4.3 41 L69.7 78.7 Q74 81.2 74 86.2 L74 248.2 Q74 253.2 69.7 250.7 L4.3 213 Q0 210.5 0 205.5 L0 43.5 Q0 38.5 4.3 41 Z"/><path fill="${cor || `url(#${id})`}" d="M82.3 2.5 L183.7 61 Q188 63.5 188 68.5 L188 142 Q188 147 183.7 149.5 L120.3 186.1 Q116 188.6 116 183.6 L116 110.5 Q116 105.5 111.7 103 L82.3 86 Q78 83.5 78 78.5 L78 5 Q78 0 82.3 2.5 Z"/></svg>`;
const LOGO = (id, cor, corNome) => `<span class="lg"><span class="lg-s">${SIMB(id, cor)}</span><span class="lg-n" style="color:${corNome}">FluxoPost</span></span>`;
const CORES = [['Roxo claro', '#A646FF', 'início do degradê'], ['Violeta', '#7B2FF2', 'botões, links e gráficos'], ['Roxo profundo', '#5B10D2', 'fim do degradê'],
  ['Noite', '#120F1F', 'texto e fundos escuros'], ['Cinza claro', '#F3F4F7', 'fundo do app'], ['Branco', '#FFFFFF', 'cartões']];
const ARQUIVOS = ['simbolo.svg', 'simbolo-branco.svg', 'simbolo-escuro.svg', 'icone.svg', 'icone-maskable.svg'];

function telaMarca() {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Manual de marca · FluxoPost</title><link rel="icon" href="/favicon.svg${V}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;font-family:'Figtree',system-ui,sans-serif;color:#120F1F;background:#F3F4F7}
main{max-width:1040px;margin:0 auto;padding:48px 24px 72px}h1{font-size:40px;letter-spacing:-.03em;margin:0 0 6px}h2{font-size:20px;margin:44px 0 14px;letter-spacing:-.02em}
p{color:#4B5059;line-height:1.6;margin:0}.grade{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.quadro{display:grid;place-items:center;min-height:220px;border-radius:16px;border:1px solid #E3E5EA;background:#fff;padding:24px}.quadro.escuro{background:#120F1F;border-color:#120F1F}
.quadro.grad{background:linear-gradient(135deg,#A646FF,#7B2FF2 52%,#5B10D2)}
.lg{display:inline-flex;align-items:center;gap:18px}.lg-s{height:64px}.lg-n{font-weight:600;font-size:52px;letter-spacing:-.025em;line-height:1}
.simb{height:110px}.cores{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.cor{border-radius:14px;overflow:hidden;border:1px solid #E3E5EA;background:#fff}.cor i{display:block;height:90px}.cor div{padding:12px 14px}.cor b{display:block}.cor small{color:#6B717B}
.fonte{display:flex;flex-wrap:wrap;gap:24px;align-items:baseline;padding:24px;border-radius:16px;background:#fff;border:1px solid #E3E5EA}.fonte span{font-size:44px}
.baixar{display:flex;flex-wrap:wrap;gap:8px}.baixar a{padding:9px 14px;border-radius:10px;border:1px solid #E3E5EA;background:#fff;color:#120F1F;text-decoration:none;font-weight:600;font-size:14px}
@media (max-width:760px){.grade,.cores{grid-template-columns:1fr}.lg-n{font-size:34px}.lg-s{height:42px}}
</style></head><body><main>
  <h1>Manual de marca</h1><p>FluxoPost: agendamento, números e automação do Instagram. Premium, tecnológico e equilibrado.</p>
  <h2>Logo</h2>
  <div class="grade"><div class="quadro">${LOGO('a', '', '#120F1F')}</div><div class="quadro escuro">${LOGO('b', '', '#FFFFFF')}</div>
    <div class="quadro grad">${LOGO('c', '#FFFFFF', '#FFFFFF')}</div><div class="quadro"><div class="simb">${SIMB('d')}</div></div></div>
  <p style="margin-top:12px">O símbolo são dois painéis inclinados que formam um "P" em movimento (fluxo). O nome usa a Figtree 600, com as letras um pouco juntas (-2,5%). Respeite a área livre de meio símbolo em volta da logo.</p>
  <h2>Cores</h2>
  <div class="cores">${CORES.map(([n, c, u]) => `<div class="cor"><i style="background:${c}"></i><div><b>${n} · ${c}</b><small>${u}</small></div></div>`).join('')}</div>
  <p style="margin-top:12px">Degradê da marca: de <b>#A646FF</b> (em cima, à direita) para <b>#5B10D2</b> (embaixo, à esquerda). No app ele aparece no símbolo, no botão principal e no item aberto do menu; o resto da tela é branco e cinza.</p>
  <h2>Fonte</h2>
  <div class="fonte"><span style="font-weight:600">Aa Figtree</span><p>Logo e títulos. No texto das telas, Onest.</p></div>
  <h2>Arquivos</h2>
  <div class="baixar">${ARQUIVOS.map(a => `<a href="/marca/${a}${V}" download="fluxopost-${a}">${a.replace('.svg', '').replace(/-/g, ' ')}</a>`).join('')}</div>
</main></body></html>`;
}

module.exports = { telaMarca };
