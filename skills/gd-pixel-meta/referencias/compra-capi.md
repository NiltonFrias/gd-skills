# Compra na Meta (API de Conversões) a partir do aviso de venda

## O que mandar

- Só `aprovada` vira `Purchase`. Pix/boleto gerado, pedido de reembolso, garantia encerrada etc. **não**.
- `event_id` = transação da plataforma (ex.: `HP...`). Assim a Meta deduplica se a mesma Compra chegar de
  novo (reenvio, pixel do navegador, outra integração que use a mesma chave).
- `event_time` = data de aprovação (segundos). A Meta só aceita até 7 dias para trás.
- `action_source = website`, `event_source_url` = página de venda (sem parâmetros sensíveis).
- `value` = comissão do produtor (padrão) ou preço; `currency` = moeda do aviso.
- `content_ids` = ID do produto na plataforma.
- `user_data`: e-mail, telefone, nome, sobrenome, cidade, estado, CEP, país (em SHA-256, normalizados) +
  `external_id`, `fbp`, `fbc`, IP e navegador do visitante (do rastreio). Quanto mais, melhor a qualidade.

## Order bump

Some o valor do bump na Compra principal (uma Compra só): espere ~60 s pela chegada do bump antes de
enviar a principal. Bump que chega depois do envio vai como Compra própria.

## Reembolso

Não há como "desfazer" uma Compra na Meta: ela continua contando no Gerenciador. O app tira a venda das
**suas** contas (faturamento, lucro, ROAS), mas a Meta mantém.

## Duplicidade

- A Hotmart (e outras) tem integração própria de pixel/API de Conversões por produto. Se estiver ligada
  junto com o seu app, a Meta recebe duas Compras com `event_id` diferente → contagem em dobro. Use só uma.
- Para conferir no Gerenciador de Eventos: evento Compra → Ver detalhes → Visão geral (navegador ×
  servidor), Origem do evento, Amostras de atividades, Desduplicação.

## Erros comuns

- Token sem permissão de leitura do pixel retorna "Missing Permission" no teste de conexão, mas o envio
  funciona: confirme pelo envio aceito (`events_received`).
- `test_event_code` em produção faz a Compra ir só para "Eventos de teste" (não conta nas campanhas).
