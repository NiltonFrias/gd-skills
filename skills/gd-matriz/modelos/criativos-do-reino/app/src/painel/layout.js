// Casca do app Criativos do Reino: área de membros com menu lateral em barra (encolhe), conteúdo em fundo branco,
// cantos levemente arredondados, vidro só onde ajuda (barras e placas) e animações sutis.
// Dourado limpo (amarelo-ouro, sem puxar para o marrom) sobre preto neutro. Do molde GD fica o comportamento:
// tema claro/escuro e menu encolhido guardados no aparelho, abas embaixo no celular, janelas que só fecham no X.
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Ícones (traço, 24×24)
const P = {
  inicio: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  packs: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.6"/><path d="m21 15-4.5-4.5L6 21"/>',
  cursos: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  ia: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  ferramentas: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  favorito: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  igreja: '<path d="M12 2v4M10 4h4"/><path d="m6 10 6-4 6 4v11H6z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>',
  sino: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  lua: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  esquerda: '<path d="m15 18-6-6 6-6"/>', direita: '<path d="m9 18 6-6-6-6"/>', seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cadeado: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  funil: '<path d="M3 5h18l-7 8v6l-4-2v-4L3 5z"/>',
  carta: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', 'olho-fechado': '<path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-2.6 3.4M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7c1.9 0 3.6-.6 5-1.4"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  grafico: '<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>',
  enviar: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  usuario: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.6-4 3.7-6.5 7.5-6.5s6.9 2.5 7.5 6.5"/>',
  dinheiro: '<circle cx="12" cy="12" r="9"/><path d="M14.6 9.3c-.5-.8-1.4-1.3-2.6-1.3-1.6 0-2.6.8-2.6 1.9 0 1.2 1 1.6 2.6 2s2.7.9 2.7 2.1-1.1 2-2.7 2c-1.3 0-2.3-.5-2.8-1.4M12 6.5V8m0 8v1.5"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9.2 9.3c.3 1.7 1.8 3.6 3.6 4.4l1-1 1.7.8-.4 1.4c-2.9.3-6.4-3-6.7-5.8l1.4-.5.8 1.6z"/>',
  coroa: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
  externo: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  play: '<path d="M7 4v16l13-8z"/>', pausa: '<path d="M8 5v14M16 5v14"/>',
  som: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>', mudo: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
  tela: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', ok: '<path d="M20 6 9 17l-5-5"/>', fechar: '<path d="M18 6 6 18M6 6l12 12"/>',
  arquivo: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  refazer: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/>',
  copiar: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  mais: '<path d="M12 5v14M5 12h14"/>', editar: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  lixo: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', cima: '<path d="m18 15-6-6-6 6"/>',
  guia: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 8h6"/>', banner: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 10h6M7 14h4"/>',
  admin: '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>', alca: '<circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>', olhoFechado: '<path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>', olho: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};
const icone = (nome, tam = 18) => `<svg class="ico" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[nome] || ''}</svg>`;

// Menu: só os itens principais (idioma, tema, avisos e ajuda ficam no topo)
const MENU = [['#', 'Principal'], ['/', 'Início', 'inicio'], ['/cursos', 'Cursos', 'cursos'], ['/packs', 'Packs de Artes', 'packs'], ['/ferramentas', 'Ferramentas', 'ferramentas'], ['/ia', 'IA', 'ia'], ['/favoritos', 'Favoritos', 'favorito']];
// Celular: as 5 abas de baixo são as seções; o menu completo abre tocando no logo (lá em cima)
const ABAS = [['/', 'Início', 'inicio'], ['/cursos', 'Cursos', 'cursos'], ['/packs', 'Packs', 'packs'], ['/ferramentas', 'Ferramentas', 'ferramentas'], ['/ia', 'IA', 'ia']];
// Administrativo: a mesma casca, com o menu do que se edita
// Mesma ordem da vitrine do membro (Cursos, Packs, Ferramentas, IA); Guias logo abaixo de Cursos
const MENU_ADMIN = [['#', 'Conteúdo'], ['/admin/cursos', 'Cursos', 'cursos'], ['/admin/guias', 'Guias', 'guia'], ['/admin/packs', 'Packs de Artes', 'packs'],
  ['/admin/ferramentas', 'Ferramentas', 'ferramentas'], ['/admin/ia', 'IA', 'ia'], ['/admin/banners', 'Banners', 'banner'], ['#', 'Administrativo'], ['/admin/membros', 'Membros', 'usuario'], ['/admin/analytics', 'Analytics', 'grafico'], ['/admin/grupos', 'Grupos e ofertas', 'admin'],
  ['/admin/avisos', 'Avisos', 'sino'], ['/admin/configuracoes', 'Configurações', 'engrenagem'], ['#', 'Conta'], ['/', 'Ver como membro', 'olho']];
const ABAS_ADMIN = [['/admin/cursos', 'Cursos', 'cursos'], ['/admin/packs', 'Packs', 'packs'], ['/admin/membros', 'Membros', 'usuario'], ['/admin/avisos', 'Avisos', 'sino']];
const ativo = (href, caminho) => (href === '/' ? caminho === '/' : caminho === href || caminho.startsWith(href + '/'));

