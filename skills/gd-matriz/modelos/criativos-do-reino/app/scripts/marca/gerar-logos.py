# Gera TODOS os arquivos do logo do Criativos do Reino (SVG com as letras em contorno), no padrão ÚNICO do menu da
# área de membros (pedido do dono em 30/10/2026: "tem que padronizar, usar como base a área de membros"):
#   coroa + nome em Sora 600; "Criativos" em cima; embaixo "do" pequeno + "Reino". O "do" tem SEMPRE a cor do "Reino".
#   Medidas = as do CSS do app (layout.js, "Nome do logo com medidas fixas"), medidas no navegador pelo medir-logo.py
#   (rodar antes; grava medidas-logo.json). A linha de base de "Reino" fica na base da coroa.
# Uso: python scripts/marca/gerar-logos.py <pasta-de-saida>   (Python com fontTools)
# Sai: logo-horizontal-*, logo-vertical-*, nome-* nas cores abaixo (e versões em espanhol e inglês: -es, -en).
import json, os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = sys.argv[1]
SORA = os.path.join(AQUI, '..', '..', '..', 'Identidade Visual', 'Fontes para IA', 'marca', 'Sora-var.ttf')
MEDIDAS = json.load(open(os.path.join(AQUI, 'medidas-logo.json'), encoding='utf-8'))
COROA = 'M512 0 L638 162 L588 214 C610 330 760 420 880 298 L862 240 L1024 205 L830 690 L195 690 L0 210 L165 240 L148 298 C265 420 414 330 436 214 L386 162 Z M512 284 C482 405 300 498 178 432 L245 600 L778 600 L845 432 C722 498 542 405 512 284 Z'
# cor da coroa, de "Criativos" e de "do Reino"
CORES = {
    'ouro-preto': ('#C99300', '#0A0A0A', '#C99300'),   # fundo claro (igual à tela de entrar no tema claro)
    'ouro-branco': ('#F8C537', '#FFFFFF', '#F8C537'),  # fundo escuro (igual ao menu do app)
    'preto': ('#0A0A0A', '#0A0A0A', '#0A0A0A'),
    'branco': ('#FFFFFF', '#FFFFFF', '#FFFFFF'),
    'caramelo': ('#B07A45', '#3B2A1F', '#B07A45'),     # Instagram e vídeo (paleta terra)
}

fonte = instancer.instantiateVariableFont(TTFont(SORA), {'wght': 600})
upm = fonte['head'].unitsPerEm
cmap = fonte.getBestCmap()
glifos = fonte.getGlyphSet()

def palavra(p):
    """Caminho SVG e limites de uma palavra medida (cada letra na posição que o navegador deu)."""
    s = p['tam'] / upm
    caneta, limites = SVGPathPen(glifos), BoundsPen(glifos)
    for letra, x in p['letras']:
        g = cmap[ord(letra)]
        t = (s, 0, 0, -s, x, p['base'])
        glifos[g].draw(TransformPen(caneta, t))
        glifos[g].draw(TransformPen(limites, t))
    return caneta.getCommands(), limites.bounds

def nome(idioma):
    m = MEDIDAS[idioma]
    pal = [palavra(p) for p in m['palavras']]
    return m, pal  # pal[0] = linha de cima; o resto = linha de baixo ("do" + "Reino")

def caixa(*bs):
    return min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs)

def svg(conteudo, b, margem=0):
    x0, y0, x1, y1 = b[0] - margem, b[1] - margem, b[2] + margem, b[3] + margem
    w, h = x1 - x0, y1 - y0
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}">{conteudo}</svg>'

def coroa(x, y, altura, cor):
    s = altura / 690
    return f'<path transform="translate({x:.2f} {y:.2f}) scale({s:.5f})" d="{COROA}" fill="{cor}" fill-rule="evenodd"/>', (x, y, x + 1024 * s, y + altura)

def textos(pal, dx, dy, c1, c2):
    partes = []
    for n, (d, _) in enumerate(pal):
        partes.append(f'<path transform="translate({dx:.2f} {dy:.2f})" d="{d}" fill="{c1 if n == 0 else c2}"/>')
    bs = [(b[0] + dx, b[1] + dy, b[2] + dx, b[3] + dy) for _, b in pal]
    return ''.join(partes), caixa(*bs)

os.makedirs(SAIDA, exist_ok=True)
for idioma in MEDIDAS:
    m, pal = nome(idioma)
    H, LN = m['altura'], m['largura']
    suf = '' if idioma == 'pt' else f'-{idioma}'
    for cor, (cc, c1, c2) in CORES.items():
        # horizontal: coroa com a altura do nome, espaço de 0,30 da altura (menu: coroa 24 px, gap 7,2 px)
        pc, bc = coroa(0, 0, H, cc)
        t, bt = textos(pal, bc[2] + 0.30 * H, 0, c1, c2)
        open(os.path.join(SAIDA, f'logo-horizontal-{cor}{suf}.svg'), 'w').write(svg(pc + t, caixa(bc, bt)))
        # vertical: coroa com 55% da largura do nome, centralizada, espaço de 0,25 da altura
        ch = 0.55 * LN * 690 / 1024
        pc, bc = coroa((LN - 0.55 * LN) / 2, 0, ch, cc)
        t, bt = textos(pal, 0, ch + 0.25 * H, c1, c2)
        open(os.path.join(SAIDA, f'logo-vertical-{cor}{suf}.svg'), 'w').write(svg(pc + t, caixa(bc, bt)))
        # só o nome
        t, bt = textos(pal, 0, 0, c1, c2)
        open(os.path.join(SAIDA, f'nome-{cor}{suf}.svg'), 'w').write(svg(t, bt))
# desenho de construção para o manual: X = metade da altura da coroa; área de respiro de X em volta
m, pal = nome('pt'); H = m['altura']; X = H / 2
pc, bc = coroa(0, 0, H, '#C99300')
t, bt = textos(pal, bc[2] + 0.30 * H, 0, '#0A0A0A', '#C99300')
b = caixa(bc, bt)
linha = lambda x1, y1, x2, y2: f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#E5484D" stroke-width="3" stroke-dasharray="10 8"/>'
guias = (f'<rect x="{b[0] - X:.1f}" y="{b[1] - X:.1f}" width="{b[2] - b[0] + 2 * X:.1f}" height="{b[3] - b[1] + 2 * X:.1f}" fill="none" stroke="#9AA0A6" stroke-width="3" stroke-dasharray="4 8"/>'
         + linha(b[0] - X, 0, b[2] + X, 0) + linha(b[0] - X, H, b[2] + X, H) + linha(bc[2], -X, bc[2], H + X) + linha(bc[2] + 0.30 * H, -X, bc[2] + 0.30 * H, H + X)
         + f'<text x="{b[2] + X + 20:.1f}" y="{H / 2 + 14:.1f}" font-family="Poppins, sans-serif" font-size="40" fill="#E5484D">2X</text>'
         + f'<text x="{bc[2] + 0.15 * H:.1f}" y="{-X - 16:.1f}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="34" fill="#E5484D">0,6X</text>'
         + f'<text x="{b[0] - X + 14:.1f}" y="{b[1] - X + 40:.1f}" font-family="Poppins, sans-serif" font-size="30" fill="#9AA0A6">respiro X</text>')
open(os.path.join(SAIDA, 'manual-construcao.svg'), 'w').write(svg(pc + t + guias, (b[0] - X, b[1] - X - 70, b[2] + X + 110, b[3] + X), 10))
print('logos gerados em', SAIDA)
