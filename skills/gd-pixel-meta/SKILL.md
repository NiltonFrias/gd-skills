---
name: gd-pixel-meta
description: Pixel do Facebook (Meta) e rastreio de vendas nos apps do Nilton — script da página (pixel no navegador + os mesmos eventos pela API de Conversões), PageView / ViewContent / InitiateCheckout / Compra, deduplicação por event_id, identificador do visitante no sck, fbp/fbc, parâmetro de URL dos anúncios (utm_*, xcod, src, sck), de qual campanha/anúncio veio a venda, nota de qualidade da Meta, teste com código TEST (início e fim, ao vivo), venda sem origem e atribuição pela Meta. Use sempre que for instalar, mudar ou depurar pixel, CAPI, eventos de página, parâmetro de URL, atribuição de venda a anúncio ou o teste do pixel em qualquer app do Nilton.
---

# Pixel da Meta e rastreio: do anúncio até a Compra

Conhecimento comum aos apps do Nilton. Nasceu no **Pixel.Afilic** (que faz o papel da UTMify: o Nilton não usa nem
quer usar a UTMify). O que for aprendido num app vale para todos: ao corrigir num, atualize esta skill.

Skills irmãs: `gd-vendas-infoproduto` (ler o aviso de venda da Hotmart/Kiwify/Greenn), `gd-layout-apps` (telas,
Ajuda, aba Testar), `gd-acesso-membros` (quem vê o quê; no projeto compartilhado a conexão do Facebook fica escondida).

## O caminho inteiro

```
Anúncio (parâmetro de URL) → página com o script → clique para o checkout → plataforma → aviso de venda → Compra na Meta
   utm_*, xcod, src, sck        PageView, ViewContent,      sck + _k<id>        Hotmart devolve    o app junta a venda   (CAPI, com fbp/fbc/IP
   (a Meta preenche {{…}})      InitiateCheckout             do visitante       src/sck/xcod       à visita pelo id      do visitante)
```

## Regras de ouro

1. **Um script só na página** (`p.js?s=<código da página>`): instala o pixel no navegador e manda **os mesmos
   eventos pelo servidor** (API de Conversões) com o **mesmo `event_id`** → a Meta junta os dois ("deduplicado").
   Pixel antigo na página junto = eventos em dobro: o script detecta e avisa ("pixel duplicado"), inclusive com o
   **mesmo ID** (outro `fbevents.js` ou um bloco `fbq('init'/'track')` na página). Caso real (18/10/2026): plugin de
   pixel do WordPress (eventID `ob3_plugin…`) mandando um PageView a mais na página do Carrossel. Qualquer evento que
   veja o outro pixel liga o aviso (o plugin pode carregar depois do PageView).
2. **Eventos da página:** PageView ao abrir; ViewContent uma vez, ao chegar no elemento `data-pixel-viewcontent`
   (os planos) ou na metade da página; InitiateCheckout uma vez, no clique para o checkout (plataformas marcadas +
   links próprios). Nome e ID do produto da página vão no ViewContent e no InitiateCheckout, iguais aos da Compra.
3. **A Compra sai do aviso de venda aprovada** (servidor), nunca do navegador: `event_id` = transação da plataforma.
   Detalhes em `referencias/compra-capi.md`.
4. **Identificador do visitante:** o script cria um id (cookie `_keg_id`, 32 hex), guarda fbp/fbc/IP/navegador e,
   no clique, pendura `_k<id>` no fim do `sck` do link do checkout. A plataforma devolve o `sck` → o app acha a
   visita e manda a Compra com os dados do navegador (qualidade muito maior). Retire o `_k…` antes de mostrar.
5. **De qual anúncio veio:** só do `xcod` (ou `utm_content`). O `sck` e o `src` são o **nome da campanha** (os dois
   iguais, decisão do Nilton de 18/10/2026: a Hotmart mostra src em "Origem" e sck em "Origem de Checkout").
   Nunca use o `sck` como nome do anúncio. Sem `xcod`, a campanha vem do `src`/`sck` e o anúncio fica vazio.