const CSS = `
:root{--ouro:#FFA62B;--ouro-claro:#FFCF55;--grad:linear-gradient(to top right,#DEFE91 0%,#FFCF55 50%,#FF8600 100%);--grad-txt:linear-gradient(to top right,#DEFE91 0%,#FFCF55 50%,#FF8600 100%);--ouro-ink:#111111;--preto:#0A0A0A;--preto-2:#141414;--branco:#FFFFFF;
--bg:#FFFFFF;--sup:#FFFFFF;--borda-hover:rgba(0,0,0,.2);--seta:#F07800;--s2:#F6F6F6;--s3:#EDEDED;--borda:rgba(0,0,0,.08);--borda2:rgba(0,0,0,.15);
--ink:#111111;--t2:#4A4A4A;--t3:#6F6F6F;--chip:#FFF0DC;--chip-ink:#8A4300;--ok:#11875A;--erro:#C9372C;
--vidro:rgba(255,255,255,.72);--sombra:0 1px 2px rgba(0,0,0,.05),0 10px 26px -14px rgba(0,0,0,.22);--sombra-pop:0 28px 70px -24px rgba(0,0,0,.4);
--raio:12px;--raio-g:16px;--menu-w:256px;--safe-b:max(env(safe-area-inset-bottom),12px);--suave:cubic-bezier(.2,.7,.2,1);
--fonte:Poppins,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
[data-theme="dark"]{--bg:#161618;--sup:#202023;--borda-hover:rgba(255,255,255,.28);--seta:#FFA62B;--s2:#26262A;--s3:#303034;--borda:rgba(255,255,255,.09);--borda2:rgba(255,255,255,.18);
--ink:#F7F7F7;--t2:#C8C8C8;--t3:#969696;--chip:rgba(255,150,30,.15);--chip-ink:#FFC163;--ok:#3DD598;--vidro:rgba(22,22,22,.7);
--sombra:0 1px 0 rgba(255,255,255,.04) inset,0 14px 30px -18px rgba(0,0,0,.8);--sombra-pop:0 30px 80px -20px rgba(0,0,0,.85)}
html.menu-encolhido{--menu-w:80px}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scrollbar-gutter:stable}[hidden]{display:none!important}
body{margin:0;color:var(--ink);font:14.5px/1.6 var(--fonte);background:var(--bg);-webkit-font-smoothing:antialiased;min-height:100vh}
h1,h2,h3{margin:0;letter-spacing:-.02em;line-height:1.2}h1{font-size:26px;font-weight:600}h2{font-size:20px;font-weight:600}h3{font-size:15.5px;font-weight:600}
p{margin:0}a{color:inherit}.ico{flex:none}
[data-theme="dark"] .so-claro,[data-theme="light"] .so-escuro{display:none!important}
.vidro{background:var(--vidro);backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);border:1px solid var(--borda);box-shadow:var(--sombra)}

.app{display:grid;grid-template-columns:var(--menu-w) minmax(0,1fr);min-height:100vh;transition:grid-template-columns .3s var(--suave)}
/* Menu lateral: barra preta de altura inteira, que encolhe */
.lateral{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;background:var(--preto);color:#B5B5B5;border-right:1px solid rgba(255,255,255,.06);overflow:visible;z-index:31}.lateral .cabeca,.lateral nav{overflow-x:hidden}
.lateral .cabeca{display:flex;align-items:center;gap:8px;padding:22px 14px 10px 22px;min-height:78px}
.marca{display:flex;align-items:center;gap:7.2px;flex:1;min-width:0;text-decoration:none}.marca img{display:block;width:auto}.marca .logo{height:24px}.marca .simb{height:24px;flex:none}
.encolher{display:inline-grid;place-items:center;width:30px;height:30px;min-height:0;padding:0;border:0;border-radius:8px;color:#8A8A8A;background:transparent!important;cursor:pointer;transition:transform .3s var(--suave),color .2s}
.encolher:hover{color:#fff;transform:none}
.lateral nav{flex:1;overflow-y:auto;padding:4px 14px 14px;scrollbar-width:none}
.secao-menu{margin:20px 12px 6px;color:#6B6B6B;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
.lateral a.item{position:relative;display:flex;align-items:center;gap:13px;min-height:44px;padding:0 13px;margin:2px 0;border-radius:10px;color:#B5B5B5;text-decoration:none;font-weight:500;white-space:nowrap;transition:color .2s,background .2s}
.lateral a.item{isolation:isolate}.lateral a.item::after{content:"";position:absolute;inset:3px 0;z-index:-1;border-radius:9px;background:transparent;transition:background .2s}
.lateral a.item:hover{color:#fff;background:transparent}.lateral a.item:hover::after{background:rgba(255,255,255,.06)}
.lateral a.item.on{color:#fff;font-weight:600;background:transparent}.lateral a.item.on::after{background:rgba(255,255,255,.09)}
.lateral a.item.on::before{content:"";position:absolute;left:-14px;top:10px;bottom:10px;width:3px;border-radius:0 3px 3px 0;background:var(--grad);box-shadow:0 0 12px rgba(255,150,30,.7)}
.lateral a.item.on .ico{color:var(--ouro)}
.lateral .pe{display:flex;align-items:center;gap:6px;padding:12px 14px 14px;border-top:1px solid rgba(255,255,255,.07)}
.barra-topo .empurra,.topo-cel .empurra{flex:1}
/* Pé do menu lateral: ajuda, idioma e tema, separados da navegação por uma linha */
.pe-menu{display:grid;gap:2px;padding:10px 14px 16px;border-top:1px solid rgba(255,255,255,.08)}
.item-pe{position:relative;display:flex;align-items:center;justify-content:flex-start;gap:13px;width:100%;min-height:40px;padding:0 13px;border:0;border-radius:10px;color:#9A9A9A;background:transparent!important;font:inherit;font-size:13.5px;font-weight:500;text-align:left;text-decoration:none;white-space:nowrap;cursor:pointer;list-style:none;transform:none!important;box-shadow:none}
.item-pe:hover{color:#fff;background:rgba(255,255,255,.06)!important}
.item-pe>span{display:flex;align-items:center;gap:13px}
.item-pe::-webkit-details-marker{display:none}
.idioma-lat>summary.item-pe{display:flex;justify-content:flex-start;width:100%;height:auto;min-height:40px;padding:0 13px;border:0;border-radius:10px;color:#9A9A9A;background:transparent}.idioma-lat>summary.item-pe:hover,.idioma-lat[open]>summary.item-pe{color:#fff;background:rgba(255,255,255,.06)}
.idioma-lat>summary.item-pe svg:first-child{width:19px;height:14px;flex:none;border-radius:3px}
.idioma-lat .idioma-menu{top:auto;bottom:calc(100% + 6px);left:4px;right:auto}
html.menu-encolhido .pe-menu .rot{display:none}
html.menu-encolhido .item-pe,html.menu-encolhido .idioma-lat>summary.item-pe{justify-content:center;padding:0}.pe-acoes{display:flex;gap:4px}
.conta-link{display:flex;align-items:center;gap:10px;flex:1;min-width:0;padding:4px;border-radius:10px;text-decoration:none}.conta-link:hover{background:rgba(255,255,255,.06)}
.avatar{display:inline-grid;place-items:center;flex:none;width:36px;height:36px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);font-size:12.5px;font-weight:700}
.quem{min-width:0;line-height:1.3}.quem b{display:block;color:#fff;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.quem small{display:block;font-size:11.5px;color:var(--ouro)}
.pe .ico-pe{flex:none;display:grid;place-items:center;width:34px;height:34px;min-height:0;padding:0;border:0;border-radius:9px;color:#8A8A8A;background:transparent!important;cursor:pointer;text-decoration:none}
.pe .ico-pe:hover{color:#fff;background:rgba(255,255,255,.06)!important;transform:none}.pe .ico-pe>span{display:grid;place-items:center;line-height:0}
html.menu-encolhido .marca .logo,html.menu-encolhido .secao-menu,html.menu-encolhido .item span,html.menu-encolhido .lateral .quem,html.menu-encolhido .pe-acoes{display:none}
html.menu-encolhido .marca{flex:none}html.menu-encolhido .lateral .cabeca{flex-direction:column;padding:33px 10px 10px}
html.menu-encolhido .lateral a.item{justify-content:center;padding:0}html.menu-encolhido .secao-menu+a{margin-top:16px}
html.menu-encolhido .encolher{transform:rotate(180deg)}html.menu-encolhido .pe{justify-items:center}

.conteudo{min-width:0;overflow-x:clip}.topo-cel{display:none}
main{position:relative;padding:16px 36px 80px}

.acoes-topo{display:flex;align-items:center;gap:8px}
.acoes-topo .ico-pe,.barra-topo>.ico-pe,.topo-cel>.ico-pe{display:grid;place-items:center;width:38px;height:38px;min-height:0;padding:0;border:1px solid var(--borda2);border-radius:10px;color:var(--t2);background:var(--sup)!important;text-decoration:none;cursor:pointer;transform:none!important}
.acoes-topo .ico-pe>span{display:grid;place-items:center;line-height:0}.acoes-topo .ico-pe:hover,.barra-topo>.ico-pe:hover{color:var(--ink);border-color:var(--ink)}
.idioma-sel{position:relative}.idioma-sel>summary{display:grid;place-items:center;width:38px;height:38px;padding:0;border:1px solid var(--borda2);border-radius:10px;color:var(--t2);background:var(--sup);list-style:none;cursor:pointer}
.idioma-sel>summary::-webkit-details-marker{display:none}.idioma-sel>summary svg{width:22px;height:16px;display:block;border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.08)}.idioma-sel[open]>summary{border-color:var(--ouro)}.idioma-sel[open]>summary .ico{transform:rotate(180deg)}
.idioma-menu{position:absolute;right:0;top:calc(100% + 6px);z-index:30;display:grid;gap:2px;min-width:180px;padding:6px;border:1px solid var(--borda);border-radius:12px;background:var(--sup);box-shadow:var(--sombra-pop);animation:subir .2s var(--suave)}
.idioma-menu .idioma{display:flex;align-items:center;justify-content:flex-start;gap:10px;width:100%;height:auto;min-height:40px;padding:0 10px;border:0;border-radius:8px;opacity:1;color:var(--ink);background:transparent!important;font:inherit;font-size:14px;font-weight:500;box-shadow:none}
.idioma-menu .idioma svg{width:24px;height:17px}.idioma-menu .idioma:hover{background:var(--s2)!important}.idioma-menu .idioma.on{background:var(--chip)!important;box-shadow:none}
@keyframes subir{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes aparecer{from{opacity:0}to{opacity:1}}
main>*{animation:aparecer .22s ease-out both}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}

/* Título da página: uma linha só */
.titulo-pag{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-bottom:24px}
.titulo-pag .voltar{display:inline-grid;place-items:center;width:38px;height:38px;border:1px solid var(--borda2);border-radius:10px;color:var(--t2);text-decoration:none}.titulo-pag .voltar:hover{color:var(--ink);border-color:var(--ink)}
.titulo-pag small{color:var(--t3);font-size:13.5px}
.titulo-pag .acoes{margin-left:auto;display:flex;gap:8px}
.secao{margin-top:44px;padding-top:36px;border-top:1px solid var(--borda)}.banners+.secao{border-top:0;padding-top:0}.secao-cab{display:flex;align-items:center;gap:12px;margin-bottom:20px}.secao-cab h2{font-size:25px;font-weight:600;letter-spacing:-.02em}
.ver-tudo{margin-left:auto;display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 14px;border:1px solid var(--borda2);border-radius:999px;color:var(--ink);font-weight:500;font-size:13px;text-decoration:none;transition:all .25s var(--suave)}.ver-tudo:hover{color:var(--ouro-ink);background:var(--grad);border-color:var(--ouro)}.ver-tudo .ico{transition:transform .25s var(--suave)}.ver-tudo:hover .ico{transform:translateX(2px)}

/* Botões */
button,.botao{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:0 20px;border:0;border-radius:10px;color:#fff;background:var(--preto);cursor:pointer;font:inherit;font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap;overflow:hidden;transition:transform .2s var(--suave),box-shadow .2s}
button:hover,.botao:hover{transform:translateY(-1px)}
.botao.ouro{color:var(--ouro-ink);background:var(--grad);box-shadow:0 10px 22px -12px rgba(255,150,30,.9)}
.botao.ouro::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.6) 50%,transparent 70%);transform:translateX(-120%);transition:transform .8s var(--suave)}
.botao.ouro:hover::after{transform:translateX(120%)}
.botao.leve,button.leve{color:var(--ink);background:var(--sup);border:1px solid var(--borda2)}.botao.leve:hover,button.leve:hover{border-color:var(--ink)}
[data-theme="dark"] .botao:not(.ouro):not(.leve):not(.canva):not(.ps),[data-theme="dark"] button:not(.ouro):not(.leve):not(.ico-pe):not(.encolher):not(.abrir):not(.abrir-kit):not(.fav):not(.icone-btn):not(.ponto-banner):not(.seta-banner):not(.ctl):not(.player-capa):not(.idioma):not(.item-pe):not(.entrar-olho):not(.vence-btn):not(.pv-prazo-btn){color:#0A0A0A;background:#EDEDEA}   /* escuro: botão comum neutro (o degradê fica só nos de destaque, .ouro — pedido do dono, 06/11) */
.botao.pequeno{min-height:38px;padding:0 14px;font-size:13px;border-radius:9px}
.botoes{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.icone-btn{display:inline-grid;place-items:center;width:40px;height:40px;min-height:0;padding:0;border:1px solid var(--borda2);border-radius:10px;color:var(--t2);background:var(--sup);cursor:pointer;text-decoration:none}
.icone-btn:hover{color:var(--ink);border-color:var(--ink);transform:none}.icone-btn>span{display:grid;place-items:center;line-height:0}
input{padding:10px 14px;border:1px solid var(--borda2);border-radius:10px;background:var(--sup);color:var(--ink);font:inherit;width:100%}
input:focus{outline:2px solid var(--ouro);border-color:transparent}
a:focus-visible,button:focus-visible{outline:2px solid var(--ouro);outline-offset:3px}
.selo{display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:6px;font-size:11.5px;font-weight:600;line-height:18px;white-space:nowrap;color:var(--chip-ink);background:var(--chip)}
.barra{height:4px;border-radius:4px;background:rgba(128,128,128,.25);overflow:hidden}.barra span{display:block;height:100%;background:var(--grad)}

/* Banner do Início: carrossel de banners programados */
.banners{position:relative;height:clamp(260px,24vw,340px);margin:0;border-radius:var(--raio-g);overflow:hidden;background:var(--preto);color:#fff;isolation:isolate}
.trilho-b{display:flex;height:100%;transition:transform .7s var(--suave)}
.slide-b{position:relative;flex:0 0 100%;display:flex;align-items:center;isolation:isolate;color:#fff;text-decoration:none}
.slide-b img{position:absolute;right:0;top:0;width:70%;height:100%;object-fit:cover;z-index:-2;-webkit-mask-image:linear-gradient(90deg,transparent,#000 22%);mask-image:linear-gradient(90deg,transparent,#000 22%)}
.slide-b::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,var(--preto) 26%,rgba(10,10,10,.82) 36%,rgba(10,10,10,.5) 46%,rgba(10,10,10,.26) 57%,rgba(10,10,10,.15) 68%,rgba(10,10,10,.14))}
.slide-b.sem-img{background:radial-gradient(700px 400px at 80% 50%,rgba(255,150,30,.16),transparent 65%),var(--preto)}
.slide-b.sem-img::after{content:"";position:absolute;right:8%;top:50%;width:min(30%,320px);aspect-ratio:3/2;transform:translateY(-50%);background:url(/marca/final/coroa-justa-ouro.svg) center/contain no-repeat;filter:drop-shadow(0 0 40px rgba(255,150,30,.35));z-index:-1}
.slide-b .txt{padding:28px 52px 34px 72px;max-width:680px;display:grid;gap:10px}
.slide-b p{max-width:34ch}.botao-b{justify-self:start;display:inline-flex;align-items:center;gap:8px;margin-top:10px;height:44px;padding:0 20px;border-radius:10px;color:var(--ouro-ink);background:var(--grad);font-weight:600;font-size:14.5px;transition:transform .2s,filter .2s}.slide-b:hover .botao-b{transform:translateY(-1px);filter:brightness(1.05)}.slide-b.tom-verde .botao-b{color:#06301B;background:#3DD68C}.slide-b.tom-azul h1 em,.slide-b.tom-azul .rot{color:#5AAEFF}.slide-b.tom-azul .botao-b{color:#04213F;background:#5AAEFF}.slide-b .rot{display:flex;align-items:center;gap:8px;color:var(--ouro);font-size:11.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}.slide-b .rot-ic{display:grid;place-items:center;width:26px;height:26px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 5px rgba(255,150,30,.18)}.slide-b .rot-ic .ico{stroke-width:2.2}
.slide-b h1{font-size:clamp(30px,3.2vw,50px);font-weight:600;letter-spacing:-.035em;line-height:1.05}.slide-b h1 em{font-style:normal;color:var(--ouro)}
/* banner com tom verde (dinheiro): destaque e moedinha em verde */
/* Banners com cor própria também em degradê (04/11/2026): verde (revendedor) e lilás (suporte, a cor da camisa da moça), com o botão do WhatsApp verde */
.slide-b.tom-verde h1 em,.slide-b.tom-lilas h1 em{-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.slide-b.tom-verde h1 em{background-image:linear-gradient(to top right,#19C37D,#5BE89E 55%,#C6F7A0)}
.slide-b.tom-lilas h1 em{background-image:linear-gradient(to top right,#8E5BE8,#B48CF5 55%,#E2CCFF)}.slide-b.tom-lilas .rot{color:#C3A2F7}
.slide-b.tom-lilas .rot-ic{color:#2A1050;background:#B48CF5;box-shadow:0 0 0 5px rgba(180,140,245,.2)}.slide-b.tom-lilas .botao-b{color:#06301B;background:#3DD68C}
.slide-b.tom-verde h1 em{color:#3DD68C}.slide-b.tom-verde .rot{color:#3DD68C}.slide-b.tom-verde .rot-ic{color:#06301B;background:#3DD68C;box-shadow:0 0 0 5px rgba(61,214,140,.2)}
.slide-b p{color:#CFCFCF;font-size:16.5px}.slide-b .botoes{margin-top:10px}
.pontos{position:absolute;left:50%;transform:translateX(-50%);bottom:18px;display:flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;background:rgba(0,0,0,.32);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:2}
.ponto-banner{width:7px;height:7px;min-height:0;padding:0;border:0;border-radius:999px;background:rgba(255,255,255,.45)!important;transition:width .25s,background .25s;cursor:pointer;overflow:hidden;transform:none!important}
.ponto-banner.on{width:16px;background:#fff!important}
.ponto-banner.sem-uso::after{content:"";position:absolute;inset:0;background:#fff;transform-origin:left;animation:encher 6s linear forwards}
.banners.parado .ponto-banner.sem-uso::after{animation-play-state:paused}
.seta-banner{position:absolute;top:50%;z-index:3;display:grid;place-items:center;width:46px;height:46px;min-height:0;padding:0;border:1px solid rgba(255,255,255,.18);border-radius:999px;color:#fff;background:rgba(10,10,10,.35)!important;backdrop-filter:blur(12px);opacity:0;transform:translateY(-50%) scale(.9)!important;transition:opacity .3s,transform .3s var(--suave),background .2s}
.seta-banner.ant{left:14px}.seta-banner.prox{right:20px}.banners:hover .seta-banner,.seta-banner:focus-visible{opacity:1;transform:translateY(-50%)!important}.seta-banner:hover{color:var(--ouro-ink);background:var(--grad)!important;border-color:var(--ouro)}
@media (hover:none){.seta-banner{display:none}}
@keyframes encher{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* Fileiras que correm para o lado (estilo Netflix) */
.fileira{display:grid;grid-auto-flow:column;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:14px 16px 30px;margin:-14px -16px -12px}.fileira::-webkit-scrollbar{display:none}.fileira{cursor:grab;scroll-padding-inline:16px}.fileira.arrastando{cursor:grabbing;scroll-snap-type:none;user-select:none}.fileira.arrastando *{pointer-events:none}
.fileira-caixa{position:relative}.seta-fileira{position:absolute;top:calc(50% - 28px);z-index:3;display:grid;place-items:center;width:44px;height:44px;min-height:0;padding:0;border:1px solid var(--borda2);border-radius:999px;color:var(--ink);background:var(--sup)!important;box-shadow:var(--sombra);opacity:0;pointer-events:none;transition:opacity .25s;transform:none!important}
.seta-fileira.ant{left:-18px}.seta-fileira.prox{right:-18px}.fileira-caixa.pode-ant:hover .seta-fileira.ant,.fileira-caixa.pode-prox:hover .seta-fileira.prox{opacity:1;pointer-events:auto}.fileira-caixa.pode-prox .seta-fileira.prox{opacity:.85;pointer-events:auto}
.seta-fileira:hover{color:var(--ouro-ink);background:var(--grad)!important;border-color:var(--ouro)}@media (hover:none){.seta-fileira{display:none}}.fileira>*{scroll-snap-align:start}
.fileira.cursos,.fileira.ferr,.fileira.packs{grid-auto-columns:calc((100% - 72px)/5)}@media (max-width:1300px){.fileira.cursos,.fileira.ferr,.fileira.packs{grid-auto-columns:calc((100% - 54px)/4)}}@media (max-width:1100px){.fileira.cursos,.fileira.ferr,.fileira.packs{grid-auto-columns:calc((100% - 36px)/3)}}.fileira.artes{grid-auto-columns:180px}

/* CARTÃO DE CURSO: pôster vertical alto */
.grade-cursos{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:24px 18px}
.curso{display:grid;gap:10px;text-decoration:none;color:var(--ink)}
.poster{position:relative;display:flex;flex-direction:column;justify-content:flex-end;aspect-ratio:2/3;padding:18px;border-radius:var(--raio);overflow:hidden;color:#fff;isolation:isolate;
  background:radial-gradient(120% 70% at 50% 0%,#2B2B2B,var(--preto) 70%);box-shadow:var(--sombra);transition:transform .45s var(--suave),box-shadow .45s var(--suave)}
.poster::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.6))}
.poster .foto-p{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .8s var(--suave)}
.poster .coroa-p{position:absolute;top:14px;left:14px;width:26px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))}
.poster .txt-p{display:grid;gap:4px}.poster .txt-p b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.3em;margin-top:0}
.poster .barra.sem{visibility:hidden}
.poster .serie{color:var(--ouro);font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.poster b{font-size:19px;line-height:1.15;letter-spacing:-.02em;margin-top:4px}.poster .apoio{color:#BDBDBD;font-size:12.5px;margin-top:4px}
.poster .linha-ouro{position:absolute;left:18px;right:18px;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--ouro),transparent)}
.curso:hover .poster{transform:translateY(-5px);box-shadow:0 26px 40px -22px rgba(0,0,0,.55),0 0 0 1px var(--borda-hover)}.curso:hover .foto-p{transform:scale(1.05)}
.poster::before{background:linear-gradient(180deg,transparent 35%,rgba(0,0,0,.85) 78%)!important}
.curso .rodape-c{display:grid;gap:6px;padding:0 2px}.curso .rodape-c small{color:var(--t3);font-size:12.5px}
.poster .play-c{position:absolute;top:12px;right:12px;display:grid;place-items:center;width:38px;height:38px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);opacity:0;transform:scale(.8);transition:opacity .3s,transform .3s var(--suave)}
.curso:hover .play-c,.bloqueado .play-c{opacity:1;transform:none}.bloqueado .play-c{color:#fff;background:rgba(10,10,10,.6);border:1px solid rgba(255,255,255,.25)}
.poster .barra{margin-top:10px;background:rgba(255,255,255,.2)}
.bloqueado .poster{filter:grayscale(1)}.bloqueado .poster .coroa{opacity:.55}

/* CARTÃO DE PACK: horizontal, com o mosaico das artes */
.grade-packs{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px}
.pack{position:relative;display:grid;gap:0;padding:6px;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup);box-shadow:var(--sombra);text-decoration:none;color:var(--ink);transition:transform .45s var(--suave),box-shadow .45s var(--suave),border-color .3s}
.pack:hover{transform:translateY(-4px);border-color:var(--borda-hover);box-shadow:0 26px 44px -22px rgba(0,0,0,.45)}
.mosaico{position:relative;display:grid;grid-template-columns:1.5fr 1fr;grid-template-rows:1fr 1fr;gap:4px;aspect-ratio:16/10;padding:4px;border-radius:var(--raio);background:var(--preto);overflow:hidden;box-shadow:var(--sombra);transition:transform .45s var(--suave),box-shadow .45s var(--suave)}
.mosaico span{border-radius:8px;background:#222 center/cover no-repeat;transition:transform .7s var(--suave)}
.mosaico span:first-child{grid-row:span 2}
.mosaico.vazio-m{display:grid;place-items:center;grid-template-columns:1fr;grid-template-rows:1fr;background:radial-gradient(70% 90% at 50% 50%,rgba(255,150,30,.16),transparent 70%),var(--preto)}
.mosaico.vazio-m img{width:34%;filter:drop-shadow(0 0 24px rgba(255,150,30,.4))}
.mosaico .selo-m{position:absolute;left:12px;bottom:12px;padding:4px 10px;border-radius:7px;color:#fff;background:rgba(10,10,10,.55);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14);font-size:11.5px;font-weight:600}
.pack .mosaico{box-shadow:none;border-radius:10px}.pack:hover .mosaico span{transform:scale(1.04)}
.mosaico.unico{display:block;padding:0;background:#222 left center/cover no-repeat;transition:background-position 1.2s var(--suave)}.pack:hover .mosaico.unico{background-position:12% center}
.pack .rodape-c{display:flex;align-items:center;gap:10px;padding:14px 10px 10px}.pack .rodape-c h3{flex:1;font-size:17px}
.pack .rodape-c>.ico{color:var(--seta);stroke-width:2.6;transition:transform .3s var(--suave)}.pack:hover .rodape-c>.ico{transform:translateX(4px)}
.bloqueado .mosaico span{filter:grayscale(1) brightness(.7)}
.cadeado-canto{position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:7px;color:#fff;background:rgba(10,10,10,.6);backdrop-filter:blur(10px);font-size:11.5px;font-weight:600;z-index:2}

/* CARTÃO DE FERRAMENTA: ilustração que explica + texto */
.grade-ferramentas{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px}
.ferramenta{display:grid;grid-template-rows:auto 1fr;border:1px solid var(--borda);border-radius:var(--raio);overflow:hidden;text-decoration:none;color:var(--ink);background:var(--sup);transition:transform .4s var(--suave),box-shadow .4s var(--suave),border-color .3s}
a.ferramenta:hover{transform:translateY(-4px);box-shadow:0 24px 40px -24px rgba(0,0,0,.4);border-color:var(--borda-hover)}
.ilustra{position:relative;display:grid;place-items:center;aspect-ratio:16/9;background:linear-gradient(160deg,#FFF8DD,#FFFFFF 70%);overflow:hidden}
[data-theme="dark"] .ilustra{background:linear-gradient(160deg,#1E1A0C,#121212 70%)}
.ilustra.com-imagem{background:#111}.ilustra.com-imagem img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s var(--suave)}a.ferramenta:hover .ilustra img{transform:scale(1.05)}
.ferramenta .txt-f{display:grid;gap:6px;align-content:start;padding:18px 20px 20px}.ferramenta .txt-f p{color:var(--t2);font-size:13.5px}.ferramenta .selo{justify-self:start;margin-top:4px}
.ferramenta.em-breve .ilustra{opacity:.92}
/* ilustração: mini calendário */
.mini-cal{width:62%;display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:12px;border-radius:10px;background:#fff;box-shadow:0 14px 30px -16px rgba(0,0,0,.35);transition:transform .5s var(--suave)}
[data-theme="dark"] .mini-cal{background:#1B1B1B}
.mini-cal i{aspect-ratio:1;border-radius:4px;background:rgba(128,128,128,.14)}.mini-cal i.m{background:var(--grad);box-shadow:0 0 10px rgba(255,150,30,.7)}
.mini-cal .topo-mc{grid-column:1/-1;height:8px;width:45%;border-radius:4px;background:var(--ink);opacity:.8;margin-bottom:4px}
a.ferramenta:hover .mini-cal{transform:rotate(-2deg) scale(1.04)}
.notif{position:absolute;right:12%;top:16%;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:9px;background:var(--preto);color:#fff;font-size:10.5px;font-weight:600;box-shadow:0 10px 20px -10px rgba(0,0,0,.5);animation:balanca 3s ease-in-out infinite}
.notif .ico{color:var(--ouro)}@keyframes balanca{50%{transform:translateY(-4px)}}
/* ilustração: bloco de notas */
.mini-nota{width:46%;aspect-ratio:4/5;display:grid;align-content:start;gap:7px;padding:14px;border-radius:8px;background:#fff;box-shadow:0 14px 30px -16px rgba(0,0,0,.35);transform:rotate(3deg)}
[data-theme="dark"] .mini-nota{background:#1B1B1B}.mini-nota i{height:5px;border-radius:3px;background:rgba(128,128,128,.25)}.mini-nota i:first-child{width:60%;background:var(--grad)}.mini-nota i:nth-child(3){width:80%}.mini-nota i:nth-child(5){width:55%}
/* ilustração: fatiador */
.mini-fatia{display:flex;gap:4px;width:74%}.mini-fatia i{flex:1;aspect-ratio:4/5;border-radius:5px;background:linear-gradient(135deg,#FFA62B,#FFE2A0 60%,#fff);box-shadow:0 10px 20px -12px rgba(0,0,0,.4)}
.mini-fatia i:nth-child(2){background:linear-gradient(135deg,#FFE2A0,#FFA62B)}.mini-fatia i:nth-child(3){background:linear-gradient(135deg,#fff,#FFE2A0 40%,#FFA62B)}

.mini-fundo{position:relative;width:46%;aspect-ratio:1;border-radius:10px;overflow:hidden;box-shadow:0 14px 30px -16px rgba(0,0,0,.35)}
.mini-fundo .xadrez{position:absolute;inset:0;background:conic-gradient(#E9E9E9 25%,#fff 0 50%,#E9E9E9 0 75%,#fff 0) 0 0/18px 18px}
.mini-fundo .pessoa{position:absolute;left:50%;bottom:0;width:60%;height:78%;transform:translateX(-50%);background:radial-gradient(circle at 50% 24%,#FFA62B 0 18%,transparent 19%),radial-gradient(ellipse at 50% 100%,#111 0 48%,transparent 49%)}
.mini-conv{display:flex;align-items:center;gap:12px}.mini-conv b{display:grid;place-items:center;width:64px;height:76px;border-radius:9px;background:#fff;color:#111;font-size:15px;box-shadow:0 14px 30px -16px rgba(0,0,0,.35)}
[data-theme="dark"] .mini-conv b{background:#1B1B1B;color:#eee}.mini-conv b.ouro{background:var(--grad);color:#111}
.seta-conv{width:34px;height:2px;background:var(--ink);position:relative}.seta-conv::after{content:"";position:absolute;right:-1px;top:-4px;width:9px;height:9px;border-top:2px solid var(--ink);border-right:2px solid var(--ink);transform:rotate(45deg)}
.mini-foto{position:relative;width:42%;aspect-ratio:4/5;border-radius:10px;background:linear-gradient(160deg,#2B2B2B,#0A0A0A);overflow:hidden;box-shadow:0 14px 30px -16px rgba(0,0,0,.45)}
.mini-foto .pessoa{position:absolute;left:50%;bottom:0;width:70%;height:80%;transform:translateX(-50%);background:radial-gradient(circle at 50% 26%,#E8C9A0 0 17%,transparent 18%),radial-gradient(ellipse at 50% 100%,#FFA62B 0 46%,transparent 47%)}
.brilho{position:absolute;width:10px;height:10px;background:var(--grad);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);animation:cintila 2.2s ease-in-out infinite}.b1{top:14%;right:16%}.b2{top:34%;left:14%;animation-delay:1s}
@keyframes cintila{50%{opacity:.3;transform:scale(.6)}}
.mini-3d{font-size:84px;font-weight:700;line-height:1;color:var(--ouro);text-shadow:1px 1px 0 #F08A10,2px 2px 0 #C99600,3px 3px 0 #B38600,4px 4px 0 #9C7400,6px 8px 16px rgba(0,0,0,.35)}
.mini-paisagem{position:relative;width:62%;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,#FFE9A8,#FFF7DD);box-shadow:0 14px 30px -16px rgba(0,0,0,.35)}
.mini-paisagem .sol{position:absolute;left:58%;top:22%;width:22%;aspect-ratio:1;border-radius:999px;background:var(--grad);box-shadow:0 0 24px rgba(255,150,30,.8)}
.mini-paisagem .monte{position:absolute;bottom:0;width:70%;height:62%;background:#1A1A1A;clip-path:polygon(0 100%,45% 10%,100% 100%)}.mini-paisagem .m1{left:-10%}.mini-paisagem .m2{right:-14%;height:48%;background:#333}

/* Cartão padrão (packs, ferramentas e IA) */
.cartao{position:relative;display:grid;grid-template-rows:auto 1fr;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);overflow:hidden;text-decoration:none;color:var(--ink);box-shadow:var(--sombra);transition:transform .4s var(--suave),box-shadow .4s var(--suave),border-color .3s}
.cartao:hover{transform:translateY(-4px);border-color:var(--borda-hover);box-shadow:0 24px 40px -22px rgba(0,0,0,.45)}
.cartao-img{position:relative;display:grid;place-items:center;aspect-ratio:4/3;overflow:hidden;background:#111}
.cartao-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s var(--suave)}.cartao:hover .cartao-img img{transform:scale(1.05)}
.cartao-img.ilustrado{background:linear-gradient(160deg,#FFF8DD,#FFFFFF 70%)}[data-theme="dark"] .cartao-img.ilustrado{background:linear-gradient(160deg,#1E1A0C,#121212 70%)}
.selo-img{position:absolute;top:10px;right:10px;display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:7px;color:#fff;background:rgba(10,10,10,.6);backdrop-filter:blur(10px);font-size:11.5px;font-weight:600}
.cartao-txt{display:flex;align-items:center;gap:12px;padding:14px 16px}.cartao-txt>span{flex:1;min-width:0;display:grid;gap:2px}.cartao-txt h3{font-size:17px;line-height:1.3}
.cartao-txt p{color:var(--t3);font-size:13px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.8em}
.cartao-txt>.ico{color:var(--seta);stroke-width:2.6;transition:transform .3s var(--suave)}.cartao:hover .cartao-txt>.ico{transform:translateX(4px)}
/* Bloqueado: bem mais apagado e com o cadeado grande no meio; ao passar o mouse clareia só um pouco (não mostra tudo) */
.cartao.bloqueado .cartao-img img{filter:grayscale(1) brightness(.42)}a.cartao.bloqueado:hover .cartao-img img{filter:grayscale(.6) brightness(.6)}
/* Dentro de um pack não liberado: artes apagadas com cadeado; a mais nova, grátis, com o selo no degradê */
.moldura:has(.trava-arte) img,.faixa-caixa:has(.trava-arte) img,.midia:has(.trava-arte) img{filter:grayscale(1) brightness(.45)}
.trava-arte{position:absolute;top:50%;left:50%;z-index:3;display:grid;place-items:center;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:999px;color:#fff;background:rgba(10,10,10,.55);backdrop-filter:blur(6px);box-shadow:0 0 0 1px rgba(255,255,255,.3);pointer-events:none}
.selo-gratis{position:absolute;top:10px;left:10px;z-index:3;padding:6px 12px;border-radius:999px;color:#1A0E00;background:var(--grad);font-size:12.5px;font-weight:700;box-shadow:0 6px 16px -6px rgba(255,134,0,.7);pointer-events:none}
.moldura:has(.selo-gratis),.faixa-caixa:has(.selo-gratis),.midia:has(.selo-gratis){box-shadow:0 0 0 2px #FF9A2E;border-radius:var(--raio)}
.breve-c .trava-c,.em-breve .trava-c{cursor:default}
/* "Em breve" com o mesmo desenho do bloqueado: relógio no centro; a imagem fica colorida, só um pouco apagada */
.curso-c.em-breve .cartao-img img,.cartao.em-breve .cartao-img img{filter:saturate(.75) brightness(.7)}
.trava-c{position:absolute;top:50%;left:50%;z-index:2;display:grid;place-items:center;width:68px;height:68px;margin:-34px 0 0 -34px;border-radius:999px;color:#fff;background:rgba(10,10,10,.55);backdrop-filter:blur(8px);box-shadow:0 0 0 1px rgba(255,255,255,.3);transition:transform .3s var(--suave)}
/* Mesmo efeito em todos os bloqueados (packs, ferramentas, cursos e a aula): ao passar o mouse o cadeado acende no degradê */
a.cartao.bloqueado:hover .trava-c,a.curso-c.bloqueado:hover .play-c,.video.travado:hover .trava-c{transform:scale(1.06);color:#1A0E00;background:var(--grad);box-shadow:none}
a.curso-c.bloqueado:hover .play-c{transform:translate(-50%,-50%) scale(1.06)}
.curso-c.bloqueado .play-c,.trava-c{transition:transform .3s var(--suave),background .3s,color .3s}
.cartao.em-breve .cartao-img img{filter:saturate(.75) brightness(.7)}
/* Pack: mesmo cartão de Ferramentas e IA (imagem 4:3, 1000x750), no computador e no celular (pedido do dono, 04/11/2026) */

.curso-c{border:0;background:none}.curso-c .cartao-img{aspect-ratio:3/4;border-radius:var(--raio)}
.cartao-img img.selo-ferramenta{inset:auto;top:12px;right:12px;width:46px;height:46px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(0,0,0,.45));transform:none!important}
.selo-progresso,.selo-esq{right:auto;left:10px}.curso-c .cartao-img img{object-position:center}
.curso-c h3{line-height:1.25}.curso-c .cartao-txt p{margin-top:4px}
.selo-progresso{opacity:0;transform:translateY(-4px);transition:opacity .25s,transform .25s var(--suave)}a.curso-c:hover .selo-progresso,a.curso-c:focus-visible .selo-progresso{opacity:1;transform:none}@media (hover:none){.selo-progresso{opacity:1;transform:none}}
.curso-c .barra{margin-top:8px}.curso-c .barra.sem{visibility:hidden}
.play-c{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:58px;height:58px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 8px rgba(255,150,30,.2);transform:translate(-50%,-50%) scale(.85);opacity:0;transition:opacity .3s,transform .3s var(--suave)}
a.curso-c:hover .play-c{opacity:1;transform:translate(-50%,-50%) scale(1)}
.curso-c.bloqueado .play-c{opacity:1;transform:translate(-50%,-50%) scale(1);width:72px;height:72px;color:#fff;background:rgba(10,10,10,.55);backdrop-filter:blur(8px);box-shadow:0 0 0 1px rgba(255,255,255,.25)}
@media (hover:none){.play-c{opacity:1;transform:translate(-50%,-50%) scale(.9)}}
.grade-cursos{grid-template-columns:repeat(auto-fill,minmax(270px,1fr))!important}

/* Player da aula: o vídeo do YouTube por baixo, com os nossos controles por cima */
.player{position:relative;aspect-ratio:16/9;border-radius:var(--raio-g);overflow:hidden;background:#000;color:#fff}
.player-yt{position:absolute;left:0;right:0;top:-110px;bottom:-110px;pointer-events:none}.player-yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.player-escudo{position:absolute;inset:0;z-index:2;cursor:pointer}
.player-capa{position:absolute;inset:0;z-index:3;display:grid;place-items:center;width:100%;height:100%;min-height:0;padding:0;border:0;border-radius:0;background:#000 center/cover no-repeat;cursor:pointer;transform:none!important}
.player-capa::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.45)}
.player-capa .play,.video .play{position:relative;display:grid;place-items:center;width:78px;height:78px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 10px rgba(255,150,30,.18);transition:transform .25s var(--suave)}.player-capa:hover .play{transform:scale(1.06)}
.player.tocando .player-capa{opacity:0;pointer-events:none}.player.comecou:not(.tocando) .player-capa{background-image:none!important;background-color:rgba(0,0,0,.35)}
.player-controles{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;align-items:center;gap:12px;padding:26px 16px 12px;background:linear-gradient(180deg,transparent,rgba(0,0,0,.8));opacity:0;transition:opacity .3s}
.player.comecou:hover .player-controles,.player.comecou:not(.tocando) .player-controles,.player:focus-within .player-controles{opacity:1}
.ctl{display:grid;place-items:center;width:38px;height:38px;min-height:0;padding:0;border:0;border-radius:9px;color:#fff;background:transparent!important;cursor:pointer;transform:none!important}.ctl:hover{color:var(--ouro)}.ctl>span{display:grid;line-height:0}
.player .so-tocando,.player.tocando .so-parado,.player .so-mudo,.player.mudo .so-som{display:none}.player.tocando .so-tocando,.player.mudo .so-mudo{display:grid}
.tempo{font-size:12.5px;font-variant-numeric:tabular-nums;white-space:nowrap;color:#E6E6E6}
.progresso{flex:1;padding:0;border:0;height:4px;accent-color:var(--ouro);background:transparent;cursor:pointer}
.volume{flex:none;width:76px;padding:0;margin:0 4px 0 -4px;border:0;height:4px;accent-color:var(--ouro);background:transparent;cursor:pointer}
@media (hover:none),(max-width:600px){.volume{display:none}}
.video{background-size:cover;background-position:center}

/* Artes (cartaz) */
.grade-artes{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:22px 16px}
.arte{position:relative}
.abrir,.abrir-kit{display:grid;gap:8px;width:100%;min-height:0;padding:0;border:0;border-radius:0;background:none!important;color:var(--ink);text-align:left;cursor:pointer;font:inherit;font-weight:400;overflow:visible;transform:none!important}
.abrir-kit{display:block;border-radius:var(--raio);overflow:hidden}
.arte .moldura{display:block;border-radius:var(--raio);overflow:hidden;background:var(--s3);box-shadow:var(--sombra);transition:transform .4s var(--suave),box-shadow .4s var(--suave)}
.arte img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;transition:transform .7s var(--suave)}
.arte:hover .moldura{transform:translateY(-4px);box-shadow:0 22px 38px -20px rgba(0,0,0,.5),0 0 0 1px var(--borda-hover)}.arte:hover img{transform:scale(1.05)}
.arte .legenda{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;color:var(--t3);padding:0 2px}.arte .legenda b{color:var(--ink);font-weight:500}
.fav{position:absolute;top:8px;right:8px;display:inline-grid;place-items:center;width:34px;height:34px;min-height:0;padding:0;border:1px solid rgba(255,255,255,.2);border-radius:9px;color:#fff;background:rgba(10,10,10,.4)!important;backdrop-filter:blur(10px);opacity:0;transform:translateY(-4px);transition:opacity .25s,transform .25s var(--suave)}
.arte:hover .fav,.carrossel:hover .fav,.kit:hover .fav,.fav.on,.fav:focus-visible{opacity:1;transform:none}.midia{position:relative}.faixa-caixa .fav,.midia .fav{z-index:2}@media (hover:none){.fav{opacity:1;transform:none}}
[data-fav].on{color:var(--ouro)!important}[data-fav].on .ico{fill:currentColor}

/* Filtros */
.filtros{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:22px}
.chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;flex:1 1 auto;min-width:0;cursor:grab;-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 40px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 40px),transparent)}.chips.arrastando{cursor:grabbing}.chips.arrastando a{pointer-events:none}.chips.no-fim{-webkit-mask-image:none;mask-image:none}.chips::-webkit-scrollbar{display:none}
.chips a{display:inline-flex;align-items:center;gap:7px;flex:none;min-height:38px;padding:0 14px;border:1px solid var(--borda2);border-radius:9px;color:var(--t2);text-decoration:none;font-weight:500;font-size:13.5px;transition:all .2s}
.chips a:hover{color:var(--ink);border-color:var(--ink)}.chips a small{color:var(--t3);font-size:11.5px}
.chips a.on{color:#fff;background:var(--preto);border-color:var(--preto)}.chips a.on small{color:#BDBDBD}
[data-theme="dark"] .chips a.on{color:var(--ouro-ink);background:var(--grad);border-color:var(--ouro)}[data-theme="dark"] .chips a.on small{color:#5C4500}
.busca-campo{position:relative;width:280px;flex:none}.busca-campo .ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none}.busca-campo input{height:36px;padding:0 12px 0 36px;font-size:13.5px}

/* Carrossel e kit */
.lista-carrossel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.lista-carrossel .mes{grid-column:1/-1}.mes{font-size:11px;font-weight:600;color:var(--t3);letter-spacing:.18em;text-transform:uppercase}
.carrossel,.kit{display:grid;gap:12px;padding:10px 10px 12px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);box-shadow:var(--sombra)}
.carrossel .faixa{overflow-x:auto;scroll-snap-type:x mandatory;border-radius:var(--raio);background:var(--s3);scrollbar-width:thin}
.carrossel .faixa img{display:block;height:240px;width:auto;max-width:none}
.linha-acoes{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:0 4px}.linha-acoes>div:first-child{display:grid}.linha-acoes small{color:var(--t3);font-size:12.5px}.linha-acoes .botoes{margin-left:auto;gap:8px}
.kits{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:28px 22px}
.kit img{display:block;width:100%;aspect-ratio:12/5;object-fit:cover;background:var(--s3);transition:transform .6s var(--suave)}.kit:hover img{transform:scale(1.03)}
.grade-projecao{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}
.slide{display:grid;place-items:center;aspect-ratio:16/9;border-radius:var(--raio);color:#fff;background:radial-gradient(circle at 50% 120%,rgba(255,150,30,.25),transparent 60%),var(--preto);font-weight:600;font-size:18px;text-align:center;padding:16px}
.slide small{display:block;color:#9A9A9A;font-weight:400;font-size:12px}
/* Bloqueado (04/11/2026): caixa escura com borda no degradê da marca, cadeado grande e botão forte para liberar */
.oferta{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:16px 22px;padding:22px 24px;margin-bottom:24px;border-radius:var(--raio-g);color:#fff;background:linear-gradient(#111,#111) padding-box,var(--grad) border-box;border:2px solid transparent;box-shadow:0 18px 40px -22px rgba(255,134,0,.55)}
.oferta-ic{display:grid;place-items:center;flex:none;width:54px;height:54px;border-radius:999px;color:#1A0E00;background:var(--grad)}.oferta-ic .ico{color:inherit}
.oferta div{flex:1;min-width:220px;display:grid;gap:4px}.oferta b{font-size:18px;font-weight:600}.oferta small{color:#C9C9C9;font-size:14px}
.oferta-bt{min-height:50px;padding:0 24px;font-size:15.5px;font-weight:700;gap:10px}@media (max-width:700px){.oferta-bt{width:100%;justify-content:center}}

/* Aula */
.aula{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:24px;align-items:start}
.video{position:relative;display:grid;place-items:center;aspect-ratio:16/9;border-radius:var(--raio-g);background:radial-gradient(70% 90% at 50% 40%,#2B2B2B,var(--preto));overflow:hidden}
/* A capa do curso é em pé (3:4): no quadro deitado do vídeo ela cobre a área inteira, sem repetir (04/11/2026) */
.video[style]{background-size:cover;background-repeat:no-repeat;background-position:center 15%}
/* Curso não liberado: a capa em preto e branco e escura, com o mesmo cadeado sem cor dos cartões do Início */
.video.travado img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 15%;filter:grayscale(1) brightness(.42)}
.video.travado .trava-c{width:84px;height:84px;margin:-42px 0 0 -42px}
.video .coroa-v{position:absolute;width:22%;top:18%;opacity:.25}
.video .play{position:relative;display:grid;place-items:center;width:74px;height:74px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 10px rgba(255,150,30,.16);animation:pulsar 2.4s ease-in-out infinite}
@keyframes pulsar{50%{box-shadow:0 0 0 16px rgba(255,150,30,.06)}}
.aula h1{font-size:24px;margin:20px 0 8px}.aula .descricao{color:var(--t2);max-width:68ch}.aula .botoes{margin:18px 0;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px}.player .fav{z-index:6;opacity:1;transform:none}
.modulos{border:1px solid var(--borda);border-radius:var(--raio-g);overflow:hidden;position:sticky;top:20px}
.modulos .cab-m{display:grid;gap:8px;padding:18px 20px;border-bottom:1px solid var(--borda)}.modulos .cab-m small{color:var(--t3)}.modulos .cab-m .rot{color:var(--t3);font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.modulo{border-bottom:1px solid var(--borda)}.modulo:last-child{border-bottom:0}
.modulo>summary{display:flex;align-items:center;gap:10px;padding:14px 20px;list-style:none;cursor:pointer;font-weight:600;font-size:14px}.modulo>summary::-webkit-details-marker{display:none}
.modulo>summary small{margin-left:auto;color:var(--t3);font-weight:400}.modulo>summary .ico{transition:transform .25s var(--suave)}.modulo[open]>summary .ico{transform:rotate(90deg)}
.licao{display:flex;align-items:center;gap:12px;margin:2px 8px;padding:9px 12px;border-radius:9px;text-decoration:none;color:var(--t2);font-size:13.5px;transition:background .2s}
.licao:hover{background:var(--s2);color:var(--ink)}.licao.on{background:var(--chip);color:var(--ink);font-weight:600}
.licao .n{display:inline-grid;place-items:center;flex:none;width:26px;height:26px;border-radius:999px;border:1px solid var(--borda2);font-size:11.5px}
.licao.feita .n{color:#fff;background:var(--ok);border-color:var(--ok)}.licao.on .n{color:var(--ouro-ink);background:var(--grad);border-color:var(--ouro)}.licao small{margin-left:auto;color:var(--t3)}

/* Calendário */
.calendario{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:22px;align-items:start}
.calendario>div{padding:20px;border:1px solid var(--borda);border-radius:var(--raio-g)}
.mes-cab{display:flex;align-items:center;gap:8px;margin-bottom:14px}.mes-cab h2{text-transform:capitalize;margin-right:auto}
.grade-mes{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
.grade-mes .sem{padding:4px 0;text-align:center;color:var(--t3);font-size:11.5px;font-weight:500}
.grade-mes .d{position:relative;display:grid;align-content:start;gap:3px;min-height:84px;padding:9px;border-radius:9px;background:var(--s2);font-size:13.5px;font-weight:500}
.grade-mes .d.fora{background:transparent;color:var(--t3);opacity:.4}.grade-mes .d.hoje{box-shadow:inset 0 0 0 1.5px var(--ink)}
.grade-mes .d.tem{background:var(--chip)}.grade-mes .d .ev{font-size:11px;font-weight:600;line-height:1.3;color:var(--chip-ink)}
.lista-datas{display:grid;gap:6px}
.data-item{display:flex;align-items:center;gap:14px;padding:10px;border-radius:10px;transition:background .2s}.data-item:hover{background:var(--s2)}
.data-item .dd{display:grid;place-items:center;flex:none;width:50px;height:54px;border-radius:9px;background:var(--s2);line-height:1.05}.data-item .dd b{font-size:19px}.data-item .dd small{font-size:10.5px;color:var(--t2)}
.data-item.perto .dd{color:var(--ouro-ink);background:var(--grad)}.data-item.perto .dd small{color:#4A3800}
.data-item .di{flex:1;min-width:0;display:grid}.data-item .di b{font-size:14px}.data-item .di small{color:var(--t3);font-size:12px}
.chave{position:relative;display:inline-block;width:44px;height:26px;flex:none}.chave input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer;z-index:1}
.chave span{position:absolute;inset:0;border-radius:999px;background:var(--borda2);transition:.25s var(--suave)}.chave span::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:999px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.2);transition:.25s var(--suave)}
.chave input:checked+span{background:var(--grad)}.chave input:checked+span::after{left:21px}
.aviso-cal{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;padding:16px 20px;margin-bottom:22px;border-radius:var(--raio);background:var(--s2)}.aviso-cal div{flex:1;min-width:220px}.aviso-cal small{color:var(--t3)}

/* Janela da arte: fecha só no X */
dialog.janela{width:min(940px,calc(100vw - 32px));max-height:calc(100vh - 32px);padding:0;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup);color:var(--ink);box-shadow:var(--sombra-pop)}
dialog.janela[open]{animation:abrirJanela .4s var(--suave)}@keyframes abrirJanela{from{opacity:0;transform:translateY(14px) scale(.98)}}
dialog.janela::backdrop{background:rgba(0,0,0,.5);backdrop-filter:blur(8px)}
.janela-arte{display:grid;grid-template-columns:minmax(0,1fr) 310px}
.janela-arte .previa{display:grid;place-items:center;padding:24px;background:var(--s2)}.janela-arte .previa img{max-width:100%;max-height:calc(100vh - 140px);border-radius:10px;display:block}
.janela-arte .lado{display:flex;flex-direction:column;gap:10px;padding:24px}.janela-arte .lado .botao{width:100%}
.janela-arte .fechar{align-self:flex-end;margin:-6px -6px 4px 0}.janela-arte h2{font-size:21px;margin-bottom:10px}.janela-arte .rot{color:var(--t3);font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.janela-arte .dica{font-size:12px;color:var(--t3);margin-top:6px}
.vazio{padding:56px 20px;text-align:center;color:var(--t2)}

/* Celular */
.abas{display:none}.gaveta-fundo{display:none}
@media (max-width:1100px){.aula{grid-template-columns:1fr}.modulos{position:static}.calendario{grid-template-columns:1fr}}
@media (max-width:860px){
  .app{grid-template-columns:1fr}
  .lateral{position:fixed;left:0;top:0;bottom:0;width:280px;height:100%;transform:translateX(-105%);transition:transform .35s var(--suave);z-index:40;box-shadow:var(--sombra-pop)}
  html.gaveta-aberta .lateral{transform:none}html.gaveta-aberta .gaveta-fundo{display:block;position:fixed;inset:0;z-index:35;background:rgba(0,0,0,.45);backdrop-filter:blur(3px)}
  .lateral .encolher{display:none}html.menu-encolhido .marca .logo,html.menu-encolhido .secao-menu,html.menu-encolhido .item span,html.menu-encolhido .lateral .quem{display:revert}html.menu-encolhido .pe-acoes{display:flex}
  html.menu-encolhido .marca .logo{display:revert}html.menu-encolhido .lateral a.item{justify-content:flex-start;padding:0 13px}html.menu-encolhido .pe-menu .rot{display:revert}html.menu-encolhido .item-pe{justify-content:flex-start;padding:0 13px}
  .topo-cel{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 16px;background:#0A0A0A}
  .topo-cel .acoes-topo{gap:6px}.topo-cel .acoes-topo .ico-pe,.topo-cel>.ico-pe{width:34px;height:34px;border-color:rgba(255,255,255,.16);color:#CFCFCF;background:transparent!important}
  .topo-cel .idioma-sel>summary{width:34px;height:34px;padding:0;border-color:rgba(255,255,255,.16);color:#CFCFCF;background:transparent}
  .barra-topo{display:none}.topo-cel .perfil .quem,.topo-cel .perfil>summary>.ico{display:none}.topo-cel .perfil>summary{height:34px;padding:0;border:0;background:none}.topo-cel .perfil .avatar{width:34px;height:34px}.perfil-menu{width:min(270px,calc(100vw - 32px))}  .topo-cel img{height:40px;width:auto;display:block;margin-left:-8px}.topo-cel .acoes{display:flex;gap:6px}
  .topo-cel .ico-pe{display:grid;place-items:center;width:38px;height:38px;min-height:0;padding:0;border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#CFCFCF;background:transparent!important}.topo-cel .ico-pe>span{display:grid;place-items:center;line-height:0}
  main{padding:16px 16px calc(var(--safe-b) + 96px)}h1{font-size:22px}
  .banners{height:210px;margin:0}.slide-b{align-items:flex-end}.slide-b img{width:100%;height:100%;-webkit-mask-image:none;mask-image:none}
  .slide-b::before{background:linear-gradient(180deg,rgba(10,10,10,0) 15%,rgba(10,10,10,.92) 85%)}.slide-b.sem-img::after{top:24%;right:50%;transform:translate(50%,-50%);width:46%}
  .slide-b .txt{padding:16px 18px 30px;gap:4px}.slide-b h1{font-size:23px}.slide-b p{font-size:13px}.slide-b .rot{font-size:10px}.pontos{bottom:18px}
  .fileira.cursos,.fileira.ferr,.fileira.packs{grid-auto-columns:calc((100% - 18px)*.62)}.fileira.artes{grid-auto-columns:140px}
  .grade-cursos{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 12px}.poster{padding:14px}.poster b{font-size:15.5px}.poster .apoio{font-size:11.5px}
  .grade-artes{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px}.grade-packs,.grade-ferramentas{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .secao-cab h2{font-size:21px}.secao{margin-top:28px;padding-top:24px}
  .kits,.lista-carrossel{grid-template-columns:1fr}.carrossel .faixa img{height:220px}.fileira{padding:12px 16px 26px;margin:-12px -16px -10px}.linha-acoes .botoes{margin-left:0}
  .busca-campo{width:100%}
  .grade-mes .d{min-height:48px;padding:6px;font-size:12px}.grade-mes .d .ev{display:none}.grade-mes .d.tem::after{content:"";position:absolute;bottom:7px;left:50%;width:6px;height:6px;margin-left:-3px;transform:rotate(45deg);background:#B38600}
  .janela-arte{grid-template-columns:1fr}.janela-arte .previa img{max-height:50vh}
  .abas{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:12px;right:12px;bottom:var(--safe-b);z-index:30;height:64px;padding:6px;border-radius:16px;
    background:rgba(10,10,10,.85);backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);border:1px solid rgba(255,255,255,.08);box-shadow:0 16px 36px -12px rgba(0,0,0,.5)}
  .abas a{display:grid;justify-items:center;align-content:center;gap:3px;border-radius:11px;color:#9A9A9A;text-decoration:none;font-size:10.5px;font-weight:500;transition:color .2s,background .2s}
  .abas a.on{color:#fff;font-weight:600;background:rgba(255,255,255,.1)}.abas a.on .ico{color:var(--ouro)}
  input{font-size:16px!important}
}
/* Grades das páginas internas no mesmo ritmo das fileiras do Início (5 por linha, 4 até 1300px, 3 até 1100px) */
.grade-cursos,.grade-packs,.grade-ferramentas{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:24px 18px}
@media (max-width:1300px){.grade-cursos,.grade-packs,.grade-ferramentas{grid-template-columns:repeat(4,minmax(0,1fr))!important}}
@media (max-width:1100px){.grade-cursos,.grade-packs,.grade-ferramentas{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
/* Título da página alinhado com os botões do topo, sem passar por baixo deles */
.barra-topo{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:6px;height:48px;padding:0 36px;border-bottom:1px solid var(--borda);background:color-mix(in srgb,var(--bg) 74%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.5);backdrop-filter:blur(18px) saturate(1.5)}
.barra-topo .acoes-topo{margin-left:auto}.barra-topo .ico-pe,.barra-topo .idioma-sel>summary{width:30px;height:30px;border-radius:8px}.barra-topo .ico-pe .ico{width:16px;height:16px}.barra-topo .perfil{margin:0 2px 0 4px}
.perfil{position:relative;margin-left:6px}.perfil>summary{display:flex;align-items:center;gap:10px;height:32px;padding:0 8px 0 3px;border:1px solid var(--borda2);border-radius:8px;background:var(--sup);list-style:none;cursor:pointer;transition:border-color .2s}
.perfil>summary::-webkit-details-marker{display:none}.perfil>summary:hover,.perfil[open]>summary{border-color:var(--ouro)}.perfil>summary>.ico{color:var(--t3);transition:transform .2s}.perfil[open]>summary>.ico{transform:rotate(180deg)}
.perfil .avatar{display:grid;place-items:center;width:24px;height:24px;border-radius:999px;color:var(--t2)!important;background:var(--s2)!important;font-size:11px!important;color:var(--ouro-ink);background:var(--grad);font-size:13px;font-weight:700}
.perfil .quem{display:grid;line-height:1.25;white-space:nowrap}.perfil .quem small{font-size:13px;color:var(--t2)}.perfil .quem b{display:inline;color:var(--ink);font-size:13px;font-weight:500}.perfil .plano{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#E07000}
.perfil-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:31;width:270px;padding:6px;border:1px solid var(--borda);border-radius:14px;background:var(--sup);box-shadow:var(--sombra-pop);animation:subir .2s var(--suave)}
.perfil-cab{display:grid;gap:2px;padding:10px 12px 12px;margin-bottom:4px;border-bottom:1px solid var(--borda)}.perfil-cab small{color:var(--t3);font-size:12px}.perfil-cab b{font-size:15px}.perfil-cab .selo{justify-self:start;margin-top:8px}
.perfil-menu a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;color:var(--ink);font-size:14px;text-decoration:none}.perfil-menu a:hover{background:var(--s2)}
.perfil-menu a small{margin-left:auto;min-width:22px;padding:1px 7px;border-radius:999px;background:var(--s2);color:var(--t2);font-size:11.5px;text-align:center}.perfil-menu a small:empty{display:none}
.perfil-menu a.sair{margin-top:4px;border-top:1px solid var(--borda);border-radius:0 0 9px 9px;color:var(--erro)}
[data-theme="dark"] .perfil .plano{color:var(--ouro)}
.trilha{flex:1;min-width:0;display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t3);white-space:nowrap;overflow:hidden}
.trilha a{color:var(--t3);text-decoration:none}.trilha a:hover{color:var(--ink)}.trilha b{color:var(--ink);font-weight:500;overflow:hidden;text-overflow:ellipsis}.trilha .ico{flex:none;opacity:.6}
.titulo-pag{min-height:42px}
.titulo-pag .acoes{align-items:center}.titulo-pag .acoes .busca-campo{width:280px}
.aviso-topo{display:flex;align-items:center;gap:12px;padding:6px 8px 6px 14px;border:1px solid var(--borda);border-radius:999px;background:var(--sup);font-size:13.5px;font-weight:500;cursor:pointer}
/* Ferramentas no aparelho: área de soltar a imagem, andamento e resultado */
.ferr-app{max-width:1180px}
.ferr-topo{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:20px;align-items:stretch}.ferr-topo:not(.fixo):has([data-soltar][hidden]){display:none}
/* Removedor: o quadrado de soltar vira o andamento e depois o comparador; o guia fica sempre ao lado */
.palco{display:grid;min-width:0}.palco>.trabalhando{min-height:420px;align-content:center}
.comparador{position:relative;width:100%;height:min(560px,70vh);border-radius:var(--raio-g);overflow:hidden;border:1px solid var(--borda);background:repeating-conic-gradient(#E9E9E9 0 25%,#FFFFFF 0 50%) 0 0/22px 22px;touch-action:pan-y;user-select:none}
.comparador img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none}
.cmp-antes{clip-path:inset(0 calc(100% - var(--corte)) 0 0)}
.cmp-linha{position:absolute;top:0;bottom:0;left:var(--corte);width:3px;margin-left:-1.5px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 0 12px rgba(0,0,0,.35);pointer-events:none}
.cmp-alca{position:absolute;top:50%;left:50%;display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 6px rgba(255,150,30,.25),0 6px 16px rgba(0,0,0,.35)}.cmp-alca .ico{stroke-width:2.6}
.cmp-rot{position:absolute;top:12px;padding:4px 10px;border-radius:7px;color:#fff;background:rgba(10,10,10,.6);backdrop-filter:blur(8px);font-size:12px;font-weight:600;pointer-events:none}.cmp-rot.esq{left:12px}.cmp-rot.dir{right:12px}
.comparador input[type=range]{position:absolute;inset:0;width:100%;height:100%;margin:0;padding:0;opacity:0;cursor:ew-resize;-webkit-appearance:none;appearance:none}
.comparador input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:60px;height:100%}
.comparador input[type=range]::-moz-range-thumb{width:60px;height:100%;border:0}
.palco .botoes{margin-top:16px}
@media (max-width:860px){.comparador{height:min(460px,62vh)}.palco>.trabalhando{min-height:260px}.palco .botoes>*{flex:1 1 auto}}
.soltar{display:grid;align-content:center;justify-items:center;gap:10px;min-height:420px;padding:40px 24px;border:2px dashed var(--borda2);border-radius:var(--raio-g);background:radial-gradient(70% 60% at 50% 40%,rgba(255,150,30,.10),transparent 70%),var(--s2);text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.soltar .botao{margin-top:10px;pointer-events:none}
.ferr-guia{display:grid;align-content:start;gap:16px;padding:14px;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup);box-shadow:var(--sombra)}
.ferr-guia>img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--raio)}
.passos{list-style:none;margin:0;padding:0 4px;display:grid;gap:14px}.passos li{display:flex;gap:12px;align-items:flex-start}
.passos .n{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);font-size:13px;font-weight:700}
.passos b{display:block;font-size:14.5px}.passos small{display:block;color:var(--t3);font-size:13px;line-height:1.45}
.privado{display:flex;align-items:center;gap:8px;margin:0;padding:10px 12px;border-radius:10px;color:var(--t2);background:var(--s2);font-size:12.5px}
.soltar:hover,.soltar.sobre{border-color:var(--ouro);background:var(--chip)}
.soltar b{font-size:16px}.soltar small{color:var(--t3)}
.soltar-ic{display:grid;place-items:center;width:72px;height:72px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 10px rgba(255,150,30,.16)}.soltar b{font-size:18px}
.trabalhando{display:grid;justify-items:center;gap:12px;padding:56px 24px;border:1px solid var(--borda);border-radius:var(--raio-g);text-align:center}
.trabalhando small{color:var(--t3);max-width:46ch}
.giro{width:34px;height:34px;border-radius:999px;border:3px solid var(--borda2);border-top-color:var(--ouro);animation:girar .9s linear infinite}@keyframes girar{to{transform:rotate(360deg)}}
.barra-c{width:min(320px,80%);height:6px;border-radius:999px;background:var(--s3);overflow:hidden}.barra-c>span{display:block;height:100%;width:0;background:var(--grad);transition:width .2s}
.comparar{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.comparar figure{margin:0;display:grid;gap:8px}.comparar img{display:block;width:100%;max-height:60vh;object-fit:contain;border-radius:var(--raio);background:var(--s2)}
.comparar figcaption{font-size:13px;color:var(--t3);text-align:center}
.xadrez img{background:repeating-conic-gradient(#E9E9E9 0 25%,#FFFFFF 0 50%) 0 0/22px 22px}
.ferr-app .botoes{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
.fat-cab{display:flex;align-items:center;gap:16px;margin-bottom:16px}.fat-cab>div{display:grid}.fat-cab small{color:var(--t3)}
.fat-qtd{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:13.5px}.fat-qtd select{height:38px;padding:0 10px;border:1px solid var(--borda2);border-radius:10px;background:var(--sup);color:var(--ink);font:inherit}
.fat-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
.fat-dobra{position:relative;display:block;border-radius:var(--raio);overflow:hidden;border:1px solid var(--borda);background:var(--s2)}
.fat-dobra img{display:block;width:100%;height:auto}
.fat-dobra .n{position:absolute;left:8px;top:8px;min-width:24px;height:24px;display:grid;place-items:center;border-radius:999px;color:#fff;background:rgba(0,0,0,.55);font-size:12px;font-weight:600}
.fat-dobra .baixar-d{position:absolute;right:8px;bottom:8px;display:grid;place-items:center;width:32px;height:32px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);opacity:0;transition:opacity .2s}
.fat-dobra:hover .baixar-d{opacity:1}@media (hover:none){.fat-dobra .baixar-d{opacity:1}}
.aula{grid-template-columns:minmax(0,1040px) minmax(340px,1fr)}
.aula .aula-titulo{margin:18px 0 0}
.player-capa .play,.video .play{width:66px;height:66px;box-shadow:0 0 0 8px rgba(255,150,30,.18)}
/* Carrossel: bolinhas embaixo mostram que dá para arrastar para o lado */
.faixa-caixa{position:relative;min-width:0}
.pontos-c{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);display:flex;gap:5px;padding:5px 8px;border-radius:999px;background:rgba(0,0,0,.32);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);pointer-events:none}
.pontos-c i{width:6px;height:6px;border-radius:999px;background:rgba(255,255,255,.45);transition:background .2s,width .2s}
.pontos-c i.on{width:14px;background:#fff}
/* Pack: temas à esquerda e busca sempre à direita */
.filtros .busca-campo{margin-left:auto}
.lista-pack{scroll-margin-top:24px}
.lista-carrossel,.kits{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:22px 18px}
.grade-projecao{grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 18px}
.carrossel,.kit{padding:8px 8px 10px;gap:10px;transition:transform .4s var(--suave),box-shadow .4s var(--suave),border-color .3s}
.carrossel:hover,.kit:hover{transform:translateY(-4px);border-color:var(--borda-hover);box-shadow:0 24px 40px -22px rgba(0,0,0,.45)}
.carrossel .faixa{aspect-ratio:2.5/1.333;overflow-x:auto;overflow-y:hidden;scroll-snap-type:none;scrollbar-width:none;cursor:grab;border-radius:8px}
.carrossel .faixa::-webkit-scrollbar{display:none}
.carrossel .faixa img{height:100%;width:auto;max-width:none;pointer-events:none;user-select:none}
[data-arrastar].arrastando{cursor:grabbing}
.kit .abrir-kit{display:block;width:100%;padding:0;border:0;border-radius:8px;overflow:hidden;background:var(--s3);cursor:zoom-in}
.kit img{aspect-ratio:16/9}
.linha-acoes{flex-wrap:nowrap;padding:0 2px}
.linha-acoes>b{flex:1;min-width:0;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.linha-acoes .botoes{margin:0 0 0 auto;flex:none;display:flex;align-items:center;gap:6px}
.linha-acoes .icone-btn{width:36px;height:36px}
.slide-proj{display:grid;place-items:center;aspect-ratio:16/9;padding:16px;border-radius:8px;text-align:center;color:#fff;font-weight:600;font-size:17px;line-height:1.25;background:radial-gradient(80% 90% at 50% 100%,rgba(255,150,30,.35),transparent 70%),linear-gradient(160deg,#1C2340,#0A0A0A)}
.tela-proj .linha-acoes{min-height:36px}
.paginacao{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:34px 0 8px}
.paginacao a,.paginacao span{display:grid;place-items:center;min-width:40px;height:40px;padding:0 6px;border:1px solid var(--borda2);border-radius:10px;color:var(--ink);background:var(--sup);font-weight:500;font-size:14px;text-decoration:none;transition:border-color .2s,background .2s}
.paginacao a:hover{border-color:var(--ouro)}
.paginacao span.on{color:var(--ouro-ink);background:var(--grad);border-color:var(--ouro);font-weight:600}
.paginacao .reticencias{border:0;background:none;min-width:20px;color:var(--t3)}
.paginacao .seta.off{opacity:.35}

/* Botões das ferramentas, com as cores de cada uma: Canva abre (seta), Photoshop baixa */
.botao.canva,[data-theme="dark"] .botao.canva{color:#fff;background:linear-gradient(135deg,#00C4CC,#5A32FA 60%,#7D2AE8);box-shadow:0 10px 22px -12px rgba(90,50,250,.8)}
.botao.ps,[data-theme="dark"] .botao.ps{color:#fff;background:linear-gradient(180deg,#1E5A8E,#164873);border:1px solid rgba(49,168,255,.4);box-shadow:0 10px 22px -12px rgba(22,72,115,.8)}
.botao.canva:hover,.botao.ps:hover{filter:brightness(1.08)}
.botao.pequeno.canva,.botao.pequeno.ps{min-height:36px;padding:0 12px;gap:6px;font-size:13px}
/* Kit de eventos: o mosaico inteiro à mostra, sem corte */
.kits .kit img{aspect-ratio:auto;height:auto;object-fit:contain}
/* Cartazes: 7 por linha (4 até 1300px, 2 no celular), assim as 28 artes da página fecham todas as linhas */
.grade-artes{grid-template-columns:repeat(7,minmax(0,1fr))}
@media (max-width:1300px){.grade-artes{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:860px){.grade-artes{grid-template-columns:repeat(2,minmax(0,1fr))}}
/* Aula: título em cima do vídeo; a capa mostra a parte de cima da foto (onde está a pessoa) */
.aula .aula-titulo{font-size:22px}
.player-capa{background-position:center 13%}
/* Comece por aqui: aulas em blocos (miniatura + título), vídeo numa janela por cima, lupa que procura em tudo */
.grade-dicas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 18px}
@media (max-width:1300px){.grade-dicas{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (max-width:860px){.grade-dicas{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 12px}}
.dica{display:grid;grid-template-rows:auto 1fr;grid-template-columns:minmax(0,1fr);justify-content:stretch;align-content:start;align-items:stretch;width:100%;min-height:0;padding:0;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)!important;color:var(--ink);text-align:left;font:inherit;font-weight:400;overflow:hidden;box-shadow:var(--sombra);cursor:pointer;transition:transform .4s var(--suave),box-shadow .4s var(--suave),border-color .3s}
.dica:hover{transform:translateY(-4px)!important;border-color:var(--borda-hover);box-shadow:0 24px 40px -22px rgba(0,0,0,.45)}
.dica-img{position:relative;display:block;width:100%;aspect-ratio:16/9;overflow:hidden;background:#111}.dica-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s var(--suave)}.dica:hover .dica-img img{transform:scale(1.05)}
.dica-play{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:999px;color:var(--ouro-ink);background:var(--grad);box-shadow:0 0 0 6px rgba(255,150,30,.2)}
.dica-tempo{position:absolute;right:8px;bottom:8px;padding:2px 7px;border-radius:6px;color:#fff;background:rgba(10,10,10,.7);font-size:11.5px;font-weight:500}
.dica-txt{display:grid;gap:3px;min-width:0;white-space:normal;align-content:start;padding:12px 14px 14px}.dica-txt b{font-size:14.5px;font-weight:600;line-height:1.3}.dica-txt small{color:var(--t3);font-size:12.5px}
.dica.em-breve{cursor:default}.dica.em-breve:hover{transform:none!important}.dica.em-breve .dica-img img{filter:grayscale(1) brightness(.6)}.dica.em-breve .dica-play{color:#fff;background:rgba(10,10,10,.6);box-shadow:none}
.janela-dica{width:min(1080px,calc(100vw - 32px))}.janela-dica-cab{display:flex;align-items:center;gap:12px;padding:12px 12px 12px 20px}.janela-dica-cab b{flex:1;font-size:16px}
.janela-dica-video{position:relative;aspect-ratio:16/9;background:#000}.janela-dica-video video{position:absolute;inset:0;width:100%;height:100%;border:0}.janela-dica-video .player{position:absolute;inset:0;border-radius:0;aspect-ratio:auto}
.player-local video{position:absolute;inset:0;width:100%;height:100%;background:#000}
.video.sem-video{position:relative;isolation:isolate}.video.sem-video::before{content:"";position:absolute;inset:0;z-index:-1;background:rgba(10,10,10,.72)}
.sem-video-txt{display:grid;justify-items:center;gap:8px;color:#fff;text-align:center;padding:20px}.sem-video-txt .ico{color:var(--ouro)}.sem-video-txt small{color:#CFCFCF}
.licao .n .ico{display:none}.licao.feita .n .ico{display:block}.licao.feita .n .num{display:none}
@media (max-width:1100px){.lista-carrossel,.kits{grid-template-columns:repeat(2,minmax(0,1fr))!important}.grade-projecao{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:860px){
  .grade-cursos,.grade-ferramentas,.grade-packs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px 12px}
  .lista-carrossel,.kits{grid-template-columns:1fr!important}.grade-projecao{grid-template-columns:repeat(2,minmax(0,1fr))}
  .titulo-pag{margin-top:0}.trilha{display:none}.titulo-pag .acoes{margin-left:0;width:100%}.titulo-pag .acoes .busca-campo{width:100%}.filtros .busca-campo{margin-left:0}.aula{grid-template-columns:1fr}.comparar,.ferr-topo{grid-template-columns:1fr}.soltar{min-height:260px}
}
/* Celular: uma barra só (logo, avisos, perfil); preferências ficam no "Menu" */
@media (max-width:860px){
  .barra-topo{display:none}
  .topo-cel{padding:10px 14px;gap:8px}
  .marca-cel{display:flex;align-items:center;gap:9px;min-height:0;padding:4px 6px 4px 0;border:0;border-radius:10px;background:transparent!important;color:#fff;cursor:pointer;text-decoration:none;transform:none!important}.marca-cel img{display:block;height:30px;width:auto;margin:0}
  .marca-cel .menu-ic{display:grid;place-items:center;width:30px;height:30px;margin-right:2px;border-radius:8px;color:#CFCFCF;background:rgba(255,255,255,.07)}.marca-cel:active .menu-ic{background:rgba(255,255,255,.14)}
  .topo-cel>.ico-pe,.topo-cel .perfil>summary{width:36px;height:36px;padding:0;border:1px solid rgba(255,255,255,.16);border-radius:10px;background:transparent!important;color:#CFCFCF;display:grid;place-items:center}
  .topo-cel .perfil .avatar{width:auto;height:auto;border-radius:0;background:none!important;color:#CFCFCF!important}
  .topo-cel .perfil{margin:0}
  .ver-tudo{white-space:nowrap;flex:none}
  .secao-cab h2{font-size:20px}
}
/* Perfil: só o bonequinho, no formato do sino */
.barra-topo .perfil>summary{width:30px;height:30px;padding:0;gap:0;justify-content:center;border-radius:8px}
.barra-topo .perfil .avatar{width:auto;height:auto;border-radius:0;background:none!important;color:var(--t2)!important}
.barra-topo .perfil>summary:hover .avatar,.barra-topo .perfil[open] .avatar{color:var(--ink)!important}
/* Pé do menu: só os ícones, lado a lado (encolhido: um embaixo do outro); o nome aparece na dica */
.pe-menu{display:flex;align-items:center;gap:6px;padding:12px 14px 16px}.pe-menu .idioma-lat>summary.item-pe>.ico{width:12px;height:12px}
.pe-menu .item-pe,.pe-menu .idioma-lat>summary.item-pe{width:auto;height:34px;min-height:0;padding:0 9px;gap:5px;justify-content:center;flex:none;border:1px solid rgba(255,255,255,.14);border-radius:9px;color:#CFCFCF;font-size:12px}
.pe-menu .item-pe:hover,.pe-menu .idioma-lat>summary.item-pe:hover,.pe-menu .idioma-lat[open]>summary.item-pe{border-color:rgba(255,255,255,.4);color:#fff}
.pe-menu [data-tema].item-pe{width:34px;padding:0}
.pe-menu .item-pe>span{gap:0}
.pe-menu .idioma-lat>summary.item-pe>.ico{opacity:.7;transition:transform .2s}.pe-menu .idioma-lat[open]>summary.item-pe>.ico{transform:rotate(180deg)}
.pe-menu .idioma-lat>summary.item-pe svg:first-child{width:17px;height:12px}
html.menu-encolhido .pe-menu .rot,html.menu-encolhido .pe-menu .idioma-lat>summary>.ico{display:none}
html.menu-encolhido .pe-menu .item-pe,html.menu-encolhido .pe-menu .idioma-lat>summary.item-pe{width:34px;padding:0}
html.menu-encolhido .pe-menu{flex-direction:column;padding:12px 0 16px}
@media (max-width:860px){html.menu-encolhido .pe-menu{flex-direction:row;padding:12px 14px 16px}html.menu-encolhido .pe-menu .rot,html.menu-encolhido .pe-menu .idioma-lat>summary>.ico{display:revert}html.menu-encolhido .pe-menu .item-pe:not([data-tema]),html.menu-encolhido .pe-menu .idioma-lat>summary.item-pe{width:auto;padding:0 11px}}
.sem-titulo{height:2px}
/* Celular: barra de cima de vidro (como no computador) e banner com o escurecido vindo do lado */
@media (max-width:860px){
  .topo-cel{background:color-mix(in srgb,var(--bg) 78%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.5);backdrop-filter:blur(18px) saturate(1.5);border-bottom:1px solid var(--borda)}
  .marca-cel img{height:28px}
  .topo-cel>.ico-pe,.topo-cel .perfil>summary{border-color:var(--borda2);color:var(--t2);background:var(--sup)!important}
  .topo-cel .perfil .avatar{color:var(--t2)!important}
  .slide-b{align-items:flex-end}
  .slide-b::before{background:linear-gradient(90deg,rgba(10,10,10,.92) 0%,rgba(10,10,10,.7) 38%,rgba(10,10,10,.15) 70%,rgba(10,10,10,.1))}
  .slide-b .txt{max-width:64%;padding:18px 16px 40px 20px}
  .slide-b p{display:none}
  .slide-b h1{font-size:22px}
  .botao-b{height:34px;padding:0 13px;font-size:12.5px;margin-top:6px;white-space:nowrap}
  .slide-b h1{font-size:20px!important}
  .slide-b .txt{max-width:72%!important;gap:4px}
  .slide-b img{left:auto;right:calc(-1 * var(--desloca, 0px));width:auto;max-width:none;height:100%;object-fit:fill;-webkit-mask-image:linear-gradient(90deg,transparent 28%,#000 52%);mask-image:linear-gradient(90deg,transparent 28%,#000 52%)}
  .slide-b::before{background:linear-gradient(90deg,rgba(10,10,10,.95) 22%,rgba(10,10,10,.55) 45%,rgba(10,10,10,.12) 72%,rgba(10,10,10,.1))}
  .slide-b{background:#0A0A0A}
}
/* Barra de cima: vidro preto (computador e celular), texto e botões claros */
.barra-topo,.topo-cel{background:rgba(10,10,10,.93)!important;border-bottom:1px solid rgba(255,255,255,.08)!important;-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4)}
.barra-topo .trilha,.barra-topo .trilha a{color:#9A9A9A}.barra-topo .trilha a:hover,.barra-topo .trilha b{color:#fff}
.barra-topo>.ico-pe,.barra-topo .perfil>summary,.topo-cel>.ico-pe,.topo-cel .perfil>summary{border-color:rgba(255,255,255,.16)!important;color:#CFCFCF!important;background:transparent!important}
.barra-topo .perfil .avatar,.topo-cel .perfil .avatar{color:#CFCFCF!important}
.barra-topo>.ico-pe:hover,.barra-topo .perfil>summary:hover,.barra-topo .perfil[open]>summary{border-color:rgba(255,255,255,.45)!important;color:#fff!important}
.barra-topo .perfil>summary:hover .avatar,.barra-topo .perfil[open] .avatar{color:#fff!important}
.topo-cel .marca-cel .so-claro{display:none!important}.topo-cel .marca-cel .so-escuro{display:block!important}
/* Banner sem botão (boas-vindas): o lugar do botão fica vago, para o texto ficar na mesma altura dos outros */
.botao-b.vago{display:none}@media (max-width:860px){.botao-b.vago{display:inline-flex;visibility:hidden}}
/* IA: o resultado em cima (nas fotos, o "Antes" pequeno no canto) e o botão de copiar o prompt embaixo */
.grade-ia{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px 18px}
@media (max-width:1300px){.grade-ia{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:1100px){.grade-ia{grid-template-columns:repeat(3,minmax(0,1fr))}}
.ia-item{display:grid;grid-template-rows:auto 1fr;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);overflow:hidden;box-shadow:var(--sombra);transition:transform .4s var(--suave),box-shadow .4s var(--suave),border-color .3s}
.ia-item:hover{transform:translateY(-4px);border-color:var(--borda-hover);box-shadow:0 24px 40px -22px rgba(0,0,0,.45)}
.ia-img{position:relative;overflow:hidden;background:#2A2A2C}.ia-img>img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s var(--suave)}.ia-item:hover .ia-img>img{transform:scale(1.04)}
.ia-antes{position:absolute;left:12px;bottom:12px;width:30%;margin:0;border:2px solid #fff;border-radius:9px;overflow:hidden;box-shadow:0 10px 24px -8px rgba(0,0,0,.6)}
.ia-antes img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover}
.ia-antes figcaption{position:absolute;left:0;right:0;bottom:0;padding:2px 0;color:#fff;background:rgba(10,10,10,.65);font-size:10.5px;font-weight:600;text-align:center;letter-spacing:.04em}
.ia-rodape{display:grid;gap:10px;align-content:space-between;padding:14px 14px 16px}.ia-rodape b{font-size:15px;font-weight:600;line-height:1.3}.ia-rodape .botao{width:100%}
.ia-rodape .botao.copiado{color:#fff;background:var(--ok);box-shadow:none}
.aviso-copia{position:fixed;left:50%;bottom:32px;z-index:50;transform:translateX(-50%);max-width:calc(100vw - 32px);padding:12px 18px;border-radius:12px;color:#fff;background:rgba(10,10,10,.92);box-shadow:var(--sombra-pop);font-size:13.5px;font-weight:500;text-align:center;animation:subir .3s var(--suave)}
@media (max-width:860px){.aviso-copia{bottom:calc(var(--safe-b) + 84px)}}
/* Selo "Atualização do mês": no canto de cima à esquerda da imagem (o coração fica à direita) */
.moldura,.ia-img,.faixa-caixa,.midia{position:relative}
.selo-mes{position:absolute;top:8px;left:8px;z-index:3;display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;color:#fff;background:rgba(37,99,235,.78);border:1px solid rgba(147,197,253,.5);-webkit-backdrop-filter:blur(10px) saturate(1.3);backdrop-filter:blur(10px) saturate(1.3);font-size:10.5px;font-weight:400;line-height:16px;letter-spacing:.02em;white-space:nowrap;pointer-events:none}
.chips a.destaque{border-color:#3B82F6}.chips a.destaque:not(.on){color:var(--ink)}.chips a.destaque::before{content:"";width:7px;height:7px;border-radius:999px;background:#3B82F6;box-shadow:0 0 8px rgba(59,130,246,.8)}
/* Capa do curso: a foto vem sem texto e o título é escrito por cima (traduz junto); mesmo desenho da capa antiga */
.curso-c .cartao-img{container-type:inline-size}
.capa-txt{position:absolute;left:6%;right:6%;bottom:9.4%;z-index:1;display:grid;justify-items:center;gap:1.9cqw;text-align:center;pointer-events:none;text-shadow:0 1cqw 3cqw rgba(0,0,0,.7)}
.capa-txt small{color:var(--ouro);font-size:4.4cqw;font-weight:600;letter-spacing:.26em;line-height:1.1;text-transform:uppercase;white-space:nowrap}
.capa-txt b{color:#FFF8E7;font-size:11.5cqw;font-weight:800;letter-spacing:.02em;line-height:1;text-transform:uppercase;white-space:nowrap}
/* Avisos: instalar o app e ligar as notificações, e a lista do que chegou de novo */
.avisos-cartoes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:980px}
.aviso-cartao{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;align-items:start;padding:22px;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup);box-shadow:var(--sombra)}
.aviso-cartao .ic{grid-row:span 4;display:grid;place-items:center;width:48px;height:48px;border-radius:12px;color:var(--ouro-ink);background:var(--grad)}
.aviso-cartao b{font-size:16px}.aviso-cartao p{color:var(--t2);font-size:13.5px;line-height:1.5}.aviso-cartao .botao{justify-self:start;margin-top:8px}
.aviso-cartao small{grid-column:2;color:var(--t3);font-size:12.5px}.aviso-cartao .estado{display:inline-flex;align-items:center;gap:6px;color:var(--ok);font-weight:600}
.lista-avisos{display:grid;gap:10px;max-width:980px}
.aviso-item{display:flex;gap:14px;align-items:flex-start;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);color:inherit;text-decoration:none}.aviso-item:hover{border-color:var(--borda-hover)}
.aviso-item .ponto{flex:none;width:9px;height:9px;margin-top:7px;border-radius:999px;background:var(--grad);box-shadow:0 0 8px rgba(255,150,30,.7)}
.aviso-item div{display:grid;gap:2px}.aviso-item small{color:var(--t3);font-size:12.5px}
@media (max-width:860px){.avisos-cartoes{grid-template-columns:1fr}}
/* Imagens: enquanto carregam, o lugar fica com um brilho suave; depois a imagem aparece aos poucos (sem pipocar) */
@keyframes carregandoImg{from{background-position:-200% 0}to{background-position:200% 0}}
.moldura,.ia-img,.faixa,.abrir-kit,.cartao-img:not(.ilustrado){background-color:var(--s2);background-image:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);background-size:200% 100%;animation:carregandoImg 1.4s linear infinite}
[data-theme="dark"] .moldura,[data-theme="dark"] .ia-img,[data-theme="dark"] .faixa,[data-theme="dark"] .abrir-kit,[data-theme="dark"] .cartao-img{background-image:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%)}
.moldura.pronta,.ia-img.pronta,.faixa.pronta,.abrir-kit.pronta,.cartao-img.pronta{animation:none;background-image:none}
main img{transition:opacity .35s ease-out}main img.esperando{opacity:0}
/* o lugar da imagem já tem o tamanho certo antes de ela chegar (nada pula quando carrega) */
.abrir{grid-template-columns:minmax(0,1fr)}.arte .moldura{width:100%;aspect-ratio:4/5}.arte .moldura img{height:100%}.kits .abrir-kit:not(.pronta){aspect-ratio:16/9}
.lista-pack,#lista-ia,#cal-mes{transition:opacity .18s ease-out}
.lista-pack.carregando,#lista-ia.carregando,#cal-mes.carregando{opacity:.35}
@media (prefers-reduced-motion:reduce){main img{transition:none}.moldura,.ia-img,.faixa,.abrir-kit,.cartao-img{animation:none}}
/* Aula: botões lado a lado, com texto curto */
.aula .botoes{flex-wrap:nowrap}.aula .botoes>*{min-height:40px;padding:0 16px;font-size:13.5px}
@media (max-width:860px){
  .aula .botoes{margin:14px 0}.aula .botoes>*{flex:1 1 0;padding:0 10px}
  /* Packs: dois por linha, como ferramentas e cursos */
  .grade-packs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px 12px}
  /* Dentro do pack: nome em cima e os botões Photoshop e Canva embaixo, tudo no meio; projeção uma por linha */
  .linha-acoes{flex-direction:column;align-items:center;gap:10px;text-align:center}
  .linha-acoes>b{width:100%;white-space:normal}
  .linha-acoes .botoes{margin:0;justify-content:center}
  .grade-projecao{grid-template-columns:1fr}
  .grade-ia{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px}.ia-rodape{padding:10px 10px 12px}.ia-rodape b{font-size:13.5px}.ia-rodape .botao{min-height:38px;padding:0 10px;font-size:13px;gap:6px}
  .ia-antes{width:34%;left:8px;bottom:8px}
  /* Ícone da ferramenta no pôster do curso: 20% menor no celular */
  .cartao-img img.selo-ferramenta{top:10px;right:10px;width:37px;height:37px}
}
/* Janela da arte compacta: imagem em cima com o X no canto, título e os dois botões lado a lado */
dialog.janela:has(.janela-arte){width:min(440px,calc(100vw - 28px))}
.janela-arte{display:flex!important;flex-direction:column}
.janela-arte .previa{position:relative;padding:14px 14px 0;background:transparent}
.janela-arte .previa img{width:100%;max-height:min(62vh,560px);object-fit:contain;border-radius:10px;background:var(--s2)}
.fechar-x{position:absolute;top:24px;right:24px;display:grid;place-items:center;width:36px;height:36px;min-height:0;padding:0;border:1px solid rgba(255,255,255,.25);border-radius:999px;color:#fff;background:rgba(10,10,10,.55)!important;backdrop-filter:blur(8px);transform:none!important}
.fechar-x:hover{background:rgba(10,10,10,.8)!important}.fechar-x:focus{outline:none}.fechar-x:focus-visible{outline:2px solid #fff;outline-offset:2px}
.janela-arte .lado{gap:2px;padding:12px 16px 16px}
.janela-arte h2{font-size:17px;margin:0 0 10px}
.acoes-arte{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.acoes-arte .botao{width:100%;min-height:42px;padding:0 12px;gap:7px}
`;

