---
name: gd-acesso-membros
description: Como montar a área administrativa de acesso dos apps do Nilton (Kit Gospel, Afilic, Zap.Afilic, Pixel.Afilic e os próximos) — membros, grupos de acesso, produtos da Hotmart/Kiwify que liberam grupos, liberação manual, prazo/renovação, bloqueio por reembolso, e avisos (push) para os membros. Use sempre que for criar ou mexer em login de cliente, "quem pode ver o quê", tela de Membros, Grupos e produtos, liberar alguém manualmente, webhook que cria conta, ou notificação para os usuários do app.
---

# Acesso de membros: quem entra e o que cada um vê

Todos os apps do Nilton vendem acesso a ferramentas. A pessoa entra de **dois jeitos**: o Nilton cadastra
manualmente, ou ela compra um infoproduto (Hotmart ou Kiwify) e o webhook libera sozinho. Os dois caminhos
caem **no mesmo lugar**: um membro em um ou mais **grupos**, e cada grupo libera **módulos** do app.

A leitura do aviso de venda (Pix × boleto, reembolso, order bump, produto pelo ID, nome no padrão…) é da skill
`gd-vendas-infoproduto`. Esta skill começa depois: com a venda já entendida, **o que muda no acesso da pessoa**.

## Decisões do Nilton (17/10/2026)

- **Cada app tem a própria administração**, separada (como o Pixel.Afilic hoje). Não existe painel central nem
  login único entre apps. Esta skill é o **molde**: todo app novo já nasce com admin + membros + grupos +
  produtos alinhados; o Nilton só entra no administrativo e configura os produtos.
- **Ver como membro:** o admin abre o app como o aluno vê pelo item **"Ver como membro"** na última seção do menu lateral
  ("Conta") e volta por **"Ver como admin"** no mesmo lugar (decisão de 09/11/2026; apps com projetos ainda podem ter a
  faixa "Você está vendo <projeto> como o usuário vê" + "Voltar ao administrativo"). O Nilton testa sempre na própria base, sem criar conta de
  teste. Modelo pronto no Pixel.Afilic (veja abaixo).
- **Pedido de reembolso tira o acesso na hora** (como o Kit Gospel). Se o pedido não virar reembolso, o admin
  devolve o acesso manualmente (pôr de novo no grupo).

## Projetos: os do administrador e os dos clientes (decisão do Nilton, 17/10/2026)

- O administrador vê e abre ("Ver como usuário") **só os projetos que ele criou**. Projeto criado por um cliente é
  **só do cliente**: não aparece em Projetos, não dá para entrar nem compartilhar (mais seguro; nada de ler as
  conversas dos clientes).
