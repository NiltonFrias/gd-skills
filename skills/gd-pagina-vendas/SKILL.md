---
name: gd-pagina-vendas
description: Como criar ou refazer uma página de vendas de infoproduto do Nilton (qualquer app ou marca) — o método de vendas (motor aprendido com o @gabrielpdigital, em METODO.md), a ordem das dobras escuras e claras, mockups sem fundo gerados pelo Codex com tela vazada preenchida em HTML, vitrine em fileiras, passo a passo com antes e depois, depoimentos em print de WhatsApp, bônus animados com a data de hoje, preço em pilha de valor + ingresso, conferência com Playwright e publicação pelo gerenciador de arquivos da Hostinger. Use sempre que for criar, refazer, mexer ou publicar qualquer página de vendas do Nilton.
---

# Página de vendas (skill GD)

Vale para qualquer produto. Cada marca pode ter a sua skill de projeto com cores, fontes e regras próprias
(ex.: `criativos-pagina-vendas` dentro do projeto): **leia as duas** — esta dá o método e as técnicas, a do
projeto dá a identidade e o que o dono já aprovou ou recusou naquela marca.

Método completo (de onde vem cada regra): [METODO.md](METODO.md). Ler antes de começar.

## Jeito de trabalhar (pedido do Nilton)

- **Mostrar no local antes de publicar.** Servir a pasta (`python -m http.server 4090`) e mandar o endereço
  `http://127.0.0.1:4090/`. Só subir depois do "pode subir".
- **Perguntar antes de montar, seção por seção** (pedido do Nilton, 31/10/2026). Cada produto pede mockups
  diferentes; não copiar os da página anterior. Antes de gerar imagem, perguntar (AskUserQuestion, com opções e
  prévia quando der): como ele imagina o **mockup do topo** (o mais importante), o da seção do app, o passo a passo,
  os bônus e a imagem da oferta. Ex.: no Carrossel ele não quis 3 celulares; quis um post do Instagram com o
  carrossel passando e as lâminas saindo do celular, mostrando a continuidade.
- **Pesquisar como o mercado apresenta o produto** antes de desenhar (ex.: "carousel post mockup", páginas de packs
  de carrossel, Behance/Dribbble/Pinterest, anúncios). Trazer 3 ou 4 jeitos de mostrar e recomendar um. O Nilton
  também pode mandar prints de referência.
- **Tudo bem dinâmico e animado**: preferir mostrar o processo em movimento (celular parado e as imagens andando
  por dentro, ferramenta "agindo" por cima da imagem, ex.: a tesoura do Fatiador cortando as dobras) a imagens paradas.
  Quando der, a animação é feita em HTML/CSS por cima de um aparelho com tela vazada, com imagens reais do produto.
- Começar guardando a **página antiga**: texto completo (`copy.md`), imagens, preço, link do checkout, order bump,
  depoimentos. Manter a copy e a experiência, melhorando pelo método.
- Mudanças em rodadas: o Nilton manda prints com observações; cada rodada vira um script `ajustes-vN.py` que edita
  o `modelo.html` (com `assert` em cada troca, para não errar em silêncio) e guarda a versão anterior.