const SCRIPT = `<script>
document.addEventListener('click',function(e){var b=e.target.closest('[data-tema]');if(!b)return;var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('cdr:tema',n)}catch(x){}});
document.addEventListener('click',function(e){var d=document.documentElement;
  if(e.target.closest('[data-encolher]')){var c=d.classList.toggle('menu-encolhido');try{localStorage.setItem('cdr:menu',c?'encolhido':'aberto')}catch(x){}}
  if(e.target.closest('[data-gaveta]')){e.preventDefault();d.classList.add('gaveta-aberta')}
  if(e.target.closest('.gaveta-fundo')||e.target.closest('.lateral a.item'))d.classList.remove('gaveta-aberta')});
document.addEventListener('click',function(e){var a=e.target.closest('[data-abrir]');if(a){if(a.closest('summary'))e.preventDefault();var j=document.getElementById(a.dataset.abrir);if(j&&j.showModal)j.showModal();return}
  var f=e.target.closest('[data-fechar]');if(f&&f.closest('dialog'))f.closest('dialog').close()});
document.addEventListener('cancel',function(e){if(e.target.tagName==='DIALOG')e.preventDefault()},true);
// Banners: passam sozinhos a cada 6 s; param com o mouse em cima; os pontinhos trocam
// Banners só do Brasil (suporte pelo WhatsApp): saem em espanhol e inglês; trocar de idioma recarrega o Início para refazer a fila
(function(){var b=document.querySelector('.banners');if(!b)return;var lg;try{lg=localStorage.getItem('cdr:idioma')}catch(e){}
  var pt=!lg||lg==='pt',temSoPt=!!b.querySelector('[data-so-pt]');if(!pt)b.querySelectorAll('[data-so-pt]').forEach(function(x){x.remove()});
  document.addEventListener('cdr:idioma',function(){if(temSoPt&&(document.documentElement.lang==='pt-BR')!==pt)setTimeout(function(){location.reload()},50)});
  var s=b.querySelectorAll('.slide-b'),p=b.querySelectorAll('.ponto-banner'),i=0,t;if(s.length<2)return;
  // Sempre segue para a frente: uma cópia do primeiro banner no fim faz a volta sem deslizar para trás
  var tr=b.querySelector('.trilho-b'),n0=s.length,pos=0,copia=s[0].cloneNode(true);copia.setAttribute('aria-hidden','true');copia.tabIndex=-1;tr.appendChild(copia);
  function mover(k,anim){tr.style.transition=anim?'':'none';tr.style.transform='translateX(-'+(k*100)+'%)';if(!anim)void tr.offsetWidth}
  // Só o fim do deslize do próprio trilho conta (as transições de dentro dos banners também disparam este evento)
  tr.addEventListener('transitionend',function(e){if(e.target===tr&&pos>=n0){pos-=n0;mover(pos,false)}});
  // Banner preto (corrigido em 04/11/2026): se avançava de novo antes de terminar a volta (aba em segundo plano, cliques rápidos),
  // o trilho passava do último banner. Agora volta para o começo antes de andar.
  function ir(n){p[i].classList.remove('on');
    if(pos>=n0){n-=n0;pos-=n0;mover(pos,false)}
    if(n<0){mover(n0,false);n=n0-1}
    pos=n;mover(pos,true);i=((n%n0)+n0)%n0;void p[i].offsetWidth;p[i].classList.add('on');
    s.forEach(function(x,k){x.setAttribute('aria-hidden',k!==i);x.tabIndex=k===i?0:-1})}
  function tocar(){clearInterval(t);t=setInterval(function(){if(!b.classList.contains('parado')&&!document.hidden)ir(pos+1)},6000)}
  p.forEach(function(x,k){x.addEventListener('click',function(){ir(k);tocar()})});
  b.querySelectorAll('[data-banner]').forEach(function(x){x.addEventListener('click',function(){ir(i+Number(x.dataset.banner));tocar()})});
  var x0=null;b.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});b.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){ir(i+(dx<0?1:-1));tocar()}});
  b.addEventListener('mouseenter',function(){b.classList.add('parado')});b.addEventListener('mouseleave',function(){b.classList.remove('parado')});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)tocar()})();
// Atividade (para o administrador ver o que o pessoal mais usa): manda em segundo plano, sem esperar resposta
function ev(t,k,n,d){try{var b=new Blob([JSON.stringify({t:t,k:k,n:n,d:d||''})],{type:'application/json'});if(!(navigator.sendBeacon&&navigator.sendBeacon('/ev',b)))fetch('/ev',{method:'POST',body:b,headers:{'Content-Type':'application/json'},keepalive:true})}catch(x){}}
document.addEventListener('click',function(e){var l=e.target.closest('#janela-arte [data-campo=canva],#janela-arte [data-campo=psd]');if(!l)return;var j=document.getElementById('janela-arte'),d={};try{d=JSON.parse(j.dataset.atual||'{}')}catch(x){}
  ev('baixou',d.id,d.titulo+(d.pack?' · '+d.pack:''),l.dataset.campo==='canva'?'Canva':'PSD')});
document.addEventListener('click',function(e){var a=e.target.closest('[data-arte]');if(!a)return;var j=document.getElementById('janela-arte');if(!j)return;var d=JSON.parse(a.dataset.arte);j.dataset.atual=a.dataset.arte;ev('arte',d.id,d.titulo+(d.pack?' · '+d.pack:''),d.pack);
  j.querySelector('.previa img').src=d.grande;j.querySelector('[data-campo=titulo]').textContent=d.titulo;j.querySelector('[data-campo=pack]').textContent=d.pack;
  var c=j.querySelector('[data-campo=canva]'),p=j.querySelector('[data-campo=psd]');c.href=d.canva||'#';c.hidden=!d.canva;p.href=d.psd||'#';p.hidden=!d.psd;
  var f=j.querySelector('[data-fav]');if(f){f.dataset.fav=d.id;marcar(f)}j.showModal()});
function guardado(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(x){return[]}}
function marcar(b){var on=guardado('cdr:favs').indexOf(b.dataset.fav)>=0;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)}
document.querySelectorAll('[data-fav]').forEach(marcar);
document.addEventListener('click',function(e){var b=e.target.closest('[data-fav]');if(!b)return;e.preventDefault();var l=guardado('cdr:favs'),i=l.indexOf(b.dataset.fav);if(i>=0)l.splice(i,1);else l.push(b.dataset.fav);
  try{localStorage.setItem('cdr:favs',JSON.stringify(l))}catch(x){}document.querySelectorAll('[data-fav="'+b.dataset.fav+'"]').forEach(marcar)});
// Troca parcial: links com data-trocar="id" buscam a página e trocam só aquele bloco (lista do pack, calendário)
function iniciar(r){r.querySelectorAll('[data-fav]').forEach(marcar);r.querySelectorAll('img[data-carrossel]').forEach(medirCarrossel)}
// Imagens: ficam invisíveis até carregar e então aparecem suave; o quadro perde o brilho de "carregando"
function prepararImagens(r){r.querySelectorAll('main img, img').forEach(function(im){if(!im.closest('main')||im.dataset.vista)return;im.dataset.vista=1;var q=im.parentElement;
  function ok(){im.classList.remove('esperando');if(q)q.classList.add('pronta')}
  if(im.complete&&im.naturalWidth){ok();return}im.classList.add('esperando');im.addEventListener('load',ok,{once:true});im.addEventListener('error',ok,{once:true})})}
prepararImagens(document);
// Troca parcial: busca a página nova, espera as primeiras imagens (até meio segundo) e só então mostra a lista nova
function trocar(url,id,rolar){var alvo=document.getElementById(id);if(!alvo){location.href=url;return}alvo.classList.add('carregando');
  fetch(url).then(function(r){return r.text()}).then(function(h){var novo=new DOMParser().parseFromString(h,'text/html').getElementById(id);if(!novo){location.href=url;return}
    var primeiras=[].slice.call(novo.querySelectorAll('img')).slice(0,14).map(function(im){return new Promise(function(ok){var i=new Image();i.onload=i.onerror=ok;i.src=im.getAttribute('src')})});
    Promise.race([Promise.all(primeiras),new Promise(function(ok){setTimeout(ok,500)})]).then(function(){
      novo.classList.add('carregando');alvo.replaceWith(novo);history.replaceState(null,'',url);iniciar(novo);prepararImagens(novo);
      requestAnimationFrame(function(){requestAnimationFrame(function(){novo.classList.remove('carregando')})});
      if(rolar&&novo.getBoundingClientRect().top<0)novo.scrollIntoView({behavior:'smooth'})})}).catch(function(){location.href=url})}
document.addEventListener('click',function(e){var a=e.target.closest('a[data-trocar]');if(!a||e.ctrlKey||e.metaKey)return;e.preventDefault();
  var ch=a.closest('.chips');if(ch){ch.querySelectorAll('a').forEach(function(x){x.classList.toggle('on',x===a)});var c=document.querySelector('.busca-campo [name=cat]');if(c)c.value=new URL(a.href).searchParams.get('cat')||''}
  trocar(a.href,a.dataset.trocar,!!a.closest('.paginacao'))});
// Busca pelo número: procura em todas as artes do pack (não só na página aberta) e troca só a lista
(function(){var t;function url(f){var s=new URLSearchParams(new FormData(f));['cat','q'].forEach(function(k){if(!s.get(k))s.delete(k)});var q=s.toString();return f.getAttribute('action')+(q?'?'+q:'')}
  document.addEventListener('input',function(e){var i=e.target.closest('[data-buscar]');if(!i)return;clearTimeout(t);t=setTimeout(function(){trocar(url(i.form),i.dataset.buscar)},300)});
  document.addEventListener('submit',function(e){var i=e.target.querySelector('[data-buscar]');if(!i)return;e.preventDefault();clearTimeout(t);trocar(url(e.target),i.dataset.buscar)})})();
// Carrossel do pack: a imagem tem todos os slides lado a lado; mostra duas dobras e meia e o resto aparece arrastando
function medirCarrossel(im){function m(){if(!im.naturalWidth)return;var n=Math.max(1,Math.round(im.naturalWidth/(im.naturalHeight*.8))),f=im.closest('.faixa');f.style.aspectRatio=(2.5*im.naturalWidth/n)+'/'+im.naturalHeight;
    var cx=f.parentNode,p=cx.querySelector('.pontos-c');if(!p){p=document.createElement('div');p.className='pontos-c';p.setAttribute('aria-hidden','true');cx.appendChild(p)}p.innerHTML=new Array(n+1).join('<i></i>');
    function acender(){var k=Math.round(f.scrollLeft/(f.clientWidth/2.5));p.querySelectorAll('i').forEach(function(d,j){d.classList.toggle('on',j>=k&&j<k+2)})}acender();f.addEventListener('scroll',acender,{passive:true})}
  if(im.complete)m();else im.addEventListener('load',m,{once:true})}
(function(){var a=null,moveu=false;
  document.addEventListener('mousedown',function(e){var f=e.target.closest('[data-arrastar]');if(!f||e.button)return;a={f:f,x:e.clientX,s:f.scrollLeft};moveu=false;e.preventDefault()});
  window.addEventListener('mousemove',function(e){if(!a)return;var dx=e.clientX-a.x;if(Math.abs(dx)>5){moveu=true;a.f.classList.add('arrastando')}if(moveu)a.f.scrollLeft=a.s-dx});
  window.addEventListener('mouseup',function(){if(!a)return;a.f.classList.remove('arrastando');a=null});
  document.addEventListener('click',function(e){if(moveu&&e.target.closest('[data-arrastar]')){e.preventDefault();e.stopPropagation()}moveu=false},true)})();
iniciar(document);
// Comece por aqui: lupa (procura no título da aula e no nome do guia) e o vídeo da aula numa janela
(function(){var campo=document.querySelector('[data-filtrar-dicas]');if(!campo)return;
  var blocos=document.querySelector('[data-dicas-blocos]'),todas=document.querySelector('[data-dicas-todas]'),vazio=document.querySelector('[data-dicas-vazio]');
  var tira=function(t){return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')};
  campo.addEventListener('input',function(){var q=tira(campo.value.trim()),n=0;
    if(blocos){blocos.hidden=!!q;todas.hidden=!q}
    document.querySelectorAll('.dica').forEach(function(d){var ok=!q||tira(d.dataset.busca).indexOf(q)>=0;d.hidden=!ok;if(ok)n++});
    vazio.hidden=!q||n>0})})();
(function(){var j=document.getElementById('janela-dica');if(!j)return;var caixa=j.querySelector('[data-dica-video]'),modelo=j.querySelector('[data-dica-modelo]'),atual=null;
  document.addEventListener('click',function(e){var d=e.target.closest('.dica');if(!d||d.disabled)return;
    j.querySelector('[data-dica-titulo]').textContent=d.dataset.titulo;caixa.innerHTML='';
    if(d.dataset.yt){var pl=modelo.content.firstElementChild.cloneNode(true);pl.dataset.video=videoNoIdioma(d.dataset,'yt','ytEs','ytEn');pl.querySelector('.player-capa').style.backgroundImage="url('https://i.ytimg.com/vi/"+d.dataset.yt+"/hqdefault.jpg')";caixa.appendChild(pl);j.showModal();atual=montarPlayer(pl,true)}
    else{caixa.innerHTML='<video controls autoplay playsinline src="'+d.dataset.local+'"></video>';j.showModal()}});
  j.addEventListener('close',function(){if(atual)atual.parar();atual=null;caixa.innerHTML=''})})();
// Temas: some o esmaecido da direita quando chega ao fim da fileira
document.querySelectorAll('.chips').forEach(function(c){function v(){c.classList.toggle('no-fim',c.scrollLeft+c.clientWidth>=c.scrollWidth-2)}v();c.addEventListener('scroll',v,{passive:true});addEventListener('resize',v)});
// Instalar o app: guarda o pedido do navegador para o botão da página de avisos usar quando a pessoa quiser
addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pedidoInstalar=e;document.dispatchEvent(new Event('cdr:pode-instalar'))});
// Título das capas dos cursos: se a palavra (ou a tradução) não couber na largura da capa, diminui a letra até caber
function ajustarCapas(){document.querySelectorAll('.capa-txt small,.capa-txt b').forEach(function(el){var base=el.tagName==='B'?11.5:4.4;el.style.fontSize='';
  var cabe=el.parentElement.clientWidth,larg=el.scrollWidth;if(cabe&&larg>cabe)el.style.fontSize=(base*cabe/larg*.98).toFixed(2)+'cqw'})}
ajustarCapas();document.addEventListener('cdr:idioma',ajustarCapas);if(document.fonts)document.fonts.ready.then(ajustarCapas);
// IA: copia o prompt, o botão vira "Copiado!" e aparece a dica de onde colar
(function(){var t;function aviso(txt){var a=document.querySelector('.aviso-copia');if(!a)return;a.textContent=txt;a.hidden=false;clearTimeout(t);t=setTimeout(function(){a.hidden=true},3500)}
  function copiar(txt){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(txt);
    return new Promise(function(ok,erro){var c=document.createElement('textarea');c.value=txt;c.setAttribute('readonly','');c.style.position='fixed';c.style.opacity='0';document.body.appendChild(c);c.select();
      try{document.execCommand('copy')?ok():erro()}catch(x){erro(x)}c.remove()})}
  document.addEventListener('click',function(e){var b=e.target.closest('[data-copiar-prompt]');if(!b)return;var s=b.querySelector('span');if(b.dataset.ev)ev('prompt',b.dataset.evId||b.dataset.ev,b.dataset.ev);
    copiar(b.dataset.prompt).then(function(){b.classList.add('copiado');s.textContent='Copiado!';aviso('Prompt copiado. '+b.dataset.dica);setTimeout(function(){b.classList.remove('copiado');s.textContent='Copiar prompt'},2500)},
      function(){aviso('Não deu para copiar. Tente de novo.')})})})();
// Aulas assistidas: marca sozinha ao passar de 80% do vídeo, ou pelo botão "Concluir aula" (que vai para a próxima)
(function(){var l=document.querySelectorAll('.licao[data-aula]');if(!l.length)return;
  function pintar(){var g=guardado('cdr:aulas');l.forEach(function(a){if(g.indexOf(a.dataset.aula)>=0)a.classList.add('feita')});
    var n=document.querySelectorAll('.licao.feita').length,pc=Math.round(n/l.length*100),r=document.querySelector('[data-resumo]'),b=document.querySelector('.cab-m .barra>span');
    if(r)r.textContent=n+' de '+l.length+' aulas · '+pc+'%';if(b)b.style.width=pc+'%'}
  window.concluirAula=function(k){var g=guardado('cdr:aulas');if(g.indexOf(k)<0){g.push(k);try{localStorage.setItem('cdr:aulas',JSON.stringify(g))}catch(x){}}pintar()};
  pintar();document.addEventListener('click',function(e){var b=e.target.closest('[data-concluir]');if(!b)return;concluirAula(b.dataset.concluir);if(b.dataset.proxima)location.href=b.dataset.proxima})})();
// Player do app: o vídeo do YouTube fica escondido por baixo e os controles são os nossos (aula e janela do Comece por aqui)
// Vídeo no idioma da pessoa: espanhol e inglês usam o link próprio quando a aula tem; senão, o do Brasil
function idiomaApp(){var l;try{l=localStorage.getItem('cdr:idioma')}catch(e){}return l==='es'||l==='en'?l:'pt'}
function videoNoIdioma(d,pt,es,en){var l=idiomaApp();return (l==='es'&&d[es])||(l==='en'&&d[en])||d[pt]}
var filaYT=[];function comYT(fn){if(window.YT&&YT.Player)return fn();filaYT.push(fn);if(window.__pedidoYT)return;window.__pedidoYT=1;
  window.onYouTubeIframeAPIReady=function(){filaYT.forEach(function(f){f()});filaYT=[]};var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s)}
window.montarPlayer=function(pl,tocarJa){var yt=null,pronto=false,t;
  function fmt(s){s=Math.floor(s||0);var m=Math.floor(s/60),r=s%60;return m+':'+(r<10?'0':'')+r}
  function atualizar(){if(!pronto)return;var d=yt.getDuration()||0,c=yt.getCurrentTime()||0;pl.querySelector('[data-tempo]').textContent=fmt(c)+' / '+fmt(d);if(!pl.classList.contains('arrastando'))pl.querySelector('[data-progresso]').value=d?Math.round(c/d*1000):0;if(d&&c/d>=.8&&pl.dataset.aula&&!pl.dataset.ok&&window.concluirAula){pl.dataset.ok=1;concluirAula(pl.dataset.aula)}}
  comYT(function(){yt=new YT.Player(pl.querySelector('#yt-player,.yt-alvo'),{videoId:videoNoIdioma(pl.dataset,'video','videoEs','videoEn'),playerVars:{controls:0,modestbranding:1,rel:0,playsinline:1,disablekb:1,iv_load_policy:3,fs:0,showinfo:0},
    events:{onReady:function(){pronto=true;if(vol.style)vol.value=yt.getVolume();atualizar();if(tocarJa)yt.playVideo()},onStateChange:function(e){var on=e.data===1;pl.classList.toggle('tocando',on);if(on)pl.classList.add('comecou');if(on&&!pl.dataset.ev&&(pl.dataset.aula||pl.dataset.evNome)){pl.dataset.ev=1;ev('aula',pl.dataset.aula||pl.dataset.evNome,pl.dataset.evNome||pl.dataset.aula)}clearInterval(t);if(on)t=setInterval(atualizar,500);atualizar()}}})});
  pl.addEventListener('click',function(e){if(!pronto)return;
    if(e.target.closest('[data-alternar]')){if(yt.getPlayerState()===1)yt.pauseVideo();else yt.playVideo()}
    if(e.target.closest('[data-mudo]')){if(yt.isMuted()||!+vol.value){yt.unMute();if(!+vol.value){vol.value=60;yt.setVolume(60)}pl.classList.remove('mudo')}else{yt.mute();pl.classList.add('mudo')}}
    if(e.target.closest('[data-tela]')){if(document.fullscreenElement)document.exitFullscreen();else if(pl.requestFullscreen)pl.requestFullscreen()}});
  var pr=pl.querySelector('[data-progresso]');pr.addEventListener('input',function(){pl.classList.add('arrastando')});
  // volume: a barrinha ao lado do som (zero = sem som)
  var vol=pl.querySelector('[data-volume]')||{value:100,addEventListener:function(){}};vol.addEventListener('input',function(){if(!pronto)return;var v=+vol.value;yt.setVolume(v);if(v){yt.unMute();pl.classList.remove('mudo')}else{yt.mute();pl.classList.add('mudo')}});
  pr.addEventListener('change',function(){pl.classList.remove('arrastando');if(pronto)yt.seekTo(yt.getDuration()*pr.value/1000,true)});
  return{parar:function(){clearInterval(t);if(yt&&yt.destroy)yt.destroy()}}};
(function(){var pl=document.querySelector('.player[data-video]');if(!pl)return;var atual=videoNoIdioma(pl.dataset,'video','videoEs','videoEn');montarPlayer(pl);
  // trocou o idioma e a aula tem vídeo nesse idioma: recarrega com o vídeo certo
  document.addEventListener('cdr:idioma',function(){setTimeout(function(){if(videoNoIdioma(pl.dataset,'video','videoEs','videoEn')!==atual)location.reload()},60)})})();
// Fileiras: arrastar com o mouse e setas nas pontas
document.querySelectorAll('.fileira-caixa').forEach(function(cx){var f=cx.querySelector('.fileira');
  function marcar(){cx.classList.toggle('pode-ant',f.scrollLeft>4);cx.classList.toggle('pode-prox',f.scrollLeft+f.clientWidth<f.scrollWidth-4)}
  marcar();f.addEventListener('scroll',marcar,{passive:true});window.addEventListener('resize',marcar);
  cx.querySelector('.seta-fileira.ant').addEventListener('click',function(){f.scrollBy({left:-f.clientWidth*.8,behavior:'smooth'})});
  cx.querySelector('.seta-fileira.prox').addEventListener('click',function(){f.scrollBy({left:f.clientWidth*.8,behavior:'smooth'})});
  var x0=null,s0=0,moveu=false;
  f.addEventListener('mousedown',function(e){if(e.button)return;x0=e.clientX;s0=f.scrollLeft;moveu=false;e.preventDefault()});
  window.addEventListener('mousemove',function(e){if(x0===null)return;var dx=e.clientX-x0;if(Math.abs(dx)>5){moveu=true;f.classList.add('arrastando')}if(moveu)f.scrollLeft=s0-dx});
  window.addEventListener('mouseup',function(){if(x0===null)return;x0=null;setTimeout(function(){f.classList.remove('arrastando')},0)});
  f.addEventListener('click',function(e){if(moveu){e.preventDefault();e.stopPropagation();moveu=false}},true)});
// Idioma: marca a bandeira escolhida e traduz a interface (as traduções ficam em /js/idiomas.js)
(function(){var k;try{k=localStorage.getItem('cdr:idioma')}catch(e){}
  function aplicar(v){var esc=null;document.querySelectorAll('[data-idioma]').forEach(function(b){var on=b.dataset.idioma===v;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);if(on)esc=b});
    if(!esc)return;document.querySelectorAll('.idioma-sel').forEach(function(d){var sv=d.querySelector('summary svg');sv.outerHTML=esc.querySelector('svg').outerHTML;d.querySelector('summary').setAttribute('aria-label','Idioma: '+esc.textContent.trim());var nm=d.querySelector('[data-idioma-nome]');if(nm)nm.textContent=esc.textContent.trim();d.open=false});if(window.CDRIdioma)CDRIdioma.aplicar(v)}
  document.addEventListener('click',function(e){document.querySelectorAll('.idioma-sel[open],.perfil[open]').forEach(function(d){if(!d.contains(e.target))d.open=false})});
  if(k)aplicar(k);document.addEventListener('click',function(e){var b=e.target.closest('[data-idioma]');if(!b)return;aplicar(b.dataset.idioma);try{localStorage.setItem('cdr:idioma',b.dataset.idioma)}catch(x){}})})();
document.querySelectorAll('[data-conta]').forEach(function(el){var n=guardado(el.dataset.conta==='favs'?'cdr:favs':'cdr:aulas').length;el.textContent=n||''});
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(function(){});
</script>`;

