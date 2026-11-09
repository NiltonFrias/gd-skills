// Administrativo, parte de acesso e comunicação: Ferramentas (cartões), Membros, Grupos e ofertas, Avisos e Configurações.
// Mesmo padrão das outras telas: lista + "+ Novo" que abre uma janela; editar abre a mesma janela preenchida.
const { esc, icone, dica, ajuda } = require('./layout');
const { cab, campo, entrada, janela, botoesMover, janelaVitrine, cartaoAdm, botaoEditar } = require('./admin-pecas');
const { PRAZOS, NOME_EVENTO } = require('../acesso');

const txt = v => String(v ?? '').trim();
const lista = v => (Array.isArray(v) ? v : v === undefined || v === '' ? [] : [v]);
const diaISO = t => new Date(t).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });   // AAAA-MM-DD
const data = t => (t ? new Date(t).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '');
// "agora", "há 12 min", "hoje às 14:32", "ontem às 09:10", "28/10 às 18:00" (horário de Brasília)
const FUSO = 'America/Sao_Paulo';
const { diaSP } = require('../atividade');
const { grafico, SCRIPT_GRAFICOS } = require('./graficos');
const { miniatura } = require('../catalogo-previa');
const diaBR = t => new Date(t).toLocaleDateString('pt-BR', { timeZone: FUSO });
const horaSP = t => new Date(t).toLocaleTimeString('pt-BR', { timeZone: FUSO, hour: '2-digit', minute: '2-digit' });
function quandoFoi(t) {
  if (!t) return '';
  const d = Date.now() - t;
  if (d < 60 * 1000) return 'agora';
  if (d < 60 * 60 * 1000) return `há ${Math.floor(d / 60000)} min`;
  if (diaBR(t) === diaBR(Date.now())) return `hoje às ${horaSP(t)}`;
  if (diaBR(t) === diaBR(Date.now() - 864e5)) return `ontem às ${horaSP(t)}`;
  return `${new Date(t).toLocaleDateString('pt-BR', { timeZone: FUSO, day: '2-digit', month: '2-digit' })} às ${horaSP(t)}`;
}
const dataHora = t => new Date(t).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const PLATAFORMAS = { kiwify: 'Kiwify', hotmart: 'Hotmart' };
// Provedores de e-mail de domínio mais usados no Brasil: servidor SMTP e porta (465 = SSL)
const PROVEDORES = [['Hostinger', 'smtp.hostinger.com', 465], ['HostGator / Titan', 'smtp.titan.email', 465], ['Locaweb', 'email-ssl.com.br', 465],
  ['KingHost', 'smtp.kinghost.net', 465], ['Google Workspace / Gmail', 'smtp.gmail.com', 465], ['Microsoft 365 / Outlook', 'smtp.office365.com', 587],
  ['Zoho Mail', 'smtp.zoho.com', 465], ['UOL Host', 'smtps.uhserver.com', 465]];
// Senha gerada aparece UMA vez, por um cookie de 1 minuto (nunca no endereço da página)
const lerAviso = req => { const m = /(?:^|;\s*)cdr_aviso=([^;]*)/.exec(req.get('cookie') || ''); return m ? decodeURIComponent(m[1]) : ''; };