6. **O xcod não vem sozinho:** vem do parâmetro de URL colado no anúncio. Anúncio novo ou duplicado sem o
   parâmetro = venda sem anúncio. Lembre o usuário sempre (passo 9 da Ajuda do Pixel.Afilic).
7. **Teste com prazo:** o código `TEST…` da Meta faz o evento ir só para "Testar eventos" (não conta nas campanhas).
   Nunca deixe um pixel esquecido em teste: **Começar teste** (código, vale 1 hora) → ver ao vivo o que saiu e a
   resposta da Meta → **Terminar teste e ligar**; passou de 1 hora, volta sozinho para Ligado. Um código só, no pixel
   (as páginas usam o do pixel enquanto ele está em teste).
8. **Ninguém de fora lê a tela "Testar eventos" da Meta.** O app mostra o que ele mandou e se a Meta aceitou
   (`events_received`); o pixel do navegador e o "deduplicado" só a Meta mostra (botão que abre lá, no pixel certo:
   `business.facebook.com/events_manager2/list/dataset/<pixel>/test_events`).
9. **Token da API de Conversões** (Gerenciador de Eventos → Configurações → Gerar token, com ou sem "Dataset Quality
   API"): quase sempre só envia e não lê o pixel ("Missing Permission" no teste de conexão). **Não mostre como erro**:
   selo amarelo "confirmar no Testar" e a orientação de mandar a Compra de teste; a Compra de teste aceita (ou o primeiro
   evento aceito) vira "conectado". Vermelho só quando a Meta recusa de verdade. Guarde cifrado; mostre só o fim.
10. **Lista de permissões do pixel** (Gerenciador de Eventos → pixel → Configurações → Permissões de tráfego): desligada
    por padrão, não precisa fazer nada. Se a pessoa ligar, inclua o domínio da página de vendas e o domínio do app
    (de onde sai a Compra de teste). A Ajuda mostra o domínio do app para copiar.
11. **Um pixel por negócio, não por produto** (orientação dada ao Nilton, 18/10/2026): produtos do mesmo negócio e
    público usam o mesmo pixel (mais compras = aprende mais rápido; ticket diferente não atrapalha, cada Compra leva o
    valor). Remarketing e otimização por produto saem dos `content_ids`/`content_name` e da URL (públicos e conversões
    personalizadas). Outro pixel só para outro negócio/marca. O order bump vai no pixel do produto principal, mesmo
    que o produto do bump não tenha pixel.
12. **A plataforma também manda Compra para o pixel?** Desligue lá (ou no app): duas Compras com `event_id` diferente
    = contagem em dobro.

## Lead de entrada em grupo de WhatsApp (Afilic + Evolution + Meta, 22/10/2026)

Quando o Evolution avisa que a pessoa **entrou no grupo**, o app manda **Lead** pela API de Conversões, só se a entrada
veio de anúncio (o clique tem `fbclid`/`fbc`). O Lead leva tudo o que ajuda a Meta a achar a pessoa:
- `fbc` do clique (ou montado `fb.1.<hora do clique em ms>.<fbclid>` quando só há o fbclid) e `fbp` do navegador;
- **IP e aparelho do clique** (guardados no evento do clique, porque o aviso do grupo vem do servidor do Evolution);
- **telefone em código** (`ph` = sha256 só dos números, com o país), tirado do identificador do WhatsApp
  (`5511999999999@s.whatsapp.net`); celular do Brasil vai com e sem o 9; identificador oculto (`@lid`) não tem número;
- `external_id` = sha256 do identificador do participante (o mesmo que liga a entrada à saída).
`event_id` único por entrada. Quem fica 7 dias gera o evento "MembroFicou7Dias" (otimizar por quem fica).
O clique no botão que leva ao grupo vai como o evento padrão **Contact** ("Contato": a pessoa iniciou contato pelo
WhatsApp), não um nome inventado (antes era "GroupFlowClick"; decisão do Nilton, 22/10/2026). A tela Meta do app traz
o bloco "Parâmetro de URL dos anúncios" para copiar. **Para funil de grupo, o parâmetro é só o das UTMs**
(`utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}`):
`src`/`sck`/`xcod` são para venda na Hotmart/Kiwify (o Nilton notou que eram desnecessários ali).
Aprendido no teste de ponta a ponta (22/10/2026, página própria e página externa com script):
- **Qual clique ganha a entrada:** o aviso do grupo não diz quem clicou. Vale o clique pendente **mais antigo dos
  últimos 30 min** (fila de quem acabou de clicar); sem nenhum, o mais recente das 24 h. Pegar o mais antigo das 24 h
  fazia um clique velho de quem nunca entrou "roubar" a entrada, e o Lead não saía.
- **Visitante que volta por outro anúncio:** PageView e clique têm `event_id` por sessão (24 h) **e por fbclid**. Com um
  id só por pessoa, quem voltava não gerava clique novo (Lead sem o anúncio novo) e o PageView repetia o código antigo
  (a Meta descarta como duplicado). Quem volta continua indo para o mesmo grupo.
- **fbp/fbc até o clique:** a página externa (script) põe `_fbp`/`_fbc` no link de entrada **na hora do clique**
  (vale para botão que aparece depois, comum em construtor de página); a página no mesmo domínio manda os cookies na
  visita e o link de entrada lê os cookies `_fbp`/`_fbc`. O clique guarda IP e aparelho para o Lead.
- **Botão da página indo direto para o grupo** (`chat.whatsapp.com/…`) pula o redirecionador: não há clique, a entrada
  fica "Sem anúncio" e o Lead não sai (caso real, Nossa Casinha, 22/10/2026). O script troca sozinho esse link pelo
  link de entrada da estrutura (`entry` no endereço do script ou devolvido pela visita); oriente mesmo assim a apontar
  o botão para o link de entrada.
- **Link de teste abre a página de captura** (a da pessoa ou a do app), não o link de entrada: o teste precisa passar
  por visita → clique → entrada como uma pessoa real.
- Eventos "SubscribedButtonClick"/"Concluir inscrição" com id `ob3_plugin…` no "Testar eventos" vêm do pixel no
  navegador (eventos automáticos ou configurados na ferramenta da Meta), não do app.
- Cuidado ao gerar o script dentro de template string do servidor: `\.` e `\/` perdem a barra e a regra quebra calada
  (`/chat.whatsapp.com//i` vira uma divisão). Use comparação de texto (`indexOf`) ou escape duplo.
Modelo:
`serverlib/group-flow.mjs` (`phoneHashes`, webhook de grupo) e `serverlib/group-insights.mjs` no Afilic. Skill irmã
`gd-whatsapp-evolution`.

## Parâmetro de URL dos anúncios (padrão do Nilton)

```
utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}&xcod=FBhQwK21wXxR{{campaign.name}}|{{campaign.id}}hQwK21wXxR{{adset.name}}|{{adset.id}}hQwK21wXxR{{ad.name}}|{{ad.id}}hQwK21wXxR{{placement}}&src={{campaign.name}}&sck={{campaign.name}}
```

Os códigos dinâmicos da Meta são só: `{{campaign.id}}`, `{{campaign.name}}`, `{{adset.id}}`, `{{adset.name}}`,
`{{ad.id}}`, `{{ad.name}}`, `{{placement}}`, `{{site_source_name}}`. Região, idade e público não existem como
parâmetro. A Meta acrescenta sozinha `fbclid` e, às vezes, `utm_id`. Como ler o xcod: `referencias/rastreio.md`.

## Telas que todo app com pixel tem (modelo: Pixel.Afilic)

- **Pixel** (cadastro próprio: ID, token, Ligado/Desligado, valor = comissão ou preço, renovações, produtos que
  mandam a Compra para ele) com as abas **Conjunto de dados** (nota da Meta por evento, dados recebidos, servidor ×
  navegador, o que o app mandou em 7 dias), **Testar** e **Editar**.
- **Páginas** (domínio + caminhos, pixel, produto, eventos, plataformas de checkout) com Instalação (script) e
  Configurações. A página só aceita evento do domínio/caminho cadastrado.
- **Ajuda** com a jornada de configuração (ver `gd-layout-apps`).

## Visita sem anúncio: de onde veio (orgânico)

Sem parâmetro de anúncio na URL, o script descobre a origem e, no clique para o checkout, preenche `src` e `sck` (se o
link não tiver) com: `organico-instagram` / `-facebook` / `-tiktok` (pelo navegador de dentro do app: "Instagram",
"FBAN/FBAV", "musical_ly/Bytedance"), `organico-youtube` / `-google` / `-x` / `-linkedin` / `-pinterest` (pela página
de onde veio, `document.referrer`), `organico-meta` (só o `fbclid`), `outro-site` ou `direto` (sem de onde: **WhatsApp,
Telegram, e-mail e link digitado não dizem a origem**). Navegar dentro do próprio site mantém a origem da chegada
(cookie `_pxa_org`, 7 dias); chegar por anúncio apaga. Para WhatsApp e afins: **link próprio por canal** com
`src=link-<canal>&sck=link-<canal>` (gerador em Ajuda → Adicionar algo novo). No painel, `origemDoSrc` (Pixel.Afilic
`src/origem.js`) vira a "Fonte de tráfego" (Instagram orgânico, TikTok, YouTube, Google, WhatsApp, Link próprio, Direto…);
com xcod, vale sempre o anúncio.

## Venda sem origem e atribuição (regra única, decidida com o Nilton em 18/10/2026)

**Atribuída à Meta = sabemos a campanha**, por um destes, nesta ordem: IDs do `xcod` → conciliação com a Meta (dia +
valor da Compra registrada no anúncio, "atribuída pela Meta"; **refeita a cada sincronização** com os números
atuais da Meta, porque ela corrige Compras e valores ao longo do dia e uma ligação antiga pode deixar de valer; vale para venda
sem origem e para venda com src que não é campanha nem orgânico) → **visita pelo anúncio** (o visitante da venda entrou
na página por um anúncio antes de comprar) → **nome**: o `src`/`sck` é o nome de uma campanha da conta, ou começa
com ele (`Campanha-Conjunto-Anúncio`; vale o nome mais longo; nome repetido em duas campanhas não decide).
Não é Meta: **UTMs da plataforma sem o ID da campanha** (a Kiwify devolve utm_source/medium/content: `ig` + `social`
+ `link_in_bio` = "Instagram (link na bio)"; lidos do aviso original guardado, valem para vendas antigas), **venda com
comissão de afiliado** sem campanha nossa ("Afiliado · <rede>"; Hotmart `commissions[source=AFFILIATE]`, Kiwify
`commissioned_stores[type=affiliate]`), `organico-*`, `link-*`, `src` escrito só com o nome de outra rede ("tiktok", "wpp", "youtube"…) e o que for
marcado à mão. **Cuidado:** um `src` desconhecido (nome de página/link que não é campanha nem rede) não é orgânico: entra na
conciliação. Exceção combinada com o Nilton (18/10/2026): **"Renovacao" = link dele para os clientes antigos
(pack 1.0) migrarem para o plano novo** → canal próprio "Renovação (clientes do pack)", nunca conciliado com anúncio
(se a Meta der o crédito a um anúncio, a Conferência mostra a diferença, e é a Meta que está contando a mais).
Na tela Meta: **Vendas (produtos)** conta o order bump como mais um, **Conferência** compara pedidos, **Ticket médio**
= faturamento ÷ vendas (produtos).
**Sem atribuição** (a MESMA conta no Resumo, na tela Meta e na lista): sem nada de origem, só o nome que não bate
com nenhuma campanha (falta o xcod no anúncio) ou campanha de conta não ligada. O aviso leva para a lista "Vendas
sem atribuição", que mostra o que chegou (src/sck/xcod), o motivo e o link para o aviso completo.
Filtro "Fonte de tráfego": **Meta / Orgânico / Não identificada** (o detalhe por rede fica no gráfico).

**Visita achada pelo IP (18/10/2026):** venda sem `_k<id>` no sck, mas a plataforma manda o IP do comprador (Kiwify
`Customer.ip`): procure a visita com o mesmo IP (IPv6 na forma curta, sem `::ffff:`) que foi ao checkout nas 24 h antes
da aprovação e ligue **só se for a única**; na dúvida, não ligue (mandar o clique de outra pessoa é pior que nada). Sem
visita, o IP do comprador vai assim mesmo em `client_ip_address` (é dele e ajuda a Meta a achar a pessoa).

**Conferência na tela Meta (espelho):** por campanha/conjunto/anúncio, Compras que a Meta atribuiu × Compras que o app
ligou ("bate" ou "Meta 2 · Pixel 1"; order bump conta junto da principal). Diferença = atraso da Meta, janela de
atribuição dela (clique de dias antes: ex. a pessoa clicou no anúncio e voltou pelo TikTok) ou Compra sem o clique.
A tela UTMs mostra só as vendas fora do tráfego pago, pela origem, e cada venda sem atribuição com o aviso.

**Por que a Meta mostra menos Compras atribuídas que o app:** Compra sem os dados do clique ("só e-mail e
telefone") quase nunca é ligada ao anúncio. **E o contrário:** Compra que aparece na Meta com valor que o app não
mandou (caso real: 2 Compras de R$ 1,00) vem de OUTRO sistema mandando Compra para o mesmo pixel (integração da
plataforma, plugin, outra ferramenta). Veja no Gerenciador de Eventos → Integrações e desligue os outros envios de
Compra (regra 12), senão a Meta conta em dobro e com valor errado. Causas vistas (Criativos do Reino, 18/10/2026): página do produto sem
o script (instalar em todas as páginas de venda), renovação de assinatura enviada como Compra (melhor desligar
"renovações" no pixel) e compra por link direto do checkout. Olhe "Envio completo %" em Eventos.

## Onde está implementado

- Pixel.Afilic (Node/Express): script em `src/script-pagina.js`; envio em `src/meta.js` e a fila da Compra em
  `src/fila.js`; registro ao vivo em `src/ao-vivo.js`; telas Pixel/Páginas/Testar em `src/painel/extras.js`; nota da
  Meta em `src/qualidade-meta.js`; conciliação em `src/conciliar-meta.js`; xcod em `src/painel/dashboard.js`
  (`SEPARADOR_XCOD`); Ajuda e o parâmetro em `src/painel/ajuda.js`.
- Zap.Afilic: lê src/sck/xcod do aviso para a origem do contato (`src/lib/sales/tracking.ts`). Pendência: o
  "anúncio" do contato tem de vir do xcod, não do sck.

## Referências

- `referencias/rastreio.md` — src / sck / xcod, id do visitante, campanha/conjunto/anúncio.
- `referencias/compra-capi.md` — a Compra na API de Conversões: valor, event_id, order bump, reembolso, duplicidade.

## Eventos do webhook: sempre na ordem da tela (06/11/2026)

Ao dizer quais eventos marcar num webhook (Kiwify, Hotmart, Evolution…), liste na mesma ordem em que aparecem na tela da plataforma, de cima para baixo, com ✓ nos que marcar — a pessoa vai descendo e marcando sem procurar. Regra 10 e ordem da Kiwify na skill `gd-vendas-infoproduto` (`referencias/kiwify.md`).