// Antes de desenhar: tema e menu encolhido, para não piscar. O padrão é o claro.
const INICIAL = `<script>(function(){var d=document.documentElement,t,m;try{t=localStorage.getItem('cdr:tema');m=localStorage.getItem('cdr:menu')}catch(e){}
d.dataset.theme=t==='dark'?'dark':'light';if(m==='encolhido')d.classList.add('menu-encolhido')})()</script>`;

const iniciais = nome => String(nome || '').split(/\s+/).filter(Boolean).map(x => x[0]).slice(0, 2).join('').toUpperCase();
const botaoTema = `<button type="button" class="ico-pe" data-tema title="Modo claro/escuro" aria-label="Modo claro/escuro"><span class="so-claro">${icone('lua', 18)}</span><span class="so-escuro">${icone('sol', 18)}</span></button>`;
// Idioma: bandeirinhas do Brasil, Espanha e EUA (a tradução da interface entra na fase de idiomas)
const BANDEIRAS = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="3" fill="#1E9A4B"/><path d="M14 3 25 10 14 17 3 10z" fill="#F7D117"/><circle cx="14" cy="10" r="4" fill="#1F3E8F"/></svg>',
  es: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="3" fill="#C8102E"/><rect y="5" width="28" height="10" fill="#F6C400"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="3" fill="#fff"/><path d="M0 1.5h28M0 4.6h28M0 7.7h28M0 10.8h28M0 13.9h28M0 17h28" stroke="#B22234" stroke-width="1.55"/><rect width="12.5" height="10.8" rx="2" fill="#3C3B6E"/></svg>',
};
// Uma bandeira (a do idioma atual); ao tocar, abre as outras
const IDIOMAS = [['pt', 'Português'], ['es', 'Español'], ['en', 'English']];
const idiomas = () => `<details class="idioma-sel"><summary class="idioma-atual" aria-label="Idioma: Português" title="Idioma">${BANDEIRAS.pt}</summary>
  <div class="idioma-menu" role="group" aria-label="Idioma">${IDIOMAS.map(([k, n]) => `<button type="button" class="idioma ${k === 'pt' ? 'on' : ''}" data-idioma="${k}" aria-pressed="${k === 'pt'}">${BANDEIRAS[k]}<span>${n}</span></button>`).join('')}</div></details>`;
