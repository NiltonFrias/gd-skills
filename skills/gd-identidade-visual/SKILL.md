---
name: gd-identidade-visual
description: Identidade visual dos apps e marcas do Nilton (família GD) — criar ou revisar o logo (símbolo + nome), cores, tipografia, ícone do app (favicon, PWA, Meta), ícones da interface e o manual da marca, antes de criar o app ou ao repaginar. Pede uma referência de logo, redesenha em vetor (nunca usa logo de IA cru), gera todas as versões por script a partir do desenho do menu do app e liga a marca ao app pelas variáveis de cor do projeto. Modelos aprovados: Criativos do Reino e FluxoPost. Use sempre que for criar marca/logo de um app novo, trocar ou ajustar logo, cores ou fonte, gerar ícones do app, ou quando a gd-matriz perguntar se quer revisar a identidade visual.
---

# Identidade visual (Etapa 0 da família GD)

A marca vem **antes** do app e serve para tudo depois: app, ícone no celular, Instagram, vídeo, página de vendas, e-mail.
Modelos que o Nilton mais gostou: **Criativos do Reino** (coroa + "Criativos do Reino" em Sora, dourado sobre preto) e
**FluxoPost** (símbolo isométrico em degradê roxo + "FluxoPost" em Figtree 600). Antes de começar, abra os dois:
- Criativos: `Criativos do Reino/Identidade Visual/Marca/` (svg, png, manual.html) e `app/scripts/marca/`
  (`medir-logo.py`, `gerar-logos.py`, `gerar-manual.py`); cópia no app em `app/public/marca/final/`.
- FluxoPost: `Post.Afilic/app/scripts/marca.js` (símbolo em caminhos SVG + ícones) e `Post.Afilic/identidade-visual/`.

## Quando usar

- **App novo (modo CRIAR da gd-matriz):** primeiro a marca, depois o app.
- **Repaginar (modo REVISAR):** a gd-matriz **pergunta** "Quer revisar também a identidade visual (logo, cores, fonte,
  ícones)?". Só mexe na marca se ele disser sim; a identidade do projeto não muda por conta própria.

## Passo a passo

1. **Perguntas por quiz** (o Nilton escolhe sempre por quiz, com opções): nome do produto (brasileiro, que diz o resultado),
   público, sensação (premium, tecnológico, acolhedor…), tema claro/escuro principal e **uma referência de logo** (print ou
   imagem de que ele gosta). Sem referência, mostre 3–4 caminhos diferentes de símbolo antes de desenhar.
2. **Conceito**: pode usar o Codex/IA de imagem para **explorar ideias** de símbolo, nunca como logo final (o Nilton
   rejeitou logos de IA: saem desproporcionais e sem construção). Skills de apoio: `logo-design` e `brand-identity`.
3. **Desenho em vetor de verdade**: o símbolo vira **caminhos SVG** com geometria (ex.: FluxoPost = dois painéis num
   ângulo isométrico de 30°, `PAINEIS` em `marca.js`; Criativos = a coroa redesenhada em vetor). Referência em imagem:
   redesenhe medindo, não "vetorize" automaticamente. Pontas e cantos coerentes com a fonte do nome.
4. **Nome (logotipo)**: uma fonte com personalidade e boa leitura pequena; o Nilton gosta de **pontas retas** (Comfortaa foi
   recusada por ser redonda). Aprovadas: **Sora** seminegrito (Criativos), **Figtree 600** (FluxoPost). A fonte da
   **interface** é outra, neutra (Poppins no Criativos, Onest no FluxoPost); serifada não entra na interface.
