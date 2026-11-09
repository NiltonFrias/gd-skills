---
name: gd-matriz
description: Skill matriz da família GD (apps do Nilton) — a porta de entrada que controla todas as outras skills GD. Dois modos — CRIAR um app novo já no padrão, ou REVISAR/ATUALIZAR um app existente (lê o app, lê as skills GD, abre o navegador e passa tela por tela tirando print, lista o que foge do padrão e corrige, sem mudar a identidade do projeto). Use sempre que o Nilton pedir para criar um app, "revisar o app", "atualizar com as skills", "deixar no padrão", "passar tela por tela", nivelar um projeto com outro (ex.: "o que fizemos no FluxoPost aplica aqui") ou quando não estiver claro qual skill GD usar.
---

# GD matriz: a skill que controla as outras

A família GD é o jeito do Nilton fazer app (Pixel.Afilic, Zap.Afilic, FluxoPost/Post.Afilic, Criativos do Reino, Kit Gospel
e os próximos). Cada assunto tem a sua skill; esta aqui decide **qual usar, em que ordem** e faz a **revisão tela por tela**.

**Por que não é uma skill só:** cada skill GD é grande e só entra quando o assunto aparece (economiza contexto e evita misturar
regra de webhook com regra de botão). A matriz é o índice + o roteiro + a revisão. Regra nova sempre vai para a skill do
assunto **e**, se for de conferir em tela, para o checklist daqui.

## As etapas (skills da família)

| # | Etapa | Skill | Quando |
|---|-------|-------|--------|
| 0 | **Identidade visual** | `gd-identidade-visual` | logo (símbolo + nome), cores, fontes, ícone do app, ícones da interface e manual — **antes** do app |
| 1 | **Base de acesso** | `gd-acesso-membros` | login, administrativo × área do membro, "Ver como membro/admin", membros, grupos, produtos da venda, prazos, avisos (push), Analytics |
| 2 | **Interface** | `gd-layout-apps` | casca (menu em seções, recolher, celular), botões, "?", dobras, janelas, selos, abas, cores, tema escuro |
| 3 | **Infoprodutor (vendas)** | `gd-vendas-infoproduto` | webhooks Hotmart/Kiwify (Greenn saiu em 09/11/2026), situação da venda, order bump, quais eventos marcar (repo público para o sócio: dar `git push` ao mudar) |
| 4 | **Rastreio** | `gd-pixel-meta` | pixel + API de Conversões, utm/xcod/sck, atribuição |
| 5 | **WhatsApp** | `gd-whatsapp-evolution` | conexão Evolution, QR Code, grupos |
| 6 | **Publicar na Meta** | `gd-publicar-app-meta` | app que outras pessoas conectam com Facebook/Instagram |
| 7 | **Página de vendas** | `gd-pagina-vendas` | página do produto |
| 8 | **Vinculação de plataforma do usuário** | *(a fazer)* | apps em que o **cliente** conecta a própria conta da Kiwify/Hotmart (não o administrador) |

**Etapa 8 — a fazer (pedido do Nilton, 09/11/2026):** hoje as plataformas de venda (várias Kiwify/Hotmart como contas)
ficam em **Configurações do administrativo** (o dono do app). Alguns apps vão precisar que **cada usuário** conecte a
própria conta (ex.: rastreio de vendas do cliente, como no Pixel.Afilic). Quando chegar a hora: separar claramente
"plataformas do administrador" × "plataformas do usuário" (na conta/projeto do usuário, com endereço e token próprios),
reaproveitando `gd-vendas-infoproduto` para ler os avisos e o cartão de conta enxuto da `gd-layout-apps`.

Skills de um projeto só (ex.: `criativos-do-reino-design`, `criativos-*`) mandam na **identidade** daquele app (marca, cores
da área do membro, imagens). A GD manda no **comportamento e no padrão de tela**. Em conflito: identidade = skill do projeto;
estrutura, administrativo, botões, "?", menu = GD.

