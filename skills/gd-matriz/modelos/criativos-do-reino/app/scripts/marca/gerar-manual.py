# Gera o manual de marca do Criativos do Reino (uma página HTML) a partir dos SVGs da marca.
# Uso: python -I scripts/marca/gerar-manual.py <arquivo-html> <prefixo-dos-svg>
#   ex.: public/marca/final/manual.html ""        (servido pela prévia em /marca/final/manual.html)
#        "../Identidade Visual/Marca/manual.html" "svg/"
import sys

SAIDA, P = sys.argv[1], sys.argv[2]

CORES = [
    ('Dourado', '#F8C537', 'Cor principal: coroa, "Reino" e destaques.', '#111'),
    ('Dourado escuro', '#C99300', 'O dourado sobre fundo claro (mais contraste).', '#fff'),
    ('Preto', '#0A0A0A', 'Fundo principal da marca e do menu.', '#fff'),
    ('Grafite', '#141416', 'Fundos escuros de apoio e cartões.', '#fff'),
    ('Branco', '#FFFFFF', '"Criativos" sobre fundo escuro (o "do" tem sempre a cor do "Reino").', '#111'),
]

ERRADOS = [
    ('Não distorcer', 'transform:scaleX(1.45)'),
    ('Não trocar as cores', 'filter:hue-rotate(190deg) saturate(1.4)'),
    ('Não aplicar efeitos', 'filter:drop-shadow(0 0 14px #F8C537) drop-shadow(4px 6px 0 #7a5a00)'),
    ('Não girar', 'transform:rotate(-12deg)'),
    ('Não usar em fundo sem contraste', 'background:#F8C537'),
]

def img(arq, estilo=''):
    return f'<img src="{P}{arq}.svg" alt="" style="{estilo}">'

def caixa(conteudo, fundo='#141416', classe=''):
    return f'<div class="cx {classe}" style="background:{fundo}">{conteudo}</div>'

secoes = []
def secao(n, titulo, corpo, largura=''):
    secoes.append(f'<section class="s {largura}"><h2><span>{n:02d}.</span>{titulo}</h2>{corpo}</section>')

secao(1, 'Logo principal', caixa(img('logo-horizontal-ouro-branco'), '#0A0A0A', 'grande')
      + '<p>A coroa vem antes do nome. É a versão usada no menu do app, no site, em cabeçalhos e sempre que houver espaço na horizontal.</p>', 'larga')
secao(2, 'Ícone', '<div class="icones">' + img('icone-app', 'width:42%;border-radius:22%') + img('icone-app-ouro', 'width:42%;border-radius:22%') + '</div>'
      + '<p>A coroa sozinha é o nosso ícone: app, favicon, foto de perfil, menu encolhido e marca d\'água.</p>')
secao(3, 'Tamanho mínimo', '<div class="minimos">'
      + caixa(img('logo-horizontal-ouro-branco', 'height:40px') + '<small>Horizontal · 120 px de largura · 30 mm</small>', '#141416', 'col')
      + caixa(img('logo-vertical-ouro-branco', 'height:56px') + '<small>Vertical · 64 px de largura · 18 mm</small>', '#141416', 'col')
      + caixa(img('icone-app', 'height:32px;border-radius:22%') + img('icone-app', 'height:16px;border-radius:22%') + '<small>Ícone · até 16 px</small>', '#fff', 'col borda')
      + '</div><p>Abaixo desses tamanhos o "do" deixa de ser lido: use o ícone (a coroa).</p>')
secao(4, 'Variações', '<div class="grade4">'
      + caixa(img('logo-horizontal-ouro-branco'), '#141416') + caixa(img('logo-vertical-ouro-branco'), '#141416')
      + caixa(img('logo-horizontal-ouro-preto'), '#fff', 'borda') + caixa(img('logo-vertical-ouro-preto'), '#fff', 'borda')
      + caixa(img('logo-horizontal-branco'), '#0A0A0A') + caixa(img('logo-horizontal-preto'), '#fff', 'borda')
      + caixa(img('nome-ouro-branco'), '#141416') + caixa(img('coroa-ouro-branco', 'max-height:110px'), '#141416') + '</div>'
      + '<p><b>Horizontal</b> (principal) e <b>vertical</b> (espaços quadrados, capas, abertura de vídeo). Dourado sobre escuro é o padrão; '
        'sobre fundo claro o dourado escurece. Versões de <b>uma cor</b> (branca e preta) para impressão, gravação e bordado.</p>', 'larga')
secao(5, 'Construção e área de respiro', caixa(img('manual-construcao'), '#fff', 'borda grande')
      + '<p><b>X = metade da altura da coroa.</b> A coroa tem 2X de altura, a mesma altura do nome: alinha com o topo de "Criativos" e a base de "Reino". '
        'O "do" fica no centro da altura do "Reino" e tem sempre a cor do "Reino"; as duas linhas do nome têm a mesma largura. A coroa fica a 0,6X do nome. É o mesmo desenho do menu do app (gerado por scripts/marca/gerar-logos.py a partir do CSS do app). '
        'Em volta do logo, deixe sempre um espaço livre de pelo menos X: nada de texto, borda ou imagem dentro dele.</p>', 'larga')
secao(6, 'Cores', '<div class="cores">' + ''.join(
      f'<div class="cor"><div class="am" style="background:{h};color:{t}">{h}</div><b>{n}</b><small>{d}</small></div>' for n, h, d, t in CORES)
      + '</div><p>O dourado não é usado em gradiente nem com brilho: cor chapada, para funcionar em tela, impressão e bordado.</p>', 'larga')