function montar(r, { db, acesso, plataformas, contas, push, correio, atividade, mostrar, voltar, avisar, falhar, mudou, um, q, run, mover }) {
  // Aviso da mudança para os membros antigos (e-mail "casa nova", um por vez, com pausa) — 06/11/2026
  const aviso = require('../aviso-mudanca').criarAvisoMudanca({ db, correio, contas, cfg: acesso.cfg, gravar: acesso.gravar });
  // ───────────── Ferramentas (cartões de Ferramentas e de IA) ─────────────
  const SECOES = { ferramentas: 'Ferramentas', ia: 'Inteligência Artificial' };
  r.get('/ferramentas', (req, res) => {
    const itens = q('SELECT * FROM vitrine ORDER BY secao, ordem, id');
    const blocos = `<div class="adm-cartoes" data-ordenar="vitrine">${itens.filter(v => v.secao === 'ferramentas').map(v => cartaoAdm({ id: v.id, imagem: v.imagem, nome: v.nome, escondido: !v.ativo,
      info: v.vender && v.link_venda ? 'venda ligada' : 'no app', mover: `/admin/vitrine/${v.id}/mover`, ligar: `/admin/ligar/vitrine/${v.id}`, editar: botaoEditar('j-vitrine', `/admin/vitrine/${v.id}`, v) })).join('')}</div>`;
    mostrar(req, res, 'Ferramentas', `${cab('Ferramentas', '', '', 'O que cada ferramenta faz é do app; aqui você muda o nome, a imagem, a ordem e o link de venda. Os cartões de IA ficam em IA.')}${blocos}
      ${janelaVitrine()}`);
  });
  r.post('/vitrine/:id', (req, res) => {
    const v = um('SELECT * FROM vitrine WHERE id = ?', req.params.id); if (!v) return res.redirect('/admin/ferramentas');
    if (!txt(req.body.nome)) return falhar(res, '/admin/ferramentas', 'Escreva o nome.');
    run('UPDATE vitrine SET nome = ?, imagem = ?, ativo = ?, link_venda = ?, vender = ? WHERE id = ?', txt(req.body.nome), txt(req.body.imagem) || v.imagem, req.body.ativo ? 1 : 0, txt(req.body.link_venda), req.body.vender ? 1 : 0, v.id);
    mudou(); voltar(res, v.secao === 'ia' ? '/admin/ia' : '/admin/ferramentas', 'Cartão salvo.');
  });
  r.post('/vitrine/:id/mover', (req, res) => {
    const v = um('SELECT * FROM vitrine WHERE id = ?', req.params.id);
    if (v) { mover('vitrine', v.id, req.body.dir, 'secao = ?', v.secao); mudou(); }
    res.redirect(v && v.secao === 'ia' ? '/admin/ia' : '/admin/ferramentas');
  });

  // ───────────── Membros ─────────────
  const POR_PAG = 50;
  r.get('/membros', (req, res) => {
    // Filtros (todos pelo endereço, então dá para voltar e compartilhar): situação, origem, data de entrada, ordem e busca
    const SITUACOES = [['', 'Todas'], ['ativos', 'Ativos'], ['vencidos', 'Vencidos'], ['sem-grupo', 'Sem grupo'], ['bloqueados', 'Bloqueados']];
    const PRAZOS_F = [['', 'Todos'], ['30', 'Vencem em 30 dias'], ['sem', 'Sem prazo']];
    const ORDENS = [['novos', 'Mais novos primeiro'], ['antigos', 'Mais antigos primeiro'], ['vence', 'Vence primeiro'], ['acesso', 'Acesso mais recente primeiro']];
    // Último acesso (09/11/2026): ordenar pelos mais recentes e mostrar quem entrou hoje / em 7 / 30 dias ou nunca entrou
    const ACESSOS_F = [['', 'Todos'], ['hoje', 'Entraram hoje'], ['7', 'Nos últimos 7 dias'], ['30', 'Nos últimos 30 dias'], ['nunca', 'Nunca entraram']];
    const ehDia = d => /^\d{4}-\d{2}-\d{2}$/.test(d);
    const busca = txt(req.query.q), filtro = SITUACOES.some(([v]) => v && v === req.query.f) ? req.query.f : '';
    const origem = ['manual', 'kiwify', 'hotmart'].includes(req.query.o) ? req.query.o : '';   // por onde a pessoa entrou
    const de = ehDia(txt(req.query.de)) ? txt(req.query.de) : '', ate = ehDia(txt(req.query.ate)) ? txt(req.query.ate) : '';
    const prazoF = PRAZOS_F.some(([v]) => v && v === req.query.p) ? req.query.p : '';
    const acessoF = ACESSOS_F.some(([v]) => v && v === req.query.ua) ? req.query.ua : '';
    const ordemPadrao = prazoF === '30' ? 'vence' : 'novos';
    const ordem = ORDENS.some(([v]) => v === req.query.ord) ? req.query.ord : ordemPadrao;
    const t = Date.now();
    const VALE = `EXISTS (SELECT 1 FROM usuario_grupos ug WHERE ug.usuario_id = u.id AND (ug.expira_em IS NULL OR ug.expira_em > ${t}))`;
    const TEM = 'EXISTS (SELECT 1 FROM usuario_grupos ug WHERE ug.usuario_id = u.id)';
    const PROX = `(SELECT MIN(ug.expira_em) FROM usuario_grupos ug WHERE ug.usuario_id = u.id AND ug.expira_em > ${t})`;
    const SIT = { ativos: `u.ativo = 1 AND ${VALE}`, vencidos: `u.ativo = 1 AND ${TEM} AND NOT ${VALE}`, 'sem-grupo': `NOT ${TEM}`, bloqueados: 'u.ativo = 0' };
    const PRZ = { 30: `u.ativo = 1 AND ${PROX} <= ${t + 30 * 864e5}`, sem: `u.ativo = 1 AND ${VALE} AND ${PROX} IS NULL` };
    const onde = ["u.papel = 'membro'"], args = [];
    if (busca) { onde.push('(u.nome LIKE ? OR u.email LIKE ? OR u.whatsapp LIKE ? OR u.email_compra LIKE ?)'); args.push(`%${busca}%`, `%${busca}%`, `%${busca}%`, `%${busca}%`); }
    if (filtro) onde.push(SIT[filtro]);
    if (prazoF) onde.push(PRZ[prazoF]);
    if (origem) { onde.push('u.origem = ?'); args.push(origem); }
    if (acessoF === 'nunca') onde.push('(u.ultimo_acesso IS NULL OR u.ultimo_acesso = 0)');
    else if (acessoF) { onde.push('u.ultimo_acesso >= ?'); args.push(acessoF === 'hoje' ? Date.parse(`${new Date(t).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })}T00:00:00-03:00`) : t - Number(acessoF) * 864e5); }
    if (de) { onde.push('u.criado_em >= ?'); args.push(Date.parse(`${de}T00:00:00-03:00`)); }
    if (ate) { onde.push('u.criado_em <= ?'); args.push(Date.parse(`${ate}T23:59:59.999-03:00`)); }
    const ORDEM_SQL = { novos: 'u.criado_em DESC, u.id DESC', antigos: 'u.criado_em ASC, u.id ASC', vence: `${PROX} IS NULL, ${PROX} ASC, u.id`, acesso: '(u.ultimo_acesso IS NULL OR u.ultimo_acesso = 0), u.ultimo_acesso DESC, u.id DESC' };
    const total = um(`SELECT COUNT(*) AS n FROM usuarios u WHERE ${onde.join(' AND ')}`, ...args).n;
    const pags = Math.max(1, Math.ceil(total / POR_PAG)), pag = Math.min(Math.max(1, Number(req.query.pag) || 1), pags);
    const membros = q(`SELECT u.* FROM usuarios u WHERE ${onde.join(' AND ')} ORDER BY ${ORDEM_SQL[ordem]} LIMIT ? OFFSET ?`, ...args, POR_PAG, (pag - 1) * POR_PAG);
    const grupos = q('SELECT * FROM grupos ORDER BY nome');
    // Uma linha por membro, em colunas alinhadas (no celular vira cartão)
    const ORIGEM = { kiwify: 'Kiwify', hotmart: 'Hotmart', manual: 'Manual' };
    const iniciais = n => String(n || '?').trim().split(/\s+/).filter(Boolean).map(x => x[0]).slice(0, 2).join('').toUpperCase();
    const linhas = membros.map(u => {
      const gs = acesso.gruposDe(u.id, true);
      const dados = { nome: u.nome, email: u.email, email_compra: u.email_compra || '', whatsapp: u.whatsapp, ativo: u.ativo, grupos: gs.map(g => g.id),
        ...Object.fromEntries(gs.filter(g => g.expira_em).map(g => [`vence_${g.id}`, diaISO(g.expira_em)])),
        ...Object.fromEntries(gs.filter(g => g.origem === 'manual').map(g => [`manual_${g.id}`, 1])),
        entrou: data(u.criado_em), ultimo: quandoFoi(u.ultimo_acesso) || 'ainda não entrou', historico: `/admin/membros/${u.id}/historico`,
        origem: ORIGEM[u.origem] || 'Manual', origem_classe: u.origem || 'manual', adicionado: u.adicionado_por || '' };
      const valendo = gs.filter(g => !g.expira_em || g.expira_em > t);
      const situacao = !u.ativo ? ['s-erro', 'Bloqueado'] : valendo.length ? ['s-ok', 'Ativo'] : gs.length ? ['s-erro', 'Vencido'] : ['s-aviso', 'Sem grupo'];
      const prox = Math.min(...gs.filter(g => g.expira_em && g.expira_em > t).map(g => g.expira_em));
      const dias = Number.isFinite(prox) ? Math.ceil((prox - t) / 864e5) : null;
      const acessoAte = !u.ativo || !valendo.length ? '<span class="m-nada">—</span>' : dias === null ? '<span class="m-nada">Sem prazo</span>'
        : `<span class="m-vence ${dias <= 30 ? 'perto' : ''}" title="O primeiro grupo que vence">${dias <= 30 ? `em ${dias} ${dias === 1 ? 'dia' : 'dias'} · ` : ''}${data(prox)}</span>`;
      return `<div class="m-linha ${u.ativo ? '' : 'inativo'}" data-linha-abre>
        <div class="m-quem"><span class="avatar-ini">${esc(iniciais(u.nome))}</span><div><b>${esc(u.nome)}</b><small>${esc(u.email)}${u.whatsapp ? ` · ${esc(u.whatsapp)}` : ''}</small></div></div>
        <div class="m-origem"><span class="plat ${u.origem}">${ORIGEM[u.origem] || 'Manual'}</span></div>
        <div class="m-data">${data(u.criado_em)}</div>
        <div class="m-ultimo">${u.ultimo_acesso ? esc(quandoFoi(u.ultimo_acesso)) : '<span class="m-nada">Ainda não entrou</span>'}</div>
        <div class="m-situacao"><span class="selo ${situacao[0]}">${situacao[1]}</span></div>
        <div class="m-ate">${acessoAte}</div>
        <div class="m-acoes"><button type="button" class="icone-btn" data-historico="/admin/membros/${u.id}/historico?n=200" data-nome="${esc(u.nome)}" data-ultimo="${esc(quandoFoi(u.ultimo_acesso) || 'ainda não entrou')}" title="Histórico de acessos" aria-label="Histórico de ${esc(u.nome)}">${icone('relogio', 16)}</button><button type="button" class="icone-btn" data-abrir="j-membro" data-acao="/admin/membros/${u.id}" data-excluir="/admin/membros/${u.id}/excluir" data-dados='${esc(JSON.stringify(dados))}' title="Editar" aria-label="Editar ${esc(u.nome)}">${icone('editar', 16)}</button></div></div>`;
    }).join('');
    // Endereço com os filtros atuais, trocando só o que mudou
    const atuais = { q: busca, f: filtro, p: prazoF, o: origem, ua: acessoF, de, ate, ord: ordem === ordemPadrao ? '' : ordem };
    const link = (troca = {}) => { const p = Object.entries({ ...atuais, ...troca }).filter(([, v]) => v !== '' && v !== undefined && v !== null); return `/admin/membros${p.length ? `?${new URLSearchParams(p)}` : ''}`; };
    const url = n => link({ pag: n > 1 ? n : '' });
    const porOrigem = Object.fromEntries(q("SELECT origem, COUNT(*) AS n FROM usuarios WHERE papel = 'membro' GROUP BY origem").map(x => [x.origem, x.n]));
    const aviso = lerAviso(req);
    if (aviso) res.clearCookie('cdr_aviso', { path: '/admin' });
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    const conta = w => um(`SELECT COUNT(*) AS n FROM usuarios u WHERE u.papel = 'membro'${w ? ` AND ${w}` : ''}`).n;
    const contagem = { todos: conta(''), ativos: conta(SIT.ativos), vencidos: conta(SIT.vencidos), 'sem-grupo': conta(SIT['sem-grupo']), bloqueados: conta(SIT.bloqueados),
      mes: conta(`u.criado_em >= ${inicioMes}`), mes30: conta(PRZ[30]), 30: conta(PRZ[30]), sem: conta(PRZ.sem) };
    // Paginação: 1, 2 … vizinhas … penúltima, última, e "Ir para" para digitar a página
    const paginacaoM = () => {
      if (pags < 2) return '';
      const nums = [...new Set([1, 2, pag - 1, pag, pag + 1, pags - 1, pags])].filter(n => n >= 1 && n <= pags).sort((a, b) => a - b);
      const itens = [];
      nums.forEach((n, i) => { if (i && n - nums[i - 1] > 1) itens.push('<span class="reticencias">…</span>'); itens.push(n === pag ? `<span class="on" aria-current="page">${n}</span>` : `<a href="${url(n)}">${n}</a>`); });
      const seta = (n, nome, ic) => n >= 1 && n <= pags ? `<a class="seta" href="${url(n)}" aria-label="${nome}">${icone(ic, 16)}</a>` : `<span class="seta off" aria-hidden="true">${icone(ic, 16)}</span>`;
      const ocultos = Object.entries(atuais).filter(([, v]) => v).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join('');
      return `<nav class="paginacao" aria-label="Páginas">${seta(pag - 1, 'Página anterior', 'esquerda')}${itens.join('')}${seta(pag + 1, 'Próxima página', 'direita')}
        <form class="ir-pag" action="/admin/membros">${ocultos}<label>Ir para <input type="number" name="pag" min="1" max="${pags}" inputmode="numeric" placeholder="${pag}" aria-label="Número da página"></label></form></nav>`;
    };
    const temData = de || ate;
    const diaBonito = d => data(Date.parse(`${d}T12:00:00-03:00`));
    mostrar(req, res, 'Membros', `${cab('Membros', `<a class="botao leve" href="/admin/importar">Importar da Kiwify</a><button type="button" class="botao ouro" data-abrir="j-membro" data-acao="/admin/membros/novo" data-dados='{"ativo":1,"enviar":1,"grupos":[]}'>${icone('mais', 17)}Novo membro</button>`)}
      ${aviso ? `<div class="msg aviso senha-unica">${icone('cadeado', 16)}<span>${esc(aviso)}</span></div>` : ''}
      <div class="filtros">
        ${(() => { // Números só para informar (não filtram), numa linha compacta ao lado da busca
          const n = v => v.toLocaleString('pt-BR');
          return `<p class="m-resumo"><span><b>${n(contagem.todos)}</b> membros</span><span><b>${n(contagem.ativos)}</b> com acesso</span><span><b>${n(contagem.mes)}</b> novos este mês</span><span class="${contagem.mes30 ? 'atencao' : ''}"><b>${n(contagem.mes30)}</b> vencem em 30 dias</span><span><b>${n(contagem.bloqueados)}</b> ${contagem.bloqueados === 1 ? 'bloqueado' : 'bloqueados'}</span></p>`; })()}
        <form class="filtro-direita" action="/admin/membros">${Object.entries({ f: filtro, p: prazoF, o: origem, de, ate, ord: atuais.ord }).filter(([, v]) => v).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join('')}
          <span class="busca-campo">${icone('lupa', 16)}<input type="search" name="q" value="${esc(busca)}" placeholder="Nome, e-mail ou WhatsApp" aria-label="Buscar membro"></span></form></div>
      ${total !== contagem.todos || pags > 1 ? `<p class="m-total">${total !== contagem.todos ? `${total.toLocaleString('pt-BR')} ${total === 1 ? 'encontrado' : 'encontrados'}` : ''}${total !== contagem.todos && pags > 1 ? ' · ' : ''}${pags > 1 ? `página ${pag} de ${pags}` : ''}</p>` : ''}
      ${(() => {
        // Filtros no cabeçalho da tabela: um funil em Origem, Entrou em e Situação; aceso quando está filtrando
        const funil = (on, titulo, miolo) => `<details class="funil${on ? ' on' : ''}" data-funil><summary title="${titulo}" aria-label="${titulo}">${icone('funil', 14)}</summary><div class="funil-pop">${miolo}</div></details>`;
        const opcao = (on, href, texto) => `<a class="${on ? 'on' : ''}" href="${href}">${texto}${on ? icone('ok', 14) : ''}</a>`;
        const fOrigem = funil(!!origem, 'Filtrar por origem', `<b>Origem</b>${opcao(!origem, link({ o: '', pag: '' }), 'Todas')}
          ${[['manual', 'Manual'], ['kiwify', 'Kiwify'], ['hotmart', 'Hotmart']].map(([v, n]) => opcao(origem === v, link({ o: v, pag: '' }), `${n} <small>${(porOrigem[v] || 0).toLocaleString('pt-BR')}</small>`)).join('')}`);
        const ocultos = Object.entries({ q: busca, f: filtro, p: prazoF, o: origem, ua: acessoF, ord: atuais.ord }).filter(([, v]) => v).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join('');
        const fEntrou = funil(!!temData || ordem === 'antigos', 'Ordem e data de entrada', `<b>Ordem</b>${opcao(ordem === 'novos', link({ ord: 'novos', pag: '' }), 'Mais novos primeiro')}${opcao(ordem === 'antigos', link({ ord: 'antigos', pag: '' }), 'Mais antigos primeiro')}
          <form class="funil-datas" action="/admin/membros">${ocultos}<b>Entrou entre</b><label>de <input type="date" name="de" value="${de}"></label><label>até <input type="date" name="ate" value="${ate}"></label>
            <div class="funil-acoes">${temData ? `<a class="botao leve pequeno" href="${link({ de: '', ate: '', pag: '' })}">Limpar</a>` : ''}<button class="botao pequeno" type="submit">Aplicar</button></div></form>`);
        const fSit = funil(!!filtro, 'Filtrar por situação', `<b>Situação</b>${SITUACOES.map(([f, n]) => opcao(filtro === f, link({ f, pag: '' }), `${n} <small>${(f ? contagem[f] : contagem.todos).toLocaleString('pt-BR')}</small>`)).join('')}`);
        const fAte = funil(!!prazoF || ordem === 'vence', 'Ordem e prazo do acesso', `<b>Ordem</b>${opcao(ordem === 'vence', link({ ord: 'vence', pag: '' }), 'Vence primeiro')}${opcao(ordem === 'novos', link({ ord: 'novos', pag: '' }), 'Mais novos primeiro')}
          <b>Mostrar</b>${PRAZOS_F.map(([v, n]) => opcao(prazoF === v, link({ p: v, ord: '', pag: '' }), `${n}${v ? ` <small>${contagem[v].toLocaleString('pt-BR')}</small>` : ''}`)).join('')}`);
        const fAcesso = funil(!!acessoF || ordem === 'acesso', 'Ordem e último acesso', `<b>Ordem</b>${opcao(ordem === 'acesso', link({ ord: 'acesso', pag: '' }), 'Mais recentes primeiro')}${opcao(ordem !== 'acesso', link({ ord: '', pag: '' }), 'Padrão (mais novos)')}
          <b>Mostrar</b>${ACESSOS_F.map(([v, n]) => opcao(acessoF === v, link({ ua: v, pag: '' }), n)).join('')}`);
        const quando = temData ? `<small class="cab-filtrando">${de ? diaBonito(de) : 'início'} – ${ate ? diaBonito(ate) : 'hoje'}</small>` : '';
        return `<div class="m-tabela"><div class="m-cab"><span>Membro</span><span class="cab-f">Origem${fOrigem}</span><span class="cab-f">Entrou em${fEntrou}${quando}</span><span class="cab-f">Último acesso${fAcesso}</span><span class="cab-f">Situação${fSit}</span><span class="cab-f">Acesso até${fAte}</span><span></span></div>${linhas || '<p class="vazio">Nenhum membro com esses filtros.</p>'}</div>`;
      })()}
      ${paginacaoM()}
      <dialog class="janela janela-hist" id="j-historico"><div class="janela-cab"><b data-hist-titulo>Histórico</b><button type="button" class="icone-btn" data-fechar aria-label="Fechar">${icone('fechar', 18)}</button></div>
        <div class="janela-corpo"><p class="hist-ultimo" data-hist-ultimo></p><div data-hist-lista></div></div></dialog>
      ${janela('j-membro', 'Membro', `<div class="linha-2">${campo('Nome', entrada('nome', 'required autocomplete="off"'))}${campo('WhatsApp', entrada('whatsapp', 'autocomplete="off" placeholder="Ex.: (11) 91234-5678"'))}</div>
        <div class="linha-email">${campo('E-mail', entrada('email', 'type="email" required autocomplete="off"'))}<div class="campo m-origem-info" data-so-edicao data-origem-info><span>Origem</span><div></div></div></div>
        <div data-so-edicao>${campo(`E-mail da compra${dica('Se comprou na Kiwify/Hotmart com outro e-mail: renovação, reembolso e compra nova com esse e-mail caem nesta conta.')}`, entrada('email_compra', 'type="email" autocomplete="off" placeholder="Outro e-mail usado na compra"'))}</div>
        ${escolherGrupos(grupos, acesso.pastas())}
        <div class="linha-2"><label class="marcar"><input type="checkbox" name="ativo" value="1"> Acesso liberado</label><label class="marcar" data-so-nova><input type="checkbox" name="enviar" value="1"> Mandar o login por e-mail</label></div>
        <div class="m-detalhe" data-so-edicao data-atividade></div>`,
        { larga: true, extraRodape: '<button class="botao leve" type="submit" name="acao" value="senha" formnovalidate data-so-edicao>Gerar senha nova</button>' })}`);
  });
  // Grupos do membro: por pasta (Combos, Packs, Cursos…), com "Marcar todos" e a caixinha da pasta que marca a pasta inteira
  function escolherGrupos(grupos, pastas) {
    if (!grupos.length) return '<div class="campo"><span>Grupos (o que a pessoa vê)</span><small>Crie os grupos em Grupos e ofertas.</small></div>';
    // Prazo enxuto: só o ícone do calendário; ao tocar abre a data, com quantos dias faltam e o último dia
    const marca = g => `<div class="grupo-item" data-vence><label class="marcar"><input type="checkbox" name="grupos[]" value="${g.id}"> ${esc(g.nome)}</label>
      <button type="button" class="vence-btn" data-vence-abre title="Prazo do acesso" aria-label="Prazo do acesso ao grupo ${esc(g.nome)}">${icone('calendario', 16)}</button>
      <div class="vence-pop" data-vence-pop hidden><b>Acesso até</b><input type="date" name="vence_${g.id}" aria-label="Acesso ao grupo ${esc(g.nome)} até">
        <small data-vence-info>Sem prazo (até cancelar ou reembolsar)</small>
        <div class="vence-acoes"><button type="button" class="botao leve pequeno" data-vence-limpar>Sem prazo</button>
          <label class="vence-mao" title="Definido à mão: a Kiwify não tira nem muda este grupo"><input type="checkbox" name="manual_${g.id}" value="1" data-vence-mao> À mão</label></div></div></div>`;
    const blocos = [...pastas.map(p => [p.nome, grupos.filter(g => g.pasta_id === p.id)]), ['Sem pasta', grupos.filter(g => !pastas.some(p => p.id === g.pasta_id))]]
      .filter(([, gs]) => gs.length);
    return `<div class="campo grupos-escolha" data-grupos><div class="grupos-topo"><span>Grupos (o que a pessoa vê)</span>
      <label class="marcar"><input type="checkbox" data-marcar-todos> Marcar todos</label></div>
      ${blocos.map(([nome, gs]) => `<div class="grupo-pasta" data-pasta><div class="pasta-cab"><input type="checkbox" data-marcar-pasta aria-label="Marcar a pasta ${esc(nome)} inteira">
        <button type="button" class="pasta-abre" data-pasta-abre aria-expanded="false"><b>${esc(nome)}</b><small data-pasta-conta>${gs.length}</small>${icone('baixo', 15)}</button></div>
        <div class="marcar-grade" hidden>${gs.map(marca).join('')}</div></div>`).join('')}</div>`;
  }
  // Prazo de cada grupo vem do formulário: data = acesso até o fim desse dia (Brasília); vazio = sem prazo
  // "Definido à mão": grupo novo, prazo mudado ou a caixinha marcada = a plataforma não tira nem muda esse grupo
  function gravarPrazos(usuarioId, corpo, antes) {
    const u = contas.porId(usuarioId), daPlataforma = ['kiwify', 'hotmart'].includes(u && u.origem) ? u.origem : 'manual';
    for (const g of acesso.gruposDe(usuarioId, true)) {
      const d = txt(corpo[`vence_${g.id}`]), fim0 = /^\d{4}-\d{2}-\d{2}$/.test(d) ? Date.parse(`${d}T23:59:59.999-03:00`) : null, fim = Number.isFinite(fim0) ? fim0 : null;
      const velho = antes.get(g.id), mudou = !velho || (velho.expira_em ? diaISO(velho.expira_em) : '') !== (fim ? d : '');
      const manual = !!corpo[`manual_${g.id}`] || mudou;
      run('UPDATE usuario_grupos SET expira_em = ?, origem = ? WHERE usuario_id = ? AND grupo_id = ?', fim, manual ? 'manual' : (velho && velho.origem !== 'manual' ? velho.origem : daPlataforma), usuarioId, g.id);
    }
  }
  const avisoUnico = (res, texto) => res.cookie('cdr_aviso', texto, { httpOnly: true, sameSite: 'lax', path: '/admin', maxAge: 60 * 1000 });
  r.post('/membros/novo', async (req, res) => {
    const b = req.body, email = txt(b.email).toLowerCase(), nome = txt(b.nome);
    if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return falhar(res, '/admin/membros', 'Escreva o nome e um e-mail válido.');
    if (contas.porEmail(email)) return falhar(res, '/admin/membros', 'Já existe uma conta com esse e-mail.');
    const senha = contas.senhaInicial();
    const id = contas.criar({ nome, email, whatsapp: txt(b.whatsapp), senha, trocarSenha: true });
    run('UPDATE usuarios SET adicionado_por = ? WHERE id = ?', String((req.usuario && req.usuario.nome) || '').trim().split(/\s+/)[0] || '', id);
    acesso.definirGrupos(id, lista(b.grupos)); gravarPrazos(id, b, new Map());
    if (!b.ativo) run('UPDATE usuarios SET ativo = 0 WHERE id = ?', id);
    let enviado = '';
    if (b.enviar) { const r2 = await correio.enviarLogin({ para: email, nome, senha, tipo: 'Login (cadastro manual)' }); enviado = r2.ok ? ' O login foi enviado por e-mail.' : ` O e-mail NÃO foi enviado (${r2.erro}).`; }
    avisoUnico(res, `${nome} cadastrado. Senha inicial: ${senha} (aparece só agora; a pessoa pode trocar em Minha conta).${enviado}`);
    res.redirect('/admin/membros');
  });
  r.post('/membros/:id', (req, res) => {
    const u = contas.porId(Number(req.params.id)); if (!u || u.papel === 'admin') return res.redirect('/admin/membros');
    if (req.body.acao === 'senha') { avisoUnico(res, `Senha nova de ${u.nome}: ${contas.novaSenha(u.id)} (aparece só agora; a pessoa pode trocar em Minha conta).`); return res.redirect('/admin/membros'); }
    const email = txt(req.body.email).toLowerCase(), nome = txt(req.body.nome);
    if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return falhar(res, '/admin/membros', 'Escreva o nome e um e-mail válido.');
    const outro = contas.porEmail(email);
    if (outro && outro.id !== u.id) return falhar(res, '/admin/membros', 'Já existe outra conta com esse e-mail.');
    if (email !== u.email && u.origem !== 'manual' && !u.email_compra) run('UPDATE usuarios SET email_compra = ? WHERE id = ?', u.email, u.id);
    // E-mail da compra (07/11/2026): o administrador liga à conta o e-mail usado no checkout (comprou com outro e-mail)
    if (req.body.email_compra !== undefined) {
      const ec = txt(req.body.email_compra).toLowerCase();
      if (ec && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ec)) return falhar(res, '/admin/membros', 'O e-mail da compra não é válido.');
      const dono = ec ? contas.porEmail(ec) : null;
      if (dono && dono.id !== u.id) return falhar(res, '/admin/membros', `Já existe outra conta com ${ec}. Exclua a conta duplicada antes de ligar esse e-mail.`);
      if (ec !== email) run('UPDATE usuarios SET email_compra = ? WHERE id = ?', ec, u.id);
    }
    run('UPDATE usuarios SET nome = ?, email = ?, whatsapp = ?, ativo = ? WHERE id = ?', nome, email, txt(req.body.whatsapp), req.body.ativo ? 1 : 0, u.id);
    const antes = new Map(acesso.gruposDe(u.id, true).map(g => [g.id, g]));
    acesso.definirGrupos(u.id, lista(req.body.grupos)); gravarPrazos(u.id, req.body, antes);
    voltar(res, '/admin/membros', `${nome} salvo.`);
  });
  // Histórico do membro: só vem quando o administrador abre "Histórico" na janela (a lista fica leve)
  r.get('/membros/:id/historico', (req, res) => {
    // Cada linha: o que fez (verbo) + o item em destaque (cartaz, aula, curso…) + onde, em texto normal (pack, curso)
    const linha = e => {
      const [antes, depois] = String(e.nome || '').split(' · '), verbo = atividade.TIPOS[e.tipo] || e.tipo;
      if ((e.tipo === 'arte' || e.tipo === 'baixou') && depois) return { v: verbo, i: antes, c: `no pack ${depois}${e.tipo === 'baixou' && e.detalhe ? ` · pelo ${e.detalhe}` : ''}` };
      if (e.tipo === 'aula' && depois) return { v: verbo, i: depois.replace(/^\d+\.\s*/, ''), c: `do curso ${antes}` };
      if (e.tipo === 'prompt' && depois) return { v: verbo, i: depois.replace(/^\d+\.\s*/, ''), c: `em ${antes}` };
      return { v: verbo, i: e.nome || '', c: '' };
    };
    res.json(atividade.recentes(Number(req.params.id), Math.min(300, Math.max(1, Number(req.query.n) || 20))).map(e => ({ q: quandoFoi(e.criado_em), ...linha(e) })));
  });
  r.post('/membros/:id/excluir', (req, res) => {
    const u = contas.porId(Number(req.params.id));
    if (u && u.papel !== 'admin') run('DELETE FROM usuarios WHERE id = ?', u.id);
    voltar(res, '/admin/membros', 'Membro excluído.');
  });

  // ───────────── Grupos e ofertas ─────────────
  const liberaveis = () => ({
    // Mesma organização da área de membros (04/11/2026): packs, cursos, treinamentos, IA na criação, ferramentas e IA
    'Packs de artes': q("SELECT 'pack:' || slug AS chave, nome FROM packs ORDER BY ordem"),
    Cursos: q("SELECT 'curso:' || slug AS chave, CASE WHEN grupo = 'Inteligência Artificial na Criação' THEN capa_pequena || ' ' || capa_grande ELSE linha1 || ' ' || linha2 END AS nome FROM cursos WHERE area = '' AND grupo NOT IN ('Treinamentos', 'Inteligência Artificial na Criação') ORDER BY ordem"),
    Treinamentos: q("SELECT 'curso:' || slug AS chave, CASE WHEN grupo = 'Inteligência Artificial na Criação' THEN capa_pequena || ' ' || capa_grande ELSE linha1 || ' ' || linha2 END AS nome FROM cursos WHERE area = '' AND grupo = 'Treinamentos' ORDER BY ordem"),
    'Inteligência Artificial na Criação': q("SELECT 'curso:' || slug AS chave, CASE WHEN grupo = 'Inteligência Artificial na Criação' THEN capa_pequena || ' ' || capa_grande ELSE linha1 || ' ' || linha2 END AS nome FROM cursos WHERE area = '' AND grupo = 'Inteligência Artificial na Criação' ORDER BY ordem"),
    Ferramentas: q("SELECT chave, nome FROM vitrine WHERE secao = 'ferramentas' ORDER BY ordem"),
    'Inteligência Artificial': q("SELECT chave, nome FROM vitrine WHERE secao = 'ia' ORDER BY ordem"),
  });
  r.get('/grupos', (req, res) => {
    const grupos = acesso.grupos(), ofertas = acesso.ofertas(), lib = liberaveis();
    const nomeDe = Object.fromEntries(Object.values(lib).flat().map(x => [x.chave, x.nome]));
    const resumo = g => Object.entries(lib).map(([sec, itens]) => { const n = itens.filter(i => g.itens.includes(i.chave)).length; return n ? `${n} ${sec === 'Ferramentas' ? (n === 1 ? 'ferramenta' : 'ferramentas') : sec === 'Inteligência Artificial' ? 'de IA' : sec === 'Packs de artes' ? (n === 1 ? 'pack' : 'packs') : sec === 'Treinamentos' ? (n === 1 ? 'treinamento' : 'treinamentos') : sec === 'Inteligência Artificial na Criação' ? (n === 1 ? 'de IA na criação' : 'de IA na criação') : (n === 1 ? 'curso' : 'cursos')}` : ''; }).filter(Boolean).join(' · ') || 'não libera nada ainda';
    const pastas = acesso.pastas();
    // Só o nome (o que o grupo libera aparece ao passar o mouse e na janela de editar)
    const linhaG = g => `<div class="adm-linha"><div class="adm-info" title="${esc(resumo(g))}"><b>${esc(g.nome)} ${g.padrao ? '<span class="selo">Padrão</span>' : ''}</b></div>
      <span class="num-lado"><b>${g.membros}</b><small>membros</small></span><span class="num-lado"><b>${g.n_ofertas}</b><small>ofertas</small></span>
      <div class="adm-acoes"><button type="button" class="botao leve pequeno" data-abrir="j-grupo" data-acao="/admin/grupos/${g.id}" data-excluir="/admin/grupos/${g.id}/excluir" data-dados='${esc(JSON.stringify({ nome: g.nome, padrao: g.padrao, itens: g.itens, pasta_id: g.pasta_id || '' }))}'>${icone('editar', 15)}Editar</button></div></div>`;
    // cada pasta vem fechada (pedido do dono) e abre ao clicar; os grupos sem pasta ficam no fim
    const pasta = (p, gs) => `<div class="dobra-caixa" ${p ? `data-id="${p.id}"` : ''}><details class="pasta-grupos dobra" id="pasta-${p ? p.id : 0}" data-lembrar><summary>${icone('direita', 15)}<b>${esc(p ? p.nome : 'Sem pasta')}</b><small>${gs.length} ${gs.length === 1 ? 'grupo' : 'grupos'}</small></summary>
        
      <div class="adm-lista dobra-corpo">${gs.map(linhaG).join('') || '<p class="adm-vazio">Pasta vazia. Escolha esta pasta ao editar um grupo.</p>'}</div></details>${p ? `<span class="adm-acoes dobra-acoes">${botoesMover()}<button type="button" class="icone-btn mini" title="Renomear" aria-label="Renomear" data-abrir="j-pasta" data-acao="/admin/pastas/${p.id}" data-excluir="/admin/pastas/${p.id}/excluir" data-dados='${esc(JSON.stringify({ nome: p.nome }))}'>${icone('editar', 15)}</button></span>` : ''}</div>`;
    const semPasta = grupos.filter(g => !pastas.some(p => p.id === g.pasta_id));
    const linhasG = `<div data-ordenar="grupo_pastas">${pastas.map(p => pasta(p, grupos.filter(g => g.pasta_id === p.id))).join('')}</div>` + (semPasta.length ? pasta(null, semPasta) : '');
    // Produtos da venda (06/11/2026): um cadastro por produto; dentro, "oferta → grupo → prazo" (ou um grupo só, pelo ID)
    const produtos = acesso.produtos();
    // Nomes curtos na tela (pedido do dono, 09/11/2026: "Auto" no lugar de "Automático")
    const CURTO = { plataforma: 'Auto', mensal: 'Mensal', anual: 'Anual', vitalicio: 'Vitalício' };
    const prazoCurto = p => CURTO[p] || CURTO.plataforma;
    const dadosP = p => ({ nome: p.nome, conta_id: p.conta_id || '', plataforma: p.plataforma, produto_id: p.produto_id, por_oferta: p.por_oferta ? 1 : 0,
      grupo_id: (p.ofertas.find(o => !o.oferta) || {}).grupo_id || '', prazo: (p.ofertas.find(o => !o.oferta) || {}).prazo || 'plataforma',
      ofertas: p.por_oferta ? p.ofertas.map(o => ({ oferta: o.oferta, codigo: o.link, grupo_id: o.grupo_id, prazo: o.prazo })) : [] });
    const linhaP = p => {
      const uma = p.ofertas.find(o => !o.oferta) || {};
      return `<div class="adm-linha produto-venda"><span class="plat ${p.plataforma}">${PLATAFORMAS[p.plataforma]}</span>
      <div class="adm-info"><b>${esc(p.nome)}</b></div>
      ${(() => { // Só o nome do produto; à direita, o(s) grupo(s) que ele libera (detalhes na janela de editar)
        const gs = p.por_oferta ? [...new Set(p.ofertas.map(o => o.grupo || '—'))] : [uma.grupo || '—'];
        return `<span class="seta-grupo" title="${esc(p.por_oferta ? p.ofertas.map(o => `${o.oferta || o.link} → ${o.grupo || '—'}`).join(' · ') : `Qualquer oferta · ${prazoCurto(uma.prazo)}`)}">${icone('seta', 15)}<b>${esc(gs.join(', '))}</b></span>`; })()}
      <div class="adm-acoes"><button type="button" class="botao leve pequeno" data-abrir="j-produto" data-acao="/admin/produtos-venda/${p.id}" data-excluir="/admin/produtos-venda/${p.id}/excluir" data-dados='${esc(JSON.stringify(dadosP(p)))}'>${icone('editar', 15)}Editar</button></div></div>`;
    };
    // Produtos separados por conta da plataforma (ex.: "Kiwify - Zyver Hub"); cada bloco abre ao clicar
    const contasP = plataformas.contas();
    const blocoO = (id, nome, plat, ps) => `<details class="dobra" id="ofertas-${id}" data-lembrar><summary>${icone('direita', 15)}<b>${esc(nome)}</b>${plat ? `<span class="plat ${plat}">${PLATAFORMAS[plat]}</span>` : ''}<small>${ps.length} ${ps.length === 1 ? 'produto' : 'produtos'}</small></summary>
        <div class="adm-lista dobra-corpo">${ps.map(linhaP).join('') || '<p class="adm-vazio">Nenhum produto desta conta ainda.</p>'}</div></details>`;
    const semConta = produtos.filter(p => !contasP.some(c => c.id === p.conta_id));
    const linhasO = produtos.length ? contasP.map(c => blocoO(c.id, c.nome, c.plataforma, produtos.filter(p => p.conta_id === c.id))).join('')
      + (semConta.length ? blocoO(0, 'Sem conta', '', semConta) : '') : '';
    const semLista = acesso.semCadastro();
    const chaveVenda = x => `<input type="hidden" name="plataforma" value="${esc(x.plataforma)}"><input type="hidden" name="produto" value="${esc(x.produto)}"><input type="hidden" name="oferta" value="${esc(x.oferta || '')}">`;
    const sem = semLista.map(x => { const [id, ...nome] = x.produto.split(' · '); const of = (x.oferta || '').split(' · '), nomeOf = of[1] || of[0] || '';
      // produto já cadastrado: abre ele com a oferta nova no fim; senão, um produto novo
      const ja = produtos.find(p => p.plataforma === x.plataforma && p.produto_id === id);
      const d = ja ? { ...dadosP(ja), por_oferta: 1, ofertas: [...dadosP(ja).ofertas, { oferta: nomeOf, grupo_id: '', prazo: 'plataforma' }] }
        : { plataforma: x.plataforma, conta_id: x.conta_id || (contasP.find(c => c.plataforma === x.plataforma) || {}).id || '', produto_id: id, nome: nome.join(' · '), por_oferta: 0, prazo: 'plataforma', ofertas: [] };
      return `<div class="adm-linha"><span class="plat ${x.plataforma}">${PLATAFORMAS[x.plataforma]}</span><div class="adm-info"><b>${esc(nome.join(' · '))}</b><small>Produto ${esc(id)}${x.oferta ? ` · oferta ${esc(x.oferta)}` : ''} · ${ja ? 'oferta fora da lista do produto' : 'chegou venda sem produto cadastrado'}</small></div>
        <div class="adm-acoes"><button type="button" class="botao leve pequeno" data-abrir="j-produto" data-acao="${ja ? `/admin/produtos-venda/${ja.id}` : '/admin/produtos-venda/novo'}" ${ja ? `data-excluir="/admin/produtos-venda/${ja.id}/excluir"` : ''} data-dados='${esc(JSON.stringify(d))}'>Cadastrar</button>
          <form method="post" action="/admin/vendas-sem-cadastro/dispensar" class="reg-de-novo">${chaveVenda(x)}<button class="link-discreto" title="Não quero cadastrar: tira da lista (as vendas continuam no registro)">Dispensar</button></form></div></div>`; }).join('');
    // Dispensadas: linha pequena embaixo, com "Trazer de volta"
    const dispensadas = acesso.dispensadas();
    const blocoDisp = dispensadas.length ? `<details class="historico vs-disp"><summary>${dispensadas.length} ${dispensadas.length === 1 ? 'dispensada' : 'dispensadas'}</summary>${dispensadas.map(x => `<div class="vs-disp-linha"><small>${esc(x.produto)}${x.oferta ? ` · oferta ${esc(x.oferta)}` : ''}</small>
      <form method="post" action="/admin/vendas-sem-cadastro/voltar">${chaveVenda(x)}<button class="link-discreto">Trazer de volta</button></form></div>`).join('')}</details>` : '';
    // Campos da janela do produto: grupo (por pasta) e o prazo escondido atrás do calendário (padrão Automático)
    const selGrupo = nome => `<select name="${nome}" aria-label="Grupo que libera"><option value="">Escolha o grupo</option>${[...pastas.map(p => [p.nome, grupos.filter(g => g.pasta_id === p.id)]), ['Sem pasta', semPasta]].filter(([, gs]) => gs.length)
      .map(([n, gs]) => `<optgroup label="${esc(n)}">${gs.map(g => `<option value="${g.id}">${esc(g.nome)}</option>`).join('')}</optgroup>`).join('')}</select>`;
    const prazoMini = nome => `<span class="pv-prazo" data-pv-prazo><button type="button" class="pv-prazo-btn" title="Prazo do acesso">${icone('calendario', 15)}<span>Auto</span></button>
      <select name="${nome}" aria-label="Prazo do acesso" hidden>${Object.entries(PRAZOS).map(([k, p]) => `<option value="${k}">${esc(prazoCurto(k))}</option>`).join('')}</select></span>`;
    // Selo de cada venda (07/11/2026, pedido do dono): mostra de cara se o login foi por e-mail, se deu erro ou se ainda falta
    // cadastrar. Venda processada de novo: o botão some dela e aparece o que aconteceu (a venda nova também entra na lista).
    const seloVenda = t => /e-mail com o login enviado/.test(t) ? '<span class="selo s-ok reg-selo">E-mail enviado</span>'
      : /e-mail com o login NÃO enviado/.test(t) ? '<span class="selo s-off reg-selo reg-selo-erro">E-mail não enviado</span>'
      : /^sem oferta|sem oferta cadastrada/.test(t) ? '<span class="selo s-off reg-selo">Ainda sem cadastro</span>' : '';
    // Venda de produto/oferta que o dono dispensou: selo "Dispensada" no lugar do "Processar de novo"
    const dispSet = new Set(acesso.dispensadas().map(x => `${x.plataforma}|${x.produto}|${x.oferta}`));
    const dispensada = a => dispSet.has(`${a.plataforma}|${a.produto}|${a.oferta || ''}`) && /sem oferta/.test(a.reprocessado_resultado || a.resultado);
    const SELO_DISP = '<span class="selo s-off reg-selo">Dispensada</span>';
    const avisos = acesso.avisos(25).map(a => `<div class="registro"><small>${dataHora(a.recebido_em)} · ${PLATAFORMAS[a.plataforma] || a.plataforma}</small><b>${esc(NOME_EVENTO[a.evento] || a.evento || '—')}</b><span>${esc(a.email || '')}</span><em>${a.reprocessado_em ? '' : dispensada(a) ? SELO_DISP : seloVenda(a.resultado)}${esc(a.resultado)}${a.reprocessado_em
        ? `<span class="reg-refeito">↻ Processada de novo em ${esc(dataHora(a.reprocessado_em))}: ${dispensada(a) ? SELO_DISP : seloVenda(a.reprocessado_resultado)}${esc(a.reprocessado_resultado)}</span>`
        : dispensada(a) ? '' : /^sem oferta/.test(a.resultado) ? ` <form method="post" action="/admin/avisos-venda/${a.id}/reprocessar" class="reg-de-novo"><button class="botao leve pequeno">Processar de novo</button></form>` : ''}</em>${a.produto || a.oferta ? `<small class="reg-dados">${esc(a.produto || '')}${a.oferta ? ` · oferta ${esc(a.oferta)}` : ''} · <a href="/admin/avisos-venda/${a.id}" target="_blank" rel="noopener">ver o aviso</a></small>` : ''}</div>`).join('').replace(/^(.+)$/s, '$1<style>.reg-selo{margin-right:6px;vertical-align:1px}.reg-selo.s-ok{color:#1e7a45;background:rgba(30,142,78,.12)}.reg-selo-erro{color:var(--erro,#b3261e);background:rgba(179,38,30,.1)}.reg-refeito{display:block;margin-top:4px;font-style:normal;color:var(--t2)}</style>');
    mostrar(req, res, 'Grupos e ofertas', `${cab('Grupos e ofertas', '')}
      <section class="secao-adm"><div class="secao-adm-cab"><h2>Grupos${dica('O produto da venda (ou cada oferta dele) libera um grupo; o grupo libera cursos, packs, IA e ferramentas. Quem está em mais de um grupo vê tudo junto.')}</h2><button type="button" class="botao leve pequeno" data-abrir="j-pasta" data-acao="/admin/pastas/nova" data-dados='{}'>${icone('mais', 15)}Nova pasta</button><button type="button" class="botao leve pequeno" data-abrir="j-grupo" data-acao="/admin/grupos/novo" data-dados='{"itens":[]}'>${icone('mais', 15)}Novo grupo</button></div>
        ${grupos.length ? linhasG : '<p class="vazio">Nenhum grupo. Toque em "+ Novo grupo".</p>'}</section>
      <section class="secao-adm"><div class="secao-adm-cab"><h2>Produtos${dica('O que cada venda libera: cadastre o produto da Kiwify ou da Hotmart e escolha o grupo.')}</h2><button type="button" class="botao leve pequeno" data-abrir="j-produto" data-acao="/admin/produtos-venda/novo" data-dados='{"plataforma":"kiwify","por_oferta":0,"prazo":"plataforma","ofertas":[]}'>${icone('mais', 15)}Novo produto</button></div>
        <div class="adm-lista">${linhasO || '<p class="vazio">Nenhum produto. Toque em "+ Novo produto" e cole o ID do produto da Kiwify ou da Hotmart.</p>'}</div></section>
      <section class="secao-adm"><div class="secao-adm-cab"><h2>Vendas recebidas${dica('O que o app fez com cada venda que chegou.')}</h2></div><div class="dobras"><details class="dobra" id="vendas-recebidas" data-lembrar><summary>${icone('direita', 15)}<b>Últimas vendas</b></summary>
        <div class="dobra-corpo"><div class="registros">${avisos || '<p class="adm-vazio">Nenhuma venda chegou ainda. O endereço para colar na Kiwify e na Hotmart está em Configurações.</p>'}</div></div></details>
        ${sem || blocoDisp ? `<details class="dobra" id="vendas-sem-oferta" data-lembrar><summary>${icone('direita', 15)}<b>Vendas sem cadastro</b><small>${semLista.length} ${semLista.length === 1 ? 'produto' : 'produtos'}</small>${dica('Toque em Cadastrar para liberar o grupo certo, ou Dispensar para tirar da lista.')}</summary>
        <div class="adm-lista dobra-corpo">${sem || '<p class="adm-vazio">Nenhuma venda sem cadastro.</p>'}${blocoDisp}</div></details>
        <style>.vs-disp{margin-top:10px}.vs-disp-linha{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:4px 0}.vs-disp-linha form{margin:0}.adm-acoes .reg-de-novo{display:inline-flex;margin:0 0 0 6px}</style>` : ''}</div></section>
      ${janela('j-pasta', 'Pasta', campo('Nome da pasta', entrada('nome', 'required placeholder="Ex.: Combos"')))}
      ${janela('j-grupo', 'Grupo', `<div class="linha-2">${campo('Nome do grupo', entrada('nome', 'required placeholder="Ex.: Pack de carrosséis"'))}
        ${campo('Pasta', `<select name="pasta_id"><option value="">Sem pasta</option>${pastas.map(p => `<option value="${p.id}">${esc(p.nome)}</option>`).join('')}</select>`)}</div>
        <div class="campo grupos-escolha" data-grupos data-campo="itens[]"><span>O que o grupo libera</span>
          ${Object.entries(lib).map(([sec, itens]) => `<div class="grupo-pasta" data-pasta><div class="pasta-cab"><input type="checkbox" data-marcar-pasta aria-label="Marcar ${esc(sec)} inteiro">
            <button type="button" class="pasta-abre" data-pasta-abre aria-expanded="false"><b>${esc(sec)}</b><small data-pasta-conta>${itens.length}</small>${icone('baixo', 15)}</button></div>
            <div class="marcar-grade" hidden>${itens.map(i => `<label class="marcar"><input type="checkbox" name="itens[]" value="${esc(i.chave)}"> ${esc(i.nome)}</label>`).join('')}</div></div>`).join('')}</div>
        <label class="marcar"><input type="checkbox" name="padrao" value="1"> Grupo padrão${dica('Venda de oferta não cadastrada cai neste grupo.')}</label>`, { larga: true })}
      ${janela('j-produto', 'Produto', `<div class="linha-2">${campo('Nome do produto', entrada('nome', 'required placeholder="Ex.: Clube Criativos do Reino"'))}${contasP.length ? campo('Conta da plataforma', `<select name="conta_id" required>${contasP.map(c => `<option value="${c.id}">${esc(c.nome)} (${PLATAFORMAS[c.plataforma]})</option>`).join('')}</select>`)
          : campo('Plataforma', '<select name="plataforma"><option value="kiwify">Kiwify</option><option value="hotmart">Hotmart</option></select>')}</div>
        ${campo('ID do produto', entrada('produto_id', 'required placeholder="Na Kiwify, é o código da URL depois de /edit/"'))}
        <div class="campo"><span>Libera${dica('Pelo ID do produto: qualquer oferta libera o mesmo grupo. Por oferta: só libera se o produto e a oferta baterem. Prazo (calendário): Automático de padrão, a assinatura vale até a próxima cobrança e a compra única não vence; toque no calendário para fixar Mensal, Anual ou Vitalício.')}</span><div class="pv-modo">
          <label><input type="radio" name="por_oferta" value="0" data-pv-modo> Pelo ID do produto</label>
          <label><input type="radio" name="por_oferta" value="1" data-pv-modo> Por oferta</label></div></div>
        <div data-pv="0"><div class="pv-linha pv-uma">${selGrupo('grupo_id')}${prazoMini('prazo')}</div></div>
        <div data-pv="1" hidden><div class="pv-cab"><span>Oferta${dica('O nome da oferta igual ao da plataforma.')}</span><span>Código${dica('O código do checkout: o fim do link pay.kiwify.com.br/… (pode colar o link inteiro).')}</span><span>Grupo</span><span></span></div>
          <div class="pv-lista" data-pv-lista></div>
          <button type="button" class="botao leve pequeno" data-pv-mais>${icone('mais', 15)}Adicionar oferta</button></div>
        <template id="t-pv-linha"><div class="pv-linha"><input name="of_oferta[]" placeholder="Ex.: Combo Geral 1 - Clube" aria-label="Nome da oferta"><input name="of_codigo[]" placeholder="Ex.: S7yH7oK" aria-label="Código do checkout" title="O código do link pay.kiwify.com.br/…  (pode colar o link inteiro)">${selGrupo('of_grupo[]')}${prazoMini('of_prazo[]')}<button type="button" class="icone-btn perigo-ic" data-pv-tirar aria-label="Tirar oferta" title="Tirar">✕</button></div></template>`, { larga: true })}`);

  });
  const salvarGrupo = (req, res, id) => { try { acesso.salvarGrupo(id, req.body.nome, lista(req.body.itens), !!req.body.padrao, req.body.pasta_id); mudou(); voltar(res, '/admin/grupos', 'Grupo salvo.'); } catch (e) { falhar(res, '/admin/grupos', e.message); } };
  r.post('/grupos/novo', (req, res) => salvarGrupo(req, res, null));
  r.post('/grupos/:id', (req, res) => salvarGrupo(req, res, Number(req.params.id)));
  r.post('/grupos/:id/excluir', (req, res) => { try { acesso.excluirGrupo(req.params.id); voltar(res, '/admin/grupos', 'Grupo excluído.'); } catch (e) { falhar(res, '/admin/grupos', e.message); } });
  // Pastas: criar, renomear, ordenar e excluir (os grupos de uma pasta excluída vão para "Sem pasta")
  r.post('/pastas/nova', (req, res) => {
    if (!txt(req.body.nome)) return falhar(res, '/admin/grupos', 'Escreva o nome da pasta.');
    run('INSERT INTO grupo_pastas (nome, ordem) VALUES (?, (SELECT COALESCE(MAX(ordem), -1) + 1 FROM grupo_pastas))', txt(req.body.nome).slice(0, 40));
    voltar(res, '/admin/grupos', 'Pasta criada. Escolha a pasta ao editar cada grupo.');
  });
  r.post('/pastas/:id', (req, res) => { if (txt(req.body.nome)) run('UPDATE grupo_pastas SET nome = ? WHERE id = ?', txt(req.body.nome).slice(0, 40), req.params.id); voltar(res, '/admin/grupos', 'Pasta salva.'); });
  r.post('/pastas/:id/mover', (req, res) => { mover('grupo_pastas', req.params.id, req.body.dir, '1=1'); res.redirect('/admin/grupos'); });
  r.post('/pastas/:id/excluir', (req, res) => {
    run('UPDATE grupos SET pasta_id = NULL WHERE pasta_id = ?', req.params.id);
    run('DELETE FROM grupo_pastas WHERE id = ?', req.params.id);
    voltar(res, '/admin/grupos', 'Pasta excluída; os grupos dela ficaram em "Sem pasta".');
  });
  // O aviso inteiro que a plataforma mandou (para conferir campos quando algo não bate)
  r.get('/avisos-venda/:id', (req, res) => { const a = um('SELECT * FROM avisos_acesso WHERE id = ?', Number(req.params.id)); if (!a) return res.status(404).send('Não achei.'); let corpo = a.corpo; try { corpo = JSON.parse(a.corpo); } catch (e) { /* texto */ } res.type('json').send(JSON.stringify({ ...a, corpo }, null, 2)); });
  // Venda que chegou sem oferta cadastrada: depois de cadastrar, processa de novo o mesmo aviso (sem nova compra)
  r.post('/vendas-sem-cadastro/dispensar', (req, res) => { acesso.dispensarVenda(txt(req.body.plataforma), String(req.body.produto || ''), String(req.body.oferta || '')); voltar(res, '/admin/grupos#vendas-sem-oferta', 'Tirado da lista. Está em "dispensadas", se quiser trazer de volta.'); });
  r.post('/vendas-sem-cadastro/voltar', (req, res) => { acesso.voltarVenda(txt(req.body.plataforma), String(req.body.produto || ''), String(req.body.oferta || '')); voltar(res, '/admin/grupos#vendas-sem-oferta', 'Voltou para a lista.'); });
  r.post('/avisos-venda/:id/reprocessar', async (req, res) => {
    const a = um('SELECT * FROM avisos_acesso WHERE id = ?', Number(req.params.id)); let corpo = null;
    try { corpo = a ? JSON.parse(a.corpo) : null; } catch (e) { corpo = null; }
    if (!a || !corpo) return falhar(res, '/admin/grupos', 'Esse aviso não tem os dados guardados.');
    const conta = a.conta_id ? plataformas.conta(a.conta_id) : null;
    const r2 = await acesso.receber(a.plataforma, corpo, contas, { conta }); acesso.marcarReprocessado(a.id, r2); mudou();
    voltar(res, '/admin/grupos#vendas-recebidas', `Processado de novo: ${r2}`);
  });
  const salvarProduto = (req, res, id) => { try { acesso.salvarProduto(id, req.body); voltar(res, '/admin/grupos', 'Produto salvo.'); } catch (e) { falhar(res, '/admin/grupos', e.message); } };
  r.post('/produtos-venda/novo', (req, res) => salvarProduto(req, res, null));
  r.post('/produtos-venda/:id', (req, res) => salvarProduto(req, res, Number(req.params.id)));
  r.post('/produtos-venda/:id/excluir', (req, res) => { acesso.excluirProduto(req.params.id); voltar(res, '/admin/grupos', 'Produto excluído.'); });

  // ───────────── Avisos (notificação no celular) ─────────────
  r.get('/avisos', (req, res) => {
    const grupos = q('SELECT * FROM grupos ORDER BY nome');
    const TIPO = { manual: 'Mensagem', artes: 'Artes novas (automático)', calendario: 'Calendário (automático)' };
    const hist = push.mensagens(30).map(m => `<div class="registro"><small>${dataHora(m.enviada_em)} · ${TIPO[m.tipo] || m.tipo}</small><b>${esc(m.titulo)}</b><span>${esc(m.texto)}</span><em>${m.entregues} ${m.entregues === 1 ? 'aparelho recebeu' : 'aparelhos receberam'}</em></div>`).join('');
    const auto = (chave, nome, quando) => { const on = acesso.cfg(chave) !== '0'; return `<form method="post" action="/admin/avisos/auto" class="auto-cartao"><input type="hidden" name="chave" value="${chave}">
      <div><b>${nome}${dica(quando)} <span class="selo ${on ? 's-ok' : 's-off'}">${on ? 'Ligado' : 'Desligado'}</span></b></div><button class="botao leve pequeno">${on ? 'Desligar' : 'Ligar'}</button></form>`; };
    const ap = push.aparelhosAtivos();
    mostrar(req, res, 'Avisos', `${cab('Avisos', `<button type="button" class="botao ouro" data-abrir="j-mensagem" data-acao="/admin/avisos/enviar" data-dados='{"url":"/"}'>${icone('mais', 17)}Nova mensagem</button>`, '', `${ap} ${ap === 1 ? 'aparelho ativou' : 'aparelhos ativaram'} os avisos no celular. Toda mensagem também aparece no sino de todos.`)}
      <section class="secao-cfg"><div class="secao-cfg-cab"><h2>Automáticos</h2></div><div class="autos">${auto('auto_artes', 'Artes novas', 'Todo dia às 19h, se entrou arte nova; só para quem tem o pack.')}${auto('auto_calendario', 'Datas do calendário', 'Às 8h da véspera de cada data; para quem tem o Calendário.')}</div></section>
      <section class="secao-cfg"><div class="secao-cfg-cab"><h2>Enviados</h2></div><div class="registros">${hist || '<p class="adm-vazio">Nada enviado ainda. Toque em "+ Nova mensagem".</p>'}</div></section>
      ${janela('j-mensagem', 'Mensagem', `${campo('Título', entrada('titulo', 'required maxlength="70" placeholder="Ex.: Chegou a atualização do mês!"'))}
        ${campo('Texto', '<textarea name="texto" rows="3" maxlength="200" required placeholder="Ex.: {{primeiro_nome}}, 12 cartazes novos já estão no app."></textarea>', 'use {{primeiro_nome}} ou {{nome}}')}
        <div class="linha-2">${campo('Abre em', entrada('url', 'placeholder="/packs/aeg"'))}${campo('Para quem', `<select name="grupo"><option value="">Todos os membros</option>${grupos.map(g => `<option value="${g.id}">Grupo ${esc(g.nome)}</option>`).join('')}</select>`)}</div>`)}`);
  });
  r.post('/avisos/enviar', async (req, res) => {
    const titulo = txt(req.body.titulo), texto = txt(req.body.texto), url = txt(req.body.url) || '/', grupo = Number(req.body.grupo) || null;
    if (!titulo || !texto) return falhar(res, '/admin/avisos', 'Escreva o título e o texto.');
    const noGrupo = grupo ? new Set(q('SELECT usuario_id FROM usuario_grupos WHERE grupo_id = ?', grupo).map(x => x.usuario_id)) : null;
    const n = await push.enviar({ titulo, texto, url: url.startsWith('/') ? url : '/' }, u => !noGrupo || noGrupo.has(u.id));
    avisar(res, '/admin/avisos', `Mensagem enviada: ${n} ${n === 1 ? 'aparelho recebeu' : 'aparelhos receberam'}.`);
  });
  r.post('/avisos/auto', (req, res) => {
    const chave = ['auto_artes', 'auto_calendario'].includes(req.body.chave) ? req.body.chave : null;
    if (chave) acesso.gravar(chave, acesso.cfg(chave) === '0' ? '1' : '0');
    res.redirect('/admin/avisos');
  });

  // ───────────── Analytics ─────────────
  // O que os membros mais usam (artes, downloads, aulas, cursos, packs, IA, ferramentas) e a atividade recente.
  // Conta só membros (o administrador testando não entra nos números).
  r.get('/analytics', (req, res) => {
    // Período (09/11/2026): 7 dias de padrão, 30 dias, ou datas escolhidas no calendário (de/até); tudo na tela segue o período
    const agora = Date.now(), dataOk = v => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ''));
    const porDatas = dataOk(req.query.de) && dataOk(req.query.ate) && req.query.de <= req.query.ate;
    const desde = porDatas ? Date.parse(`${req.query.de}T00:00:00-03:00`) : agora - (Number(req.query.p) === 30 ? 30 : 7) * 864e5;
    const ate = porDatas ? Math.min(agora, Date.parse(`${req.query.ate}T23:59:59.999-03:00`)) : agora;
    const dias = porDatas ? Math.max(1, Math.round((Date.parse(`${req.query.ate}T12:00:00-03:00`) - Date.parse(`${req.query.de}T12:00:00-03:00`)) / 864e5) + 1) : (Number(req.query.p) === 30 ? 30 : 7);
    const dm = d => d.split('-').reverse().slice(0, 2).join('/');
    const rotP = porDatas ? `${dm(req.query.de)} a ${dm(req.query.ate)}` : `${dias} dias`;
    const DE_MEMBRO = "JOIN usuarios u ON u.id = e.usuario_id AND u.papel = 'membro'";
    const conta = tipo => um(`SELECT COUNT(*) AS n FROM eventos e ${DE_MEMBRO} WHERE e.tipo = ? AND e.criado_em >= ? AND e.criado_em <= ?`, tipo, desde, ate).n;
    const top = (tipo, n = 8) => q(`SELECT MAX(e.nome) AS nome, COUNT(*) AS n, COUNT(DISTINCT e.usuario_id) AS pessoas FROM eventos e ${DE_MEMBRO}
      WHERE e.tipo = ? AND e.criado_em >= ? AND e.criado_em <= ? GROUP BY e.chave ORDER BY n DESC, pessoas DESC LIMIT ?`, tipo, desde, ate, n);
    const hoje = diaSP(agora);
    const membros = um("SELECT COUNT(*) AS n FROM usuarios WHERE papel = 'membro' AND ativo = 1").n;
    const online = um("SELECT COUNT(*) AS n FROM usuarios WHERE papel = 'membro' AND ultimo_acesso >= ?", agora - 5 * 60 * 1000).n;
    const entraramHoje = um("SELECT COUNT(*) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.papel = 'membro' WHERE a.dia = ?", hoje).n;
    const ativos = um("SELECT COUNT(DISTINCT a.usuario_id) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.papel = 'membro' WHERE a.dia >= ? AND a.dia <= ?", diaSP(porDatas ? desde : desde + 864e5), diaSP(ate)).n;
    // um ponto por dia do período (dias sem nada contam zero)
    const diasDoPeriodo = Array.from({ length: dias }, (_, i) => ate - (dias - 1 - i) * 864e5);
    const rotulo = t => new Date(t).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit' });
    const dica = t => new Date(t).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'short', day: 'numeric', month: 'short' });
    const porDiaAcesso = Object.fromEntries(q("SELECT a.dia, COUNT(*) AS n FROM acessos_dia a JOIN usuarios u ON u.id = a.usuario_id AND u.papel = 'membro' WHERE a.dia >= ? AND a.dia <= ? GROUP BY a.dia", diaSP(diasDoPeriodo[0]), diaSP(ate)).map(r => [r.dia, r.n]));
    const porDiaCadastro = {};
    for (const u of q("SELECT criado_em FROM usuarios WHERE papel = 'membro' AND criado_em >= ? AND criado_em <= ?", desde - 864e5, ate)) { const d = diaSP(u.criado_em); porDiaCadastro[d] = (porDiaCadastro[d] || 0) + 1; }
    const serie = mapa => diasDoPeriodo.map(t => ({ rot: rotulo(t), dica: dica(t), n: mapa[diaSP(t)] || 0 }));
    const cadastrosPeriodo = um("SELECT COUNT(*) AS n FROM usuarios WHERE papel = 'membro' AND criado_em >= ? AND criado_em <= ?", desde, ate).n;
    const n = x => Number(x).toLocaleString('pt-BR');
    const painel = (titulo, lista, { unidade = 'vezes', vazio = 'Nada neste período ainda.', pessoas = true } = {}) => {
      const max = Math.max(1, ...lista.map(l => l.n));
      return `<section class="an-painel"><h3>${titulo}</h3>${lista.length ? `<ol class="an-lista">${lista.map(l => `<li><span class="an-nome" title="${esc(l.nome)}">${esc(l.nome || '—')}</span>
        <span class="an-num"><b>${n(l.n)}</b> ${unidade}${pessoas && l.pessoas ? ` · ${n(l.pessoas)} ${l.pessoas === 1 ? 'pessoa' : 'pessoas'}` : ''}</span>
        <span class="an-barra"><span style="width:${Math.max(3, Math.round(l.n / max * 100))}%"></span></span></li>`).join('')}</ol>` : `<p class="an-vazio">${vazio}</p>`}</section>`;
    };
    const cartao = (num, rot, extra = '') => `<div class="an-cartao ${extra}"><b>${n(num)}</b><small>${rot}</small></div>`;
    const bloco = (titulo, nota, miolo) => `<section class="an-bloco"><div class="an-bloco-cab"><h2>${titulo}</h2>${nota ? `<small>${nota}</small>` : ''}</div>${miolo}</section>`;
    // miniatura e pack de cada arte do ranking (a chave do evento é "a<id da arte>")
    const daArte = chave => { const id = Number(String(chave).replace(/^a/, '')); return id ? um('SELECT a.previa, p.tipo, p.nome AS pack FROM artes a JOIN packs p ON p.id = a.pack_id WHERE a.id = ?', id) : null; };
    const maisAbertas = q(`SELECT e.chave, MAX(e.nome) AS nome, COUNT(*) AS n, COUNT(DISTINCT e.usuario_id) AS pessoas FROM eventos e ${DE_MEMBRO}
      WHERE e.tipo = 'arte' AND e.criado_em >= ? AND e.criado_em <= ? GROUP BY e.chave ORDER BY n DESC, pessoas DESC LIMIT 6`, desde, ate);
    const novos = q("SELECT nome, email, origem, criado_em FROM usuarios WHERE papel = 'membro' ORDER BY criado_em DESC LIMIT 6");
    const novos7 = um("SELECT COUNT(*) AS n FROM usuarios WHERE papel = 'membro' AND criado_em >= ?", agora - 7 * 864e5).n;
    const ORIGEM = { kiwify: 'Kiwify', hotmart: 'Hotmart', manual: 'Manual' };
    const kpi = (titulo, ic, num, apoio, destaque = false) => `<div class="an-kpi"><div class="an-kpi-cab"><span>${titulo}</span><span class="an-kpi-ic">${ic}</span></div>
      <b>${num}</b><small class="${destaque ? 'sobe' : ''}">${apoio}</small></div>`;
    const caixa = (titulo, extra, miolo, cls = '') => `<section class="an-painel ${cls}"><div class="an-painel-cab"><h3>${titulo}</h3>${extra || ''}</div>${miolo}</section>`;
    const nomeArte = l => String(l.nome || '').split(' · ')[0];
    // Painel de ranking no estilo do "Mais abertas": "1. Nome", embaixo o detalhe (curso da aula, tipo do prompt) e quantas pessoas; à direita o número
    const ranking = (titulo, lista, { partes = false, vazio = '' } = {}) => caixa(`${titulo} (${rotP})`, '', lista.length ? `<ol class="an-top an-top-txt-so">${lista.map((l, i) => {
      const [antes, depois] = String(l.nome || '').split(' · '), num = partes && depois ? /^(\d+)\.\s*/.exec(depois) : null;
      const nome = partes && depois ? depois.replace(/^\d+\.\s*/, '') : l.nome, sub = partes && depois ? `${antes}${num ? ` · aula ${num[1]}` : ''}` : '';
      return `<li><span class="an-top-txt"><b>${i + 1}. ${esc(nome || '—')}</b><small>${sub ? `${esc(sub)} · ` : ''}${n(l.pessoas)} ${l.pessoas === 1 ? 'pessoa' : 'pessoas'}</small></span><span class="an-top-n">${n(l.n)}</span></li>`; }).join('')}</ol>`
      : `<p class="an-vazio">${vazio}</p>`);
    mostrar(req, res, 'Analytics', `${cab('Analytics', `<nav class="chips an-periodo" aria-label="Período">${[[7, '7 dias'], [30, '30 dias']].map(([d, t]) => `<a class="${!porDatas && dias === d ? 'on' : ''}" href="/admin/analytics?p=${d}">${t}</a>`).join('')}</nav>
      <details class="an-datas ${porDatas ? 'on' : ''}"><summary class="icone-btn" title="Escolher as datas" aria-label="Escolher as datas">${icone('calendario', 16)}</summary>
        <form class="an-datas-pop" action="/admin/analytics"><label>De<input type="date" name="de" value="${porDatas ? req.query.de : diaSP(agora - 6 * 864e5)}" max="${diaSP(agora)}" required></label>
        <label>Até<input type="date" name="ate" value="${porDatas ? req.query.ate : diaSP(agora)}" max="${diaSP(agora)}" required></label><button class="botao pequeno">Ver</button></form></details>`, '', `Como os membros usam o Clube no período escolhido (${rotP}). Só conta o que os membros fazem (o administrador não entra). A contagem começou em 30/10/2026; a mesma coisa aberta pela mesma pessoa em menos de 10 minutos conta uma vez.`)}
      <div class="an-kpis">
        ${kpi(`Membros que entraram (${rotP})`, icone('usuario', 18), n(ativos), `de ${n(membros)} com acesso · +${n(novos7)} novos em 7 dias`, false)}
        ${kpi('Online agora', `<span class="an-vivo" aria-hidden="true"></span>`, n(online), `${n(entraramHoje)} ${entraramHoje === 1 ? 'entrou' : 'entraram'} hoje`)}
        ${kpi(`Artes abertas (${rotP})`, icone('packs', 18), n(conta('arte')), `${n(conta('baixou'))} downloads (Canva e PSD)`)}
        ${kpi(`Aulas assistidas (${rotP})`, icone('play', 18), n(conta('aula')), `${n(conta('prompt'))} prompts de IA copiados`)}
      </div>
      <div class="an-duas">
        ${caixa('Membros que entraram por dia', `<small>${n(ativos)} de ${n(membros)} no período</small>`, grafico(serie(porDiaAcesso), { tipo: 'barras', unidade: 'membros', titulo: 'Membros que entraram por dia' }))}
        ${caixa(`Mais abertas (${rotP})`, '', maisAbertas.length ? `<ol class="an-top">${maisAbertas.map((l, i) => { const a = daArte(l.chave);
          return `<li>${a && a.previa ? `<img src="${esc(miniatura(a.previa, a.tipo, 120))}" alt="" loading="lazy">` : '<span class="an-sem-img"></span>'}<span class="an-top-txt"><b>${i + 1}. ${esc(nomeArte(l))}</b><small>${esc(a ? a.pack : String(l.nome || '').split(' · ')[1] || '')} · ${n(l.pessoas)} ${l.pessoas === 1 ? 'pessoa' : 'pessoas'}</small></span><span class="an-top-n">${n(l.n)}</span></li>`; }).join('')}</ol>`
          : '<p class="an-vazio">Assim que os membros abrirem as artes, as mais vistas aparecem aqui.</p>')}
      </div>
      <div class="an-duas">
        ${caixa('Cadastros por dia', `<small>${n(cadastrosPeriodo)} no período</small>`, grafico(serie(porDiaCadastro), { tipo: 'linha', unidade: 'cadastros', titulo: 'Cadastros por dia' }))}
        ${caixa('Novos membros', '<a class="an-ver" href="/admin/membros">Ver todos</a>', novos.length ? `<ol class="an-novos">${novos.map(u => `<li><span class="avatar-ini">${esc(String(u.nome || '?').trim()[0] || '?').toUpperCase()}</span>
          <span class="an-top-txt"><b>${esc(u.nome)}</b><small>${esc(u.email)} · ${data(u.criado_em)}</small></span><span class="plat ${esc(u.origem)}">${ORIGEM[u.origem] || 'Manual'}</span></li>`).join('')}</ol>` : '<p class="an-vazio">Nenhum membro ainda.</p>')}
      </div>
      <div class="an-quatro">
        ${ranking('Aulas mais assistidas', top('aula', 5), { partes: true, vazio: 'Quando os membros assistirem às aulas, as mais vistas aparecem aqui.' })}
        ${ranking('Guias mais vistos', top('guia', 5), { vazio: 'Quando os membros abrirem os guias, aparecem aqui.' })}
        ${ranking('Ferramentas mais usadas', top('ferramenta', 5), { vazio: 'Quando os membros usarem as ferramentas, aparecem aqui.' })}
        ${ranking('Prompts de IA mais copiados', top('prompt', 5), { partes: true, vazio: 'Quando os membros copiarem prompts, aparecem aqui.' })}
      </div>
      ${SCRIPT_GRAFICOS}`);
  });

  // ───────────── Configurações ─────────────
  r.get('/configuracoes', (req, res) => {
    const base = acesso.cfg('app_url') || `${req.protocol}://${req.get('host')}`, seg = acesso.cfg('webhook_segredo'), smtp = correio.dados();
    // Endereço do webhook escondido: o olhinho mostra; "Copiar" funciona sem mostrar
    const olho = `<button type="button" class="icone-btn mini" data-mostrar title="Mostrar ou esconder" aria-label="Mostrar ou esconder">${icone('olho', 16)}</button>`;
    const endereco = (rot, valor, extra = '') => `<div class="campo"><span>${rot}</span><div class="copiar"><input readonly class="segredo" value="${esc(valor)}" aria-label="${esc(rot)}">
      ${olho}<button type="button" class="botao leve pequeno" data-copiar="${esc(valor)}">${icone('copiar', 15)}<span>Copiar</span></button>${extra}</div></div>`;
    // Bloco recolhido: título + situação; abre ao clicar (lembra o que estava aberto)
    const bloco = (id, titulo, ok, situacao, conteudo) => `<details class="dobra" id="${id}" data-lembrar><summary>${icone('direita', 15)}<b>${titulo}</b>
      <span class="selo ${ok ? 's-ok' : 's-off'}">${esc(situacao)}</span></summary><div class="dobra-corpo">${conteudo}</div></details>`;
    const segredoCampo = (nome, guardado, rotulo) => `<input name="${nome}" class="segredo" autocomplete="off" data-lpignore data-1p-ignore placeholder="${guardado ? 'Guardado (cole outro para trocar)' : rotulo}">`;
    const kiwify = acesso.cfg('kiwify_token'), hotmart = acesso.cfg('hotmart_hottok'), emailOk = correio.pronto();
    mostrar(req, res, 'Configurações', `${cab('Configurações', '')}
      ${(() => {
        // Plataformas de venda: lista de contas (Kiwify, Hotmart; pode ter várias) + "Adicionar plataforma"
        const contasP = plataformas.contas();
        // Tutorial curto, recolhido (padrão do FluxoPost, 07/11/2026): onde clicar e só os eventos a marcar, na ordem da tela
        const COMO = {
          kiwify: 'Na Kiwify: <b>Apps → Webhooks → Criar webhook</b>. Cole o endereço acima, escolha o produto (ou todos) e marque só: <b>Compra aprovada, Reembolso, Chargeback, Assinatura cancelada e Assinatura renovada</b>. Os outros eventos ficam desmarcados. Salve, copie o <b>token</b> que a Kiwify mostra e cole aqui embaixo.',
          hotmart: 'Na Hotmart: <b>Ferramentas → Webhook (versão 2.0)</b>. Cole o endereço acima e marque <b>Compra aprovada, Compra completa, Reembolso, Chargeback, Pedido de reembolso e Cancelamento de assinatura</b>. Copie o <b>hottok</b> e cole aqui embaixo.',
        };
        const visto = t => (t ? `último aviso ${quandoFoi(t)}` : 'nenhum aviso ainda');
        const tokenCampo = (nome, valor, rotulo) => `<input name="${nome}" class="segredo" autocomplete="off" data-lpignore data-1p-ignore value="${esc(valor || '')}" placeholder="${esc(rotulo)}" aria-label="Token">`;
        // Token guardado (escondido) + olhinho + Salvar, numa linha curta
        const tokenForm = (c, rot, w, rotulo) => `<form method="post" action="/admin/plataformas/${c.id}/token" autocomplete="off" class="form-dobra">${campo(`${rot}${w ? ` <small>· ${visto(w.visto_em)}</small>` : ''}`, `<div class="copiar token-linha">${tokenCampo('token', w && w.token, rotulo)}${olho}<button class="botao pequeno">Salvar</button></div>`)}</form>`;
        const umaConta = c => {
          const ws = plataformas.webhooks(c.id), unico = ws.find(w => w.unico), porProduto = ws.filter(w => !w.unico), ativos = plataformas.ativos(c);
          const url = `${base}/webhook/${c.plataforma}/${c.segredo}`;
          const situacao = ativos.length ? (c.ultimo_aviso ? `Recebendo · ${visto(c.ultimo_aviso)}` : 'Pronto · nenhum aviso ainda') : 'Falta o token';
          const tokens = c.plataforma === 'hotmart'
            ? tokenForm(c, 'Hottok', unico, 'Cole o hottok da Hotmart')
            : `<form method="post" action="/admin/plataformas/${c.id}/modo" class="plat-modo"><label class="marcar"><input type="radio" name="modo" value="unico" ${c.modo !== 'varios' ? 'checked' : ''} onchange="this.form.submit()"> Um webhook para todos os produtos</label>
                <label class="marcar"><input type="radio" name="modo" value="varios" ${c.modo === 'varios' ? 'checked' : ''} onchange="this.form.submit()"> Um webhook por produto</label></form>
              ${c.modo !== 'varios'
                ? tokenForm(c, 'Token do webhook', unico, 'Cole o token que a Kiwify mostra')
                : `<div class="plat-webhooks">${porProduto.map(w => `<form method="post" action="/admin/plataformas/${c.id}/webhook/${w.id}" autocomplete="off" class="plat-webhook">
                    ${entrada('nome', `value="${esc(w.nome)}" placeholder="Nome do produto" aria-label="Produto"`)}<div class="copiar">${tokenCampo('token', w.token, 'Token deste webhook')}${olho}</div><small>${visto(w.visto_em)}</small>
                    <button class="botao leve pequeno">Salvar</button><button class="botao leve pequeno" name="acao" value="tirar">Tirar</button></form>`).join('')}
                  <form method="post" action="/admin/plataformas/${c.id}/webhook/novo" autocomplete="off" class="plat-webhook novo">${entrada('nome', 'placeholder="Nome do produto (ex.: ★ Cartazes Editáveis)" aria-label="Produto"')}${tokenCampo('token', '', 'Token deste webhook')}
                    <button class="botao pequeno">${icone('mais', 15)}Adicionar</button></form></div>`}`;
          return `<details class="dobra" id="cfg-conta-${c.id}" data-lembrar><summary>${icone('direita', 15)}<b>${esc(c.nome)}</b><span class="plat ${c.plataforma}">${PLATAFORMAS[c.plataforma]}</span><button type="button" class="plat-lapis" data-abrir="j-plat-nome-${c.id}" title="Renomear" aria-label="Renomear">${icone('editar', 14)}</button>
              <span class="selo ${ativos.length ? 's-ok' : 's-off'}">${esc(situacao)}</span></summary><div class="dobra-corpo">
            ${endereco('Endereço do webhook', url, `<button type="button" class="icone-btn mini" data-abrir="j-plat-segredo-${c.id}" title="Trocar endereço" aria-label="Trocar endereço">${icone('refazer', 15)}</button><button type="button" class="icone-btn mini perigo-ic" data-abrir="j-plat-excluir-${c.id}" title="Excluir" aria-label="Excluir">${icone('lixo', 15)}</button>`)}
            ${ajuda(`Como configurar na ${PLATAFORMAS[c.plataforma]}`, COMO[c.plataforma])}
            ${tokens}</div></details>
            <dialog class="janela janela-confirmar" id="j-plat-nome-${c.id}"><form method="post" action="/admin/plataformas/${c.id}/nome"><div class="janela-corpo"><b>Renomear</b>
              ${entrada('nome', `value="${esc(c.nome)}" aria-label="Nome da conta" maxlength="60" required`)}</div>
              <div class="rodape-janela"><button class="botao">Salvar</button><button type="button" class="botao leve" data-fechar>Cancelar</button></div></form></dialog>
            <dialog class="janela janela-confirmar" id="j-plat-segredo-${c.id}"><form method="post" action="/admin/plataformas/${c.id}/segredo"><div class="janela-corpo"><b>Trocar o endereço de ${esc(c.nome)}?</b>
              <p>O endereço tem uma parte secreta que impede vendas falsas. Troque só se ela vazou: o antigo para na hora e você precisa colar o novo na plataforma.</p></div>
              <div class="rodape-janela"><button class="botao">Trocar agora</button><button type="button" class="botao leve" data-fechar>Cancelar</button></div></form></dialog>
            <dialog class="janela janela-confirmar" id="j-plat-excluir-${c.id}"><form method="post" action="/admin/plataformas/${c.id}/excluir"><div class="janela-corpo"><b>Excluir ${esc(c.nome)}?</b>
              <p>As vendas dessa conta param de chegar no app. Os membros e as ofertas continuam.</p></div>
              <div class="rodape-janela"><button class="botao perigo">Excluir</button><button type="button" class="botao leve" data-fechar>Cancelar</button></div></form></dialog>`;
        };
        return `<section class="secao-cfg"><div class="secao-cfg-cab"><h2>Plataformas de venda${dica('Cada conta tem o seu endereço: cole no painel da plataforma. É por ele que as vendas chegam e liberam o acesso. Dá para ter mais de uma conta da mesma plataforma.')}</h2><button type="button" class="botao leve pequeno" data-abrir="j-plataforma" data-acao="/admin/plataformas/nova" data-dados='{"plataforma":"kiwify"}'>${icone('mais', 15)}Adicionar plataforma</button></div>
          <div class="dobras">${contasP.map(umaConta).join('') || '<p class="adm-vazio">Nenhuma plataforma ainda. Toque em "+ Adicionar plataforma".</p>'}</div></section>
          ${janela('j-plataforma', 'Plataforma', `${campo('Plataforma', `<select name="plataforma">${Object.entries(PLATAFORMAS).map(([v, n]) => `<option value="${v}">${n}</option>`).join('')}</select>`)}
            ${campo('Nome (para você)', entrada('nome', 'placeholder="Ex.: Kiwify - Zyver Hub" maxlength="60"'))}`)}`;
      })()}
      <section class="secao-cfg"><h2>Senha dos membros${dica('A senha que todo membro recebe ao entrar (venda ou cadastro) e quando usa "Esqueci minha senha". Depois cada um pode trocar a sua em Minha conta.')}</h2><div class="dobras">
      ${bloco('cfg-senha', 'Senha padrão', !!contas.senhaPadrao(), contas.senhaPadrao() ? 'Definida' : 'Não definida (cada conta recebe uma senha sorteada)', `<form method="post" action="/admin/configuracoes/senha" autocomplete="off" class="form-dobra">
        ${campo('Senha padrão', `<div class="copiar token-linha"><input name="senha_padrao" class="segredo" autocomplete="off" data-lpignore data-1p-ignore minlength="6" value="${esc(contas.senhaPadrao())}" placeholder="Pelo menos 6 caracteres" aria-label="Senha padrão">
          ${olho}<button class="botao pequeno">Salvar</button></div>`)}</form>`)}
      </div></section>
      <section class="secao-cfg"><h2>E-mail${dica('De onde sai o e-mail com o login de quem compra.')}</h2><div class="dobras">
      ${bloco('cfg-email', 'E-mail do login', emailOk, emailOk ? `Enviando por ${smtp.usuario}` : 'Não configurado', `<form method="post" action="/admin/configuracoes/email" autocomplete="off" class="form-dobra">
        ${ajuda('Como configurar', 'Escolha onde está o e-mail do seu domínio: o servidor e a porta se preenchem sozinhos. Depois digite o e-mail e a senha dele e toque em "Mandar o e-mail de boas-vindas para mim": chega igual ao que o cliente recebe (com a senha padrão, se tiver).')}
        ${campo('Provedor do e-mail', `<select data-provedor><option value="">Escolha…</option>${PROVEDORES.map(([n, h, p]) => `<option value="${h}|${p}" ${smtp.host === h ? 'selected' : ''}>${n}</option>`).join('')}<option value="|">Outro (preencho à mão)</option></select>`)}
        <div class="linha-2">${campo('Servidor', entrada('host', `value="${esc(smtp.host)}" placeholder="smtp.seuprovedor.com"`))}${campo('Porta', entrada('porta', `value="${esc(smtp.porta)}" inputmode="numeric"`))}</div>
        <div class="linha-2">${campo('E-mail (usuário)', entrada('usuario', `value="${esc(smtp.usuario)}" autocomplete="off" placeholder="contato@seudominio.com.br"`))}${campo('Senha', `<input name="senha" class="segredo" autocomplete="off" data-lpignore data-1p-ignore placeholder="${smtp.senha ? 'Guardada (digite outra para trocar)' : ''}">`)}</div>
        <div class="linha-2">${campo('Remetente', entrada('remetente', `value="${esc(smtp.remetente)}" placeholder="Criativos do Reino <contato@seusite.com.br>"`))}${campo('Endereço do app', entrada('appUrl', `value="${esc(smtp.appUrl)}" placeholder="https://app.seusite.com.br"`))}</div>
        <div class="botoes-form"><button class="botao pequeno">Salvar</button><button class="botao leve pequeno" name="acao" value="testar">Mandar o e-mail de boas-vindas para mim</button></div></form>`)}
      ${(() => { // Histórico de envios: cada e-mail que o app mandou, mais novo primeiro (sem rastrear se a pessoa abriu)
        const h = correio.resumoHistorico(30), envios = correio.historico(1000);
        const situacao = envios.length ? `${h.ok} enviados · ${h.erro} com erro (30 dias)` : 'Nenhum envio ainda';
        const linha = e => `<li class="eh-linha${e.ok ? '' : ' falhou'}"><span class="eh-quando">${esc(dataHora(e.em))}</span>
          <span class="eh-para"><b>${esc(e.nome || e.para)}</b>${e.nome ? `<small>${esc(e.para)}</small>` : ''}</span>
          <span class="eh-tipo">${esc(e.tipo)}</span>
          <span class="eh-sit">${e.ok ? `<span class="eh-ok">${icone('ok', 13)}Enviado</span>` : `<span class="eh-erro">Erro</span><small>${esc(e.erro)}</small>`}</span>
          <form method="post" action="/admin/configuracoes/historico/${e.id}/apagar" class="eh-apagar"><button class="link-discreto" title="Tirar esta linha do histórico">Apagar</button></form></li>`;
        return bloco('cfg-historico', 'Histórico de envios', !h.erro, situacao, `
        ${ajuda('O que aparece aqui', 'Todo e-mail que o app manda: login de quem compra, cadastro manual, aviso da mudança, "Esqueci minha senha" e testes. <b>Enviado</b> = o servidor de e-mail aceitou a mensagem. Se o endereço não existir, o aviso de devolução chega na caixa de entrada do e-mail do login.')}
        ${envios.length ? `<ul class="eh-lista" data-paginar="20">${envios.map(linha).join('')}</ul>${envios.length >= 1000 ? '<p class="adm-nota">Mostrando os 1.000 mais recentes.</p>' : ''}` : '<p class="adm-vazio">Nenhum e-mail enviado ainda.</p>'}
        <style>.eh-lista{display:grid;gap:0;margin:6px 0 0;padding:0;list-style:none;border:1px solid var(--borda);border-radius:12px;overflow:hidden}
          .eh-apagar{margin:0}.eh-apagar .link-discreto{font-size:12px;opacity:.6}.eh-apagar .link-discreto:hover{opacity:1}
          .eh-linha{display:grid;grid-template-columns:110px minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 14px;font-size:13px;border-top:1px solid var(--borda)}
          .eh-linha:first-child{border-top:0}.eh-quando{color:var(--t2);white-space:nowrap}.eh-para{display:grid;min-width:0}.eh-para b,.eh-para small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
          .eh-para small,.eh-sit small{color:var(--t3);font-size:12px}.eh-tipo{color:var(--t2)}.eh-sit{display:grid;min-width:0}.eh-sit small{overflow-wrap:anywhere}
          .eh-ok{display:inline-flex;align-items:center;gap:5px;color:#1e8e4e;font-weight:600}.eh-erro{color:var(--erro,#b3261e);font-weight:600}
          @media (max-width:720px){.eh-linha{grid-template-columns:1fr 1fr;gap:4px 12px}.eh-para{grid-column:1/-1;order:-1}}</style>`); })()}
      ${(() => { const v = aviso.resumo(), pct = v.total ? Math.round((v.ok / v.total) * 100) : 0;
        const situacao = v.rodando ? `Enviando · ${v.ok} de ${v.total}` : v.ok ? `Pausado · ${v.ok} de ${v.total}` : 'Não começou';
        return bloco('cfg-aviso', 'Aviso da mudança (membros antigos)', v.rodando, situacao, `
        ${ajuda('Como funciona', 'O e-mail "casa nova" para quem veio da área de membros antiga. Vai um por vez, com intervalo, e nunca duas vezes para a mesma pessoa. Pode pausar quando quiser: ao retomar, continua de quem ainda não recebeu.')}
        <div class="aviso-num"><span><b>${v.total}</b><small>vão receber</small></span><span><b>${v.ok}</b><small>enviados</small></span><span><b>${v.faltam}</b><small>faltam</small></span><span><b>${v.dia} / ${v.limite}</b><small>nas últimas 24 h</small></span><span><b>${v.falhas}</b><small>não deu</small></span></div>
        <div class="aviso-barra"><i style="width:${pct}%"></i></div>
        <p class="adm-nota">${v.rodando ? `Enviando: 1 e-mail a cada ~${v.intervalo} s, até ${v.limite} por dia.` : v.motivo ? `Parado: ${esc(v.motivo)}.` : 'Parado.'} No ritmo de ${v.limite} por dia, faltam cerca de <b>${v.dias} ${v.dias === 1 ? 'dia' : 'dias'}</b>.</p>
        ${v.ultimas.length ? `<details class="historico"><summary>Últimos erros</summary>${v.ultimas.map(x => `<small style="display:block">${esc(x.email)} · ${esc(x.erro)}</small>`).join('')}</details>` : ''}
        <form method="post" action="/admin/aviso-mudanca" class="form-dobra">
          <div class="linha-2">${campo('Intervalo entre e-mails (segundos)', entrada('intervalo', `value="${v.intervalo}" inputmode="numeric"`))}${campo('Máximo por 24 horas', entrada('limite', `value="${v.limite}" inputmode="numeric"`), 'a Hostinger grátis manda 300/dia')}</div>
          <div class="botoes-form">${v.rodando ? '<button class="botao leve pequeno" name="acao" value="pausar">Pausar o envio</button>' : `<button class="botao pequeno" name="acao" value="iniciar" ${v.faltam ? '' : 'disabled'}>${v.ok ? 'Retomar o envio' : 'Começar o envio'}</button>`}
            <button class="botao leve" name="acao" value="salvar">Salvar o ritmo</button><button class="botao leve" name="acao" value="teste">Mandar para mim (ver como chega)</button></div></form>`); })()}
</div></section>
      <script>(function(){var p=document.querySelector('[data-provedor]');if(!p)return;p.addEventListener('change',function(){var v=p.value.split('|'),f=p.form;if(!v[0])return;f.host.value=v[0];f.porta.value=v[1]})})()</script>`);
  });
  // Plataformas de venda (contas): criar, renomear, modo da Kiwify, tokens, trocar endereço, excluir
  const daConta = (req, res) => { const c = plataformas.conta(req.params.id); if (!c) res.redirect('/admin/configuracoes'); return c; };
  const paraConta = (res, c, ok) => voltar(res, `/admin/configuracoes#cfg-conta-${c.id}`, ok);
  r.post('/plataformas/nova', (req, res) => { try { const id = plataformas.criar(txt(req.body.plataforma), req.body.nome); voltar(res, `/admin/configuracoes#cfg-conta-${id}`, 'Plataforma adicionada.'); } catch (e) { falhar(res, '/admin/configuracoes', e.message); } });
  r.post('/plataformas/:id/nome', (req, res) => { const c = daConta(req, res); if (c) { plataformas.renomear(c.id, req.body.nome); paraConta(res, c, 'Nome salvo.'); } });
  r.post('/plataformas/:id/modo', (req, res) => { const c = daConta(req, res); if (c) { plataformas.modo(c.id, req.body.modo); paraConta(res, c, 'Salvo.'); } });
  r.post('/plataformas/:id/token', (req, res) => { const c = daConta(req, res); if (c) { plataformas.gravarUnico(c.id, req.body.token); paraConta(res, c, 'Token salvo.'); } });
  r.post('/plataformas/:id/webhook/novo', (req, res) => { const c = daConta(req, res); if (c) { if (!txt(req.body.token)) return falhar(res, '/admin/configuracoes', 'Cole o token do webhook.'); plataformas.gravarProduto(c.id, { nome: req.body.nome, token: req.body.token }); paraConta(res, c, 'Webhook adicionado.'); } });
  r.post('/plataformas/:id/webhook/:wid', (req, res) => { const c = daConta(req, res); if (!c) return;
    if (req.body.acao === 'tirar') plataformas.tirarWebhook(c.id, req.params.wid); else plataformas.gravarProduto(c.id, { id: req.params.wid, nome: req.body.nome, token: req.body.token });
    paraConta(res, c, req.body.acao === 'tirar' ? 'Webhook tirado.' : 'Salvo.'); });
  r.post('/plataformas/:id/segredo', (req, res) => { const c = daConta(req, res); if (c) { plataformas.trocarSegredo(c.id); avisar(res, `/admin/configuracoes#cfg-conta-${c.id}`, 'Endereço trocado: cole o novo na plataforma.'); } });
  r.post('/plataformas/:id/excluir', (req, res) => { const c = daConta(req, res); if (c) { plataformas.excluir(c.id); voltar(res, '/admin/configuracoes', 'Plataforma excluída.'); } });
  r.post('/configuracoes/webhook', (req, res) => {
    if (req.body.acao === 'novo-segredo') { acesso.novoSegredo(); return avisar(res, '/admin/configuracoes', 'Endereço trocado: cole os novos na Kiwify e na Hotmart.'); }
    if (txt(req.body.kiwify_token)) acesso.gravar('kiwify_token', txt(req.body.kiwify_token));
    if (txt(req.body.hotmart_hottok)) acesso.gravar('hotmart_hottok', txt(req.body.hotmart_hottok));
    voltar(res, '/admin/configuracoes', 'Salvo.');
  });
  r.post('/configuracoes/senha', (req, res) => {
    const s = String(req.body.senha_padrao || '').trim();
    if (s && s.length < 6) return falhar(res, '/admin/configuracoes', 'A senha padrão precisa ter pelo menos 6 caracteres.');
    acesso.gravar('senha_padrao', s);
    voltar(res, '/admin/configuracoes', s ? 'Senha padrão salva.' : 'Senha padrão apagada: cada conta nova recebe uma senha sorteada.');
  });
  r.post('/aviso-mudanca', async (req, res) => {
    const acao = req.body.acao, volta = '/admin/configuracoes#cfg-aviso';
    aviso.configurar({ intervalo: req.body.intervalo, limite: req.body.limite });
    if (acao === 'iniciar') { aviso.iniciar(); return avisar(res, volta, 'Envio começou. Pode fechar a página: o servidor vai mandando sozinho.'); }
    if (acao === 'pausar') { aviso.pausar(); return avisar(res, volta, 'Envio pausado. Ao retomar, continua de quem ainda não recebeu.'); }
    if (acao === 'teste') { const t = await aviso.teste(req.usuario.email, req.usuario.nome); return t.ok ? avisar(res, volta, `Mandei para ${req.usuario.email}.`) : falhar(res, volta, `Não foi: ${t.erro}`); }
    avisar(res, volta, 'Ritmo salvo.');
  });
  r.post('/configuracoes/historico/:id/apagar', (req, res) => { correio.apagarDoHistorico(req.params.id); voltar(res, '/admin/configuracoes#cfg-historico', 'Linha tirada do histórico.'); });
  r.post('/configuracoes/email', async (req, res) => {
    correio.salvar(req.body);
    if (req.body.acao === 'testar') { const t = await correio.enviarLogin({ para: req.usuario.email, nome: req.usuario.nome, senha: contas.senhaPadrao() || 'exemplo123', tipo: 'Teste (boas-vindas)' }); return t.ok ? avisar(res, '/admin/configuracoes', `Teste enviado para ${req.usuario.email}.`) : falhar(res, '/admin/configuracoes', `O teste falhou: ${t.erro}`); }
    voltar(res, '/admin/configuracoes', 'E-mail salvo.');
  });
}

module.exports = { montar };
