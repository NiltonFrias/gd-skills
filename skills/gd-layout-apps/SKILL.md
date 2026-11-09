---
name: gd-layout-apps
description: O layout próprio dos apps do Nilton (Pixel.Afilic é o modelo; vale para Zap.Afilic, Afilic, Kit Gospel e os próximos) — casca do app (menu lateral, troca de projeto, administrativo com "ver como usuário", barra de baixo no celular), cores e fonte, componentes (cartões, blocos, tabelas que viram cartões no celular, filtros fixos, janelas, selos, olho de privacidade, tema escuro), app instalável, e como escrever os textos da tela. Use sempre que for criar uma tela, um app novo, ou mexer no visual de qualquer app do Nilton — antes de escrever HTML/CSS.
---

# Layout dos apps do Nilton

Feito na prática no **Pixel.Afilic** (redesenho de 16/10/2026 e todas as rodadas depois, aprovadas pelo Nilton).
O código de referência é `src/painel/layout.js` do Pixel.Afilic: o CSS inteiro, os ícones e a função `pagina()`.
Leia esse arquivo antes de criar uma tela; copie dele, não invente componente novo se já existe um.

Skills irmãs (prefixo `gd-`, Geração Digital): `gd-acesso-membros` (administrativo, membros, notificações) e
`gd-vendas-infoproduto` (vendas da Hotmart/Kiwify). Elas dizem **o quê** cada tela faz; esta diz **como fica**.

## Pergunte antes (app novo)

1. Nome do app e logo (tem logo pronta? cor da marca?). A **cor da ação** é a da marca; o resto do sistema não muda.
2. Quais telas o cliente vê e quais só o administrador vê (veja `gd-acesso-membros`).
3. O app tem "projetos" (vários negócios por conta, com troca no menu) ou é uma conta só?

## Regras de ouro

1. **Uma cor de ação.** Azul (no Pixel, `--primary #2056F0`) = botão principal, link, foco. **Tinta** (`--tinta`,
   quase preto) = o que está **selecionado** (aba ativa, período escolhido, segmento ligado). Verde/vermelho só para
   lucro/prejuízo e selos de situação. Laranja (`--laranja`) só para alerta e para o quadradinho-assinatura.
2. **Sem gradiente, sem sombra colorida, sem texto em CAIXA ALTA**, sem "meta · com · pontinhos" em todo lugar.
   Sombra só em janela e menu que flutua (`--sombra-pop`). Exceção aprovada: o funil do Resumo.
3. **Assinatura:** um quadradinho de 6 px (o "pixel") marca o item ativo do menu, a troca de projeto e a faixa do
   administrador. Cada app pode ter a sua assinatura, mas uma só e discreta.
4. **Fonte única:** Onest (Google Fonts), 400–800. Números com `font-variant-numeric: tabular-nums`.
5. **Medidas:** raio 12 px nos blocos e 9–10 px nos controles; altura de controle 40 px (`--ctl`); menu 244 px
   (68 px encolhido).
6. **Tema claro e escuro** com os mesmos nomes de variável (`[data-theme="dark"]` troca os valores). Toda cor nova
   vira variável nos dois temas. O tema escolhido fica guardado no aparelho e já vem certo antes de pintar (sem
   piscar branco).
7. **Celular primeiro:** toda tela funciona em 360 px. Tabela vira lista de cartões (`.tab.cartoes` com
   `data-rot` em cada célula); filtros e período sobem para a linha do título; nada de rolagem para o lado na página.
8. **Texto só quando ajuda:** o Nilton não gosta de instrução espalhada pela tela. Título curto, um subtítulo de
   uma linha, e o passo a passo dentro de `<details class="passo-a-passo">` ou na hora de fazer a tarefa. Dica longa
   vai no balão do ícone ⓘ.
9. **Português simples**, sem termo técnico na tela ("Vis. Checkout", não "InitiateCheckout"; o nome técnico pode
   aparecer pequeno embaixo). Nome de pessoa sempre no padrão "Maria da Silva" (`gd-vendas-infoproduto`, regra 9).
10. **Cadastros = lista + botão "+" no topo** (pedido do Nilton, 17/10/2026): a seção mostra a lista do que já
    existe (editável na própria linha, com Salvar e Excluir) e, no cabeçalho dela, um botão **"+ Novo …"** que abre
    uma janela (`<dialog class="janela">`) com o formulário. **Nunca um formulário vazio aberto na tela** esperando
    alguém digitar. Seções de configuração na ordem em que se faz (ex.: Planos, Produtos, Conexão), **sem
    número** desde 09/11/2026 (só o título + "?"). Lista vazia = uma frase dizendo para tocar no "+".
11. **Uma informação, um lugar** (pedido do Nilton, 17/10/2026): não repetir numa tela o que outra já mostra melhor
    (ex.: "vendas por anúncio" fica na tela Meta/UTMs, não em Eventos). Telas de registro (Eventos, avisos) abrem
    com uma **faixa de resumo** de uma linha (`.resumo-faixa`: 3–4 números com um rótulo pequeno; o que precisa de
    atenção em vermelho com o link "resolver"; detalhe no balão `title`) e o assunto principal (a lista) logo
    abaixo — nada de 4 cartões grandes + barra + tabela antes do que importa.
12. **Nunca `confirm()`** do navegador. Ação perigosa = botão vermelho dentro de uma janela própria ou de um
    "Editar"; desfazer quando der.
13. **Espaço entre botões, sempre** (pedido do Nilton, 17/10/2026): botões lado a lado nunca encostam um no outro —
    no mínimo 8–10 px (`gap` no contêiner, nunca botões soltos dentro de um `<span>` sem `display:flex;gap`). Vale para
    cabeçalho, barras, janelas e linhas de lista. Confira na prévia antes de mostrar.
14. **Modo Editar de uma tela** (ex.: Resumo): a barra "Editando…" fica **logo abaixo do título** (nunca por cima dele) e
    é a única coisa presa no alto ao rolar; os botões do cabeçalho somem; os **filtros deixam de ser fixos** só nesse
    modo (é a única exceção aos filtros fixos). Na barra azul: botões de contorno branco + "Salvar" branco.
15. **Janela de editar cabe numa tela só** (pedido do Nilton, 18/10/2026): nunca rolar dentro da janela. Janela larga
    (`.janela-larga`, até 760 px); campos curtos lado a lado (`.linha-2`, ex.: Nome | E-mail); cada assunto numa linha
    com o rótulo à esquerda e as opções à direita (`.linha-rot`); explicação longa no ⓘ (balão), não em texto embaixo;
    número pequeno vira **contador − / +** (`.contador`), não campo solto; **todas as ações juntas numa linha no rodapé**
    (`.rodape-janela`: Salvar primeiro, depois as outras; a perigosa em vermelho à direita). Salvar fora do `<form>` usa
    `form="id-do-form"`. Modelo: Usuários → Editar no Pixel.Afilic (`src/plataforma.js`).
16. **Janela fecha só no X ou no Cancelar** (pedido do Nilton, 18/10/2026): clicar fora ou apertar Esc **não** fecha,
    para não perder o que foi digitado (evento `cancel` com `preventDefault`).
17. **Exemplos sempre genéricos** (pedido do Nilton, 18/10/2026): placeholder e texto de exemplo nunca mostram produto,
    pixel, domínio, ID ou cliente reais do Nilton ("Ex.: Pixel do seu produto", "Ex.: Nome do seu produto",
    "seusite.com.br", "Ex.: 123456789012345"). Os prints da Ajuda também, com dados borrados.
18. **Campo de chave (token, hottok, senha de integração) sem preenchimento automático**: `type="text"` mascarado
    (`.segredo` com `-webkit-text-security:disc`), `autocomplete="off"`, `data-lpignore`, `data-1p-ignore`; e o campo
    ao lado (ex.: ID) com `autocomplete="off"`. Com `type="password"` o navegador acha que é login e põe o e-mail e a
    senha do usuário ali.
19. **Formulário longo em janela = blocos com título** (pedido do Nilton, 18/10/2026): cada assunto num bloco com um
    título pequeno e espaço entre os blocos (`.form-janela` > `.secao-janela` > `h4`), nunca campos de assuntos
    diferentes grudados. **Lista longa para marcar = sanfona** (`.sanfona-produtos`): fechada mostra "N de M marcados";
    aberta tem **"Marcar todos"** (com estado intermediário) e a lista para marcar um por um. Modelo: Adicionar pixel.
20. **Projeto da tela, não da sessão** (apps com troca de projeto; caso real em 18/10/2026: uma página foi gravada no
    projeto errado porque outra aba trocou de projeto). A página guarda o projeto em que foi aberta
    (`<html data-projeto>`), todo formulário POST leva `?_p=<id>` e o servidor **não salva** se o projeto ativo mudou:
    "Não salvei: esta tela era do projeto X, mas outra aba trocou para Y". Pixel.Afilic: `src/painel/layout.js` +
    `src/plataforma.js`.