- Os projetos do administrador podem ser **liberados** para pessoas: em Projetos → **Editar** (nome + "Quem tem
  acesso") ou em Usuários → Editar → "Projetos seus compartilhados com ele".
- O cliente **renomeia os projetos que ele criou** em Minha conta → Projetos ("Renomear", janela com o nome); os
  liberados pelo administrador mantêm o nome que o administrador deu (pedido do Nilton, 17/10/2026; Pixel:
  `POST /conta/projetos/:id/nome`; Zap: `renameOwnProject` em `src/app/(gestao)/conta/actions.ts`, botão no bloco
  Projetos do Meu perfil, `src/app/(app)/perfil/projects-card.tsx`).
- **Testadores** (decisão do Nilton, 17/10/2026): quem o administrador cadastra à mão (origem `manual`) ajuda a
  melhorar o app, então os projetos dele aparecem para o administrador em **"Projetos dos testadores"** (só "Ver como
  usuário"; não se compartilham). Quem comprou (hotmart/kiwify) tem os projetos só para si. Zap: `TESTER_ORGS` /
  `ADMIN_SEES`; Pixel: `projetosDosTestadores` / `adminVe` em `src/contas.js`.
- **Projeto do administrador compartilhado:** a pessoa vê os números (Resumo, Meta, campanhas), webhooks, pixel e
  páginas, mas **não a conexão do Facebook** do administrador (perfil, contas de anúncio, adicionar/desconectar,
  aba Anúncios), bloqueado também no servidor. No projeto dela, ela conecta o próprio Facebook. Pixel:
  `semFacebook` em `src/plataforma.js` (17/10/2026).
- Cada projeto liberado **soma 1 no limite** da pessoa. Usuários mostra uma coluna só, **Projetos "X de Y"** (X = os
  que tem, os dela + os liberados; Y = limite do plano + os liberados). Criar continua contando só os dela.
- Bloquear **no servidor** também (não só esconder): "Ver como usuário", Editar e compartilhar recusam projeto de
  cliente; ao compartilhar, mexa só nos projetos do administrador e deixe os outros acessos da pessoa como estão.
- Implementado no Zap.Afilic (`ADMIN_ORGS` em `src/lib/access.ts`) e no Pixel.Afilic (17/10/2026: `projetosDoAdmin`,
  `doAdmin`, `compartilhar`, `definirPessoas`, `contagem` em `src/contas.js`; telas em `src/plataforma.js`; testes no
  fim de `test/plataforma.test.js`).

## O que todo app novo já traz

1. Login por e-mail e senha; admin definido pelo ambiente (`ADMIN_EMAIL` / senha), recriado a cada deploy.
2. Administrativo separado do app: o admin, ao entrar, vê só o administrativo; o app só pelo **Ver como membro**
   na seção CONTA do menu lateral, e volta por "Ver como admin" no mesmo lugar (apps com projetos: sessão "vendo como"
   com faixa no topo e botão Voltar).
3. Telas Membros, Grupos e produtos, Avisos e Configurações (webhook com token, e-mail, endereço do app).
4. Webhook Hotmart/Kiwify lido pela `gd-vendas-infoproduto` e aplicado pelas regras abaixo.
5. App instalável com notificações (push) e, no administrativo, a tela **Notificações**:
   - **manual** (sempre): o Nilton escreve uma mensagem padrão dele e manda para os membros, com `{{nome}}` /
     `{{primeiro_nome}}`, histórico de envios e quantos receberam;
   - **automáticas programadas** (opcional, cada app a sua): ex. Pixel.Afilic 3 por dia com o lucro do dia até
     aquele momento (8h, 14h, 20h); Afilic 1 por dia com a comissão de ontem por conta Shopee;
   - **por acontecimento** (opcional): ex. Pixel.Afilic "venda aprovada", "reembolso", "problema no envio", cada
     aparelho escolhe quais quer.
   Detalhes em `referencias/avisos-push.md`.

## Pergunte antes de construir (app novo ou app ganhando o administrativo)

Não decida sozinho — pergunte ao Nilton (AskUserQuestion) e só depois monte:

1. **Módulos:** quais partes do app são vendidas separadas (viram as caixas dos grupos)?
2. **Notificação automática programada:** o app terá? Se sim, **qual**: o que diz (título e texto com as
   variáveis do app, ex. "Seu lucro até agora: {{lucro}}"), **em quais horários** (fuso America/Sao_Paulo), para
   quem (todos os membros ativos / só quem ativou) e se o membro pode desligar ou trocar o horário.
3. **Notificação por acontecimento:** quais acontecimentos avisam (venda, reembolso, erro…) e quais já vêm
   ligados.
4. **Prazo padrão** quando o produto não diz (anual, mensal, vitalício).

## O modelo (a "escada")

```
Produto da plataforma ──libera──▶ Grupo ──libera──▶ Módulos do app
   (ID Hotmart/Kiwify)            (ex.: Cartazes)     (cartaz, carrossel, poses…)
Membro ──está em──▶ 1 ou mais grupos  →  vê a SOMA dos módulos de todos os grupos dele
```

- **Módulo** = uma parte vendável do app, definida no código (lista fixa com chave, nome e ícone).
  Kit Gospel: `cartaz`, `carrossel`, `poses`. Afilic: `results` (relatórios), `growth` (crescimento).
- **Grupo** = um pacote de módulos, criado e editado pelo admin na tela. Mudou o grupo, muda na hora para todos
  os membros dele (o acesso é calculado na hora, nunca copiado para o membro).
- **Escada:** comprar mais sobe o degrau sem perder o que já tinha. Comprou Cartazes → grupo Cartazes. Depois
  comprou Carrosséis → entra também no grupo Carrosséis e passa a ver os dois. "Acesso completo"/"Combo" é só um
  grupo com todos os módulos. Reembolso de um produto **desce só aquele degrau** (sai daquele grupo); se não
  sobrar grupo nenhum, a conta fica bloqueada.
- **Grupo padrão:** produto que chegou e ainda não foi vinculado cai nele — nenhuma venda fica sem acesso. O
  admin vê o produto em "Produtos que já chegaram pelo webhook" e vincula com um toque.
- **Admin** vê tudo e nunca é bloqueado nem mexido por webhook.

## Tabelas (nomes do Kit Gospel; adapte a linguagem do app)

| Tabela | Campos que importam |
|---|---|
| `users` | email (único, sem diferenciar maiúsculas), nome, telefone, `role` member/admin, `plan` mensal/anual/vitalicio, `expires_at` (vazio = vitalício), `active`, `source` manual/gateway, `must_change_password` |
| `access_groups` | nome, `modules` (lista de chaves), `is_default` |
| `user_groups` | user_id + group_id (chave dupla), quando entrou |
| `gateway_products` | apelido, **ID do produto na plataforma**, grupo que libera, prazo (vazio = automático) |
| `webhook_logs` | evento, e-mail, produto, resultado em texto ("conta criada (anual) · Cartazes"), corpo bruto |

## Regras de ouro

1. **Pode ver?** = conta ativa **e** (admin **ou** sem vencimento **ou** vencimento no futuro) **e** o módulo
   está em algum grupo dele. Confira no servidor em toda rota do módulo, não só escondendo o botão.
2. **Vincule pelo ID do produto** (e o código da oferta quando a mesma página vende planos diferentes). Trecho
   do nome só como último recurso: o produtor renomeia (veja `gd-vendas-infoproduto`, regra 4).
3. **Compra aprovada:**
   - conta não existe → cria com senha aleatória, `must_change_password = 1`, coloca nos grupos e manda o login
     por e-mail (e WhatsApp, quando o app tiver);
   - já existe e **entrou num grupo novo** → garante o prazo, sem somar (`MAX(vencimento, hoje + prazo)`);
   - já existe e **já estava no grupo** (renovação) → soma o prazo em cima do vencimento;
   - admin comprando → não mexe em nada.
4. **Prazo é do plano, não do produto** (decisão do Nilton, 17/10/2026). Cada plano tem: **Assinatura** (padrão:
   sem data, vale até a plataforma avisar o cancelamento), **Mensal** (31 dias), **Anual** (365 dias) ou
   **Vitalício**. Com prazo, a validade fica em cada pessoa-no-plano (`expira_em`): nova compra/renovação soma o
   prazo; plano vencido não conta; sem nenhum plano válido a pessoa não entra ("Seu plano venceu"). O Kit Gospel
   antigo ainda adivinha pelo nome ("mensal"/"vitalício"); nos apps novos, use o prazo do plano.
5. **Pedido de reembolso, reembolso, chargeback** → sai na hora só do grupo daquele produto (decisão do Nilton:
   não espera o reembolso confirmar); sem grupo sobrando → `active = 0` e derruba as sessões. O log diz qual
   foi o motivo, para o admin poder devolver o acesso se o pedido for desistido.
6. **Idempotência:** o mesmo pagamento chega mais de uma vez (Greenn sempre; Hotmart às vezes). Cada transação
   libera uma vez só — guarde a referência da venda no log e confira antes.
7. **Liberação manual** usa as mesmas funções do webhook (pôr no grupo, dar prazo). Na tela: e-mail, nome,
   grupos (caixas), plano, "enviar login por e-mail". Mostre a senha gerada uma vez, na própria mensagem.
8. **Nome no padrão** ("VIVIANE DE OLIVEIRA" → "Viviane de Oliveira") ao criar a conta e antes de usar
   `{{nome}}`/`{{primeiro_nome}}` em avisos — regra 9 da `gd-vendas-infoproduto`.
9. **Nome e e-mail editáveis** (pelo administrador em Usuários → Editar e pela própria pessoa em Minha conta), também
   de quem veio da plataforma. O nome é livre (o webhook só usa na criação). O e-mail tem um cuidado: o webhook acha a
   conta pelo e-mail; na primeira troca de quem comprou, guarde o **e-mail da compra** (`email_compra`) e procure pelos
   dois, senão a renovação cria outra conta e o reembolso não tira o acesso (Pixel.Afilic `porEmailDaCompra`, 18/10/2026).
10. **Tudo explicado na tela:** cada linha do log diz o que aconteceu em português ("saiu do grupo Cartazes,
   continua com os outros"). O Nilton confere por ali, não pelo banco.

11. **Prazo automático pela venda** (padrão desde 06/11/2026, Criativos do Reino): assinatura vale até a **próxima
   cobrança** que vem no aviso (Kiwify `Subscription.next_payment`, texto em Brasília; Hotmart `purchase.date_next_charge`,
   ms) **+ 3 dias de folga** (a plataforma tenta cobrar de novo); a renovação traz a data nova e estende. Sem próxima
   cobrança = compra única = sem prazo. Mensal/Anual/Vitalício ficam só para forçar prazo fixo. Renovação nunca põe
   data em quem já está sem prazo.
12. **Assinatura cancelada não corta o que já foi pago:** se o grupo tem vencimento no futuro, a pessoa fica até essa
   data e só não renova; reembolso e chargeback tiram na hora.
13. **Grupo definido à mão** (`origem = 'manual'`, caixinha "À mão" no prazo do grupo; liga sozinha quando o admin
   muda a data ou adiciona o grupo): aviso da plataforma não tira nem muda esse grupo.

## Plataformas de venda como contas (pedido do Nilton, 06/11/2026; feito no Criativos do Reino)

- Em Configurações não aparecem Kiwify e Hotmart fixas: há **"+ Adicionar plataforma"** → escolhe a plataforma e dá um
  nome ("Kiwify - Zyver Hub"). Pode haver **várias contas da mesma plataforma** (CNPJs/contas diferentes mandando membros
  para a mesma área). Cada conta: nome editável, **endereço próprio** `/webhook/<plataforma>/<segredo da conta>`
  (olhinho + Copiar, "Trocar endereço" com confirmação), "Excluir".
- **Kiwify:** escolha "**Um webhook para todos os produtos**" (um token) ou "**Um webhook por produto**" (lista: nome do
  produto + token de cada webhook; a Kiwify dá um token por webhook). Aceita o aviso cuja assinatura HMAC bater com
  qualquer token do modo escolhido; na troca de modo, enquanto o novo não tem token, valem os do outro. Marca o último
  aviso de cada webhook e da conta. Hotmart: o hottok da conta.
- A tela mostra um **"Como configurar na <plataforma>" recolhido** (`ajuda()`), com uma frase: onde clicar e **só os
  eventos a marcar**, na ordem da tela da plataforma (regra 10 da `gd-vendas-infoproduto`). Nada de lista inteira com ✓.
  Hotmart (área de membros): Compra aprovada, Compra completa, Reembolso, Chargeback, **Pedido de reembolso** e
  Cancelamento de assinatura. O Pedido de reembolso tira o acesso já no pedido; o Criativos do Reino ficou sem ele na tela
  até 09/11/2026.
- Sem token cadastrado o aviso é **recusado** e aparece no registro com o motivo (não aceita aviso sem conferir).
- Os produtos da tela aparecem **em blocos por conta** ("Zyver Hub · Kiwify · 12 produtos"), recolhidos.
- Código: `src/plataformas.js`, tabelas `plataforma_contas` e `plataforma_webhooks`, rota em `src/app.js`, tela em
  `src/painel/admin-acesso.js` (Configurações). Quem tinha o jeito antigo (um endereço só) vira a primeira conta, com o
  mesmo endereço.

## Produto da venda: um cadastro por produto, pelo ID ou por oferta (06/11/2026, Criativos do Reino)

- Um cadastro por **produto da plataforma** (nome + conta + ID). Nunca vários cadastros soltos para o mesmo produto.
- **Libera:** "Pelo ID do produto" (qualquer oferta → um grupo + prazo) **ou** "Por oferta" (linhas: **nome da oferta**
  + **código do checkout** + grupo + prazo; "+ Adicionar oferta", ✕ para tirar). Por oferta só libera se o produto **e** a
  oferta baterem (nome **ou** código); oferta fora da lista não libera nada (nem o grupo padrão) e vira "Vendas sem cadastro".
- **Código do checkout** = o fim do link `pay.kiwify.com.br/<código>`; aceita colar o link inteiro. Na assinatura da
  Kiwify o nome da oferta vem vazio: o app bate pelo plano (`Subscription.plan.name`) ou pelo código (`checkout_link`).
- **Prazo atrás do calendário** em cada linha (padrão Automático; ao clicar, Mensal/Anual/Vitalício).
- Tabelas: `produtos_venda` (nome, plataforma, produto_id, conta_id, por_oferta) e `ofertas` (linhas: oferta, `link` =
  código, grupo, prazo, `produto_venda_id`). Ofertas antigas do mesmo produto se juntam sozinhas ao ligar.
- **Registro de vendas** ("Últimas vendas recebidas"): cada linha mostra produto + oferta + plano + código que chegaram,
  link **"ver o aviso"** (JSON bruto em `/admin/avisos-venda/:id`) e, se não liberou por falta de oferta, **"Processar de
  novo"** (roda o mesmo aviso de novo depois de cadastrar; sem nova compra).
- Testado de ponta a ponta no ar (06/11): compra cria conta + e-mail; **order bump chega como venda separada** e põe na
  mesma conta; reembolso de um tira só aquele grupo; o último bloqueia; assinatura (Black) libera por plano/código.

## E-mail do app (Criativos do Reino, 06/11/2026)

- SMTP do domínio (Hostinger: `smtp.hostinger.com`, 465, caixa `contato@`); a senha quem cola é o dono. SPF, DKIM e
  DMARC já vêm da Hostinger (conferir no DNS). Hostinger grátis = **300 e-mails/24 h** por caixa.
- **Só conta nova recebe boas-vindas.** Quem já é membro e compra outro produto só ganha o grupo (sem e-mail).
- Visual: banner 1200×500 com logo (fundo do Codex + texto em HTML, `scripts/email/banner.py` → `public/email/*.jpg`),
  quadro "SEUS DADOS DE ACESSO" (Link:, E-mail:, Senha: com dois pontos, **texto normal**, cor fixa para o Gmail não
  pintar de azul), **botão escuro com letra branca** (dourado some no Gmail escuro do celular), dicas, rodapé "é só
  responder". Tabela + estilo na linha. E-mail não roda script: botão de copiar não existe.
- Configurações → "Mandar o e-mail de boas-vindas para mim" manda o e-mail **igual ao do cliente** (com a senha padrão).
- Login: entrar por `fetch` (senha errada mostra o aviso sem recarregar) — o celular só oferece "salvar senha" depois
  de entrar de verdade.

## Membros antigos: importação e aviso da mudança (Criativos do Reino, 06/11/2026)

- Importação única dos membros da plataforma antiga (grupos com `transacao = 'importacao-kiwify'`, senha padrão, sem
  e-mail). Depois disso, só produtos novos liberam acesso (os antigos não são cadastrados, exceto o que ainda vende).
- **Aviso da mudança** (Configurações → "Aviso da mudança (membros antigos)", `src/aviso-mudanca.js`): e-mail "casa
  nova" (agradece, plataforma própria, acesso continua o mesmo, pede feedback). Envio **um por vez** (90 s ± 20%),
  **máx. 250/24 h**, tabela `envios_aviso` (nunca repete; até 3 tentativas), **Começar / Pausar / Retomar** (continua de
  quem falta, também depois de reiniciar), **pausa sozinho com 5 falhas seguidas**, "Mandar para mim". Quem já trocou a
  senha recebe "a mesma que você já usa" + dica do "Esqueci minha senha". Quem clica em começar é o dono. WhatsApp
  (Zap.Afilic) vai depois do e-mail, sem senha.

## Menu padrão do administrativo (decisão do Nilton, 07/11/2026 — vale para TODOS os apps)

Modelo: Criativos do Reino (`app/src/painel/layout.js` → `MENU_ADMIN`). Ordem fixa, em **seções com título** (09/11/2026,
padrão FluxoPost; recolhido, o título vira um tracinho — ver gd-layout-apps "Menu lateral"):

```
CONTEÚDO
[conteúdo do app]      ← o que o app gerencia (Criativos: Cursos, Guias, Packs, Ferramentas, IA, Banners;
                          apps com projetos — Pixel, Postify, Zap: "Projetos")
ADMINISTRATIVO
Membros                ← quem entra (busca, filtros, editar na janela, histórico)
Analytics              ← como os membros usam o app (seção abaixo)
Grupos e ofertas       ← grupos (o que libera) + produtos da venda (pelo ID ou por oferta) + vendas recebidas
Avisos                 ← push manual/automático para os membros
Configurações          ← plataformas (Kiwify/Hotmart como contas), e-mail (SMTP), endereço do app, + o que for do app
CONTA
Ver como membro        ← SEMPRE aqui, no menu lateral (Nilton, 09/11/2026); na área do membro, o admin vê
                          "CONTA · Ver como admin" no mesmo lugar
```
No celular, as abas de baixo do admin: o conteúdo principal, Membros e Avisos. Apps com **projetos** (Pixel, Postify,
Zap): o grupo libera **módulos + limite de projetos/perfis**; "Projetos" fica em cima (os do administrador, os dos
testadores e "Ver como usuário").

## Analytics (Criativos do Reino, 06/11/2026 — padrão para todos)

- **Histórico por membro** (09/11/2026): reloginho na linha do membro (tela Membros) abre o histórico de acessos numa janelinha.
- **Período** (09/11/2026, áreas de membros com cursos e packs): **7 dias de padrão**, abas **7 dias / 30 dias** + ícone de
  **calendário** (de/até, abre por cima). **Tudo** na tela segue o período: números, gráficos, "Mais abertas", rankings
  (o rótulo mostra "(7 dias)" ou "(25/10 a 05/11)"). Primeiro número = **membros que entraram no período** (de N com acesso).

- **Registro de atividade** (`src/atividade.js`): tabela `eventos` (usuario_id, tipo, chave, nome, detalhe, criado_em) +
  `acessos_dia` (usuario_id, dia, único) + `usuarios.ultimo_acesso` (gravado no máx. 1x/min). Cada app define seus **tipos**
  (Criativos: abriu curso/aula/pack/arte, baixou, IA, copiou prompt, ferramenta, guia; Postify: publicou post, agendou,
  abriu análise, respondeu comentário, campanha disparou, espionou perfil…). O servidor registra o que passa por ele; o
  navegador manda o resto por `POST /ev` (com limite por hora). A **mesma coisa pela mesma pessoa em 10 min conta 1 vez**.
  O administrador testando **não entra** nos números (só `papel = 'membro'`).
- **Tela** (`/admin/analytics`, período 7/30/90 dias em chips): 4 cartões no topo (Membros com acesso +novos em 7 dias ·
  Online agora (últimos 5 min) + entraram hoje · 2 números do que o app mais faz no período); "Membros que entraram por dia"
  (barras) + o ranking principal com miniatura; "Cadastros por dia" (linha) + "Novos membros" (nome, e-mail, data, origem,
  "Ver todos"); embaixo 4 rankings "1. Nome · N pessoas · número". Gráficos: `src/painel/graficos.js` (`grafico()`,
  `SCRIPT_GRAFICOS`). Nota no rodapé: desde quando conta e a regra dos 10 minutos.
- No **Membro** (janela de editar): "Último acesso" e o **histórico** do que a pessoa fez (`/admin/membros/:id/historico`).

## Telas do admin (o padrão aprovado no Kit Gospel)

- **Membros:** busca (nome, e-mail, telefone), filtro Todos/Ativos/Expirados/Bloqueados, colunas Membro (nome,
  e-mail, grupos ou "Sem grupo (não vê nada)") · Plano · Válido até · Status · Origem (Gateway/Manual) · uso
  (aberturas) · Abrir. Cadastro manual recolhido no topo. Administradores numa lista separada embaixo.
- **Membro (abrir):** editar dados, grupos (caixas), plano, vencimento, ativo; Renovar +N dias; Gerar nova senha.
- **Planos** (na tela, "grupo" se chama **plano**; pedido pelo Nilton em 17/10/2026, modelo no Pixel.Afilic,
  padrão "lista + botão +" da `gd-layout-apps`):
  1. **Planos** — lista editável na linha: nome, o que libera (projetos/módulos), **prazo**, pessoas, Padrão
     (selo ou "Tornar padrão"), Salvar, Excluir; "+ Novo plano" no topo abre a janela.
  2. **Produtos** — lista: nome do produto, plataforma (Hotmart/Kiwify), ID, plano em que entra, Salvar, Excluir;
     "+ Novo produto" abre a janela. Produto que chegou numa venda e não está na lista aparece nela com o selo
     "Chegou venda, sem plano" e o seletor do plano.
  3. **Conexão com a Hotmart e a Kiwify** — endereço do webhook, eventos a marcar e hottok/token, um passo a
     passo fechado por plataforma; feito uma vez só.
  Embaixo, os avisos recebidos com "o que foi feito".
- **Avisos:** push para todos os membros ativos (veja `referencias/avisos-push.md`).
- **Configurações:** endereço do webhook com token, SMTP, endereço do app.

## Onde está implementado hoje

- **Kit Gospel** (Node/Express + SQLite, `github.com/NiltonFrias/kit-gospel`): o modelo completo —
  `src/access.js` (módulos, grupos, vínculo), `src/routes/webhook.js`, `src/routes/admin.js` (membros, acessos,
  avisos), `src/push.js`. Referência principal: `referencias/kit-gospel.md`.
- **Afilic** (Next + Postgres, `github.com/NiltonFrias/afilic`): acesso por colunas fixas no usuário
  (`access_results`, `access_growth`, `access_expires_at`), só manual, admin = e-mail do `ADMIN_EMAIL`. Tem o
  melhor sistema de **app instalável + avisos** (`serverlib/push.mjs`, `public/sw.js`, `app/painel/instalar.tsx`).
- **Pixel.Afilic** (Node/Express + SQLite por projeto): o modelo de **administrativo + ver como usuário** —
  `src/contas.js` (usuários, projetos, acessos, senha inicial de uso único), `src/plataforma.js` (/admin, troca
  de projeto, "Entrar no projeto"), `src/contexto.js` e a faixa em `src/painel/layout.js` (`vendoComo`). Desde
  17/10/2026 também é a **referência completa em Node**: grupos = planos com limite de projetos (sem prazo: vale até
  a plataforma avisar), webhook de acesso Hotmart/Kiwify (`src/acesso.js`), e-mail do login (`src/correio.js`),
  relatório de desempenho 8h/14h/20h + mensagem manual (`src/notificacoes.js`), telas em
  `src/painel/admin-acesso.js`, testes em `test/acesso.test.js`.
- **Zap.Afilic** (Next + Prisma, desde 17/10/2026): cópia do administrativo do Pixel em TypeScript — planos com
  **projetos + números de WhatsApp por projeto + prazo**, produtos, webhook `/acesso/<plataforma>/<senha>`, e-mail do
  login, Minha conta com "Novo projeto" (o projeto do cliente já nasce com o pacote padrão de fluxos), "Ver como
  usuário" por cookie. Só mensagem manual em Notificações (sem relatório automático). Código: `src/lib/access.ts`,
  `src/lib/access-notice.ts`, `src/lib/mail.ts`, `src/lib/settings.ts` (segredos cifrados com `CHAVE_CIFRA`),
  telas em `src/app/(gestao)/admin` e `src/app/(gestao)/conta`.

- **Postify** (Node/Express + node:sqlite, 07/11/2026): o motor do Criativos (acesso.js, plataformas.js, correio.js,
  atividade.js, graficos.js) num app **com projetos**: o grupo libera **módulos** (`automacao`, `espionar`) + **limite de
  perfis** (`grupos.limite_perfis`; vale o maior entre os grupos válidos e o "à mão" do membro). Telas em
  `src/painel/admin-membros.js` (Membros, Analytics, Grupos e ofertas, e os blocos Plataformas de venda + E-mail dentro de
  Configurações), ligação em `src/plataforma.js` (webhook antes da sessão, `temAcesso` no login e na sessão, tela de
  "não está no seu plano" para os módulos, `atividade` por rota). Senha do SMTP cifrada (`smtp_senha_cifrada`).
  Cuidado ao copiar `graficos.js`: a classe `barras` colidia com o CSS do app → a figura usa `gt-barras`/`gt-linha`.
  Testes: `test/membros.test.js`.
- **Criativos do Reino** (Node/Express + node:sqlite, desde 30/10/2026): variação com **produto da venda** (seção acima:
  pelo ID ou por oferta + código do checkout) que libera um **grupo**; o grupo libera chaves `curso:` / `pack:` / `ia:` /
  `ferramenta:<slug>`; grupos organizados em **pastas** (só visual, vêm fechadas). Prazo padrão "pela plataforma" (até
  cancelar/reembolsar), opcional mensal/anual/vitalício por oferta. Leitura do evento Kiwify igual ao Zap.Afilic (tipo do
  aviso, senão a situação do pedido; `subscription_*` não é compra nova). Código: `app/src/acesso.js`, telas em
  `app/src/painel/admin-acesso.js`; o membro bloqueado vê cadeado + botão "Liberar" com o link de venda do item.

## Pendências conhecidas

- Kit Gospel: o vínculo aceita trecho do nome (regra 2).
- Kit Gospel e Afilic: `{{primeiro_nome}}` sai em caixa alta quando o comprador digitou assim (regra 8).
- Afilic: trocar o acesso fixo por grupos + produtos (este modelo) quando for vendido por Hotmart/Kiwify.
- (Resolvida em 17/10/2026) **Senha nunca no endereço**: a senha inicial / nova senha vai num cookie de 1 minuto
  (`?senha=1` no endereço só avisa) e a tela mostra uma vez e apaga. Zap: `backWithSecret` em
  `src/app/(gestao)/admin/actions.ts` + `src/components/gd/secret-notice.tsx` (lido no navegador). Pixel:
  `voltarComSegredo` / `avisoUnico` em `src/plataforma.js` (lido e apagado no servidor, cookie `httpOnly` no caminho
  `/admin`). Todo app novo já nasce assim.
