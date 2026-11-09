// Base comum das telas do FluxoPost (copiada do Pixel.Afilic, skill gd-layout-apps):
const contexto = require('../contexto');
// menu lateral que encolhe e lembra a escolha (computador); barra flutuante embaixo e menu em gaveta (celular);
// campos com 16px no celular (o iPhone não dá zoom); tabelas viram cartões no celular, sem rolar para o lado.
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const data = ms => (ms ? new Date(ms).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' }) : '');

// Ícones (traço, 24×24)
const P = {
  inicio: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  vendas: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  produtos: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/>',
  plataformas: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',
  pagina: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  sino: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  celular: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  lua: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  mais: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  enviar: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  moeda: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3-1.6"/><path d="M12 6v2M12 16v2"/>',
  alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  resumo: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>',
  contas: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>',
  campanhas: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  conjuntos: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  anuncios: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  utm: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  integracoes: '<path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0Z"/><path d="M12 17v5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  atualizar: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  baixar: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  copiar: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  'olho-fechado': '<path d="M10.7 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.2"/><path d="M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="m2 2 20 20"/>',
  editar: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  colunas: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>',
  fechar: '<path d="M18 6 6 18M6 6l12 12"/>',
  filtro: '<path d="M3 5h18l-7 8.5V19l-4 2v-7.5Z"/>',
  arrastar: '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  mais2: '<path d="M12 5v14M5 12h14"/>',
  esquerda: '<path d="m15 18-6-6 6-6"/>',
  direita: '<path d="m9 18 6-6-6-6"/>',
  compartilhar: '<path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
  ok: '<path d="M20 6 9 17l-5-5"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  // Espião: chapéu e óculos escuros
  espiao: '<path d="M2 11h20"/><path d="m5 11 1.6-6.1A1.2 1.2 0 0 1 7.8 4h8.4a1.2 1.2 0 0 1 1.2.9L19 11"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M10 16.5c1.3-.8 2.7-.8 4 0"/>',
  sobe: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  desce: '<path d="m19 12-7 7-7-7"/><path d="M12 5v14"/>',
  faisca: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  coracao: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  mensagem: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  salvar: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  grafico: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  painel: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  chave: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m16 7 3 3"/><path d="m18 5 2 2"/>',
  ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  // Menu (FluxoPost, 07/11/2026): traço moderno, cantos arredondados
  'm-painel': '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  'm-posts': '<rect x="3" y="4" width="18" height="17" rx="2.5"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
  'm-feed': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  'm-espiao': '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M6.5 12s2-4 5.5-4 5.5 4 5.5 4-2 4-5.5 4-5.5-4-5.5-4z"/><circle cx="12" cy="12" r="1.6"/>',
  'm-coment': '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
  'm-auto': '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  'm-analise': '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  'm-link': '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  'm-app': '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  'm-projetos': '<path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/>',
  'm-membros': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  'm-grupos': '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  'm-config': '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  'm-conta': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  'm-admin': '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  lixo: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  girar: '<path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/>',
  'm-trocar': '<path d="M16 3l4 4-4 4"/><path d="M20 7H8a4 4 0 0 0-4 4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h12a4 4 0 0 0 4-4"/>',
  'm-recolher': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18M15.5 9.5 13 12l2.5 2.5"/>',
};
const icone = (nome, tam = 18) => `<svg class="ico" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[nome] || ''}</svg>`;

// Menu do projeto: Posts (vitrine, novo post, agenda) é a tela inicial
const INICIO = '/painel';
// Cada projeto é um perfil do Instagram; a conta (Facebook e os perfis) fica em Conexões
const MENU = [
  ['Principal', [['/painel', 'Visão geral', 'm-painel'], ['/posts', 'Posts', 'm-posts'], ['/feed', 'Feed', 'm-feed'], ['/espionar', 'Espionar', 'm-espiao'], ['/comentarios', 'Interações', 'm-coment'], ['/automacao', 'Automação', 'm-auto'], ['/analise', 'Análise', 'm-analise']]],
  ['Conta', [['/conexoes', 'Conexões', 'm-link'], ['/aplicativo', 'App e notificações', 'm-app']]],
];
// Celular: as telas mais usadas embaixo; o resto abre no "Menu" (gaveta)
const ABAS = [['/painel', 'Início', 'm-painel'], ['/posts', 'Posts', 'm-posts'], ['/posts/novo', 'Novo', 'mais2'], ['/feed', 'Feed', 'm-feed']];
const ativo = (href, caminho) => (href === '/comentarios' && caminho.startsWith('/direct') ? true : href === '/posts/novo' ? caminho === href : href === '/posts' ? caminho === '/posts' || (caminho.startsWith('/posts/') && caminho !== '/posts/novo') : caminho === href || caminho.startsWith(href + '/'));

const CSS = `
:root{--azul:#6D4FC9;--primary:#6D4FC9;--primary-2:#5537AE;--grad:#6D4FC9;--laranja:#FF7A3D;--tinta:#15171C;--tinta-ink:#FFFFFF;
--bg:#F1F2F4;--s1:#FFFFFF;--s2:#F7F8F9;--s3:#E9EBEE;--borda:#E0E2E6;--borda2:#CBCFD6;
--ink:#14161A;--t2:#4B5059;--t3:#6B717B;--chip:#EFE9FC;--chip-ink:#5537AE;
--ok:#0B8A5A;--ok-f:#E2F4EC;--aviso:#9A5700;--aviso-f:#FDF0DC;--erro:#D23B2F;--erro-f:#FCE9E7;--neutro-f:#E9EDF2;
--c1:#0B8A5A;--c2:#D39A1C;--c3:#D23B2F;--g1:#6D4FC9;--g2:#B794F6;--g3:#FF9A5C;--g4:#9AA6B6;
--sombra:none;--sombra-pop:0 18px 48px rgba(20,22,26,.18);--raio:12px;--ctl:40px;--menu-w:244px;--safe-b:max(env(safe-area-inset-bottom),14px);
--fonte:Onest,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
[data-theme="dark"]{--azul:#B794F6;--primary:#7556D6;--primary-2:#CDB8FF;--grad:#7556D6;--tinta:#F1F2F4;--tinta-ink:#0E0F12;--bg:#0E0F12;--s1:#16181D;--s2:#1B1E24;--s3:#23272F;
--borda:rgba(255,255,255,.08);--borda2:rgba(255,255,255,.16);--ink:#F1F2F4;--t2:#B4B9C2;--t3:#858B96;--chip:rgba(117,86,214,.22);--chip-ink:#D2C0FF;
--ok:#3DD598;--ok-f:rgba(61,213,152,.12);--aviso:#F2A93B;--aviso-f:rgba(242,169,59,.12);--erro:#FF6B5E;--erro-f:rgba(255,107,94,.12);--neutro-f:#23272F;
--c1:#3DD598;--c2:#E9B445;--c3:#FF6B5E;--g1:#B794F6;--g2:#D9C8FF;--g3:#FF9A5C;--g4:#5E636D;--sombra:none;--sombra-pop:0 24px 60px rgba(0,0,0,.55)}
html.menu-encolhido{--menu-w:68px}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}html,body{overscroll-behavior-y:none}[hidden]{display:none!important}
body{margin:0;color:var(--ink);font:14px/1.5 var(--fonte);font-feature-settings:"tnum" 0;background:var(--bg);min-height:100vh}
h1,h2,h3{font-family:var(--fonte);letter-spacing:-.015em}
a{color:inherit}.ico{flex:none}
.app{display:grid;grid-template-columns:var(--menu-w) minmax(0,1fr);min-height:100vh;transition:grid-template-columns .2s}

/* Menu lateral: mesmo papel do fundo; o item aberto ganha a folha branca e o "pixel" azul na ponta */
.lateral{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid var(--borda);background:var(--bg);overflow:hidden;z-index:6}
.lateral .cabeca{display:flex;align-items:center;gap:8px;padding:20px 10px 12px 18px;min-height:74px}
.marca{display:flex;align-items:center;min-width:0;flex:1;text-decoration:none}.marca img{display:block;height:38px;width:auto;max-width:100%}
.marca .simb{display:none}.marca .simb img{height:34px;width:auto;display:block}
.logo-img{display:inline-flex;align-items:center}.marca .logo-img img,.logo-img img{display:block;height:30px;width:auto;max-width:none}
.entrar .marca .logo-img img{height:44px}.topo .marca-cel .logo-img img{height:28px}
.encolher{display:inline-grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:8px;color:var(--t3);background:transparent;box-shadow:none;cursor:pointer}
.encolher:hover{color:var(--ink);background:var(--s3)}
.lateral nav{flex:1;overflow-y:auto;padding:2px 12px 12px}
.secao{margin:18px 10px 4px;color:var(--t3);font-size:12px;font-weight:600;white-space:nowrap}
.lateral a.item{position:relative;display:flex;align-items:center;gap:11px;min-height:38px;padding:0 10px;margin:1px 0;border-radius:8px;color:var(--t2);text-decoration:none;font-weight:500;white-space:nowrap}
.lateral a.item:hover{color:var(--ink);background:var(--s3)}
.lateral a.item.on{color:var(--ink);background:var(--s1);font-weight:600;box-shadow:inset 0 0 0 1px var(--borda)}
.lateral a.item.on .ico{color:var(--azul)}
.lateral a.item.on::after{content:"";margin-left:auto;width:6px;height:6px;border-radius:1px;background:var(--azul)}
/* Projeto aberto, logo abaixo da marca */
.projeto-sel{position:relative;margin:4px 12px 6px}
.projeto-sel>summary,.projeto-sel>.projeto-fixo{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--borda);border-radius:10px;background:var(--s1);list-style:none;cursor:pointer}
.projeto-sel>.projeto-fixo{cursor:default}
.projeto-sel>summary::-webkit-details-marker{display:none}.projeto-sel>summary:hover{border-color:var(--borda2)}
.projeto-sel b{display:block;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13.5px}
.perfil-nome{display:flex;flex-direction:column;flex:1;min-width:0;line-height:1.2;text-align:left}.perfil-nome b{font-size:13.5px}.perfil-nome small{color:var(--t3);font-size:11.5px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.quadro.foto{position:relative;border-radius:50%;overflow:hidden;background:var(--chip);color:var(--chip-ink)}.quadro.foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.projeto-sel .quadro{width:30px;height:30px}.projeto-pop .quadro{width:26px;height:26px}a.projeto-fixo{text-decoration:none;color:var(--ink)}
.projeto-sel .ico{color:var(--t3)}
.quadro{display:inline-grid;place-items:center;flex:none;width:26px;height:26px;border-radius:6px;color:var(--tinta-ink);background:var(--tinta);font-size:11px;font-weight:700;letter-spacing:.02em}
.projeto-pop{position:absolute;top:calc(100% + 6px);left:0;right:0;display:grid;gap:2px;padding:6px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:var(--sombra-pop);z-index:30}
.projeto-pop form{margin:0}.projeto-pop .item-menu{display:flex;align-items:center;gap:10px;color:var(--ink);background:none;box-shadow:none;font-weight:500;justify-content:flex-start}
.projeto-pop .item-menu.on{font-weight:600}.projeto-pop .item-menu.on::after{content:"";margin-left:auto;width:6px;height:6px;border-radius:1px;background:var(--azul)}
.projeto-pop hr{border:0;border-top:1px solid var(--borda);margin:4px 0}
/* Rodapé do menu: só a conta (tema e sino ficam no cabeçalho da página inicial) */
.lateral .pe{display:flex;align-items:center;gap:4px;padding:10px 12px;border-top:1px solid var(--borda)}
.avatar{display:inline-grid;place-items:center;flex:none;width:32px;height:32px;border-radius:999px;color:var(--chip-ink);background:var(--chip);font-size:12px;font-weight:700}
.pe-conta{position:relative;flex:1;min-width:0}
.pe-conta>summary{display:flex;align-items:center;gap:9px;padding:4px;border-radius:10px;list-style:none;cursor:pointer}
.pe-conta>summary::-webkit-details-marker{display:none}.pe-conta>summary:hover,.pe-conta[open]>summary{background:var(--s3)}
.pe .quem{min-width:0;flex:1;line-height:1.25}.pe .quem b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pe .quem small{display:block;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pe .botao-ico{width:34px;height:34px;border-color:transparent;background:transparent;color:var(--t2)}.pe .botao-ico:hover{background:var(--s3);color:var(--ink)}
.pe-menu{position:absolute;bottom:calc(100% + 8px);left:0;width:220px;display:grid;gap:2px;padding:6px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:var(--sombra-pop);z-index:30}
.pe-menu form{margin:0}.pe-menu .item-menu{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--ink);background:none;box-shadow:none;font-weight:500;justify-content:flex-start}
.pe-menu .item-menu.perigo-txt{color:var(--erro)}.pe-menu hr{border:0;border-top:1px solid var(--borda);margin:4px 0}
html.menu-encolhido .lateral .cabeca{flex-direction:column;padding:16px 8px 8px}
html.menu-encolhido .marca .logo,html.menu-encolhido .secao,html.menu-encolhido .item span,html.menu-encolhido .pe .quem,html.menu-encolhido .projeto-sel b,html.menu-encolhido .projeto-sel>summary>.ico,html.menu-encolhido .projeto-sel>summary>.perfil-nome{display:none}
html.menu-encolhido .marca .simb{display:block}html.menu-encolhido .lateral nav{padding:4px 10px}
html.menu-encolhido .lateral a.item{justify-content:center;padding:0}html.menu-encolhido .lateral a.item.on::after{position:absolute;right:4px;top:4px;width:5px;height:5px}html.menu-encolhido .secao+a{margin-top:10px}
html.menu-encolhido .projeto-sel{margin:4px 8px}html.menu-encolhido .projeto-sel>summary,html.menu-encolhido .projeto-sel>.projeto-fixo{justify-content:center;padding:8px 0}html.menu-encolhido .projeto-pop{right:auto;width:220px}
html.menu-encolhido .pe{flex-direction:column;padding:10px 6px}html.menu-encolhido .pe-conta>summary{justify-content:center}html.menu-encolhido .encolher{transform:rotate(180deg)}

/* Topo: só no celular (marca e avisos) */
.conteudo{min-width:0}
.topo{display:none}
.botao-ico{display:inline-grid;place-items:center;width:var(--ctl);height:var(--ctl);padding:0;border:1px solid var(--borda);border-radius:9px;color:var(--ink);background:var(--s1);box-shadow:none;cursor:pointer;text-decoration:none}
.botao-ico:hover{background:var(--s2)}
[data-theme="dark"] .so-claro,[data-theme="light"] .so-escuro{display:none!important}
main{padding:30px 32px 56px}
/* Cabeçalho da tela: título e explicação à esquerda, ações à direita, todas na altura da linha do título */
main>header{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:12px 20px;margin:0 0 20px}
main>header h1{line-height:var(--ctl)}
main>header .acoes-pag{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
main>header .acoes-pag>.botao,main>header .acoes-pag>button,main>header .acoes-pag select{height:var(--ctl);padding-top:0;padding-bottom:0}
main>header .acoes-pag>button.botao-olho{width:var(--ctl);padding:0}
.link-ajuda{display:inline-flex;align-items:center;gap:6px;margin-left:auto;padding:8px 10px;color:var(--t2);text-decoration:none;font-size:13px;font-weight:500;white-space:nowrap}.link-ajuda:hover{color:var(--azul)}
/* Ajuda: faixa do Resumo, passos com número (✓ quando feito) e o teste do pixel */
.faixa-ajuda{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;margin:0 0 16px;padding:10px 12px 10px 14px;border:1px solid color-mix(in srgb,var(--azul) 35%,var(--borda));border-radius:12px;background:var(--chip);color:var(--ink)}.faixa-ajuda>span{flex:1;min-width:200px}.faixa-ajuda>.ico{color:var(--azul)}.faixa-ajuda form{margin:0}.faixa-ajuda .botao-ico{width:32px;height:32px;border-color:transparent;background:transparent}
.ajuda-topo{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 20px;margin:0 0 14px}.ajuda-topo>div{display:grid;gap:6px;min-width:220px}.barra-mini.largo{width:220px;margin:0}
.passos-ajuda{display:grid;gap:10px}.passo-ajuda{border:1px solid var(--borda);border-radius:12px;background:var(--s1)}.passo-ajuda>summary{display:flex;align-items:center;gap:12px;padding:14px 16px;list-style:none;cursor:pointer}.passo-ajuda>summary::-webkit-details-marker{display:none}
.passo-n{display:inline-grid;place-items:center;flex:none;width:30px;height:30px;border-radius:999px;border:1px solid var(--borda2);font-weight:700;font-size:13px}.passo-ajuda.feito .passo-n{color:#fff;background:var(--ok);border-color:var(--ok)}
.passo-tit{display:grid;gap:2px;flex:1;min-width:0}.passo-tit small{color:var(--t2)}.passo-ajuda.feito .passo-tit b{color:var(--t2)}.passo-corpo{padding:0 16px 16px 58px}.passo-corpo .passos{margin-top:0}.passo-corpo .botoes-linha{margin-top:12px}.passo-corpo form{margin:0}
.casos{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}.caso{display:grid;gap:6px;align-content:start;padding:18px;text-decoration:none;color:var(--ink);transition:border-color .15s}.caso:hover{border-color:var(--azul)}.caso .ico{color:var(--azul)}.caso small{color:var(--t2)}
.pergunta{margin-bottom:16px}.caso-passos h4{margin:4px 0 10px}.passo-caso{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:1px solid var(--borda);border-radius:12px;cursor:pointer}.passo-caso input{position:absolute;opacity:0;width:1px;height:1px}
.passo-caso .passo-tit{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 14px}.passo-caso:has(input:checked) .passo-n{color:#fff;background:var(--ok);border-color:var(--ok)}.passo-caso:has(input:checked) .passo-tit>span{color:var(--t2);text-decoration:line-through}
.linha-teste{display:flex;flex-wrap:wrap;gap:10px;max-width:520px}.linha-teste input{flex:1;min-width:180px;text-transform:uppercase}
.icones-cab{display:inline-flex;gap:6px}.icones-cab .botao-ico{color:var(--t2)}.icones-cab .botao-ico:hover{color:var(--ink)}
html.privado .priv{filter:blur(7px);pointer-events:none;user-select:none}
.botao-olho{padding:0;width:var(--ctl);height:var(--ctl)}.botao-olho span{display:inline-grid;place-items:center;line-height:0}.botao-olho .olho-f,html.privado .botao-olho .olho-a{display:none}html.privado .botao-olho .olho-f{display:inline-grid}
html.privado .botao-olho{color:var(--ink);background:var(--chip)}
h1{font-size:28px;font-weight:700;letter-spacing:-.025em;margin:0}h2{font-size:16px;font-weight:700;margin:24px 0 12px}h3{font-size:15px;margin:0 0 8px}
.sub{color:var(--t2);margin:2px 0 0;max-width:68ch}

/* Peças comuns */
.chips{display:inline-flex;gap:4px;padding:4px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:var(--sombra)}
.chips a{padding:6px 12px;border-radius:9px;color:var(--t2);text-decoration:none;font-weight:500}.chips a.on{color:#fff;background:var(--grad)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}
.card{border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1);box-shadow:var(--sombra);padding:16px}
.card .rot{display:flex;align-items:center;gap:10px;color:var(--t2);font-size:13px;font-weight:500}
.card .rot i{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:9px;color:var(--chip-ink);background:var(--chip);font-style:normal}
.card .n{font-family:var(--fonte);font-size:26px;font-weight:700;margin:10px 0 2px;font-variant-numeric:tabular-nums}
.card .r{color:var(--t3);font-size:12px;border-top:1px dashed var(--borda);padding-top:8px;margin-top:8px}
.card.alerta{border-color:color-mix(in srgb,var(--erro) 40%,transparent);background:var(--erro-f)}.card.alerta .n{color:var(--erro)}.card.alerta .rot i{color:var(--erro);background:transparent}
.barra{display:flex;height:12px;border-radius:6px;overflow:hidden;background:var(--neutro-f);margin:10px 0}
.barra span{display:block;height:100%}.leg{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:var(--t2)}
.leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.filtros{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px}
.filtros a{padding:6px 12px;border:1px solid var(--borda);border-radius:999px;text-decoration:none;background:var(--s1);font-size:13px;color:var(--t2)}
.filtros a.on{color:#fff;background:var(--grad);border-color:transparent}
.busca{display:flex;gap:6px;flex:1;min-width:240px}
input,select,textarea{height:var(--campo,40px);padding:0 12px;border:1px solid var(--borda);border-radius:10px;background-color:var(--s2);color:var(--ink);font:inherit;width:100%}
select{-webkit-appearance:none;appearance:none;padding-right:36px;cursor:pointer;background-repeat:no-repeat;background-position:right 12px center;background-size:14px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238391A7' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")}
textarea{resize:vertical;min-height:42px}input:focus,select:focus,textarea:focus{outline:2px solid color-mix(in srgb,var(--azul) 45%,transparent);border-color:transparent}
.busca input{flex:1}
button,.botao{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:9px 16px;border:0;border-radius:10px;color:#fff;background:var(--primary);box-shadow:none;cursor:pointer;font:inherit;font-weight:600;text-decoration:none;white-space:nowrap}
button:disabled,.botao.desligado{opacity:.45;cursor:not-allowed;box-shadow:none}
.botao.leve,button.leve{color:var(--ink);background:var(--s1);border:1px solid var(--borda);box-shadow:none}
.botao.leve:hover,button.leve:hover{background:var(--s2)}
button.perigo{color:var(--erro);background:var(--erro-f);box-shadow:none}
.tab{overflow-x:auto;scrollbar-color:var(--borda2) transparent;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1);box-shadow:var(--sombra)}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--borda);vertical-align:top}
tbody tr:last-child td{border-bottom:0}th{font-weight:600;color:var(--t3);font-size:12px;white-space:nowrap;background:var(--s2)}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}.lista table{min-width:900px}
small,.sutil{color:var(--t3)}
.selo{display:inline-block;margin:2px 0;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;line-height:18px;letter-spacing:0;vertical-align:middle;white-space:nowrap}
/* Selo ao lado do título: altura própria (não herda a linha de 40px do título), centrado no texto */
h1 .selo,h2 .selo,h3 .selo{position:relative;top:-2px;margin:0 0 0 6px}
.s-ok{background:var(--ok-f);color:var(--ok)}.s-aviso{background:var(--aviso-f);color:var(--aviso)}.s-erro{background:var(--erro-f);color:var(--erro)}.s-neutro{background:var(--neutro-f);color:var(--t2)}
.mini{display:inline-block;width:60px;height:6px;border-radius:3px;background:var(--neutro-f);vertical-align:middle;margin-right:6px;overflow:hidden}.mini span{display:block;height:100%;background:var(--grad)}
.nota{color:var(--t3);font-size:12px;margin-top:8px}
.msg{padding:11px 14px;border-radius:12px;margin-bottom:16px;word-break:break-word}.msg.ok{background:var(--ok-f);color:var(--ok)}.msg.erro{background:var(--erro-f);color:var(--erro)}.msg.aviso{background:var(--aviso-f);color:var(--aviso)}
.form{display:grid;gap:18px;max-width:760px}.campo label{display:block;font-weight:600;margin-bottom:6px}.campo .ajuda{font-size:12px;color:var(--t3);margin-top:5px}
.opcoes{display:grid;gap:8px}.opcoes label{display:flex;gap:10px;align-items:flex-start;font-weight:400;padding:11px 13px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);cursor:pointer}
.opcoes label:has(input:checked){border-color:color-mix(in srgb,var(--azul) 55%,transparent);background:var(--chip)}
.opcoes input{width:auto;margin-top:3px;accent-color:var(--primary)}.opcoes b{display:block}
.campo-senha{position:relative;display:block;flex:1;min-width:0}.campo-senha input{width:100%;padding-right:44px}
.ver-senha{position:absolute;right:4px;top:50%;transform:translateY(-50%);width:36px;height:32px;padding:0;border:0;border-radius:8px;color:var(--t2);background:transparent;box-shadow:none}.ver-senha:hover{color:var(--ink);background:var(--s3)}
.copiar{display:flex;gap:6px}.copiar input{font-family:ui-monospace,Consolas,monospace;font-size:12px}
.grade2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
ol{padding-left:20px;margin:8px 0}li{margin:4px 0}
pre{white-space:pre-wrap;word-break:break-all;border:1px solid var(--borda);border-radius:12px;background:var(--s2);padding:12px;font-size:12px}
code{font-family:ui-monospace,Consolas,monospace;font-size:12px;padding:1px 5px;border-radius:5px;background:var(--s3)}
.lista-links{display:grid;gap:8px}.lista-links a,.lista-links button{display:flex;align-items:center;justify-content:flex-start;gap:12px;width:100%;padding:14px;border:1px solid var(--borda);border-radius:14px;color:var(--ink);background:var(--s1);box-shadow:none;text-decoration:none;font-weight:600}
.entrar{max-width:400px;margin:10vh auto;padding:16px}.entrar .card{display:grid;gap:16px;padding:30px 28px}.entrar .marca{justify-content:center;margin:4px 0 10px}.entrar .marca img{height:54px}
.entrar:has(.conectar-meta){max-width:470px}.texto-legal{max-width:760px;margin:40px auto;padding:28px;line-height:1.65}.texto-legal h1{font-size:22px}.texto-legal h3{margin-top:18px}.conectar-cab{display:flex;align-items:center;gap:12px}.conectar-cab h1{font-size:20px;margin:0}
.explica{padding:14px 16px;border-radius:12px;background:var(--chip);font-size:13px}.explica p{margin:6px 0 0}.botao.largo{width:100%}
.abas-pag{display:flex;gap:4px;margin:0 0 16px;border-bottom:1px solid var(--borda);overflow-x:auto;scrollbar-width:none}.abas-pag::-webkit-scrollbar{display:none}
.abas-pag a{display:flex;align-items:center;gap:8px;padding:10px 14px;margin-bottom:-1px;border-bottom:2px solid transparent;color:var(--t2);text-decoration:none;font-weight:600;white-space:nowrap}
.abas-pag a.on{color:var(--primary-2);border-color:var(--primary)}
.chave{position:relative;display:inline-block;width:40px;height:22px;flex:none}.chave input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer;z-index:1;width:100%;height:100%}
.chave span{position:absolute;inset:0;border-radius:999px;background:var(--borda2);transition:.15s}.chave span::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:999px;background:#fff;transition:.15s}
.chave input:checked+span{background:var(--primary)}.chave input:checked+span::after{left:21px}.chave input:disabled+span{opacity:.5}
.vazio-grande{display:grid;justify-items:center;gap:6px;text-align:center;padding:40px 20px;color:var(--t2)}.vazio-grande h3{margin:6px 0 0}.vazio-grande p{max-width:460px;margin:0 0 8px}
.faixa-demo{display:flex;align-items:center;gap:8px;margin:0 0 14px;padding:8px 12px;border-radius:10px;color:var(--aviso);background:var(--aviso-f);font-size:12.5px;font-weight:600}

/* Dashboard: filtros */
.painel-filtros{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;align-items:end;margin-bottom:16px;padding:14px 16px}
@media (min-width:861px){.painel-filtros{display:flex;flex-wrap:wrap;align-items:flex-start}.painel-filtros>.campo-olho{padding-top:22px}.painel-filtros>.campo{flex:1 1 150px;min-width:0}.painel-filtros>.campo.largo{flex:1.4 1 210px}.painel-filtros>.campo-olho{flex:0 0 auto}
.painel-filtros{position:sticky;top:12px;z-index:6;transition:box-shadow .2s,border-color .2s}.painel-filtros.solta{box-shadow:var(--sombra-pop);border-color:var(--borda2)}}
.painel-filtros .largo{grid-column:span 2}.conf-det{display:block;margin-top:4px;white-space:nowrap;color:var(--t3);font-size:11px}.acoes-linha{display:flex;gap:6px;flex-wrap:nowrap;justify-content:flex-end;white-space:nowrap}
.barra-lista{display:grid;grid-template-columns:minmax(170px,1fr) minmax(170px,1fr) minmax(240px,2fr) auto;gap:12px;align-items:end;padding:14px 16px;margin-bottom:12px}
.barra-lista.com-extra{grid-template-columns:minmax(170px,1fr) minmax(170px,1fr) minmax(240px,2fr) auto auto}
.barra-lista.tres{grid-template-columns:repeat(3,minmax(150px,1fr)) minmax(220px,1.6fr) auto}
.barra-lista .campo{margin:0}.barra-lista .campo>label{display:block;font-size:12.5px;font-weight:600;color:var(--t2);margin-bottom:6px}
.busca-campo{position:relative}.busca-campo .ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none}.busca-campo input{width:100%;padding-left:36px}
.multi{position:relative}.multi>summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:8px;height:var(--ctl);padding:0 12px;border:1px solid var(--borda);border-radius:9px;background:var(--s2);cursor:pointer;font-weight:500;white-space:nowrap;overflow:hidden}
.multi>summary::-webkit-details-marker{display:none}.multi>summary span{overflow:hidden;text-overflow:ellipsis}.multi[open]>summary{border-color:var(--primary)}.multi[open]>summary .ico{transform:rotate(180deg)}
.multi-painel{position:absolute;z-index:30;top:calc(100% + 6px);left:0;min-width:100%;width:max-content;max-width:320px;padding:8px;border:1px solid var(--borda2);border-radius:12px;background:var(--s1);box-shadow:var(--sombra-pop);display:grid;gap:2px}
.multi .multi-op{display:flex;align-items:center;gap:10px;margin:0;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:var(--ink)}.multi .multi-op:hover{background:var(--s2)}
.multi .multi-op input{flex:none;width:16px;height:16px;min-height:0;padding:0;accent-color:var(--primary);margin:0}.multi .multi-op small{margin-left:auto;padding-left:16px;color:var(--t3);font-variant-numeric:tabular-nums}
.multi-pe{display:flex;justify-content:space-between;gap:8px;border-top:1px solid var(--borda);padding-top:8px;margin-top:4px}
.barra-lote{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;margin-bottom:12px;background:color-mix(in srgb,var(--azul) 12%,var(--s1));border-color:color-mix(in srgb,var(--azul) 35%,var(--borda))}
.barra-lote b{margin-right:auto}
@media (max-width:860px){.barra-lista,.barra-lista.com-extra,.barra-lista.tres{grid-template-columns:1fr 1fr}.barra-lista .campo-busca{grid-column:1/-1}}
.chips-dados{display:flex;flex-wrap:wrap;gap:6px}.chip-dado{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:99px;font-size:12px;font-weight:600;color:var(--t2);background:var(--neutro-f)}.chip-dado b{color:var(--ink)}
.passos-acao{counter-reset:passo;list-style:none;padding-left:0}.passos-acao li{counter-increment:passo;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;margin-bottom:12px}
.passos-acao li::before{content:counter(passo);flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:var(--s3);color:var(--ink);font-size:12.5px;font-weight:700}.passos-acao li>span{flex:1 1 320px}.passos-acao .linha-teste{margin:0}
.linha-sutil{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-top:1px solid var(--borda);padding-top:12px;margin-top:6px}
.chip-dado.sim{color:var(--ok);background:var(--ok-f)}.chip-dado.nao{color:var(--t3);background:var(--neutro-f);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--t3) 50%,transparent)}
/* Ícone dentro de botão redondo/quadrado: o span (sol/lua) não pode ter altura de linha de texto, senão o desenho sobe */
.botao-ico>span{display:grid;place-items:center;line-height:0}.form-periodo{min-width:190px}.form-periodo .campo-periodo>label{display:none}.form-periodo .calendario{left:auto;right:0}.titulo-bloco{margin:18px 0 10px;font-size:16px}.titulo-com-acao{display:flex;align-items:center;justify-content:space-between;gap:10px}.resumo-faixa{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:16px;padding:0;overflow:hidden}.resumo-faixa>div{display:flex;flex-direction:column;gap:2px;padding:12px 16px;border-left:1px solid var(--borda);min-width:0}.resumo-faixa>div:first-child{border-left:0}.resumo-faixa small{color:var(--t2);font-size:12.5px;font-weight:500}.resumo-faixa b{font-size:20px;font-variant-numeric:tabular-nums;line-height:1.2}.resumo-faixa span,.resumo-faixa a{font-size:12.5px}.resumo-faixa .mini{width:100%;margin:6px 0 0}.resumo-faixa .atencao b,.resumo-faixa .atencao a{color:var(--erro)}@media (max-width:640px){.resumo-faixa{grid-template-columns:1fr 1fr}.resumo-faixa>div:nth-child(3){border-left:0}.resumo-faixa>div:nth-child(n+3){border-top:1px solid var(--borda)}}.campo-periodo{position:relative}.periodo-linha{display:flex;gap:6px}.periodo-linha select{flex:1;min-width:0}.datas-botao{flex:none}.calendario{position:absolute;top:calc(100% + 6px);left:0;z-index:40;width:292px;padding:10px;border:1px solid var(--borda2);border-radius:12px;background:var(--s1);box-shadow:var(--sombra-pop)}.cal-topo{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}.cal-topo .botao-ico{width:30px;height:30px;font-size:18px}.cal-grade{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}.cal-sem{font-size:11px;color:var(--t3);text-align:center;padding:4px 0}.cal-dia{height:34px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--ink);box-shadow:none;font-weight:500;cursor:pointer}.cal-dia:hover{background:var(--s3)}.cal-dia.fora{color:var(--t3);opacity:.5}.cal-dia.hoje{box-shadow:inset 0 0 0 1px var(--borda2)}.cal-dia.futuro{opacity:.3;cursor:default}.cal-dia.no-intervalo{background:var(--chip);color:var(--chip-ink);border-radius:0}.cal-dia.ponta{background:var(--primary);color:#fff;border-radius:8px}.cal-dica{margin:8px 0 0;font-size:12px;color:var(--t3)}.campo-olho .botao-olho{width:var(--ctl);height:var(--ctl);padding:0}.botao-filtros{display:none;position:relative}.botao-filtros.on{color:#fff;background:var(--grad);border-color:transparent}
.botao-filtros.com-filtro::after{content:"";position:absolute;top:7px;right:7px;width:8px;height:8px;border-radius:9px;background:var(--laranja)}.painel-filtros label{font-size:12px;color:var(--t3);font-weight:600;margin-bottom:4px}.painel-filtros select:disabled{opacity:.55}
/* Resumo: grade de cartões (k = número, b = bloco, w = largo) */
.dash{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:84px;grid-auto-flow:row dense;gap:14px}
.w-k{display:flex;flex-direction:column;justify-content:center;padding-top:10px;padding-bottom:10px}
.w{position:relative;min-width:0;overflow:hidden;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1);box-shadow:var(--sombra);padding:14px 16px}
.w-k{grid-column:span 3}.w-b{grid-column:span 3;grid-row:span 3}.w-w{grid-column:span 6;grid-row:span 3}.w-x{grid-column:1/-1;grid-row:span 3}
.w-m{grid-column:span 4;grid-row:span 3}.w-n{grid-column:span 5;grid-row:span 3}.w-h{grid-column:span 9;grid-row:span 3}
.w h3{display:flex;align-items:center;justify-content:space-between;gap:8px;font:600 13px/1.5 var(--fonte);letter-spacing:0;color:var(--t2);margin:0 0 12px}
.w-corpo{height:calc(100% - 34px);overflow-x:hidden;overflow-y:auto;scrollbar-width:thin}
.kpi-rot{display:flex;align-items:center;justify-content:space-between;gap:6px;color:var(--t2);font-size:13px;font-weight:600}
.kpi-n{font-family:var(--fonte);font-size:24px;font-weight:700;margin-top:6px;line-height:1.15;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.w.aviso .kpi-rot,.w.aviso .kpi-n{color:var(--aviso)}.kpi-link{color:inherit;text-decoration:none}.kpi-link:hover{text-decoration:underline}.marcar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.marcar .outra{display:flex;gap:6px}.marcar .outra input{width:170px;padding:5px 8px;font-size:12px}.w.verde .kpi-rot,.w.verde .kpi-n,.pos{color:var(--ok)}.w.vermelho .kpi-rot,.w.vermelho .kpi-n,.neg{color:var(--erro)}
.kpi-meta{display:inline-block;font-size:11.5px;color:var(--primary-2);text-decoration:none;font-weight:600}
.dica{display:inline-flex;color:var(--t3);cursor:help;vertical-align:-2px;margin-left:4px}
.rank{display:grid;gap:11px}.rank-l{display:grid;grid-template-columns:minmax(0,1fr) auto 22px 44px;align-items:center;gap:8px;font-size:13px}
.rank-nome{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--t2)}.rank-l b{font-variant-numeric:tabular-nums}.rank-l small{text-align:right;font-variant-numeric:tabular-nums}
.anel{width:22px;height:22px;border-radius:50%;background:conic-gradient(var(--primary) calc(var(--p)*1%),var(--neutro-f) 0);-webkit-mask:radial-gradient(circle,transparent 6px,#000 7px);mask:radial-gradient(circle,transparent 6px,#000 7px)}
.vazio{color:var(--t3);font-size:13px;margin:0}
/* Rosca: ocupa o bloco, legenda logo abaixo */
.rosca{display:grid;grid-template-rows:minmax(0,1fr) auto;justify-items:center;align-items:center;gap:12px;height:100%}
.rosca svg{height:100%;max-height:200px;width:auto;max-width:100%;overflow:visible}.rosca circle[stroke-dasharray]{transition:stroke-width .15s;cursor:pointer}.rosca circle[stroke-dasharray]:hover{stroke-width:24}
.rosca-t{fill:var(--t3);font-size:11px}.rosca-n{fill:var(--ink);font:700 22px var(--fonte)}.rosca .leg{justify-content:center}
/* Balão que aparece ao passar o mouse (ou tocar) nos gráficos */
.balao{display:none;position:absolute;z-index:3;top:4px;left:50%;transform:translateX(-50%);min-width:140px;padding:8px 10px;border:1px solid var(--borda2);border-radius:10px;background:var(--s1);box-shadow:var(--sombra-pop);color:var(--t2);font:500 12px/1.4 var(--fonte);text-align:left;white-space:normal;width:max-content;max-width:250px;pointer-events:none;writing-mode:horizontal-tb}
.balao b{display:block;color:var(--ink);font-size:12.5px;margin-bottom:2px}
.esq>.balao{left:0;transform:none}.dir>.balao{left:auto;right:0;transform:none}
/* Barras: % em cima, linhas de grade ao fundo, quantidade no balão */
.barras{position:relative;display:flex;align-items:stretch;gap:10px;height:100%;min-height:170px;overflow:hidden;
  background:repeating-linear-gradient(to top,transparent 0,transparent calc(25% - 1px),var(--borda) calc(25% - 1px),var(--borda) 25%) 0 22px/100% calc(100% - 50px) no-repeat}
.barra-col{position:relative;flex:1;display:grid;grid-template-rows:minmax(0,1fr) auto;justify-items:center;min-width:0;outline:0;cursor:default}
/* A % fica sempre logo acima do topo da barra: as duas ficam numa coluna alinhada embaixo */
.barra-area{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:4px;width:100%;height:100%;min-height:0}
.barra-b{--r:0;width:46%;max-width:34px;min-width:6px;height:calc((100% - 22px) * var(--r));min-height:2px;border-radius:4px 4px 1px 1px;background:var(--grad);transition:filter .15s}
.barra-col:hover .barra-b,.barra-col:focus .barra-b{filter:brightness(1.25)}.barra-col:hover .balao,.barra-col:focus .balao{display:block}
.barra-v{font-size:12px;font-weight:600;color:var(--t2);font-variant-numeric:tabular-nums;white-space:nowrap}
.barra-col small{font-size:12px;margin-top:8px;white-space:nowrap;color:var(--t2)}
.barras.apertadas{gap:4px}.barras.apertadas .barra-b{width:52%;max-width:22px}.barras.apertadas .barra-v{font-size:11px}
/* Funil: faixa em degradê atrás das colunas */
.funil{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));height:100%;min-height:196px}
.funil-svg{position:absolute;left:0;right:0;top:34px;bottom:34px;width:100%;height:calc(100% - 68px)}
.funil-e{position:relative;display:grid;grid-template-rows:34px 1fr 34px;align-items:center;justify-items:center;text-align:center;border-left:1px solid color-mix(in srgb,var(--azul) 30%,transparent);outline:0}
.funil-e:first-of-type{border-left:0}.funil-e:hover .balao,.funil-e:focus .balao{display:block;top:38px}
.funil-e>b{font-size:12.5px;font-weight:600;color:var(--t2,#475569);align-self:center}
.funil-n{position:relative;font:700 16px/1 var(--fonte);color:#fff;text-shadow:0 1px 3px rgba(15,23,42,.45);font-variant-numeric:tabular-nums}
.funil-e.fina .funil-n{font-size:13.5px}
.funil-e.fio .funil-n{color:var(--ink);text-shadow:-2px 0 var(--s1),2px 0 var(--s1),0 -2px var(--s1),0 2px var(--s1),-2px -2px var(--s1),2px -2px var(--s1),-2px 2px var(--s1),2px 2px var(--s1)}
.funil-s{align-self:center;font-size:11.5px;color:var(--t3,#94a3b8);font-variant-numeric:tabular-nums}
.funil-aviso{position:absolute;right:0;top:-30px;color:var(--t3);font-size:11px}
.w-corpo:has(.funil){overflow:visible}
.funil-destaque{position:absolute;right:0;top:-34px;padding:2px 10px;border-radius:999px;font-size:11.5px;color:var(--t2);background:var(--chip)}.funil-destaque b{color:var(--ink)}
/* Resumo: modo Editar */
.resumo-corpo{display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
.disponiveis,.editando-barra,.w-ctrl{display:none}
body.editando .resumo-corpo{grid-template-columns:230px minmax(0,1fr)}
body.editando .disponiveis{display:block;position:sticky;top:88px;align-self:start;max-height:calc(100vh - 108px);overflow:auto;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1);padding:14px}
.disp-grupo{display:grid;gap:6px;margin-bottom:14px}.disp-grupo small{font-weight:600;font-size:12px}
.disp-grupo button{justify-content:flex-start;padding:8px 10px;font-weight:600;font-size:13px;white-space:normal;text-align:left}
.disp-grupo button.usado{opacity:.45}
body.editando .editando-barra{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 20px;position:sticky;top:12px;z-index:7;margin-bottom:16px;padding:10px 12px 10px 16px;border-radius:12px;color:#fff;background:var(--grad);font-weight:600}
.editando-barra span:first-child{display:flex;align-items:center;gap:8px}.editando-barra .acoes-pag{display:flex;flex-wrap:wrap;gap:10px}.editando-barra button{height:var(--ctl);padding-top:0;padding-bottom:0}
.editando-barra .leve{color:#fff;background:transparent;border:1px solid rgba(255,255,255,.55)}.editando-barra .leve:hover{background:rgba(255,255,255,.14)}.editando-barra #salvar{color:var(--primary);background:#fff}
body.editando main>header .acoes-pag{display:none}body.editando .painel-filtros{position:static;box-shadow:none}
body.editando .w{outline:2px dashed color-mix(in srgb,var(--azul) 45%,transparent);outline-offset:-4px;cursor:grab}body.editando .w.arrastando{opacity:.4}
body.editando .w-ctrl{display:flex;gap:4px;position:absolute;right:8px;top:8px;z-index:2;padding:2px;border-radius:10px;background:var(--s1)}body.editando .w .dica{display:none}
.w-ctrl button{width:28px;height:28px;padding:0;border-radius:8px}.w-arrastar{display:inline-grid;place-items:center;width:28px;height:28px;color:var(--t3)}
/* Meta e UTMs */
.niveis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-bottom:12px;padding:5px;border:1px solid var(--borda);border-radius:14px;background:var(--s1);box-shadow:var(--sombra)}
.niveis a{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-radius:10px;color:var(--t2);text-decoration:none;font-weight:600}.niveis a.on{color:#fff;background:var(--grad)}
.linha-avisos{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}.linha-avisos:empty{display:none}
.tab.lista{max-height:72vh;overflow:auto}.lista thead th{position:sticky;top:0;z-index:2;background:var(--s2)}
.lista tr.grupo td{background:var(--s2);border-top:2px solid var(--borda2);padding-top:10px;padding-bottom:10px}
.lista tr.grupo .g-acao{float:right;font-size:12.5px}
.cliente{display:inline-flex;align-items:center;gap:6px}.filtro-cliente{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:6px;color:var(--t3)}
.filtro-cliente:hover{color:var(--azul);background:var(--chip)}.vendas-lista .produto{white-space:normal;text-align:left}
.linha-tempo{list-style:none;margin:0;padding:0 0 0 14px;border-left:2px solid var(--borda);display:grid;gap:12px}
.linha-tempo li{position:relative;display:grid;gap:2px}.linha-tempo li::before{content:"";position:absolute;left:-20px;top:5px;width:10px;height:10px;border-radius:3px;background:var(--azul)}
.lt-quando{font-size:12px;color:var(--t3)}.lt-bruto{font-size:12.5px;justify-self:start}
.aviso-track,.chip-filtro{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:600;text-decoration:none}
.aviso-track{color:var(--aviso);background:var(--aviso-f)}.chip-filtro{color:var(--chip-ink);background:var(--chip)}
@keyframes girar{to{transform:rotate(360deg)}}.roda-carga{flex:none;display:inline-block;width:28px;height:28px;border:3px solid color-mix(in srgb,var(--azul) 25%,transparent);border-top-color:var(--azul);border-radius:50%;animation:girar .8s linear infinite}
.carregando-tela{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:color-mix(in srgb,var(--fundo,#F1F2F4) 70%,transparent);backdrop-filter:blur(2px)}
.carregando-tela>div{display:grid;justify-items:center;gap:10px;max-width:340px;padding:26px 28px;border:1px solid var(--borda);border-radius:18px;background:var(--s1);box-shadow:var(--sombra-pop);text-align:center}.carregando-tela small{color:var(--t2)}.girando svg{animation:girar .9s linear infinite}button.girando{opacity:.85;cursor:progress}
.tabela-meta table{min-width:1700px;border-collapse:separate;border-spacing:0}
/* Meta: a tabela rola dentro dela (títulos, nome e total presos; a barra de rolar para o lado sempre à vista) */
.tabela-meta{overflow:auto;max-height:calc(100vh - 110px);overscroll-behavior:contain}
.tabela-meta thead th{position:sticky;top:31px;z-index:3;background:var(--s2)}
.tabela-meta thead tr.grupo th{top:0;height:31px;padding:6px 12px;font-size:12px;font-weight:700;text-align:center;color:var(--ink);border-bottom:1px solid var(--borda)}
.tabela-meta thead th.col-nome{z-index:6}
.tabela-meta tfoot td{position:sticky;bottom:0;z-index:3;background:var(--s2);border-top:1px solid var(--borda2)}
.tabela-meta tfoot td.titulo{z-index:6}
.tabela-meta td.titulo{z-index:4}
.tabela-meta th.g-meta{background:color-mix(in srgb,var(--azul) 24%,var(--s2))}
.tabela-meta th.g-pixel{background:color-mix(in srgb,var(--ok) 22%,var(--s2))}
.tabela-meta th.g-resto{text-align:left}
.tabela-meta td.col-m{background:color-mix(in srgb,var(--azul) 9%,var(--s1))}
.tabela-meta td.col-p{background:color-mix(in srgb,var(--ok) 8%,var(--s1))}
.tabela-meta .costura{width:14px;min-width:14px;max-width:14px;padding:0!important;border-left:1px dashed var(--borda2)!important;border-right:1px dashed var(--borda2);background:var(--s1)}
.tabela-meta thead .costura,.tabela-meta tfoot .costura{background:var(--s2)}
.tabela-meta td small.dif{display:block;font-size:12px;font-weight:700;color:var(--aviso);white-space:nowrap}
.nome-marca{display:flex;align-items:flex-start;gap:10px}
.tabela-meta .marca{width:16px;height:16px;margin:2px 0 0;flex:none;accent-color:var(--primary);cursor:pointer}
.tabela-meta .marca{display:inline-block}
.tabela-meta th.col-nome{white-space:nowrap}
.tabela-meta th.col-nome .marca{margin:0 10px 0 0;vertical-align:-3px}
.tabela-meta tbody tr:hover td,.tabela-meta tbody tr:hover td.titulo{background:color-mix(in srgb,var(--azul) 7%,var(--s1))}
.tabela-meta tbody tr.marcada td,.tabela-meta tbody tr.marcada td.titulo{background:color-mix(in srgb,var(--azul) 13%,var(--s1))}
.niveis a .de-marcados{font-size:11.5px;font-weight:700;color:var(--primary-2);margin-left:4px}
.niveis a.on .de-marcados{color:inherit;opacity:.75}
.tabela-meta th.col-nome,.tabela-meta td.titulo{position:sticky;left:0;z-index:2;background:var(--s1);background-clip:border-box;box-shadow:1px 0 0 var(--borda2)}.tabela-meta thead th.col-nome,.tabela-meta tfoot td.titulo{background:var(--s2)}
.tabela-meta th.col-nome{padding-right:16px}.alca-coluna{position:absolute;top:0;right:-4px;width:12px;height:100%;cursor:col-resize;touch-action:none;z-index:3}.alca-coluna::after{content:"";position:absolute;top:22%;bottom:22%;left:5px;width:2px;border-radius:2px;background:var(--borda2)}.alca-coluna:hover::after,.alca-coluna.arrastando::after{background:var(--primary)}.tabela-meta[style*="--largura-nome"] th.col-nome,.tabela-meta[style*="--largura-nome"] td.titulo{width:var(--largura-nome)!important;min-width:var(--largura-nome)!important;max-width:var(--largura-nome)!important;overflow-wrap:anywhere}:is(.tab.cartoes,.tab.grade) th{font-size:12px}:is(.tab.cartoes,.tab.grade) td{vertical-align:middle;white-space:nowrap}
:is(.tab.cartoes,.tab.grade) td.titulo{white-space:normal;min-width:200px}:is(.tab.cartoes,.tab.grade) td.titulo a{text-decoration:none}:is(.tab.cartoes,.tab.grade) td.titulo a:hover b{color:var(--primary-2);text-decoration:underline}
.tab th a{color:inherit;text-decoration:none}.tab th a:hover{color:var(--ink)}.tab th a.ordem{color:var(--primary-2)}
.tab th .seta{display:inline-block;min-width:10px;margin-left:3px;font-size:9px}
:is(.tab.cartoes,.tab.grade) th,:is(.tab.cartoes,.tab.grade) td{border-left:1px solid var(--borda)}:is(.tab.cartoes,.tab.grade) th:first-child,:is(.tab.cartoes,.tab.grade) td:first-child{border-left:0}
:is(.tab.cartoes,.tab.grade) th{border-bottom:1px solid var(--borda2)}:is(.tab.cartoes,.tab.grade) tbody tr:hover td{background:color-mix(in srgb,var(--azul) 6%,var(--s1))}
:is(.tab.cartoes,.tab.grade) td.sel,:is(.tab.cartoes,.tab.grade) th.sel{width:42px;text-align:center}:is(.tab.cartoes,.tab.grade) td.sel input,:is(.tab.cartoes,.tab.grade) th.sel input{width:16px;height:16px;accent-color:var(--primary)}
:is(.tab.cartoes,.tab.grade) td.quebra{white-space:normal;min-width:220px;max-width:360px}:is(.tab.cartoes,.tab.grade) td.quebra small{display:block;overflow-wrap:anywhere}
.tab.avisos td.titulo{min-width:0;width:1%;white-space:nowrap}.tab.avisos td.quebra{min-width:110px;max-width:none}.tab.avisos td[data-rot="Cliente"]{min-width:200px}.tab.avisos td[data-rot="Detalhe"]{max-width:230px}.tab.avisos :is(th,td){padding:10px 10px}
/* Peças comuns das telas: cartões de número, blocos com título e barra de ferramentas */
.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:14px}
.kpi-solto{display:grid;align-content:start;gap:2px}.kpi-solto .kpi-rot{justify-content:flex-start;gap:9px}
.kpi-ico{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;color:var(--chip-ink);background:var(--chip)}
.kpi-sub{color:var(--t3);font-size:12px;margin-top:4px;border-top:1px dashed var(--borda);padding-top:8px}
.kpi-solto.alerta{border-color:color-mix(in srgb,var(--erro) 40%,transparent);background:var(--erro-f)}.kpi-solto.alerta .kpi-n{color:var(--erro)}.kpi-solto.alerta .kpi-ico{color:var(--erro);background:transparent}
.bloco{margin-bottom:14px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1);box-shadow:var(--sombra);overflow:hidden}
.bloco-cab{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid var(--borda)}.bloco-cab h3{margin:0}
.bloco-corpo{padding:14px 16px}.bloco-corpo.sem-pad{padding:0}.bloco-corpo.sem-pad .tab{border:0;border-radius:0;box-shadow:none}
.segmentos{display:flex;gap:6px;margin-bottom:12px;padding:5px;border:1px solid var(--borda);border-radius:14px;background:var(--s1);box-shadow:var(--sombra);overflow-x:auto;scrollbar-width:none}
.segmentos::-webkit-scrollbar{display:none}.segmentos a{flex:1;padding:9px 12px;border-radius:10px;color:var(--t2);text-decoration:none;font-weight:600;text-align:center;white-space:nowrap}
.segmentos a.on{color:#fff;background:var(--grad)}
.ferramentas{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:14px;padding:12px 14px}
.ferramentas .busca{flex:1;min-width:260px}.ferramentas .lote{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0}
.form-periodo{margin:0;min-width:180px}.botao-mini{padding:6px 12px;font-size:13px}.voltar{display:inline-flex;align-items:center;gap:6px;margin-bottom:8px;color:var(--t2);text-decoration:none;font-weight:600}.voltar:hover{color:var(--ink)}
.tab tfoot td{background:var(--s2);border-top:1px solid var(--borda2)}
.janela{width:min(560px,calc(100vw - 32px));max-height:80vh;padding:20px;border:1px solid var(--borda);border-radius:16px;color:var(--ink);background:var(--s1);box-shadow:var(--sombra-pop)}
.janela::backdrop{background:rgba(15,23,42,.5)}
.segredo{-webkit-text-security:disc;font-family:var(--fonte)}
/* Janela em blocos: cada assunto com título e espaço (Conexão, Envio à Meta, Produtos) */
.form-janela{display:grid}.secao-janela{display:grid;gap:16px;padding:18px 0;border-top:1px solid var(--borda)}.secao-janela:first-child{border-top:0;padding-top:6px}
.secao-janela>h4{margin:0;font-size:12.5px;font-weight:700;color:var(--t2)}.secao-janela .campo{margin:0}.secao-janela .ajuda{margin-top:6px}
/* Sanfona de produtos: fechada mostra quantos estão marcados; aberta, Marcar todos + a lista */
.sanfona-produtos{border:1px solid var(--borda);border-radius:12px;background:var(--s1)}.sanfona-produtos>summary{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;list-style:none;cursor:pointer}
.sanfona-produtos>summary::-webkit-details-marker{display:none}.sanfona-produtos[open]>summary .ico{transform:rotate(180deg)}.sanfona-produtos>summary small{margin-left:6px}
.sanfona-corpo{display:grid;gap:10px;padding:0 14px 14px;max-height:360px;overflow:auto}.marcar-todos{display:flex;align-items:center;gap:8px;padding:6px 2px;font-weight:600;cursor:pointer}.marcar-todos input{width:auto;margin:0;accent-color:var(--primary)}
/* Janela compacta (editar/criar usuário): tudo numa tela, uma linha por assunto, botões juntos no rodapé */
.janela-larga{width:min(760px,calc(100vw - 32px));max-height:92vh}.form-compacto{display:grid;gap:12px;margin-top:12px;padding-top:14px;border-top:1px solid var(--borda)}.form-compacto .campo{margin:0}
.linha-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.linha-rot{display:grid;grid-template-columns:150px 1fr;align-items:center;gap:12px}.linha-rot>.rot{font-weight:600;font-size:13px}.linha-rot .rot .ico{vertical-align:-2px}
.contador{display:inline-flex;align-items:center;border:1px solid var(--borda);border-radius:9px;overflow:hidden;background:var(--s1)}.contador button{width:34px;height:34px;padding:0;border:0;border-radius:0;color:var(--ink);background:var(--s2);box-shadow:none;font-size:16px}.contador input{width:48px;height:34px;padding:0;border:0;border-radius:0;text-align:center;-moz-appearance:textfield}.contador input::-webkit-inner-spin-button,.contador input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
.rodape-janela{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid var(--borda)}.rodape-janela form{margin:0}.rodape-janela .empurra{margin-left:auto}.janela h3{margin:0}
.lista-colunas{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;margin:12px 0;max-height:50vh;overflow:auto}
.lista-colunas label{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;background:var(--s2);font-size:13px}.lista-colunas input{width:auto;accent-color:var(--primary)}
.acoes-janela{display:flex;justify-content:flex-end;gap:8px}
/* Integrações */
.grade-integ{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:14px;align-items:start}
.integ-cab{display:flex;gap:12px;align-items:center;margin-bottom:12px}.integ-cab h3{margin:0}
.codigo{max-width:820px;border:1px solid var(--borda);border-radius:12px;background:var(--s2);overflow:hidden}.codigo-cab{display:flex;align-items:center;justify-content:space-between;padding:7px 10px 7px 14px;border-bottom:1px solid var(--borda);font-size:12px;color:var(--t3)}.codigo pre{margin:0;padding:14px 16px;overflow:auto;font:12.5px/1.65 ui-monospace,Consolas,'Courier New',monospace;white-space:pre;color:var(--ink)}.pilha{display:grid;gap:14px}.form-colunas{align-items:start;gap:14px}.form-colunas .campo{margin-bottom:12px}.linha-campo{display:flex;gap:6px;margin-bottom:6px}.linha-campo input{flex:1}.vazio-ev{display:grid;gap:6px;padding:8px 0}.vazio-ev b{font-size:14px}.lista-pixels{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:14px;margin-top:14px}.pixel-card{display:grid;gap:12px}.pixel-topo{display:flex;align-items:center;justify-content:space-between;gap:10px;text-decoration:none;color:var(--ink)}.pixel-nome{font-weight:700;font-size:16px}.lista-paginas{grid-template-columns:repeat(3,minmax(0,1fr))}@media (max-width:1200px){.lista-paginas{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:860px){.lista-paginas{grid-template-columns:1fr}}
.pixel-dados{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;margin:0}.situacao-faixa{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}.pixel-dados dt{font-size:12px;color:var(--t3)}.pixel-dados dd{margin:2px 0 0;font-size:13px;word-break:break-word}.pixel-rodape{display:flex;flex-wrap:wrap;gap:8px;border-top:1px solid var(--borda);padding-top:12px}.plat-ico{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:4px;border-radius:6px;font:700 12px/1 var(--fonte);color:#fff;background:var(--c)}.plats{display:flex;flex-wrap:wrap;gap:8px}.plat{display:inline-flex;align-items:center;gap:6px;padding:7px 12px 7px 8px;border:1px solid var(--borda);border-radius:10px;cursor:pointer;font-size:13px}.plat{position:relative;user-select:none}.plat:has(input:checked){border-color:var(--azul);background:color-mix(in srgb,var(--azul) 12%,transparent);font-weight:600}.plat:not(:has(input:checked)){opacity:.6}.plat input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}.form-pixel{display:grid;gap:14px}.form-pixel>button{justify-self:start}.form-pixel h3{margin:0 0 12px}.form-pixel details{margin-top:6px}.excluir-pixel{margin-top:22px}.notas{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.nota-ev{display:grid;gap:2px;min-width:150px;padding:12px 14px;border:1px solid var(--borda);border-radius:12px}.nota-ev b{font-size:26px}.nota-ev b span{font-size:13px;color:var(--t3)}.aviso-txt{color:var(--aviso)}.barra-mini{display:inline-block;width:60px;height:6px;margin-right:6px;border-radius:9px;background:var(--s2);vertical-align:middle;overflow:hidden}.barra-mini span{display:block;height:100%;background:var(--azul)}.passos{display:grid;gap:10px;margin:14px 0 0;padding-left:20px}.linha-admin .selo{justify-self:start}.faixa-admin{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;padding:8px 16px;color:#fff;background:linear-gradient(90deg,#7C3AED,#2563EB);font-size:13px}.faixa-admin form{margin:0}.faixa-admin button{color:#2563EB;background:#fff;box-shadow:none}.lista-admin{display:grid;gap:8px}.linha-admin{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid var(--borda);border-radius:12px}.linha-admin>div{display:grid;gap:2px;min-width:0}.pixel-item{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;margin-bottom:10px;border:1px solid var(--borda);border-radius:12px}.pixel-info{display:grid;gap:3px;min-width:0}.pixel-info small{color:var(--t2)}.pixel-acoes{display:flex;align-items:center;gap:6px}.form-pixel h3{margin:18px 0 8px}.compacto .card{padding:16px 18px}.compacto h3,.compacto .card-cab h3{margin:0 0 10px}.compacto .card-cab{margin-bottom:4px}.compacto .campo{margin-bottom:12px}.compacto .grade2{gap:12px}.compacto details.passo-a-passo{margin-top:2px}.marcar{display:flex;align-items:center;gap:8px;font-size:13.5px;cursor:pointer}.marcar input{width:auto;margin:0}.card-cab{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.card-cab h3{margin:0}.botao.pequeno{padding:6px 12px;font-size:13px}.perfil-nome{display:grid;flex:1;min-width:0}.menu-perfil{position:relative}.menu-perfil>summary{list-style:none;cursor:pointer;display:grid;place-items:center;width:32px;height:32px;border-radius:9px;font-size:20px;line-height:1;color:var(--t2)}.menu-perfil>summary::-webkit-details-marker{display:none}.menu-perfil>summary:hover,.menu-perfil[open]>summary{background:var(--s2)}.menu-pop{position:absolute;right:0;top:36px;z-index:20;min-width:210px;display:grid;gap:6px;padding:10px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:var(--sombra)}.menu-pop small{color:var(--t3)}.item-menu{width:100%;text-align:left;padding:8px 10px;border:0;border-radius:8px;background:none;font:inherit;cursor:pointer}.item-menu:hover{background:var(--s2)}.perigo-txt{color:var(--erro)}.ativar-todas{justify-content:flex-end;gap:12px;color:var(--t2)}.perfil-erro{color:var(--erro)}button.mini{padding:4px 10px;font-size:12px}
.fb-logo{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:12px;color:#fff;background:#1877F2}
.perfis{display:grid;gap:8px;margin-bottom:12px}.perfil{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--borda);border-radius:12px}
.grupo-contas{border:1px solid var(--borda);border-radius:12px;margin-top:8px}.grupo-contas summary{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;cursor:pointer;list-style:none}.grupo-contas summary::-webkit-details-marker{display:none}.grupo-contas summary>span{display:grid;gap:2px}.grupo-contas summary small{color:var(--t3)}.grupo-contas[open] summary .ico{transform:rotate(180deg)}.grupo-contas[open] summary{border-bottom:1px solid var(--borda)}
.conta-linha{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border-top:1px solid var(--borda)}

/* Acabamento: azul é ação, tinta é seleção */
button:hover,.botao:hover{background:var(--primary-2)}[data-theme="dark"] button:hover,[data-theme="dark"] .botao:hover{background:#2753D6}
button:focus-visible,.botao:focus-visible,a:focus-visible,summary:focus-visible,.botao-ico:focus-visible{outline:2px solid var(--azul);outline-offset:2px}
.chips a.on,.filtros a.on,.segmentos a.on,.niveis a.on,.botao-filtros.on{color:var(--tinta-ink);background:var(--tinta);border-color:transparent}
.abas a.on{color:var(--ink);background:var(--s3)}
.kpi-n{font-size:26px;font-weight:700;letter-spacing:-.02em}.card .n{letter-spacing:-.02em}
.kpi-rot{font-weight:500}.w h3{font-weight:600;color:var(--ink)}
.faixa-admin{color:var(--tinta-ink);background:var(--tinta)}.faixa-admin button{color:#fff;background:var(--azul)}
[data-theme="dark"] .faixa-admin{color:var(--ink);background:var(--s3);border-bottom:1px solid var(--borda)}.faixa-admin span::before{content:"";display:inline-block;width:7px;height:7px;margin-right:9px;border-radius:1px;background:var(--laranja);vertical-align:1px}
.voltar .ico{margin-left:-4px}
.lista-projetos{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));gap:12px;margin-bottom:18px}
.projeto-linha{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1)}
.projeto-linha form{margin:0}.projeto-info{display:grid;gap:2px;flex:1;min-width:0}.projeto-info b{font-size:15px}.projeto-info small{overflow:hidden;text-overflow:ellipsis}
.quadro.grande{width:40px;height:40px;border-radius:9px;font-size:14px}
.menu-perfil>summary{color:var(--t2)}.menu-pop{box-shadow:var(--sombra-pop)}.menu-pop form{margin:0}.menu-pop .item-menu{color:var(--ink);background:none;justify-content:flex-start;font-weight:500}.menu-pop .item-menu.perigo-txt{color:var(--erro)}
td.num .menu-perfil{display:inline-block}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

/* Rosca: legenda numa linha só, embaixo */
.rosca .leg{flex-wrap:nowrap;justify-content:center;gap:10px;font-size:11.5px;white-space:nowrap}.rosca .leg i{width:8px;height:8px;border-radius:2px;margin-right:4px}
/* Passo a passo recolhido: abre só quando a pessoa vai fazer */
.passo-a-passo{margin-top:4px;border-top:1px solid var(--borda);padding-top:10px}.passo-a-passo>summary{cursor:pointer;color:var(--primary-2);font-weight:600;font-size:13px;list-style:none;display:inline-flex;align-items:center;gap:6px}
.passo-a-passo>summary::-webkit-details-marker{display:none}.passo-a-passo>summary::before{content:none}.passo-a-passo>summary::after{content:"";width:7px;height:7px;margin:-3px 0 0 2px;border:solid currentColor;border-width:0 2px 2px 0;transform:rotate(45deg);transition:transform .15s}.passo-a-passo[open]>summary::after{transform:rotate(-135deg);margin-top:3px}
/* Dobra (padrão dos apps, 07/11/2026): bloco fechado com título + situação; abre ao tocar e lembra o que estava aberto */
.dobras{display:grid;gap:8px}.dobras-titulo{margin:22px 0 8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t3)}.dobras-titulo:first-child{margin-top:4px}
.dobra{border:1px solid var(--borda);border-radius:14px;background:var(--s1);box-shadow:var(--sombra)}
.dobra>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;padding:13px 16px;min-height:52px}.dobra>summary::-webkit-details-marker{display:none}
.dobra>summary .dobra-ico{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:var(--neutro-f);color:var(--t2);flex:none}
.dobra>summary b{font-size:14.5px}.dobra>summary small{color:var(--t3);font-size:12.5px;margin-left:auto;text-align:right}
.dobra>summary::after{content:"";width:7px;height:7px;margin:-4px 2px 0 6px;border:solid var(--t3);border-width:0 2px 2px 0;transform:rotate(45deg);transition:transform .15s;flex:none}
.dobra[open]>summary::after{transform:rotate(-135deg);margin-top:4px}.dobra[open]>summary{border-bottom:1px solid var(--borda)}
.dobra-corpo{display:grid;gap:12px;padding:14px 16px 16px}.dobra-corpo>p{margin:0}
.ajuda-dobra>summary{cursor:pointer;list-style:none;display:inline-flex;align-items:center;gap:6px;color:var(--primary-2);font-weight:600;font-size:13px}.ajuda-dobra>summary::-webkit-details-marker{display:none}
.ajuda-dobra>div{margin-top:8px;padding:10px 12px;border-radius:10px;background:var(--neutro-f);color:var(--t2);font-size:13px;line-height:1.55}.ajuda-dobra ol,.ajuda-dobra ul{margin:4px 0 0;padding-left:18px}
@media (max-width:760px){.dobra>summary small{display:none}}
.passo-a-passo>*:not(summary){margin-top:12px}.passo-a-passo ol{font-size:13px;color:var(--t2)}
.pilha-card{display:grid;gap:14px;align-content:start}.pilha-card .campo{margin:0}.pilha-card .card-cab{margin:0}
/* App e notificações: dois passos */
.passos-app{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px;margin-bottom:14px;align-items:start}
.passo-app{display:grid;gap:12px;align-content:start}.passo-app .sutil{margin:0}
.passo-cab{display:flex;align-items:center;gap:10px}.passo-cab h3{margin:0}
.passo-n{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:6px;color:var(--tinta-ink);background:var(--tinta);font-weight:700;font-size:13px}
.passo-app.feito .passo-n{color:#fff;background:var(--ok)}
.botoes-linha{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.aparelho{display:grid;gap:2px;padding:10px 0;border-bottom:1px solid var(--borda)}.aparelho:last-child{border-bottom:0}
.janela .passos{margin-top:14px}.janela .passos li{padding-left:4px}.janela .passos .ico{vertical-align:-3px}
/* Janelas (pop-up) com seções */
.janela{display:none}.janela[open]{display:grid;gap:0}.janela .card-cab{margin:0 0 6px}.janela-secao{padding:16px 0 0;margin-top:16px;border-top:1px solid var(--borda)}.janela-acoes{display:flex;flex-wrap:wrap;gap:8px}.janela-acoes form{margin:0}
/* Minha conta */
.conta-grade{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start;max-width:1100px}.conta-grade .bloco{margin:0}
.linha-conta{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0}.linha-conta>div:first-child{display:grid;gap:1px}.linha-conta small{color:var(--t3)}
.linha-conta form{margin:0}.com-quadro{display:flex!important;align-items:center;gap:10px!important}
.tema-escolha{margin:0;box-shadow:none}.tema-escolha a{padding:6px 14px}
/* FluxoPost: conta do Instagram */
.ig-fb{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.ig-fb-ico{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#1877F2;color:#fff;flex:none}.ig-fb .ig-quem{display:flex;flex-direction:column;gap:2px}.ig-fb .ig-quem small{color:var(--t3)}.ig-fb .empurra{margin-left:auto}
.ig-avatar{position:relative;display:inline-grid;place-items:center;flex:none;width:44px;height:44px;border-radius:999px;overflow:hidden;color:var(--chip-ink);background:var(--chip);font-weight:700;font-size:14px}
.ig-avatar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ig-avatar.grande{width:64px;height:64px;font-size:18px}
.ig-topo{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.ig-quem{display:grid;gap:1px;flex:1;min-width:0}.ig-quem b{font-size:16px}.ig-quem a{color:var(--primary-2);text-decoration:none;font-weight:600}.ig-quem small{color:var(--t3)}
.ig-sit{display:grid;justify-items:end;gap:2px}.ig-sit small{color:var(--t3);font-size:12px}
.ig-limite{display:grid;gap:4px;margin-top:16px;padding-top:14px;border-top:1px solid var(--borda)}.ig-limite small{color:var(--t2)}.ig-limite>div{display:flex;align-items:center;gap:10px}.barra-mini.largo{width:200px;margin:0}
.ig-acoes{margin-top:16px;padding-top:14px;border-top:1px solid var(--borda)}.ig-acoes form{margin:0}.ig-hist{margin-top:18px}
.ig-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;margin-bottom:18px}
.ig-item{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--borda);border-radius:var(--raio);background:var(--s1)}.ig-item .ig-quem b{font-size:15px}.ig-item .ig-quem span{color:var(--t2);font-size:13px}.ig-item form{margin:0}
.publica{text-align:center}.publica p{margin:0;color:var(--t2)}
.linha-sutil .empurra{margin-left:auto}
.ig-acoes .empurra{margin-left:auto}.marca-cel{text-decoration:none}
@media (max-width:860px){.ig-sit{justify-items:start;width:100%;grid-auto-flow:column;justify-content:start;align-items:center;gap:10px}.ig-lista{grid-template-columns:1fr}}
/* Celular: barra de baixo e gaveta */
.abas{display:none}.gaveta-fundo{display:none}
@media (max-width:1100px){.dash{grid-template-columns:repeat(6,minmax(0,1fr))}.w-w,.w-h{grid-column:span 6}.w-m,.w-n{grid-column:span 3}}
@media (max-width:860px){
  .tabela-meta{-webkit-overflow-scrolling:touch}.tabela-meta table{min-width:1500px}
  .tabela-meta th.col-nome,.tabela-meta td.titulo{position:sticky;left:0;z-index:2;background:var(--s1);min-width:150px;max-width:170px;box-shadow:1px 0 0 var(--borda2)}
  .tabela-meta thead th.col-nome,.tabela-meta tfoot td.titulo{background:var(--s2)}.tabela-meta td.titulo small{display:block;white-space:normal}
  .tabela-meta th,.tabela-meta td{padding:9px 10px;font-size:13px}
  .app{grid-template-columns:1fr}
  .lateral{position:fixed;left:0;top:0;bottom:0;width:272px;height:100%;transform:translateX(-105%);transition:transform .2s;z-index:40;box-shadow:var(--sombra-pop)}
  html.gaveta-aberta .lateral{transform:none}html.gaveta-aberta .gaveta-fundo{display:block;position:fixed;inset:0;z-index:35;background:rgba(15,23,42,.45)}
  .lateral .encolher{display:none}
  html.menu-encolhido .marca .logo,html.menu-encolhido .secao,html.menu-encolhido .item span,html.menu-encolhido .pe .quem{display:revert}
  html.menu-encolhido .marca .simb{display:none}html.menu-encolhido .lateral a.item{justify-content:flex-start;padding:0 12px}
  html.menu-encolhido .lateral .cabeca,html.menu-encolhido .pe{flex-direction:row}
  .topo{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;min-height:60px;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(14px)}.topo .acoes{display:flex;gap:6px}.topo .ola{display:none}.topo .marca-cel{display:flex;align-items:center}.topo .marca-cel img{height:34px;width:auto}
  main{padding:6px 16px calc(var(--safe-b) + 88px)}
  h1{font-size:22px}main>header .sub{display:none}main>header .acoes-pag{width:100%}
  .card .n{font-size:22px}.cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cards .card.destaque{grid-column:1/-1}
  .abas{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;position:fixed;left:12px;right:12px;bottom:var(--safe-b);z-index:30;height:58px;padding:4px;border:1px solid var(--borda);border-radius:18px;background:color-mix(in srgb,var(--s1) 94%,transparent);backdrop-filter:blur(18px);box-shadow:var(--sombra-pop)}
  .abas a{display:grid;justify-items:center;align-content:center;gap:2px;border-radius:14px;color:var(--t3);text-decoration:none;font-size:10.5px;font-weight:600}
  .abas a.on{color:var(--primary-2);background:var(--chip)}
  input,select,textarea{font-size:16px!important}
  .busca{min-width:100%}.grade2{grid-template-columns:1fr}
  .painel-filtros{display:none;grid-template-columns:1fr 1fr}.painel-filtros.aberto{display:grid}.painel-filtros .largo{grid-column:1/-1}
  .linha-2,.linha-rot{grid-template-columns:1fr}.linha-rot{gap:6px}.rodape-janela .empurra{margin-left:0}.passo-corpo{padding:0 14px 14px}.link-ajuda span{display:none}.icones-cab{display:none}.faixa-admin{display:none}.conta-grade,.passos-app{grid-template-columns:1fr}.marca-cel img{height:36px!important}
  main>header{margin:2px 0 14px}.projeto-linha{flex-wrap:wrap}.projeto-linha form{width:100%}.projeto-linha form button{width:100%}main>header .acoes-pag{flex-wrap:nowrap;align-items:center}
  .acoes-pag .campo-periodo{flex:1;min-width:0}.acoes-pag .campo-periodo label{display:none}.acoes-pag .campo-periodo select{height:44px}
  .acoes-pag .rot-btn{display:none}.acoes-pag>button:has(.rot-btn),.acoes-pag>.botao:has(.rot-btn),.acoes-pag>.botao-filtros{flex:none;width:44px;height:44px;padding:0}.acoes-pag>.botao,.acoes-pag>button{min-height:44px}
  .acoes-pag .botao-filtros{display:inline-flex}
  .kpis{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.kpi-solto .kpi-ico{display:none}.kpi-sub{font-size:11.5px}
  .acoes-pag .form-periodo{flex:1;min-width:0}.acoes-pag .form-periodo select{height:44px}
  .ferramentas{flex-direction:column;align-items:stretch}.ferramentas .busca{min-width:0}.ferramentas .lote{justify-content:space-between}
  .bloco-cab .botao{padding:8px 12px}.segmentos a{flex:none}
  .barras.apertadas .barra-v{display:none}.barras.apertadas .barra-col:not(:nth-child(3n+1)) small{visibility:hidden}.barras{gap:4px}
  .dash{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:auto;gap:10px}.w-k{grid-column:span 1}.w-b,.w-w,.w-x,.w-m,.w-n,.w-h{grid-column:1/-1;grid-row:auto}
  .w-corpo{height:auto}.kpi-n{font-size:19px}.w{padding:12px 14px}.funil-n{font-size:13px}.funil-e b{font-size:10px}.funil-s{font-size:10px}
  body.editando .resumo-corpo{grid-template-columns:1fr}body.editando .disponiveis{position:static;max-height:240px}body.editando .w-ctrl{bottom:auto;top:6px}
  body.editando .editando-barra{top:68px}.editando-barra .acoes-pag{width:100%}.editando-barra .acoes-pag button{flex:1 1 auto}
  .niveis a{flex-direction:column;gap:2px;padding:8px 2px;font-size:11.5px}
  /* Tabelas marcadas com .cartoes viram um cartão por linha */
  .cartoes table,.cartoes tbody,.cartoes tr,.cartoes td{display:block;width:100%}.cartoes table{min-width:0!important}
  .cartoes thead{display:none}.cartoes tr{padding:12px 14px;border-bottom:1px solid var(--borda)}.cartoes tbody tr:last-child{border-bottom:0}
  /* Rótulo à esquerda; o conteúdo da célula fica junto, empilhado à direita */
  .cartoes td,.tab.cartoes td{position:relative;display:block;min-height:24px;padding:4px 0 4px 112px;border:0!important;text-align:right;white-space:normal;max-width:none;min-width:0;overflow-wrap:anywhere}
  .cartoes td::before{content:attr(data-rot);position:absolute;left:0;top:5px;width:104px;color:var(--t3);font-size:12px;text-align:left}
  .cartoes td small{display:inline}.tab.cartoes td.quebra small{display:block}
  .cartoes td.titulo,.tab.cartoes td.titulo{padding:0 0 6px;text-align:left;font-size:15px}.cartoes td.titulo::before{display:none}
  .cartoes td.sel,.tab.cartoes td.sel{width:auto;text-align:left;padding-left:0}.cartoes td.sel::before{position:static;display:inline;margin-right:8px}
  .cartoes td:empty,.cartoes .so-pc{display:none}.cartoes tfoot{display:block}.cartoes tfoot tr{display:block;background:var(--s2)}
}
/* Troca de perfil: bolinha com a foto (como no ManyChat) e o @ ao lado */
.projeto-sel>summary,.projeto-sel>.projeto-fixo{border:0!important;background:transparent!important;padding:6px 8px!important}
.projeto-sel>summary:hover{background:var(--s2)!important}
.bolinha{position:relative;display:inline-grid;place-items:center;flex:none;width:34px;height:34px;border-radius:50%;overflow:hidden;color:var(--chip-ink);background:var(--chip);font-size:12px;font-weight:700;box-shadow:0 0 0 2px var(--s1),0 0 0 4px var(--azul)}
.bolinha img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.projeto-pop .bolinha{width:28px;height:28px;box-shadow:none;font-size:11px}
.projeto-sel .perfil-nome b{font-size:14px;font-weight:500}.projeto-pop .perfil-nome b{font-weight:500}
html.menu-encolhido .lateral{overflow:visible}html.menu-encolhido .projeto-pop .perfil-nome{display:flex}html.menu-encolhido .projeto-pop b{display:block}html.menu-encolhido .projeto-pop{left:calc(100% + 4px);top:0;z-index:60}
html.menu-encolhido .projeto-sel>summary{justify-content:center;padding:6px 0!important}

/* FluxoPost: visual próprio (pedido do Nilton, 31/10/2026, inspirado em painéis de redes sociais): menu branco com o item
   aberto em pílula lilás, seções em letras pequenas, cartões brancos mais arredondados, fundo cinza bem claro */
[data-theme="light"]{--bg:#F4F5F9;--s2:#F8F9FC;--borda:#E7E9F0;--borda2:#D3D7E2}
:root{--raio:16px}
.lateral{background:var(--s1)}
.lateral .cabeca{padding:22px 12px 14px 20px}
.secao{margin:20px 12px 6px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--t3)}
.lateral a.item{min-height:42px;padding:0 12px;margin:2px 0;border-radius:11px;font-weight:500}
.lateral a.item:hover{background:var(--s2)}
.lateral a.item.on{color:var(--primary-2);background:var(--chip);box-shadow:none;font-weight:600}
.lateral a.item.on .ico{color:var(--primary)}.lateral a.item.on::after{display:none}
html.menu-encolhido .lateral a.item.on::after{display:none}
.projeto-sel>summary,.projeto-sel>.projeto-fixo{padding:9px 10px;border-radius:14px;background:var(--s2)}
.lateral .pe{border-top:1px solid var(--borda)}
.convite{margin:8px 14px 12px;padding:16px;border-radius:16px;background:var(--chip);text-align:center}
.convite .simbolo-mini{display:block;width:44px;height:44px;margin:0 auto 8px}.convite .simbolo-mini img{width:44px;height:44px}
.convite b{display:block;font-size:14px}.convite p{margin:4px 0 12px;color:var(--t2);font-size:12.5px;line-height:1.4}
.convite .botao{width:100%;color:#fff;background:var(--tinta);}
[data-theme="dark"] .convite .botao{color:var(--tinta-ink)}
html.menu-encolhido .convite{display:none}
.card,.bloco{border-radius:18px}.bloco-cab{padding:16px 18px}
main{padding:28px 32px 56px}

/* Neutro premium (escolha do Nilton, 07/11/2026): branco e cinza; o roxo da marca só no botão principal, nos gráficos,
   nos links e na marquinha do item aberto do menu. Cantos menos redondos, ícones cinza sem fundo colorido. */
:root{--raio:12px;--chip:#F1F2F5;--chip-ink:#14161A}
[data-theme="dark"]{--chip:rgba(255,255,255,.07);--chip-ink:#F1F2F4}
.card,.bloco{border-radius:12px}
.lateral a.item{min-height:38px;border-radius:8px;color:var(--t2)}
.lateral a.item .ico{color:var(--t3)}
.lateral a.item:hover{background:var(--s2);color:var(--ink)}
.lateral a.item.on{color:var(--ink);background:var(--s2);font-weight:600}
.lateral a.item.on .ico{color:var(--ink)}
.lateral a.item.on::before{content:"";position:absolute;left:-12px;top:9px;bottom:9px;width:3px;border-radius:0 3px 3px 0;background:var(--primary)}
html.menu-encolhido .lateral a.item.on::before{left:-8px}
.projeto-sel>summary,.projeto-sel>.projeto-fixo{border-radius:10px}
.convite{border-radius:12px;background:var(--s2);border:1px solid var(--borda)}
.seg-grupo{border:0;background:var(--s2);border-radius:10px;padding:3px}
.seg-mini{border-radius:8px}.seg-mini.on{color:var(--ink);background:var(--s1);box-shadow:0 1px 2px rgba(20,22,26,.08),0 0 0 1px var(--borda)}
[data-theme="dark"] .seg-mini.on{box-shadow:0 0 0 1px var(--borda2)}
.janela{border-radius:14px}
.lista-projetos{display:grid;gap:8px;max-width:880px}
.projeto-linha{gap:12px;padding:12px 14px;border-radius:12px}.projeto-info b{font-size:14.5px}.projeto-info small{color:var(--t3);font-size:12.5px}
.pj-foto{width:36px;height:36px;border-radius:50%;object-fit:cover;flex:none}.quadro.grande{width:36px;height:36px;border-radius:50%;font-size:12.5px}
.pj-sit{display:inline-flex;align-items:center;gap:5px;margin-left:6px;font-weight:600}.pj-sit::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.pj-sit.ok{color:var(--ok)}.pj-sit.atencao{color:var(--aviso)}
:root{--ctl:36px}button,.botao{border-radius:8px}
/* Superfícies do navegador nas cores da marca + vidro onde ele tem função (07/11/2026) */
::selection{background:color-mix(in srgb,var(--primary) 22%,transparent);color:inherit}
*{scrollbar-width:thin;scrollbar-color:var(--borda2) transparent}
:focus-visible{outline:2px solid color-mix(in srgb,var(--primary) 70%,transparent);outline-offset:2px}
.janela::backdrop{background:rgba(18,16,28,.32);-webkit-backdrop-filter:blur(6px) saturate(1.2);backdrop-filter:blur(6px) saturate(1.2)}
.janela{box-shadow:0 24px 60px -20px rgba(18,16,28,.35),0 0 0 1px var(--borda)}
.faixa-admin{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
main{font-variant-numeric:tabular-nums}
.toast{position:fixed;right:20px;bottom:20px;z-index:200;display:flex;align-items:flex-start;gap:10px;max-width:min(420px,calc(100vw - 32px));padding:12px 12px 12px 14px;border-radius:12px;background:#1d1830;color:#fff;font-size:13.5px;line-height:1.45;box-shadow:0 12px 32px rgba(0,0,0,.22);animation:toast-in .22s ease-out}
.toast>svg{flex:none;margin-top:2px;color:#7ee2a8}.toast.t-erro>svg{color:#ff8f8f}.toast.t-aviso>svg{color:#ffd36b}.toast>span{flex:1;overflow-wrap:anywhere}
.toast-x{flex:none;display:grid;place-items:center;width:24px;height:24px;min-height:0;padding:0;border:0;border-radius:6px;background:transparent;box-shadow:none;color:rgba(255,255,255,.7);cursor:pointer}.toast-x:hover{background:rgba(255,255,255,.12);color:#fff}
.toast.saindo{animation:toast-out .25s ease-in forwards}@keyframes toast-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@keyframes toast-out{to{opacity:0;transform:translateY(12px)}}
@media (max-width:900px){.toast{right:16px;left:16px;bottom:84px;max-width:none}}
.dica{position:relative;display:inline-grid;place-items:center;width:16px;height:16px;margin-left:6px;border-radius:50%;border:1px solid var(--borda2);color:var(--t3);font-size:10.5px;font-weight:700;line-height:1;vertical-align:1px;cursor:help;user-select:none}
.dica:hover,.dica:focus{color:var(--primary-2);border-color:var(--primary-2);outline:0}
.dica::after{content:attr(data-dica);position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);width:max-content;max-width:260px;padding:8px 10px;border-radius:9px;background:#1d1830;color:#fff;font-size:12px;font-weight:500;line-height:1.45;text-align:left;white-space:normal;box-shadow:0 8px 24px rgba(0,0,0,.18);opacity:0;visibility:hidden;transition:opacity .12s;z-index:60;pointer-events:none}
.dica:hover::after,.dica:focus::after{opacity:1;visibility:visible}
/* FluxoPost (07/11/2026): degradê roxo da marca (#A646FF → #5B10D2), premium tecnológico. O degradê vai no botão principal,
   no símbolo e no item aberto do menu; o resto continua neutro (branco e cinza). Títulos em Figtree. */
:root{--azul:#7B2FF2;--primary:#7B2FF2;--primary-2:#5B10D2;--grad:linear-gradient(135deg,#A646FF 0%,#7B2FF2 52%,#5B10D2 100%);--marca-f:'Figtree',var(--fonte)}
[data-theme="dark"]{--azul:#B98CFF;--primary:#8E4BFF;--primary-2:#C9A6FF;--grad:linear-gradient(135deg,#B565FF 0%,#8E4BFF 52%,#6A22E6 100%)}
h1,h2,h3,.st-valor b,.an-kpi b,.mb-resumo b{font-family:var(--marca-f);letter-spacing:-.02em}
h1{font-weight:700}
.botao:not(.leve),button.botao:not(.leve),main header .acoes-pag>button:not(.leve):not(.botao-ico),.acoes-pag>.botao:not(.leve){background:var(--grad);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 6px 16px -8px rgba(91,16,210,.55)}
.botao:not(.leve):hover,button.botao:not(.leve):hover{filter:brightness(1.06)}
.logo-fp{display:inline-flex;align-items:center;gap:9px;color:var(--ink);text-decoration:none}
.logo-simb{display:block;height:28px;width:auto;flex:none}
.logo-nome{font-family:var(--marca-f);font-weight:600;font-size:21px;letter-spacing:-.025em;line-height:1;white-space:nowrap}
.marca .logo-img,.marca .simb{display:none!important}
html.menu-encolhido .marca .logo-fp{display:inline-flex!important}html.menu-encolhido .logo-nome{display:none}
.marca-cel .logo-simb{height:24px}.marca-cel .logo-nome{font-size:19px}
.lateral a.item.on{background:color-mix(in srgb,var(--primary) 9%,var(--s1));color:var(--ink)}
.lateral a.item.on .ico{color:var(--primary)}
.lateral a.item.on::before{background:var(--grad);width:3px}
.lateral .recolher{display:flex;align-items:center;justify-content:flex-start!important;text-align:left;gap:12px;width:calc(100% - 24px);min-height:38px;margin:0 12px 6px;padding:0 13px;border:0;border-radius:8px;background:transparent;color:var(--t3);box-shadow:none;font:inherit;font-size:13.5px;font-weight:500;cursor:pointer}
.lateral .recolher:hover{background:var(--s2);color:var(--ink)}.lateral .recolher .ico{color:inherit}
html.menu-encolhido .lateral .recolher span{display:none}html.menu-encolhido .lateral .recolher .ico{transform:scaleX(-1)}
.encolher{display:none!important}
.selo::before{box-shadow:0 0 0 2px color-mix(in srgb,currentColor 0%,transparent)}
/* Selos de situação (07/11/2026): fundo neutro discreto + bolinha na cor da situação (o texto não grita) */
.selo{display:inline-flex;align-items:center;gap:6px;padding:1px 8px 1px 7px;border-radius:6px;font-size:11.5px;font-weight:600;line-height:18px;color:var(--t2);background:var(--s2);box-shadow:inset 0 0 0 1px var(--borda)}
.selo::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--t3);flex:none}
.selo.s-ok,.selo.s-aviso,.selo.s-erro,.selo.s-neutro{color:var(--t2);background:var(--s2)}
.selo.s-ok::before{background:var(--ok)}.selo.s-aviso::before{background:#E0A100}.selo.s-erro::before{background:var(--erro)}.selo.s-neutro::before{background:var(--t3)}
/* Abas segmentadas iguais em todas as telas (fundo cinza, a escolhida em branco) e largura máxima do conteúdo */
main .segmentos{display:inline-flex;flex-wrap:wrap;gap:3px;padding:3px;margin-bottom:0;border:0;border-radius:10px;background:var(--s2);box-shadow:none}
main .segmentos a,main .segmentos .seg-l,main .segmentos button{flex:none;width:auto;height:auto;min-height:0;padding:5px 12px;border:0;border-radius:8px;color:var(--t2);background:transparent;box-shadow:none;font:inherit;font-size:13px;font-weight:600;text-decoration:none;cursor:pointer}
main .segmentos a:hover,main .segmentos .seg-l:hover,main .segmentos button:hover{color:var(--ink)}
main .segmentos a.on,main .segmentos .seg-l.on,main .segmentos button.on{color:var(--ink);background:var(--s1);box-shadow:0 1px 2px rgba(20,22,26,.08),0 0 0 1px var(--borda)}
main{max-width:1440px;width:100%;margin:0 auto}
/* Menu (07/11/2026): ícones, símbolo da marca e foto do perfil ficam no MESMO lugar e tamanho com o menu
   aberto ou encolhido; ao abrir, só os nomes aparecem ao lado. O botão de encolher fica na borda do menu. */
.lateral{overflow:visible}
.marca .logo-img img{height:30px}
.marca .simb img{height:27.4px;margin:1px 0 0 -2.7px}
.encolher,html.menu-encolhido .encolher{position:absolute;right:-12px;top:26px;width:24px;height:24px;border-radius:50%;color:var(--t2);background:var(--s1);box-shadow:0 1px 3px rgba(18,16,28,.12),0 0 0 1px var(--borda);z-index:8}
.encolher:hover{color:var(--ink);background:var(--s1)}.encolher .ico{width:14px;height:14px}
.lateral nav,html.menu-encolhido .lateral nav{padding:2px 12px 12px}
.lateral a.item,html.menu-encolhido .lateral a.item{justify-content:flex-start;padding:0 13px;gap:12px}
html.menu-encolhido .lateral .secao{display:block;visibility:hidden;overflow:hidden;white-space:nowrap}
html.menu-encolhido .secao+a{margin-top:2px}
.projeto-sel,html.menu-encolhido .projeto-sel{margin:2px 12px 4px}
.projeto-sel>summary,.projeto-sel>.projeto-fixo,html.menu-encolhido .projeto-sel>summary,html.menu-encolhido .projeto-sel>.projeto-fixo{justify-content:flex-start;padding:6px 8px!important;gap:10px;min-height:42px}
html.menu-encolhido .projeto-sel>summary,html.menu-encolhido .projeto-sel>.projeto-fixo{border-color:transparent;background:transparent}
.bolinha{width:28px;height:28px;font-size:11px;box-shadow:0 0 0 1.5px var(--s1),0 0 0 3px color-mix(in srgb,var(--primary) 70%,transparent)}
.projeto-sel .quadro{width:28px;height:28px}
.lateral .pe,html.menu-encolhido .lateral .pe{flex-direction:row;padding:10px 12px}
html.menu-encolhido .pe-conta>summary{justify-content:flex-start;padding-left:8px}
.chips{padding:3px;border:0;background:var(--s2);box-shadow:none;border-radius:10px}.chips a{border-radius:8px;padding:5px 12px}.chips a.on{color:var(--ink);background:var(--s1);box-shadow:0 1px 2px rgba(20,22,26,.08),0 0 0 1px var(--borda)}

/* Menu no jeito da referência do Nilton (Criativos do Reino, 07/11/2026): setinha no topo (ao lado da logo; recolhido,
   embaixo do símbolo), itens mais altos e arejados, ícone 19px, item aberto com fundo e a marquinha na borda. */
.lateral .cabeca,html.menu-encolhido .lateral .cabeca{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:72px;padding:22px 14px 10px 24px}
html.menu-encolhido .lateral .cabeca{flex-direction:column;justify-content:flex-start;gap:12px;padding:22px 0 6px;min-height:0}
html.menu-encolhido .lateral .marca{flex:none}
.seta-menu{display:inline-grid;place-items:center;flex:none;width:28px;height:28px;padding:0;border:0;border-radius:8px;color:var(--t3);background:transparent;box-shadow:none;cursor:pointer}
.seta-menu:hover{color:var(--ink);background:var(--s2)}
html.menu-encolhido .seta-menu .ico{transform:scaleX(-1)}
.projeto-sel,html.menu-encolhido .projeto-sel{margin:22px 12px 0}
.lateral nav .secao:first-child{margin-top:14px}
.lateral a.item,html.menu-encolhido .lateral a.item{min-height:42px;margin:3px 0;border-radius:10px;font-size:14.5px}
.lateral a.item .ico{width:19px;height:19px}
html.menu-encolhido .lateral a.item{width:44px;padding:0;justify-content:center}
/* Regra dos ícones parados (07/11/2026): o topo tem a MESMA altura aberto ou recolhido, então o perfil e os itens não
   se mexem. Recolhido, a setinha entra no espaço que já existe entre o símbolo e a bolinha do perfil. */
.lateral .cabeca,html.menu-encolhido .lateral .cabeca{position:relative;flex-direction:row;align-items:flex-start;justify-content:space-between;height:70px;min-height:0;padding:21px 14px 0 24px;gap:8px}
.lateral .seta-menu{margin-top:2px}
html.menu-encolhido .lateral .cabeca{justify-content:flex-start}
html.menu-encolhido .lateral .seta-menu{position:absolute;left:calc(24px + 11.5px);bottom:-14px;margin:0;width:26px;height:20px;transform:translateX(-50%)}
.projeto-sel,html.menu-encolhido .projeto-sel{margin:16px 12px 0}
.logo-simb{height:31px}.logo-nome{font-size:23px}
.lateral nav{overflow-x:hidden}
/* Botões padronizados (07/11/2026): todo botão secundário (branco com borda) e todo botão pequeno têm a mesma altura e letra
   do "Criar perfil"; só o botão principal do topo da tela fica um pouco maior */
main button.leve,main a.botao.leve,main .botao-mini,main button.botao-mini,dialog button.leve,dialog .botao-mini{height:32px;min-height:32px;padding:0 12px;font-size:13px;gap:6px;border-radius:8px}
main button.leve .ico,main a.botao.leve .ico,main .botao-mini .ico{width:15px;height:15px}
/* Regra: nada fica por cima de nada. Cartão de conta do Instagram: foto + textos (cortados com "…") e o botão numa linha só dele */
.ig-lista .ig-item{display:grid;grid-template-columns:44px minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:12px;row-gap:12px}
.ig-lista .ig-item>.ig-avatar{grid-row:1}.ig-lista .ig-item .ig-quem{grid-column:2;display:grid;gap:1px;min-width:0}
.ig-lista .ig-item .ig-quem>*{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ig-lista .ig-item .ig-item-acao{grid-column:1/-1;display:flex;justify-content:flex-end;padding-top:12px;border-top:1px solid var(--s2)}
.ig-lista .ig-item .ig-item-acao .selo{margin:0}
/* Entrar (07/11/2026): cartão no meio da tela, logo grande e o símbolo como marca d'água no fundo */
body:has(.entrar){min-height:100vh;display:grid;place-items:center;overflow:hidden}
.entrar-fundo{position:fixed;inset:0;z-index:0;pointer-events:none;display:grid;place-items:center}
.entrar-fundo img{width:min(78vh,820px);height:auto;opacity:.06;transform:translateX(18%) rotate(-8deg);filter:saturate(1.2)}
[data-theme="dark"] .entrar-fundo img{opacity:.09}
.entrar{position:relative;z-index:1;width:100%;max-width:420px;margin:0 auto;padding:16px}
.entrar .card{gap:16px;padding:40px 34px 34px;border-radius:18px;box-shadow:0 30px 70px -30px rgba(18,16,28,.3),0 0 0 1px var(--borda)}
.entrar .marca{justify-content:center;margin:0}.entrar .logo-simb{height:46px}.entrar .logo-nome{font-size:34px}
.entrar-sub{margin:-4px 0 6px;text-align:center;color:var(--t2);font-size:14px}
.entrar .card>.botao{width:100%;height:46px;justify-content:center;font-size:15px}
.pag-oculto{display:none!important}.pag-mais{display:flex;justify-content:center;margin:14px 0 22px}.pag-mais[hidden]{display:none}
.app-topo{display:flex;align-items:center;gap:16px;max-width:960px;margin:0 0 16px;padding:18px 20px;border:1px solid var(--borda);border-radius:14px;background:linear-gradient(120deg,color-mix(in srgb,var(--primary) 7%,var(--s1)),var(--s1) 60%)}
.app-topo img{border-radius:14px;box-shadow:0 8px 20px -10px rgba(91,16,210,.55);flex:none}.app-topo b{display:block;font-family:var(--marca-f);font-size:17px}.app-topo small{color:var(--t2);font-size:13px}
main .passos-app{max-width:960px}main .passo-app{border-radius:12px;padding:18px 20px}
main .passo-n{width:24px;height:24px;border-radius:7px;border:1px solid var(--borda);background:var(--s1);color:var(--t2);font-size:12px;font-weight:600}
main .passo-app.feito .passo-n{background:var(--ok-f);border-color:transparent;color:var(--ok)}
.ig-pag{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:14px 0 0;padding:12px 0 0;border-top:1px solid var(--s2)}.ig-pag-txt{display:grid;gap:2px;min-width:0}.ig-pag-txt b{font-size:13.5px}.ig-pag-txt small{color:var(--t3);font-size:12.5px}
/* Recolhido: no lugar de cada título de seção, um tracinho no mesmo alinhamento (divide os grupos sem mexer nos ícones) */
html.menu-encolhido .lateral .secao{visibility:visible;color:transparent;position:relative;user-select:none}
html.menu-encolhido .lateral .secao::after{content:"";position:absolute;left:50%;top:50%;width:20px;height:2px;border-radius:2px;background:var(--borda2);transform:translate(-50%,-50%)}
/* Cabeçalho das telas enxuto (07/11/2026): só o título e as ações numa linha; sem a frase embaixo */
main>header .sub:not(.manter),.pn-topo .sub{display:none}
main>header{align-items:center;margin-bottom:18px}
main>header.so-abas{justify-content:flex-start;margin-bottom:14px}

/* ── Peças do Criativos do Reino (09/11/2026, pedido do Nilton: "igualzinho"): dobra, seções, linhas, registros ── */
.dobras{display:grid;gap:12px}
.dobra{position:relative;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:none}
.dobra>summary{display:flex;align-items:center;gap:10px;min-height:54px;padding:10px 14px;cursor:pointer;list-style:none;border-radius:12px}
.dobra>summary::-webkit-details-marker{display:none}.dobra>summary::after{display:none}
.dobra>summary:hover{background:var(--s2)}.dobra[open]>summary{border-bottom:0;border-radius:12px 12px 0 0}
.dobra>summary>.ico{flex:none;color:var(--t3);transition:transform .2s}.dobra[open]>summary>.ico{transform:rotate(90deg)}
.dobra>summary b{font-size:15px;font-weight:600}.dobra>summary small{display:inline;margin:0;color:var(--t3);font-size:12.5px;text-align:left}
.dobra-sit{margin-left:auto;display:flex;align-items:center}
.dobra-corpo{display:grid;gap:14px;padding:14px 16px 16px;border-top:1px solid var(--borda)}.dobra-corpo>p{margin:0}
.secao-adm{max-width:1100px;margin:0 0 28px}
.secao-adm-cab{display:flex;align-items:center;gap:12px;margin:0 0 12px}
.secao-adm-cab h2{display:flex;align-items:center;gap:6px;margin:0;font-size:17px;font-weight:650}
.secao-adm-cab>button,.secao-adm-cab>.botao{margin-left:auto}
.adm-lista{display:grid;gap:10px}
.adm-linha{display:flex;align-items:center;gap:16px;padding:12px 14px;border:1px solid var(--borda);border-radius:12px;background:var(--s1)}
.dobra-corpo>.adm-lista .adm-linha{border-radius:10px}
.adm-info{display:flex;align-items:center;gap:8px;min-width:0;flex:1}.adm-info b{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.adm-info small{color:var(--t3);font-size:12.5px}
.adm-acoes{display:flex;align-items:center;gap:8px;flex:none;margin-left:auto}.adm-acoes form{margin:0;display:flex}
.adm-vazio{margin:0;padding:6px 2px;color:var(--t3);font-size:13.5px}
.num-lado{display:grid;justify-items:center;min-width:64px;flex:none;line-height:1.25}.num-lado b{font-size:16px}.num-lado small{color:var(--t3);font-size:11.5px}
.seta-grupo{display:flex;align-items:center;gap:6px;flex:none;font-size:13px;color:var(--t2)}.seta-grupo .ico{color:var(--t3)}.seta-grupo b{color:var(--ink);font-weight:600}
.selo-plat{flex:none;padding:3px 9px;border-radius:6px;font-size:11.5px;font-weight:600;line-height:1.4;color:#fff;background:#6B7280}.selo-plat.kiwify{background:#16A34A}.selo-plat.hotmart{background:#F04E23}
.plat-lapis{display:inline-grid;place-items:center;width:26px;height:26px;min-height:0;padding:0;border:0;border-radius:7px;color:var(--t3);background:transparent!important;cursor:pointer}.plat-lapis:hover{color:var(--ink);background:var(--s3)!important}
.copiar.token-linha{display:flex;align-items:center;gap:8px;max-width:620px}.copiar.token-linha input{flex:1;min-width:0;font-family:var(--fonte);font-size:14px}
.copiar.token-linha>.botao-ico,.adm-acoes>.botao-ico,.adm-acoes form>.botao-ico{width:32px;height:32px;border-radius:8px;flex:none}
.botao-ico.perigo-ic:hover{color:var(--erro);border-color:var(--erro)}
.plat-modo{display:flex;flex-wrap:wrap;gap:6px 22px;margin:0}.plat-modo .marcar{display:flex;align-items:center;gap:8px;font-size:13.5px}
.registros{display:grid;border:1px solid var(--borda);border-radius:12px;background:var(--s1);overflow:hidden}
.registro{display:grid;grid-template-columns:130px 160px minmax(0,1fr);gap:2px 14px;padding:10px 14px;border-top:1px solid var(--borda);font-size:13px}.registro:first-child{border-top:0}
.registro>small{color:var(--t3);grid-row:span 2}.registro small.reg-dados{grid-row:auto;grid-column:2/-1;font-size:12px}.registro small.reg-dados a{color:var(--t2)}
.registro b{font-weight:600}.registro span{color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.registro em{grid-column:2/-1;font-style:normal;color:var(--t2)}.registro em form{display:inline;margin:0 0 0 6px}
@media (max-width:720px){.adm-linha{flex-wrap:wrap}.adm-linha .adm-acoes{width:100%;justify-content:flex-end}.registro{grid-template-columns:1fr}.registro>small{grid-row:auto}.registro em,.registro small.reg-dados{grid-column:auto}}

/* Pé do menu: bolinha do perfil + luazinha, numa linha (recolhido: um embaixo do outro) */
.lateral .pe,html.menu-encolhido .lateral .pe{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:8px;padding:12px 14px 14px}
html.menu-encolhido .lateral .pe{flex-direction:column;gap:6px;padding:12px 0}html.menu-encolhido .lateral .pe>.botao-ico{display:none}
.pe-menu .item-menu[data-tema]>span{display:inline-flex;align-items:center;gap:9px}[data-theme="dark"] .pe-menu .item-menu .so-claro,:root:not([data-theme="dark"]) .pe-menu .item-menu .so-escuro{display:none}
.lateral .pe-conta{flex:1;min-width:0;position:relative}html.menu-encolhido .lateral .pe-conta{flex:none}
.lateral .pe-conta>summary{display:flex;align-items:center;gap:10px;min-width:0;padding:4px 8px 4px 4px;border-radius:10px;list-style:none;cursor:pointer}
.lateral .pe-conta .quem{display:grid;min-width:0;line-height:1.25}.lateral .pe-conta .quem b{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lateral .pe-conta .quem small{color:var(--t3);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
html.menu-encolhido .lateral .pe-conta>summary{display:grid;place-items:center;width:38px;height:38px;padding:0;border-radius:50%}html.menu-encolhido .lateral .pe-conta .quem{display:none}
.lateral .pe-conta>summary:hover,.lateral .pe-conta[open]>summary{background:var(--s3)}.lateral .pe>.botao-ico{flex:none}
.lateral .pe-conta .avatar{width:32px;height:32px;display:flex;align-items:center;justify-content:center;line-height:1;color:var(--ink);background:var(--s2);box-shadow:inset 0 0 0 1px var(--borda);font-size:12px}
.lateral .pe>.botao-ico{width:34px;height:34px;border:0;border-radius:9px;color:var(--t2);background:transparent}.lateral .pe>.botao-ico:hover{color:var(--ink);background:var(--s3)}
.lateral .pe-menu{left:0;bottom:calc(100% + 8px);width:250px;padding:6px}
.pe-quem{display:flex;align-items:center;gap:10px;padding:8px 8px 6px}.pe-quem>span:last-child{display:grid;min-width:0;line-height:1.25}
.pe-quem b{font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pe-quem small{color:var(--t3);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pe-quem .avatar{width:34px;height:34px;flex:none;display:flex;align-items:center;justify-content:center;line-height:1;font-size:12px;color:var(--ink);background:var(--s2)}
.lateral .pe-menu .item-menu{min-height:38px;padding:0 10px;border-radius:8px;font-size:13.5px}.lateral .pe-menu .item-menu:hover{background:var(--s2)}

/* ── Matriz GD (09/11/2026): nivelado com o checklist da gd-matriz ── */
:root{--campo:40px;--sel:#262626;--sel-ink:#FFFFFF;--sel-2:#3A3A3A}
[data-theme="dark"]{--sel:#D4D4D4;--sel-ink:#111214;--sel-2:#E6E6E6}
/* Campos com uma altura só (40px) e fundo cinza claro; no foco ficam brancos com contorno neutro */
textarea{height:auto;padding:9px 12px}
input:focus,select:focus,textarea:focus{background-color:var(--s1);border-color:var(--borda2);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--ink) 8%,transparent)}
/* Caixa de marcar e bolinha de escolha com desenho próprio, neutro (nada da cor do navegador) */
input:is([type=checkbox],[type=radio]):not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input){-webkit-appearance:none;appearance:none;flex:none;width:18px!important;height:18px!important;min-height:0;margin:0;padding:0!important;border:1.5px solid var(--borda2);border-radius:5px;background:var(--s1) center/12px no-repeat;vertical-align:middle;cursor:pointer;transition:background-color .12s,border-color .12s}
input[type=radio]:not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input){border-radius:50%}
input[type=checkbox]:not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input):checked{border-color:var(--sel);background-color:var(--sel);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E")}
[data-theme="dark"] input[type=checkbox]:not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input):checked{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23111214' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E")}
input[type=checkbox]:not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input):indeterminate{border-color:var(--sel);background:var(--sel) linear-gradient(var(--sel-ink),var(--sel-ink)) center/9px 2px no-repeat}
input[type=radio]:not(:is(.chave,.vt-marca,.au-opcao,.au-post,.cx-marca,.seg,.np-solta,.np-modo,.passo-caso,.plat) input):checked{border-color:var(--sel);background:radial-gradient(circle,var(--sel) 0 4px,transparent 4.5px)}
input:is([type=checkbox],[type=radio]):focus-visible{outline:2px solid var(--borda2);outline-offset:2px}
/* Botão comum = cinza escuro (claro no tema escuro); o degradê da marca fica só no principal do topo da tela */
button,.botao{background:var(--sel);color:var(--sel-ink)}
button:hover,.botao:hover,[data-theme="dark"] button:hover,[data-theme="dark"] .botao:hover{background:var(--sel-2)}
button.leve,.botao.leve{color:var(--ink);background:var(--s1)}button.leve:hover,.botao.leve:hover,[data-theme="dark"] button.leve:hover{background:var(--s2)}
button.perigo{color:var(--erro);background:var(--erro-f)}
button:focus-visible,.botao:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--borda2)}
/* Troca de área no menu (Ver como membro / Ver como admin): mesmo jeito dos itens, um pouco mais apagado */
.lateral a.item.item-troca{color:var(--t3)}.lateral a.item.item-troca:hover{color:var(--ink)}
/* Administrativo em cor universal (preto, cinza e branco): a cor da marca só na marquinha do item aberto do menu */
body.adm{--primary:var(--sel);--primary-2:var(--sel-2);--azul:var(--ink);--grad:var(--sel);--chip:var(--s2);--chip-ink:var(--ink);--g1:#55595F;--g2:#9AA0A8}
[data-theme="dark"] body.adm{--g1:#C9CCD1;--g2:#7E838B}
body.adm .botao:not(.leve),body.adm button.botao:not(.leve),body.adm main header .acoes-pag>button:not(.leve):not(.botao-ico),body.adm .acoes-pag>.botao:not(.leve){background:var(--sel);color:var(--sel-ink);box-shadow:none}
body.adm .lateral a.item.on{background:var(--s3);color:var(--ink)}body.adm .lateral a.item.on .ico{color:var(--ink)}
body.adm .lateral a.item.on::before{background:linear-gradient(135deg,#A646FF 0%,#7B2FF2 52%,#5B10D2 100%)}
body.adm .ajuda-dobra>summary,body.adm main a:not(.botao):not(.item){color:var(--t2)}
`;

const SCRIPT = `<script>
// Formulários demorados (data-carregando): mostra "carregando" no meio da tela até a próxima página abrir
(function(){document.addEventListener('submit',function(e){var f=e.target.closest&&e.target.closest('form[data-carregando]');if(!f||e.defaultPrevented)return;
  var d=document.createElement('div');d.className='carregando-tela';d.innerHTML='<div><span class="roda-carga"></span><b></b><small>Pode levar alguns minutos na primeira vez. Não feche a página.</small></div>';d.querySelector('b').textContent=f.dataset.carregando;document.body.appendChild(d)})})();
// Telas com filtros (main[data-parcial]) e áreas internas [data-parcial]: filtro, período, aba, nível, ordenação e busca
// trocam só o conteúdo, sem recarregar. A tela fica parada (a área guarda a maior altura que já teve) e o Voltar do
// navegador volta ao filtro anterior. Os scripts da parte trocada rodam de novo (cada um evita repetir o que já fez).
(function(){function area(el){return el.closest('[data-parcial]')}
function rodarScripts(a){[].slice.call(a.querySelectorAll('script')).forEach(function(s){var n=document.createElement('script');n.textContent=s.textContent;s.parentNode.replaceChild(n,s)})}
function trocar(url,a,empurrar){fetch(url,{credentials:'same-origin'}).then(function(r){return r.ok?r.text():null}).then(function(h){if(!h){location.href=url;return}
var doc=new DOMParser().parseFromString(h,'text/html'),n=a.id?doc.getElementById(a.id):doc.querySelector('main');if(!n){location.href=url;return}
if((doc.documentElement.getAttribute('data-projeto')||'')!==(document.documentElement.getAttribute('data-projeto')||'')){location.href=url;return}
var y=window.scrollY;a.style.minHeight=Math.max(a.offsetHeight,parseFloat(a.style.minHeight)||0)+'px';a.innerHTML=n.innerHTML;[].forEach.call(doc.head.querySelectorAll('style'),function(st){if(![].some.call(document.head.querySelectorAll('style'),function(x){return x.textContent===st.textContent}))document.head.appendChild(st.cloneNode(true))});rodarScripts(a);window.scrollTo(0,y);
if(doc.title)document.title=doc.title;if(empurrar)history.pushState({parcial:1},'',url);else history.replaceState({parcial:1},'',url)}).catch(function(){location.href=url})}
document.addEventListener('click',function(e){var l=e.target.closest&&e.target.closest('a[href]');if(!l||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.button||l.target||l.hasAttribute('download'))return;
var a=area(l);if(!a)return;var u=new URL(l.href,location.href);if(u.origin!==location.origin||u.pathname!==location.pathname||(u.search===location.search&&u.hash))return;
e.preventDefault();trocar(u.pathname+u.search,a,true)});
document.addEventListener('submit',function(e){var f=e.target;if((f.getAttribute('method')||'get').toLowerCase()!=='get')return;var a=area(f);if(!a)return;e.preventDefault();
var u=new URL(f.getAttribute('action')||location.pathname,location.href);u.search=new URLSearchParams(new FormData(f)).toString();u.hash='';trocar(u.pathname+u.search,a,true)});
window.addEventListener('popstate',function(){var m=document.querySelector('main[data-parcial]');if(m)trocar(location.pathname+location.search,m,false);else location.reload()})})();
// Atualização automática (telas com <main data-vivo>): a cada 15 s pergunta se os dados mudaram; se sim, busca a
// mesma tela por trás e troca só os blocos de números e tabelas. Não mexe enquanto a pessoa edita, digita, marca
// linhas ou está com uma janela aberta.
(function(){var m=document.querySelector('main[data-vivo]');if(!m)return;var versao=null,SEL='.kpis,.dash,.tab,.bloco,.lista-pixels';
function livre(){if(document.hidden||document.body.classList.contains('editando')||document.querySelector('dialog[open]'))return false;
var a=document.activeElement;if(a&&m.contains(a)&&/INPUT|SELECT|TEXTAREA/.test(a.tagName))return false;return !m.querySelector('input[type=checkbox]:checked')}
function blocos(r){return [].filter.call(r.querySelectorAll(SEL),function(e){return !e.parentElement.closest(SEL)})}
function trocar(){fetch(location.href,{credentials:'same-origin'}).then(function(r){return r.ok?r.text():null}).then(function(h){if(!h||!livre())return;
var d=new DOMParser().parseFromString(h,'text/html');if((d.documentElement.getAttribute('data-projeto')||'')!==(document.documentElement.getAttribute('data-projeto')||'')){location.reload();return}
var n=d.querySelector('main');if(!n)return;var a=blocos(m),b=blocos(n);if(a.length!==b.length)return;
a.forEach(function(e,i){if(e.outerHTML!==b[i].outerHTML)e.replaceWith(document.importNode(b[i],true))})}).catch(function(){})}
function olhar(){if(!livre())return;fetch('/atualizacao',{credentials:'same-origin',cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j)return;
var pt=document.documentElement.getAttribute('data-projeto')||'';if(j.p!=null&&pt&&String(j.p)!==pt){location.reload();return}
if(versao!==null&&j.v!==versao)trocar();versao=j.v}).catch(function(){})}
olhar();setInterval(olhar,15000);document.addEventListener('visibilitychange',function(){if(!document.hidden)olhar()})})();
document.addEventListener('click',function(e){var b=e.target.closest('[data-copiar]');if(!b)return;var i=document.getElementById(b.getAttribute('data-copiar'));
navigator.clipboard.writeText('value' in i ? i.value : i.textContent).then(function(){var t=b.innerHTML;b.textContent='Copiado';setTimeout(function(){b.innerHTML=t},1500)});});
// Olhinho em todo campo de senha: mostra/esconde o que foi digitado
(function(){var A=${JSON.stringify(icone('olho', 16))},F=${JSON.stringify(icone('olho-fechado', 16))};
document.querySelectorAll('input[type=password]').forEach(function(i){if(i.closest('.campo-senha'))return;var w=document.createElement('span');w.className='campo-senha';i.parentNode.insertBefore(w,i);w.appendChild(i);
var b=document.createElement('button');b.type='button';b.className='ver-senha';b.setAttribute('aria-label','Mostrar a senha');b.title='Mostrar a senha';b.innerHTML=A;w.appendChild(b);
b.onclick=function(){var v=i.type==='password';i.type=v?'text':'password';b.innerHTML=v?F:A;var t=v?'Esconder a senha':'Mostrar a senha';b.title=t;b.setAttribute('aria-label',t);i.focus()}})})();
document.addEventListener('click',function(e){if(!e.target.closest('[data-olho]'))return;var d=document.documentElement,on=d.classList.toggle('privado');try{localStorage.setItem('poa:privado',on?'1':'0')}catch(x){}});
document.addEventListener('click',function(e){var b=e.target.closest('[data-tema]');if(!b)return;var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;document.querySelector('meta[name=theme-color]').content=n==='dark'?'#0E0F12':'#F1F2F4';try{localStorage.setItem('poa:tema',n)}catch(x){}});
document.addEventListener('click',function(e){var d=document.documentElement;
  if(e.target.closest('[data-encolher]')){var c=d.classList.toggle('menu-encolhido');try{localStorage.setItem('poa:menu',c?'encolhido':'aberto')}catch(x){}}
  if(e.target.closest('[data-gaveta]')){e.preventDefault();d.classList.add('gaveta-aberta')}
  if(e.target.closest('.gaveta-fundo')||e.target.closest('.lateral a.item'))d.classList.remove('gaveta-aberta');});
// Balão de aviso: some sozinho (ok curto) ou ao fechar; tira o ?ok= do endereço para não voltar ao recarregar
(function(){var t=document.querySelector('.toast');if(!t)return;function sair(){t.classList.add('saindo');setTimeout(function(){t.remove()},260)}
  t.querySelector('.toast-x').addEventListener('click',sair);if(!t.hasAttribute('data-fica'))setTimeout(sair,4500);
  try{var u=new URL(location.href);['ok','erro','aviso'].forEach(function(k){u.searchParams.delete(k)});history.replaceState(null,'',u.pathname+(u.search||'')+u.hash)}catch(e){}})();
// Paginação das grades (padrão do app): [data-paginar="N"] mostra N fileiras e um "Carregar mais" abre mais N por vez
(function(){document.querySelectorAll('[data-paginar]').forEach(function(g){var por=Number(g.dataset.paginar)||2,linhas=por;
  var b=document.createElement('div');b.className='pag-mais';b.innerHTML='<button type="button" class="leve botao-mini">Carregar mais</button>';g.after(b);
  function cols(){return Math.max(1,getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length)}
  function mostrar(){var n=cols()*linhas,cs=g.children;for(var i=0;i<cs.length;i++)cs[i].classList.toggle('pag-oculto',i>=n);b.hidden=cs.length<=n}
  b.querySelector('button').addEventListener('click',function(){linhas+=por;mostrar()});addEventListener('resize',mostrar);mostrar()})})();
// Dobras lembram o que estava aberto (no aparelho)
try{localStorage.removeItem('dobras');if(location.hash){var dh=document.getElementById(location.hash.slice(1));if(dh&&dh.matches('details.dobra'))dh.open=true}}catch(e){}
document.addEventListener('click',function(e){var b=e.target.closest('[data-mostrar]');if(!b)return;var i=b.parentNode.querySelector('input');if(i)i.classList.toggle('segredo')});
// Item do menu que troca de área (Ver como membro / Ver como admin): manda um POST, nunca um link que muda a sessão
document.addEventListener('click',function(e){var a=e.target.closest('[data-post]');if(!a)return;e.preventDefault();var f=document.createElement('form');f.method='post';f.action=a.dataset.post;document.body.appendChild(f);f.submit()});
// Janelas (pop-up): [data-abrir=id] abre, [data-fechar] ou clique fora fecha
document.addEventListener('click',function(e){var a=e.target.closest('[data-abrir]');if(a){var j=document.getElementById(a.dataset.abrir);if(j&&j.showModal){j.showModal();var i=j.querySelector('input:not([type=hidden]):not([type=checkbox])');if(i)i.focus()}return}
  var f=e.target.closest('[data-fechar]');if(f&&f.closest('dialog')){f.closest('dialog').close();return}});
// A janela fecha só no X (ou Cancelar): clicar fora ou apertar Esc não fecha, para não perder o que foi digitado
document.addEventListener('cancel',function(e){if(e.target.tagName==='DIALOG')e.preventDefault()},true);
document.addEventListener('change',function(e){if(e.target.matches('[data-auto]')&&e.target.form){var f=e.target.form;if(f.requestSubmit)f.requestSubmit();else f.submit()}});
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(function(){});
// Notificações: com a permissão já dada, uma vez por sessão o aparelho confere a chave do app (troca se for a antiga) e
// se inscreve nos projetos da pessoa (os novos entram ligados). "Desativar" no aparelho desliga isso (poa:push-off).
(function(){var d=document.documentElement;if(!d.dataset.projeto||!('serviceWorker' in navigator)||!('PushManager' in window)||!window.Notification||Notification.permission!=='granted')return;
  try{if(sessionStorage.getItem('poa:push')||localStorage.getItem('poa:push-off'))return}catch(e){}
  function b64(s){s=s.replace(/-/g,'+').replace(/_/g,'/');var p='='.repeat((4-s.length%4)%4),r=atob(s+p),a=new Uint8Array(r.length);for(var i=0;i<r.length;i++)a[i]=r.charCodeAt(i);return a}
  function igual(buf,k){if(!buf)return false;var a=new Uint8Array(buf),b=b64(k);if(a.length!==b.length)return false;for(var i=0;i<a.length;i++)if(a[i]!==b[i])return false;return true}
  Promise.all([navigator.serviceWorker.register('/sw.js').then(function(){return navigator.serviceWorker.ready}),fetch('/notificacoes/chave',{credentials:'same-origin'}).then(function(r){return r.json()})]).then(function(x){
    var reg=x[0],chave=x[1].chave;return reg.pushManager.getSubscription().then(function(s){
      if(s&&s.options&&igual(s.options.applicationServerKey,chave))return s;
      return (s?s.unsubscribe():Promise.resolve()).then(function(){return reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64(chave)})})})})
  .then(function(s){return fetch('/notificacoes/aparelho',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({assinatura:s.toJSON()})})})
  .then(function(r){if(r.ok)try{sessionStorage.setItem('poa:push','1')}catch(e){}}).catch(function(){})})();
// Cada formulário leva o projeto em que a tela foi aberta: se outra aba trocou de projeto, o servidor não salva no errado
document.addEventListener('submit',function(e){var p=document.documentElement.dataset.projeto,f=e.target;if(!p||String(f.method).toLowerCase()!=='post')return;
  try{var u=new URL(f.getAttribute('action')||location.href,location.href);u.searchParams.set('_p',p);f.action=u.pathname+u.search}catch(x){}},true);
// Mensagem de resultado (?ok= / ?erro= / ?aviso= / ?senha=): aparece uma vez; sai do endereço na hora, então recarregar
// ou voltar não mostra de novo
(function(){try{var u=new URL(location.href),t=0;['ok','erro','aviso','senha'].forEach(function(k){if(u.searchParams.has(k)){u.searchParams.delete(k);t=1}});
if(t)history.replaceState(history.state,'',u.pathname+(u.searchParams.toString()?'?'+u.searchParams:'')+u.hash)}catch(e){}})();
</script>`;

// Antes de desenhar: tema e menu encolhido, para a tela não piscar. O padrão é o claro; a escolha de cada
// aparelho fica guardada nele e vale da próxima vez que abrir (também no app instalado)
const INICIAL = `<script>(function(){var d=document.documentElement,t,m;try{t=localStorage.getItem('poa:tema');m=localStorage.getItem('poa:menu')}catch(e){}
t=t==='dark'?'dark':'light';d.dataset.theme=t;if(m==='encolhido')d.classList.add('menu-encolhido');try{if(localStorage.getItem('poa:privado')==='1')d.classList.add('privado')}catch(e){}
document.querySelector('meta[name=theme-color]').content=t==='dark'?'#0E0F12':'#F1F2F4'})()</script>`;

// Logo só com o texto (a marca desenhada vem depois)
// Logo do FluxoPost: o símbolo em vetor (degradê roxo, scripts/marca.js) + o nome em Figtree 600.
// Com o menu encolhido só o nome some: o símbolo fica no mesmo lugar e tamanho.
const SIMBOLO = (id = 'fpg') => `<svg class="logo-simb" viewBox="-2 -2 192 258" aria-hidden="true"><defs><linearGradient id="${id}" x1="0.85" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="#A646FF"/><stop offset="1" stop-color="#5B10D2"/></linearGradient></defs><path fill="url(#${id})" d="M4.3 41 L69.7 78.7 Q74 81.2 74 86.2 L74 248.2 Q74 253.2 69.7 250.7 L4.3 213 Q0 210.5 0 205.5 L0 43.5 Q0 38.5 4.3 41 Z"/><path fill="url(#${id})" d="M82.3 2.5 L183.7 61 Q188 63.5 188 68.5 L188 142 Q188 147 183.7 149.5 L120.3 186.1 Q116 188.6 116 183.6 L116 110.5 Q116 105.5 111.7 103 L82.3 86 Q78 83.5 78 78.5 L78 5 Q78 0 82.3 2.5 Z"/></svg>`;
const logo = (cls = 'logo') => `<span class="${cls} logo-fp" role="img" aria-label="FluxoPost">${SIMBOLO()}<span class="logo-nome">FluxoPost</span></span>`;

const iniciais = nome => String(nome || '').split(/\s+/).filter(Boolean).map(x => x[0]).slice(0, 2).join('').toUpperCase();
// Tema e sino: no computador, só no cabeçalho da página inicial (Resumo no app, Projetos no administrativo), antes do
// botão principal; no celular, no topo, ao lado da logo. O sino do administrativo abre as notificações de lá.
const botaoTema = `<button type="button" class="botao-ico" data-tema title="Modo claro/escuro" aria-label="Modo claro/escuro"><span class="so-claro">${icone('lua', 17)}</span><span class="so-escuro">${icone('sol', 17)}</span></button>`;
const botaoAvisos = href => `<a class="botao-ico" href="${href}" title="Notificações" aria-label="Notificações">${icone('sino', 17)}</a>`;
const areaAtual = () => { const c = contexto.atual(); return c && c.usuario.admin && !c.vendoComo ? 'admin' : 'projeto'; };
// No administrativo ainda não há notificações para mandar: o sino fica só no projeto
const sinoDe = area => (area === 'admin' ? '' : botaoAvisos('/aplicativo'));
const iconesCab = () => `<span class="icones-cab">${sinoDe(areaAtual())}</span>`; // a luazinha fica no pé do menu

// Perfil aberto (cada projeto é um Instagram), logo abaixo da marca, com a foto e o @, como no ManyChat; abre a lista
// para trocar de perfil e o "Adicionar perfil" (Conexões)
const fotoPerfil = p => `<span class="bolinha"><span>${esc(iniciais(p.ig_usuario || p.nome))}</span>${p.ig_foto ? `<img src="${esc(p.ig_foto)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}</span>`;
const nomePerfil = p => `<span class="perfil-nome"><b>${p.ig_usuario ? esc(p.ig_usuario) : esc(p.nome)}</b></span>`; // sem @: só o nome do perfil
function seletorProjeto() {
  const c = contexto.atual();
  if (!c) return '';
  if (!c.projeto) return `<div class="projeto-sel"><a class="projeto-fixo" href="/conexoes"><span class="quadro">+</span><b>Adicionar perfil</b></a></div>`;
  const acao = c.usuario.admin ? '/admin/entrar' : '/projeto/trocar';
  return `<details class="projeto-sel"><summary title="Trocar de perfil">${fotoPerfil(c.projeto)}${nomePerfil(c.projeto)}${icone('baixo', 15)}</summary><div class="projeto-pop">
    ${c.projetos.filter(p => p.ig_id || p.id === c.projeto.id).map(p => `<form method="post" action="${acao}"><input type="hidden" name="projeto" value="${p.id}"><button class="item-menu ${p.id === c.projeto.id ? 'on' : ''}">${fotoPerfil(p)}${nomePerfil(p)}</button></form>`).join('')}
    <hr><a class="item-menu" href="/conexoes">${icone('mais2', 15)}Adicionar perfil</a>
    ${c.usuario.admin ? `<a class="item-menu" href="/admin">${icone('config', 15)}Administrativo</a>` : ''}</div></details>`;
}

// Rodapé do menu: só quem está usando (Minha conta, Administrativo, Sair)
// Pé do menu (Nilton, 09/11/2026, como no Criativos do Reino): só a bolinha do perfil + a luazinha (e a bandeira do
// idioma no dia em que o app tiver tradução). Tocar na bolinha abre: nome e e-mail, "Comece por aqui" (só se o app tiver
// ajuda: preencha AJUDA), Minha conta e Sair.
const AJUDA = null; // ex.: ['/ajuda', 'Comece por aqui']
function rodape(area) {
  const c = contexto.atual();
  const nome = c ? c.usuario.nome : 'FluxoPost';
  const detalhe = c ? c.usuario.email : '';
  const bola = `<span class="avatar">${esc(iniciais(nome))}</span>`;
  const itens = c ? `<div class="pe-quem">${bola}<span><b>${esc(nome)}</b><small>${esc(detalhe)}</small></span></div><hr>
      ${AJUDA ? `<a class="item-menu" href="${AJUDA[0]}">${icone('ajuda', 15)}${AJUDA[1]}</a>` : ''}<a class="item-menu" href="/conta">${icone('contas', 15)}Minha conta</a>
      <button type="button" class="item-menu" data-tema><span class="so-claro">${icone('lua', 15)}Modo escuro</span><span class="so-escuro">${icone('sol', 15)}Modo claro</span></button><hr>` : '';
  return `<div class="pe"><details class="pe-conta"><summary title="${esc(nome)}" aria-label="Conta de ${esc(nome)}">${bola}<span class="quem"><b>${esc(nome)}</b><small>${esc(detalhe)}</small></span></summary>
    <div class="pe-menu">${itens}<form method="post" action="/sair"><button class="item-menu perigo-txt">${icone('sair', 15)}Sair</button></form></div></details>${botaoTema}</div>`;
}

// Menu padrão do administrativo de todos os apps (skill gd-acesso-membros, 07/11/2026)
const MENU_ADMIN = [['Administrativo', [['/admin', 'Projetos', 'm-projetos'], ['/admin/membros', 'Membros', 'm-membros'], ['/admin/analytics', 'Analytics', 'm-analise'],
  ['/admin/grupos', 'Grupos e ofertas', 'm-grupos'], ['/admin/configuracoes', 'Configurações', 'm-config']]], ['Conta', [['/conta', 'Minha conta', 'm-conta'], ['/admin/entrar', 'Ver como membro', 'olho', '/admin/entrar']]]];
const ABAS_ADMIN = MENU_ADMIN[0][1].filter(([h]) => h !== '/admin/grupos'); // barra do celular: 4 + Menu

function pagina(titulo, corpo, { caminho = '', menu = true, mensagem, vivo = false, parcial = false } = {}) {
  // Aviso depois de salvar: balão no canto de baixo, por cima de tudo (nada na tela se mexe). "ok" curto some sozinho;
  // erro, aviso e texto longo (ex.: senha para anotar) ficam até fechar.
  const fica = mensagem && (mensagem.tipo !== 'ok' || String(mensagem.texto).length > 90);
  const msg = mensagem && mensagem.texto ? `<div class="toast t-${mensagem.tipo}" role="status" ${fica ? 'data-fica' : ''}>${icone(mensagem.tipo === 'erro' ? 'alerta' : mensagem.tipo === 'aviso' ? 'ajuda' : 'ok', 16)}<span>${esc(mensagem.texto)}</span><button type="button" class="toast-x" aria-label="Fechar">${icone('fechar', 14)}</button></div>` : '';
  // Os estilos de cada tela vão para o <head>: a página já aparece arrumada enquanto carrega (sem o "quebrado")
  const estilos = [];
  corpo = String(corpo).replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => { if (!estilos.includes(css)) estilos.push(css); return ''; });
  const cx = contexto.atual();
  const projetoDaTela = cx && cx.projeto && !(cx.usuario.admin && !cx.vendoComo) ? cx.projeto.id : '';
  const head = `<!doctype html><html lang="pt-BR"${projetoDaTela ? ` data-projeto="${projetoDaTela}"` : ''}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)} · FluxoPost</title><link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/favicon.svg?v=6" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FluxoPost"><meta name="theme-color" content="#F1F2F4">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=Figtree:wght@500;600;700&display=swap" rel="stylesheet">
${INICIAL}<style>${CSS}</style>${estilos.map(c => `<style>${c}</style>`).join('')}</head>`;
  if (!menu) return `${head}<body>${msg}${corpo}${SCRIPT}</body></html>`;

  const c = contexto.atual();
  const area = areaAtual();
  const secoes = area === 'admin' ? MENU_ADMIN : c && c.usuario.admin ? MENU.map(([sec, itens]) => [sec, sec === 'Conta' ? [...itens, ['/admin', 'Ver como admin', 'm-admin', '/admin/voltar']] : itens]) : MENU;
  const inicio = area === 'admin' ? '/admin' : INICIO;
  const ativoAqui = h => (h === '/admin' ? caminho === '/admin' : ativo(h, caminho));
  const lateral = `<aside class="lateral" aria-label="Menu">
    <div class="cabeca"><a class="marca" href="${inicio}">${logo()}</a>
      <button type="button" class="seta-menu" data-encolher title="Recolher ou abrir o menu" aria-label="Recolher ou abrir o menu">${icone('esquerda', 16)}</button></div>
    ${area === 'admin' ? '' : seletorProjeto()}
    <nav>${secoes.map(([sec, itens]) => `<div class="secao">${sec}</div>${itens.map(([h, n, i, post]) => `<a class="item ${post ? 'item-troca' : ativoAqui(h) ? 'on' : ''}" href="${h}" title="${n}"${post ? ` data-post="${post}"` : ''}>${icone(i)}<span>${n}</span></a>`).join('')}`).join('')}</nav>
    ${rodape(area)}</aside><div class="gaveta-fundo"></div>`;
  const topo = `<header class="topo"><a class="marca-cel" href="${inicio}">${logo('')}</a><div class="acoes">${botaoTema}${sinoDe(area)}</div></header>`;
  const abasLista = area === 'admin' ? ABAS_ADMIN : ABAS;
  const abas = `<nav class="abas">${abasLista.map(([h, n, i]) => `<a class="${ativoAqui(h) ? 'on' : ''}" href="${h}">${icone(i, 20)}${n}</a>`).join('')}
    <a href="/mais" data-gaveta>${icone('menu', 20)}Menu</a></nav>`;
  return `${head}<body${area === 'admin' ? ' class="adm"' : ''}><div class="app">${lateral}<div class="conteudo">${topo}<main${vivo ? ' data-vivo' : ''}${parcial ? ' data-parcial' : ''}>${msg}${corpo}</main></div></div>${abas}${SCRIPT}</body></html>`;
}