21. **Prévia antes de subir:** toda mudança visual é mostrada na prévia local primeiro (`scripts/previa.js`, com
    dados fictícios) e só sobe depois do "pode subir".

22. **Cores grafite (decisão do Nilton, 19/10/2026):** fundo e superfícies em grafite quase preto, sem azul-marinho
    (o marinho lembrava a UTMify). Escuro: `--bg #0E0F12`, `--s1 #16181D`, `--s2 #1B1E24`, `--s3 #23272F`, bordas
    `rgba(255,255,255,.08/.16)`, textos `#F1F2F4 / #B4B9C2 / #858B96`, ação `#2F62F2`. Claro: tinta `#15171C`, fundo
    `#F1F2F4`. O azul fica só para ação, link e o que é da Meta; verde para o que é do Pixel e para lucro.
23. **Tabela grande (Meta) que rola para os lados** (skill ux-designer, 21-data-tables): a tabela rola **dentro dela**
    (`overflow:auto; max-height:calc(100vh - 110px)`), com os títulos (`thead th` sticky top), o nome (sticky left) e o
    total (`tfoot td` sticky bottom) presos e a barra de rolar sempre à vista. O **quadradinho de marcar fica dentro
    da célula do nome** (não numa coluna à parte: coluna estreita presa deixa fresta por onde o conteúdo vaza); no
    título, o quadradinho e o nome da coluna **na mesma linha**. Fundo da linha no hover/marcada sempre **opaco**
    (`color-mix(..., var(--s1))`, nunca `transparent`), senão a coluna presa fica "vazada".
24. **Espelho Meta × Pixel** (a assinatura do Pixel.Afilic): grupo "Meta diz" (azul) | costura tracejada | "Pixel diz"
    (verde); a diferença vai **em amarelo embaixo do valor do Pixel** (+ R$ 18,02), sem bolinha nem coluna à parte.
    Marcar itens e abrir o nível de baixo pelas abas de cima (`?campanha=id1,id2`), sem barra de seleção extra.
25. **CSS novo fora do bloco do celular:** ao inserir regras no `layout.js`, confira que não caíram dentro de um
    `@media (max-width…)` (aconteceu em 19/10/2026: nada aplicava no computador).
26. **Revisão com as skills ux-designer e impeccable** (instaladas em 19/10/2026): antes de subir uma tela nova, passe
    estados vazios, texto longo, cliques repetidos, entrada errada (ex.: "Pago por fora" recusa valor > 3× o preço:
    erro de vírgula vira Compra inflada na Meta) e largura de celular.

27. **Detalhes que o Nilton vê (revisão de 19/10/2026):** ícone dentro de `.botao-ico` sempre centrado (o `<span>` do
    sol/lua com `display:grid;line-height:0`, senão o desenho sobe 3 px); botões de uma linha de tabela lado a lado
    (`nowrap`), nunca empilhados; passo a passo com o **botão de cada passo na linha do passo** (`.passos-acao`), na
    ordem em que se faz; **o que importa primeiro** (notas/números) e a configuração de uma vez só (ex.: parâmetro de URL)
    depois; explicação longa vai para `<details>` ("Como ler esta tabela"); JSON/resposta bruta só em "Detalhe técnico"
    fechado, com a frase em português antes ("a Meta recebeu", chips ✓/✗ do que foi junto); ação perigosa (Excluir) na
    linha de Salvar/Cancelar, à direita; filtro que não muda nada naquela tela some (ex.: Conta de anúncio em UTMs).

28. **Sem texto que ensina toda hora** (pedido do Nilton, 20/10/2026): telas do dia a dia (Resumo, Meta, UTMs,
    Vendas, Eventos, Produtos, Integrações) só com o título, sem subtítulo explicativo nem notinha embaixo da tabela.
    Explicação só onde se configura pela primeira vez, e mesmo ali a dica de cada campo vai no ⓘ do nome do campo.
29. **Listas com filtro = a mesma barra do Resumo** (`.barra-lista`): Período (calendário) · lista com caixinhas que abre
    e fecha (`multiEscolha`, aplica ao fechar) · Buscar (lupa) · olho, numa linha só; nada de fileira de botões de
    filtro. Ações em lote ("Marcar como resolvido", "Excluir") só aparecem quando há algo marcado (`.barra-lote`).
    Grupos que repetem muito (contas de cada perfil do Facebook) vêm **fechados**, com o resumo no título.

## A casca do app

```
┌──────────────┬─────────────────────────────────────────────┐
│ Logo         │ Título da página              [ações]  [⟳] │
│ [Projeto ▾]  │ subtítulo de uma linha                      │
│              │ ┌ filtros (fixos ao rolar) ─────────────┐ 👁 │
│ Seção        │ └───────────────────────────────────────┘    │
│ ■ Item ativo │ [cartão] [cartão] [cartão] [cartão]          │
│   Item       │ ┌ bloco ─────────────────────────────────┐   │
│ Seção        │ │ tabela / lista / gráfico              │   │
│   Item       │ └────────────────────────────────────────┘   │
│ ──────────── │                                              │
│ (A) Nome     │                                              │
└──────────────┴─────────────────────────────────────────────┘
```

- **Computador:** menu lateral com a logo, a **troca de projeto** logo embaixo, as seções e, no pé, **só a conta**
  (avatar + nome → Minha conta, Sair). **Tema (lua/sol) e sino ficam só na página inicial** (Painel/Resumo no app,
  Projetos no administrativo), na linha do título, à direita, antes do botão principal ("🌙 🔔 + Novo projeto", tudo
  numa linha só; decisões do Nilton, 17/10/2026). Nas outras telas, só as ações. No Zap: `PageHead home` em
  `src/components/gd/shell.tsx` e `PageHeader home` em `src/components/ui.tsx`. No celular eles ficam no topo, ao lado da logo. O menu encolhe (só ícones) e
  lembra a escolha. No Pixel: `iconesCab()` em `src/painel/layout.js` (usado no Resumo e em /admin; some no celular,
  onde o topo já tem os dois); o sino do administrativo abre /admin/notificacoes.
- **Celular:** barra no topo (logo, tema, sino) e **abas embaixo** (as 4–5 telas principais + "Menu").
- **Cabeçalho da página:** título à esquerda; à direita, na mesma linha, tema e sino e depois as ações; botão
  "Atualizar" gira enquanto busca.
- **Item ativo do menu no Next:** calcule no navegador (`usePathname`), nunca no layout do servidor: o layout não é
  desenhado de novo ao trocar de tela e o destaque ficava parado na primeira tela aberta (bug real no Zap,
  17/10/2026; `src/components/gd/nav-links.tsx`). No Pixel (Express, página inteira) não acontece.
- **Link que muda a sessão** (ex.: "Voltar ao administrativo") nunca pode ser pré-carregado: no Next, `<Link>` em
  produção pré-carrega e isso executava a ação sozinho (bug real no Zap, 17/10/2026). Use formulário/ação ou
  `prefetch={false}`, e a rota ignora pedidos de pré-carregamento.
- **Duas áreas é só do administrador** (decisão do Nilton, 17/10/2026): o cliente nunca vê uma área separada
  ("Minha conta" com abas, "Abrir o app"). A conta dele (perfil, senha, notificações e **Projetos** com
  "+ Novo projeto") fica **dentro do app**, no perfil do pé do menu. Tela fora do app só no primeiro acesso de quem
  comprou (criar a senha e o primeiro projeto), sem abas. No Pixel isso já é assim (a /conta do cliente abre na casca
  do projeto); no Zap: `src/app/(app)/perfil/projects-card.tsx`.
- **Administrativo:** o admin entra e vê **só** o administrativo (menu próprio: Projetos, Usuários, Grupos e
  produtos, Notificações, Configurações, Minha conta). O app só abre por **"Ver como usuário"**, com a faixa no
  topo "Você está vendo <projeto> como o usuário vê" + **Voltar ao administrativo** (faixa em tinta). **No celular a
  faixa não aparece** (pedido do Nilton, repetido em 21/10/2026): ele entra direto no projeto e volta pelo item
  **"Administrativo"** do Menu (gaveta). Pixel: `.faixa-admin{display:none}` no bloco do celular; o Zap herda pelo CSS.
- **Página de entrada** (sem login): apresentação simples do serviço + "Entrar"; termos e privacidade no rodapé.

## Componentes (nomes das classes no Pixel.Afilic)