- **Sigilo entre marcas**: nada na página pode ligar um produto a outro do mesmo dono (links, políticas, termos,
  nomes de arquivo, marca d'água). Políticas e termos em páginas da própria marca.
- Nunca inventar depoimento: usar o texto real de cada pessoa.

## Estrutura de arquivos

```
Paginas de Vendas/<Produto>/
  pagina-antiga/   copy.md + imagens/
  pagina-nova/     modelo.html (com {{MARCADORES}}) + montar.py → index.html; img/; gerarN/ (pedidos ao Codex)
  publicar/        index.html + zip das imagens para subir
```

`montar.py` preenche os marcadores: frases da faixa, as medidas das telas vazadas dos mockups, a vitrine,
depoimentos, exemplos. Lista `USADAS` para **nunca repetir a mesma arte** na página.

## Ordem das dobras (alternando escura e clara)

1. **Topo (escuro)**: logo pequeno · selo ("APP · Usado por +N…") · título (o que é + benefício + rápido) ·
   subtítulo · mockup do produto **em uso** (ex.: postado no Instagram + o app) · tópicos com visto. **Sem botão.**
2. **O produto por dentro (claro)**: mockup do app/aparelho com prints reais trocando sozinhos.
3. **O conteúdo (escuro)**: vitrine em 3 fileiras correndo (a do meio ao contrário), arrastável.
4. **Como funciona (claro)**: passo a passo em cartões com celular + título + texto, ligados por setas;
   antes e depois arrastável. **1º botão "Ver oferta especial" → #bonus.**
5. **Para quem é / sem ser especialista (escuro)**.
6. **Prova (claro)**: prints de WhatsApp em HTML (mensagens chegando uma a uma) + exemplos "do modelo ao resultado".
7. **Bônus (escuro)**: "Além do X, você também recebe N bônus" + "Válidos somente até **hoje**" (data por script).
   Cada bônus numa faixa grande com animação curta do que ele faz.
8. **Oferta (claro)**: imagem do produto + bônus sem fundo · **pilha de valor** (cada item com o valor, total
   riscado) · **ingresso escuro** com o preço, economia e o botão do checkout · uma frase só embaixo.
9. **Perguntas (escuro)** · 10. **Chamada final** · rodapé com políticas e termos da própria marca.

Botões: nunca no topo; todos "Ver oferta especial" → bônus; só o da oferta vai ao checkout, passando os
parâmetros do anúncio (`?utm…`, `src`, `sck`). Pixel pela skill `gd-pixel-meta`.

## Regras de visual que valeram

- **O cliente escaneia, não lê**: a imagem fala; textos curtos; listas viram chips com ícone.
- **Contraste das telas**: seção escura → telas dos mockups claras; seção clara → telas escuras.
- Nada pulando por cima dos mockups; aparelhos separados (sem encostar); mockup do topo no máx. ~860px no computador.
- Preço **não pode lembrar o concorrente** (cartão branco + vistos + caixa creme + faixa escura foi recusado).
- Quebras de linha controladas: `br.pc` / `br.cel` e `text-wrap:balance` nos títulos.
- Animações: entrada ao rolar (IntersectionObserver), fileiras em JS com arrastar, prints trocando com esmaecer.
  Respeitar "reduzir movimento". Sem barra fixa no celular e sem contadores de números (o Nilton tirou).
- Setas sobre imagem em vidro cinza translúcido (`backdrop-filter`), centralizadas entre as imagens.
- Antes e depois arrastável com um balãozinho "↔ Arraste a barrinha" que some quando a pessoa mexe.

## Imagens

- **Mockups pelo Codex, sem fundo**:
  `"/c/Users/Nilton Dell/AppData/Local/OpenAI/Codex/bin/<pasta>/codex.exe" exec --skip-git-repo-check --sandbox workspace-write -i ref.jpg - < prompt.txt`
  (a pasta muda quando o Codex atualiza: achar com `find "/c/Users/Nilton Dell/AppData/Local/OpenAI" -name codex.exe`; em 06/11/2026 era `a159911ff70742e9`).
  O Nilton prefere o mockup feito pelo Codex (com volume) a montagem em HTML; mostrar a imagem antes de publicar.
  (vários em paralelo, ~5 min cada). Pedir "fully TRANSPARENT background (alpha)"; plano B verde liso `#00B140`.
- **Tela vazada**: pedir a tela do aparelho TRANSPARENTE; o `montar.py` acha o buraco (flood-fill no alfa) e grava
  a posição em % para pôr por baixo um print real ou uma mini vitrine em HTML. Cantos da tela com
  `border-radius` em % (ex.: `15% / 7.2%` num celular) para não sobrar ponta quadrada.
- Para colar um print num mockup já pronto: recorte com máscara arredondada (PIL), medindo a caixa da tela.
- Prints reais do app: rodar a prévia com uma **cópia** do banco e fotografar com Playwright (tema por `localStorage`).
- Pessoas da equipe: usar fotos reais de referência; rosto gerado distorcido → usar print real.
- Público evangélico: pastor de terno; nada de colarinho, batina ou símbolo católico.

## Aprendido na Black 2026 (Combo, 06/11/2026)

- Oferta de combo: **uma imagem do Codex com tudo** (um notebook no centro, cursos em arco nada exagerado, calendário
  único maior, carrosséis saindo de celulares, molduras pretas finas, títulos 3D espalhados). No computador ~780 px de
  largura; no celular ocupando a tela. A mesma imagem vira o banner do checkout (com as cores da página).
- Copy: nunca "anual"/"vitalício"/"pagamento único" na página da campanha; embaixo do botão "Pix ou cartão · válido até
  …". Topo com prova social em bolinhas sobrepostas + "+8.000 membros" (o "+" translúcido, sem degradê).
- Números ("+8.000", "+4 anos") menores, com ícone alinhado e a legenda embaixo; letra cursiva maior quando destaca.
- Etiquetas dos bônus no formato contorno (IA e FERRAMENTA iguais); garantia compacta **embaixo do ingresso** do preço.
- Valor de cada item da pilha = preço real do produto (conferir na Kiwify); recalcular total e economia.
- Publicar pelo hPanel: "Acessar arquivos" abre o File Browser numa aba nova (sessão nova a cada vez; o endereço antigo
  dá 403). Pasta nova: "New folder". Conferir com md5 depois.

## Conferir antes de mostrar

- Playwright com o Chrome instalado (`channel="chrome"`), pelo Python do runtime do Editor Canva
  (`Editor Canva/App Editor Canva/runtime/python.exe`). Abrir com `#tudo` (a página põe `html.foto`, que mostra
  tudo sem esperar a rolagem e desliga transições), trocar `loading=lazy` por eager, rolar até o fim, esperar e
  tirar o print da página inteira em **390px** (celular) e **1366px** (computador). O Chrome sem tela comum tira o
  print cedo demais em página com muitas imagens.
- Conferir texto escuro em seção clara e quebras de linha nas duas larguras.

## Imagem de compartilhamento (WhatsApp, Instagram, Facebook)

Toda página tem a sua imagem de prévia, com a cara do produto: `img/og.jpg`, **1200 × 630**, JPG com menos de
300 KB (logo, selo, título com destaque, uma frase e o mockup do produto à direita, sem encostar no texto).
Gerada por `Paginas de Vendas/Motor de Vendas/og.py` (HTML + Playwright). No `<head>`: `og:type`, `og:site_name`,
`og:locale`, `og:url`, `og:title` (nome em negrito), `og:description` (frase de baixo), `og:image` e
`og:image:secure_url` com o **endereço completo** (https://…/img/og.jpg), `og:image:width/height` e
`twitter:card = summary_large_image`. O WhatsApp guarda a prévia antiga por um tempo: para testar, mandar o link
com `?v=2` no fim.

## Publicar (Hostinger, pelo gerenciador de arquivos)

- hPanel → File Manager / File Browser → `public_html/<pasta>`. Pelo Chrome do Nilton: enviar pelo input de
  arquivo escondido (`file_upload`) e escolher **"Replace all files"**. Imagens: subir o zip e extrair; depois
  apagar o zip **mandando para a lixeira** (desmarcar "Skip trash bin"; nunca apagar de vez).
- Conferir no ar: `curl` do endereço (200 e tamanho), `cmp`/md5 do `index.html` e das imagens contra o local.
- Avisar o Nilton para recarregar com Ctrl + F5.