// Dobra: bloco fechado (título + situação à direita); o corpo só aparece ao tocar. aberto = já começa aberto.
const dobra = ({ id, titulo, situacao = '', extra = '', corpo, aberto = false }) => `<details class="dobra" id="${id}" ${aberto ? 'open' : ''}><summary>${icone('direita', 15)}<b>${titulo}</b>${extra}${situacao ? `<span class="dobra-sit">${situacao}</span>` : ''}</summary><div class="dobra-corpo">${corpo}</div></details>`;
// Seção com título + "?" e o botão de adicionar à direita (Configurações e Grupos e ofertas, como no Criativos do Reino)
const secao = (titulo, explica, corpo, botao = '') => `<section class="secao-adm"><div class="secao-adm-cab"><h2>${titulo}${explica ? dica(explica) : ''}</h2>${botao}</div>${corpo}</section>`;
// Campo escondido (endereço, token, senha) com olhinho e o que vier ao lado (Copiar, Salvar, trocar, excluir)
const campoSegredo = (attrs, depois = '') => `<div class="copiar token-linha"><input class="segredo" autocomplete="off" data-lpignore="true" data-1p-ignore ${attrs}><button type="button" class="botao-ico" data-mostrar title="Mostrar ou esconder" aria-label="Mostrar ou esconder">${icone('olho', 16)}</button>${depois}</div>`;
// Ajuda recolhida: "Como configurar" vira um link pequeno que abre um texto curto (o que preencher e o que não)
// Explicação curta escondida num "?" (aparece ao passar o mouse ou ao tocar). Use só quando a explicação for necessária.
const dica = texto => `<span class="dica" tabindex="0" role="note" aria-label="${esc(texto)}" data-dica="${esc(texto)}">?</span>`;
const ajuda = (titulo, corpo) => `<details class="ajuda-dobra"><summary>${icone('ajuda', 14)}${titulo}</summary><div>${corpo}</div></details>`;
// Mensagem que volta depois de salvar (?ok=... ou ?erro=... ou ?aviso=...)
const mensagemDe = q => (q.erro ? { tipo: 'erro', texto: q.erro } : q.aviso ? { tipo: 'aviso', texto: q.aviso } : q.ok ? { tipo: 'ok', texto: q.ok } : null);

