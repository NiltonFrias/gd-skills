---
name: gd-whatsapp-evolution
description: Conexão de WhatsApp pelo Evolution API nos apps do Nilton (Afilic/Promo Afilic, Zap.Afilic e os próximos) — o servidor Evolution é do administrador (cadastrado uma vez no Administrativo), o cliente só cria a conexão e lê o QR Code; webhook de grupos (entrou/saiu), sincronização de grupos, link de convite, membros e página de entrada no grupo. Use sempre que for criar ou mexer em conexão de WhatsApp, QR Code, instância do Evolution, webhook de grupo, grupos do WhatsApp ou página de entrada no grupo em qualquer app do Nilton.
---

# WhatsApp pelo Evolution API

Padrão decidido pelo Nilton em 22/10/2026 (Afilic 2.7.x). Vale para todos os apps: ao aprender algo novo num app,
atualize esta skill. Skills irmãs: `gd-acesso-membros` (administrativo), `gd-layout-apps` (telas), `gd-pixel-meta`
(Lead e eventos para a Meta).

## Regras de ouro

1. **O servidor Evolution é do administrador.** Endereço (https://…) e API Key global ficam em
   **Administrativo → WhatsApp** (chave cifrada, nunca volta à tela; campo mascarado sem preenchimento automático).
   Um servidor só para todos os clientes. Botões: Salvar · Testar (lista as instâncias: "o Evolution respondeu, N
   conexões"). Mostra quantos clientes estão conectados.
2. **O cliente só faz duas coisas:** dá um nome à conexão → **Criar e gerar QR Code** → lê pelo celular
   (WhatsApp → Aparelhos conectados → Conectar aparelho). Nada de URL, API Key, instância ou webhook na tela dele.
   Se o administrador ainda não configurou: "A conexão com o WhatsApp ainda não está liberada. Fale com o suporte."
   O cliente **não pode** trocar o servidor (bloqueado também na rota, não só escondido).
3. **Nome da instância único no servidor compartilhado:** `<nome-do-cliente>-<8 primeiros do id do espaço>`. Dois
   clientes com o mesmo nome não podem colidir.
4. **Webhook ligado na criação** (só com endereço público https, `PUBLIC_APP_URL`): eventos
   `GROUP_PARTICIPANTS_UPDATE`, `GROUPS_UPSERT`, `GROUP_UPDATE`, URL com token próprio da conexão
   (`/api/group-flow/webhook/<token>`). Confira gravando e lendo de volta (`webhook/set` + `webhook/find`). Se falhar,
   a tela mostra "Ligar acompanhamento" (refaz o webhook). No teste local (sem https) o QR funciona e o webhook não.
5. **Tela do cliente:** a conexão fica **no topo** da página WhatsApp (nome, situação: Conectado / Falta ler o QR
   Code / Desconectado; ações Gerar QR Code, Desconectar, Excluir com confirmação na própria linha — nunca
   `confirm()`), e os grupos logo abaixo. QR em janela com contagem regressiva (45 s) e "Gerar novo QR".
6. **Situação real:** ao abrir a tela, consulta `instance/connectionState/<instância>`; 404 = a instância sumiu do
   servidor (deixa criar de novo).
7. **Grupos:** sincronizar com `group/fetchAllGroups/<instância>?getParticipants=false`; link de convite automático
   por `group/inviteCode/<instância>?groupJid=…` (ou link manual); participantes por `group/participants/…`.
   Foto do grupo vem do Evolution (`pictureUrl`) e **expira** — a página de entrada cai na silhueta padrão.
8. **Entrou/saiu:** o webhook grava `group_join`/`group_leave` com o participante em hash (sha256 do JID); a
   conferência periódica dos participantes cobre avisos perdidos. Lead para a Meta só de quem veio de anúncio
   (regras em `gd-pixel-meta`).

## Página de entrada no grupo (link de entrada / botão)

Modelo das páginas de convite (decisão do Nilton, 22/10/2026): fundo `#f4f4f4`, foto redonda 200 px, nome do grupo
(Montserrat 24 px 700 `#333`), botão **Entrar** (`#90ee90`, 52 px, raio 8, leva ao `chat.whatsapp.com/…`), botão
**Copiar o link do grupo** (`#f8f8f8`, borda `#ccc`), ajuda curta 12 px e **QR Code** gerado no servidor (pacote
`qrcode`). No celular abre o WhatsApp sozinho em ~1,2 s (se a pessoa não tocou em nada e não voltou para a página);
no computador não sai da página e mostra o QR para escanear.

## Onde está implementado

- **Afilic** (Next + Postgres): `serverlib/group-flow.mjs` (`evolutionConfig`, `adminEvolution`,
  `saveAdminEvolution`, `testAdminEvolution`, `createWhatsappConnection`, `setWebhook`, `whatsappStatus`,
  sincronização e participantes); webhook em `serverlib/evolution-payload.mjs`; rotas `app/api/admin/evolution`
  (administrador) e `app/api/group-flow/evolution` (cliente); telas `app/painel/whatsapp-admin.tsx` e
  `WhatsappConnectionCard` em `app/group-flow-client.tsx`; página de entrada em `app/entrar/[slug]/route.ts` +
  `public/entry-redirect.js`. Configuração guardada em `app_settings` (`evolution_url`, `evolution_api_key_cifrado`);
  a tabela antiga `evolution_settings` (por espaço) só vale se o administrador não configurou.
- **Zap.Afilic**: a migrar para este padrão (servidor no administrativo, cliente só QR).

## Eventos do webhook: sempre na ordem da tela (06/11/2026)

Ao dizer quais eventos marcar num webhook (Kiwify, Hotmart, Evolution…), liste na mesma ordem em que aparecem na tela da plataforma, de cima para baixo, com ✓ nos que marcar — a pessoa vai descendo e marcando sem procurar. Regra 10 e ordem da Kiwify na skill `gd-vendas-infoproduto` (`referencias/kiwify.md`).
