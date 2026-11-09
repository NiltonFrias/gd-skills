# 1ª etapa do logo: mede no navegador o nome do logo EXATAMENTE como o menu do app desenha (CSS do layout.js,
# "Nome do logo com medidas fixas"), em escala 10x (coroa de 240 px). Grava medidas-logo.json: posição de cada letra
# (com o kerning que o navegador aplica) e a linha de base de cada palavra. A 2ª etapa é o gerar-logos.py.
# Uso (Python com Playwright): python medir-logo.py
import json, os, tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

AQUI = Path(__file__).parent
SORA = (AQUI / '../../../Identidade Visual/Fontes para IA/marca/Sora-var.ttf').resolve().as_uri()
K = 10  # escala: o menu usa coroa de 24 px
# medidas do layout.js (pt / es / en, menu lateral): largura do nome, tamanho e topo das duas linhas
IDIOMAS = {
    'pt': {'w': 56.5, 'n1': (12.06, -.53), 'n2': (14.28, 12), 'l1': 'Criativos', 'pq': 'do', 'l2': 'Reino'},
    'es': {'w': 58.54, 'n1': (11.76, -.88), 'n2': (14.25, 12.01), 'l1': 'Creativos', 'pq': 'del', 'l2': 'Reino'},
    'en': {'w': 59.6, 'n1': (12.57, -.29), 'n2': (12.12, 14), 'l1': 'Kingdom', 'pq': '', 'l2': 'Creatives'},
}
HTML = '''<html><head><style>@font-face{font-family:SoraL;src:url(%s);font-weight:100 800}
body{margin:0}.nome{position:relative;font-family:SoraL;font-weight:600;line-height:1;white-space:nowrap;height:%spx;width:%spx}
.n1,.n2{position:absolute;left:0}.n2{display:flex;align-items:center;gap:.12em}small{font-size:.62em;font-weight:600}b{font-weight:600}
i{display:inline-block;width:0;height:0}</style></head><body><div class="nome"><span class="n1" style="font-size:%spx;top:%spx"><i></i>%s</span>
<span class="n2" style="font-size:%spx;top:%spx">%s<b><i></i>%s</b></span></div></body></html>'''
MEDE = '''() => [...document.querySelectorAll('.n1, small, b')].map(el => {
  const t = [...el.childNodes].find(n => n.nodeType === 3); const r = document.createRange(); const letras = [];
  for (let i = 0; i < t.length; i++) { r.setStart(t, i); r.setEnd(t, i + 1); letras.push([t.data[i], r.getBoundingClientRect().left]); }
  return {texto: t.data, tam: parseFloat(getComputedStyle(el).fontSize), base: el.querySelector('i').getBoundingClientRect().bottom, letras};
})'''
saida = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    pg = b.new_page()
    for idioma, m in IDIOMAS.items():
        pq = f'<small><i></i>{m["pq"]}</small>' if m['pq'] else ''
        arq = Path(tempfile.gettempdir()) / 'medir-logo.html'
        arq.write_text(HTML % (SORA, 24 * K, m['w'] * K, m['n1'][0] * K, m['n1'][1] * K, m['l1'], m['n2'][0] * K, m['n2'][1] * K, pq, m['l2']), encoding='utf-8')
        pg.goto(arq.as_uri())
        pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
        assert pg.evaluate("document.fonts.check('600 20px SoraL')"), 'a fonte Sora não carregou'
        saida[idioma] = {'altura': 24 * K, 'largura': m['w'] * K, 'palavras': pg.evaluate(MEDE)}
    b.close()
(AQUI / 'medidas-logo.json').write_text(json.dumps(saida, ensure_ascii=False, indent=1), encoding='utf-8')
print('medidas gravadas:', ', '.join(saida))
