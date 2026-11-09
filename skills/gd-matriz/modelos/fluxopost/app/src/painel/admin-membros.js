// Administrativo do FluxoPost, parte de membros (skill gd-acesso-membros — padrão de todos os apps do Nilton, 07/11/2026):
//   Membros · Analytics · Grupos e ofertas · e, dentro de Configurações, Plataformas de venda e E-mail.
// Motor em src/acesso.js (grupos, ofertas, vendas), src/plataformas.js (contas da Kiwify/Hotmart), src/correio.js (e-mail)
// e src/atividade.js (o que cada membro faz). Visual do FluxoPost (blocos, janelas, selos).
const { esc, icone, dobra, ajuda, dica, secao, campoSegredo } = require('./layout');
const { PRAZOS, NOME_EVENTO } = require('../acesso');
const { diaSP } = require('../atividade');
const { grafico, SCRIPT_GRAFICOS } = require('./graficos');

const FUSO = 'America/Sao_Paulo';
const txt = v => String(v ?? '').trim();
const lista = v => (Array.isArray(v) ? v : v === undefined || v === '' ? [] : [v]);
const n = x => Number(x || 0).toLocaleString('pt-BR');
const data = t => (t ? new Date(t).toLocaleDateString('pt-BR', { timeZone: FUSO }) : '');
const diaISO = t => new Date(t).toLocaleDateString('en-CA', { timeZone: FUSO });
const dataHora = t => new Date(t).toLocaleString('pt-BR', { timeZone: FUSO, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const horaSP = t => new Date(t).toLocaleTimeString('pt-BR', { timeZone: FUSO, hour: '2-digit', minute: '2-digit' });
const iniciais = nome => String(nome || '?').trim().split(/\s+/).filter(Boolean).map(x => x[0]).slice(0, 2).join('').toUpperCase();
const emailValido = e => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
function quandoFoi(t, agora = Date.now()) {
  if (!t) return '';
  const d = agora - t;
  if (d < 60 * 1000) return 'agora';
  if (d < 60 * 60 * 1000) return `há ${Math.floor(d / 60000)} min`;
  if (data(t) === data(agora)) return `hoje às ${horaSP(t)}`;
  if (data(t) === data(agora - 864e5)) return `ontem às ${horaSP(t)}`;
  return `${new Date(t).toLocaleDateString('pt-BR', { timeZone: FUSO, day: '2-digit', month: '2-digit' })} às ${horaSP(t)}`;
}
const PLATAFORMAS = { kiwify: 'Kiwify', hotmart: 'Hotmart' };
const ORIGEM = { kiwify: 'Kiwify', hotmart: 'Hotmart', manual: 'Manual' };
// Provedores de e-mail de domínio mais usados no Brasil: servidor SMTP e porta (465 = SSL)
const PROVEDORES = [['Hostinger', 'smtp.hostinger.com', 465], ['HostGator / Titan', 'smtp.titan.email', 465], ['Locaweb', 'email-ssl.com.br', 465],
  ['KingHost', 'smtp.kinghost.net', 465], ['Google Workspace / Gmail', 'smtp.gmail.com', 465], ['Microsoft 365 / Outlook', 'smtp.office365.com', 587],
  ['Zoho Mail', 'smtp.zoho.com', 465], ['UOL Host', 'smtps.uhserver.com', 465]];

const fechar = () => `<button type="button" class="botao-ico" data-fechar aria-label="Fechar">${icone('fechar', 16)}</button>`;
const confirmar = (id, titulo, texto, acao, botao, classe = 'perigo') => `<dialog class="janela" id="${id}"><div class="card-cab"><h3>${titulo}</h3>${fechar()}</div>
  <p>${texto}</p><div class="rodape-janela"><form method="post" action="${acao}"><button class="${classe}">${botao}</button></form><button type="button" class="leve" data-fechar>Cancelar</button></div></dialog>`;

const CSS = `<style>
.m-filtros{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;margin:0 0 14px}
.m-resumo{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;margin:0;color:var(--t2);font-size:13px}.m-resumo b{color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}.m-resumo .atencao b{color:var(--aviso)}
.filtro-direita{display:flex;gap:10px;align-items:center;margin:0 0 0 auto}.filtro-direita .busca-campo{width:280px}
.m-total{color:var(--t3);font-size:12.5px;margin:0 0 10px}
.m-tabela{border:1px solid var(--borda);border-radius:12px;background:var(--s1)}
.m-cab,.m-linha{display:grid;grid-template-columns:minmax(240px,1.6fr) minmax(90px,.45fr) minmax(110px,.5fr) minmax(130px,.6fr) minmax(120px,.5fr) minmax(130px,.65fr) 92px;align-items:stretch}
.m-cab>*,.m-linha>*{display:flex;align-items:center;min-width:0;padding:12px 14px;border-left:1px solid var(--borda)}.m-cab>:first-child,.m-linha>:first-child{border-left:0}
.m-cab{border-radius:12px 12px 0 0;background:var(--s2);border-bottom:1px solid var(--borda);color:var(--t3);font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}.m-cab>*{padding-top:10px;padding-bottom:10px}
.m-linha{border-top:1px solid var(--borda);cursor:pointer}.m-cab+.m-linha{border-top:0}.m-linha:hover{background:var(--s2)}.m-linha:last-child{border-radius:0 0 12px 12px}
.m-linha.inativo .m-quem{opacity:.6}
.m-quem{gap:12px}.m-quem>div{display:grid;min-width:0}.m-quem b{font-size:14.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m-quem small{color:var(--t3);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.avatar-ini{display:flex;align-items:center;justify-content:center;line-height:1;width:38px;height:38px;border-radius:999px;background:var(--s2);color:var(--ink);font-weight:600;font-size:13px;flex:none}
.m-nada{color:var(--t3)}.m-vence{font-size:13px;color:var(--t2)}.m-vence.perto{color:var(--aviso);font-weight:600}
.m-acoes{justify-content:flex-end;gap:8px}.m-acoes .botao-ico{width:32px;height:32px;border-radius:8px}
.selo-plat{flex:none;padding:3px 9px;border-radius:6px;font-size:11.5px;font-weight:600;color:#fff;background:#6B7280;line-height:1.4}.selo-plat.kiwify{background:#16A34A}.selo-plat.hotmart{background:#F04E23}
.cab-f{gap:4px;position:relative}.cab-filtrando{margin-left:4px;color:var(--ink);font-size:10.5px;letter-spacing:0;text-transform:none;font-weight:600}
.m-funil{position:relative;display:block}.m-funil:not([open])>.funil-pop{display:none}.m-funil summary{display:grid;place-items:center;width:24px;height:24px;border-radius:6px;color:var(--t3);cursor:pointer;list-style:none}.m-funil summary::-webkit-details-marker{display:none}
.m-funil summary:hover{color:var(--ink);background:var(--borda)}.m-funil.on summary{color:var(--ink);background:var(--s3)}
.funil-pop{position:absolute;left:-8px;top:calc(100% + 8px);z-index:40;display:grid;gap:2px;min-width:220px;padding:10px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);box-shadow:0 14px 34px rgba(0,0,0,.18);text-transform:none;letter-spacing:0;font-weight:400}
.funil-pop b{padding:6px 8px 4px;color:var(--t3);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.funil-pop a{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border-radius:8px;color:var(--ink);font-size:13.5px;text-decoration:none}.funil-pop a:hover{background:var(--s2)}.funil-pop a.on{font-weight:600}
.funil-pop a small{color:var(--t3);font-size:12px;margin-left:auto}
.funil-datas{display:grid;gap:8px;margin-top:6px;padding-top:6px;border-top:1px solid var(--borda)}.funil-datas label{display:grid;gap:4px;padding:0 8px;font-size:12.5px;color:var(--t2)}.funil-acoes{display:flex;justify-content:flex-end;gap:8px;padding:0 8px 4px}
.m-cab .cab-f:nth-last-child(2) .funil-pop,.m-cab .cab-f:nth-last-child(3) .funil-pop{left:auto;right:-8px}
.paginacao{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:24px 0 8px}
.paginacao a,.paginacao span{display:grid;place-items:center;min-width:40px;height:40px;padding:0 6px;border:1px solid var(--borda2);border-radius:10px;color:var(--ink);background:var(--s1);font-weight:500;font-size:14px;text-decoration:none}
.paginacao a:hover{border-color:var(--ink)}.paginacao span.on{color:var(--sel-ink);background:var(--sel);border-color:var(--sel);font-weight:600}.paginacao .reticencias{border:0;background:none;min-width:20px;color:var(--t3)}.paginacao .seta.off{opacity:.35}
.ir-pag{margin:0 0 0 8px}.ir-pag label{display:flex;align-items:center;gap:6px;color:var(--t2);font-size:13px}.ir-pag input{width:70px}
.janela-hist{width:min(560px,calc(100vw - 32px))}.hist-ultimo{margin:0 0 12px;color:var(--t2);font-size:13.5px}
.hist-lista{list-style:none;margin:0;padding:0;display:grid;max-height:60vh;overflow:auto}.hist-lista li{display:grid;grid-template-columns:120px 1fr;gap:10px;padding:9px 2px;border-top:1px solid var(--borda);font-size:13.5px}.hist-lista li:first-child{border-top:0}
.hist-lista small{color:var(--t3);font-size:12.5px}.hist-lista span{color:var(--t2)}.hist-lista b{color:var(--ink);font-weight:600}.hist-lista em{font-style:normal;color:var(--t3)}.hist-lista li[hidden]{display:none}
@media (max-width:1100px){.m-cab,.m-linha{grid-template-columns:minmax(190px,1.6fr) minmax(80px,.5fr) minmax(96px,.55fr) minmax(124px,.6fr) minmax(124px,.65fr) 92px}.m-cab>:nth-child(4),.m-linha>.m-ultimo{display:none}}
@media (max-width:720px){.m-cab{display:flex;flex-wrap:wrap;gap:6px 16px;padding:8px 12px}.m-cab>*{border:0;padding:0}.m-cab>span:not(.cab-f){display:none}.m-cab .funil-pop{left:auto;right:-8px}
  .m-linha{grid-template-columns:1fr auto;grid-template-areas:"quem acoes" "rodape rodape";padding:8px}.m-linha>*{border:0;padding:4px}.m-quem{grid-area:quem}.m-acoes{grid-area:acoes}.m-linha .m-data,.m-linha .m-ultimo,.m-linha .m-ate{display:none}
  .m-linha .m-origem{grid-area:rodape}.m-linha .m-situacao{grid-area:rodape;justify-content:flex-end}.filtro-direita{width:100%;margin:0}.filtro-direita .busca-campo{flex:1;width:auto}}
.mb-linha{display:flex;flex-wrap:wrap;gap:4px 18px;margin:0 0 12px;color:var(--t3);font-size:13px}.mb-linha b{color:var(--ink);font-weight:600}.mb-linha .atencao b{color:var(--aviso)}
.mb-resumo{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:0 0 14px}
.mb-resumo>*{display:grid;gap:2px;padding:12px 14px;border:1px solid var(--borda);border-radius:14px;background:var(--s1);color:inherit;text-decoration:none}
.mb-resumo b{font-size:22px;line-height:1.1}.mb-resumo small{color:var(--t3);font-size:12.5px}.mb-resumo .atencao b{color:var(--aviso)}
.mb-filtros{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 12px}.mb-filtros .busca-campo{min-width:240px}
.mb-filtros form{margin:0}.mb-filtros select{width:auto}
.mb-quem{display:flex;align-items:center;gap:10px}.mb-quem small{display:block;color:var(--t3);font-size:12px}
.mb-grupos{display:grid;gap:6px}.mb-grupo{display:grid;grid-template-columns:minmax(0,1fr) 150px auto;gap:10px;align-items:center;padding:8px 10px;border:1px solid var(--borda);border-radius:10px}
.mb-grupo .marcar,.mb-mao{display:flex;align-items:center;gap:6px;font-size:13px;white-space:nowrap}.mb-grupo input[type=checkbox]{width:auto;margin:0;flex:none}.mb-grupo input[type=date]{padding:6px 8px;font-size:13px}
.mb-grupo small{display:block;color:var(--t3);font-size:11.5px;font-weight:400}
.mb-hist{list-style:none;margin:0;padding:0;display:grid;gap:0}.mb-hist li{display:grid;grid-template-columns:130px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid var(--borda);font-size:13.5px}.mb-hist small{color:var(--t3)}
.gr-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.gr-linhas{display:grid}.gr-linha{display:flex;align-items:center;gap:10px;min-height:52px;padding:0 2px;border-bottom:1px solid var(--s2)}.gr-linha:last-child{border-bottom:0}
.gr-linha>b{font-size:14px}.gr-num{margin-left:auto;color:var(--t3);font-size:13px}.gr-num b{color:var(--ink);font-weight:600}
.gr-cartao{display:grid;gap:8px;padding:14px;border:1px solid var(--borda);border-radius:12px;background:var(--s1)}.gr-cartao h4{margin:0;display:flex;gap:8px;align-items:center}
.gr-cartao small{color:var(--t3)}.gr-cartao .botoes-linha{margin-top:4px}
.of-linhas{display:grid;gap:8px}.of-linha{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr auto;gap:8px;align-items:end}
.reg{display:grid;gap:3px;padding:10px 0;border-bottom:1px solid var(--borda);font-size:13.5px}.reg small{color:var(--t3)}.reg em{font-style:normal;color:var(--t2)}
.reg form{display:inline;margin:0 0 0 6px}
.eventos-lista{font-size:13px;color:var(--t2)}.eventos-lista ol{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0;padding:0;list-style:none}
.eventos-lista li{padding:3px 9px;border-radius:99px;background:var(--neutro-f);color:var(--t3)}.eventos-lista li.sim{background:var(--ok-f);color:var(--ok);font-weight:600}
.plat-conta{border:1px solid var(--borda);border-radius:12px;padding:10px 14px}.plat-conta>summary{cursor:pointer;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.plat-corpo{display:grid;gap:12px;margin-top:12px}.plat-linha{display:flex;flex-wrap:wrap;gap:8px;align-items:end}.plat-linha .campo{flex:1;min-width:200px;margin:0}
.eh-lista{list-style:none;margin:8px 0 0;padding:0;max-height:320px;overflow:auto}.eh-lista li{display:grid;grid-template-columns:96px 1fr auto auto;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--borda);font-size:12.5px}
.eh-lista small{color:var(--t3)}.eh-lista form{margin:0}
.an-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:0 0 14px}
.an-kpi{display:grid;gap:4px;padding:14px 16px;border:1px solid var(--borda);border-radius:12px;background:var(--s1)}.an-kpi span{color:var(--t3);font-size:12.5px}.an-kpi b{font-size:26px;line-height:1.1}.an-kpi small{color:var(--t3);font-size:12px}.an-kpi small.sobe{color:var(--ok)}
.an-duas{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:0 0 14px}.an-quatro{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:0 0 14px}
.an-painel{padding:14px 16px;border:1px solid var(--borda);border-radius:12px;background:var(--s1);min-width:0}.an-painel-cab{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.an-painel h3{margin:0;font-size:14.5px}.an-painel-cab small{color:var(--t3)}
.an-top{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:8px}.an-top li{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:13.5px}.an-top small{display:block;color:var(--t3);font-size:12px}.an-top-n{font-weight:700}
.an-vazio{color:var(--t3);font-size:13px;margin:10px 0 0}
.an-painel,.graf{--graf:#7B2FF2}[data-theme="dark"] .an-painel,[data-theme="dark"] .graf{--graf:#B98CFF}.an-duas .g-area-graf{height:220px}.graf{margin:0}
.g-area-graf{position:relative;height:170px;margin:14px 6px 0 34px}.g-area-graf svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.g-grade{position:absolute;left:0;right:0;border-top:1px solid var(--borda);pointer-events:none}.g-grade i{position:absolute;right:calc(100% + 8px);transform:translateY(-50%);font-style:normal;font-size:11px;color:var(--t3);white-space:nowrap}
.g-datas{position:relative;height:20px;margin:6px 6px 0 34px}.g-datas span{position:absolute;top:0;transform:translateX(-50%);font-size:11px;color:var(--t3);white-space:nowrap}
.g-valor{position:absolute;transform:translate(-50%,calc(-100% - 6px));font-size:12px;font-weight:600;color:var(--ink);pointer-events:none}
.g-barra{fill:var(--graf)}.g-linha{fill:none;stroke:var(--graf);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}.g-area{fill:var(--graf);opacity:.12}
.g-mira{position:absolute;top:0;bottom:0;border-left:1px dashed var(--t3);pointer-events:none}
.g-ponto{position:absolute;width:10px;height:10px;border-radius:99px;background:var(--graf);box-shadow:0 0 0 2px var(--s1);transform:translate(-50%,-50%);pointer-events:none}
.g-toque{position:absolute;top:0;bottom:0;cursor:crosshair}.g-toque.on{background:color-mix(in srgb,var(--ink) 5%,transparent)}
.g-dica{position:absolute;z-index:2;transform:translate(-50%,calc(-100% - 12px));padding:6px 10px;border-radius:8px;background:var(--ink);color:var(--bg);font-size:12.5px;font-weight:500;white-space:nowrap;pointer-events:none;box-shadow:var(--sombra-pop)}
.g-vazio{position:absolute;inset:38% 0 auto;margin:0;text-align:center;color:var(--t3);font-size:13px}
.g-tabela{margin-top:8px;font-size:12.5px;color:var(--t3)}.g-tabela summary{cursor:pointer}.g-tabela table{width:100%;margin-top:8px;border-collapse:collapse}.g-tabela td,.g-tabela th{padding:4px 6px;border-bottom:1px solid var(--borda);text-align:left;color:var(--t2)}.g-tabela td:last-child,.g-tabela th:last-child{text-align:right}
.g-tabela tbody{display:block;max-height:220px;overflow:auto}.g-tabela thead,.g-tabela tbody tr{display:table;width:100%;table-layout:fixed}
@media (max-width:1100px){.an-quatro{grid-template-columns:repeat(2,minmax(0,1fr))}.mb-resumo{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:760px){.an-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.an-duas,.an-quatro{grid-template-columns:1fr}.mb-resumo{grid-template-columns:repeat(2,minmax(0,1fr))}
  .mb-grupo{grid-template-columns:1fr}.of-linha{grid-template-columns:1fr 1fr}.eh-lista li{grid-template-columns:1fr auto}}
</style>`;

// deps: o que vem da plataforma (src/plataforma.js)
function montarAdminMembros(app, { contas, acesso, plataformas, correio, servico, tela, soAdmin, formulario, voltarAdmin, voltarComSegredo, avisoUnico, mensagemDe, limparAparelhos, baseUrl, agora = Date.now }) {
  const db = contas.db;
  const um = (sql, ...a) => db.prepare(sql).get(...a);
  const q = (sql, ...a) => db.prepare(sql).all(...a);

  // ───────────── Membros ─────────────
  const SCRIPT_MEMBROS = `<script>(function(){if(window.__membros)return;window.__membros=1;
var t=function(s){var x=document.createElement('span');x.textContent=s==null?'':s;return x.innerHTML};
document.addEventListener('click',function(e){
  document.querySelectorAll('[data-funil][open]').forEach(function(d){if(!d.contains(e.target))d.open=false});
  var b=e.target.closest('[data-historico]');
  if(b){var j=document.getElementById('j-historico');if(!j)return;j.querySelector('[data-hist-titulo]').textContent='Histórico · '+(b.dataset.nome||'');
    j.querySelector('[data-hist-ultimo]').innerHTML='Último acesso: <b>'+t(b.dataset.ultimo)+'</b>';var lista=j.querySelector('[data-hist-lista]');lista.innerHTML='<small>Carregando…</small>';j.showModal();
    fetch(b.dataset.historico,{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(l){
      if(!l.length){lista.innerHTML='<p class="vazio">Nada registrado ainda.</p>';return}
      var POR=15,vis=POR;lista.innerHTML='<ol class="hist-lista">'+l.map(function(a){return '<li><small>'+t(a.q)+'</small><span>'+t(a.v)+(a.i?' <b>'+t(a.i)+'</b>':'')+(a.c?' <em>· '+t(a.c)+'</em>':'')+'</span></li>'}).join('')+'</ol><div class="pag-mais"><button type="button" class="leve botao-mini"></button></div>';
      var itens=[].slice.call(lista.querySelectorAll('.hist-lista li')),caixa=lista.querySelector('.pag-mais'),b2=caixa.querySelector('button');
      function mostrar(){itens.forEach(function(it,i){it.hidden=i>=vis});var falta=itens.length-vis;b2.textContent='Carregar mais ('+Math.min(POR,falta)+' de '+falta+')';caixa.hidden=falta<=0}
      b2.addEventListener('click',function(){vis+=POR;mostrar()});mostrar()}).catch(function(){lista.innerHTML='<p class="vazio">Não deu para carregar. Feche e abra de novo.</p>'});return}
  var l=e.target.closest('[data-linha-abre]');if(!l||e.target.closest('button,a,input,summary,details'))return;var ed=l.querySelector('[data-abrir]');if(ed)ed.click()})})()</script>`;
  app.get('/admin/usuarios', soAdmin, (req, res) => res.redirect('/admin/membros'));
  const POR_PAG = 50;
  // Membros no formato do Criativos do Reino (gd-acesso-membros / gd-layout-apps, 09/11/2026): números numa linha com a
  // busca à direita, tabela com funil em cada coluna que filtra (tudo pelo endereço), reloginho do histórico e lápis
  const SITUACOES = [['', 'Todas'], ['ativos', 'Com acesso'], ['vencidos', 'Vencidos'], ['livre', 'Sem grupo'], ['bloqueados', 'Bloqueados']];
  const PRAZOS_F = [['', 'Todos'], ['30', 'Vencem em 30 dias'], ['sem', 'Sem prazo']];
  const ACESSOS_F = [['', 'Todos'], ['hoje', 'Entraram hoje'], ['7', 'Nos últimos 7 dias'], ['30', 'Nos últimos 30 dias'], ['nunca', 'Nunca entraram']];
  const ORDENS = ['novos', 'antigos', 'vence', 'acesso'];
  app.get('/admin/membros', soAdmin, (req, res) => {
    const t = agora();
    const ehDia = d => /^\d{4}-\d{2}-\d{2}$/.test(d);
    const busca = txt(req.query.q), filtro = SITUACOES.some(([v]) => v && v === req.query.f) ? req.query.f : '';
    const origem = ['manual', 'kiwify', 'hotmart'].includes(req.query.o) ? req.query.o : '';
    const de = ehDia(txt(req.query.de)) ? txt(req.query.de) : '', ate = ehDia(txt(req.query.ate)) ? txt(req.query.ate) : '';
    const prazoF = PRAZOS_F.some(([v]) => v && v === req.query.p) ? req.query.p : '';
    const acessoF = ACESSOS_F.some(([v]) => v && v === req.query.ua) ? req.query.ua : '';
    const ordemPadrao = prazoF === '30' ? 'vence' : 'novos';
    const ordem = ORDENS.includes(req.query.ord) ? req.query.ord : ordemPadrao;
    const VALE = `EXISTS (SELECT 1 FROM usuario_grupos ug WHERE ug.usuario_id = u.id AND (ug.expira_em IS NULL OR ug.expira_em > ${t}))`;
    const TEM = 'EXISTS (SELECT 1 FROM usuario_grupos ug WHERE ug.usuario_id = u.id)';
    const PROX = `(SELECT MIN(ug.expira_em) FROM usuario_grupos ug WHERE ug.usuario_id = u.id AND ug.expira_em > ${t})`;
    const SIT = { ativos: `u.ativo = 1 AND (${VALE} OR (NOT ${TEM} AND u.origem = 'manual'))`, vencidos: `u.ativo = 1 AND ${TEM} AND NOT ${VALE}`, livre: `NOT ${TEM}`, bloqueados: 'u.ativo = 0' };
    const PRZ = { 30: `u.ativo = 1 AND ${PROX} <= ${t + 30 * 864e5}`, sem: `u.ativo = 1 AND ${VALE} AND ${PROX} IS NULL` };
    const onde = ['u.admin = 0'], args = [];
    if (busca) { onde.push('(u.nome LIKE ? OR u.email LIKE ? OR u.whatsapp LIKE ? OR u.email_compra LIKE ?)'); args.push(...Array(4).fill(`%${busca}%`)); }
    if (filtro) onde.push(SIT[filtro]);
    if (prazoF) onde.push(PRZ[prazoF]);
    if (origem) { onde.push('u.origem = ?'); args.push(origem); }
    if (acessoF === 'nunca') onde.push('(u.ultimo_acesso IS NULL OR u.ultimo_acesso = 0)');
    else if (acessoF) { onde.push('u.ultimo_acesso >= ?'); args.push(acessoF === 'hoje' ? Date.parse(`${diaISO(t)}T00:00:00-03:00`) : t - Number(acessoF) * 864e5); }
    if (de) { onde.push('u.criado_em >= ?'); args.push(Date.parse(`${de}T00:00:00-03:00`)); }
    if (ate) { onde.push('u.criado_em <= ?'); args.push(Date.parse(`${ate}T23:59:59.999-03:00`)); }
    const ORDEM_SQL = { novos: 'u.criado_em DESC, u.id DESC', antigos: 'u.criado_em ASC, u.id ASC', vence: `${PROX} IS NULL, ${PROX} ASC, u.id`, acesso: '(u.ultimo_acesso IS NULL OR u.ultimo_acesso = 0), u.ultimo_acesso DESC, u.id DESC' };
    const W = onde.join(' AND ');
    const total = um(`SELECT COUNT(*) AS n FROM usuarios u WHERE ${W}`, ...args).n;
    const pags = Math.max(1, Math.ceil(total / POR_PAG)), pag = Math.min(Math.max(1, Number(req.query.pag) || 1), pags);
    const membros = q(`SELECT u.* FROM usuarios u WHERE ${W} ORDER BY ${ORDEM_SQL[ordem]} LIMIT ? OFFSET ?`, ...args, POR_PAG, (pag - 1) * POR_PAG);
    const conta = w => um(`SELECT COUNT(*) AS n FROM usuarios u WHERE u.admin = 0${w ? ` AND ${w}` : ''}`).n;
    const inicioMes = Date.parse(`${diaISO(t).slice(0, 8)}01T00:00:00-03:00`);
    const contagem = { todos: conta(''), ativos: conta(SIT.ativos), vencidos: conta(SIT.vencidos), livre: conta(SIT.livre), bloqueados: conta(SIT.bloqueados),
      mes: conta(`u.criado_em >= ${inicioMes}`), 30: conta(PRZ[30]), sem: conta(PRZ.sem) };
    const porOrigem = Object.fromEntries(q('SELECT origem, COUNT(*) AS n FROM usuarios WHERE admin = 0 GROUP BY origem').map(x => [x.origem, x.n]));
    const grupos = acesso.grupos(), projetos = contas.projetosDoAdmin();
    const atuais = { q: busca, f: filtro, p: prazoF, o: origem, ua: acessoF, de, ate, ord: ordem === ordemPadrao ? '' : ordem };
    const link = (troca = {}) => { const p = Object.entries({ ...atuais, ...troca }).filter(([, v]) => v !== '' && v !== undefined && v !== null); return `/admin/membros${p.length ? `?${new URLSearchParams(p)}` : ''}`; };
    const ocultos = (fora = []) => Object.entries(atuais).filter(([k, v]) => v && !fora.includes(k)).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join('');
    const situacaoDe = (u, gs) => {
      const valendo = gs.filter(g => !g.expira_em || g.expira_em > t);
      if (!u.ativo) return ['s-erro', 'Bloqueado'];
      if (valendo.length) return ['s-ok', 'Com acesso'];
      if (gs.length) return ['s-erro', 'Vencido'];
      return u.origem === 'manual' ? ['s-neutro', 'Vê tudo'] : ['s-aviso', 'Sem grupo'];
    };
    const janela = u => {
      const gs = new Map(acesso.gruposDe(u.id, true).map(g => [g.id, g]));
      const meus = new Set(contas.acessosDe(u.id));
      return `<dialog class="janela janela-larga" id="membro-${u.id}">
        <div class="card-cab"><div class="com-quadro"><span class="avatar">${esc(iniciais(u.nome))}</span><h3>${esc(u.nome)}</h3> <span class="chip-dado">${ORIGEM[u.origem] || 'Manual'}</span></div>${fechar()}</div>
        <form method="post" action="/admin/membros/${u.id}" class="form-compacto" id="f-membro-${u.id}">
          <div class="linha-2"><div class="campo"><label>Nome</label><input name="nome" required maxlength="80" value="${esc(u.nome)}"></div>
            <div class="campo"><label>WhatsApp</label><input name="whatsapp" maxlength="30" value="${esc(u.whatsapp || '')}" placeholder="(11) 91234-5678"></div></div>
          <div class="linha-2"><div class="campo"><label>E-mail de acesso</label><input name="email" type="email" required value="${esc(u.email)}"></div>
            <div class="campo"><label>E-mail da compra ${dica('Renovação e reembolso desse e-mail caem nesta conta.')}</label><input name="email_compra" type="email" value="${esc(u.email_compra || '')}" placeholder="Se comprou com outro e-mail"></div></div>
          ${campoGrupos(grupos, gs)}
          <div class="linha-2"><div class="campo"><label>Perfis a mais (à mão) ${dica('Vale o maior entre este número e o limite dos grupos.')}</label><input name="limite" type="number" min="0" max="100" value="${Number(u.limite_projetos || 0)}"><div class="ajuda">Hoje: ${n(contas.proprios(u.id).length)} de ${n(acesso.limiteDe(u))} perfis.</div></div>
            <div class="campo"><label>Perfis do administrador que ele vê</label>${projetos.length ? `<div class="plats">${projetos.map(p => `<label class="plat"><input type="checkbox" name="projetos" value="${p.id}" ${meus.has(p.id) ? 'checked' : ''}><span>${esc(p.nome)}</span></label>`).join('')}</div>` : '<span class="sutil">Nenhum</span>'}</div></div>
          <label class="marcar"><input type="checkbox" name="ativo" value="1" ${u.ativo ? 'checked' : ''}> Acesso liberado</label>
          <p class="sutil" style="margin:0">Entrou em ${data(u.criado_em)}${u.adicionado_por ? ` (cadastrado por ${esc(u.adicionado_por)})` : ''} · último acesso: ${u.ultimo_acesso ? esc(quandoFoi(u.ultimo_acesso, t)) : 'ainda não entrou'}</p>
        </form>
        <div class="rodape-janela"><button form="f-membro-${u.id}">Salvar</button>
          <form method="post" action="/admin/membros/${u.id}/senha"><button class="leve">Gerar senha nova</button></form>
          <button type="button" class="perigo empurra" data-abrir="excluir-${u.id}">Excluir</button></div></dialog>
        ${confirmar(`excluir-${u.id}`, `Excluir ${esc(u.nome)}?`, 'A conta é apagada de vez (não dá para desfazer). Os perfis que essa pessoa criou ficam desligados. Para só tirar o acesso, desmarque "Acesso liberado".', `/admin/membros/${u.id}/excluir`, 'Excluir de vez')}`;
    };
    const linhas = membros.map(u => {
      const gs = acesso.gruposDe(u.id, true), sit = situacaoDe(u, gs);
      const prox = Math.min(...gs.filter(g => g.expira_em && g.expira_em > t).map(g => g.expira_em));
      const dias = Number.isFinite(prox) ? Math.ceil((prox - t) / 864e5) : null;
      const ateTxt = !u.ativo || sit[1] === 'Vencido' ? '<span class="m-nada">—</span>' : dias === null ? '<span class="m-nada">Sem prazo</span>'
        : `<span class="m-vence ${dias <= 30 ? 'perto' : ''}" title="O primeiro grupo que vence">${dias <= 30 ? `em ${dias} ${dias === 1 ? 'dia' : 'dias'} · ` : ''}${data(prox)}</span>`;
      const ultimo = u.ultimo_acesso ? quandoFoi(u.ultimo_acesso, t) : 'ainda não entrou';
      return `<div class="m-linha ${u.ativo ? '' : 'inativo'}" data-linha-abre>
        <div class="m-quem"><span class="avatar-ini">${esc(iniciais(u.nome))}</span><div><b>${esc(u.nome)}</b><small>${esc(u.email)}${u.whatsapp ? ` · ${esc(u.whatsapp)}` : ''}</small></div></div>
        <div class="m-origem"><span class="selo-plat ${esc(u.origem || 'manual')}">${ORIGEM[u.origem] || 'Manual'}</span></div>
        <div class="m-data">${data(u.criado_em)}</div>
        <div class="m-ultimo">${u.ultimo_acesso ? esc(ultimo) : '<span class="m-nada">Ainda não entrou</span>'}</div>
        <div class="m-situacao"><span class="selo ${sit[0]}">${sit[1]}</span></div>
        <div class="m-ate">${ateTxt}</div>
        <div class="m-acoes"><button type="button" class="botao-ico" data-historico="/admin/membros/${u.id}/historico?n=200" data-nome="${esc(u.nome)}" data-ultimo="${esc(ultimo)}" title="Histórico de acessos" aria-label="Histórico de ${esc(u.nome)}">${icone('relogio', 16)}</button><button type="button" class="botao-ico" data-abrir="membro-${u.id}" title="Editar" aria-label="Editar ${esc(u.nome)}">${icone('editar', 16)}</button></div></div>`;
    }).join('');
    // Paginação: 1, 2 … vizinhas … penúltima, última, e "Ir para"
    const url = k => link({ pag: k > 1 ? k : '' });
    const paginacao = (() => {
      if (pags < 2) return '';
      const nums = [...new Set([1, 2, pag - 1, pag, pag + 1, pags - 1, pags])].filter(k => k >= 1 && k <= pags).sort((a, b) => a - b);
      const itens = [];
      nums.forEach((k, i) => { if (i && k - nums[i - 1] > 1) itens.push('<span class="reticencias">…</span>'); itens.push(k === pag ? `<span class="on" aria-current="page">${k}</span>` : `<a href="${url(k)}">${k}</a>`); });
      const seta = (k, nome, ic) => (k >= 1 && k <= pags ? `<a class="seta" href="${url(k)}" aria-label="${nome}">${icone(ic, 16)}</a>` : `<span class="seta off" aria-hidden="true">${icone(ic, 16)}</span>`);
      return `<nav class="paginacao" aria-label="Páginas">${seta(pag - 1, 'Página anterior', 'esquerda')}${itens.join('')}${seta(pag + 1, 'Próxima página', 'direita')}
        <form class="ir-pag" action="/admin/membros">${ocultos()}<label>Ir para <input type="number" name="pag" min="1" max="${pags}" inputmode="numeric" placeholder="${pag}" aria-label="Número da página"></label></form></nav>`;
    })();
    // Funil no cabeçalho de cada coluna que filtra; aceso quando está filtrando
    const funil = (on, titulo, miolo) => `<details class="m-funil${on ? ' on' : ''}" data-funil><summary title="${titulo}" aria-label="${titulo}">${icone('filtro', 14)}</summary><div class="funil-pop">${miolo}</div></details>`;
    const opcao = (on, href, texto) => `<a class="${on ? 'on' : ''}" href="${href}">${texto}${on ? icone('ok', 14) : ''}</a>`;
    const temData = de || ate;
    const diaBonito = d => data(Date.parse(`${d}T12:00:00-03:00`));
    const fOrigem = funil(!!origem, 'Filtrar por origem', `<b>Origem</b>${opcao(!origem, link({ o: '', pag: '' }), 'Todas')}
      ${[['manual', 'Manual'], ['kiwify', 'Kiwify'], ['hotmart', 'Hotmart']].map(([v, nm]) => opcao(origem === v, link({ o: v, pag: '' }), `${nm} <small>${n(porOrigem[v])}</small>`)).join('')}`);
    const fEntrou = funil(!!temData || ordem === 'antigos', 'Ordem e data de entrada', `<b>Ordem</b>${opcao(ordem === 'novos', link({ ord: 'novos', pag: '' }), 'Mais novos primeiro')}${opcao(ordem === 'antigos', link({ ord: 'antigos', pag: '' }), 'Mais antigos primeiro')}
      <form class="funil-datas" action="/admin/membros">${ocultos(['de', 'ate'])}<b>Entrou entre</b><label>de <input type="date" name="de" value="${de}"></label><label>até <input type="date" name="ate" value="${ate}"></label>
        <div class="funil-acoes">${temData ? `<a class="botao leve botao-mini" href="${link({ de: '', ate: '', pag: '' })}">Limpar</a>` : ''}<button class="botao-mini" type="submit">Aplicar</button></div></form>`);
    const fAcesso = funil(!!acessoF || ordem === 'acesso', 'Ordem e último acesso', `<b>Ordem</b>${opcao(ordem === 'acesso', link({ ord: 'acesso', pag: '' }), 'Mais recentes primeiro')}${opcao(ordem !== 'acesso', link({ ord: '', pag: '' }), 'Padrão (mais novos)')}
      <b>Mostrar</b>${ACESSOS_F.map(([v, nm]) => opcao(acessoF === v, link({ ua: v, pag: '' }), nm)).join('')}`);
    const fSit = funil(!!filtro, 'Filtrar por situação', `<b>Situação</b>${SITUACOES.map(([f, nm]) => opcao(filtro === f, link({ f, pag: '' }), `${nm} <small>${n(f ? contagem[f] : contagem.todos)}</small>`)).join('')}`);
    const fAte = funil(!!prazoF || ordem === 'vence', 'Ordem e prazo do acesso', `<b>Ordem</b>${opcao(ordem === 'vence', link({ ord: 'vence', pag: '' }), 'Vence primeiro')}${opcao(ordem === 'novos', link({ ord: 'novos', pag: '' }), 'Mais novos primeiro')}
      <b>Mostrar</b>${PRAZOS_F.map(([v, nm]) => opcao(prazoF === v, link({ p: v, ord: '', pag: '' }), `${nm}${v ? ` <small>${n(contagem[v])}</small>` : ''}`)).join('')}`);
    const quando = temData ? `<small class="cab-filtrando">${de ? diaBonito(de) : 'início'} – ${ate ? diaBonito(ate) : 'hoje'}</small>` : '';
    tela(req, res, 'Membros', `
      <header><div><h1>Membros</h1></div>
        <div class="acoes-pag"><button type="button" data-abrir="novo-membro">${icone('mais2', 16)}Novo membro</button></div></header>
      <div class="m-filtros"><p class="m-resumo"><span><b>${n(contagem.todos)}</b> membros</span><span><b>${n(contagem.ativos)}</b> com acesso</span><span><b>${n(contagem.mes)}</b> novos este mês</span><span class="${contagem[30] ? 'atencao' : ''}"><b>${n(contagem[30])}</b> vencem em 30 dias</span><span><b>${n(contagem.bloqueados)}</b> ${contagem.bloqueados === 1 ? 'bloqueado' : 'bloqueados'}</span></p>
        <form class="filtro-direita" action="/admin/membros">${ocultos(['q'])}<span class="busca-campo">${icone('lupa', 16)}<input type="search" name="q" value="${esc(busca)}" placeholder="Nome, e-mail ou WhatsApp" aria-label="Buscar membro"></span></form></div>
      ${total !== contagem.todos || pags > 1 ? `<p class="m-total">${total !== contagem.todos ? `${n(total)} ${total === 1 ? 'encontrado' : 'encontrados'}` : ''}${total !== contagem.todos && pags > 1 ? ' · ' : ''}${pags > 1 ? `página ${pag} de ${pags}` : ''}</p>` : ''}
      <div class="m-tabela"><div class="m-cab"><span>Membro</span><span class="cab-f">Origem${fOrigem}</span><span class="cab-f">Entrou em${fEntrou}${quando}</span><span class="cab-f">Último acesso${fAcesso}</span><span class="cab-f">Situação${fSit}</span><span class="cab-f">Acesso até${fAte}</span><span></span></div>${linhas || '<p class="vazio">Nenhum membro com esses filtros.</p>'}</div>
      ${paginacao}
      <dialog class="janela janela-hist" id="j-historico"><div class="card-cab"><h3 data-hist-titulo>Histórico</h3>${fechar()}</div>
        <p class="hist-ultimo" data-hist-ultimo></p><div data-hist-lista></div></dialog>
      ${membros.map(janela).join('')}${SCRIPT_MEMBROS}
      <dialog class="janela janela-larga" id="novo-membro">
        <div class="card-cab"><h3>Novo membro</h3>${fechar()}</div>
        <form method="post" action="/admin/membros/novo" class="form-compacto" id="f-novo-membro">
          <div class="linha-2"><div class="campo"><label>Nome</label><input name="nome" required maxlength="80"></div>
            <div class="campo"><label>E-mail</label><input name="email" type="email" required></div></div>
          <div class="linha-2"><div class="campo"><label>WhatsApp</label><input name="whatsapp" maxlength="30"></div>
            <div class="campo"><label>Perfis a mais (à mão)</label><input name="limite" type="number" min="0" max="100" value="1"></div></div>
          ${campoGrupos(grupos, new Map())}
          <div class="linha-2"><label class="marcar"><input type="checkbox" name="ativo" value="1" checked> Acesso liberado</label>
            <label class="marcar"><input type="checkbox" name="enviar" value="1" ${correio.pronto() ? 'checked' : 'disabled'}> Mandar o login por e-mail${correio.pronto() ? '' : ' <small>(configure o e-mail em Configurações)</small>'}</label></div>
        </form>
        <div class="rodape-janela"><button form="f-novo-membro">Cadastrar</button><span class="nota" style="margin:0">A senha inicial aparece uma vez no topo da tela.</span></div></dialog>
      ${CSS}`, { caminho: '/admin/membros', mensagem: avisoUnico(req, res) || mensagemDe(req.query) });
  });
  // Grupos da pessoa com o prazo de cada um ("Acesso até") e "À mão" (a venda não tira nem muda esse grupo)
  function campoGrupos(grupos, tem) {
    if (!grupos.length) return '<div class="campo"><label>Grupos</label><p class="sutil">Crie os grupos em Grupos e ofertas.</p></div>';
    return `<div class="campo"><label>Grupos ${dica('O que a pessoa libera e quantos perfis pode ter. Data vazia = sem prazo. Mudou a data, o grupo passa a ser "à mão" (a venda não tira nem muda).')}</label><div class="mb-grupos">${grupos.map(g => {
      const x = tem.get(g.id);
      return `<div class="mb-grupo"><label class="marcar"><input type="checkbox" name="grupos" value="${g.id}" ${x ? 'checked' : ''}> <span>${esc(g.nome)}<small>${resumoGrupo(g)}</small></span></label>
        <input type="date" name="vence_${g.id}" value="${x && x.expira_em ? diaISO(x.expira_em) : ''}" aria-label="Acesso ao grupo ${esc(g.nome)} até" title="Acesso até (vazio = sem prazo)">
        <label class="mb-mao" title="A venda (Kiwify/Hotmart) não tira nem muda este grupo"><input type="checkbox" name="manual_${g.id}" value="1" ${x && x.origem === 'manual' ? 'checked' : ''}> À mão</label></div>`;
    }).join('')}</div></div>`;
  }
  const resumoGrupo = g => [`${g.limite_perfis} ${g.limite_perfis === 1 ? 'perfil' : 'perfis'}`, ...(g.itens || []).map(k => acesso.MODULOS[k])].join(' · ');
  function gravarGrupos(id, b) {
    const antes = new Map(acesso.gruposDe(id, true).map(g => [g.id, g]));
    acesso.definirGrupos(id, lista(b.grupos));
    const u = contas.usuario(id), daPlataforma = ['kiwify', 'hotmart'].includes(u && u.origem) ? u.origem : 'manual';
    for (const g of acesso.gruposDe(id, true)) {
      const d = txt(b[`vence_${g.id}`]), fim0 = /^\d{4}-\d{2}-\d{2}$/.test(d) ? Date.parse(`${d}T23:59:59.999-03:00`) : null, fim = Number.isFinite(fim0) ? fim0 : null;
      const velho = antes.get(g.id), mudou = !velho || (velho.expira_em ? diaISO(velho.expira_em) : '') !== (fim ? d : '');
      const manual = !!b[`manual_${g.id}`] || mudou;
      db.prepare('UPDATE usuario_grupos SET expira_em = ?, origem = ? WHERE usuario_id = ? AND grupo_id = ?')
        .run(fim, manual ? 'manual' : velho && velho.origem !== 'manual' ? velho.origem : daPlataforma, id, g.id);
    }
  }
  app.post('/admin/membros/novo', soAdmin, formulario, async (req, res) => {
    const b = req.body || {}, email = txt(b.email).toLowerCase(), nome = txt(b.nome);
    if (!nome || !emailValido(email)) return voltarAdmin(res, '/admin/membros', 'erro', 'Escreva o nome e um e-mail válido.');
    if (contas.porEmail(email)) return voltarAdmin(res, '/admin/membros', 'erro', 'Já existe uma conta com esse e-mail.');
    const senha = contas.senhaInicial();
    const id = contas.criar({ nome, email, whatsapp: txt(b.whatsapp), senha, trocarSenha: true });
    db.prepare('UPDATE usuarios SET adicionado_por = ?, ativo = ? WHERE id = ?').run(txt(req.conta.usuario.nome).split(/\s+/)[0] || '', b.ativo ? 1 : 0, id);
    contas.definirLimite(id, b.limite);
    gravarGrupos(id, b);
    let enviado = '';
    if (b.enviar) { const r = await correio.enviarLogin({ para: email, nome, senha, tipo: 'Login (cadastro manual)' }); enviado = r.ok ? ' O login foi enviado por e-mail.' : ` O e-mail NÃO foi enviado (${r.erro}).`; }
    voltarComSegredo(req, res, '/admin/membros', `${nome} cadastrado. Senha inicial de ${email}: ${senha} (anote agora; ela não aparece de novo).${enviado}`);
  });
  app.post('/admin/membros/:id', soAdmin, formulario, (req, res) => {
    const u = contas.usuario(req.params.id);
    if (!u || u.admin) return res.redirect('/admin/membros');
    const b = req.body || {}, nome = txt(b.nome), email = txt(b.email).toLowerCase(), compra = txt(b.email_compra).toLowerCase();
    if (!nome) return voltarAdmin(res, '/admin/membros', 'erro', 'Escreva o nome.');
    if (!emailValido(email)) return voltarAdmin(res, '/admin/membros', 'erro', 'E-mail inválido.');
    if (compra && !emailValido(compra)) return voltarAdmin(res, '/admin/membros', 'erro', 'O e-mail da compra está inválido.');
    const outro = contas.porEmail(email);
    if (outro && outro.id !== u.id) return voltarAdmin(res, '/admin/membros', 'erro', `Esse e-mail já é de ${outro.nome}.`);
    // primeiro o e-mail da compra do formulário; depois a troca do e-mail (quem veio da venda guarda o antigo, se ficou vazio)
    db.prepare('UPDATE usuarios SET email_compra = ? WHERE id = ?').run(compra || null, u.id);
    contas.editarUsuario(u.id, { nome, email });
    db.prepare('UPDATE usuarios SET whatsapp = ? WHERE id = ?').run(txt(b.whatsapp).slice(0, 30), u.id);
    contas.definirLimite(u.id, b.limite);
    contas.ativar(u.id, !!b.ativo);
    gravarGrupos(u.id, b);
    contas.compartilhar(u.id, b.projetos);
    limparAparelhos(u.id);
    voltarAdmin(res, '/admin/membros', 'ok', `${nome} salvo.`);
  });
  app.post('/admin/membros/:id/senha', soAdmin, (req, res) => {
    const u = contas.usuario(req.params.id);
    if (!u || u.admin) return res.redirect('/admin/membros');
    const senha = contas.senhaInicial();
    contas.trocarSenha(u.id, senha, true);
    voltarComSegredo(req, res, '/admin/membros', `Senha nova de ${u.email}: ${senha} (anote agora; ela troca no próximo acesso).`);
  });
  app.post('/admin/membros/:id/excluir', soAdmin, (req, res) => {
    const u = contas.usuario(req.params.id);
    if (!u || u.admin) return res.redirect('/admin/membros');
    db.prepare('UPDATE projetos SET ativo = 0 WHERE dono_id = ?').run(u.id);
    db.prepare('DELETE FROM acessos WHERE usuario_id = ?').run(u.id);
    db.prepare('DELETE FROM usuario_grupos WHERE usuario_id = ?').run(u.id);
    db.prepare('DELETE FROM eventos WHERE usuario_id = ?').run(u.id);
    db.prepare('DELETE FROM acessos_dia WHERE usuario_id = ?').run(u.id);
    limparAparelhos(u.id);
    contas.excluirUsuario(u.id);
    voltarAdmin(res, '/admin/membros', 'ok', `${u.nome} excluído.`);
  });
  // Histórico do membro: os dias em que entrou e o que fez
  app.get('/admin/membros/:id/historico', soAdmin, (req, res) => {
    const u = contas.usuario(req.params.id);
    if (!u || u.admin) return res.redirect('/admin/membros');
    const t = agora();
    if (req.query.n) {
      const { TIPOS: T } = require('../atividade');
      return res.json(q('SELECT tipo, nome, detalhe, criado_em FROM eventos WHERE usuario_id = ? ORDER BY criado_em DESC LIMIT ?', u.id, Math.min(300, Math.max(1, Number(req.query.n) || 20)))
        .map(e => ({ q: quandoFoi(e.criado_em, t), v: T[e.tipo] || e.tipo, i: e.nome || '', c: e.detalhe || '' })));
    }
    const eventos = q('SELECT tipo, nome, detalhe, criado_em FROM eventos WHERE usuario_id = ? ORDER BY criado_em DESC LIMIT 200', u.id);
    const dias30 = um('SELECT COUNT(*) AS n FROM acessos_dia WHERE usuario_id = ? AND dia >= ?', u.id, diaSP(t - 29 * 864e5)).n;
    const { TIPOS } = require('../atividade');
    const perfis = contas.proprios(u.id);
    tela(req, res, `Histórico de ${u.nome}`, `
      <header><div><a class="voltar" href="/admin/membros">${icone('esquerda', 16)}Membros</a><h1>${esc(u.nome)}</h1><p class="sub">${esc(u.email)} · entrou em ${data(u.criado_em)} · ${ORIGEM[u.origem] || 'Manual'}</p></div></header>
      <div class="an-kpis"><div class="an-kpi"><span>Último acesso</span><b style="font-size:18px">${u.ultimo_acesso ? esc(quandoFoi(u.ultimo_acesso, t)) : 'Ainda não entrou'}</b></div>
        <div class="an-kpi"><span>Dias que entrou (30 dias)</span><b>${n(dias30)}</b></div>
        <div class="an-kpi"><span>Perfis</span><b>${n(perfis.length)} <small>de ${n(acesso.limiteDe(u))}</small></b><small>${esc(perfis.map(p => p.ig_usuario ? `@${p.ig_usuario}` : p.nome).join(', ') || 'nenhum ainda')}</small></div>
        <div class="an-kpi"><span>Grupos</span><b style="font-size:16px">${esc(acesso.gruposDe(u.id).map(g => g.nome).join(', ') || '—')}</b></div></div>
      <section class="bloco"><div class="bloco-cab"><h3>O que fez</h3></div><div class="bloco-corpo">
        ${eventos.length ? `<ul class="mb-hist">${eventos.map(e => `<li><small>${esc(dataHora(e.criado_em))}</small><span>${esc(TIPOS[e.tipo] || e.tipo)}${e.nome ? `: <b>${esc(e.nome)}</b>` : ''}${e.detalhe ? ` <small>${esc(e.detalhe)}</small>` : ''}</span></li>`).join('')}</ul>`
          : '<p class="vazio">Nada registrado ainda.</p>'}</div></section>${CSS}`, { caminho: '/admin/membros' });
  });

  // ───────────── Analytics ─────────────
  app.get('/admin/analytics', soAdmin, (req, res) => {
    const dias = [7, 30, 90].includes(Number(req.query.p)) ? Number(req.query.p) : 30, t = agora(), desde = t - dias * 864e5;
    const DE_MEMBRO = 'JOIN usuarios u ON u.id = e.usuario_id AND u.admin = 0';
    const contaTipo = tipo => um(`SELECT COUNT(*) AS n FROM eventos e ${DE_MEMBRO} WHERE e.tipo = ? AND e.criado_em >= ?`, tipo, desde).n;
    const top = (tipo, lim = 5) => q(`SELECT MAX(e.nome) AS nome, COUNT(*) AS n, COUNT(DISTINCT e.usuario_id) AS pessoas FROM eventos e ${DE_MEMBRO}
      WHERE e.tipo = ? AND e.criado_em >= ? GROUP BY e.chave ORDER BY n DESC, pessoas DESC LIMIT ?`, tipo, desde, lim);
    const membros = um('SELECT COUNT(*) AS n FROM usuarios WHERE admin = 0 AND ativo = 1').n;
    const online = um('SELECT COUNT(*) AS n FROM usuarios WHERE admin = 0 AND ultimo_acesso >= ?', t - 5 * 60 * 1000).n;
    const hoje = um('SELECT COUNT(*) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.admin = 0 WHERE a.dia = ?', diaSP(t)).n;
    const novos7 = um('SELECT COUNT(*) AS n FROM usuarios WHERE admin = 0 AND criado_em >= ?', t - 7 * 864e5).n;
    const ativos = um('SELECT COUNT(DISTINCT a.usuario_id) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.admin = 0 WHERE a.dia >= ?', diaSP(desde + 864e5)).n;
    const perfisLigados = um("SELECT COUNT(*) AS n FROM projetos p JOIN usuarios u ON u.id = p.dono_id WHERE u.admin = 0 AND p.ativo = 1 AND p.ig_id IS NOT NULL AND p.ig_id <> ''").n;
    const diasP = Array.from({ length: dias }, (_, i) => t - (dias - 1 - i) * 864e5);
    const rot = x => new Date(x).toLocaleDateString('pt-BR', { timeZone: FUSO, day: '2-digit', month: '2-digit' });
    const dica = x => new Date(x).toLocaleDateString('pt-BR', { timeZone: FUSO, weekday: 'short', day: 'numeric', month: 'short' });
    const porDiaAcesso = Object.fromEntries(q('SELECT a.dia, COUNT(*) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.admin = 0 WHERE a.dia >= ? GROUP BY a.dia', diaSP(diasP[0])).map(r => [r.dia, r.n]));
    const porDiaCadastro = {};
    for (const u of q('SELECT criado_em FROM usuarios WHERE admin = 0 AND criado_em >= ?', desde - 864e5)) { const d = diaSP(u.criado_em); porDiaCadastro[d] = (porDiaCadastro[d] || 0) + 1; }
    const serie = mapa => diasP.map(x => ({ rot: rot(x), dica: dica(x), n: mapa[diaSP(x)] || 0 }));
    const cadastros = um('SELECT COUNT(*) AS n FROM usuarios WHERE admin = 0 AND criado_em >= ?', desde).n;
    const novos = q('SELECT nome, email, origem, criado_em FROM usuarios WHERE admin = 0 ORDER BY criado_em DESC LIMIT 6');
    const kpi = (titulo, num, apoio, sobe = false) => `<div class="an-kpi"><span>${titulo}</span><b>${num}</b><small class="${sobe ? 'sobe' : ''}">${apoio}</small></div>`;
    const caixa = (titulo, extra, miolo) => `<section class="an-painel"><div class="an-painel-cab"><h3>${titulo}</h3>${extra || ''}</div>${miolo}</section>`;
    const ranking = (titulo, l, vazio) => caixa(`${titulo} (${dias} dias)`, '', l.length ? `<ol class="an-top">${l.map((x, i) => `<li><span><b>${i + 1}. ${esc(x.nome || '—')}</b><small>${n(x.pessoas)} ${x.pessoas === 1 ? 'pessoa' : 'pessoas'}</small></span><span class="an-top-n">${n(x.n)}</span></li>`).join('')}</ol>` : `<p class="an-vazio">${vazio}</p>`);
    tela(req, res, 'Analytics', `
      <header><div><h1>Analytics</h1><p class="sub">Como os membros usam o FluxoPost nos últimos ${dias} dias</p></div>
        <div class="acoes-pag"><nav class="chips">${[[7, '7 dias'], [30, '30 dias'], [90, '90 dias']].map(([d, t2]) => `<a class="${dias === d ? 'on' : ''}" href="/admin/analytics?p=${d}">${t2}</a>`).join('')}</nav></div></header>
      <div class="an-kpis">
        ${kpi('Membros com acesso', n(membros), `+${n(novos7)} nos últimos 7 dias`, novos7 > 0)}
        ${kpi('Online agora', n(online), `${n(hoje)} ${hoje === 1 ? 'entrou' : 'entraram'} hoje`)}
        ${kpi(`Posts salvos (${dias} dias)`, n(contaTipo('agendou')), `${n(perfisLigados)} perfis do Instagram ligados`)}
        ${kpi(`Campanhas e espionagens (${dias} dias)`, n(contaTipo('campanha') + contaTipo('espionou')), `${n(contaTipo('respondeu'))} comentários respondidos`)}
      </div>
      <div class="an-duas">
        ${caixa('Membros que entraram por dia', `<small>${n(ativos)} de ${n(membros)} no período</small>`, grafico(serie(porDiaAcesso), { tipo: 'barras', unidade: 'membros', titulo: 'Membros que entraram por dia' }))}
        ${caixa('Cadastros por dia', `<small>${n(cadastros)} no período</small>`, grafico(serie(porDiaCadastro), { tipo: 'linha', unidade: 'cadastros', titulo: 'Cadastros por dia' }))}
      </div>
      <div class="an-duas">
        ${caixa('Novos membros', '<a href="/admin/membros">Ver todos</a>', novos.length ? `<ol class="an-top">${novos.map(u => `<li><span class="mb-quem"><span class="avatar">${esc(iniciais(u.nome))}</span><span><b>${esc(u.nome)}</b><small>${esc(u.email)} · ${data(u.criado_em)}</small></span></span><span class="chip-dado">${ORIGEM[u.origem] || 'Manual'}</span></li>`).join('')}</ol>` : '<p class="an-vazio">Nenhum membro ainda.</p>')}
        ${ranking('Telas mais abertas', top('tela', 6), 'Quando os membros usarem o app, as telas mais abertas aparecem aqui.')}
      </div>
      <div class="an-quatro">
        ${ranking('Quem mais agenda', q(`SELECT MAX(u.nome) AS nome, COUNT(*) AS n, 1 AS pessoas FROM eventos e ${DE_MEMBRO} WHERE e.tipo = 'agendou' AND e.criado_em >= ? GROUP BY e.usuario_id ORDER BY n DESC LIMIT 5`, desde), 'Ninguém salvou post ainda.')}
        ${ranking('Perfis mais espionados', top('espionou'), 'Quando os membros usarem o Espionar, aparece aqui.')}
        ${ranking('Campanhas salvas', top('campanha'), 'Quando os membros criarem automações, aparece aqui.')}
        ${ranking('Quem mais responde comentários', q(`SELECT MAX(u.nome) AS nome, COUNT(*) AS n, 1 AS pessoas FROM eventos e ${DE_MEMBRO} WHERE e.tipo = 'respondeu' AND e.criado_em >= ? GROUP BY e.usuario_id ORDER BY n DESC LIMIT 5`, desde), 'Nenhuma resposta ainda.')}
      </div>
      <p class="sutil">Só conta o que os membros fazem (o administrador não entra). A mesma coisa feita pela mesma pessoa em menos de 10 minutos conta uma vez. A contagem começou em 07/11/2026.</p>
      ${CSS}${SCRIPT_GRAFICOS}`, { caminho: '/admin/analytics' });
  });

  // ───────────── Grupos e ofertas ─────────────
  const DICA_PRAZO = 'Auto: a assinatura vale até a próxima cobrança + 3 dias; compra única não vence. Reembolso e chargeback tiram o grupo.';
  const opcoesGrupo = (sel, grupos) => grupos.map(g => `<option value="${g.id}" ${Number(sel) === g.id ? 'selected' : ''}>${esc(g.nome)}</option>`).join('');
  const opcoesPrazo = sel => Object.entries(PRAZOS).map(([k, p]) => `<option value="${k}" ${sel === k ? 'selected' : ''}>${p.nome}</option>`).join('');
  const linhaOferta = (o, grupos) => `<div class="of-linha"><div class="campo"><label>Oferta (nome)</label><input name="of_oferta" value="${esc(o.oferta || '')}" placeholder="Ex.: Plano anual"></div>
    <div class="campo"><label>Código do checkout</label><input name="of_codigo" value="${esc(o.link || '')}" placeholder="Ex.: Ab12Cd ou o link"></div>
    <div class="campo"><label>Libera o grupo</label><select name="of_grupo">${opcoesGrupo(o.grupo_id, grupos)}</select></div>
    <div class="campo"><label>Prazo ${dica(DICA_PRAZO)}</label><select name="of_prazo">${opcoesPrazo(o.prazo || 'plataforma')}</select></div>
    <button type="button" class="leve botao-mini" data-tirar-oferta aria-label="Tirar oferta">${icone('fechar', 14)}</button></div>`;
  const janelaProduto = (id, p, grupos, contasP) => {
    const ofs = p ? p.ofertas : [], doId = p && !p.por_oferta ? ofs[0] || {} : {};
    return `<dialog class="janela janela-larga" id="${id}"><div class="card-cab"><h3>${p ? 'Editar produto' : 'Novo produto da venda'}</h3>${fechar()}</div>
      <form method="post" action="/admin/produtos${p ? `/${p.id}` : ''}" class="form-compacto" id="f-${id}" data-produto>
        <div class="linha-2"><div class="campo"><label>Nome (para você)</label><input name="nome" required maxlength="80" value="${esc(p ? p.nome : '')}" placeholder="Ex.: FluxoPost Pro"></div>
          <div class="campo"><label>Conta da plataforma</label>${contasP.length ? `<select name="conta_id">${contasP.map(c => `<option value="${c.id}" ${p && p.conta_id === c.id ? 'selected' : ''}>${esc(c.nome)} (${PLATAFORMAS[c.plataforma]})</option>`).join('')}</select>`
            : `<select name="plataforma">${Object.entries(PLATAFORMAS).map(([k, v]) => `<option value="${k}" ${p && p.plataforma === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`}</div></div>
        <div class="campo"><label>ID do produto na plataforma</label><input name="produto_id" required value="${esc(p ? p.produto_id : '')}" placeholder="Kiwify: o código do produto · Hotmart: o número do produto"></div>
        <div class="campo"><label>Como libera</label><div class="plats">
          <label class="plat"><input type="radio" name="por_oferta" value="0" ${!p || !p.por_oferta ? 'checked' : ''} data-modo-produto><span>Qualquer oferta → um grupo</span></label>
          <label class="plat"><input type="radio" name="por_oferta" value="1" ${p && p.por_oferta ? 'checked' : ''} data-modo-produto><span>Cada oferta → o seu grupo</span></label></div></div>
        <div class="linha-2" data-so-id ${p && p.por_oferta ? 'hidden' : ''}><div class="campo"><label>Libera o grupo</label><select name="grupo_id">${opcoesGrupo(doId.grupo_id, grupos)}</select></div>
          <div class="campo"><label>Prazo ${dica(DICA_PRAZO)}</label><select name="prazo">${opcoesPrazo(doId.prazo || 'plataforma')}</select></div></div>
        <div data-so-oferta ${p && p.por_oferta ? '' : 'hidden'}><div class="of-linhas" data-ofertas>${(p && p.por_oferta ? ofs : [{}]).map(o => linhaOferta(o, grupos)).join('')}</div>
          <button type="button" class="leve botao-mini" data-mais-oferta style="margin-top:8px">${icone('mais2', 14)}Adicionar oferta</button>
          <template data-modelo-oferta>${linhaOferta({}, grupos)}</template></div>
      </form>
      <div class="rodape-janela"><button form="f-${id}">Salvar</button>${p ? `<button type="button" class="perigo empurra" data-abrir="excluir-${id}">Excluir</button>` : ''}</div></dialog>
      ${p ? confirmar(`excluir-${id}`, `Excluir ${esc(p.nome)}?`, 'As próximas vendas desse produto deixam de liberar o grupo (caem no grupo padrão, se houver). Quem já está no grupo continua.', `/admin/produtos/${p.id}/excluir`, 'Excluir') : ''}`;
  };
  const janelaGrupo = (id, g) => `<dialog class="janela" id="${id}"><div class="card-cab"><h3>${g ? 'Editar grupo' : 'Novo grupo'}</h3>${fechar()}</div>
    <form method="post" action="/admin/grupos${g ? `/${g.id}` : ''}" class="form janela-secao">
      <div class="campo"><label>Nome do grupo</label><input name="nome" required maxlength="60" value="${esc(g ? g.nome : '')}" placeholder="Ex.: Pro"></div>
      <div class="campo"><label>Perfis do Instagram que cada membro pode ter</label><input name="limite" type="number" min="0" max="100" value="${g ? g.limite_perfis : 1}"></div>
      <div class="campo"><label>Libera também ${dica('Publicar, Página do Facebook, Análise e Comentários são de todo membro com acesso.')}</label><div class="plats">${Object.entries(acesso.MODULOS).map(([k, v]) => `<label class="plat"><input type="checkbox" name="itens" value="${k}" ${g && g.itens.includes(k) ? 'checked' : ''}><span>${v}</span></label>`).join('')}</div></div>
      <label class="marcar"><input type="checkbox" name="padrao" value="1" ${g && g.padrao ? 'checked' : ''}> Grupo padrão ${dica('A venda de um produto ainda não cadastrado cai aqui.')}</label>
      <div class="botoes-linha"><button>Salvar</button>${g ? `<button type="button" class="perigo empurra" data-abrir="excluir-${id}">Excluir</button>` : ''}</div></form></dialog>
    ${g ? confirmar(`excluir-${id}`, `Excluir o grupo ${esc(g.nome)}?`, 'Os membros saem deste grupo (os outros grupos deles continuam). Grupo com ofertas não pode ser excluído.', `/admin/grupos/${g.id}/excluir`, 'Excluir') : ''}`;
  const seloVenda = r => (/^ignorado|^sem oferta|NÃO enviado|recusado/.test(r) ? 's-aviso' : /bloqueada|saiu do grupo/.test(r) ? 's-erro' : 's-ok');

  app.get('/admin/grupos', soAdmin, (req, res) => {
    const grupos = acesso.grupos(), produtos = acesso.produtos(), contasP = plataformas.contas();
    const semCad = acesso.semCadastro(), avisos = acesso.avisos(30);
    const chaveVenda = x => `<input type="hidden" name="plataforma" value="${esc(x.plataforma)}"><input type="hidden" name="produto" value="${esc(x.produto)}"><input type="hidden" name="oferta" value="${esc(x.oferta || '')}">`;
    // Igual ao Criativos do Reino (09/11/2026): seções com título + "?" e o "+ Novo" à direita; grupos em linhas só com o
    // nome e os números; produtos separados por conta da plataforma (dobra com o selo Kiwify/Hotmart); vendas em dobras
    const linhaG = g => `<div class="adm-linha"><div class="adm-info" title="${esc(resumoGrupo(g).replace(/<[^>]+>/g, ''))}"><b>${esc(g.nome)}</b>${g.padrao ? '<span class="selo s-neutro">Padrão</span>' : ''}</div>
      <span class="num-lado"><b>${n(g.limite_perfis)}</b><small>perfis</small></span><span class="num-lado"><b>${n(g.membros)}</b><small>membros</small></span><span class="num-lado"><b>${n(g.n_ofertas)}</b><small>ofertas</small></span>
      <div class="adm-acoes"><button type="button" class="botao-ico" data-abrir="grupo-${g.id}" title="Editar grupo" aria-label="Editar ${esc(g.nome)}">${icone('editar', 16)}</button></div></div>`;
    const linhaP = p => {
      const gs = [...new Set(p.ofertas.map(o => o.grupo || '—'))];
      const detalhe = p.ofertas.map(o => `${p.por_oferta ? `${o.oferta || o.link} → ` : 'Qualquer oferta → '}${o.grupo || '—'} · ${(PRAZOS[o.prazo] || PRAZOS.plataforma).nome}`).join(' · ');
      return `<div class="adm-linha"><span class="selo-plat ${esc(p.plataforma)}">${PLATAFORMAS[p.plataforma] || esc(p.plataforma)}</span><div class="adm-info" title="ID ${esc(p.produto_id)}"><b>${esc(p.nome)}</b></div>
        <span class="seta-grupo" title="${esc(detalhe)}">${icone('direita', 15)}<b>${esc(gs.join(', '))}</b></span>
        <div class="adm-acoes"><button type="button" class="botao-ico" data-abrir="produto-${p.id}" title="Editar produto" aria-label="Editar ${esc(p.nome)}">${icone('editar', 16)}</button></div></div>`;
    };
    const blocoP = (id, nome, plat, ps) => dobra({ id: `produtos-${id}`, titulo: esc(nome), extra: `${plat ? `<span class="selo-plat ${plat}">${PLATAFORMAS[plat]}</span>` : ''}<small>${ps.length} ${ps.length === 1 ? 'produto' : 'produtos'}</small>`,
      corpo: `<div class="adm-lista">${ps.map(linhaP).join('') || '<p class="adm-vazio">Nenhum produto desta conta ainda.</p>'}</div>` });
    const semConta = produtos.filter(p => !contasP.some(c => c.id === p.conta_id));
    const linhasP = contasP.map(c => blocoP(c.id, c.nome, c.plataforma, produtos.filter(p => p.conta_id === c.id))).join('') + (semConta.length ? blocoP(0, 'Sem conta', '', semConta) : '');
    const registro = a => `<div class="registro"><small>${esc(dataHora(a.recebido_em))} · ${PLATAFORMAS[a.plataforma] || esc(a.plataforma)}</small><b>${esc(NOME_EVENTO[a.evento] || a.evento || '—')}</b><span>${esc(a.email || '')}</span>
      <em><span class="selo ${seloVenda(a.resultado)}">${/^ignorado/.test(a.resultado) ? 'Ignorado' : /^sem oferta/.test(a.resultado) ? 'Sem cadastro' : 'Aplicado'}</span> ${esc(a.resultado)}${a.reprocessado_em
        ? `<br>↻ Processada de novo em ${esc(dataHora(a.reprocessado_em))}: ${esc(a.reprocessado_resultado)}` : /^sem oferta/.test(a.resultado) ? `<form method="post" action="/admin/vendas/${a.id}/reprocessar"><button class="leve botao-mini">Processar de novo</button></form>` : ''}</em>
      ${a.produto || a.oferta ? `<small class="reg-dados">${esc(a.produto || '')}${a.oferta ? ` · oferta ${esc(a.oferta)}` : ''} · <a href="/admin/vendas/${a.id}" target="_blank" rel="noopener">ver o aviso</a></small>` : ''}</div>`;
    const linhaSem = x => `<div class="adm-linha"><span class="selo-plat ${esc(x.plataforma)}">${PLATAFORMAS[x.plataforma] || esc(x.plataforma)}</span><div class="adm-info"><b>${esc(x.produto)}</b><small>${x.oferta ? `oferta ${esc(x.oferta)} · ` : ''}última em ${esc(dataHora(x.em))}</small></div>
      <div class="adm-acoes"><button type="button" class="leve botao-mini" data-abrir="novo-produto">Cadastrar</button><form method="post" action="/admin/vendas/dispensar">${chaveVenda(x)}<button class="leve botao-mini" title="Tira da lista (as vendas continuam no registro)">Dispensar</button></form></div></div>`;
    tela(req, res, 'Grupos e ofertas', `
      <header><div><h1>Grupos e ofertas</h1></div></header>
      ${secao('Grupos', 'A oferta vendida (Kiwify/Hotmart) libera um grupo; o grupo diz quantos perfis a pessoa pode ter e o que mais ela usa (Automação e Espionar). Quem está em mais de um grupo fica com o maior limite.',
        `<div class="adm-lista">${grupos.map(linhaG).join('') || '<p class="adm-vazio">Nenhum grupo. Toque em "+ Novo grupo".</p>'}</div>`,
        `<button type="button" class="leve botao-mini" data-abrir="novo-grupo">${icone('mais2', 14)}Novo grupo</button>`)}
      ${secao('Produtos', 'O que cada venda libera: cadastre o produto da Kiwify ou da Hotmart e escolha o grupo. Sem produto cadastrado, a venda cai no grupo padrão.',
        `<div class="dobras">${produtos.length || contasP.length ? linhasP : '<p class="adm-vazio">Nenhum produto. Toque em "+ Novo produto" e cole o ID do produto da Kiwify ou da Hotmart.</p>'}</div>`,
        `<button type="button" class="leve botao-mini" data-abrir="novo-produto">${icone('mais2', 14)}Novo produto</button>`)}
      ${secao('Vendas recebidas', 'O que o app fez com cada venda que chegou.', `<div class="dobras">
        ${dobra({ id: 'vendas-recebidas', titulo: 'Últimas vendas', extra: `<small>${n(avisos.length)}</small>`, corpo: avisos.length ? `<div class="registros">${avisos.map(registro).join('')}</div>`
          : '<p class="adm-vazio">Nenhuma venda chegou ainda. O endereço para colar na Kiwify e na Hotmart está em Configurações.</p>' })}
        ${dobra({ id: 'vendas-sem-cadastro', titulo: 'Vendas sem cadastro', extra: `<small>${n(semCad.length)} ${semCad.length === 1 ? 'produto' : 'produtos'}</small>${dica('Chegou venda de um produto ou oferta que ainda não está cadastrado. Toque em Cadastrar (use o ID que aparece aqui) ou Dispensar para tirar da lista.')}`,
          corpo: `<div class="adm-lista">${semCad.map(linhaSem).join('') || '<p class="adm-vazio">Nenhuma venda sem cadastro.</p>'}</div>` })}</div>`)}
      ${janelaGrupo('novo-grupo', null)}${grupos.map(g => janelaGrupo(`grupo-${g.id}`, g)).join('')}
      ${janelaProduto('novo-produto', null, grupos, contasP)}${produtos.map(p => janelaProduto(`produto-${p.id}`, p, grupos, contasP)).join('')}
      <script>(function(){if(window.__prod)return;window.__prod=1;
        document.addEventListener('change',function(e){if(!e.target.matches('[data-modo-produto]'))return;var f=e.target.closest('form'),of=e.target.value==='1';
          f.querySelector('[data-so-id]').hidden=of;f.querySelector('[data-so-oferta]').hidden=!of});
        document.addEventListener('click',function(e){var m=e.target.closest('[data-mais-oferta]');if(m){var f=m.closest('form');f.querySelector('[data-ofertas]').insertAdjacentHTML('beforeend',f.querySelector('[data-modelo-oferta]').innerHTML);return}
          var t=e.target.closest('[data-tirar-oferta]');if(t){var l=t.closest('[data-ofertas]');if(l.children.length>1)t.closest('.of-linha').remove();else t.closest('.of-linha').querySelectorAll('input').forEach(function(i){i.value=''})}});
        document.addEventListener('submit',function(e){var f=e.target;if(!f.matches('[data-produto]'))return;var of=f.querySelector('[data-modo-produto]:checked').value==='1';
          f.querySelectorAll(of?'[data-so-id] select':'[data-so-oferta] input,[data-so-oferta] select').forEach(function(i){i.disabled=true})},true);
      })()</script>${CSS}`, { caminho: '/admin/grupos', mensagem: mensagemDe(req.query) });
  });
  const salvarGrupo = (req, res, id) => {
    const b = req.body || {};
    try { acesso.salvarGrupo(id, b.nome, lista(b.itens), !!b.padrao, null, b.limite); voltarAdmin(res, '/admin/grupos', 'ok', 'Grupo salvo.'); }
    catch (e) { voltarAdmin(res, '/admin/grupos', 'erro', e.message); }
  };
  app.post('/admin/grupos', soAdmin, formulario, (req, res) => salvarGrupo(req, res, null));
  app.post('/admin/grupos/:id(\\d+)', soAdmin, formulario, (req, res) => salvarGrupo(req, res, Number(req.params.id)));
  app.post('/admin/grupos/:id(\\d+)/excluir', soAdmin, (req, res) => {
    try { acesso.excluirGrupo(req.params.id); voltarAdmin(res, '/admin/grupos', 'ok', 'Grupo excluído.'); } catch (e) { voltarAdmin(res, '/admin/grupos', 'erro', e.message); }
  });
  const salvarProduto = (req, res, id) => {
    try { acesso.salvarProduto(id, req.body || {}); voltarAdmin(res, '/admin/grupos', 'ok', 'Produto salvo.'); } catch (e) { voltarAdmin(res, '/admin/grupos', 'erro', e.message); }
  };
  app.post('/admin/produtos', soAdmin, formulario, (req, res) => salvarProduto(req, res, null));
  app.post('/admin/produtos/:id(\\d+)', soAdmin, formulario, (req, res) => salvarProduto(req, res, Number(req.params.id)));
  app.post('/admin/produtos/:id(\\d+)/excluir', soAdmin, (req, res) => { acesso.excluirProduto(req.params.id); voltarAdmin(res, '/admin/grupos', 'ok', 'Produto excluído.'); });
  app.post('/admin/vendas/dispensar', soAdmin, formulario, (req, res) => {
    const b = req.body || {};
    acesso.dispensarVenda(txt(b.plataforma), String(b.produto || ''), String(b.oferta || ''));
    voltarAdmin(res, '/admin/grupos', 'ok', 'Tirado da lista (as vendas continuam no registro).');
  });
  app.get('/admin/vendas/:id(\\d+)', soAdmin, (req, res) => {
    const a = um('SELECT * FROM avisos_acesso WHERE id = ?', Number(req.params.id));
    if (!a) return res.status(404).type('text').send('Aviso não encontrado.');
    let corpo = a.corpo;
    try { corpo = JSON.stringify(JSON.parse(a.corpo), null, 2); } catch { /* texto como veio */ }
    res.type('text').send(`${PLATAFORMAS[a.plataforma] || a.plataforma} · ${NOME_EVENTO[a.evento] || a.evento} · ${dataHora(a.recebido_em)}\nResultado: ${a.resultado}\n\n${corpo || '(sem os dados)'}`);
  });
  app.post('/admin/vendas/:id(\\d+)/reprocessar', soAdmin, async (req, res) => {
    const a = um('SELECT * FROM avisos_acesso WHERE id = ?', Number(req.params.id));
    let corpo = null;
    try { corpo = a ? JSON.parse(a.corpo) : null; } catch { corpo = null; }
    if (!a || !corpo) return voltarAdmin(res, '/admin/grupos', 'erro', 'Esse aviso não tem os dados guardados.');
    const r = await acesso.receber(a.plataforma, corpo, contas, { conta: a.conta_id ? plataformas.conta(a.conta_id) : null });
    acesso.marcarReprocessado(a.id, r);
    voltarAdmin(res, '/admin/grupos', 'ok', `Processado de novo: ${r}`);
  });

  // ───────────── Configurações: Plataformas de venda, Senha dos membros e E-mail (seções de /admin/configuracoes) ─────────────
  // Igual ao Criativos do Reino (09/11/2026): seção com título + "?" e o "+ Adicionar" à direita; cada conta é uma dobra
  // fechada com selo da plataforma, lápis para renomear e a situação; dentro, endereço escondido + olhinho + Copiar + trocar
  // + excluir numa linha, "Como configurar" recolhido e o token guardado com olhinho e Salvar na mesma linha.
  function blocosConfig(req) {
    const base = baseUrl(req);
    const visto = x => (x ? `último aviso ${quandoFoi(x)}` : 'nenhum aviso ainda');
    const sitSelo = (ok, texto) => `<span class="selo ${ok ? 's-ok' : 's-neutro'}">${esc(texto)}</span>`;
    const COMO = {
      kiwify: `Na Kiwify: <b>Apps → Webhooks → Criar webhook</b>. Cole o endereço acima, escolha o produto (ou todos) e marque só: <b>Compra aprovada, Reembolso, Chargeback, Assinatura cancelada e Assinatura renovada</b>. Os outros eventos ficam desmarcados. Salve, copie o <b>token</b> que a Kiwify mostra e cole aqui embaixo.`,
      hotmart: `Na Hotmart: <b>Ferramentas → Webhook (versão 2.0)</b>. Cole o endereço acima e marque <b>Compra aprovada, Compra completa, Reembolso, Chargeback, Pedido de reembolso e Cancelamento de assinatura</b>. Copie o <b>hottok</b> e cole aqui embaixo.`,
    };
    const tokenForm = (c, rot, w, rotulo) => `<form method="post" action="/admin/plataformas/${c.id}/token" autocomplete="off" class="form"><div class="campo"><label>${rot}${w ? ` <small class="sutil">· ${visto(w.visto_em)}</small>` : ''}</label>
      ${campoSegredo(`name="token" value="${esc((w && w.token) || '')}" placeholder="${esc(rotulo)}" aria-label="${esc(rot)}"`, '<button class="botao-mini">Salvar</button>')}</div></form>`;
    const umaConta = c => {
      const ws = plataformas.webhooks(c.id), unico = ws.find(w => w.unico), porProduto = ws.filter(w => !w.unico), ativos = plataformas.ativos(c);
      const situacao = ativos.length ? (c.ultimo_aviso ? `Recebendo · ${visto(c.ultimo_aviso)}` : 'Pronto · nenhum aviso ainda') : 'Falta o token';
      const tokens = c.plataforma === 'hotmart' ? tokenForm(c, 'Hottok', unico, 'Cole o hottok da Hotmart')
        : `<form method="post" action="/admin/plataformas/${c.id}/modo" class="plat-modo"><label class="marcar"><input type="radio" name="modo" value="unico" ${c.modo !== 'varios' ? 'checked' : ''} onchange="this.form.submit()"> Um webhook para todos os produtos</label>
            <label class="marcar"><input type="radio" name="modo" value="varios" ${c.modo === 'varios' ? 'checked' : ''} onchange="this.form.submit()"> Um webhook por produto</label></form>
          ${c.modo !== 'varios' ? tokenForm(c, 'Token do webhook', unico, 'Cole o token que a Kiwify mostra')
            : `<div class="adm-lista">${porProduto.map(w => `<form method="post" action="/admin/plataformas/${c.id}/webhook/${w.id}" autocomplete="off" class="plat-linha"><div class="campo"><label>Produto</label><input name="nome" value="${esc(w.nome)}"></div>
                <div class="campo"><label>Token <small class="sutil">· ${visto(w.visto_em)}</small></label>${campoSegredo(`name="token" value="${esc(w.token || '')}" aria-label="Token"`)}</div><button class="leve botao-mini">Salvar</button><button class="leve botao-mini" name="acao" value="tirar">Tirar</button></form>`).join('')}
              <form method="post" action="/admin/plataformas/${c.id}/webhook/novo" class="plat-linha" autocomplete="off"><div class="campo"><label>Produto</label><input name="nome" placeholder="Nome do produto"></div>
                <div class="campo"><label>Token</label>${campoSegredo('name="token" placeholder="Token deste webhook" aria-label="Token"')}</div><button class="botao-mini">${icone('mais2', 14)}Adicionar</button></form></div>`}`;
      return dobra({ id: `cfg-conta-${c.id}`, titulo: esc(c.nome),
        extra: `<span class="selo-plat ${c.plataforma}">${PLATAFORMAS[c.plataforma]}</span><button type="button" class="plat-lapis" data-abrir="plat-nome-${c.id}" title="Renomear" aria-label="Renomear">${icone('editar', 14)}</button>`,
        situacao: sitSelo(ativos.length, situacao), aberto: !ativos.length, corpo: `
        <div class="campo"><label>Endereço do webhook</label>${campoSegredo(`id="wh-${c.id}" readonly value="${esc(`${base}/webhook/${c.plataforma}/${c.segredo}`)}" aria-label="Endereço do webhook"`,
          `<button type="button" class="leve botao-mini" data-copiar="wh-${c.id}">${icone('copiar', 14)}Copiar</button><button type="button" class="botao-ico" data-abrir="plat-segredo-${c.id}" title="Trocar endereço" aria-label="Trocar endereço">${icone('girar', 15)}</button><button type="button" class="botao-ico perigo-ic" data-abrir="plat-excluir-${c.id}" title="Excluir" aria-label="Excluir">${icone('lixo', 15)}</button>`)}</div>
        ${ajuda(`Como configurar na ${PLATAFORMAS[c.plataforma]}`, COMO[c.plataforma])}
        ${tokens}` });
    };
    const janelasConta = c => `<dialog class="janela" id="plat-nome-${c.id}"><div class="card-cab"><h3>Renomear</h3>${fechar()}</div>
        <form method="post" action="/admin/plataformas/${c.id}/nome" class="form janela-secao"><div class="campo"><label>Nome (para você)</label><input name="nome" value="${esc(c.nome)}" maxlength="60"></div><div class="rodape-janela"><button>Salvar</button><button type="button" class="leve" data-fechar>Cancelar</button></div></form></dialog>
      ${confirmar(`plat-segredo-${c.id}`, `Trocar o endereço de ${esc(c.nome)}?`, 'O endereço tem uma parte secreta que impede vendas falsas. Troque só se ela vazou: o antigo para na hora e você precisa colar o novo na plataforma.', `/admin/plataformas/${c.id}/segredo`, 'Trocar agora', '')}
      ${confirmar(`plat-excluir-${c.id}`, `Excluir ${esc(c.nome)}?`, 'As vendas dessa conta param de chegar no FluxoPost. Os membros e os produtos continuam.', `/admin/plataformas/${c.id}/excluir`, 'Excluir')}`;
    const contasP = plataformas.contas();
    const smtp = correio.dados(), emailOk = correio.pronto(), h = correio.resumoHistorico(30), envios = correio.historico(1000);
    const plataformasSec = secao('Plataformas de venda', 'Cada conta tem o seu endereço: cole no painel da plataforma. É por ele que as vendas chegam e liberam o acesso. Dá para ter mais de uma conta da mesma plataforma.',
      `<div class="dobras">${contasP.map(umaConta).join('') || '<p class="adm-vazio">Nenhuma plataforma ainda. Toque em "+ Adicionar plataforma".</p>'}</div>`,
      `<button type="button" class="leve botao-mini" data-abrir="nova-plataforma">${icone('mais2', 14)}Adicionar plataforma</button>`);
    const padrao = contas.senhaPadrao();
    const senhaSec = secao('Senha dos membros', 'A senha que todo membro novo recebe (venda, cadastro manual ou "Gerar senha nova"). Vazia = uma senha sorteada para cada um. Depois cada um pode trocar a sua em Minha conta.',
      `<div class="dobras">${dobra({ id: 'cfg-senha', titulo: 'Senha padrão', situacao: sitSelo(!!padrao, padrao ? 'Definida' : 'Sorteada para cada um'), corpo: `
        <form method="post" action="/admin/senha-padrao" class="form" autocomplete="off"><div class="campo"><label>Senha padrão</label>
          ${campoSegredo(`name="senha_padrao" minlength="6" value="${esc(padrao)}" placeholder="Pelo menos 6 caracteres (vazio = sorteada)" aria-label="Senha padrão"`, '<button class="botao-mini">Salvar</button>')}</div></form>` })}</div>`);
    const historico = dobra({ id: 'cfg-historico', titulo: 'Histórico de envios', situacao: sitSelo(envios.length && !h.erro, envios.length ? `${n(h.ok)} enviados · ${n(h.erro)} com erro (30 dias)` : 'Nenhum envio ainda'), corpo: envios.length
      ? `<ul class="eh-lista" data-paginar="20">${envios.map(e => `<li><small>${esc(dataHora(e.em))}</small><span><b>${esc(e.nome || e.para)}</b>${e.nome ? ` <small>${esc(e.para)}</small>` : ''} <small>· ${esc(e.tipo)}</small></span>
          <span>${e.ok ? '<span class="selo s-ok">Enviado</span>' : `<span class="selo s-erro" title="${esc(e.erro)}">Erro</span> <small>${esc(e.erro)}</small>`}</span>
          <form method="post" action="/admin/email/historico/${e.id}/apagar"><button class="leve botao-mini" title="Tirar do histórico">Apagar</button></form></li>`).join('')}</ul>` : '<p class="adm-vazio">Nenhum e-mail enviado ainda.</p>' });
    const emailSec = secao('E-mail', 'De onde sai o e-mail com o login de quem compra ou é cadastrado.', `<div class="dobras">${dobra({ id: 'email', titulo: 'E-mail do login', situacao: sitSelo(emailOk, emailOk ? `Enviando por ${smtp.usuario}` : 'Não configurado'), corpo: `
      ${ajuda('Como configurar', 'Escolha o provedor do e-mail do seu domínio (servidor e porta se preenchem sozinhos), digite o e-mail e a senha dele e toque em "Salvar e testar". O remetente e o endereço do app podem ficar como estão. A senha fica guardada cifrada.')}
      <form method="post" action="/admin/email" class="form" autocomplete="off">
        <div class="campo"><label>Provedor do e-mail</label><select data-provedor><option value="">Escolha…</option>${PROVEDORES.map(([nome, host, porta]) => `<option value="${host}|${porta}" ${smtp.host === host ? 'selected' : ''}>${nome}</option>`).join('')}<option value="|">Outro (preencho à mão)</option></select></div>
        <div class="linha-2"><div class="campo"><label>Servidor</label><input name="host" value="${esc(smtp.host)}" placeholder="smtp.seuprovedor.com"></div><div class="campo"><label>Porta</label><input name="porta" value="${esc(smtp.porta)}" inputmode="numeric"></div></div>
        <div class="linha-2"><div class="campo"><label>E-mail (usuário)</label><input name="usuario" value="${esc(smtp.usuario)}" placeholder="contato@seudominio.com.br"></div>
          <div class="campo"><label>Senha</label><input name="senha" class="segredo" autocomplete="off" data-lpignore="true" data-1p-ignore placeholder="${smtp.senha ? 'Guardada (digite outra para trocar)' : ''}"></div></div>
        <div class="linha-2"><div class="campo"><label>Remetente</label><input name="remetente" value="${esc(smtp.remetente)}" placeholder="FluxoPost &lt;contato@seudominio.com.br&gt;"></div>
          <div class="campo"><label>Endereço do app</label><input name="appUrl" value="${esc(smtp.appUrl)}" placeholder="https://app.seusite.com.br"></div></div>
        <div class="botoes-linha"><button class="botao-mini">Salvar</button><button class="leve botao-mini" name="acao" value="testar">Salvar e testar no meu e-mail</button></div></form>` })}${historico}</div>`);
    const extra = `${contasP.map(janelasConta).join('')}
      <dialog class="janela" id="nova-plataforma"><div class="card-cab"><h3>Adicionar plataforma</h3>${fechar()}</div>
        <form method="post" action="/admin/plataformas" class="form janela-secao">
          <div class="campo"><label>Plataforma</label><select name="plataforma">${Object.entries(PLATAFORMAS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></div>
          <div class="campo"><label>Nome (para você)</label><input name="nome" maxlength="60" placeholder="Ex.: Kiwify - Nome da sua conta"></div>
          <div class="rodape-janela"><button>Adicionar</button><button type="button" class="leve" data-fechar>Cancelar</button></div></form></dialog>
      <script>(function(){if(window.__prov)return;window.__prov=1;document.addEventListener('change',function(e){if(!e.target.matches('[data-provedor]'))return;var v=e.target.value.split('|'),f=e.target.closest('form');if(v[0]){f.host.value=v[0];f.porta.value=v[1]}else{f.host.focus()}})})()</script>
      ${CSS}`;
    return { plataformas: plataformasSec, senha: senhaSec, email: emailSec, extra };
  }
  const volta = (res, tipo, texto, ancora = 'vendas') => res.redirect(`/admin/configuracoes?${new URLSearchParams({ [tipo]: texto })}#${ancora}`);
  app.post('/admin/plataformas', soAdmin, formulario, (req, res) => {
    try { plataformas.criar(txt((req.body || {}).plataforma), (req.body || {}).nome); volta(res, 'ok', 'Plataforma adicionada. Copie o endereço e cole no painel dela.'); } catch (e) { volta(res, 'erro', e.message); }
  });
  const daConta = (req, res, fn) => { const c = plataformas.conta(req.params.id); if (!c) return res.redirect('/admin/configuracoes#vendas'); fn(c, req.body || {}); };
  app.post('/admin/plataformas/:id(\\d+)/token', soAdmin, formulario, (req, res) => daConta(req, res, (c, b) => {
    if (!txt(b.token)) return volta(res, 'erro', 'Cole o token.');
    plataformas.gravarUnico(c.id, b.token); volta(res, 'ok', `Token de ${c.nome} salvo.`);
  }));
  app.post('/admin/plataformas/:id(\\d+)/modo', soAdmin, formulario, (req, res) => daConta(req, res, (c, b) => { plataformas.modo(c.id, b.modo); volta(res, 'ok', 'Modo trocado. Até o novo modo ter token, os do outro continuam valendo.'); }));
  app.post('/admin/plataformas/:id(\\d+)/webhook/novo', soAdmin, formulario, (req, res) => daConta(req, res, (c, b) => {
    if (!txt(b.token)) return volta(res, 'erro', 'Cole o token do webhook.');
    plataformas.gravarProduto(c.id, { nome: b.nome, token: b.token }); volta(res, 'ok', 'Webhook adicionado.');
  }));
  app.post('/admin/plataformas/:id(\\d+)/webhook/:w(\\d+)', soAdmin, formulario, (req, res) => daConta(req, res, (c, b) => {
    if (b.acao === 'tirar') { plataformas.tirarWebhook(c.id, req.params.w); return volta(res, 'ok', 'Webhook tirado.'); }
    plataformas.gravarProduto(c.id, { id: req.params.w, nome: b.nome, token: b.token }); volta(res, 'ok', 'Webhook salvo.');
  }));
  app.post('/admin/plataformas/:id(\\d+)/nome', soAdmin, formulario, (req, res) => daConta(req, res, (c, b) => { plataformas.renomear(c.id, b.nome); volta(res, 'ok', 'Nome salvo.'); }));
  app.post('/admin/plataformas/:id(\\d+)/segredo', soAdmin, (req, res) => daConta(req, res, c => { plataformas.trocarSegredo(c.id); volta(res, 'aviso', `Endereço de ${c.nome} trocado. Cole o novo no painel da plataforma.`); }));
  app.post('/admin/plataformas/:id(\\d+)/excluir', soAdmin, (req, res) => daConta(req, res, c => { plataformas.excluir(c.id); volta(res, 'ok', `${c.nome} excluída.`); }));
  app.post('/admin/senha-padrao', soAdmin, formulario, (req, res) => {
    const s = String((req.body || {}).senha_padrao || '').trim();
    if (s && s.length < 6) return volta(res, 'erro', 'A senha padrão precisa ter pelo menos 6 caracteres.', 'senha');
    contas.gravarSenhaPadrao(s);
    volta(res, 'ok', s ? 'Senha padrão salva.' : 'Senha padrão apagada: cada membro novo recebe uma senha sorteada.', 'senha');
  });
  app.post('/admin/email', soAdmin, formulario, async (req, res) => {
    const b = req.body || {};
    correio.salvar(b);
    if (b.acao !== 'testar') return volta(res, 'ok', 'E-mail salvo.', 'email');
    const eu = req.conta.usuario;
    const r = await correio.enviarLogin({ para: eu.email, nome: eu.nome, senha: contas.senhaPadrao() || '(a senha que a pessoa recebe)', tipo: 'Teste' });
    volta(res, r.ok ? 'ok' : 'erro', r.ok ? `Salvo. E-mail de boas-vindas enviado para ${eu.email}: confira a caixa de entrada.` : `Salvo, mas o e-mail não saiu: ${r.erro}`, 'email');
  });
  app.post('/admin/email/historico/:id(\\d+)/apagar', soAdmin, (req, res) => { correio.apagarDoHistorico(req.params.id); res.redirect('/admin/configuracoes#email'); });

  return { blocosConfig };
}

module.exports = { montarAdminMembros };