// Código para copiar, numa caixa (várias linhas, como num editor)
const blocoCodigo = (id, texto, rotulo = 'HTML') => `<div class="codigo"><div class="codigo-cab"><span>${esc(rotulo)}</span><button type="button" class="leve botao-mini" data-copiar="${id}">${icone('copiar', 14)}Copiar</button></div><pre id="${id}">${esc(texto)}</pre></div>`;
const campoCopiar = (id, valor) => `<div class="copiar"><input id="${id}" readonly value="${esc(valor)}"><button type="button" class="leve" data-copiar="${id}">Copiar</button></div>`;

const voltar = (href, rotulo) => `<a class="voltar" href="${href}">${icone('esquerda', 16)}${rotulo}</a>`;
const cabecalhoPagina = (titulo, sub, acoes = '') => `<header><div><h1>${titulo}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>${acoes ? `<div class="acoes-pag">${acoes}</div>` : ''}</header>`;
// Bloco com título (e ações); semPad = o conteúdo é uma tabela que encosta nas bordas
const bloco = (titulo, corpo, { acoes = '', semPad = false } = {}) => `<section class="bloco"><div class="bloco-cab"><h3>${titulo}</h3>${acoes}</div><div class="bloco-corpo ${semPad ? 'sem-pad' : ''}">${corpo}</div></section>`;