5. **Logo = o desenho do menu do app** (padrão único, decisão de 30/10/2026: "tem várias versões, tudo diferente"): mede-se o
   nome com o CSS do app (Criativos: `medir-logo.py` grava `medidas-logo.json`; carregue a fonte por arquivo, senão mede
   outra) e **todas as versões saem de um script** (`gerar-logos.py` / `marca.js`). Regras do Criativos que valem como
   modelo: símbolo com a mesma altura do nome na horizontal; na vertical, símbolo com ~55% da largura do nome; espaço
   símbolo→nome = 0,30 da altura; partes pequenas do nome ("do") na cor da parte grande ("Reino"). **Nunca editar PNG à
   mão**: mudou o desenho ou o CSS do menu → roda o script de novo nas duas pastas.
6. **Cores**: **uma cor de marca** + neutros (preto, branco, cinzas). Degradê só no símbolo/ícone quando fizer parte do
   desenho (FluxoPost: `#A646FF → #5B10D2`); senão chapada (Criativos: dourado `#F8C537`, sobre claro `#C99300`). Defina
   também a cor de texto sobre a cor da marca. No app isso vira `--projeto`, `--projeto-fundo`, `--projeto-ink`
   (`gd-layout-apps` → "Cor do projeto").
7. **Manual da marca** (`manual.html`, publicado também numa rota `/marca` do app quando fizer sentido): construção (grade,
   proporções, área de proteção), versões, cores com códigos, fontes, tamanho mínimo, **o que não fazer** (esticar, trocar
   cor, sombra, contorno, logo de IA).

## Entregáveis (sempre os mesmos nomes)

| Peça | Versões |
|---|---|
| Símbolo | cor (ou degradê), branco, escuro |
| Logo horizontal e vertical | para fundo escuro, para fundo claro, uma cor preta, uma cor branca, **caramelo/quente** para Instagram e vídeo; `-es` / `-en` se o app for multilíngue |
| Nome sozinho | as mesmas cores |
| Ícone do app | `favicon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (folga ~28% para o recorte do Android), `apple-touch-icon.png` (180), `badge-96.png` (notificação, monocromático), `icon-1024.png` (Meta/lojas), imagem de compartilhamento (og) |
| Manual | `manual.html` + `manual-construcao.svg` |

Ícone do app = **o símbolo sozinho** sobre o fundo da marca (quadro com cantos ~22%). O símbolo sozinho também é o que
aparece no **menu recolhido** e no favicon: tem que funcionar em 16px.

## Ícones da interface

Conjunto próprio em SVG 24×24, **traço 1.8**, pontas e cantos arredondados, sem preenchimento, todos com o mesmo peso
(FluxoPost: ícones `m-*` do menu em `layout.js`). Um ícone por função, sempre o mesmo em todo o app (relógio = em breve /
histórico, cadeado = bloqueado, olho = mostrar/esconder, lápis = editar, lixeira = excluir). Nada de emoji na interface.
Ícones de ferramentas de terceiros (Canva, Photoshop…) = o logo oficial em PNG, do mesmo tamanho.

## Onde guardar

- `<projeto>/Identidade Visual/Marca/` → `svg/`, `png/` (2000 px, fundo transparente, gerados dos SVG), `manual.html`.
- Cópia de uso no app: `app/public/marca/` (+ os ícones do PWA em `app/public/`).
- Scripts da marca em `app/scripts/marca/` (ou `scripts/marca.js`), para refazer tudo com um comando.

## Revisar a identidade (quando a gd-matriz perguntar e ele disser sim)

- [ ] Logo do app = o desenho do menu (mesma fonte, proporção e cores em todas as versões)?
- [ ] Símbolo legível em 16px (favicon, menu recolhido) e com folga no ícone maskable?
- [ ] Todos os ícones do PWA, badge e 1024 existem e são da marca atual (nada da marca antiga em `sw.js` / manifest)?
- [ ] Uma cor de marca só, aplicada nos 3 pontos do app (marquinha do menu, setinhas, play) e neutros no resto?
- [ ] Fonte do logo ≠ fonte da interface; interface sem serifada?
- [ ] Manual atualizado e PNGs refeitos pelo script (nenhum editado à mão)?
- [ ] Versões para Instagram/vídeo e idiomas, se o produto usa?