secao(7, 'Tipografia', '<div class="tipos"><div><span class="aa sora">Aa</span><b>Sora</b><small>Seminegrito, só no logo. Pontas retas, desenho geométrico.</small></div>'
      '<div><span class="aa poppins">Aa</span><b>Poppins</b><small>Interface, títulos e textos do app e das artes (Regular, Medium, SemiBold, Bold).</small></div></div>'
      '<p>O nome do logo já está em contorno nos arquivos: não precisa ter a fonte instalada para usar o logo.</p>', 'larga')
secao(8, 'Aplicações', '<div class="aplic">'
      + '<div class="menu">' + img('logo-horizontal-ouro-branco', 'height:46px') + '<i></i><i></i><i></i></div>'
      + '<div class="cel">' + img('icone-app', 'width:64px;border-radius:22%') + '<small>Criativos</small></div>'
      + '<div class="aba"><span>' + img('icone-app', 'width:16px;border-radius:4px') + 'Criativos do Reino</span></div>'
      + '</div><p>Menu lateral do app, ícone na tela do celular e favicon na aba do navegador.</p>', 'larga')
secao(9, 'Usos incorretos', '<div class="errados">' + ''.join(
      f'<div class="errado"><div class="cx" style="background:{"#F8C537" if "background" in e else "#141416"}">'
      f'{img("logo-horizontal-ouro-branco", "" if "background" in e else e)}</div><b>✕</b><small>{t}</small></div>' for t, e in ERRADOS)
      + '</div><p>Também não: trocar a fonte, mudar a posição da coroa, separar "do" de "Reino" ou colocar o logo dentro de formas.</p>', 'larga')


html = f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Manual de marca · Criativos do Reino</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Sora:wght@600&display=swap" rel="stylesheet">
<style>
:root{{--ouro:#F8C537;--preto:#0A0A0A;--g:#141416;--t:#B9B9BE}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--preto);color:#fff;font:15px/1.6 Poppins,system-ui,sans-serif}}
header{{display:flex;justify-content:space-between;align-items:center;padding:28px 40px;letter-spacing:.32em;font-size:12px;color:var(--t);text-transform:uppercase}}
header b{{color:#fff;font-weight:500}}header span{{border:1px solid #333;border-radius:999px;padding:4px 12px;letter-spacing:.1em}}
main{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:0 40px 50px;max-width:1500px;margin:auto}}
.s{{background:var(--g);border:1px solid #232327;border-radius:18px;padding:26px}}.s.larga{{grid-column:1/-1}}
h2{{margin:0 0 18px;font-size:13px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--t)}}h2 span{{color:#fff;font-size:20px;font-weight:600;letter-spacing:0;margin-right:14px}}
p{{color:var(--t);margin:16px 0 0;max-width:90ch}}p b{{color:#fff;font-weight:500}}
.cx{{display:grid;place-items:center;border-radius:12px;padding:26px;min-height:150px}}.cx img{{max-width:100%;max-height:150px}}
.cx.grande{{min-height:300px}}.cx.grande img{{max-height:260px;width:min(720px,100%)}}.cx.borda{{border:1px solid #2a2a2e}}
.cx.col{{gap:10px;align-content:center}}.cx.col small{{color:#888;font-size:12px}}
.grade4{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}.icones{{display:flex;gap:6%;justify-content:center;padding:14px 0}}
.minimos{{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}}
.cores{{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}}.cor .am{{height:110px;border-radius:12px;padding:12px;font-size:13px;font-weight:600;display:flex;align-items:flex-end;border:1px solid #2a2a2e}}
.cor b{{display:block;margin-top:10px;font-weight:500}}.cor small,.tipos small,.errado small{{color:var(--t);font-size:12.5px;display:block}}
.tipos{{display:grid;grid-template-columns:1fr 1fr;gap:18px}}.aa{{display:block;font-size:88px;line-height:1.1;font-weight:600}}.sora{{font-family:Sora,sans-serif}}.poppins{{font-family:Poppins,sans-serif;font-weight:700}}
.tipos b{{display:block;font-size:18px}}
.aplic{{display:grid;grid-template-columns:1.2fr 1fr 1.2fr;gap:12px;align-items:stretch}}
.menu{{background:#0A0A0A;border-radius:12px;padding:20px;display:grid;gap:12px;align-content:start}}.menu i{{height:12px;border-radius:6px;background:#1d1d21}}.menu i:first-of-type{{background:rgba(248,197,55,.25)}}
.cel{{background:linear-gradient(160deg,#2b3a55,#141416);border-radius:12px;display:grid;place-items:center;align-content:center;gap:6px}}.cel small{{font-size:12px}}
.aba{{background:#fff;border-radius:12px;padding:18px;display:flex;align-items:flex-start}}.aba span{{display:flex;align-items:center;gap:8px;background:#EEF0F3;color:#222;border-radius:10px 10px 0 0;padding:8px 14px;font-size:13px}}
.errados{{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}}.errado{{position:relative}}.errado .cx{{min-height:120px;overflow:hidden}}.errado .cx img{{max-height:70px}}
.errado b{{position:absolute;top:8px;right:10px;color:#E5484D;font-size:18px}}.errado small{{margin-top:8px}}
@media (max-width:900px){{main{{grid-template-columns:1fr;padding:0 16px 40px}}header{{padding:20px 16px}}.grade4,.cores,.errados,.minimos,.aplic,.tipos{{grid-template-columns:1fr 1fr}}}}
</style></head><body>
<header><b>Manual de marca</b><b>Criativos do Reino</b><span>Versão 1.0 · 2026</span></header>
<main>{"".join(secoes)}</main></body></html>'''
open(SAIDA, 'w', encoding='utf-8').write(html)
print('ok', SAIDA)
