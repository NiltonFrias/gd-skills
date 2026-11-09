# Rastreio: de qual anúncio veio a venda

## Parâmetro de URL dos anúncios (padrão do Nilton, 18/10/2026)

```
utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}&xcod=FBhQwK21wXxR{{campaign.name}}|{{campaign.id}}hQwK21wXxR{{adset.name}}|{{adset.id}}hQwK21wXxR{{ad.name}}|{{ad.id}}hQwK21wXxR{{placement}}&src={{campaign.name}}&sck={{campaign.name}}
```

Primeiro o bruto, tudo separado (utm_* e xcod, com nomes e IDs); no fim, src e sck iguais (nome da campanha), para
achar rápido nas plataformas. Os parâmetros dinâmicos da Meta são só estes: `{{campaign.id}}`, `{{campaign.name}}`,
`{{adset.id}}`, `{{adset.name}}`, `{{ad.id}}`, `{{ad.name}}`, `{{placement}}` e `{{site_source_name}}` (fb, ig, an,
msg; o placement já diz isso). Região, idade e público não existem como parâmetro de URL. A Meta também acrescenta
`fbclid` e, às vezes, `utm_id` (ID da campanha) sozinha.

## Parâmetros que chegam no aviso (Hotmart: `data.purchase.origin`)

O link do anúncio leva parâmetros até a página, e a página repassa ao checkout. A plataforma devolve no
webhook o que chegou ao checkout:

- `src` — no padrão usado nos anúncios do Nilton, o **nome da campanha** (ex.: `CTZ-BR-26-OUT`).
- `sck` — desde 18/10/2026, também o **nome da campanha** (igual ao src: a Hotmart mostra src em "Origem" e sck em
  "Origem de Checkout"), mais o ID do visitante no fim (`CTZ-BR-26-OUT_k<32hex>`). Antes era o nome do anúncio
  (ex.: `A7`). **Nunca use o sck como nome do anúncio**: o anúncio vem do xcod (ou do `utm_content`).
- `xcod` — trilha completa da Meta, com as partes separadas por **`hQwK21wXxR`**:

```
FB hQwK21wXxR CAMPANHA|ID_CAMPANHA hQwK21wXxR CONJUNTO|ID_CONJUNTO hQwK21wXxR ANUNCIO|ID_ANUNCIO hQwK21wXxR POSICIONAMENTO
```

Exemplo real: `FBhQwK21wXxRCTZ-BR-26-OUT|120249829398870074hQwK21wXxRC7|120249867475940074hQwK21wXxRA7|120249867476140074hQwK21wXxRInstagram_Reels`

- Parte 0 = fonte (FB), parte 1 = campanha, 2 = conjunto, 3 = anúncio (cada uma "nome|id"), 4 = posicionamento.
- Com menos de 4 partes, não é um xcod válido.

Kiwify: `TrackingParameters { src, sck, utm_source, utm_medium, utm_campaign, utm_content, utm_term }`
(nome do formato público da Kiwify; ainda não visto num aviso real nosso: confirme no primeiro que chegar).

No Zap.Afilic (17/10/2026) o contato guarda `origem` (o src da **primeira** venda: de onde o cliente veio; não muda),
`ultima_origem` (o src mais recente) e `origem_anuncio` (sck), em Contatos → Campos e como `{origem}` nas mensagens
(`src/lib/sales/tracking.ts`). **Pendência:** com o sck = campanha (18/10/2026), o `origem_anuncio` do Zap tem de vir
do xcod (parte 3, nome do anúncio), não do sck.

## ID do visitante

O script da página gera um ID por visitante e o pendura no rastreio como `k` + 32 caracteres hexadecimais
(ex.: `...Instagram_Reelsk0123456789abcdef0123456789abcdef`). Para ler: procure `/k([a-f0-9]{32})(?![a-f0-9])/`
em sck, xcod e src; e **retire** esse sufixo antes de quebrar o xcod em partes.

Com esse ID dá para juntar a venda aos dados do navegador (fbp, fbc, IP, navegador) guardados quando a pessoa
visitou a página, e mandar à Meta uma Compra muito melhor identificada.

## Sem rastreio

Venda sem src/sck/xcod = "sem origem". A Meta pode ter atribuído a Compra a um anúncio (atribuição por
visualização/clique): dá para conciliar pelo dia + valor da Compra registrada no anúncio.

## Produto de cada campanha

Cada página de venda é de um produto. Se cada visita de anúncio guardar em qual página caiu, a campanha
herda o produto da página (maioria das visitas); sem visita, vale o produto das vendas que ela trouxe.