const botaoAvisos = `<a class="ico-pe" href="/avisos" title="Avisos" aria-label="Avisos">${icone('sino', 18)}</a>`;
const botaoAjuda = `<a class="ico-pe" href="/comece" title="Ajuda" aria-label="Ajuda">${icone('ajuda', 18)}</a>`;
const acoesTopo = () => `<div class="acoes-topo">${botaoAjuda}${idiomas()}${botaoTema}</div>`;
// Pé do menu lateral: preferências que se mexe pouco, separadas da navegação (no celular aparecem no "Menu")
const peMenu = (admin = false) => `<div class="pe-menu">
  <a class="item-pe" href="/comece" title="Ajuda">${icone('ajuda', 15)}<span class="rot">Ajuda</span></a>
${admin ? '' : `<details class="idioma-sel idioma-lat"><summary class="item-pe" aria-label="Idioma: Português" title="Idioma">${BANDEIRAS.pt}<span class="rot">Idioma</span>${icone('baixo', 14)}</summary>
    <div class="idioma-menu" role="group" aria-label="Idioma">${IDIOMAS.map(([k, n]) => `<button type="button" class="idioma ${k === 'pt' ? 'on' : ''}" data-idioma="${k}" aria-pressed="${k === 'pt'}">${BANDEIRAS[k]}<span>${n}</span></button>`).join('')}</div></details>`}
  <button type="button" class="item-pe" data-tema title="Modo claro/escuro" aria-label="Modo claro/escuro"><span class="so-claro">${icone('lua', 18)}</span><span class="so-escuro">${icone('sol', 18)}</span></button></div>`;

