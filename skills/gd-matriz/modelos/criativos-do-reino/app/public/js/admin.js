// Administrativo (navegador): abre as janelas de cadastro já preenchidas, envia imagens (reduzidas aqui antes de subir),
// monta a lista de materiais da aula e pede confirmação antes de excluir. Janela só fecha no X ou no Cancelar.
(function () {
  if (window.__admin) return; window.__admin = 1;
  var $ = function (s, el) { return (el || document).querySelector(s); };

  // Não fecha com Esc (para não perder o que foi digitado)
  document.querySelectorAll('dialog.janela-form, #j-confirmar').forEach(function (d) { d.addEventListener('cancel', function (e) { e.preventDefault(); }); });

  // Materiais da aula: uma linha por botão (nome + link)
  function linhaMaterial(caixa, m) {
    var l = document.createElement('div'); l.className = 'material-linha';
    l.innerHTML = '<input name="mat_nome[]" placeholder="Nome do botão (ex.: Arquivos do curso)" aria-label="Nome do material">' +
      '<input name="mat_url[]" placeholder="https://… (Drive, site)" aria-label="Link do material">' +
      '<button type="button" class="icone-btn perigo-ic" data-tirar-material aria-label="Tirar material" title="Tirar">✕</button>';
    l.children[0].value = (m && m.nome) || ''; l.children[1].value = (m && m.url) || '';
    caixa.appendChild(l);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mais-material]');
    if (b) { linhaMaterial($('[data-materiais]', b.closest('form'))); return; }
    var t = e.target.closest('[data-tirar-material]');
    if (t) t.closest('.material-linha').remove();
  });

  // Produto da venda (06/11/2026): "pelo ID do produto" ou "por oferta" (linhas oferta → grupo → prazo)
  function pvPrazo(cx) { var sel = $('select', cx), b = $('button', cx); $('span', b).textContent = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : 'Auto'; b.classList.toggle('tem', sel.value !== 'plataforma'); sel.hidden = true; b.hidden = false; }
  function pvLinha(lista, o) {
    var t = document.getElementById('t-pv-linha'); if (!t || !lista) return null;
    var l = t.content.firstElementChild.cloneNode(true); o = o || {};
    $('input', l).value = o.oferta || ''; $('[name="of_codigo[]"]', l).value = o.codigo || ''; $('select[name="of_grupo[]"]', l).value = o.grupo_id ? String(o.grupo_id) : '';
    $('select[name="of_prazo[]"]', l).value = o.prazo || 'plataforma'; pvPrazo($('[data-pv-prazo]', l));
    lista.appendChild(l); return l;
  }
  function pvModo(form) {
    var r = form.querySelector('[data-pv-modo]:checked'), um = !!r && r.value === '1';
    if (!r) { var z = form.querySelector('[data-pv-modo][value="0"]'); if (z) z.checked = true; }
    form.querySelectorAll('[data-pv]').forEach(function (d) { d.hidden = d.dataset.pv !== (um ? '1' : '0'); });
    var lista = $('[data-pv-lista]', form); if (um && lista && !lista.children.length) pvLinha(lista);
  }
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-pv-modo]')) pvModo(e.target.form);
    var cx = e.target.closest('[data-pv-prazo]'); if (cx) pvPrazo(cx);
  });
  document.addEventListener('click', function (e) {
    var pb = e.target.closest('.pv-prazo-btn');
    if (pb) { var sel = $('select', pb.parentElement); pb.hidden = true; sel.hidden = false; sel.focus(); if (sel.showPicker) { try { sel.showPicker(); } catch (x) { /* nada */ } } return; }
    var pm = e.target.closest('[data-pv-mais]');
    if (pm) { var nl = pvLinha($('[data-pv-lista]', pm.closest('form'))); if (nl) $('input', nl).focus(); return; }
    var pt = e.target.closest('[data-pv-tirar]');
    if (pt) { pt.closest('.pv-linha').remove(); return; }
  });

  // Imagem: mostra a que já existe e troca pela enviada
  function mostrarImagem(caixa, url) {
    var img = $('img', caixa), vazio = $('.enviar-vazio', caixa);
    $('input[type=hidden]', caixa).value = url || '';
    img.hidden = !url; vazio.hidden = !!url;
    if (url) img.src = /\.wp\.com\//.test(url) ? url + '?w=600&ssl=1' : url;
  }
  // Reduz no navegador (lado maior até data-max) e manda como JPG; PNG pequeno vai como está (mantém o transparente)
  function reduzir(arquivo, max) {
    return new Promise(function (ok, erro) {
      if (arquivo.type === 'image/png' && arquivo.size < 1.5e6) return ok(arquivo);
      var img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = function () {
        var k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); c.toBlob(function (b) { b ? ok(b) : erro(); }, 'image/jpeg', 0.88);
      };
      img.onerror = function () { URL.revokeObjectURL(url); erro(); };
      img.src = url;
    });
  }
  document.addEventListener('change', function (e) {
    var input = e.target.closest('[data-enviar-img] input[type=file]');
    if (!input || !input.files[0]) return;
    var caixa = input.closest('[data-enviar-img]'), form = caixa.closest('form'), salvar = form.querySelectorAll('[type=submit]'), aviso = $('.enviando', caixa);
    aviso.hidden = false; salvar.forEach(function (s) { s.disabled = true; });
    reduzir(input.files[0], Number(caixa.dataset.max) || 1600)
      .then(function (blob) { return fetch('/admin/enviar', { method: 'POST', headers: { 'Content-Type': blob.type }, body: blob }); })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.url) throw new Error(j.erro); mostrarImagem(caixa, j.url); })
      .catch(function (x) { alert((x && x.message) || 'Não deu para enviar a imagem. Tente de novo.'); })
      .then(function () { aviso.hidden = true; input.value = ''; salvar.forEach(function (s) { s.disabled = false; }); });
  });

  // Foto de antes: "Nova pessoa" abre o mini cadastro; ao cadastrar, ela entra na lista já escolhida
  document.addEventListener('click', function (e) {
    var nova = e.target.closest('[data-nova-pessoa]');
    if (nova) { var f = $('[data-nova-pessoa-form]', nova.closest('form')); f.hidden = !f.hidden; return; }
    var salvar = e.target.closest('[data-salvar-pessoa]'); if (!salvar) return;
    var form = salvar.closest('[data-nova-pessoa-form]'), nome = $('[data-nome-pessoa]', form).value.trim(), foto = $('[data-foto-pessoa]', form).value;
    var cx = form.closest('[data-escolha-nova]'), url = cx ? cx.dataset.escolhaNova : '/admin/ia/antes', campo = cx ? cx.dataset.escolhaCampo : 'antes';
    if (!nome || !foto) { alert('Envie a imagem e escreva o nome.'); return; }
    salvar.disabled = true;
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ nome: nome, imagem: foto }) })
      .then(function (r) { return r.json(); })
      .then(function (p) {
        if (!p.id) throw new Error(p.erro);
        var l = document.createElement('label'); l.className = 'antes-op';
        l.innerHTML = '<input type="radio"><img alt=""><b></b>';
        l.querySelector('input').name = campo; l.querySelector('input').value = p.valor || p.imagem; l.querySelector('img').src = p.imagem; l.querySelector('b').textContent = p.nome;
        var lista = $('[data-antes-lista]', cx || form.closest('form')); lista.insertBefore(l, $('[data-nova-pessoa]', lista));
        l.querySelector('input').checked = true; form.hidden = true; $('[data-nome-pessoa]', form).value = '';
      })
      .catch(function (x) { alert((x && x.message) || 'Não deu para cadastrar. Tente de novo.'); })
      .then(function () { salvar.disabled = false; });
  });

  // Abrir uma janela de cadastro: action do formulário, campos preenchidos, Excluir só ao editar
  // Grupos do membro: "Marcar todos" e a caixinha de cada pasta; elas mostram "tudo", "nada" ou "alguns" (traço)
  // A mesma sanfona serve para os itens do grupo (data-campo="itens[]"); o padrão é "grupos[]" (janela do membro)
  function campoDe(cx) { return 'input[name="' + (cx.getAttribute('data-campo') || 'grupos[]') + '"]'; }
  function sincGrupos(cx) {
    var marca = function (chk, lista) { var n = lista.filter(function (i) { return i.checked; }).length; chk.checked = n > 0 && n === lista.length; chk.indeterminate = n > 0 && n < lista.length; };
    cx.querySelectorAll('[data-pasta]').forEach(function (p) { var l = [].slice.call(p.querySelectorAll(campoDe(cx))), n = l.filter(function (i) { return i.checked; }).length;
      marca($('[data-marcar-pasta]', p), l); $('[data-pasta-conta]', p).textContent = n ? n + ' de ' + l.length : String(l.length); });
    var todos = $('[data-marcar-todos]', cx); if (todos) marca(todos, [].slice.call(cx.querySelectorAll(campoDe(cx))));
  }
  document.addEventListener('change', function (e) {
    var cx = e.target.closest('[data-grupos]'); if (!cx) return;
    var alvo = e.target.matches('[data-marcar-todos]') ? cx : e.target.matches('[data-marcar-pasta]') ? e.target.closest('[data-pasta]') : null;
    if (alvo) alvo.querySelectorAll(campoDe(cx)).forEach(function (i) { i.checked = e.target.checked; });
    sincGrupos(cx);
  });
  // Prazo de cada grupo do membro: ícone do calendário; aberto mostra a data, quantos dias faltam e o último dia
  function vence(el) {
    var i = $('input[type=date]', el), info = $('[data-vence-info]', el), b = $('[data-vence-abre]', el), v = i.value;
    b.classList.toggle('tem', !!v); b.classList.toggle('mao', !!($('[data-vence-mao]', el) || {}).checked); info.classList.remove('fim');
    if (!v) { info.textContent = 'Sem prazo (até cancelar ou reembolsar)'; b.title = 'Prazo do acesso: sem prazo'; return; }
    var p = v.split('-'), fim = new Date(+p[0], +p[1] - 1, +p[2]), hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    var dias = Math.round((fim - hoje) / 864e5), dia = p[2] + '/' + p[1] + '/' + p[0];
    info.textContent = dias > 1 ? 'Faltam ' + dias + ' dias · termina em ' + dia : dias === 1 ? 'Falta 1 dia · termina amanhã (' + dia + ')' : dias === 0 ? 'Termina hoje (' + dia + ')' : 'Venceu há ' + (-dias) + (dias === -1 ? ' dia' : ' dias') + ' (' + dia + ')';
    if (dias < 0) info.classList.add('fim');
    b.title = 'Prazo do acesso: ' + info.textContent;
  }
  document.addEventListener('change', function (e) { if (e.target.matches('[data-vence-mao]')) vence(e.target.closest('[data-vence]')); });
  document.addEventListener('click', function (e) {
    var ab = e.target.closest('[data-vence-abre]'), li = e.target.closest('[data-vence-limpar]'), dentro = e.target.closest('[data-vence-pop]');
    document.querySelectorAll('[data-vence-pop]').forEach(function (p) { if (p !== dentro && (!ab || p.parentNode !== ab.parentNode)) p.hidden = true; });
    if (ab) { var pop = $('[data-vence-pop]', ab.parentNode); pop.hidden = !pop.hidden;
      if (!pop.hidden) { // abre ao lado do ícone; perto da borda da janela, vira para cima ou para a direita
        pop.classList.remove('acima', 'direita'); var cx = (ab.closest('.janela-corpo, form') || document.body).getBoundingClientRect(), r = pop.getBoundingClientRect();
        if (r.bottom > Math.min(cx.bottom, innerHeight) - 8) pop.classList.add('acima'); if (r.left < cx.left + 8) pop.classList.add('direita');
        $('input', pop).focus(); } }
    if (li) { var el = li.closest('[data-vence]'); $('input[type=date]', el).value = ''; $('[data-vence-mao]', el).checked = true; vence(el); $('[data-vence-pop]', el).hidden = true; }
  });
  document.addEventListener('input', function (e) { var el = e.target.closest('[data-vence]'); if (el && e.target.type === 'date') { vence(el); $('[data-vence-mao]', el).checked = true; var c = $('input[type=checkbox]', el); if (e.target.value && !c.checked) { c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); } } });
  // Funis do cabeçalho de Membros: abre um de cada vez; tocar fora fecha
  document.addEventListener('click', function (e) {
    var dentro = e.target.closest('[data-funil]');
    document.querySelectorAll('[data-funil][open]').forEach(function (d) { if (d !== dentro) d.open = false; });
  });
  // Pasta de grupos: abre e fecha ao tocar no nome
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pasta-abre]'); if (!b) return;
    var g = $('.marcar-grade', b.closest('[data-pasta]')), abre = g.hidden; g.hidden = !abre; b.setAttribute('aria-expanded', abre);
  });
  // Reloginho na linha do membro: abre uma janelinha com o histórico do que a pessoa vem acessando
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-historico]'); if (!b) return;
    var j = document.getElementById('j-historico'); if (!j) return;
    var t = function (s) { var x = document.createElement('span'); x.textContent = s == null ? '' : s; return x.innerHTML; };
    $('[data-hist-titulo]', j).textContent = 'Histórico · ' + (b.dataset.nome || '');
    $('[data-hist-ultimo]', j).innerHTML = 'Último acesso: <b>' + t(b.dataset.ultimo) + '</b>';
    var lista = $('[data-hist-lista]', j); lista.innerHTML = '<small>Carregando…</small>'; j.showModal();
    fetch(b.dataset.historico, { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (l) {
      if (!l.length) { lista.innerHTML = '<p class="adm-vazio">Nada ainda (a contagem começou em 30/10/2026).</p>'; return; }
      // Paginação: 15 por vez e "Carregar mais"
      var POR = 15, vis = POR;
      lista.innerHTML = '<ol class="hist-lista">' + l.map(function (a) {
        return '<li><small>' + t(a.q) + '</small><span>' + t(a.v) + ' <b>' + t(a.i) + '</b>' + (a.c ? ' <em>· ' + t(a.c) + '</em>' : '') + '</span></li>'; }).join('') + '</ol><div class="pag-mais"><button type="button" class="botao leve pequeno"></button></div>';
      var itens = [].slice.call(lista.querySelectorAll('.hist-lista li')), caixa = $('.pag-mais', lista), b2 = $('button', caixa);
      function mostrar() { itens.forEach(function (it, i) { it.hidden = i >= vis; }); var falta = itens.length - vis; b2.textContent = 'Carregar mais (' + Math.min(POR, falta) + ' de ' + falta + ')'; caixa.hidden = falta <= 0; }
      b2.addEventListener('click', function () { vis += POR; mostrar(); }); mostrar();
    }).catch(function () { lista.innerHTML = '<p class="adm-vazio">Não deu para carregar. Feche e abra de novo.</p>'; });
  });
  // Lista de membros: tocar em qualquer lugar da linha abre o membro
  document.addEventListener('click', function (e) {
    var l = e.target.closest('[data-linha-abre]'); if (!l || e.target.closest('button,a,input')) return;
    var b = $('[data-abrir]', l); if (b) b.click();
  });
  // Detalhe do membro: quando entrou, último acesso e o que fez por último
  // Detalhe do membro: entrou e último acesso; o passo a passo fica em "Histórico" (fechado, busca só ao abrir)
  function detalhe(el, d) {
    var t = function (s) { var x = document.createElement('span'); x.textContent = s == null ? '' : s; return x.innerHTML; };
    if (!d.entrou) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="datas"><div><span>Entrou em </span><b>' + t(d.entrou) + '</b></div><div><span>Último acesso: </span><b>' + t(d.ultimo) + '</b></div></div>' +
      (d.historico ? '<details class="historico"><summary>Histórico</summary><div data-hist><small>Carregando…</small></div></details>' : '');
    var h = $('details', el); if (!h) return;
    h.addEventListener('toggle', function () {
      if (!h.open || h.dataset.lido) return; h.dataset.lido = '1';
      fetch(d.historico, { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (l) {
        $('[data-hist]', h).innerHTML = l.length ? '<ol>' + l.map(function (a) {
          return '<li><small>' + t(a.q) + '</small><span>' + t(a.t) + (a.n ? ': <b>' + t(a.n) + '</b>' : '') + (a.d ? ' (' + t(a.d) + ')' : '') + '</span></li>'; }).join('') + '</ol>'
          : '<small>Nada ainda (a contagem começou em 30/10/2026).</small>';
      }).catch(function () { $('[data-hist]', h).innerHTML = '<small>Não deu para carregar. Feche e abra de novo.</small>'; delete h.dataset.lido; });
    });
  }
  function abrir(botao) {
    var j = document.getElementById(botao.dataset.abrir); if (!j) return;
    var form = $('form', j), dados = {};
    try { dados = JSON.parse(botao.dataset.dados || '{}'); } catch (x) { dados = {}; }
    if (form && botao.dataset.acao) {
      form.reset(); form.action = botao.dataset.acao;
      form.querySelectorAll('input[name], select[name], textarea[name]').forEach(function (c) {
        if (c.type === 'file') return;
        if (c.name.slice(-2) === '[]') { if (c.type === 'checkbox') c.checked = (dados[c.name.slice(0, -2)] || []).map(String).indexOf(c.value) >= 0; return; }
        var v = dados[c.name];
        if (c.type === 'radio') { c.checked = v !== undefined && c.value === String(v); return; }
        if (c.type === 'checkbox') c.checked = !!v && v !== '0';
        else if (v !== undefined && v !== null) c.value = v;
        else if (c.type !== 'hidden' || c.name !== 'area') c.value = c.tagName === 'SELECT' ? (c.options[0] ? c.options[0].value : '') : '';
      });
      form.querySelectorAll('[data-enviar-img]').forEach(function (cx) { var h = $('input[type=hidden]', cx); mostrarImagem(cx, h.name ? dados[h.name] || '' : ''); });
      // Thumbnail do vídeo: sem thumbnail própria, já começa com a capa do curso (a pessoa troca ou exclui se quiser)
      var th = form.querySelector('#j-thumb [data-enviar-img]'); if (th && !dados.thumb && dados.capa) mostrarImagem(th, dados.capa);
      var tp = form.querySelector('[data-thumb-pos]'); if (tp) { tp.value = dados.thumb_pos != null ? dados.thumb_pos : 50; posThumb(tp); }
      form.querySelectorAll('[data-venda]').forEach(function (d) { d.open = !!dados.link_venda; });
      form.querySelectorAll('[data-grupos]').forEach(function (cx) { sincGrupos(cx); cx.querySelectorAll('[data-pasta]').forEach(function (p) { $('.marcar-grade', p).hidden = true; $('[data-pasta-abre]', p).setAttribute('aria-expanded', 'false'); }); });
      form.querySelectorAll('[data-atividade]').forEach(function (el) { detalhe(el, dados); });
      form.querySelectorAll('[data-origem-info]').forEach(function (el) { var t = function (s) { var x = document.createElement('span'); x.textContent = s || ''; return x.innerHTML; };
        $('div', el).innerHTML = dados.origem ? '<span class="plat ' + t(dados.origem_classe) + '">' + t(dados.origem) + '</span>' + (dados.adicionado ? '<span class="m-quem-add">por <b>' + t(dados.adicionado) + '</b></span>' : '') : ''; });
      form.querySelectorAll('[data-vence]').forEach(function (el) { $('[data-vence-pop]', el).hidden = true; vence(el); });
      var np = $('[data-nova-pessoa-form]', form); if (np) np.hidden = true;
      var mats = $('[data-materiais]', form);
      if (mats) { mats.innerHTML = ''; (dados.materiais || []).forEach(function (m) { linhaMaterial(mats, m); }); }
      var pvl = $('[data-pv-lista]', form);
      if (pvl) { pvl.innerHTML = ''; (dados.ofertas || []).forEach(function (o) { pvLinha(pvl, o); }); form.querySelectorAll('[data-pv-prazo]').forEach(function (cx) { if (!cx.closest('.pv-lista')) pvPrazo(cx); }); pvModo(form); }
      var editando = !!botao.dataset.excluir, titulo = $('[data-titulo-janela]', j);
      if (titulo) titulo.textContent = (editando ? 'Editar ' : (titulo.dataset.nova || 'Novo') + ' ') + titulo.dataset.tituloJanela.toLowerCase();
      var ex = $('[data-excluir-btn]', j); if (ex) { ex.hidden = !editando; ex.dataset.url = botao.dataset.excluir || ''; }
      j.querySelectorAll('[data-so-nova]').forEach(function (x) { x.hidden = editando; });
      j.querySelectorAll('[data-so-edicao]').forEach(function (x) { x.hidden = !editando; });
      j.querySelectorAll('[data-marcar-todos]').forEach(atualizarTodos);
    }
    j.showModal();
    var primeiro = form && form.querySelector('input:not([type=hidden]):not([type=file]), select, textarea'); if (primeiro) primeiro.focus();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-abrir]'); if (b) { e.preventDefault(); abrir(b); return; }
    var ex = e.target.closest('[data-excluir-btn]');
    if (ex) { var c = document.getElementById('j-confirmar'); $('form', c).action = ex.dataset.url; ex.closest('dialog').close(); c.showModal(); }
  });
  var ja = document.querySelector('[data-abrir-ja]'); if (ja) abrir(ja);
  // Arrastar para mudar a ordem: segura a alça, o item "levanta" e segue o mouse/dedo; o lugar dele vira o espaço
  // tracejado, que anda pela lista; ao soltar, encaixa ali e a ordem é salva na hora (sem recarregar)
  var arr = null;
  function avisoOrdem(t) { var a = document.querySelector('.aviso-ordem') || document.body.appendChild(Object.assign(document.createElement('div'), { className: 'aviso-ordem' })); a.textContent = t; a.hidden = false; clearTimeout(a._t); a._t = setTimeout(function () { a.hidden = true; }, 1600); }
  document.addEventListener('pointerdown', function (e) {
    var alca = e.target.closest('[data-alca]'); if (!alca || e.button > 0) return;
    var item = alca.closest('[data-id]'), lista = item && item.parentElement;
    if (!lista || !lista.closest('[data-ordenar]') || lista.getAttribute('data-ordenar') === null) return;
    e.preventDefault();
    var r = item.getBoundingClientRect(), f = item.cloneNode(true);
    f.classList.add('fantasma-arraste'); f.style.width = r.width + 'px'; f.style.height = r.height + 'px'; f.style.left = r.left + 'px'; f.style.top = r.top + 'px';
    document.body.appendChild(f); item.classList.add('arrastando-origem'); document.body.classList.add('arrastando');
    var cols = getComputedStyle(lista).display === 'grid' && getComputedStyle(lista).gridTemplateColumns.split(' ').length > 1;
    arr = { item: item, lista: lista, f: f, dx: e.clientX - r.left, dy: e.clientY - r.top, cols: cols, antes: [].map.call(lista.children, function (x) { return x.dataset.id; }).join() };
  });
  document.addEventListener('pointermove', function (e) {
    if (!arr) return;
    arr.f.style.left = (e.clientX - arr.dx) + 'px'; arr.f.style.top = (e.clientY - arr.dy) + 'px';
    if (e.clientY < 70) scrollBy(0, -12); else if (e.clientY > innerHeight - 70) scrollBy(0, 12);
    var irmaos = [].filter.call(arr.lista.children, function (x) { return x !== arr.item && x.dataset && x.dataset.id; });
    var alvo = null, depois = false;
    irmaos.forEach(function (x) { var q = x.getBoundingClientRect();
      if (e.clientX >= q.left && e.clientX <= q.right && e.clientY >= q.top && e.clientY <= q.bottom) { alvo = x; depois = arr.cols ? e.clientX > q.left + q.width / 2 : e.clientY > q.top + q.height / 2; } });
    if (alvo) arr.lista.insertBefore(arr.item, depois ? alvo.nextSibling : alvo);
  });
  function soltar() {
    if (!arr) return; var a = arr; arr = null;
    a.f.remove(); a.item.classList.remove('arrastando-origem'); document.body.classList.remove('arrastando');
    var ids = [].filter.call(a.lista.children, function (x) { return x.dataset && x.dataset.id; }).map(function (x) { return x.dataset.id; });
    if (ids.join() === a.antes) return;
    fetch('/admin/ordem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tabela: a.lista.getAttribute('data-ordenar'), ids: ids }) })
      .then(function (r) { if (!r.ok) throw 0; avisoOrdem('Ordem salva.'); })
      .catch(function () { avisoOrdem('Não deu para salvar a ordem. Recarregando…'); setTimeout(function () { location.reload(); }, 1200); });
  }
  document.addEventListener('pointerup', soltar); document.addEventListener('pointercancel', soltar);
  // "Marcar todos" de cada seção (grupos): marca/desmarca a seção e mostra o meio-termo
  function atualizarTodos(t) { var cx = t.closest('fieldset').querySelectorAll('input[name$="[]"]'), n = 0; cx.forEach(function (c) { if (c.checked) n++; }); t.checked = n === cx.length && n > 0; t.indeterminate = n > 0 && n < cx.length; }
  document.addEventListener('change', function (e) {
    var t = e.target.closest('[data-marcar-todos]');
    if (t) { t.closest('fieldset').querySelectorAll('input[name$="[]"]').forEach(function (c) { c.checked = t.checked; }); return; }
    var f = e.target.closest('fieldset'); if (f) { var tt = f.querySelector('[data-marcar-todos]'); if (tt) atualizarTodos(tt); }
  });
  // Olhinho: mostra/esconde o endereço do webhook
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-mostrar]'); if (b) b.parentNode.querySelector('input').classList.toggle('segredo'); });
  // Thumbnail: a imagem preenche o quadro 16:9 (corta só a visualização) e sobe/desce pela barrinha ou arrastando
  function posThumb(r) { var img = r.closest('dialog').querySelector('[data-enviar-img] img'); if (img) img.style.objectPosition = '50% ' + r.value + '%'; }
  document.addEventListener('input', function (e) { if (e.target.matches('[data-thumb-pos]')) posThumb(e.target); });
  document.addEventListener('pointerdown', function (e) {
    var cx = e.target.closest('#j-thumb [data-enviar-img]'); if (!cx || $('img', cx).hidden) return;
    var r = cx.closest('dialog').querySelector('[data-thumb-pos]'), y0 = e.clientY, v0 = Number(r.value), h = cx.getBoundingClientRect().height;
    e.preventDefault(); cx.classList.add('arrastando');
    function mover(ev) { r.value = Math.min(100, Math.max(0, Math.round(v0 - (ev.clientY - y0) / h * 100))); posThumb(r); }
    function soltar() { cx.classList.remove('arrastando'); removeEventListener('pointermove', mover); removeEventListener('pointerup', soltar); }
    addEventListener('pointermove', mover); addEventListener('pointerup', soltar);
  });
  // Janela da thumbnail: Trocar abre o seletor de arquivo; Excluir tira a imagem (o vídeo volta a usar a capa)
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-thumb-trocar], [data-thumb-excluir]'); if (!t) return;
    var cx = t.closest('dialog').querySelector('[data-enviar-img]');
    if (t.hasAttribute('data-thumb-trocar')) $('input[type=file]', cx).click(); else mostrarImagem(cx, '');
  });
  // Paginação "Carregar mais" (regra GD: lista grande nunca aparece inteira): [data-paginar="N"] mostra N itens e o botão abre mais N
  document.querySelectorAll('[data-paginar]').forEach(function (lista) {
    var n = Number(lista.getAttribute('data-paginar')) || 20, itens = [].slice.call(lista.children), vis = n;
    if (itens.length <= n) return;
    var caixa = document.createElement('div'); caixa.className = 'pag-mais';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'botao leve pequeno'; caixa.appendChild(b);
    function mostrar() { itens.forEach(function (it, i) { it.hidden = i >= vis; }); var falta = itens.length - vis;
      b.textContent = 'Carregar mais (' + Math.min(n, falta) + ' de ' + falta + ')'; caixa.hidden = falta <= 0; }
    b.addEventListener('click', function () { vis += n; mostrar(); });
    lista.parentNode.insertBefore(caixa, lista.nextSibling); mostrar();
  });
  // Blocos recolhidos: SEMPRE vêm fechados ao carregar a página (pedido do dono, 09/11/2026); não lembram o que estava aberto
  // Copiar (endereços do webhook)
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copiar]'); if (!b) return;
    var el = b.querySelector('span') || b.lastChild; var feito = function () { var t = el.textContent; el.textContent = 'Copiado!'; setTimeout(function () { el.textContent = t; }, 1800); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(b.dataset.copiar).then(feito);
    else { var i = b.parentNode.querySelector('input'); i.select(); document.execCommand('copy'); feito(); }
  });
  // Mensagem de "salvo" aparece uma vez: tira o ?ok= do endereço
  if (/[?&](ok|erro)=/.test(location.search)) { var u = new URL(location.href); u.searchParams.delete('ok'); u.searchParams.delete('erro'); u.searchParams.delete('nova'); history.replaceState(null, '', u); }
})();
