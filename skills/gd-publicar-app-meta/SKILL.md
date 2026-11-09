---
name: gd-publicar-app-meta
description: Boas práticas para preparar e publicar um app do Nilton na Meta (Facebook/Instagram) para que OUTRAS pessoas conectem o Facebook/Instagram delas só fazendo login — modo Desenvolvimento x Ao vivo, acesso padrão x avançado, Análise do app (App Review) com vídeo legendado em inglês e usuário de teste para o analista, Verificação da empresa, Verificação de acesso (Provedor de Tecnologia), Renovação anual do acesso a dados, páginas legais (privacidade, termos, exclusão de dados por callback), webhooks e checklist de vistoria. Use sempre que for publicar, revisar, pedir permissão avançada, gravar o vídeo da análise, criar conta para o revisor da Meta, responder a uma recusa da Meta ou conferir se um app (Pixel.Afilic, Postify, Zap.Afilic e os próximos) está pronto para vender.
---

# Publicar um app na Meta (para outras pessoas usarem)

Aprendido no **Pixel.Afilic** (out/2026: `ads_read` avançado, verificação de acesso) e no **Postify** (nov/2026:
Instagram, webhooks, Direct). Linguagem com o Nilton: português simples; tudo que vai para a Meta (descrições, vídeo,
instruções do analista) em **inglês**.

## 1. Os níveis (o que cada um libera)

| Situação | Quem consegue usar | O que precisa |
|---|---|---|
| **Desenvolvimento** | só quem tem função no app (admin, desenvolvedor, testador) | nada. **Webhooks reais NÃO chegam** (nem do admin): só os de "Teste" do painel |
| **Ao vivo + acesso padrão** | contas de quem tem função no app (ex.: os perfis do próprio Nilton) | páginas legais, ícone, categoria, **Renovação do acesso a dados** aprovada |
| **Ao vivo + acesso avançado** | qualquer pessoa/empresa | **Análise do app** aprovada para cada permissão + **Verificação da empresa** + (para apps que atendem outras empresas) **Verificação de acesso / Provedor de Tecnologia** |

Regra de ouro: **peça só as permissões que o app usa de verdade** e que aparecem no vídeo. Permissão sobrando é o
motivo nº 1 de recusa. Antes de enviar, tire da configuração do login o que não é usado.

## 2. Antes de qualquer envio (checklist do painel)

Configurações do app → Básico:
- [ ] **Nome de exibição**, **ícone** 1024x1024 (o Nilton sobe o arquivo; o Claude indica qual), **categoria**, **e-mail de contato**.
- [ ] **Domínios do app** = o domínio do app (ex.: `postify.afilic.com.br`).
- [ ] **Política de Privacidade** e **Termos** abertos, sem login, no próprio domínio (`/privacidade`, `/termos`), citando a
      empresa responsável (**GERACAO DESIGNER LTDA, CNPJ 41.021.204/0001-96** — a mesma da Renovação de dados) e o que o app guarda.
- [ ] **Exclusão de dados**: prefira **"URL de callback"** (`/exclusao-de-dados/retorno`): a Meta manda um `signed_request`
      (HMAC-SHA256 com a chave secreta), o app responde `{ url, confirmation_code }` e a página `/exclusao-de-dados?codigo=` mostra
      o pedido. Motivo: no Postify o robô de prévia da Meta (`facebookexternalhit`) recebia **403** no domínio novo e a
      "URL de instruções" era recusada ("should represent a valid URL"), mesmo com a página no ar. Callback não depende do robô.
- [ ] **`/robots.txt`** liberando tudo (`User-agent: * / Allow: /`). Sem ele, o app redirecionava para o login e o robô
      tratava como bloqueio. Teste no **Depurador de compartilhamento** (developers.facebook.com/tools/debug) — tem que dar 200.
- [ ] **Página pública na raiz do domínio** (quem não está logado vê o que o app faz, preço/contato, links legais). A
      Verificação de acesso pede um "Website" que explique o serviço (no Pixel: `src/painel/publica.js`).
- [ ] **Portfólio (BM 1 - Geração) verificado** — já está (`525567704755739`).
- [ ] **Login do Facebook para Empresas**: uma **configuração** com as permissões certas → `META_LOGIN_CONFIG_ID` no Easypanel.
      Mudou permissão? Cada pessoa precisa **"Conectar de novo"** para aceitar.
- [ ] **Webhooks** (se o app recebe eventos): produto Webhooks → objeto certo (Instagram/Page) → URL de callback + token de
      verificação (`META_WEBHOOK_TOKEN`, a pessoa gera e cola; o Claude não cria chaves) → assinar só os campos usados.
      O app confere `X-Hub-Signature-256` com a chave secreta. Para Directs do Instagram, inscrever a Página
      (`POST /{page-id}/subscribed_apps`, precisa de `pages_manage_metadata`) e, no celular da conta, "Permitir acesso às
      mensagens" (Configurações → Tipo e ferramentas da conta → Ferramentas de mensagem → Controles de mensagem).

## 3. Renovação do acesso a dados (Data Use Checkup) — anual