// Administrativo, Entrar e Minha conta: mesmas cores, fonte e cantos da área de membros
const CSS_ADMIN = `
select,textarea{padding:10px 14px;border:1px solid var(--borda2);border-radius:10px;background:var(--sup);color:var(--ink);font:inherit;width:100%}
textarea{resize:vertical;min-height:44px}select:focus,textarea:focus{outline:2px solid var(--ouro);border-color:transparent}
.campo{display:grid;gap:6px;min-width:0}.campo>span{font-size:13px;font-weight:600;color:var(--t2)}.campo>span small{font-weight:400;color:var(--t3)}
.linha-2{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;align-items:start}.linha-2>div{display:grid;gap:14px}
.marcar{display:flex;align-items:center;gap:10px;font-size:14px;cursor:pointer;min-height:40px}.marcar input{width:18px;height:18px;accent-color:var(--ouro);flex:none}
.msg[hidden]{display:none}.msg{display:flex;align-items:center;gap:10px;padding:12px 16px;margin-bottom:18px;border-radius:10px;font-size:14px;font-weight:500;border:1px solid}
.msg.ok{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 35%,transparent);background:color-mix(in srgb,var(--ok) 9%,var(--sup))}
.msg.erro{color:var(--erro);border-color:color-mix(in srgb,var(--erro) 35%,transparent);background:color-mix(in srgb,var(--erro) 8%,var(--sup))}
.msg.aviso{color:var(--chip-ink);border-color:color-mix(in srgb,var(--ouro) 45%,transparent);background:var(--chip)}
.botao.perigo,button.perigo{color:#fff;background:var(--erro)}.botao.perigo:hover{filter:brightness(1.08)}
.icone-btn.perigo-ic:hover{color:var(--erro);border-color:var(--erro)}
.faixa-admin{display:flex;align-items:center;gap:10px;padding:10px 16px;margin-bottom:18px;border-radius:10px;background:var(--preto);color:#EDEDED;font-size:13.5px}
.faixa-admin .ico{color:var(--ouro)}.faixa-admin a{margin-left:auto;color:var(--ouro);font-weight:600;text-decoration:none}
.rot-admin{display:block;margin:4px 20px 6px;color:var(--ouro);font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
html.menu-encolhido .rot-admin{visibility:hidden}
.lateral a.item.troca-area{color:#8F8F8F}.lateral a.item.troca-area:hover{color:#fff}
.adm-nota{color:var(--t3);font-size:13px;margin:-10px 0 18px}
/* "?" com a explicação curta (aparece ao passar o mouse ou tocar) e ajuda recolhida — mesmo padrão do FluxoPost, 07/11/2026 */
.dica-q{position:relative;display:inline-grid;place-items:center;width:16px;height:16px;margin-left:6px;border-radius:50%;border:1px solid var(--borda2);color:var(--t3);font-size:10.5px;font-weight:700;font-style:normal;line-height:1;vertical-align:2px;cursor:help;user-select:none}
.dica-q:hover,.dica-q:focus{color:var(--seta);border-color:var(--seta);outline:0}
.dica-q::after{content:attr(data-dica);position:absolute;left:-8px;top:calc(100% + 8px);width:max-content;max-width:min(280px,calc(100vw - 48px));padding:8px 10px;border-radius:9px;background:var(--ink);color:var(--bg);font-size:12px;font-weight:500;line-height:1.45;text-align:left;text-transform:none;letter-spacing:0;white-space:normal;box-shadow:var(--sombra-pop);opacity:0;visibility:hidden;transition:opacity .12s;z-index:60;pointer-events:none}
.dica-q:hover::after,.dica-q:focus::after{opacity:1;visibility:visible}
.ajuda-dobra{margin:2px 0 4px}.ajuda-dobra>summary{cursor:pointer;list-style:none;display:inline-flex;align-items:center;gap:6px;color:var(--seta);font-weight:600;font-size:13px}.ajuda-dobra>summary::-webkit-details-marker{display:none}
.ajuda-dobra>div{margin-top:8px;padding:10px 12px;border-radius:10px;background:var(--s2);color:var(--t2);font-size:13px;line-height:1.55}.ajuda-dobra ol,.ajuda-dobra ul{margin:4px 0 0;padding-left:18px}
/* Botões do administrativo no padrão do FluxoPost (09/11/2026): secundário e pequeno com 32px, letra 13px e ícone 15px.
   Salvar dentro de bloco = botão comum (preto; no escuro, claro). O dourado (.ouro) fica só no botão principal da tela. */
body.adm main .botao.pequeno,body.adm main .botao.leve{min-height:32px;height:32px;padding:0 12px;gap:6px;font-size:13px;border-radius:8px}
body.adm main .botao.pequeno .ico,body.adm main .botao.leve .ico{width:15px;height:15px}
/* Rodapé das janelas: todos os botões com a mesma altura (Salvar, Cancelar, Excluir) */
body.adm dialog .rodape-janela .botao,body.adm dialog .rodape-janela button.botao{min-height:36px;height:36px;padding:0 14px;gap:6px;font-size:13.5px;border-radius:8px}
body.adm dialog .rodape-janela .botao .ico{width:16px;height:16px}
/* Topo da tela: todos os botões da linha do título com a mesma altura (o principal só muda a cor) */
body.adm .titulo-pag .acoes>.botao,body.adm .titulo-pag .acoes>a.botao,body.adm .titulo-pag .acoes>button{min-height:38px;height:38px;padding:0 14px;font-size:13.5px;border-radius:9px}
/* Abas de período (Analytics) no padrão de abas do app: fundo cinza, a escolhida em branco */
body.adm .chips.an-periodo{flex:none;gap:3px;padding:3px;border-radius:10px;background:var(--s2);-webkit-mask-image:none;mask-image:none;cursor:default}
body.adm .chips.an-periodo a{min-height:30px;padding:0 12px;border:0;border-radius:8px;color:var(--t2);background:transparent;font-size:13px;font-weight:600}
body.adm .chips.an-periodo a:hover{color:var(--ink)}
body.adm .chips.an-periodo a.on,[data-theme="dark"] body.adm .chips.an-periodo a.on{color:var(--ink);background:var(--sup);border:0;box-shadow:0 1px 2px rgba(0,0,0,.08),0 0 0 1px var(--borda)}
body.adm main .icone-btn.mini{width:32px;height:32px;border-radius:8px}
/* Cartão da plataforma enxuto: lápis ao lado do nome; Trocar endereço e Excluir como ícones na linha do endereço;
   token guardado com olhinho e Salvar na mesma linha */
.plat-lapis{display:inline-grid;place-items:center;width:26px;height:26px;min-height:0;padding:0;border:0;border-radius:7px;color:var(--t3);background:transparent!important;cursor:pointer}
.plat-lapis:hover{color:var(--ink);background:var(--s2)!important;transform:none}
.copiar .icone-btn.mini{flex:none}
.token-linha{max-width:520px}.token-linha input{min-width:0;flex:1}
.campo-curto{max-width:520px}
.adm-lista{display:grid;gap:10px}
.adm-linha{display:flex;align-items:center;gap:16px;padding:12px 14px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}
.adm-thumb{flex:none;object-fit:cover;border-radius:8px;background:var(--s2)}.adm-thumb.em-pe{width:54px;height:72px}.adm-thumb.deitada{width:96px;height:72px}
.adm-info{display:grid;gap:2px;min-width:0;flex:1}.adm-info a{color:var(--ink);text-decoration:none}.adm-info a:hover b{text-decoration:underline}
.adm-info b{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.adm-info small{color:var(--t3);font-size:12.5px}
.adm-acoes{display:flex;align-items:center;gap:8px;flex:none;margin-left:auto}.adm-acoes form{margin:0}
.mover{display:flex;gap:4px}.mover .icone-btn{width:32px;height:32px}
.selo.s-off{color:var(--t2);background:var(--s3)}
.adm-modulo{border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);margin-bottom:16px;overflow:hidden}
.adm-modulo-cab{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--s2);border-bottom:1px solid var(--borda)}.adm-modulo-cab b{font-size:15px}.adm-modulo-cab small{color:var(--t3)}
.adm-aula{display:flex;align-items:center;gap:14px;padding:10px 14px;border-top:1px solid var(--borda)}.adm-aula:first-child,.adm-modulo-cab+.adm-aula{border-top:0}
.adm-aula .n{width:26px;text-align:right;color:var(--t3);font-size:13px;font-variant-numeric:tabular-nums;flex:none}
.adm-mini{width:80px;height:45px;object-fit:cover;border-radius:6px;flex:none;background:var(--s2)}.vazio-mini{display:grid;place-items:center;color:var(--t3)}
.idiomas-aula{display:flex;gap:4px;flex:none}.idiomas-aula span{font-size:10.5px;font-weight:600;padding:2px 6px;border-radius:5px;color:var(--t3);background:var(--s2);text-decoration:line-through}
.idiomas-aula span.tem{color:var(--chip-ink);background:var(--chip);text-decoration:none}
.adm-vazio{padding:16px;color:var(--t3);font-size:13.5px}
.adm-temas{display:flex;align-items:center;gap:10px;flex:1 1 auto;min-width:0}.adm-temas>.botao{flex:none;white-space:nowrap}
.adm-grade-artes{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px}
.adm-arte{display:grid;grid-template-columns:100%;justify-content:stretch;align-items:stretch;justify-items:stretch;gap:0;min-height:0;padding:0;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)!important;color:var(--ink)!important;text-align:left;overflow:hidden;font-weight:400;align-content:start}
.adm-arte:hover{border-color:var(--borda-hover);transform:translateY(-2px)}
.adm-arte-img{position:relative;display:block;aspect-ratio:4/5;background:var(--s2);overflow:hidden}
.adm-arte-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.adm-arte-txt{display:grid;gap:0;padding:5px 8px 7px;line-height:1.3}.adm-arte-txt b{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.adm-arte-txt small{color:var(--t3);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lapis{position:absolute;right:6px;top:6px;z-index:2;display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.94);color:#111;box-shadow:0 2px 8px rgba(0,0,0,.25);transition:background .2s,color .2s}
.adm-arte:hover .lapis{background:var(--grad);color:#111}
.pela-esquerda .adm-arte-img img{object-position:left center}
.antes-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px}
.antes-op{position:relative;display:grid;gap:4px;justify-items:center;min-height:0;padding:6px;border:1.5px solid var(--borda2);border-radius:10px;background:var(--sup)!important;color:var(--ink)!important;cursor:pointer;font-weight:400}
.antes-op input{position:absolute;opacity:0;pointer-events:none}.antes-op img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:7px}.antes-op b{font-size:12px;font-weight:600}
.antes-op:has(input:checked){border-color:var(--ouro);box-shadow:0 0 0 2px var(--ouro)}.antes-op.nova{place-content:center;border-style:dashed;color:var(--t2)!important}
.antes-lista.icones{grid-template-columns:repeat(auto-fill,minmax(64px,1fr))}.antes-lista.icones img{object-fit:contain;padding:6px;background:var(--s2)}
.sem-icone{display:grid;place-items:center;width:100%;aspect-ratio:1;border-radius:7px;background:var(--s2);color:var(--t3);font-size:18px}
.nova-pessoa{display:grid;grid-template-columns:72px 1fr auto;gap:8px;align-items:center;margin-top:8px}.enviar-img.pequena{min-height:0;width:72px}
.pasta-grupos{margin-bottom:12px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s2)}
.pasta-grupos>summary{display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;list-style:none}.pasta-grupos>summary::-webkit-details-marker{display:none}
.pasta-grupos>summary>.ico{transition:transform .2s;color:var(--t3)}.pasta-grupos[open]>summary>.ico{transform:rotate(90deg)}
.pasta-grupos>summary b{font-size:15px}.pasta-grupos>summary small{color:var(--t3)}.pasta-grupos>summary .adm-acoes{margin-left:auto}
.pasta-grupos>.adm-lista{padding:0 10px 10px}.secao-adm-cab .botao+.botao{margin-left:0}
.dobras{display:grid;gap:12px;max-width:820px}.dobras.duas{grid-template-columns:repeat(2,minmax(0,1fr));max-width:1100px;align-items:start}
.secao-cfg{margin-bottom:34px}.secao-cfg>h2{font-size:18px;margin:0 0 4px}.secao-cfg>.adm-nota{margin:0 0 14px}
.autos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:1100px}
.auto-cartao{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.auto-cartao div{display:grid;gap:3px;flex:1}
.auto-cartao b{display:flex;align-items:center;gap:8px;font-size:15px}.auto-cartao small{color:var(--t3);font-size:12.5px}
@media (max-width:900px){.autos{grid-template-columns:1fr}}
.secao-cfg-cab{display:flex;align-items:baseline;gap:12px;max-width:1100px;margin-bottom:4px}.secao-cfg-cab h2{font-size:18px;margin:0}
.link-discreto{margin-left:auto;min-height:0;padding:0;border:0;background:none!important;color:var(--t3)!important;font-size:12.5px;font-weight:500;text-decoration:underline;text-underline-offset:3px;cursor:pointer}.link-discreto:hover{color:var(--ink)!important}
.trocar-endereco{display:flex;align-items:center;gap:16px;max-width:1100px;margin-top:12px;padding:12px 16px;border:1px dashed var(--borda2);border-radius:var(--raio)}
.trocar-endereco div{display:grid;gap:2px;flex:1}.trocar-endereco small{color:var(--t3);font-size:12.5px}
@media (max-width:900px){.dobras.duas{grid-template-columns:1fr}.trocar-endereco{flex-direction:column;align-items:flex-start}}
.dobra{position:relative;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);margin-bottom:12px}.dobras .dobra{margin:0}
.dobra>summary{display:flex;align-items:center;gap:10px;min-height:54px;padding:10px 14px;cursor:pointer;list-style:none;border-radius:var(--raio)}.dobra>summary::-webkit-details-marker{display:none}
.dobra>summary:hover{background:var(--s2)}.dobra>summary>.ico{flex:none;transition:transform .2s;color:var(--t3)}.dobra[open]>summary>.ico{transform:rotate(90deg)}
.dobra>summary b{font-size:15px}.dobra>summary small{color:var(--t3)}.dobra>summary .selo{margin-left:auto}
.dobra-caixa{position:relative;margin-bottom:12px}.dobra-caixa>.dobra{margin:0}.dobra-acoes{position:absolute;right:12px;top:10px;z-index:1}.dobra-caixa>.dobra>summary{padding-right:240px}
.dobra-corpo{padding:4px 16px 16px;border-top:1px solid var(--borda)}.dobra-corpo>.adm-aula:first-child{border-top:0}.adm-modulo.dobra .dobra-corpo{padding:0}
.pasta-grupos.dobra{background:var(--s2)}.pasta-grupos.dobra>.dobra-corpo{padding:10px}
.form-dobra{display:grid;gap:12px;padding-top:12px}.selo.s-ok{color:var(--ok);background:color-mix(in srgb,var(--ok) 12%,transparent)}
@media (max-width:720px){.dobra-acoes{position:static;padding:8px 0 0;justify-content:flex-end}.dobra-caixa>.dobra>summary{padding-right:14px}}
.filtro-direita{display:flex;gap:10px;align-items:center;margin-left:auto}.filtro-origem{width:auto;height:36px;padding:0 10px;font-size:13.5px}
@media (max-width:720px){.filtro-direita{width:100%;margin-left:0}.filtro-direita .busca-campo{flex:1}}
/* Nome do logo com medidas fixas (calculadas uma vez e gravadas aqui, sem conta no navegador). Cada idioma tem a sua
   diagramação: as duas linhas com a mesma largura; o topo da maiúscula de cima no topo da coroa e a LINHA DE BASE da palavra
   de baixo exatamente na base da coroa (as letras redondas, como o "o", passam um fio, como manda a tipografia).
   Menu: coroa de 24px. Topo do celular: coroa de 30px. Se mudar a fonte, o texto ou o tamanho da coroa, refazer as contas. */
/* Menu lateral alinhado (pedido do dono, 30/10/2026): coroa e ícones no eixo de 40px (o centro do menu encolhido) e
   cabeçalho com a mesma altura nos dois estados, então ao encolher nada anda (nem para o lado nem para baixo): só os
   nomes saem. A setinha fica ao lado do logo (aberto) e no meio, entre a coroa e a casinha (encolhido).
   ATENÇÃO: este bloco é separado do estilo do logo; ao mexer no logo, não apagar. */
@media (min-width:861px){
  .lateral .cabeca{flex-direction:row;align-items:flex-start;height:72px;min-height:0;padding:22px 12px 0 22.2px}
  .lateral .cabeca .marca{min-height:24px}.lateral .cabeca .encolher{width:24px;height:24px;margin-top:0}
  html.menu-encolhido .lateral .cabeca{flex-direction:column;align-items:center;gap:2px;height:72px;padding:22px 0 0}
  html.menu-encolhido .lateral .cabeca .encolher{height:20px;min-height:20px;flex:none;margin-top:12px}
  .lateral .cabeca,html.menu-encolhido .lateral .cabeca{overflow:visible}
  .lateral nav{padding:4px 14px 14px}
  .lateral a.item,html.menu-encolhido .lateral a.item{justify-content:flex-start;padding:0 13px 0 16.5px}
  .rot-admin{margin:4px 0 6px 30.5px}
  html.menu-encolhido .pe-menu{align-items:center}
}
.adm-cartoes{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}.adm-cartoes.em-pe{grid-template-columns:repeat(auto-fill,minmax(215px,1fr))}
.adm-cartao{display:flex;flex-direction:column;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);overflow:hidden;transition:border-color .2s,transform .2s}
.adm-cartao:hover{border-color:var(--borda-hover);transform:translateY(-2px)}
.adm-cartao-img{position:relative;display:block;aspect-ratio:4/3;background:var(--s2);overflow:hidden}.adm-cartao-img.em-pe{aspect-ratio:4/5}
.adm-cartao-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}.adm-cartao.escondido .adm-cartao-img img{filter:grayscale(1);opacity:.6}
.adm-cartao-txt{display:grid;gap:2px;padding:12px 14px 4px}.adm-cartao-txt b{font-size:15px;font-weight:600;line-height:1.3}.adm-cartao-txt small{color:var(--t3);font-size:12.5px}
.adm-cartao-acoes{display:flex;align-items:center;gap:8px;padding:10px 14px 14px;margin-top:auto}.adm-cartao-acoes .empurra{flex:1}
.adm-cartao,.adm-banner{position:relative}.adm-banner .adm-cartao-mover{left:20px;top:20px}.adm-cartao-mover{position:absolute;left:8px;top:8px;z-index:2;opacity:.92}.adm-cartao-mover .mover{gap:4px}
.adm-cartao-mover .icone-btn{width:30px;height:30px;border:0;border-radius:8px;background:rgba(10,10,10,.72)!important;color:#fff;backdrop-filter:blur(6px)}.adm-cartao-mover .icone-btn:hover{background:var(--grad)!important;color:#111}
.adm-cartao-acoes .botao.pequeno{min-height:32px;padding:0 9px;gap:4px;font-size:12.5px;flex:none}
@media (max-width:860px){.adm-cartoes,.adm-cartoes.em-pe{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.adm-cartao-txt{padding:10px 10px 2px}.adm-cartao-txt b{font-size:13.5px}
  .adm-cartao-acoes{padding:8px 10px 10px;gap:6px}.adm-cartao-acoes .botao.pequeno{flex:1;padding:0 6px}.adm-cartao-mover .icone-btn{width:28px;height:28px}}
.resumo-membros{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:20px}
.resumo-membros>div,.resumo-membros>a{display:grid;gap:2px;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.resumo-membros>a{color:inherit;text-decoration:none;transition:border-color .2s}.resumo-membros>a:hover{border-color:var(--ouro)}
.m-tabela .m-situacao{display:flex;align-items:center;min-width:0}.m-ate{font-size:13px;white-space:nowrap}.m-ate .m-vence{font-size:13px;color:var(--t2)}.m-ate .m-vence.perto{color:var(--chip-ink);font-weight:600}.m-vence{color:var(--t3);font-size:11.5px;white-space:nowrap}.m-vence.perto{color:var(--chip-ink);font-weight:600}.m-total{color:var(--t3);font-size:12.5px;margin:-8px 0 10px}.ir-pag{margin-left:8px}.ir-pag label{display:flex;align-items:center;gap:6px;color:var(--t2);font-size:13px}.ir-pag input{width:70px;height:40px;padding:0 8px;border:1px solid var(--borda2);border-radius:10px;background:var(--sup);color:var(--ink);font:inherit;font-size:14px}.filtros{position:relative;z-index:30}.cab-f{display:inline-flex;align-items:center;gap:4px;position:relative}.cab-filtrando{margin-left:4px;color:var(--chip-ink);font-size:10.5px;letter-spacing:0;text-transform:none;font-weight:600}.funil{position:relative}.funil summary{display:grid;place-items:center;width:24px;height:24px;border-radius:6px;color:var(--t3);cursor:pointer;list-style:none}.funil summary::-webkit-details-marker{display:none}.funil summary:hover{color:var(--ink);background:var(--borda)}.funil.on summary{color:var(--ouro);background:var(--chip)}.funil-pop{position:absolute;left:-8px;top:calc(100% + 8px);z-index:40;display:grid;gap:2px;min-width:220px;padding:10px;border:1px solid var(--borda);border-radius:12px;background:var(--sup);box-shadow:0 14px 34px rgba(0,0,0,.18);text-transform:none;letter-spacing:0;font-weight:400}.funil-pop b{padding:6px 8px 4px;color:var(--t3);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}.funil-pop a{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border-radius:8px;color:var(--ink);font-size:13.5px;text-decoration:none}.funil-pop a:hover{background:var(--s2)}.funil-pop a.on{font-weight:600}.funil-pop a .ico{color:var(--ouro)}.funil-pop a small{color:var(--t3);font-size:12px;margin-left:auto}.funil-datas{display:grid;gap:8px;margin-top:6px;padding-top:6px;border-top:1px solid var(--borda)}.funil-datas label{display:grid;gap:4px;padding:0 8px;font-size:12.5px;color:var(--t2)}.funil-datas input{height:36px;padding:0 8px;border:1px solid var(--borda2);border-radius:8px;background:transparent;color:var(--ink);font:inherit}.funil-acoes{display:flex;justify-content:flex-end;gap:8px;padding:0 8px 4px}.m-cab .cab-f:nth-last-child(2) .funil-pop,.m-cab .cab-f:nth-last-child(3) .funil-pop{left:auto;right:-8px}@media (max-width:720px){.m-linha .m-ultimo{display:block}.m-linha .m-data{display:none}.m-linha .m-ate{grid-column:1/-1;font-size:12.5px}.m-tabela>.m-cab{display:flex;flex-wrap:wrap;gap:6px 16px;padding:8px 12px}.m-tabela>.m-cab>span:not(.cab-f){display:none}.funil-pop{left:auto;right:-8px}.m-tabela>.m-cab>.cab-f:first-of-type .funil-pop{left:-8px;right:auto}}.filtro-data{position:relative}.filtro-data summary{display:flex;align-items:center;gap:6px;height:36px;padding:0 10px;border:1px solid var(--borda2);border-radius:9px;color:var(--t2);font-size:13.5px;cursor:pointer;list-style:none;white-space:nowrap}.filtro-data summary::-webkit-details-marker{display:none}.filtro-data.on summary{color:var(--chip-ink);border-color:var(--ouro);background:var(--chip)}.filtro-data-pop{position:absolute;right:0;top:calc(100% + 6px);z-index:20;display:grid;gap:10px;width:240px;padding:14px;border:1px solid var(--borda);border-radius:12px;background:var(--sup);box-shadow:0 12px 32px rgba(0,0,0,.18)}.filtro-data-pop label{display:grid;gap:4px;font-size:12.5px;color:var(--t2)}.filtro-data-pop input{height:36px;padding:0 8px;border:1px solid var(--borda2);border-radius:8px;background:transparent;color:var(--ink);font:inherit}.filtro-data-acoes{display:flex;justify-content:flex-end;gap:8px}
.resumo-membros b{font-size:22px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.1}.resumo-membros small{color:var(--t3);font-size:12.5px}
.resumo-membros .atencao{border-color:color-mix(in srgb,var(--ouro) 60%,transparent);background:var(--chip)}.resumo-membros .atencao small{color:var(--chip-ink)}
.m-tabela{border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.m-tabela>.m-cab{border-radius:var(--raio) var(--raio) 0 0}.m-tabela>.m-linha:last-child{border-radius:0 0 var(--raio) var(--raio)}
.m-cab,.m-linha{display:grid;grid-template-columns:minmax(240px,1.6fr) minmax(84px,.45fr) minmax(96px,.5fr) minmax(120px,.6fr) minmax(96px,.5fr) minmax(130px,.65fr) 84px;gap:14px;align-items:center;padding:10px 16px}
.m-linha[data-linha-abre]{cursor:pointer}.m-ultimo{font-size:13.5px;color:var(--t2)}
.m-cab{background:var(--s2);border-bottom:1px solid var(--borda);color:var(--t3);font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.m-linha{border-top:1px solid var(--borda)}.m-cab+.m-linha{border-top:0}.m-linha:hover{background:var(--s2)}.m-linha.inativo .m-quem{opacity:.6}
.m-quem{display:flex;align-items:center;gap:12px;min-width:0}.m-quem>div{display:grid;min-width:0}.m-quem b{font-size:14.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m-quem small{color:var(--t3);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m-grupos{display:flex;flex-wrap:wrap;gap:4px;min-width:0}.m-grupos .selo{max-width:100%;overflow:hidden;text-overflow:ellipsis}.m-nada{color:var(--t3)}
.m-data{color:var(--t2);font-size:13px;font-variant-numeric:tabular-nums}.m-acoes{display:flex;justify-content:flex-end}.m-acoes .icone-btn{width:36px;height:36px}
.plat.manual{background:#6B7280}.selo.s-erro{color:#fff;background:var(--erro)}.selo.s-aviso{color:var(--chip-ink);background:var(--chip)}
@media (max-width:1100px){.resumo-membros{grid-template-columns:repeat(3,minmax(0,1fr))}.m-cab,.m-linha{grid-template-columns:minmax(190px,1.6fr) minmax(80px,.5fr) minmax(96px,.55fr) minmax(92px,.5fr) minmax(124px,.65fr) 84px}.m-ultimo{display:none}.m-cab span:nth-child(4){display:none}}
@media (max-width:720px){.resumo-membros{display:flex;overflow-x:auto;gap:8px;scrollbar-width:none;margin:0 -16px 16px;padding:0 16px}.resumo-membros>div{flex:0 0 auto;min-width:108px;padding:10px 12px}.resumo-membros b{font-size:18px}.m-cab{display:none}
  .m-linha{grid-template-columns:1fr auto;grid-template-areas:"quem acoes" "ultimo ultimo" "rodape rodape";gap:8px;padding:12px}.m-quem{grid-area:quem}.m-acoes{grid-area:acoes}.m-ultimo{grid-area:ultimo;font-size:12.5px}.m-ultimo::before{content:"Último acesso: ";color:var(--t3)}
  .m-origem,.m-situacao{display:inline-flex}.m-linha .m-origem{grid-area:rodape}.m-linha .m-situacao{grid-area:rodape;justify-self:end}.m-data{display:none}}
.alca{display:inline-grid;place-items:center;width:30px;height:30px;min-height:0;padding:0;border:0;border-radius:8px;background:transparent!important;color:var(--t3);cursor:grab;touch-action:none;flex:none}
.alca:hover{color:var(--ink);background:var(--s2)!important}.alca .ico{fill:currentColor;stroke:none}
.adm-cartao-mover .alca{width:30px;height:30px;background:rgba(10,10,10,.72)!important;color:#fff;backdrop-filter:blur(6px)}.adm-cartao-mover .alca:hover{background:var(--grad)!important;color:#111}
[data-id].arrastando-origem{opacity:.35;outline:2px dashed var(--ouro);outline-offset:-2px;border-radius:var(--raio)}
.fantasma-arraste{position:fixed;z-index:200;pointer-events:none;opacity:.95;box-shadow:0 22px 50px -12px rgba(0,0,0,.45);transform:rotate(-1.2deg) scale(1.02);border-radius:var(--raio);background:var(--sup)}
body.arrastando,body.arrastando *{cursor:grabbing!important;user-select:none}
.aviso-ordem{position:fixed;left:50%;bottom:24px;z-index:210;transform:translateX(-50%);padding:10px 16px;border-radius:10px;background:var(--preto);color:#fff;font-size:13.5px;box-shadow:var(--sombra-pop)}
/* Administrativo no celular: botões do topo quebram de linha; nas listas, os botões viram só ícones e ficam na
   mesma linha do item (sem uma segunda linha para cada módulo, pasta ou aula) */
@media (max-width:860px){
  .titulo-pag .acoes{flex-wrap:wrap;gap:8px}.titulo-pag .acoes .botao{flex:1 1 auto}
  .dobra-acoes,.adm-aula .adm-acoes,.adm-linha .adm-acoes{width:auto!important;flex-wrap:nowrap;gap:4px}
  .dobra-acoes .botao.pequeno,.adm-aula .adm-acoes .botao.pequeno,.adm-linha .adm-acoes .botao.pequeno{width:34px;min-height:34px;padding:0;gap:0;font-size:0}
  .dobra-acoes .mover .icone-btn,.adm-aula .mover .icone-btn,.adm-linha .mover .icone-btn{width:30px;height:34px}
  .dobra-caixa>.dobra-acoes{position:absolute;right:10px;top:10px;padding:0}.dobra-caixa>.dobra>summary{padding-right:120px}
  .adm-aula{flex-wrap:nowrap;gap:8px;padding:8px 10px}.adm-aula .n{display:none}.adm-aula .adm-mini{width:56px;height:32px}.adm-aula .idiomas-aula{display:none}
  .adm-linha{flex-wrap:nowrap;gap:10px;padding:10px}.adm-linha .adm-thumb.deitada{width:64px;height:48px}.adm-linha .adm-thumb.em-pe{width:40px;height:54px}
  .adm-linha:has(.plat){flex-wrap:wrap;row-gap:6px}.adm-linha:has(.plat) .adm-info{flex:1 1 60%}.adm-linha:has(.plat) .seta-grupo{order:3;flex:1 1 auto}.adm-linha:has(.plat) .adm-acoes{order:4}
  .adm-linha.membro{flex-wrap:wrap}.adm-linha.membro .chips-grupo{order:3;flex-basis:100%}.adm-linha.membro .origem{display:none}
}
.nome-logo{display:block;position:relative;flex:none;font-family:Sora,var(--fonte);font-weight:600;line-height:1;letter-spacing:0;color:#fff;white-space:nowrap}
.nome-logo .n1,.nome-logo .n2{position:absolute;left:0}.nome-logo .n2{display:flex;align-items:center;gap:.12em}
.nome-logo b{font-weight:600;color:var(--ouro)}.nome-logo small{font-size:.62em;font-weight:600;color:var(--ouro);letter-spacing:0}
/* Nome grande das capas: branco com um degradê leve para creme quente (04/11/2026). Com ?marcas na página, mostra a ideia das cores de cada ferramenta (só para comparar) */
.capa-txt b,.capa-txt small{text-shadow:none;filter:drop-shadow(0 .8cqw 2.4cqw rgba(0,0,0,.65))}
.capa-txt b{background:linear-gradient(to top right,#FFD9A3 0%,#FFF3E2 45%,#FFFFFF 75%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
html.marcas .capa-txt b[data-marca=canva]{background-image:linear-gradient(to top right,#00C4CC,#A57BFF)}html.marcas .capa-txt b[data-marca=photoshop]{background-image:linear-gradient(to top right,#31A8FF,#9ED6FF)}
html.marcas .capa-txt b[data-marca=capcut]{background-image:linear-gradient(to top right,#FFFFFF,#25F4EE)}html.marcas .capa-txt b[data-marca=pix]{background-image:linear-gradient(to top right,#32BCAD,#9AF0E6)}
html.marcas .capa-txt b[data-marca=meta]{background-image:linear-gradient(to top right,#0081FB,#A9D4FF)}html.marcas .capa-txt b[data-marca=claude]{background-image:linear-gradient(to top right,#D97757,#FFC2A8)}
html.marcas .capa-txt b[data-marca=gemini]{background-image:linear-gradient(to top right,#4796E3,#C38AE8)}html.marcas .capa-txt b[data-marca=chatgpt]{background-image:linear-gradient(to top right,#10A37F,#9CF0D6)}
.nome-logo b,.nome-logo small,.capa-txt small,.slide-b:not([class*="tom-"]) h1 em{background:var(--grad-txt);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
[data-theme="light"] .entrar-marca .nome-logo b,[data-theme="light"] .entrar-marca .nome-logo small{background:none;-webkit-text-fill-color:#E07000}
.marca .nome-logo.logo{width:56.5px;height:24px}.nome-logo.logo .n1{font-size:12.06px;top:-.53px}.nome-logo.logo .n2{font-size:14.28px;top:12px}
.nome-logo.logo-cel{width:70.63px;height:30px}.nome-logo.logo-cel .n1{font-size:15.08px;top:-1.04px}.nome-logo.logo-cel .n2{font-size:17.85px;top:16px}
html[lang="es"] .marca .nome-logo.logo{width:58.54px}html[lang="es"] .nome-logo.logo .n1{font-size:11.76px;top:-.88px}html[lang="es"] .nome-logo.logo .n2{font-size:14.25px;top:12.01px}
html[lang="es"] .nome-logo.logo-cel{width:73.18px}html[lang="es"] .nome-logo.logo-cel .n1{font-size:14.71px;top:-.35px}html[lang="es"] .nome-logo.logo-cel .n2{font-size:17.81px;top:16.01px}
html[lang="en"] .marca .nome-logo.logo{width:59.6px}html[lang="en"] .nome-logo.logo .n1{font-size:12.57px;top:-.29px}html[lang="en"] .nome-logo.logo .n2{font-size:12.12px;top:14px}
html[lang="en"] .nome-logo.logo-cel{width:74.5px}html[lang="en"] .nome-logo.logo-cel .n1{font-size:15.72px;top:-.86px}html[lang="en"] .nome-logo.logo-cel .n2{font-size:15.15px;top:17px}
html[lang="en"] .nome-logo small{display:none}
.marca-cel .simb-cel{height:30px;width:auto;flex:none}html.menu-encolhido .marca .nome-logo{display:none}
.sep-menu{display:block;height:1px;margin:10px 2px;background:rgba(255,255,255,.08)}
/* janelas compactas: imagem numa coluna estreita, campos ao lado, tudo menor */
.janela-form .janela-corpo{gap:12px;padding:16px 20px}.janela-form .campo{gap:4px}.janela-form .campo>span{font-size:12.5px}
.janela-form input:not([type=checkbox]):not([type=radio]):not([type=file]),.janela-form select{padding:8px 12px;min-height:40px}.janela-form textarea{padding:8px 12px}
.janela-form .linha-2{gap:10px 14px}.janela-form .linha-2>div{gap:10px}.janela-form .marcar{min-height:32px;font-size:13.5px}
.janela-form .janela-cab{padding:10px 12px 10px 20px}.janela-form .rodape-janela{padding:12px 20px}
.linha-2.com-img{grid-template-columns:200px minmax(0,1fr)}.linha-2.com-img.larga-img{grid-template-columns:300px minmax(0,1fr)}
.linha-2.com-img .enviar-img{min-height:0}
.venda-dobra>summary{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:0 12px;border:1px dashed var(--borda2);border-radius:9px;color:var(--t2);font-size:13.5px;font-weight:500;cursor:pointer;list-style:none}
.venda-dobra>summary::-webkit-details-marker{display:none}.venda-dobra>summary:hover{color:var(--t1);border-color:var(--ouro)}.venda-dobra[open]>summary{display:none}
.venda-campos{display:grid;gap:6px;padding:10px 12px;border:1px dashed var(--borda2);border-radius:10px;background:var(--s2)}
/* seções e registros */
.secao-adm{margin-top:28px}.secao-adm>h2,.secao-adm-cab h2{font-size:17px;margin:0 0 12px}.secao-adm-cab{display:flex;align-items:center;gap:12px;margin-bottom:12px}.secao-adm-cab h2{margin:0}.secao-adm-cab .botao{margin-left:auto}
.registros{display:grid;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);overflow:hidden}
.registro{display:grid;grid-template-columns:130px 160px minmax(0,1fr);gap:2px 14px;padding:10px 14px;border-top:1px solid var(--borda);font-size:13px}.registro:first-child{border-top:0}
.registro small{color:var(--t3);grid-row:span 2}.registro small.reg-dados{grid-row:auto;grid-column:2/-1;font-size:12px}.registro small.reg-dados a{color:var(--t2)}.registro b{font-weight:600}.registro span{color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.registro em{grid-column:2/-1;font-style:normal;color:var(--t2)}
.num-lado{display:grid;justify-items:center;min-width:64px;flex:none}.num-lado b{font-size:16px}.num-lado small{color:var(--t3);font-size:11.5px}
.plat{flex:none;padding:3px 9px;border-radius:6px;font-size:11.5px;font-weight:600;color:#fff;background:#6B7280}.plat.kiwify{background:#16A34A}.plat.hotmart{background:#F04E23}
.seta-grupo{display:flex;align-items:center;gap:6px;flex:none;font-size:13px;color:var(--t2)}.seta-grupo .ico{color:var(--seta)}
/* Produto da venda (06/11/2026): modo de liberar, linhas oferta → grupo → prazo */
.pv-modo{display:grid;grid-template-columns:1fr 1fr;gap:8px}.pv-modo label{display:grid;grid-template-columns:auto 1fr;column-gap:8px;align-items:center;padding:10px 12px;border:1px solid var(--borda);border-radius:12px;font-size:14px;font-weight:600;cursor:pointer}
.pv-modo label small{grid-column:2;font-size:12px;font-weight:400;color:var(--t2)}.pv-modo input{width:16px;height:16px;accent-color:var(--ouro);margin:0}.pv-modo label:has(input:checked){border-color:var(--ouro);background:color-mix(in srgb,var(--ouro) 7%,transparent)}
.pv-cab{display:grid;grid-template-columns:minmax(0,1.1fr) 112px minmax(0,1fr) 150px 40px;gap:8px;margin:2px 0 6px;font-size:12px;color:var(--t2)}
.pv-lista{display:grid;gap:8px;margin-bottom:10px}.pv-linha{display:grid;grid-template-columns:minmax(0,1.1fr) 112px minmax(0,1fr) 150px 40px;gap:8px;align-items:center}.pv-uma{grid-template-columns:minmax(0,1fr) 150px}.aviso-num{display:flex;flex-wrap:wrap;gap:10px 26px;margin:6px 0 10px}.aviso-num span{display:grid}.aviso-num b{font-size:20px;font-weight:700}.aviso-num small{font-size:12px;color:var(--t2)}.aviso-barra{height:8px;border-radius:99px;background:var(--borda);overflow:hidden;margin-bottom:10px}.aviso-barra i{display:block;height:100%;background:var(--grad,#FFA62B)}.reg-de-novo{display:inline;margin-left:8px}.reg-de-novo .botao{min-height:28px;padding:0 10px;font-size:12px}
.pv-linha .icone-btn{width:40px;height:44px}.pv-prazo{display:flex;min-width:0}.pv-prazo select,.pv-prazo-btn{width:100%}
.pv-prazo-btn{display:inline-flex;align-items:center;gap:6px;height:44px;padding:0 12px;border:1px solid var(--borda);border-radius:10px;background:transparent;color:var(--t2);font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}.pv-prazo-btn:hover{color:var(--ink);border-color:var(--ouro)}.pv-prazo-btn.tem{color:var(--ink);border-color:var(--ouro)}.pv-prazo-btn.tem .ico{color:var(--ouro)}
[data-theme="dark"] .pv-prazo-btn{color:var(--t2);background:transparent}
.pv-ofertas{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:3px}.pv-ofertas li{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--t2)}.pv-ofertas li .ico{color:var(--seta)}.pv-ofertas li b{color:var(--ink);font-weight:600;font-size:12.5px}.pv-ofertas li em{font-style:normal;color:var(--t3)}
@media (max-width:640px){.pv-modo{grid-template-columns:1fr}.pv-cab{display:none}.pv-linha{grid-template-columns:minmax(0,1fr) 40px}.pv-linha input{grid-column:1}.pv-linha select{grid-column:1}.pv-linha .pv-prazo{grid-column:1}.pv-lista .pv-linha{padding-bottom:10px;border-bottom:1px dashed var(--borda)}.pv-linha>*{grid-column:1}.pv-linha>[data-pv-tirar]{grid-column:2;grid-row:1;width:40px;height:44px;align-self:start}.pv-uma{grid-template-columns:1fr}}
.adm-linha.aviso-linha{border-color:color-mix(in srgb,var(--ouro) 55%,transparent);background:var(--chip)}
.adm-linha.membro .adm-info{flex:1 1 220px}.chips-grupo{display:flex;flex-wrap:wrap;gap:6px;flex:1 1 200px}.origem{color:var(--t3);font-size:12px;flex:none;min-width:150px;text-align:right}
.adm-linha.inativo{opacity:.65}.txt-erro{color:var(--erro)}
.avatar-ini{display:grid;place-items:center;width:38px;height:38px;border-radius:999px;background:var(--chip);color:var(--chip-ink);font-weight:600;flex:none}
.marcar-grade{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 12px}
.grupo-item{position:relative;display:flex;align-items:center;justify-content:space-between;gap:6px;min-width:0}.grupo-item .marcar{min-width:0}.vence-btn{flex:none;display:grid;place-items:center;width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:var(--t2);opacity:.45;cursor:pointer}.vence-btn:hover{opacity:1;background:var(--borda)}.vence-btn.tem{opacity:1;color:var(--ouro)}.vence-pop{position:absolute;right:calc(100% + 2px);top:-8px;z-index:5;display:grid;gap:6px;width:236px;padding:10px;border:1px solid var(--borda);border-radius:12px;background:var(--sup);box-shadow:0 12px 30px rgba(0,0,0,.18)}.vence-pop.acima{top:auto;bottom:-8px}.vence-pop.direita{right:auto;left:calc(100% + 2px)}.vence-pop[hidden]{display:none}.vence-pop b{font-size:13px}.vence-pop input[type=date]{font:inherit;font-size:13.5px;padding:6px 8px;border:1px solid var(--borda);border-radius:8px;background:transparent;color:var(--ink)}.vence-pop small{color:var(--t2);font-size:12.5px;line-height:1.35}.vence-pop small.fim{color:var(--erro,#b3261e)}.vence-acoes{display:flex;align-items:center;justify-content:space-between;gap:8px}.vence-acoes .botao{min-height:32px;padding:0 10px;font-size:12.5px}.vence-mao{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--t2);cursor:pointer;white-space:nowrap}.vence-mao input{width:16px;height:16px;accent-color:var(--ouro)}.vence-btn.mao{opacity:1;box-shadow:inset 0 0 0 1.5px var(--ouro)}.linha-email{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end}.m-origem-info>div{display:flex;align-items:center;gap:8px;min-height:44px;white-space:nowrap}.m-quem-add{color:var(--t2);font-size:13px}.m-quem-add b{color:var(--ink);font-weight:600}.janela-form .m-detalhe{margin-top:4px}@media (max-width:560px){.linha-email{grid-template-columns:1fr}}.eventos-lista{display:grid;gap:6px;margin:2px 0 6px}.eventos-lista>span{font-size:12.5px;color:var(--t2)}.eventos-lista ol{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}.eventos-lista li{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border:1px solid var(--borda);border-radius:8px;font-size:12.5px;color:var(--t3)}.eventos-lista li i{width:13px}.eventos-lista li.sim{color:var(--ink);border-color:var(--ouro);font-weight:600}.eventos-lista li.sim .ico{color:var(--ouro)}.plat-modo{display:flex;flex-wrap:wrap;gap:6px 22px;margin:4px 0 2px}.plat-webhooks{display:grid;gap:8px}.plat-webhook{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) auto auto auto;gap:8px;align-items:center}.plat-webhook small{color:var(--t3);font-size:12px;white-space:nowrap}.plat-webhook.novo{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) auto;padding-top:8px;border-top:1px dashed var(--borda)}.plat-acoes{display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;margin-top:14px;padding-top:12px;border-top:1px solid var(--borda)}.plat-nome{display:flex;gap:8px;align-items:center}.plat-nome input{height:36px;width:220px}.perigo-txt{color:var(--erro,#b3261e)!important}.dobra summary .plat{margin-left:2px}@media (max-width:720px){.plat-webhook,.plat-webhook.novo{grid-template-columns:1fr}.plat-nome input{width:100%}}.historico{margin-top:8px}.historico summary{cursor:pointer;font-size:12.5px;font-weight:600;color:var(--t2);list-style:revert}.historico[open] summary{margin-bottom:6px}
.grupos-escolha{gap:10px}.grupos-topo{display:flex;align-items:center;justify-content:space-between;gap:12px}.grupos-topo .marcar{min-height:32px;font-size:13.5px;font-weight:600;color:var(--t2)}
.grupo-pasta{border:1px solid var(--borda);border-radius:10px;padding:4px 12px 8px;background:var(--s2)}
.grupo-pasta{padding:0 12px}.pasta-cab{display:flex;align-items:center;gap:10px;min-height:44px}.pasta-cab>input{width:18px;height:18px;accent-color:var(--ouro);flex:none;margin:0}
.pasta-abre{flex:1;display:flex;align-items:center;gap:8px;min-height:44px;padding:0;border:0;background:transparent!important;color:var(--ink);font:inherit;font-size:14px;text-align:left;cursor:pointer;transform:none!important}
.pasta-abre small{color:var(--t3);font-weight:500}.pasta-abre .ico{margin-left:auto;color:var(--t3);transition:transform .2s}.pasta-abre[aria-expanded="true"] .ico{transform:rotate(180deg)}
.grupo-pasta .marcar-grade{padding:6px 0 10px;border-top:1px solid var(--borda)}
/* Detalhe do membro (ao editar): quando entrou, último acesso e o que fez por último */
.m-detalhe{display:grid;gap:10px;padding:12px 14px;margin-bottom:4px;border:1px solid var(--borda);border-radius:10px;background:var(--s2)}.m-detalhe:empty{display:none}
.m-detalhe .datas{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:13.5px}.m-detalhe .datas span{color:var(--t3)}.m-detalhe .datas b{font-weight:600;color:var(--ink)}
.m-detalhe h3{margin:2px 0 0;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--t3)}
.m-detalhe ol{list-style:none;margin:0;padding:0;display:grid;gap:6px;max-height:190px;overflow:auto}.m-detalhe li{display:grid;grid-template-columns:118px 1fr;gap:10px;font-size:13px}.m-detalhe li small{color:var(--t3)}
/* Analytics no formato de painel: cartões com ícone, gráfico ao lado da lista, rankings e atividade */
.an-periodo{flex:0 0 auto;-webkit-mask-image:none;mask-image:none}.an-sub{margin:-14px 0 20px;color:var(--t3);font-size:14px}
.an-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:16px}
.an-kpi{display:grid;gap:6px;padding:16px 18px;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup)}
.an-kpi-cab{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;font-weight:500;color:var(--t2)}
.an-kpi-ic{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;color:var(--chip-ink);background:var(--chip);flex:none}
.an-kpi b{font-size:30px;font-weight:700;line-height:1.1}.an-kpi small{color:var(--t3);font-size:12.5px}.an-kpi small.sobe{color:var(--ok);font-weight:600}
.an-duas{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px;margin-bottom:16px}
.an-painel-cab{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:6px}.an-painel-cab h3{margin:0}.an-painel-cab small{color:var(--t3);font-size:12.5px}
.an-ver{color:var(--chip-ink);font-size:13px;font-weight:600;text-decoration:none}.an-ver:hover{text-decoration:underline}
.an-top,.an-novos{list-style:none;margin:8px 0 0;padding:0;display:grid}.an-top li,.an-novos li{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--borda)}.an-top li:first-child,.an-novos li:first-child{border-top:0}
.an-top img,.an-sem-img{width:40px;height:50px;object-fit:cover;border-radius:6px;background:var(--s2);flex:none}
.an-top-txt{display:grid;gap:2px;min-width:0;flex:1}.an-top-txt b{font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.an-top-txt small{color:var(--t3);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.an-top-n{font-size:16px;font-weight:700;flex:none}
.an-titulo{margin:26px 0 12px;font-size:18px}
.an-quatro{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.an-quatro .an-top li{min-height:52px}
@media (max-width:900px){.an-quatro{grid-template-columns:1fr}}.an-nota{margin-top:16px}
@media (max-width:1100px){.an-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.an-duas{grid-template-columns:1fr}}
/* Analytics: blocos separados (Agora, Acessos, Uso do conteúdo, Atividade recente) */
.an-bloco{margin:0 0 28px}.an-bloco-cab{display:flex;align-items:baseline;gap:6px 14px;flex-wrap:wrap;margin:0 0 12px}.an-bloco-cab h2{margin:0;font-size:18px}.an-bloco-cab small{color:var(--t3);font-size:13px}
.an-cartoes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:16px}.an-cartoes.cinco{grid-template-columns:repeat(5,minmax(0,1fr))}
.an-cartao{display:grid;gap:4px;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.an-cartao b{display:flex;align-items:center;gap:8px;font-size:26px;font-weight:600;line-height:1.1}.an-cartao small{color:var(--t3);font-size:12.5px}
.an-vivo{width:9px;height:9px;border-radius:99px;background:var(--ok);box-shadow:0 0 0 0 color-mix(in srgb,var(--ok) 60%,transparent);animation:vivo 2s infinite}
@keyframes vivo{70%{box-shadow:0 0 0 8px transparent}100%{box-shadow:0 0 0 0 transparent}}@media (prefers-reduced-motion:reduce){.an-vivo{animation:none}}
.an-graficos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.an-rodape{margin:8px 0 0;color:var(--t3);font-size:12.5px}
.an-painel h3{margin:0 0 12px;font-size:15px}
.an-painel,.an-bloco,.graf{--graf:#D96E00}[data-theme="dark"] .an-painel,[data-theme="dark"] .an-bloco,[data-theme="dark"] .graf{--graf:#FF9A2E}.an-duas .g-area-graf{height:250px}.graf{margin:0}
.g-area-graf{position:relative;height:170px;margin:14px 6px 0 34px}
.g-area-graf svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.g-grade{position:absolute;left:0;right:0;border-top:1px solid var(--borda);pointer-events:none}.g-grade i{position:absolute;right:calc(100% + 8px);transform:translateY(-50%);font-style:normal;font-size:11px;color:var(--t3);white-space:nowrap}
.g-datas{position:relative;height:20px;margin:6px 6px 0 34px}.g-datas span{position:absolute;top:0;transform:translateX(-50%);font-size:11px;color:var(--t3);white-space:nowrap}
.g-valor{position:absolute;transform:translate(-50%,calc(-100% - 6px));font-size:12px;font-weight:600;color:var(--ink);pointer-events:none}
.g-barra{fill:var(--graf)}.g-linha{fill:none;stroke:var(--graf);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}.g-area{fill:var(--graf);opacity:.12}
.g-mira{position:absolute;top:0;bottom:0;border-left:1px dashed var(--t3);pointer-events:none}
.g-ponto{position:absolute;width:10px;height:10px;border-radius:99px;background:var(--graf);box-shadow:0 0 0 2px var(--sup);transform:translate(-50%,-50%);pointer-events:none}
.g-toque{position:absolute;top:0;bottom:0;cursor:crosshair}.g-toque.on{background:color-mix(in srgb,var(--ink) 5%,transparent)}
.g-dica{position:absolute;z-index:2;transform:translate(-50%,calc(-100% - 12px));padding:6px 10px;border-radius:8px;background:var(--ink);color:var(--bg);font-size:12.5px;font-weight:500;white-space:nowrap;pointer-events:none;box-shadow:var(--sombra-pop)}
.g-vazio{position:absolute;inset:38% 0 auto;margin:0;text-align:center;color:var(--t3);font-size:13px}
.g-tabela{margin-top:8px;font-size:12.5px;color:var(--t3)}.g-tabela summary{cursor:pointer}.g-tabela table{width:100%;margin-top:8px;border-collapse:collapse}.g-tabela td,.g-tabela th{padding:4px 6px;border-bottom:1px solid var(--borda);text-align:left;color:var(--t2)}.g-tabela td:last-child,.g-tabela th:last-child{text-align:right}
.g-tabela tbody{display:block;max-height:220px;overflow:auto}.g-tabela thead,.g-tabela tbody tr{display:table;width:100%;table-layout:fixed}
.an-resumo{grid-template-columns:repeat(5,minmax(0,1fr))}
.an-grade{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:16px}
.an-painel{padding:16px 18px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup);min-width:0}.an-painel h2{margin:0 0 12px;font-size:15px}
.an-lista{list-style:none;margin:0;padding:0;display:grid;gap:10px}.an-lista li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:baseline}
.an-nome{font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.an-num{font-size:12.5px;color:var(--t3);white-space:nowrap}.an-num b{color:var(--ink);font-weight:600}
.an-barra{grid-column:1/-1;height:6px;border-radius:99px;background:var(--s2);overflow:hidden}.an-barra>span{display:block;height:100%;border-radius:99px;background:var(--graf)}
.an-vazio{margin:0;color:var(--t3);font-size:13.5px}
.an-recentes{list-style:none;margin:0;padding:0;display:grid}.an-recentes li{display:grid;grid-template-columns:130px 1fr;gap:12px;padding:8px 0;border-top:1px solid var(--borda);font-size:13.5px}.an-recentes li:first-child{border-top:0}.an-quando{color:var(--t3)}
@media (max-width:900px){.an-grade,.an-graficos{grid-template-columns:1fr}.an-cartoes,.an-cartoes.cinco{grid-template-columns:repeat(2,minmax(0,1fr))}.an-recentes li{grid-template-columns:1fr;gap:2px}}
.libera{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.libera fieldset{margin:0;padding:8px 12px 10px;border:1px solid var(--borda);border-radius:10px;display:grid;gap:0}
.libera legend{padding:0 4px;font-weight:600}.libera legend .marcar{font-weight:600}
.copiar{display:flex;gap:8px}.copiar input{font:12.5px ui-monospace,Consolas,monospace;background:var(--s2)}
input.segredo{-webkit-text-security:disc}
.avisos-adm{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:16px;align-items:start}
.auto-linha{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--borda)}.auto-linha:first-of-type{border-top:0}.auto-linha div{display:grid;flex:1}.auto-linha small{color:var(--t3)}
.senha-unica span{font-weight:600;user-select:all}
.botao.travado{pointer-events:none;color:var(--t3);width:100%}
.aviso-txt{display:block;color:var(--t2);font-size:13.5px}
@media (max-width:720px){.linha-2.com-img,.linha-2.com-img.larga-img,.avisos-adm,.libera,.marcar-grade{grid-template-columns:1fr}.linha-2.com-img .enviar-img{max-width:220px}.registro{grid-template-columns:1fr}.registro small{grid-row:auto}.registro em{grid-column:auto}.origem{text-align:left}}
.selo-off{position:absolute;left:6px;top:6px;padding:2px 8px;border-radius:6px;background:rgba(10,10,10,.8);color:#fff;font-size:11px;font-style:normal;font-weight:600;z-index:1}
.enviar-img.quadrada{aspect-ratio:1}textarea.mono{font:12.5px/1.5 ui-monospace,Consolas,monospace}
@media (max-width:1400px){.adm-grade-artes{grid-template-columns:repeat(6,minmax(0,1fr))}}@media (max-width:1050px){.adm-grade-artes{grid-template-columns:repeat(4,minmax(0,1fr))}}
.adm-banners{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}@media (max-width:1300px){.adm-banners{grid-template-columns:repeat(2,minmax(0,1fr))}}
.adm-banner{display:grid;gap:12px;align-content:start;padding:12px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.adm-banner .adm-acoes{margin-left:0;justify-content:flex-start;width:100%}.adm-banner .adm-acoes .empurra{flex:1}
.adm-banner.desligado .adm-banner-img{filter:grayscale(1);opacity:.6}
.adm-banner-img{position:relative;aspect-ratio:21/8;border-radius:10px;background:#0A0A0A center right/cover no-repeat;overflow:hidden;display:flex;align-items:center}
.adm-banner-img::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0A0A0A 30%,rgba(10,10,10,.2) 70%)}
.adm-banner-img>div{position:relative;display:grid;gap:4px;padding:0 18px;color:#fff;max-width:60%}.adm-banner-img small{color:var(--ouro);font-size:9.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.adm-banner-img b{font-size:17px;line-height:1.15}.adm-banner-img em{font-style:normal;color:var(--ouro)}.adm-banner-img.tom-verde small,.adm-banner-img.tom-verde em{color:#3DD68C}
.adm-banner-img span{justify-self:start;margin-top:4px;padding:3px 10px;border-radius:6px;background:var(--grad);color:#111;font-size:11px;font-weight:600}.adm-banner-img.tom-verde span{background:#3DD68C}
.adm-banner-info{display:grid;gap:10px}.adm-banner-info small{color:var(--t3);overflow-wrap:anywhere}.adm-banner-info .adm-acoes{margin-left:0;flex-wrap:wrap}
dialog.janela-form{width:min(560px,calc(100vw - 24px))}dialog.janela-form.larga{width:min(820px,calc(100vw - 24px))}
.form-janela{display:flex;flex-direction:column;max-height:calc(100vh - 34px)}
.janela-cab{display:flex;align-items:center;gap:12px;padding:14px 14px 14px 22px;border-bottom:1px solid var(--borda)}.janela-cab b{flex:1;font-size:17px}
.janela-corpo{display:grid;gap:14px;padding:20px 22px;overflow:auto}
.secao-janela{display:grid;gap:12px;padding-top:14px;border-top:1px solid var(--borda)}.secao-janela h4{margin:0;font-size:14px}.secao-janela h4 small{color:var(--t3);font-weight:400}
.rodape-janela{display:flex;flex-wrap:wrap;gap:10px;padding:14px 22px;border-top:1px solid var(--borda)}.rodape-janela [data-excluir-btn]{margin-left:auto}
dialog.janela.janela-confirmar{width:min(460px,calc(100vw - 24px))}.janela-confirmar .janela-corpo b{font-size:17px}.janela-confirmar p{margin:0;color:var(--t2)}
.materiais{display:grid;gap:8px}.material-linha{display:grid;grid-template-columns:1fr 1.4fr 40px;gap:8px}.material-linha .icone-btn{width:40px;height:44px}
.enviar-img{position:relative;display:grid;place-items:center;border:1.5px dashed var(--borda2);border-radius:10px;background:var(--s2);overflow:hidden;cursor:pointer;min-height:120px}
.enviar-img.em-pe,.enviar-img.cartaz{aspect-ratio:3/4}.enviar-img.deitada,.enviar-img.identidade,.enviar-img.projecao{aspect-ratio:4/3}.enviar-img.larga,.enviar-img.carrossel{aspect-ratio:21/8}
.enviar-img:hover{border-color:var(--ouro)}.enviar-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:var(--s3)}
.enviar-img input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;z-index:2}
.enviar-vazio{display:grid;justify-items:center;gap:4px;color:var(--t2);text-align:center;padding:10px}.enviar-vazio small{color:var(--t3)}
.enviando{position:absolute;inset:auto 8px 8px;z-index:3;padding:6px 10px;border-radius:8px;background:var(--preto);color:#fff;font-size:12.5px;text-align:center}
.lista-temas{display:grid;gap:8px}.tema-linha{display:flex;align-items:center;gap:6px;margin:0}.tema-linha input{height:40px}.tema-linha small{color:var(--t3);min-width:30px;text-align:right}
.tema-linha .icone-btn{width:36px;height:36px;flex:none}.tema-linha.novo{margin-top:12px;padding-top:14px;border-top:1px solid var(--borda)}.tema-linha.novo .botao{flex:none}
body.solta{display:grid;min-height:100vh;place-items:center;background:var(--bg)}
.entrar{width:100%;padding:24px 16px;display:grid;place-items:center}
.entrar-caixa{width:min(400px,100%);display:grid;gap:16px;padding:32px 28px;border:1px solid var(--borda);border-radius:var(--raio-g);background:var(--sup);box-shadow:var(--sombra)}
/* Entrar: o fundo segue o tema (lua). Escuro: preto com brilho dourado; claro: quase branco com a coroa em cinza claro. A coroa gigante fica bem apagada atrás da caixa */
body.solta:has(.entrar){background:var(--bg)}
.entrar{position:relative;min-height:100vh;min-height:100dvh;overflow:hidden;isolation:isolate;--coroa-fundo:#8C8C8C;--coroa-op:.10;
  background:radial-gradient(55% 45% at 50% 42%,rgba(255,150,30,.10),transparent 70%),radial-gradient(40% 35% at 12% 100%,rgba(255,150,30,.06),transparent 70%),#F4F3EF}
[data-theme="dark"] .entrar{--coroa-fundo:#FFA62B;--coroa-op:.032;
  background:radial-gradient(55% 45% at 50% 42%,rgba(255,150,30,.17),transparent 70%),radial-gradient(40% 35% at 12% 100%,rgba(255,150,30,.08),transparent 70%),radial-gradient(35% 30% at 92% 0%,rgba(255,150,30,.07),transparent 70%),#0A0A0A}
.entrar::before{content:"";position:absolute;z-index:-1;left:50%;top:44%;width:min(1180px,150vw);aspect-ratio:1024/690;transform:translate(-50%,-50%);background:var(--coroa-fundo);opacity:var(--coroa-op);pointer-events:none;
  -webkit-mask:url(/marca/final/coroa-justa-ouro.svg) center/contain no-repeat;mask:url(/marca/final/coroa-justa-ouro.svg) center/contain no-repeat}
.entrar-caixa{position:relative;box-shadow:0 30px 70px -30px rgba(0,0,0,.25),0 0 0 1px rgba(255,150,30,.12)}
[data-theme="dark"] .entrar-caixa{box-shadow:0 30px 80px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,150,30,.10)}
/* idioma e tema no canto de baixo, à esquerda (como no menu do app) */
.entrar-pe{position:absolute;left:16px;bottom:16px}
.entrar-pe .idioma-menu{top:auto;bottom:calc(100% + 6px);left:0;right:auto}
.entrar-marca{display:flex;align-items:center;gap:9px;justify-self:center;margin-bottom:6px}.entrar-marca img{height:30px;width:auto;display:block}
.entrar-marca .nome-logo{color:var(--ink)}[data-theme="light"] .entrar-marca .nome-logo b,[data-theme="light"] .entrar-marca .nome-logo small{color:#E07000}
[data-theme="dark"] .entrar-marca .so-claro,[data-theme="light"] .entrar-marca .so-escuro{display:none}
.entrar-caixa p{margin:0;color:var(--t2);font-size:14px;text-align:center;line-height:1.5}
.esqueci{justify-self:center;color:var(--t2);font-size:13.5px;text-decoration:none;transition:color .2s}.esqueci:hover{color:var(--ink)}
/* Entrar moderno (06/11/2026): caixa de vidro no centro, borda no degradê da marca; olhinho da senha só o ícone */
.entrar .entrar-caixa{width:min(420px,100%);gap:18px;padding:34px 30px 30px;border:1px solid transparent;border-radius:20px;
  background:linear-gradient(rgba(255,255,255,.72),rgba(255,255,255,.72)) padding-box,linear-gradient(135deg,rgba(255,134,0,.45),rgba(255,207,85,.18) 40%,rgba(222,254,145,.35)) border-box;
  -webkit-backdrop-filter:blur(18px) saturate(1.2);backdrop-filter:blur(18px) saturate(1.2);box-shadow:0 30px 80px -34px rgba(120,60,0,.35)}
[data-theme="dark"] .entrar .entrar-caixa{background:linear-gradient(rgba(22,22,24,.62),rgba(22,22,24,.62)) padding-box,linear-gradient(135deg,rgba(255,134,0,.55),rgba(255,207,85,.12) 40%,rgba(222,254,145,.35)) border-box;box-shadow:0 30px 90px -30px rgba(0,0,0,.85)}
.entrar-titulo{display:grid;gap:4px;text-align:center}.entrar-titulo h1{margin:0;font-size:22px;font-weight:600}.entrar-titulo p{margin:0;color:var(--t2);font-size:13.5px}
.entrar-campo>span:first-child{font-size:12.5px;font-weight:500;color:var(--t2)}
.entrar-input{position:relative;display:flex;align-items:center}
.entrar-input>.ico{position:absolute;left:13px;color:var(--t3);pointer-events:none;transition:color .2s}
.entrar-input input{width:100%;height:48px;padding:0 44px 0 42px;border-radius:12px;font-size:15px;background:rgba(255,255,255,.75)}
[data-theme="dark"] .entrar-input input{background:rgba(255,255,255,.04)}
.entrar-input input:focus{border-color:var(--ouro);box-shadow:0 0 0 4px rgba(255,166,43,.18);outline:0}
.entrar-input:focus-within>.ico{color:var(--ouro)}
.entrar-olho{position:absolute;right:6px;display:grid;place-items:center;width:36px;height:36px;border:0;border-radius:9px;background:none;color:var(--t3);cursor:pointer}.entrar-olho:hover{color:var(--ink);background:var(--borda)}.entrar .entrar-caixa .entrar-olho{background:none;box-shadow:none;min-height:0;padding:0;width:36px;height:36px;color:var(--t3)}.entrar .entrar-caixa .entrar-olho:hover{background:var(--borda);color:var(--ink)}
.entrar-btn{height:50px;border-radius:12px;font-size:15.5px;gap:8px;margin-top:4px}.entrar-btn .ico{transition:transform .25s}.entrar-btn:hover .ico{transform:translateX(3px)}
@media (max-width:720px){.entrar{padding-bottom:76px}}
@media (prefers-reduced-motion:reduce){.entrar-btn .ico{transition:none}}
.msg.aviso a{color:inherit;font-weight:600}
.entrar-logo{height:34px;justify-self:center;margin-bottom:6px}.entrar-caixa h1{margin:0;font-size:20px;text-align:center}.entrar-caixa .botao{width:100%}.entrar-caixa .msg{margin:0}
[data-theme="dark"] .entrar-logo.so-claro,[data-theme="light"] .entrar-logo.so-escuro{display:none}
/* Entrar limpo (06/11/2026, pedido do dono): claro = caixa branca de verdade, borda fina neutra, sem tom pêssego;
   escuro = grafite neutro, sem brilho amarelado. Celular: caixa sobe para perto do topo (sem o vão em cima) e
   idioma/tema ficam no canto de cima. */
.entrar{background:#F6F6F4}
.entrar::before{--coroa-op:.06}
[data-theme="dark"] .entrar{background:radial-gradient(60% 45% at 50% 40%,rgba(255,255,255,.035),transparent 70%),#0A0A0A;--coroa-fundo:#FFFFFF;--coroa-op:.018}
.entrar .entrar-caixa{background:#FFFFFF;border:1px solid #E7E6E1;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:0 1px 2px rgba(0,0,0,.04),0 24px 60px -28px rgba(0,0,0,.18)}
[data-theme="dark"] .entrar .entrar-caixa{background:#141416;border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 80px -30px rgba(0,0,0,.9)}
.entrar-input input{background:#FFFFFF}
[data-theme="dark"] .entrar-input input{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.10)}
.entrar-input input:focus{box-shadow:0 0 0 3px rgba(255,166,43,.16)}
[data-theme="dark"] .entrar .entrar-caixa .entrar-btn{color:#111}
@media (max-width:720px){
  .entrar{place-items:start center;padding:72px 16px 32px}
  .entrar .entrar-caixa{padding:28px 20px 24px;border-radius:18px}
  .entrar-pe{left:auto;right:16px;top:16px;bottom:auto;display:flex;gap:8px}
  .entrar-pe .idioma-menu{top:calc(100% + 6px);bottom:auto;left:auto;right:0}
  .entrar::before{top:24%}
}
.form-conta{display:grid;gap:18px;max-width:760px}
.bloco-form{display:grid;gap:14px;padding:20px 22px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--sup)}.bloco-form h2{margin:0;font-size:16px}
.botoes-form{display:flex;flex-wrap:wrap;gap:10px}
@media (max-width:720px){
  .linha-2{grid-template-columns:1fr}.adm-linha{flex-wrap:wrap}.adm-linha .adm-acoes{width:100%;justify-content:flex-end}
  .adm-aula{flex-wrap:wrap}.adm-aula .adm-acoes{width:100%;justify-content:flex-end}.adm-mini{width:64px;height:36px}
  .adm-banners{grid-template-columns:1fr}.material-linha{grid-template-columns:1fr 40px}.material-linha input:nth-child(2){grid-column:1}.material-linha button{grid-row:1/span 2;grid-column:2;height:auto}
  .faixa-admin{display:none}.adm-grade-artes{grid-template-columns:repeat(3,minmax(0,1fr))}.adm-temas{width:100%}
}
/* "?" alinhado ao meio do título (09/11/2026) */
h1:has(>.dica-q),h2:has(>.dica-q),h3:has(>.dica-q){display:flex;align-items:center}
.dica-q{flex:none;vertical-align:middle}.dica-q>svg{display:block}
/* Sem dourado nos botões (pedido do dono, 09/11/2026): o dourado cansava. Botão principal = botão comum (preto; no escuro,
   claro). Dourado só nos botões dos banners do Início (.botao-b), que não passam por aqui. */
.botao.ouro,button.botao.ouro{color:#fff;background:var(--preto);box-shadow:none}
.botao.ouro::after{display:none}
[data-theme="dark"] .botao.ouro,[data-theme="dark"] button.botao.ouro{color:#0A0A0A;background:#EDEDEA}
.botao.ouro:hover{filter:none}
.ver-tudo:hover,.seta-fileira:hover{color:var(--ink)!important;background:var(--s2)!important;border-color:var(--borda2)!important}
.seta-banner:hover{color:#111!important;background:#fff!important;border-color:#fff!important}
[data-theme="dark"] .chips a.on{color:#0A0A0A;background:#EDEDEA;border-color:#EDEDEA}[data-theme="dark"] .chips a.on small{color:#555}
.paginacao span.on{color:#fff;background:var(--preto);border-color:var(--preto)}[data-theme="dark"] .paginacao span.on{color:#0A0A0A;background:#EDEDEA;border-color:#EDEDEA}
.adm-arte:hover .lapis{background:var(--sup);color:var(--ink)}
.adm-cartao-mover .icone-btn:hover,.adm-cartao-mover .alca:hover{background:rgba(10,10,10,.9)!important;color:#fff}
/* Menu em seções (padrão FluxoPost, 09/11/2026): título pequeno em maiúsculas alinhado com os ícones; recolhido, no lugar
   do título fica um tracinho no mesmo alinhamento (os ícones não se mexem) */
.lateral .secao-menu{margin:18px 0 6px 16.5px;color:#7A7A7A;font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}
.lateral nav>.secao-menu:first-child{margin-top:8px}
@media (min-width:861px){
  html.menu-encolhido .lateral .secao-menu{display:block;position:relative;color:transparent;overflow:visible;user-select:none}
  html.menu-encolhido .lateral .secao-menu::after{content:"";position:absolute;left:-.5px;top:50%;width:20px;height:2px;border-radius:2px;background:rgba(255,255,255,.3);transform:translateY(-50%)}
  html.menu-encolhido .lateral .secao-menu+a{margin-top:0}
}
/* Cor de seleção (09/11/2026): cinza ~90% (#262626; 80% ficou claro demais) no lugar do preto puro (marcado, escolhido, aula aberta, play, progresso) */
:root{--sel:#262626}[data-theme="dark"]{--sel:#D4D4D4}
/* Bolinha de escolha (radio) e caixa de marcar: desenho próprio, neutro (sem o laranja do navegador) */
input[type=radio]{-webkit-appearance:none;appearance:none;flex:none;width:18px!important;height:18px!important;min-height:0!important;padding:0!important;margin:0;box-shadow:none!important;border:1.5px solid var(--borda2);border-radius:50%;background:var(--sup);display:inline-grid;place-items:center;cursor:pointer;transition:border-color .15s}
input[type=radio]::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--sel);transform:scale(0);transition:transform .15s}
input[type=radio]:checked{border-color:var(--sel)}input[type=radio]:checked::before{transform:scale(1)}
input[type=radio]:hover{border-color:var(--t2)}input[type=radio]:focus-visible{outline:2px solid var(--borda2);outline-offset:2px}
.marcar input[type=checkbox],.pasta-cab>input,.pv-modo input[type=checkbox],.grupo-pasta input[type=checkbox]{accent-color:var(--sel)}

/* Administrativo em cor universal (09/11/2026): preto, cinza e branco, igual em todos os apps do Nilton. A cor da marca
   fica na área dos membros e na marquinha do menu. */
body.adm input:focus,body.adm select:focus,body.adm textarea:focus{outline:2px solid color-mix(in srgb,var(--ink) 45%,transparent);outline-offset:0;border-color:transparent}
body.adm a:focus-visible,body.adm button:focus-visible{outline-color:color-mix(in srgb,var(--ink) 55%,transparent)}
body.adm .dica-q:hover,body.adm .dica-q:focus{color:var(--ink);border-color:var(--ink)}
body.adm .ajuda-dobra>summary{color:var(--t2)}body.adm .ajuda-dobra>summary:hover{color:var(--ink)}
body.adm .seta-grupo .ico,body.adm .pv-ofertas li .ico{color:var(--t3)}
body.adm .seta-grupo b{font-weight:600;color:var(--ink)}
body.adm .pv-modo label{grid-template-columns:auto 1fr;align-items:center}
body.adm .pv-modo label:has(input:checked){border-color:var(--sel);background:var(--s2)}
/* Cor universal também nos destaques do administrativo (09/11/2026): ícones dos números, gráficos, "Ver todos" e iniciais */
body.adm{--chip:#F1F2F4;--chip-ink:#2A2A2A}
[data-theme="dark"] body.adm{--chip:rgba(255,255,255,.08);--chip-ink:#E6E6E6}
body.adm .an-painel,body.adm .an-bloco,body.adm .graf{--graf:#3A3A3A}
[data-theme="dark"] body.adm .an-painel,[data-theme="dark"] body.adm .an-bloco,[data-theme="dark"] body.adm .graf{--graf:#D6D6D6}
body.adm .an-kpi-ic{background:transparent;color:var(--t3);border:1px solid var(--borda)}
/* Telas de lista e ajuste não esticam: até 1100px (Membros, cartões e Analytics continuam na largura toda) */
body.adm .secao-adm:has(.dobra-caixa,.dobra,.adm-linha),body.adm .secao-cfg{max-width:1100px}
body.adm .secao-cfg>.secao-cfg-cab,body.adm .secao-adm-cab{margin-bottom:12px}
body.adm .secao-cfg>h2{margin-bottom:12px}
/* Caixa do prazo (Auto/Mensal/Anual) curta e neutra */
body.adm .pv-linha{grid-template-columns:minmax(0,1.1fr) 112px minmax(0,1fr) 92px 40px}
body.adm .pv-uma{grid-template-columns:minmax(0,1fr) 92px}
body.adm .pv-cab{grid-template-columns:minmax(0,1.1fr) 112px minmax(0,1fr) 92px 40px}
body.adm .pv-prazo-btn{justify-content:center;padding:0 8px;font-size:13px}
body.adm .pv-prazo-btn:hover,body.adm .pv-prazo-btn.tem{border-color:var(--sel)}body.adm .pv-prazo-btn.tem .ico{color:var(--sel)}
/* Idioma escolhido e selo do perfil em cinza neutro (nada do creme da marca) */
.idioma-menu .idioma.on{background:var(--s2)!important}
.perfil-cab .selo{color:var(--t2);background:var(--s2)}
/* Topo do menu do perfil (09/11/2026): só a inicial, o nome e o e-mail (sem "Conectado como" e sem selo de papel) */
.perfil-cab{display:flex;align-items:center;gap:10px;padding:10px 12px 12px}
.perfil-ini{flex:none;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--s2);box-shadow:inset 0 0 0 1px var(--borda);color:var(--ink);font-size:13.5px;font-weight:700;line-height:1}
.perfil-quem{display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0;line-height:1.25}
.perfil-quem b{font-size:14.5px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.perfil-quem small{font-size:12px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* Botão só de ícone com a mesma altura dos botões pequenos (32px) no administrativo */
body.adm main .icone-btn{width:32px;height:32px;border-radius:8px}
body.adm .secao-adm>.dobras{max-width:none}
/* Analytics: calendário do período (abre ao tocar no ícone) */
body.adm .titulo-pag:has(.an-datas){position:relative;z-index:20}
.an-datas{position:relative}.an-datas>summary{list-style:none;cursor:pointer}.an-datas>summary::-webkit-details-marker{display:none}
.an-datas.on>summary{border-color:var(--sel);color:var(--sel)}
.an-datas-pop{position:absolute;right:0;top:calc(100% + 6px);z-index:30;display:flex;align-items:flex-end;gap:8px;padding:12px;border:1px solid var(--borda);border-radius:12px;background:var(--sup);box-shadow:var(--sombra-pop)}
.an-datas-pop label{display:grid;gap:4px;font-size:12px;color:var(--t2)}.an-datas-pop input{width:150px;height:36px;padding:0 10px}
/* Aula e vídeo: cor de sinalização neutra da plataforma (09/11/2026), no lugar do dourado: aula aberta em cinza, número
   em preto (claro no escuro), play em vidro escuro, barras de progresso na cor do texto */
.licao.on{background:var(--s2);color:var(--ink)}
.licao.on .n{color:var(--sup);background:var(--sel);border-color:var(--sel)}
/* Play no MESMO formato do relógio "Em breve" (círculo de 68px, contorno branco fino, sem anel nem pulsar), preenchido
   com a COR DO PROJETO e o ícone escuro (a mesma cor da marquinha do menu e das setinhas). Outra área de membros: muda só --projeto*. */
:root{--projeto:var(--ouro);--projeto-ink:var(--ouro-ink);--projeto-fundo:var(--grad)}
.play{width:68px!important;height:68px!important}
/* bola sólida na cor do projeto (nada de cor apagada) + só a bordinha em volta translúcida */
.play,.play-c,.dica-play{color:var(--projeto-ink)!important;background:var(--projeto-fundo)!important;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:0 0 0 8px color-mix(in srgb,var(--projeto) 24%,transparent),0 10px 24px -10px rgba(0,0,0,.5)!important;animation:none!important}
.barra span,.barra-c>span{background:var(--sel)!important}
.progresso,.volume{accent-color:#fff}
.pag-mais{display:flex;justify-content:center;margin:12px 0 4px}.pag-mais[hidden]{display:none}
/* Histórico do membro (reloginho ao lado do lápis): janelinha com a lista do que a pessoa acessou */
body.adm .m-acoes{gap:8px}body.adm .m-acoes .icone-btn{width:36px;height:36px;flex:none}
.janela-hist{width:min(560px,calc(100vw - 32px))}.hist-ultimo{margin:0 0 12px;color:var(--t2);font-size:13.5px}
.hist-lista{list-style:none;margin:0;padding:0;display:grid}
.hist-lista li{display:grid;grid-template-columns:120px 1fr;gap:10px;padding:9px 2px;border-top:1px solid var(--borda);font-size:13.5px}
.hist-lista li:first-child{border-top:0}.hist-lista small{color:var(--t3);font-size:12.5px}.hist-lista span{color:var(--t2)}.hist-lista b{color:var(--ink);font-weight:600}.hist-lista em{font-style:normal;color:var(--t3)}.hist-lista li[hidden]{display:none}
/* Botões menos pretos (09/11/2026): o botão comum/principal usa o cinza escuro da seleção, não o preto puro */
.botao:not(.leve):not(.perigo):not(.canva):not(.ps),button.botao:not(.leve):not(.perigo):not(.canva):not(.ps){background:var(--sel)}
[data-theme="dark"] .botao:not(.leve):not(.perigo):not(.canva):not(.ps){background:#EDEDEA;color:#0A0A0A}
/* Respiro dentro e entre os botões */
body.adm .botao{padding-left:14px;padding-right:14px}body.adm .adm-cartao-acoes,body.adm .adm-acoes,body.adm .rodape-janela,body.adm .botoes-form{gap:8px}
body.adm .adm-cartao-acoes form,body.adm .adm-acoes form{margin:0;display:flex}
/* Cartões do administrativo: título com espaço de duas linhas, então a descrição fica sempre na mesma altura */
.adm-cartao-txt b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.5em;line-height:1.25}
.adm-cartao-txt small{display:block;min-height:2.6em}
/* Alça de arrastar (9 pontinhos) sempre branca sobre a imagem, também no tema escuro */
.adm-cartao-mover .alca,.adm-cartao-mover .icone-btn,.adm-banner-img .alca{color:#fff!important}
.adm-cartao-mover .alca .ico{stroke:#fff}
/* Cartão com olhinho + Editar + Abrir: largura mínima para os três caberem com respiro */
@media (min-width:861px){body.adm .adm-cartoes.em-pe{grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}body.adm .adm-cartoes{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}}
body.adm .adm-cartao-acoes .botao.pequeno{padding:0 10px!important}
/* Olhinho de mostrar/esconder dentro das janelas (no lugar da caixa "Mostrar para os membros") */
.olho-ativo{position:relative;justify-self:start;align-self:center;display:inline-flex;align-items:center;height:32px;padding:0 12px;border:1px solid var(--borda2);border-radius:8px;background:var(--sup);color:var(--ink);font-size:13px;font-weight:600;cursor:pointer;user-select:none;width:max-content}
.olho-ativo:hover{border-color:var(--t2)}.olho-ativo input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.olho-ativo span{display:inline-flex;align-items:center;gap:6px}.olho-ativo .oa-off{display:none;color:var(--t3)}
.olho-ativo:has(input:not(:checked)) .oa-on{display:none}.olho-ativo:has(input:not(:checked)) .oa-off{display:inline-flex}
.olho-ativo:has(input:not(:checked)){background:var(--s2)}.olho-ativo:has(input:focus-visible){outline:2px solid var(--borda2);outline-offset:2px}
/* Thumbnail do vídeo: botão pequeno embaixo da capa que abre uma janelinha por cima (ver, trocar, excluir) */
.capa-col{display:grid;gap:8px;align-content:start}.thumb-btn{justify-self:start}
.janela-thumb{width:min(520px,calc(100vw - 32px))}.janela-thumb .rodape-janela{flex-wrap:wrap}
#j-thumb .enviar-img{aspect-ratio:16/9;max-width:none}
#j-thumb .enviar-img img{object-fit:cover;object-position:50% 50%;background:#000}
#j-thumb .enviar-img:has(img:not([hidden])){cursor:grab}#j-thumb .enviar-img.arrastando{cursor:grabbing}
#j-thumb .enviar-img:has(img:not([hidden])) input[type=file]{pointer-events:none}
.thumb-ajuste{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:4px 8px;margin-top:10px;color:var(--t2);font-size:12.5px}
.thumb-ajuste input{grid-column:1/-1;width:100%;height:auto!important;min-height:0!important;padding:0!important;accent-color:var(--sel);background:none!important;border:0!important}
/* "Leve o app no celular" (padrão FluxoPost, 09/11/2026): cartão no topo com o ícone do app + uma frase; depois os passos */
.app-topo{display:flex;align-items:center;gap:16px;max-width:980px;margin:0 0 18px;padding:18px 20px;border:1px solid var(--borda);border-radius:14px;background:linear-gradient(120deg,var(--s2),var(--sup) 60%)}
.app-topo img{flex:none;width:56px;height:56px;border-radius:14px;box-shadow:0 8px 20px -10px rgba(0,0,0,.45)}
.app-topo b{display:block;font-size:17px}.app-topo small{display:block;margin-top:2px;color:var(--t2);font-size:13.5px}
/* Números de passo, aula e etapa = quadradinho discreto (contorno fino, número cinza), nunca bolinha colorida */
.passo-n,.licao .n,.passos .n{display:inline-grid;place-items:center;flex:none;width:24px;height:24px;border-radius:7px!important;border:1px solid var(--borda2);background:var(--sup);color:var(--t2);font-size:12px;font-weight:600;line-height:1}
.aviso-cartao .passo-n{grid-row:span 4;margin-top:1px}
.passos .n{background:var(--sup)!important;color:var(--t2)!important}
/* Campos do administrativo com UMA altura só (40px) em todas as telas e janelas; botão na mesma linha de um campo
   (olhinho, Copiar, Salvar, prazo, tirar) acompanha a altura do campo */
body.adm main input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),body.adm dialog input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),body.adm main select,body.adm dialog select{height:40px;min-height:40px;padding-top:0;padding-bottom:0;font-size:14px}
body.adm .copiar input{font-size:13px}
/* Botão ao lado de um campo mantém o tamanho padrão (32px) e fica centralizado na altura do campo */
body.adm .copiar{align-items:center;gap:8px}body.adm .pv-linha{align-items:center}
body.adm .copiar>.botao,body.adm .copiar>button.botao{height:32px!important;min-height:32px!important;padding:0 14px!important;gap:6px;flex:none}
body.adm .copiar>.icone-btn,body.adm .pv-linha>.icone-btn{width:32px!important;height:32px!important;flex:none}
body.adm .pv-prazo-btn{height:40px!important;min-height:40px!important}
/* Campo de preencher = fundo cinza claro (mostra que ali se digita; branco em tudo ficava estranho), borda fina; no foco
   fica branco com o contorno neutro. Vale para texto, senha, data, número, select, textarea e busca. */
body.adm main input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),body.adm dialog input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]),body.adm main select,body.adm dialog select,body.adm main textarea,body.adm dialog textarea{background-color:var(--s2);border:1px solid var(--borda)}
body.adm main input:focus,body.adm dialog input:focus,body.adm main select:focus,body.adm dialog select:focus,body.adm main textarea:focus,body.adm dialog textarea:focus{background-color:var(--sup)}
body.adm main textarea,body.adm dialog textarea{font-size:14px}
/* Listas de módulos (cursos e guias) não esticam até o fim da tela */
body.adm [data-ordenar="modulos"],body.adm main>.vazio{max-width:1100px}
/* Membros: números numa linha compacta ao lado da busca, só para informar */
.m-resumo{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;margin:0;color:var(--t2);font-size:13px}
.m-resumo b{color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}.m-resumo .atencao b{color:var(--aviso,#B45309)}
body.adm .filtros:has(.m-resumo){display:flex;align-items:center;gap:12px 20px;flex-wrap:wrap}
`;

