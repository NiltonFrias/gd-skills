# Avisos para os membros (app instalável + push)

Base: Afilic (`serverlib/push.mjs`, `public/sw.js`, `app/painel/instalar.tsx`, `app/api/push/route.ts`) e
Kit Gospel (`src/push.js`, tela Admin → Avisos).

## Peças

- **Manifest + service worker** (`sw.js`): guarda só os ícones em cache; nunca as páginas nem `/api/`. Trata
  `push` (mostra título, texto, ícone, `badge`, `tag`, `lang: pt-BR`) e `notificationclick` (foca a janela
  aberta e navega para a `url` do aviso, ou abre uma nova).
- **Chaves VAPID** geradas sozinhas no primeiro uso e guardadas no banco (Afilic: cifradas). Nunca trocar:
  os aparelhos inscritos param de receber.
- **Inscrições** (`push_subscriptions`): endpoint único, chaves, usuário, aparelho. Ao enviar, resposta 404/410
  = o aparelho desinstalou ou desligou: apague a inscrição.
- **Público:** só quem ainda tem acesso (ativo e não vencido; admin sempre).
- **Envio em lotes** (20 por vez), contando entregues e falhas; grava o histórico (título, texto, quem mandou,
  entregues, falhas).

## Tela "Instalar o app" (Afilic)

- Detecta se já está instalado (`display-mode: standalone`) e se é iPhone.
- iPhone: o push só funciona com o app **instalado pela Tela de Início** (iOS 16.4+). Antes disso, o botão
  "Ativar avisos" leva para o passo a passo em vez de pedir permissão.
- Passo a passo com abas Android / iPhone.

## Os três tipos de notificação

| Tipo | Quem dispara | Exemplo | Todo app tem? |
|---|---|---|---|
| **Manual** | o admin, na tela Notificações | aviso de novidade, promoção, recado | sim |
| **Automática programada** | o servidor, em horários fixos | Pixel: lucro do dia às 8h, 14h e 20h · Afilic: comissão de ontem por conta | só se o Nilton quiser (perguntar qual) |
| **Por acontecimento** | o próprio app, na hora | Pixel: venda aprovada, reembolso, problema no envio (`src/push.js`, `TIPOS`) | só se fizer sentido no app |

### Automática programada — como montar

- Configuração no administrativo: ligada/desligada, horários (lista, ex. `08:00, 14:00, 20:00`, fuso
  `America/Sao_Paulo`), título e texto com as variáveis do app, botão "Mandar um teste para mim".
- Um agendador no servidor confere a cada minuto; para cada horário, calcula o valor **de cada membro** (ex.
  lucro do dia dele até agora = faturamento − gasto com anúncios) e manda o texto personalizado.
- **Uma vez só por horário e por dia:** grave `(horario, dia)` enviado (Afilic: `push_account_report_notifications`
  com `tag` por conta e data). Reinício do servidor no meio não pode repetir nem pular.
- Servidor fora do ar no horário: manda ao voltar só se ainda estiver na mesma janela (ex. até 1 hora depois);
  senão pula — notificação velha de lucro confunde.
- O membro pode desligar as automáticas no próprio aparelho (preferência por tipo, como no Pixel.Afilic).
- Sem dado no dia (ex. sem venda e sem gasto): decida com o Nilton se manda "ainda sem vendas hoje" ou não manda.

## Textos com variáveis

- `{{nome}}`, `{{primeiro_nome}}` (+ as do app, ex.: Afilic `{{conta_shopee}}`, `{{valor}}`, `{{data}}`,
  `{{data_curta}}`). Valide no salvar: variável desconhecida = erro na tela ("O código {{x}} não é reconhecido").
- Limites: título 80–120, texto 240–360 caracteres.
- O nome passa pelo **nome no padrão** antes de entrar no texto (sem caixa alta).
- Avisos automáticos (Afilic: relatório do dia anterior por conta) usam `tag` própria para não repetir.


## Vários projetos no mesmo celular (Pixel.Afilic, 18/10/2026)

- **Uma chave VAPID para o app inteiro** (não uma por projeto): o navegador só se inscreve com UMA chave; com chaves por
  projeto, o celular só recebia do último projeto em que ativou. Ao trocar a chave, o app (em toda tela, uma vez por
  sessão) confere a chave da inscrição e refaz sozinho se for a antiga; envio que volta 403/404/410 apaga o aparelho.
- **Ativar uma vez = inscrito em todos os projetos da pessoa**, cada um com "Receber notificações deste projeto"
  (padrão ligado). Para o administrador, os projetos dos testadores começam desligados. Projeto novo entra sozinho na
  próxima abertura do app; "ativar de novo" não religa o que a pessoa desligou.
- **Configuração por aparelho e por projeto**: cada pessoa (e-mail) controla a dela; uma não mexe na da outra.
- **Perdeu o acesso ao projeto → o aparelho sai dele** (ao tirar o acesso e na abertura do app).
- **Cada aviso diz de qual projeto é** ("Nome do projeto · texto", sem repetir se o nome já está no título) e **abre
  nele** (`?_proj=<id>` troca o projeto da sessão). A mensagem manual do administrador vai sem o nome do projeto.
- **Administrador no celular entra direto no projeto**, sem a faixa "vendo como"; o Administrativo fica no menu.
- Código: `src/push.js`, rotas `/notificacoes/chave`, `/notificacoes/aparelho` em `src/plataforma.js`, sincronização
  no SCRIPT de `src/painel/layout.js`, tela em `src/painel/extras.js` (/aplicativo).

## Notificação de mensagem do chat (aprendido no Zap.Afilic, 21/10/2026)

- **O administrador recebe** dos projetos que acompanha (os dele e os dos testadores), mesmo sem ser membro; o título
  leva o projeto ("Cliente · Projeto"), como no Pixel. Projeto de quem comprou: só a equipe dele.
- **Tocar abre a conversa no projeto certo**: a notificação aponta para um endereço que primeiro entra no projeto
  (administrador pelo "Ver como usuário") e depois abre a conversa (`/abrir-conversa/<id>` no Zap). Sem isso ela cai
  no projeto errado ou no administrativo e a limpeza nunca roda.
- **Some sozinha**: `tag` por conversa; ao tocar, o service worker fecha todas as daquela tag; ao abrir a conversa
  por dentro do app, a página fecha (`getNotifications({tag})`) e também pede ao service worker (mensagem
  "limpar"). Se o app já está aberto e `client.navigate()` falhar, o service worker manda a página trocar (mensagem
  "abrir"). No iPhone, confira no aparelho: o sistema pode não deixar fechar.
- A notificação vai para a **conta que ativou** naquele aparelho: o administrador ativa logado como administrador.