| Peça | Classe | Uso |
|---|---|---|
| Faixa de resumo | `.resumo-faixa` | Topo de telas de registro: 3–4 números numa linha, o que precisa de atenção em vermelho |
| Cartão de número | `.kpi` (`.kpi-rot`, `.kpi-n`, `.kpi-sub`) | Faturamento, lucro, ROAS… Cor do número: verde só positivo, vermelho só negativo, zero neutro. ⓘ com a explicação no balão |
| Bloco | `.bloco` > `.bloco-cab` (h3 + ações) + `.bloco-corpo` | Toda seção de conteúdo |
| Tabela | `.tab` (`.cartoes` no celular), `td.num`, `td.titulo`, `data-rot` | Primeira coluna fixa ao rolar para o lado (`border-collapse: separate`) |
| Filtros | `.painel-filtros` | Período (com calendário de intervalo), conta, fonte, produto; fixa no topo ao rolar; olho de privacidade no fim |
| Período | `seletorPeriodo()` | Hoje, Ontem, 7 dias, Esse mês, Mês passado, Máximo, Personalizado (calendário: 1º clique início, 2º fim) |
| Selo | `.selo .s-ok / .s-aviso / .s-erro / .s-neutro` | Situação curta. Dois selos empilhados têm espaço entre eles. **Sempre compacto** (altura de linha própria de 18 px, `vertical-align:middle`): ao lado de um título não pode herdar a linha do título e virar um balão grande (pedido do Nilton, repetido em 17/10/2026) |
| Mensagem | `.msg .ok / .erro / .aviso` | Resultado de uma ação, no topo (vem por `?ok=` / `?erro=`). Aparece **uma vez**: o script tira o `?ok=` do endereço na hora (`history.replaceState`), então recarregar não mostra de novo (pedido do Nilton, 17/10/2026). No Next (Zap): `src/components/message-once.tsx`, que limpa o endereço **depois** que o Next termina de gravar a navegação (logo na hora, ele põe o `?ok=` de volta) |
| Botões | `button` (azul), `.leve` (contorno), `.botao-mini`, `.botao-ico`, `.perigo` | Um botão azul por área, no máximo |
| Abas da página | `.abas-pag` | Sub-telas (ex.: Conjunto de dados / Editar) |
| Janela | `<dialog class="janela">` + `data-abrir` / `data-fechar` | Criar/editar sem sair da tela; também a confirmação de excluir/desconectar (texto curto + botão vermelho + Cancelar) |
| Copiar | `campoCopiar(id, valor)`, `blocoCodigo()` | Endereço de webhook, script, parâmetro de URL |
| Passo a passo | `<details class="passo-a-passo">` | Instrução que só aparece quando a pessoa abre |
| Vazio | `.vazio` | Tela sem dados: uma frase do que fazer + o botão para fazer |
| Privacidade | `OLHO` + `.priv` | O olho borra nomes, e-mails, produtos e contas (para gravar tela/print) |
| Ícones | `icone(nome, tamanho)` | SVG de traço (estilo Lucide), um só conjunto em `ICONES` |

## Neutro premium (decisão do Nilton no Postify, 07/11/2026 — direção para os próximos apps)

O Nilton achou o visual "amador" com a cor da marca clarinha em tudo (ícones com fundo lilás, pílula lilás no menu,
selos, barras de várias cores). Escolheu o **neutro premium** (estilo Linear/Stripe):
- Quase tudo **branco e cinza**; a cor da marca **só** no botão principal, nos gráficos, nos links e numa **marquinha de
  3px** à esquerda do item aberto do menu (item aberto = fundo cinza claro + texto escuro, sem pílula colorida).
- `--chip` neutro (`#F1F2F5` / escuro `rgba(255,255,255,.07)`) e `--chip-ink` = cor do texto: tudo que era "selecionado
  lilás" vira cinza. Abas segmentadas: fundo cinza, a aberta em branco com sombra leve.
- Ícones dos cartões **cinza, sem fundo colorido** (contorno fino). Barras/gráficos numa cor só, em tons.
- Cantos **12px** nos cartões e blocos (16–18px parecia app infantil), 8px nos itens e botões pequenos.
- **Sem cartão dentro de cartão**; menos bordas (fundos `--s2` no lugar de borda nos itens internos).
- Hierarquia: números grandes e fortes, rótulos cinza médio (`--t2`), rodapés discretos (`--t3`), títulos dos blocos 15px.
- Toda tela tem o mesmo topo: **título (h1)** com a explicação no **"?"** ao lado (a frase embaixo saiu em 07–09/11/2026); depois abas/filtros.
- Linhas de lista (ex.: Projetos do admin) **compactas**: foto/iniciais redondas 36px, nome + uma linha só de detalhes
  ("@perfil · ● Conectado · só o administrador acessa", situação como bolinha colorida + texto, não selo grande), ações à
  direita como **ícone** (editar) + um botão pequeno. Editar em tabelas = botão-ícone de lápis.
- Cartão de post = **a própria capa** (sem caixa em volta), data discreta em cinza, título forte, selo pequeno.
- Item selecionado (dia da agenda, abas) em **cinza um tom mais escuro** que os outros, nunca preto nem lilás.
- Botões com cantos 8px; medidas na seção "Botões: padrão único".
- Não refazer o esqueleto (menu lateral + cartões + gráfico é o padrão do ramo); mudar a "pele". Bloco "Neutro premium"
  no fim do CSS de `Postify/src/painel/layout.js` e "Acabamento" no fim do CSS de `src/painel/painel.js`.

## Cartões de imagem, seleção e vidro (Postify, 07/11/2026 — vale para todos os apps)

- **Cartão de imagem (post, arte, produto) sempre com moldura**: fundo branco, borda 1px, cantos 14px, **6px de respiro**
  em volta da capa (capa com cantos 9px por dentro). Sem moldura "fica estranho, sem container" (o Nilton reprovou).
  Hover: borda um tom mais escura + sombra macia com deslocamento (`0 8px 20px -12px`) e a capa cresce 2,5% devagar.
- Informação curta **sobre a imagem** (tipo do post, nº de itens, duração) num **selo de vidro**: fundo escuro translúcido
  + `backdrop-filter: blur(10px) saturate(1.4)` + borda interna branca fina. Abaixo da capa: data em cinza, título forte,
  selo de situação pequeno.
- **Caixinha de marcar sobre imagem** (seleção em lote): **círculo de vidro translúcido** (branco 28% + blur + aro branco
  1,5px + sombra leve), sempre visível; o `<input>` fica invisível por cima (clicável, com foco de teclado).
  Marcado = círculo na cor da marca com ✓ branco desenhado (SVG) e a **moldura do cartão** na cor da marca + anel suave
  de 3px (18% da cor); a capa escurece só um pouco. **Nunca** caixa quadrada cheia/opaca nem contorno grosso de 3px
  ("fica grotesco"). Mesmo jeito em toda tela que seleciona imagens (Posts, Espionar…).
- **Vidro só onde tem função** (regra da skill impeccable): por cima de imagens (selos, caixinha), barras que flutuam
  sobre o conteúdo (barra de ações em lote, topo fixo do celular) e o fundo atrás das janelas (`::backdrop` com blur 6px).
  Nunca vidro de enfeite em cartões comuns.
- Superfícies do navegador na cor da marca: `::selection`, barra de rolagem fina, anel de foco (`:focus-visible`),
  números tabulares nas tabelas.
- Para revisar visual, usar a skill **impeccable** (modo "Operate" para apps: precisão e contenção; ler
  `reference/craft-floor.md`): sem cartão dentro de cartão, sem borda colorida grossa à esquerda, sem texto em degradê,
  sombras sempre com deslocamento e desfoque, estados de hover/foco/vazio/carregando.

## Selos, abas e menu (Postify, 07/11/2026 — vale para todos os apps)

- **Selo de situação** discreto: fundo cinza claro com contorno fino, texto cinza escuro e uma **bolinha** na cor da situação
  (verde = ok, âmbar = aviso, vermelho = erro, cinza = neutro). Nada de fundo colorido chamativo. Em grade de cartões,
  o selo fica **sempre na mesma linha** (no pé do cartão: `margin-top:auto` numa coluna flex).
- **Abas segmentadas** iguais em todas as telas: fundo cinza, a escolhida em branco com sombra leve; nunca preta nem roxa.
- **Menu lateral**: ícones, símbolo da marca e foto do perfil ficam **no mesmo lugar e tamanho** com o menu aberto ou
  encolhido (mesmo recuo à esquerda, os títulos de seção continuam ocupando o espaço, só invisíveis); ao abrir, só os nomes
  aparecem ao lado. **Setinha de recolher no topo** (como no Criativos do Reino): ao lado da logo com o menu aberto; recolhido,
  ela entra no espaço que JÁ EXISTE entre o símbolo e a foto do perfil (o topo tem a mesma altura nos dois jeitos, então
  perfil e itens não se mexem). Itens com 42px de altura, ícone 19px, item aberto com fundo e a marquinha na borda esquerda.
  Foto do perfil 28px com aro fino, um pouco afastada da logo e perto do primeiro título de seção.