**Sem as pastas dos projetos** (ex.: no computador do sócio): os arquivos-modelo citados nas skills GD (Criativos do Reino
e FluxoPost/Post.Afilic: `layout.js`, `admin-acesso.js`, `admin-membros.js`, `marca.js`, scripts e arquivos da marca) estão
copiados em `~/.claude/skills/gd-matriz/modelos/` (veja o `LEIA-ME.md` de lá). Use-os como referência; não são um app pronto.

## Modo CRIAR (app novo)

0. **Marca primeiro** (`gd-identidade-visual`): logo, cores, fontes e ícones, com referência e quiz.
1. Pergunte o que a `gd-layout-apps` manda perguntar (nome, projetos ou conta única, telas principais) — por quiz.
2. Etapa 1 + 2 juntas: casca com administrativo + "Ver como membro" + menu em seções, já com os ajudantes `dica()`,
   `ajuda()`, `dobra()`, balão de aviso (toast), botões no padrão.
3. Etapas 3–7 só se o app precisar.
4. No fim, rode o **Modo REVISAR** no app novo antes de entregar.

## Modo REVISAR / ATUALIZAR (app existente)

Objetivo: nivelar o app com tudo que as skills GD já sabem, **sem mudar o que é próprio do projeto** (funções, marca, conteúdo).

1. **Ler o projeto**: LEIA-ME/CLAUDE.md, memória, a skill do projeto, `git log` recente. Anotar a identidade que não muda.
   **Pergunte por quiz: "Quer revisar também a identidade visual (logo, cores, fonte, ícones)?"** Se sim, rode a
   `gd-identidade-visual` (seção "Revisar a identidade") antes das telas.
2. **Ler as skills GD** das etapas que o app usa (pelo menos `gd-layout-apps` e `gd-acesso-membros`).
3. **Subir uma prévia local** — nunca mexer na produção para testar:
   - copie o banco local para a pasta de rascunho (scratchpad) e rode o servidor apontando para a cópia;
   - crie um administrador de teste na cópia (senha sorteada guardada num arquivo da prévia, nunca dita no chat);
   - o servidor guarda CSS em memória: **reinicie a prévia a cada mudança**.
4. **Passar tela por tela no navegador** (Claude in Chrome, `browser_batch` para ir rápido) e tirar print de:
   - todas as telas do administrativo **e** da área do membro (liste as rotas `get(` do servidor);
   - cada janela (abrir com `.click()` no botão de editar/novo), cada dobra aberta;
   - menu aberto e **recolhido**; tema escuro; largura de celular (~390px);
   - estados: vazio, com dados, com nome comprido.
   - **Conferidor automático** (rápido, sem print): numa aba logada, um script abre cada rota num `<iframe>` escondido e
     lista campo com altura ≠ 40px, fundo de campo diferente de `--s2`, frase solta embaixo de título etc. Ex. usado no
     Criativos (09/11/2026): `for (r of rotas) { iframe.src = r; … getComputedStyle(campo).height / backgroundColor }`.
     Se o app bloqueia iframe (FluxoPost), abra cada rota na própria aba e rode o mesmo script guardado no `localStorage`.
     Sem a extensão do Chrome: Playwright com o Edge do Windows (`playwright-core` na pasta de rascunho, `channel: 'msedge'`).
5. **Forçar, não aproximar** (Nilton, 09/11/2026: "tem coisa que a gente não forçou e acabou não mudando"): Membros,
   Grupos e ofertas e Configurações são **cópia da tela do Criativos do Reino** (`Criativos do Reino/app/src/painel/admin-acesso.js`
   e o CSS de `layout.js`), não uma versão parecida. Abra o código de lá e copie a estrutura (seções, dobras, tabela com
   funil, reloginho) e o CSS; mude só cores e nomes. Antes de colar CSS, procure se o app já usa a classe com outro
   sentido (no FluxoPost `.plat`, `.funil` e `.dobra` já existiam e quebraram a tela; renomeie: `selo-plat`, `m-funil`).
   Detalhe próprio do app que o Nilton aprovou (ex.: divisórias de coluna na tabela do FluxoPost) fica.
6. **Comparar com o checklist** abaixo, anotar tudo numa lista e **corrigir** (preferir trocar o ajudante comum — ex.:
   `campo()`, `cab()`, `janela()` — que conserta todas as telas de uma vez, em vez de remendar tela a tela).