// Nome do logo em texto (Sora), como no manual da marca: "Criativos" em cima; embaixo "do" pequeno + "Reino" dourado.
// É texto de verdade para trocar com o idioma (Creativos del Reino / Kingdom Creatives, na lista de idiomas.js);
// tamanhos e posições fixos por idioma no CSS (procure "Nome do logo com medidas fixas")
const nomeLogo = classe => `<span class="nome-logo ${classe}" aria-hidden="true"><span class="n1">Criativos</span><span class="n2"><small>do</small><b>Reino</b></span></span>`;
const cabeca = (titulo, extra = '') => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><script>/marcas/.test(location.search)&&document.documentElement.classList.add('marcas')</script>
<title>${esc(titulo)} · Criativos do Reino</title><link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/marca/final/favicon.svg?v=3" type="image/svg+xml"><link rel="alternate icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Criativos do Reino"><meta name="theme-color" content="#0A0A0A">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Sora:wght@600&display=swap" rel="stylesheet">
${extra}${INICIAL}<style>${CSS}${CSS_ADMIN}</style></head>`;
// Página sem a casca (tela de entrar)
const paginaSolta = (titulo, corpo, extra = '') => `${cabeca(titulo, extra)}<body class="solta">${corpo}<script src="/js/idiomas.js"></script>${SCRIPT}</body></html>`;

function pagina(titulo, corpo, { caminho = '', usuario = { nome: 'Membro', plano: '' }, admin = false, mensagem = null } = {}) {
  // Troca de área no fim do menu: no administrativo, "Ver como membro"; na área de membros (só para administrador), "Ver como admin"
  const troca = h => (admin && h === '/') || (!admin && h === '/admin');
  const menu = admin ? MENU_ADMIN : usuario.papel === 'admin' ? [...MENU, ['#', 'Conta'], ['/admin', 'Ver como admin', 'admin']] : MENU, abasLista = admin ? ABAS_ADMIN : ABAS;
  const head = cabeca(titulo);
  const lateral = `<aside class="lateral" aria-label="Menu">
    <div class="cabeca"><a class="marca" href="/" aria-label="Clube Criativos do Reino, início"><img class="simb" src="/marca/final/coroa-justa-ouro.svg?v=3" alt="">${nomeLogo('logo')}</a>
      <button type="button" class="encolher" data-encolher title="Encolher ou abrir o menu" aria-label="Encolher ou abrir o menu">${icone('esquerda', 18)}</button></div>
    <nav>${menu.map(([h, n, i]) => { if (h === '-') return '<span class="sep-menu"></span>'; if (h === '#') return `<div class="secao-menu" aria-hidden="true">${n}</div>`; const on = !troca(h) && ativo(h, caminho);
      return `<a class="item ${on ? 'on' : ''} ${troca(h) ? 'troca-area' : ''}" href="${h}" title="${n}" ${on ? 'aria-current="page"' : ''}>${icone(i, 19)}<span>${n}</span></a>`; }).join('')}</nav>
    ${peMenu(admin)}
  </aside><div class="gaveta-fundo"></div>`;
  const primeiro = String(usuario.nome || '').split(/\s+/)[0];
  const perfil = `<details class="perfil"><summary aria-label="Minha conta" title="Minha conta"><span class="avatar">${icone('usuario', 18)}</span></summary>
    <div class="perfil-menu"><div class="perfil-cab"><span class="perfil-ini">${esc((String(usuario.nome || usuario.email || '?').trim()[0] || '?').toUpperCase())}</span><span class="perfil-quem"><b>${esc(usuario.nome)}</b>${usuario.email ? `<small>${esc(usuario.email)}</small>` : ''}</span></div>
      <a href="/comece">${icone('guia', 17)}Comece por aqui</a>
      <a href="/favoritos">${icone('favorito', 17)}Meus Favoritos<small data-conta="favs"></small></a>
      <a href="/conta">${icone('usuario', 17)}Minha Conta</a>
      <a class="sair" href="/sair">${icone('sair', 17)}Encerrar Sessão</a></div></details>`;
  // A trilha (Início › seção › página) vem da tela e sobe para a barra do topo
  let trilha = '';
  corpo = corpo.replace(/<nav class="trilha"[\s\S]*?<\/nav>/, m => { trilha = m; return ''; });
  // Admin olhando a área de membros: faixa para voltar ao administrativo (no celular, pelo menu do perfil)
  // (a faixa "vendo como membro" saiu: a troca de área fica no fim do menu lateral e no menu do perfil)
  const faixa = '';
  const aviso = mensagem && (mensagem.ok || mensagem.erro) ? `<div class="msg ${mensagem.erro ? 'erro' : 'ok'}" role="status">${icone(mensagem.erro ? 'fechar' : 'ok', 16)}${esc(mensagem.erro || mensagem.ok)}</div>`
    : mensagem && mensagem.senha ? `<div class="msg aviso" role="status">${icone('cadeado', 16)}<span>Se quiser, você pode trocar a sua senha em <a href="/conta">Minha conta</a>.</span></div>` : '';
  const barraTopo = `<header class="barra-topo">${trilha || '<span class="trilha"></span>'}<span class="empurra"></span>${botaoAvisos}${perfil}</header>`;
  const topoCel = `<header class="topo-cel"><button type="button" class="marca-cel" data-gaveta aria-label="Abrir o menu" title="Menu"><span class="menu-ic">${icone('menu', 20)}</span><img class="simb-cel" src="/marca/final/coroa-justa-ouro.svg?v=3" alt="">${nomeLogo('logo-cel')}</button><span class="empurra"></span>${botaoAvisos}${perfil}</header>`;
  const abas = `<nav class="abas" aria-label="Atalhos">${abasLista.map(([h, n, i]) => `<a class="${ativo(h, caminho) ? 'on' : ''}" href="${h}">${icone(i, 21)}${n}</a>`).join('')}
    ${admin ? `<a href="/mais" data-gaveta>${icone('menu', 21)}Menu</a>` : ''}</nav>`;
  return `${head}<body${admin ? ' class="adm"' : ''}><div class="app">${lateral}<div class="conteudo">${topoCel}${barraTopo}<main>${faixa}${aviso}${corpo}</main></div></div>${abas}${admin ? '' : '<script src="/js/idiomas.js"></script>'}${SCRIPT}</body></html>`;
}

// Explicação curta escondida num "?" (aparece ao passar o mouse ou ao tocar). Use só quando a explicação for necessária.
// O "?" é desenhado (SVG), não letra: a letra da fonte fica fora do centro da bolinha
const dica = texto => `<span class="dica-q" tabindex="0" role="note" aria-label="${esc(texto)}" data-dica="${esc(texto)}"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.6 8.4a3.5 3.5 0 0 1 6.8 1.2c0 2.4-3.4 3.2-3.4 4.9"/><path d="M12 19h.01"/></svg></span>`;
// Ajuda recolhida: "Como configurar" vira um link pequeno que abre um texto curto (o que preencher e o que não)
const ajuda = (titulo, corpo) => `<details class="ajuda-dobra"><summary>${icone('ajuda', 14)}${titulo}</summary><div>${corpo}</div></details>`;

module.exports = { esc, icone, pagina, paginaSolta, nomeLogo, idiomas, botaoTema, dica, ajuda };
