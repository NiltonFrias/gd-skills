# Coloca um print do app dentro da tela de um celular numa foto (perspectiva), mantendo o dedo por cima da tela.
# Uso: python -I scripts/marca/print-no-celular.py <foto> <print> <saida> x1,y1 x2,y2 x3,y3 x4,y4 [caixa-do-dedo x0,y0,x1,y1]
#   cantos da tela na foto: superior esquerdo, superior direito, inferior direito, inferior esquerdo
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

foto = Image.open(sys.argv[1]).convert('RGB'); tela = Image.open(sys.argv[2]).convert('RGB'); saida = sys.argv[3]
cantos = [tuple(map(float, p.split(','))) for p in sys.argv[4:8]]
dedo = tuple(map(int, sys.argv[8].split(','))) if len(sys.argv) > 8 else None
w, h = tela.size
# coeficientes da perspectiva (ponto da foto -> ponto do print)
A, B = [], []
for (x, y), (u, v) in zip(cantos, [(0, 0), (w, 0), (w, h), (0, h)]):
    A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; B += [u, v]
coef = np.linalg.solve(np.array(A), np.array(B))
plano = tela.transform(foto.size, Image.PERSPECTIVE, tuple(coef), Image.BICUBIC)
# máscara da tela com cantos levemente arredondados (suaviza a borda)
m = Image.new('L', foto.size, 0); ImageDraw.Draw(m).polygon(cantos, fill=255); m = m.filter(ImageFilter.GaussianBlur(1.2))
if dedo:   # mantém o dedo: pixels cor de pele dentro da caixa ficam como na foto
    a = np.asarray(foto).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    pele = (r > 110) & (r > g) & (g > b) & (r - b > 35)
    caixa = np.zeros(pele.shape, bool); x0, y0, x1, y1 = dedo; caixa[y0:y1, x0:x1] = True
    tira = Image.fromarray(((pele & caixa) * 255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
    m = Image.fromarray(np.clip(np.asarray(m).astype(int) - np.asarray(tira).astype(int), 0, 255).astype('uint8'))
# leve brilho de vidro para não parecer colado
final = Image.composite(plano, foto, m)
brilho = Image.new('RGB', foto.size, (255, 255, 255)); mb = Image.new('L', foto.size, 0)
ImageDraw.Draw(mb).polygon(cantos[:2] + [cantos[2][0] * .4 + cantos[1][0] * .6, cantos[2][1] * .4 + cantos[1][1] * .6], fill=14)
final = Image.composite(brilho, final, Image.fromarray(np.minimum(np.asarray(mb), np.asarray(m))))
final.save(saida, quality=92)
print('ok')