7. **Print de novo** de cada tela corrigida. Só diga "pronto" com a conferência feita.
8. Contar ao Nilton o que mudou (curto, por tela) e o que ficou de fora; **subir só quando ele disser** ("pode subir"),
   comitando só os arquivos da mudança.

### Checklist de tela (resumo; a regra completa está na skill indicada)

**Menu e casca** (`gd-layout-apps` → "Menu lateral: regras completas")
- [ ] Menu em **seções com título** pequeno em maiúsculas (admin: CONTEÚDO/ADMINISTRATIVO/CONTA; app: PRINCIPAL/CONTA).
- [ ] Recolher pela setinha no topo; recolhido = só ícones, **tracinho** no lugar de cada título, nada sai do lugar.
- [ ] **"Ver como membro" / "Ver como admin" na seção CONTA do menu lateral**, nas duas áreas.
- [ ] Item aberto com fundo + marquinha; ícones do mesmo traço.

**Textos**
- [ ] Nenhuma frase embaixo do título da tela: vira **"?"** ao lado do título (alinhado ao meio, "?" em SVG).
- [ ] Nenhum texto pequeno embaixo/ao lado de campo, opção, caixa de marcar ou cartão: vira **"?"** ou some.
- [ ] Instrução longa = `ajuda('Como …')` recolhida. Listas (grupos, produtos) **só com o nome**; detalhe na janela/no hover.
- [ ] Rótulos **curtos** ("Auto" e não "Automático"; "Oferta", "Código", "Grupo"). Exemplos genéricos, nunca marcas do Nilton.

**Botões** (`gd-layout-apps` → "Botões: padrão único")
- [ ] Três tipos só: principal, comum, secundário (+ perigo na confirmação). Sem dourado/degradê se o Nilton não pediu.
- [ ] Secundário/pequeno 32px; linha do título com botões da mesma altura; rodapé de janela com a mesma altura.
- [ ] Ação de linha = **ícone** (lápis renomear/editar, girar trocar, lixeira excluir), nunca link sublinhado ou fileira no pé.

**Formulários e cores**
- [ ] Radio e caixa de marcar com desenho próprio neutro (nada do laranja do navegador).
- [ ] **Administrativo em cor universal** (preto/cinza/branco: foco, setas, opção escolhida, "Como configurar"); a cor da
      marca fica na área do membro e na marquinha do menu.
- [ ] Segredos (endereço, token, senha) escondidos com **olhinho**, campo curto, Salvar na mesma linha.
- [ ] Período/filtros curtos = **abas segmentadas**.
- [ ] Largura certa: listas/ajustes até 1100px; tabela grande, cartões e Analytics na largura toda. 12px entre título e bloco.
- [ ] Ícones dos números e gráficos do administrativo em cinza (nada de creme/laranja da marca).
- [ ] Bolinha/foto/ícone ao lado de texto centralizado no bloco; letra dentro do círculo no centro (conferir com zoom).
- [ ] Janela com muitas caixas de marcar = seções em sanfona (fechadas, "3 de 5", marcar a seção inteira).
- [ ] Cor do projeto (`--projeto`) só na marquinha do menu, nas setinhas dos cartões e na bola do play (cor do projeto, formato do relógio).
- [ ] Botões em cinza escuro (não preto); botão ao lado de campo com 32px centralizado; 8px entre botões.
- [ ] Cartões: descrições alinhadas (título reserva 2 linhas); olhinho de mostrar/esconder em todo cartão; alça branca.
- [ ] Seleção em cinza ~90% (`--sel`), não preto; cartões com estados Em breve (relógio) / Não liberado (cadeado) / play.
- [ ] Campos de preencher com fundo cinza claro (branco no foco), 40px.
- [ ] Dobras sempre fechadas ao carregar; campos com uma altura só (40px); lista grande com "Carregar mais".
- [ ] Números de resumo sem ação numa linha compacta (sem cartão/clique); aula/vídeo com sinalização neutra.
- [ ] Números de passo/aula em quadradinho; tela de instalar com o cartão "Leve o app no celular" (ícone do app).
- [ ] Seções sem número; botão de ícone com a mesma altura do botão pequeno ao lado.
- [ ] Pé do menu: **bolinha do perfil com nome e e-mail ao lado** (menu aberto) + idioma (só se o app tiver tradução) + luazinha; recolhido, **só a bolinha**. Tocar na bolinha: nome e e-mail, Comece por aqui (se tiver ajuda), Minha conta, **Modo escuro/claro**, Sair (FluxoPost, 09/11/2026). No Criativos o pé também tem Ajuda. Menu do perfil: inicial + nome + e-mail (sem "Conectado como"/selo), Comece por aqui, Favoritos (se fizer sentido), Minha conta, Sair.