Ações necessárias → Renovação → Começar. As **certificações ("Certifico que…") o Nilton marca** (é declaração legal
dele; o Claude não pode marcar). Respostas que serviram para Pixel e Postify:
- Operadores de dados com acesso: **Não** (servidor próprio na VPS). *Se usar Hostinger como hospedagem, o Pixel declarou "Hostinger" como operador — manter coerente entre os apps.*
- Responsável: **Geração Digital LTDA / GERACAO DESIGNER LTDA**, Brasil.
- Pedidos de autoridades nos últimos 12 meses: **Não**; políticas: análise de legitimidade + minimização de dados.
- Política de privacidade: a URL do domínio (precisa abrir para o robô).
Sem a renovação aprovada, a chave **Ao vivo** fica travada ("Não é possível mudar para o modo publicado"). Aprovação ~1 a 10 dias; depois **o Nilton** liga "Ao vivo".

## 4. Análise do app (acesso avançado), uma permissão por vez ou em lote

Análise do app → Permissões e recursos → "Solicitar acesso avançado" em cada uma → Pedidos → Editar. Para cada permissão:

1. **Descrição de uso (inglês)**: o que o app faz com ela, para quem, onde aparece na tela. Concreto, sem marketing.
   Ex.: *"Postify lets Instagram creators schedule posts. We use instagram_content_publish to publish the photo/carousel/reel
   the user scheduled, at the time they chose, on the Instagram professional account they connected."*
2. **Vídeo (screencast)**, em inglês ou com **legendas em inglês**, 1 a 4 min, mostrando de ponta a ponta:
   - o login: botão "Connect with Facebook" → diálogo da Meta **mostrando as permissões** → escolha da conta → volta ao app;
   - o uso de **cada** permissão pedida, com o dado da Meta aparecendo na tela (ex.: publicar e abrir o post no Instagram;
     comentário chegando e o Direct enviado; insights na tela).
   - Como gravar no Windows: `ffmpeg -f gdigrab -framerate 30 -offset_x X -offset_y Y -video_size LxA -i desktop video.mp4`
     (ou Playwright com vídeo) e legendas em inglês queimadas com `-vf subtitles=legendas.srt`. Não mostrar senhas/tokens.
3. **Instruções para o analista (inglês)**: URL do app, login e senha de teste, passo a passo numerado de onde clicar.
   - Criar no app um usuário **"Meta Reviewer"** (e-mail tipo `meta-review@afilic.com.br`) com **projeto próprio**, criado
     **pelo Nilton** (a senha ele define e cola no formulário; nunca no chat nem no Git).
   - O analista conecta o Facebook dele: o app precisa funcionar com uma conta **nova** (sem os dados do Nilton).
   - **Depois de aprovado: bloquear o usuário Meta Reviewer** no administrativo.
4. Enviar → prazo ~5 a 20 dias. Recusou? Ler o motivo em Análise do app → Pedidos, corrigir só o apontado e reenviar.

Motivos comuns de recusa: permissão no pedido que não aparece no vídeo; vídeo sem mostrar o diálogo de permissões; login de
teste que não funciona; app em outro idioma sem legenda; descrição genérica; política de privacidade fora do ar ou sem a empresa.

## 5. Verificação de acesso (Provedor de Tecnologia)

Para apps que atendem **outras empresas** (SaaS): Configurações do app → Básico → Verificação de acesso. Pede o Website
(página pública), descrição do serviço e os dados da empresa. Prazo informado no painel. No Pixel foi enviada em 17/10/2026.

## 6. Mapa de permissões (Instagram via Login do Facebook para Empresas)

| Recurso do app | Permissões |
|---|---|
| Listar Páginas/Instagrams da pessoa | `pages_show_list`, `business_management`, `instagram_basic`, `pages_read_engagement` |
| Publicar no Instagram | `instagram_content_publish` |
| Publicar na Página do Facebook | `pages_manage_posts` |
| Números (alcance, salvos, seguidores online) | `instagram_manage_insights` |
| Ler/responder comentários | `instagram_manage_comments` |
| Direct (automação, conversas) | `instagram_manage_messages` + `pages_manage_metadata` (inscrever a Página) |
| Anúncios (Pixel.Afilic) | `ads_read` |

## 7. Regras da Meta para não limitar contas (automação)

Uma mensagem privada por comentário, até 7 dias; fora disso só responde quem escreveu, em até 24 h (sem disparo em massa);
ritmo humano (≤200/h, segundos entre envios); variar textos públicos; links do próprio domínio; sempre dar saída para humano.
**Nunca duas ferramentas** (ex.: ManyChat + app) respondendo o mesmo perfil.

## 8. Vistoria antes de vender (rodar e marcar)

- [ ] Ao vivo; Renovação de dados aprovada; data da próxima anotada no CLAUDE.md.
- [ ] Todas as permissões usadas com **acesso avançado** aprovado; as não usadas removidas.
- [ ] Verificação de acesso aprovada.
- [ ] Depurador de compartilhamento: `/`, `/privacidade`, `/termos` com 200.
- [ ] Teste com uma conta **de fora** (não testadora): login, escolher conta, cada recurso funcionando.
- [ ] Cadastro/planos (skill **gd-acesso-membros**): quem compra ganha acesso sozinho; limites por plano.
- [ ] Usuário Meta Reviewer bloqueado depois da aprovação.
- [ ] Tokens: o app avisa antes de vencer (token de usuário ~60 dias; o da Página derivado de token longo não vence).
