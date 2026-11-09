# Kit Gospel — a implementação de referência

Repositório `github.com/NiltonFrias/kit-gospel` (Node/Express + SQLite + EJS, Easypanel com volume `/app/data`).

## Acesso (`src/access.js`)

- `MODULES` = lista fixa `{ key, label, icon }`. `modulesFor(user)` monta `{ cartaz: true, … }` somando os
  módulos de todos os grupos do usuário; admin = tudo.
- `matchProducts({ id, name, offer, extra })`: vínculo bate quando o texto cadastrado é igual ao ID do produto
  ou ao código da oferta, **ou aparece no nome** do produto/oferta/plano (sem acento, minúsculo).
- `addToGroups` (INSERT OR IGNORE, devolve quantos entraram — 0 = renovação), `setUserGroups` (troca tudo, usado
  na tela do membro), `defaultGroup`.

## Webhook (`src/routes/webhook.js`) — `POST /api/webhook/<token>`

- Genérico: entende Hotmart v2 (`data.buyer`), Greenn (`client` + `currentStatus`) e procura e-mail/nome/
  telefone/produto em qualquer formato (`deepFind`) para outras plataformas.
- Hotmart: libera em `PURCHASE_APPROVED` (cada recorrência); tira em `PURCHASE_REFUNDED`, `PURCHASE_CHARGEBACK`
  e `PURCHASE_PROTEST`; ignora `PURCHASE_COMPLETE` (não soma acesso de novo).
- Greenn: `currentStatus = paid` libera; reembolso/chargeback da venda tira; o mesmo pagamento vem repetido
  → `sale_ref` no log garante uma liberação só.
- Sem vínculo → grupo padrão (o log diz "produto sem vínculo, usei o grupo padrão"). Sem vínculo e sem padrão →
  ignora e registra.
- Conta nova: senha de 8 caracteres, `must_change_password`, e-mail "Seu acesso ao <app> chegou! 🎉".
- Prazo: `MAX(...)` quando entra em grupo novo; soma quando é o mesmo grupo (renovação).

## Admin (`src/routes/admin.js`)

- `/admin/membros` (lista, filtro, 40 por página, contagem de aberturas, grupos de cada um), `/membros/novo`,
  `/membros/:id` (editar, grupos, plano, vencimento, ativo), `/renovar` (+N dias), `/senha` (gera nova e derruba
  as sessões), `/excluir`.
- `/admin/acessos`: grupos (criar, salvar módulos, tornar padrão, excluir) e produtos (vincular, salvar,
  excluir); mostra os produtos que já chegaram pelo webhook como atalhos.
- `/admin/avisos`: push para todos (com `{{nome}}`/`{{primeiro_nome}}`), histórico dos 20 últimos.
- Admin do ambiente (`ADMIN_EMAIL`/`ADMIN_PASSWORD`): recriado a cada deploy; e-mail e senha dele não mudam pela
  tela.

## Login (`src/auth.js`)

Sessão por token no banco (expira), `blocked` se `active = 0`, `expired` se `expires_at` passou — a tela de
login diz o motivo e mostra o link de compra/WhatsApp do suporte.
