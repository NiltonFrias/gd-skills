# Skills GD (Geração Digital)

O jeito da Geração Digital de criar apps com o Claude Code, em forma de skills. A **`gd-matriz`** é a porta de entrada:
ela decide qual skill usar, em que ordem, e faz a revisão tela por tela. As outras entram sozinhas quando o assunto aparece.

## O que vem no pacote

| # | Skill | Para quê |
|---|---|---|
| — | **`gd-matriz`** | **Comece por aqui.** Dois modos: **CRIAR** um app novo já no padrão, ou **REVISAR** um app existente (tela por tela, com print) |
| 0 | `gd-identidade-visual` | Logo (símbolo + nome), cores, fontes, ícone do app e manual da marca, antes do app |
| 1 | `gd-acesso-membros` | Login, administrativo × área do membro, membros, grupos, produtos da Hotmart/Kiwify, prazos, avisos |
| 2 | `gd-layout-apps` | Casca do app (menu, celular, tema escuro), botões, janelas, tabelas, textos da tela |
| 3 | `gd-vendas-infoproduto` | Ler os avisos de venda (webhooks) da Hotmart e da Kiwify |
| 4 | `gd-pixel-meta` | Pixel do Facebook + API de Conversões, utm/xcod/sck, de qual anúncio veio a venda |
| 5 | `gd-whatsapp-evolution` | Conexão de WhatsApp pelo Evolution API, QR Code, grupos |
| 6 | `gd-publicar-app-meta` | Publicar app na Meta para outras pessoas conectarem Facebook/Instagram |
| 7 | `gd-pagina-vendas` | Página de vendas (método, dobras, mockups, preço, publicação na Hostinger) |

Junto da `gd-matriz` vai a pasta **`modelos/`**: os arquivos do Criativos do Reino e do FluxoPost que as skills mandam
copiar (casca, telas de Membros/Grupos/Configurações, scripts de logo). São referência, não um app pronto.

## Instalar

Precisa ter o [Claude Code](https://claude.com/claude-code) e o Git instalados.

**Windows (PowerShell):**

```powershell
git clone https://github.com/NiltonFrias/gd-skills.git "$env:USERPROFILE\gd-skills"
cd "$env:USERPROFILE\gd-skills"
powershell -ExecutionPolicy Bypass -File .\instalar.ps1
```

**Mac / Linux:**

```bash
git clone https://github.com/NiltonFrias/gd-skills.git ~/gd-skills
cd ~/gd-skills && bash instalar.sh
```

As skills vão para `~/.claude/skills/` (no Windows, `C:\Users\<você>\.claude\skills\`). Feche e abra o Claude Code.
Confira digitando `/gd-matriz` — ela deve aparecer na lista.

## Atualizar

Quando o Nilton avisar que tem novidade:

```powershell
cd "$env:USERPROFILE\gd-skills"; git pull; powershell -ExecutionPolicy Bypass -File .\instalar.ps1
```

(Mac: `cd ~/gd-skills && git pull && bash instalar.sh`.) O instalador **troca** as pastas `gd-*` pela versão nova:
se você mudou alguma skill na sua máquina, mande a mudança para o Nilton antes, senão ela se perde.

## Como usar

Abra o Claude Code na pasta do projeto e peça em português normal:

- **App novo:** "Use a gd-matriz para criar um app novo." Ela começa pela marca (`gd-identidade-visual`), faz
  perguntas em forma de quiz (nome, público, telas) e monta a casca com administrativo e área do membro já no padrão.
  No fim, ela mesma roda a revisão antes de entregar.
- **Revisar um app que já existe:** "Revise este app com a gd-matriz" / "deixe no padrão das skills GD". Ela lê o
  projeto, sobe uma **prévia local** (nunca mexe na produção para testar), abre o navegador e passa **tela por tela
  tirando print**, compara com o checklist, corrige e tira print de novo. Só sobe (git push / deploy) quando você mandar.
- **Um assunto só:** "Integre a Kiwify" (`gd-vendas-infoproduto`), "instale o pixel" (`gd-pixel-meta`) etc.

Para a revisão tela por tela, instale também a extensão **Claude in Chrome** (o Claude abre e clica nas telas sozinho).
Sem ela, a skill usa o Playwright com o Edge do Windows. Os scripts de logo usam Python.

## Bom saber

- As skills falam "o Nilton" porque nasceram dos apps dele (Pixel.Afilic, Zap.Afilic, FluxoPost, Criativos do Reino,
  Kit Gospel). Leia "o Nilton" como "o dono do padrão": as regras valem para qualquer app novo.
- Cada regra tem data e motivo. Se uma regra não fizer sentido no seu app, fale com o Nilton antes de mudar a skill:
  a ideia é todo mundo ter a mesma versão.
- Repositório **privado**: não compartilhe o link nem os arquivos de `modelos/` fora da sociedade.
