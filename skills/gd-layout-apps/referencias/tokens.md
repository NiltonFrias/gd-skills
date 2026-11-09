# Tokens (variáveis CSS) — Pixel.Afilic

Copiados de `src/painel/layout.js` (17/10/2026). Num app novo, troque só `--azul/--primary/--primary-2/--chip*`
pela cor da marca e mantenha o resto.

## Claro (`:root`)

| Variável | Valor | Uso |
|---|---|---|
| `--primary` / `--azul` | `#2056F0` | ação (botão, link, foco) |
| `--primary-2` | `#1846C8` | ação apertada / texto de chip |
| `--tinta` / `--tinta-ink` | `#0D1B2E` / `#FFFFFF` | seleção (aba, período, segmento) e faixa do admin |
| `--laranja` | `#FF7A3D` | alerta e quadradinho-assinatura |
| `--bg` | `#EEF1F5` | fundo (papel) |
| `--s1` / `--s2` / `--s3` | `#FFFFFF` / `#F5F7FA` / `#E7EBF1` | blocos (folha), fundos internos, hover |
| `--borda` / `--borda2` | `#DDE3EB` / `#C9D2DE` | linhas |
| `--ink` / `--t2` / `--t3` | `#0D1B2E` / `#46546A` / `#6A778B` | texto, texto secundário, texto apagado |
| `--chip` / `--chip-ink` | `#E6EDFE` / `#1846C8` | chips e intervalo do calendário |
| `--ok` / `--ok-f` | `#0B8A5A` / `#E2F4EC` | lucro, selo ok |
| `--aviso` / `--aviso-f` | `#9A5700` / `#FDF0DC` | selo de atenção |
| `--erro` / `--erro-f` | `#D23B2F` / `#FCE9E7` | prejuízo, selo de erro |
| `--neutro-f` | `#E9EDF2` | selo neutro |
| `--g1..--g4` | `#2056F0` `#7FA2F8` `#FF9A5C` `#9AA6B6` | séries de gráfico |
| `--sombra` / `--sombra-pop` | `none` / `0 18px 48px rgba(13,27,46,.18)` | só janela/menu flutuante tem sombra |
| `--raio` / `--ctl` / `--menu-w` | `12px` / `40px` / `244px` (68px encolhido) | medidas |
| `--fonte` | `Onest, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` | fonte única |

## Escuro (`[data-theme="dark"]`)

`--primary #4F7DFA`, `--azul #5B8CFF`, `--primary-2 #8FB0FF`, `--tinta #E8EEF7` (tinta-ink `#0A1424`),
`--bg #08111F`, `--s1 #0F1B2E`, `--s2 #132238`, `--s3 #1A2B45`, `--borda rgba(160,180,210,.13)`,
`--borda2 rgba(160,180,210,.24)`, `--ink #E8EEF7`, `--t2 #A9B6C9`, `--t3 #8291A8`, `--chip rgba(91,140,255,.16)`,
`--chip-ink #A9C2FF`, `--ok #3DD598`, `--aviso #F2A93B`, `--erro #FF6B5E` (fundos dos selos = a mesma cor a 12%),
`--sombra-pop 0 24px 60px rgba(0,0,0,.55)`.

## Outras marcas (exemplos)

- **Kit Gospel** (`public/css` do repositório kit-gospel): fundo creme `#FFF7E9`, ação amarela `#FFB800`, tinta
  marrom `#3A2A1F`, apoio `#FFEDBF` / `#F3E0C8`, verde `#059669`, vermelho `#dc2626`; mesma casca (menu lateral + administrativo
  com "Ver como membro"). Ao trazer para este sistema, a cor de ação vira o amarelo e o resto segue a tabela acima.
- **Afilic:** laranja do mascote Afi como cor de ação; logo em `Afilic/identidade-visual/logo/`.