**Administrativo igual ao Criativos** (09/11/2026, FluxoPost)
- [ ] **Membros**: título + "+ Novo membro"; números numa linha compacta com a **busca à direita**; sem abas nem select
      de origem em cima; tabela com cabeçalho em maiúsculas pequenas e **funil** em Origem, Entrou em, Último acesso,
      Situação e Acesso até; selo da plataforma colorido (Kiwify verde, Hotmart laranja, Manual cinza); **reloginho**
      (histórico em janelinha, 15 por vez) + lápis; tocar na linha abre o membro; paginação com números e "Ir para".
- [ ] **Grupos e ofertas**: seções "Grupos ?", "Produtos ?", "Vendas recebidas ?" com o "+ Novo" à direita (secundário);
      grupo = linha só com o nome + números ao lado + lápis; produtos **em dobras por conta da plataforma** (nome da conta +
      selo Kiwify/Hotmart + "N produtos"); vendas em dobras "Últimas vendas" e "Vendas sem cadastro".
- [ ] **Configurações**: seções com título + "?" (Plataformas de venda + "Adicionar plataforma", Senha dos membros, E-mail,
      e as do app, ex.: **Meta**, Cópias de segurança); cada item é uma dobra com **setinha à esquerda** e selo à direita;
      endereço/token/senha escondidos com olhinho e o botão na mesma linha.
- [ ] Plataformas de venda: só **Kiwify e Hotmart** (Greenn saiu em 09/11/2026).
- [ ] Ícones da troca de área: "Ver como membro" = olho; "Ver como admin" = **escudinho com ✓** (o do Criativos).

**Mídia de post** (09/11/2026)
- [ ] Janela/tela de post: a mídia no **formato real** (4:5, quadrado, 9:16), preenchendo a caixa, **sem faixas pretas**;
      a janela se ajusta à largura da mídia. Título "Descrição" **dentro** do bloco, alinhado com o topo da imagem.
- [ ] Tela "vitrine" (palco, ex.: Espionar): no tema claro, palco **claro** e tecnológico (grade de **linhas** fininhas,
      cantoneiras de mira, varredura; **sem bolinhas e sem anéis** em volta do emblema — Nilton não gostou); escuro só no tema escuro. Cantos 12px, emblema grande acima do título.

**Área de membros** (`gd-layout-apps` → "Peças prontas do Criativos do Reino")
- [ ] Reordenar arrastando (alça ⠿) onde a ordem importa; a ordem do admin é a do membro.
- [ ] Selo "Atualização do mês" pela data de entrada (migração sem selo); trilha na barra do topo; idiomas no pé do menu.
- [ ] Ajuda = "Comece por aqui" em guias, ligado ao botão Ajuda do pé do menu.

**Comportamento** (`gd-layout-apps` → "Compacto" e `gd-acesso-membros`)
- [ ] Configurações em **dobras** fechadas com situação à direita; cartão de conta enxuto (lápis no topo, ícones no endereço).
- [ ] Aviso depois de salvar = **balão no canto** (toast), nunca faixa no topo.
- [ ] Nada se mexe de lugar ao selecionar/criar; nada fica por cima de nada.
- [ ] Integrações de venda com o texto pronto "Como configurar" (só os eventos a marcar, na ordem da tela).

## Quando aparecer regra nova

1. Grave na skill do assunto (com a data e o porquê).
2. Se dá para conferir olhando a tela, acrescente uma linha no checklist acima.
3. Se for do `gd-vendas-infoproduto`, dê commit + push no repo público dele.
