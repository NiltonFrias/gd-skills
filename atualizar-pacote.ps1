# Só para o Nilton: copia as skills GD do seu computador para este pacote (e os arquivos-modelo dos projetos).
# Rode de novo sempre que mudar alguma skill GD, depois: git add -A; git commit -m "..."; git push
$ErrorActionPreference = 'Stop'
$pacote  = $PSScriptRoot
$origem  = Join-Path $env:USERPROFILE '.claude\skills'
$projetos = Split-Path $pacote -Parent   # ...\00Aplicativos\Claude
$destino = Join-Path $pacote 'skills'

if (Test-Path $destino) { Remove-Item $destino -Recurse -Force }
New-Item -ItemType Directory -Force $destino | Out-Null

Get-ChildItem $origem -Directory -Filter 'gd-*' | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $destino $_.Name) -Recurse
  $git = Join-Path $destino "$($_.Name)\.git"
  if (Test-Path $git) { Remove-Item $git -Recurse -Force }
}
Copy-Item (Join-Path $origem 'gd-LEIA-ME.md') $destino

# Arquivos-modelo citados pelas skills (o sócio não tem as pastas dos projetos)
$modelos = Join-Path $destino 'gd-matriz\modelos'
$lista = @(
  @('Criativos do Reino\app\src\painel\layout.js',        'criativos-do-reino\app\src\painel\layout.js'),
  @('Criativos do Reino\app\src\painel\admin-acesso.js',  'criativos-do-reino\app\src\painel\admin-acesso.js'),
  @('Criativos do Reino\app\public\js\admin.js',          'criativos-do-reino\app\public\js\admin.js'),
  @('Criativos do Reino\app\public\js\idiomas.js',        'criativos-do-reino\app\public\js\idiomas.js'),
  @('Criativos do Reino\app\scripts\marca',               'criativos-do-reino\app\scripts\marca'),
  @('Criativos do Reino\Identidade Visual\Marca',         'criativos-do-reino\Identidade Visual\Marca'),
  @('Post.Afilic\app\src\painel\layout.js',               'fluxopost\app\src\painel\layout.js'),
  @('Post.Afilic\app\src\painel\admin-membros.js',        'fluxopost\app\src\painel\admin-membros.js'),
  @('Post.Afilic\app\src\painel\marca.js',                'fluxopost\app\src\painel\marca.js'),
  @('Post.Afilic\app\scripts\marca.js',                   'fluxopost\app\scripts\marca.js')
)
foreach ($par in $lista) {
  $de = Join-Path $projetos $par[0]; $para = Join-Path $modelos $par[1]
  if (-not (Test-Path $de)) { Write-Warning "Não achei: $de"; continue }
  New-Item -ItemType Directory -Force (Split-Path $para -Parent) | Out-Null
  Copy-Item $de $para -Recurse -Force
}
Copy-Item (Join-Path $pacote 'modelos-LEIA-ME.md') (Join-Path $modelos 'LEIA-ME.md') -Force

Write-Host "Pacote atualizado em $destino"
Get-ChildItem $destino -Directory | ForEach-Object { Write-Host "  - $($_.Name)" }