// Olho do cabeçalho: esconde (borra) nomes de produtos, campanhas e src, para mostrar o painel sem entregar a operação.
// A escolha fica guardada no aparelho.
const OLHO = `<button type="button" class="leve botao-olho" data-olho title="Esconder/mostrar nomes de produtos e campanhas"><span class="olho-a">${icone('olho', 16)}</span><span class="olho-f">${icone('olho-fechado', 16)}</span></button>`;
// Barra de filtros das listas (Vendas, Eventos): o mesmo jeito do Resumo/Meta/UTMs, numa linha só.
// Lista com caixinhas que abre e fecha (escolher mais de uma situação); aplica ao fechar ou em "Aplicar".
function multiEscolha(nome, rotulo, opcoes, marcados, todos = 'Todas') {
  const sel = opcoes.filter(([v]) => marcados.includes(v));
  const resumo = !sel.length || sel.length === opcoes.length ? todos : sel.length === 1 ? sel[0][1] : `${sel[0][1]} +${sel.length - 1}`;
  return `<div class="campo"><label>${rotulo}</label><details class="multi" data-multi><summary><span>${esc(resumo)}</span>${icone('baixo', 15)}</summary>
    <div class="multi-painel">${opcoes.map(([v, t, n]) => `<label class="multi-op"><input type="checkbox" name="${nome}" value="${esc(v)}" ${marcados.includes(v) ? 'checked' : ''}><span>${esc(t)}</span>${n != null ? `<small>${n}</small>` : ''}</label>`).join('')}
    <div class="multi-pe"><button type="button" class="leve botao-mini" data-multi-limpar>Limpar</button><button class="botao-mini">Aplicar</button></div></div></details></div>`;
}
const campoBusca = (valor, dica) => `<div class="campo campo-busca"><label>Buscar</label><div class="busca-campo">${icone('lupa', 16)}<input name="q" value="${esc(valor)}" placeholder="${esc(dica)}" autocomplete="off"></div></div>`;
const SCRIPT_MULTI = `if(!window.__multi){window.__multi=1;
var mudou=function(d){return d.dataset.antes!==[].slice.call(d.querySelectorAll('input:checked')).map(function(i){return i.value}).join(',')};
document.querySelectorAll('[data-multi]').forEach(function(d){d.dataset.antes=[].slice.call(d.querySelectorAll('input:checked')).map(function(i){return i.value}).join(',')});
document.addEventListener('toggle',function(e){var d=e.target;if(!d.matches||!d.matches('[data-multi]')||d.open)return;if(mudou(d)){var f=d.closest('form');f.requestSubmit?f.requestSubmit():f.submit()}},true);
document.addEventListener('click',function(e){document.querySelectorAll('[data-multi][open]').forEach(function(d){if(!d.contains(e.target))d.open=false});
  var l=e.target.closest('[data-multi-limpar]');if(l){l.closest('[data-multi]').querySelectorAll('input').forEach(function(i){i.checked=false})}})}`;
// Lista de valores de um parâmetro (?f=a&f=b), só os válidos
const listaDe = (x, validos) => [].concat(x || []).map(String).filter(v => validos.includes(v));
module.exports = { secao, campoSegredo, dobra, ajuda, dica, INICIO, multiEscolha, campoBusca, SCRIPT_MULTI, listaDe, iconesCab, OLHO, blocoCodigo, esc, data, pagina, mensagemDe, campoCopiar, icone, logo, cabecalhoPagina, voltar, bloco };