- **Cabeçalho das telas enxuto**: só o título e, na MESMA linha, as abas/filtros/ações (ex.: "Posts | Lista Calendário …
  filtros · ícones · + Novo post"). Sem frase de explicação embaixo do título (cansa). Dica de uso vira um **"?"** ao lado
  do título/botão, com balão ao passar o mouse.
- Telas **com abas** não têm título: as abas ficam à esquerda, no topo (o menu já mostra onde a pessoa está).
- **Regra de ouro do Nilton: nada se mexe de lugar porque algo foi selecionado ou criado.** O que surge (ações da seleção,
  contador, botões de confirmar) entra num espaço que **já existe** na tela, ou no lugar dos botões que ele substitui,
  sem empurrar o conteúdo e sem apertar (o espaço tem que caber folgado). Vale para todas as telas e todos os apps.
- Seleção em lote (marcar cartões): os botões aparecem **na linha do título da lista** ("Próximos 13 … 1 marcado ·
  ações"), à direita; nada de barra que empurra os cartões para baixo.
- **Paginação = "Carregar mais"** (nada de rolagem infinita nem de mostrar tudo, para não pesar): grades mostram um começo
  (Posts: 2 fileiras; Feed e Espionar: 15 artes; listas como Comentários: 20) e o botão abre mais a cada clique (Posts: +2
  fileiras; Feed/Espionar: +9 = 3 fileiras; listas: +20). No Postify/FluxoPost há o atalho `data-paginar="N"` (layout.js).
  **O "Carregar mais" tem que ir até o fim** (pedido do Nilton, 08/11/2026): mostra primeiro o que já está na tela e, quando
  acaba, **busca a próxima página no servidor/Meta só na hora do clique** ("Carregando…" no botão), sem guardar nada além
  do necessário. O botão só some quando acabou de verdade (sem próxima página ou já chegou no total do perfil). Modelos:
  Feed (`/feed/mais`, cursor da Meta) e Espionar (`/espionar/<@>/mais`) no FluxoPost.
- Tela de um item (post): duas colunas — à esquerda a mídia no formato real (9:16 para Reels/Story, 4:5 no feed, sem faixas
  pretas) e os números **embaixo** dela num bloco; à direita a situação + ações num cartão, avisos (ex.: Facebook), um único
  "Baixar" e o texto. Botão de baixar sobre a imagem só no carrossel (ícone de vidro, para baixar aquela imagem).
- Números de passos/setores (1, 2, 3): **quadradinho discreto** com contorno fino e número cinza (como os ícones dos
  cartões), nunca bolinha colorida chamativa. Formulários longos: "Salvar" e liga/desliga no **topo** (fixo ao rolar).
- Opções "faça também" (ex.: postar também na Página do Facebook) viram uma **chave liga/desliga dentro do cartão** a que
  pertencem, não um cartão separado com outro ícone repetido.
- Efeitos em telas de vitrine: discretos (o Nilton achou o espião animado chamativo demais). Preferir varredura suave; no
  tema claro tudo mais leve.
- **Botões do mesmo tamanho** (pedido do Nilton): todo botão secundário (branco com borda) e todo botão pequeno têm a
  mesma altura (32px), letra 13px e ícone 15px em qualquer tela; só o botão principal do topo da tela é um pouco maior.
- **Nada fica por cima de nada** (pedido do Nilton): texto, botão e selo nunca se sobrepõem. Em cartões estreitos, o
  texto longo é cortado com "…" (uma linha) e o botão vai para uma linha própria (embaixo, à direita), em vez de
  disputar o espaço com o texto. Conferir sempre com nomes compridos e na largura menor do cartão.
- **Exemplos nas telas** (placeholders, textos): sempre genéricos ("@ do perfil ou o link dele", "@exemplo"). Nunca citar
  perfis ou marcas do Nilton (Criativos do Reino etc.): os apps são vendidos para outras pessoas.
- Cartões de números no topo (Visão geral) são **só dado**, sem clique.
- Arte de referência (Dribbble etc.) **não se copia**: cria-se uma própria no mesmo espírito (com animação leve e desligada para quem pede menos movimento).
- Menu recolhido: no lugar de cada título de seção, um **tracinho** curto no mesmo alinhamento (separa os grupos).
  Sem barra de rolagem horizontal no menu.
- Cartões de desempenho (posts na análise): números **sempre à vista** embaixo da capa (nada escondido no hover), o número
  principal grande + uma **barra comparando com a média** (marquinha = média, "+35% vs média") + uma linha de métricas pequenas.
  Médias numa faixa única (um cartão dividido), não em vários cartões soltos.
- Telas com setores (ex.: Conexões): títulos na ordem em que a pessoa usa, **sem número** e com a explicação no "?" (09/11/2026).
- Tela "vitrine" para anúncio (ex.: Espionar): pode ter um **palco** com o brilho da cor da marca e busca grande. No **tema
  claro o palco é claro** (o escuro destoou, Nilton 09/11/2026) e tecnológico: grade de **linhas** fininhas (sem bolinhas e sem anéis de
  radar: o Nilton não gostou), **emblema grande** (76px) acima do título, cantoneiras de mira nos cantos e a varredura suave; no tema escuro, o mesmo em
  branco sobre fundo escuro. Cantos 12px. Lista embaixo (ex.: perfis já espionados) em cartões do app, alinhada à esquerda.
  O resto do app continua neutro.
- **Mídia de post sem faixas pretas** (Nilton, 09/11/2026): na janela/tela do post a caixa da mídia tem a proporção da
  própria imagem (lida ao carregar, entre 9:16 e 1,91:1) e a imagem preenche (`object-fit:cover`); a janela se ajusta à
  largura da mídia. "Descrição" é o título **dentro** do bloco (com o Copiar na mesma linha), alinhado ao topo da imagem.
- Conteúdo com **largura máxima** (~1440px) para não esticar em telas grandes; listas de leitura até ~960px.
- Passo a passo de configuração: **título do passo à vista** e o "Como fazer" recolhido.

## Menu lateral: regras completas (FluxoPost, 07/11/2026 — modelo para TODOS os apps)

Fonte: `Post.Afilic/app/src/painel/layout.js` (`MENU`, `MENU_ADMIN`, `ABAS`, `pagina()` e os blocos de CSS "Menu (07/11/2026)",
"Menu no jeito da referência", "Regra dos ícones parados" e "Recolhido: … tracinho"). Copie de lá, mude só as cores.

**Estrutura (de cima para baixo)**
1. **Topo** (`.cabeca`, altura fixa 70px): logo (símbolo + nome) e, à direita, a **setinha de recolher** (`.seta-menu`,
   28px, ícone `esquerda` 16px, cinza sem fundo; hover cinza claro). Nada de botão "Recolher menu" no pé nem bolinha na borda.
2. **Troca de projeto/perfil** (`.projeto-sel`), 16px abaixo do topo: foto 28px redonda com aro fino na cor da marca + nome.
   Só no app; o administrativo não tem.
3. **Seções** (`<div class="secao">`): título em **maiúsculas, 11px, peso 600, espaçado (.08em), cinza `--t3`**;
   20px acima, 6px abaixo. Poucas seções e curtas: app = "Principal" (as telas do dia a dia) + "Conta" (Conexões, App e
   notificações); administrativo = **"Administrativo"** (Projetos, Membros, Analytics, Grupos e ofertas, Configurações) +
   **"Conta"** (Minha conta). Ordem = ordem de uso. Tela que é parte de outra vira aba dentro dela, não item do menu.
4. **Itens** (`a.item`): 42px de altura, margem 3px, cantos 10px, letra 14.5px peso 500, ícone 19px **sempre com o mesmo
   recuo** (padding 0 13px, gap 12px). Normal = texto `--t2`, ícone `--t3`; hover = fundo `--s2`. **Aberto** = fundo da cor
   da marca a 9% sobre branco, texto escuro peso 600, ícone na cor da marca e uma **marquinha de 3px** (degradê da marca)
   colada na borda esquerda do menu. Nunca pílula colorida cheia.
5. **Pé** (`.pe`, borda em cima): **só a conta** (avatar + nome + e-mail) que abre Administrativo (para o admin) / Minha conta /
   Sair. Tema e sino ficam no cabeçalho da página inicial (ver "A casca do app").

**Troca de área sempre no menu lateral** (Nilton, 09/11/2026, vale para TODOS os apps): a última seção é **"Conta"** e
nela fica o item **"Ver como membro"** (no administrativo, ícone olho) ou **"Ver como admin"** (na área do membro, só para
o administrador), com o mesmo jeito dos outros itens (texto um pouco mais apagado). Ícones: "Ver como membro" = olho;
"Ver como admin" = **escudinho com ✓** (o do Criativos; Nilton, 09/11/2026). Nada de faixa no topo nem botão
escondido só no perfil. No celular, a troca fica no Menu (gaveta). Criativos do Reino: `['#', 'Título']` em `MENU` abre uma
seção (`.secao-menu`); com menu escuro, o tracinho recolhido é branco a 30%.

**Ícones**: um conjunto próprio `m-*` (SVG 24×24, traço 1.8, pontas e cantos arredondados, sem preenchimento), um por item,
todos do mesmo peso visual. Ícone de admin padrão: Projetos = camadas, Membros = pessoas, Analytics = linha subindo,
Grupos e ofertas = etiqueta, Configurações = controles deslizantes, Minha conta = pessoa.

**Recolher (só ícones, 68px)** — regra dos ícones parados: ao recolher/abrir, **nada muda de lugar**; só os nomes somem.
- O topo mantém a **mesma altura**; recolhido, a logo vira só o símbolo e a setinha (espelhada) desce para o vão que já existe
  entre o símbolo e a foto do perfil (`position:absolute; bottom:-14px`), sem empurrar nada.
- Os títulos de seção continuam ocupando o espaço: recolhido viram um **tracinho** cinza de 20×2px no centro (divide os
  grupos). Itens viram quadrados de 44px com o ícone no centro; o item aberto mantém fundo e marquinha.
- O seletor de projeto recolhido mostra só a foto; ao clicar, a lista abre **ao lado** do menu (`left:calc(100% + 4px)`).
- Lembra a escolha (`localStorage` `<app>:menu` = `encolhido`), aplicada num script no `<head>` antes de desenhar (sem
  piscar). Sem barra de rolagem horizontal (`nav{overflow-x:hidden}`); `title` em cada item (aparece recolhido).

**Celular**: o menu lateral some; barra no topo (logo + tema + sino) e **abas embaixo** com as 4 telas mais usadas + "Menu",
que abre o menu inteiro como gaveta (`data-gaveta`). No administrativo, as abas são os itens do admin menos Grupos.

## Botões: padrão único (FluxoPost, 07/11/2026; Criativos do Reino, 09/11/2026 — TODOS os apps)

- **Três tipos e só três**: **principal** (cor/degradê da marca; um por tela, no topo: "+ Novo membro", "Entrar"),
  **comum** (sólido escuro; no tema escuro, claro: Salvar dentro de bloco, Trocar agora) e **secundário** (branco com borda:
  Copiar, + Adicionar…, Cancelar). Perigo = vermelho, só dentro da janela de confirmação.
- **Curtos**: secundário e pequeno com **32px de altura, letra 13px, ícone 15px, cantos 8px, padding 0 12px**, iguais em
  qualquer tela. Só o principal do topo da tela é maior (36–44px).
- O **dourado/degradê não vai em Salvar de bloco nem em "+ Adicionar" de seção** (pedido do Nilton, 09/11/2026): "+ Adicionar
  plataforma", "+ Novo grupo", "+ Adicionar produto" no título da seção = secundário; Salvar de um bloco = comum. Janela de
  criar/editar pode ter o Salvar principal.
- **Ação de linha = ícone** de 32px com `title` (lápis = renomear/editar, girar = trocar/refazer, lixeira = excluir com
  hover vermelho), nunca link sublinhado solto nem uma fileira de botões no pé do cartão.
- **Cor no botão cansa** (Nilton, 09/11/2026, no Criativos do Reino): lá **nenhum botão é dourado**, nem o principal; o
  principal é o botão comum (preto / claro no escuro). A cor da marca fica para banners e destaques de vitrine. Em app
  novo, comece assim e só ponha cor no principal se ele pedir.
- **"?" ao lado de título**: o título vira `display:flex; align-items:center` e o "?" é um **SVG** dentro da bolinha
  (a letra "?" da fonte fica fora do centro).
- **Bolinha de escolha (radio) e caixa de marcar** com desenho próprio e neutro: círculo de 18px com borda fina; marcado =
  borda escura + ponto escuro de 8px no meio. Nunca o radio laranja/grosso do navegador. Cuidado: o estilo geral de
  `input` (padding, altura) estraga o radio; zere com `padding:0; width/height:18px` (no Criativos foi preciso `!important`).
- **Linha do título**: todos os botões ali têm a **mesma altura** (38px), principal e secundário lado a lado ("Importar" +
  "+ Novo membro"); só a cor muda. **Rodapé de janela**: Salvar, Cancelar e Excluir com a mesma altura (36px).
- Escolha de período (7/30/90 dias) e filtros curtos = **abas segmentadas** (fundo cinza, a escolhida em branco), nunca
  botões soltos com o escolhido preto.
- Frase de explicação embaixo do título da tela vira **"?" ao lado do título** (Criativos: `cab(titulo, acoes, voltar, nota)`);
  texto longo de instrução vira `ajuda('Como funciona', …)` recolhido.
- Escopo seguro: no app que tem área de membros com outro visual, aplique as medidas só no administrativo
  (Criativos: `body.adm`).

## Administrativo limpo (Criativos do Reino, 09/11/2026 — TODOS os apps)

- **Cor universal no administrativo**: preto, cinza e branco (foco dos campos, setas, opção escolhida, "Como configurar",
  hover do "?"). A cor da marca fica na área do membro e na marquinha do item aberto do menu. Assim o administrativo é a
  mesma base em todo produto novo.
- **Listas só com o nome** (grupos, produtos): nada de resumo embaixo ("5 packs · 3 cursos", "Produto ID · qualquer oferta ·
  Automático"). O detalhe fica na janela de editar e no `title` (passar o mouse); à direita só o essencial (números, "→ grupo").
- **Rótulos curtos**: "Auto" (não "Automático"), "Oferta", "Código", "Grupo"; o resto vai no "?".
- O ajudante de campo **nunca** escreve explicação ao lado do rótulo: o 3º parâmetro de `campo(rot, html, explicacao)` vira
  `dica()`. Corrigir no ajudante conserta todas as janelas de uma vez.
- Opção em cartão (radio "Pelo ID / Por oferta", avisos automáticos) só com o título; explicação no "?".
- **Largura certa por tela**: listas e ajustes (Grupos e ofertas, Avisos, Configurações) até **1100px**, sem esticar a
  tela toda; tabelas grandes (Membros), grades de cartões e Analytics usam a largura toda.
- **Respiro de 12px** entre o título de uma seção e o primeiro bloco dela.
- Seções da tela **sem número** ("Grupos", "Produtos", "Vendas recebidas", como em Configurações): só o título com "?".
  Cada assunto vira uma seção própria com título; nada de dobra solta no fim parecendo que falta uma etapa.
- **Botão só de ícone** (olhinho, lápis, girar, lixeira) com a **mesma altura** dos botões pequenos ao lado (32px).
- **Botão principal/comum em cinza escuro** (`--sel`, #262626 — 80% ficou claro demais), não preto puro (Nilton, 09/11/2026); no escuro, claro.
- **Botão ao lado de um campo** (olhinho, Copiar, Salvar, trocar, excluir) **mantém o tamanho padrão** (32px, ícone 32×32)
  e fica **centralizado na altura do campo**; nada de esticar o botão até 40px. Respiro: 8px entre botões, 14px dentro.
- **Alinhamento em grade de cartões**: título reserva duas linhas (`min-height:2.5em`, corta com "…"), então a descrição
  fica sempre na mesma altura, mesmo quando o título cabe numa linha. Nunca "subir" a descrição de um cartão só.
- **Mostrar/esconder = olhinho** em todo cartão do administrativo (cursos, guias, packs, IA, ferramentas, banners), à
  esquerda do Editar; o cartão escondido fica apagado com o selo "Escondido" no canto **direito** (o esquerdo é da alça).
  Criativos: `cartaoAdm({ ligar })` + `POST /admin/ligar/<tabela>/<id>` (volta para a mesma tela).
  **Dentro da janela de editar** também é o olhinho (nunca a caixa "Mostrar para os membros"): botão de 32px que alterna
  "👁 Aparece para os membros" × "Escondido" (apagado), com a caixa de marcar escondida por baixo. Criativos: `olhoAtivo()`
  em `admin-pecas.js` (banners: "No ar" × "Desligado").
- **Alça de arrastar (9 pontinhos) sempre branca** sobre a imagem, também no tema escuro.
- **Setinha de banner/carrossel**: no hover fica **branca** (fundo branco, seta escura).
- **Campos com uma altura só** (40px) em todas as telas e janelas: texto, senha, select, data, campo de copiar. O botão ao
  lado do campo NÃO acompanha a altura (fica 32px, centralizado); só o seletor de prazo, que funciona como campo, tem 40px.
- **Nada exposto de uma vez: listas de escolha em sanfona** (Nilton, 09/11/2026). Janela com muitas caixas de marcar (o que
  o grupo libera, os grupos do membro) mostra **só as seções fechadas**: caixa que marca a seção inteira (traço quando é
  "alguns") + nome + "3 de 5" + setinha; os itens abrem ao tocar no nome. Criativos: `data-grupos data-campo="itens[]"` +
  `.grupo-pasta` / `data-marcar-pasta` / `data-pasta-abre` (`public/js/admin.js` → `sincGrupos`), a mesma peça nas duas janelas.
- **Campo de preencher com fundo cinza claro** (`--s2`) e borda fina; no foco fica branco com o contorno neutro. Vale para
  texto, senha, data, número, select, textarea e busca, em todas as telas e janelas (tudo branco "fica estranho": o cinza
  mostra onde se digita). Listas de módulos/aulas também param em 1100px.
- **Tabela de membros: funil em toda coluna que dá para filtrar** (Origem, Entrou em, **Último acesso**, Situação, Acesso
  até). Último acesso: ordem "Mais recentes primeiro" + mostrar "Entraram hoje / 7 dias / 30 dias / Nunca entraram".
  Tudo pelo endereço (`?ua=…&ord=acesso`), para voltar e compartilhar.
- **Histórico na linha do membro**: ao lado do lápis, um **reloginho** abre uma janelinha "Histórico · Nome" com o último
  acesso e a lista do que a pessoa acessou (quando + o quê), com rolagem. Criativos: `data-historico` →
  `GET /admin/membros/:id/historico?n=200` (o mesmo histórico que fica recolhido na janela do membro). **15 por vez com
  "Carregar mais"**. Cada linha: verbo + **só o item em destaque** (o cartaz, a aula, o curso, o prompt) + onde em cinza
  ("Abriu a arte **Cartaz 592** · no pack Cartazes Editáveis"; "Assistiu à aula **Diagramação** · do curso …").
  **Ao pôr mais um botão numa linha de tabela, alargue a coluna das ações** (Criativos: 44px → 84px): os botões mantêm o
  mesmo tamanho e formato do que já existia (36×36 no lápis da tabela), nunca ficam espremidos. Conferir medindo.
- **Números de resumo que não são ação** (ex.: Membros: total, com acesso, novos, vencem em 30 dias, bloqueados) ficam numa
  **linha compacta** ao lado da busca ("**4.317** membros · **2** vencem em 30 dias"), sem cartão e sem clique. Filtro é no
  funil da coluna, não no número.
- **Lista grande sempre paginada** também no administrativo (histórico de e-mails, registros): `data-paginar="20"` mostra 20
  e "Carregar mais (20 de N)" abre mais (Criativos: `public/js/admin.js`).
- **Cor de seleção = cinza ~90%** (`--sel: #262626`, ~90%; no escuro `#D4D4D4`), nunca preto puro (Nilton, 09/11/2026): caixa
  marcada, bolinha escolhida, opção em cartão escolhida, aula aberta, prazo escolhido, barra de progresso, play. O botão
  comum continua escuro; seleção é cinza.
- **Cor do projeto** (`--projeto`, Nilton, 09/11/2026 — toda área de membros): a cor da marca de cada app aparece em
  poucos pontos fixos, sempre os mesmos: **marquinha do item aberto do menu**, **setinhas dos cartões** (→) e a **bola do
  play**. Criar outra área de membros = trocar só `--projeto` (Criativos: `var(--ouro)`, laranja).
- **Play no formato do relógio "Em breve"** (tamanho 68px, contorno branco fino de 1px, sem pulsar nem anel grande),
  **preenchido com a cor do projeto, sólida** (Criativos: o degradê dourado) e o ▶ escuro por cima, com **só a bordinha
  translúcida**: anel de 8px na cor do projeto a 24% em volta. Bola translúcida foi testada e recusada (09/11/2026: a cor
  fica "choca" e o play perde força). Variáveis: `--projeto`, `--projeto-fundo`, `--projeto-ink`.
- **Estados de cartão com imagem** (Criativos, padrão para áreas de membros): **Em breve** = selo de vidro no canto com
  **relógio** + "Em breve" e um círculo de vidro com o relógio no meio, sem link (sai sozinho quando o conteúdo entra);
  **Não liberado** = o mesmo desenho com **cadeado** + "Não liberado", e o clique leva ao botão "Liberar" (venda);
  **liberado** = play no meio (ou "% assistido"). Um ícone por estado, igual em cursos, packs, ferramentas, IA e guias.
- **"Leve o <app> no celular"** (FluxoPost → Criativos, 09/11/2026, TODOS os apps instaláveis): tela do app/notificações começa
  com um cartão com o **ícone do app** (56px, cantos 14px, sombra leve) + título + uma frase; embaixo, dois cartões de passo
  "1 Instalar o app" e "2 Ativar avisos", cada um com o número no **quadradinho**, uma frase e o botão. Modelo: `/aplicativo`
  no FluxoPost (`.app-topo`) e `/avisos` no Criativos.
- **Número de passo/aula/etapa = quadradinho** de 24px, cantos 7px, contorno fino e número cinza (aula aberta: fundo escuro;
  concluída: verde com ✓). Nunca bolinha colorida ou degradê.
- **Sinalização neutra no vídeo/aula** (Criativos, 09/11/2026): aula aberta em cinza (`--s2`) com o número na **cor de seleção**,
  barra de progresso na cor de seleção. O **play** segue a regra da cor do projeto (abaixo). Concluída continua verde.
- **Elemento ao lado de texto** (bolinha com inicial, foto, ícone, selo) sempre **centralizado no bloco de texto** (nome +
  e-mail = centro das duas linhas: `display:flex; align-items:center`, linhas com `line-height:1.25`). Letra ou ícone dentro
  de círculo centralizado com `display:flex; align-items:center; justify-content:center; line-height:1` (o "line-height"
  herdado empurra a letra para baixo). Conferir com zoom no print.
- Caixa pequena de escolha (prazo "Auto/Mensal/Anual") com ~92px: o texto curto já cabe; a caixa não estica.
- Cor universal vale também para os **ícones dos números** (cinza, contorno fino, sem fundo colorido), **gráficos** (cinza
  escuro; claro no escuro), "Ver todos" e iniciais. No Criativos: `body.adm{--chip;--chip-ink}` e `--graf` neutros.
- Janela com foto ao lado: os campos curtos (rótulo, cor) **empilham na coluna da foto**, sem deixar vão embaixo deles.

**Pé do menu e menu do perfil** (Criativos do Reino, 09/11/2026 — padrão para áreas de membros):
- **Versão FluxoPost (Nilton, 09/11/2026 — modelo para apps sem barra de topo):** no pé, a **bolinha do perfil** (iniciais) com **nome e e-mail ao lado** (menu aberto) +
  a bandeira do idioma (só quando o app tiver tradução) + a **luazinha**; com o menu recolhido aparece **só a bolinha**. Tocar na
  bolinha abre: inicial + nome + e-mail, "Comece por aqui" (só se o app tiver ajuda), Minha conta, **Modo escuro/claro** e Sair.
  A luazinha sai do topo da tela inicial (o sino fica). FluxoPost: `rodape()` e a constante `AJUDA` em `src/painel/layout.js`.
- Pé do menu lateral: **Ajuda** (leva direto à tela de ajuda/"Comece por aqui"), **Idioma** (bandeira; troca a língua do app)
  e **tema** (lua/sol). Idioma escolhido com fundo cinza neutro.
- Menu do perfil (topo, à direita): **inicial + nome + e-mail** (sem "Conectado como", sem selo de papel/plano), **Comece por aqui** (ícone de guia),
  **Meus Favoritos** só se o app tiver o que favoritar (cursos, artes), **Minha conta** e **Encerrar sessão**. A troca
  administrativo × membro **não** fica aqui: fica na seção CONTA do menu lateral.

## Peças prontas do Criativos do Reino (09/11/2026 — copiar para os próximos apps com área de membros)

Fonte: `Criativos do Reino/app` (`src/painel/layout.js`, `public/js/admin.js`, `public/js/idiomas.js`).
- **Reordenar arrastando** no administrativo: lista com `data-ordenar="<tabela>"` e alça ⠿ em cada item; ao soltar, um
  `POST /admin/ordem` com `{ tabela, ids }` grava a ordem (cursos, aulas, packs, banners, pastas de grupos). Na área do membro
  a ordem é a mesma do administrativo. Cartões com imagem: alça e ações num vidro escuro por cima da imagem.
- **Selo "Atualização do mês"**: todo item que entra ganha a **data de entrada**; o selo aparece só no mês dessa data e some
  sozinho no mês seguinte. Conteúdo migrado da plataforma antiga **não** ganha selo. No pack, as novas viram uma categoria
  em destaque no começo ("Atualização do mês"). Campo "Data de entrada" nas janelas, com "?" ("dá o selo do mês").
- **Trilha** (Início › Seção › Página) na barra do topo da área do membro, no lugar de um título grande; a tela manda a trilha
  (`<nav class="trilha">`) e o layout sobe para a barra.
- **Idiomas** (pt/es/en) no pé do menu (bandeira): a página vem em português e `idiomas.js` troca os textos no navegador
  (lista [pt, es, en]; nomes próprios e prompts ficam), guardado em `localStorage`. Vídeo da aula com link próprio por
  idioma quando tiver; banner pode ser "Só em português" (some nos outros idiomas).
- **Thumbnail do vídeo por curso**: na janela do curso, um **botão pequeno embaixo da capa** ("▶ Thumbnail do vídeo") abre
  uma **janelinha por cima** com a imagem, **Pronto**, **Trocar imagem** e **Excluir**. Sem thumbnail própria, ela **já vem
  com a capa do curso**; é a imagem do player antes do play em todas as aulas (vazia = capa). Campos `cursos.thumb` e
  `cursos.thumb_pos`. A imagem **preenche o quadro 16:9** (`object-fit:cover`: corta só a visualização, o arquivo fica
  inteiro) e a pessoa **sobe/desce o recorte** arrastando a imagem ou pela barrinha; o player usa a mesma posição
  (`background-position: center N%`). Vale para todo recorte de imagem em formato fixo (capa, banner, thumbnail).
  Regra geral: ajuste secundário de um cadastro = botão pequeno + janelinha, nunca um bloco grande aberto na janela.
- **Player próprio**: o YouTube fica escondido por baixo e os controles (play, barra, volume, tela cheia) são do app, no
  mesmo visual; usado na aula e na janela do "Comece por aqui".
- **Comece por aqui** = a ajuda do app em guias (blocos com miniatura → vídeo numa janela), com lupa que procura em tudo;
  o botão **Ajuda** do pé do menu leva direto para lá.
- **Gráfico com "Ver em tabela"** recolhido embaixo (os mesmos números em tabela, para quem não lê gráfico).
- **Vendas sem cadastro**: produto que chegou numa venda e não está cadastrado aparece numa dobra com **Cadastrar** (abre a
  janela do produto já preenchida) e **Dispensar** (some da lista).
- **Membro**: janela com "Gerar senha nova" no rodapé (mostra a senha num balão que fica até fechar) e "E-mail da compra"
  (outro e-mail usado no checkout cai nesta conta).

## Cartão de conta/integração enxuto (Criativos do Reino, 09/11/2026 — TODOS os apps)

Modelo: conta da Kiwify/Hotmart em Configurações (`admin-acesso.js` → `umaConta`). O cartão fechado mostra nome + selo da
plataforma + **lápis** (abre janela "Renomear") + situação à direita. Aberto:
- **Endereço**: campo escondido + olhinho + Copiar + ícone **Trocar endereço** + ícone **Excluir** (os dois abrem janela
  de confirmação), tudo numa linha. Sem linha de ações embaixo.
- "Como configurar na …" recolhido logo abaixo.
- **Token/segredo**: campo **curto (até ~520px)** com o valor guardado escondido (bolinhas, nunca "Guardado (cole outro…)"),
  **olhinho** para ver e **Salvar na mesma linha**. Salvar sem trocar não mexe em nada (não zera o "último aviso").
- Botão dentro de `<summary>` (lápis): o clique abre a janela e chama `preventDefault()` para não fechar/abrir o cartão.
- Antes de criar uma classe (`.lapis`, `.dica`…), procure se ela já existe no app: no Criativos as duas já existiam.

## Compacto: dobras e ajuda recolhida (decisão do Nilton, 07/11/2026 — vale para TODOS os apps)

O Nilton quer as telas **compactas e limpas** (fez muito isso no Criativos do Reino). Regras:
- **Configurações (e telas de ajuste) em dobras**: cada assunto é um bloco **fechado** com ícone + título à esquerda e a
  **situação** (selo: Pronto / Falta configurar / Não usado) à direita; abre ao tocar e **sempre vem fechado ao carregar a
  página** (decisão do Nilton, 09/11/2026: não lembrar o que estava aberto, nem depois de salvar). Blocos agrupados por títulos pequenos em
  maiúsculas ("INSTAGRAM E META", "VENDAS E ACESSO", "SEGURANÇA"), uma coluna de até ~880px. Só começa aberto o que
  está faltando configurar. Ações perigosas (excluir, trocar segredo) dentro do bloco, com janela de confirmação.
- **Tutorial nunca espalhado na tela**: vira um link pequeno "ⓘ Como configurar" que abre **um parágrafo curto** —
  onde ir, **o que marcar/preencher e o que deixar como está**. Nada de listas grandes de eventos, passo a passo de 6
  itens ou caixas explicativas abertas. Ex. Kiwify: "Apps → Webhooks → Criar webhook. Cole o endereço, marque só Compra
  aprovada, Reembolso, Chargeback, Assinatura cancelada e Assinatura renovada (os outros desmarcados) e cole o token aqui."
- Segredos (endereço de webhook, tokens) aparecem escondidos (bolinhas) com **Copiar** ao lado.
- **Gráficos em SVG esticável** (`preserveAspectRatio="none"`): **nunca** `<text>` dentro do SVG — as letras esticam e
  ficam "gordas" quando a tela alarga. Desenho (linhas/áreas/barras, com `vector-effect:non-scaling-stroke`) no SVG;
  números dos eixos, datas e balões em **HTML por cima**, posicionados em %. Modelo: `graficos.js` do Criativos/Postify e
  `grafico()` em `Postify/src/painel/painel.js`.
- Peças prontas no Postify (`src/painel/layout.js`): `dobra({ id, titulo, ico, situacao, corpo, aberto })` e
  `ajuda(titulo, corpo)` + CSS `.dobras`, `.dobras-titulo`, `.dobra`, `.ajuda-dobra`. Copiar para os outros apps.
- **Explicação de campo = "?" com texto ao passar o mouse** (pedido do Nilton, 07/11/2026, vale para TODOS os apps):
  nada de textinho cinza embaixo de campo, caixa de marcar ou opção ("Dispara com qualquer comentário…", "(só para
  você)", "Use 3 ou mais…"). Muito texto com pouca divisão confunde: a pessoa não sabe onde está. Primeiro **corte** o que
  não precisa explicar; o que for necessário vira um "?" numa bolinha ao lado do rótulo/título, que mostra o texto ao
  passar o mouse (ou tocar, no celular). Opções em cartão ficam só com o título (sem subtítulo repetindo o óbvio).
  Peça pronta no Postify: `dica(texto)` em `layout.js` (CSS `.dica`, tooltip escuro via `data-dica`; dentro de rótulo
  que usa `<b>` em bloco, deixe o `<b>` inline para o "?" ficar na mesma linha). O balão nunca pode ficar cortado:
  dentro de lista com rolagem ou perto da borda, abra para baixo/para dentro (ex.: `.dm-abas .dica::after{top:…;right:0}`).
  No Criativos do Reino (09/11/2026) a classe chama **`.dica-q`**, porque `.dica` já era o cartão de vídeo dos Guias.
  Antes de copiar, procure se a classe já existe no app. Lá o balão abre **para baixo e alinhado à esquerda da bolinha**
  (`left:-8px; top:calc(100% + 8px)`): no título perto do menu lateral, o balão centralizado ficava cortado.
- **Abas de filtro sempre no mesmo padrão do app** (`seg-grupo` + `seg-mini`, a aba aberta em branco e o número em
  bolinha roxa), inclusive dentro de colunas estreitas (ex.: Pendentes/Todas nas Conversas). Nada de estilo próprio numa
  tela só (pedido do Nilton, 08/11/2026: "o aplicativo tem que ter um padrão"). Em coluna estreita, só garantir que cabe.
- **Aviso depois de salvar = balão no canto de baixo** (pedido do Nilton, 07/11/2026, TODOS os apps): nunca uma faixa
  no topo da página ("Salvo.", "Atualizado: 15 posts…") — ela empurra tudo para baixo e "dá cara de amador". O aviso é um
  balão escuro fixo no canto inferior direito (no celular, acima da barra de baixo), com animação curta de entrar/sair;
  "ok" curto some sozinho em ~4 s; erro, aviso ou texto longo (senha para anotar) fica até a pessoa fechar no "x". Tira o
  `?ok=` do endereço para não reaparecer ao recarregar. Peça pronta no Postify: `pagina()` em `layout.js` (CSS `.toast`).
- **Selecionar em lote** (caixas de comentários, listas): botão "Selecionar" que troca, **no mesmo lugar**, pelos botões
  "N selecionados · Toda a página · Todos (total) · ação · Cancelar"; marca um por um com bolinha à esquerda. "Toda a
  página" = só os que estão à vista; "Todos" = todos do filtro, mesmo os das próximas páginas.
- Textos de exemplo na tela são **genéricos** ("preço", "quero, link"): nunca produtos, marcas ou perfis do Nilton ou de
  clientes dele — as telas são para qualquer pessoa que comprar o app.

## Organização das listas e caixas de entrada (FluxoPost, 07–08/11/2026 — vale para TODOS os apps)

- **Abas de situação + "Filtro"**: as abas dizem o estado (ex.: Comentários: Sem resposta · Respondidos · Ignorados ·
  Todos; Conversas: Pendentes · Todas), com o número só na aba que pede ação. O resto (origem: anúncio/post; rede:
  Instagram/Facebook) vai num botão **Filtro** que abre um menu pequeno; filtro ativo = botão roxo com o número de filtros
  e "Limpar filtro". Opção que ainda não existe aparece com "em breve", não some.
- **Ações só onde fazem sentido**: "Responder"/"Ignorar" só no que está sem resposta; o que já foi respondido é só para
  consulta. Lote: "Selecionar" → marca um a um, "Toda a página" ou "Todos" → botão **Ação** com as ações dentro (ex.:
  Enviar automação, Ignorar). Ação arriscada (mensagem privada) desligada com "Todos"; só para os marcados.
- "Resolvido" se chama **Ignorar** e vai para a aba **Ignorados** (dá para ver depois).
- **Cabeçalho de item padrão**: nome (sem @ — fica mais bonito) · 📅 dia · 🕐 hora (ícones pequenos) · etiquetas
  discretas (ex.: "Anúncio"). A resposta embaixo segue o **mesmo padrão** (nome · dia · hora · etiqueta de quem respondeu,
  ex.: "Automação · Nome da campanha"; resposta manual sem etiqueta), sem tracinho do lado, texto embaixo.
- **Selo da rede** (ícone do Instagram/Facebook) no canto da miniatura de todo item, para quando houver mais de uma rede.
- **Painel lateral útil** ao lado de caixas de entrada (ex.: "Palavras mais faladas" nos comentários sem automação, com
  botão que já cria a automação com a palavra). Cálculo pesado fica guardado e só é refeito de tempos em tempos (ex.: a
  cada 30 itens novos ou 30 min), nunca a cada abertura da tela.
- **Tela abre rápido**: nada de esperar busca externa (Meta) antes de mostrar a página; o que depende dela roda por trás e
  aparece na próxima vez. Aviso "Buscando…" só quando a lista ainda está vazia, e nada de recarregar a tela sozinha.
- **App leve (limpeza automática)**: o que já foi resolvido não fica guardado para sempre (ex.: conversa respondida sai em
  3 dias, pendente em 7, histórico de envios em 30). Explicar a regra no "?" da tela.
- **Comparações de período sem o dia de hoje** (o dia ainda não terminou e os números chegam incompletos): "últimos 7 dias"
  = os 7 dias até ontem, comparados com os 7 antes; avisar "(até ontem)". O gráfico pode mostrar hoje.
- **Erro da Meta vira frase simples** com o que fazer (ex.: perfil com conversas demais → "só depois que a Meta aprovar o
  acesso avançado"). Botão que nunca vai funcionar no caso da pessoa sai da tela em vez de dar erro.

## Ajuda dentro do app (decisões do Nilton, 17/10/2026)

- Item **"Ajuda"** (ícone `?`) no menu, na seção Configuração, e um link **"? Ajuda"** em cada tela de configuração
  (no fim das abas), que abre a Ajuda direto no passo daquela tela (`/ajuda#passo-<id>`). Nunca no cabeçalho.
- Página com duas abas: **Primeiros passos** (a jornada da primeira configuração, passos numerados num
  `<details>` cada, o próximo aberto, os outros recolhidos; "N de M passos feitos" + "Continuar: <passo>") e **Guias**
  **Adicionar algo novo** (casos depois da primeira vez; o nome "Guias" confundiu o Nilton): abre com "O que você quer
  fazer?" e cartões (produto novo, outra plataforma, outro pixel/página, links por canal); cada cartão faz as perguntas
  **uma de cada vez** e só então mostra os passos que valem, marcáveis (marcação no aparelho).
- Checklist **misto e por projeto**: o app marca sozinho o que consegue conferir (selo "o app conferiu"); o que
  acontece fora do app a pessoa marca ("Marcar como feito" / "Desmarcar"). "Limpar e recomeçar" em janela.
- Cada passo: 1 frase do porquê, passos numerados curtos, botão **"Ir para a tela"**; prints só das telas de fora
  (Hotmart, Kiwify, Meta), com dados sensíveis borrados.
- Enquanto faltar passo, faixa curta no topo da página inicial ("Faltam N passos… Próximo: X · Continuar", com ×).
- Teste de integração com prazo: **Começar teste** (código) → ver ao vivo o que sai e a resposta do serviço →
  **Terminar teste e ligar**; se esquecer, volta sozinho em 1 hora. Nunca deixar algo "em teste" sem prazo.
- Modelo: Pixel.Afilic `src/painel/ajuda.js` (passos, detecção, guias) e a aba Testar do pixel em
  `src/painel/extras.js` + `src/ao-vivo.js`.

## App instalável e notificações

- `manifest.webmanifest` (nome, ícones 192/512/maskable, `display: standalone`, `start_url` na tela principal),
  `sw.js` que guarda **só os ícones** (nunca telas nem dados) e mostra as notificações.
- Tela **App e notificações**: passo 1 "Instalar" (usa o instalador do aparelho; no iPhone, passo a passo do
  Safari), passo 2 "Permitir notificações", e a lista do que receber (cada aparelho escolhe). Detalhes em
  `gd-acesso-membros/referencias/avisos-push.md`.

## Como o código é feito (Pixel.Afilic)

- Node + Express, HTML montado no servidor em template strings; **sem framework de front**. Um CSS só, dentro de
  `layout.js`, e JS pequeno inline por tela (evento delegado em `document`, guardado com `window.__nome` para não
  ligar duas vezes).
- `pagina(titulo, corpo, { caminho, mensagem })` monta a casca; `esc()` em **todo** texto que vem de dado.
- Telas que mudam sozinhas (Eventos, Vendas) recarregam só os blocos que mudaram, sem piscar.

## Zap.Afilic (Next.js + Tailwind)

**Em 21/10/2026 o Zap passou para o grafite** (regra 22), no administrativo (CSS do Pixel regerado) e no escuro do
app (`globals.css`), com as regras 16, 17 e 18. Ao regerar o CSS, o conversor avisa se alguma cor do Pixel mudou.

**Administrativo e Minha conta = cópia do Pixel** (decisão do Nilton, 17/10/2026: o admin do Pixel é o padrão de
todos os apps, até o mínimo detalhe; só muda quando ele pedir). `src/components/gd/`: `shell.tsx` (a `pagina()` do
Pixel em React), `icon.tsx` (os ícones do Pixel), `behavior.tsx` (o SCRIPT do Pixel), `gd.css` gerado de
`src/painel/layout.js` do Pixel por `scripts/gd-css.cjs` (tudo dentro de `.gd`, cor verde do Zap no lugar do azul;
devolve o que o preflight do Tailwind tira: margem automática da janela, negrito dos títulos, números das listas).
Logo no mesmo espaço da do Pixel: 137 px de largura no menu, 123 px no topo do celular. O app de cada projeto ainda
tem o visual próprio (Tailwind), com a faixa "vendo como" do Pixel (`viewing-strip.tsx`) e o seletor "Projeto". Peças prontas em `src/components/dialog.tsx`: `Dialog` (janela), `PromptButton` (pede
um nome), `ConfirmDialog` e `ConfirmSubmit` (confirmação dentro de `<form>`, botão vermelho + Cancelar — usar no
lugar de `confirm()`). Cadastro com "+": `NewKeywordButton` (Palavras-chave), `NewAccountButton` (Admin → Contas),
`AddButton` em `configuracoes/settings-ui.tsx`. Prévia local: `EVOLUTION_URL= EVOLUTION_API_KEY= npx next dev`
(modo simulado, sem worker) e login de teste do seed.

**Tema escuro do app (Tailwind), ligado em 17/10/2026:** em vez de mexer tela por tela, a paleta inteira troca em
`:root[data-theme="dark"]` (`src/app/globals.css`): cinzas invertidos, superfícies e verde no tom escuro do Pixel,
avisos em tons escuros, Chat nas cores do WhatsApp escuro. Cuidados que apareceram: cores da marca em `@theme` sem
`inline` (senão viram valor fixo); cinza escuro com letra branca (pílula selecionada) precisa de letra escura no
escuro; fundo escurecido de janela (`bg-slate-900/40`) continua escuro; logo com a versão para fundo escuro.
Escolha guardada em `zap:tema` (a mesma do administrativo), aplicada antes de pintar no `<head>` e protegida por
`ThemeKeeper` (`src/components/theme-toggle.tsx`): o React redesenhava o `<html>` numa troca de tela e levava o tema
junto. Sol/lua no Painel, ao lado do sino. No Chat, as cores do app no lugar do cinza do WhatsApp (o Nilton achou que destoava),
com a mesma hierarquia do claro: lista #0f1b2e < passar o mouse #142339 < topos e campo de digitar #172a43 (o
"sobretom") < conversa aberta #1f3554; `hover:bg-white` vira um tom acima da superfície. **Antes de mostrar um tema
novo, teste todos os estados:** passar o mouse, selecionado, modo de seleção, menus, janelas, painel de emojis, anexo,
ficha, celular, e volte ao outro tema para ver que não mudou (pedido do Nilton, 17/10/2026).

Cores, medidas e o tema escuro completos: `referencias/tokens.md`.
