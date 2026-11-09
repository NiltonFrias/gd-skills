# Instala (ou atualiza) as skills GD no Claude Code — Windows.
# Uso, dentro da pasta baixada:  powershell -ExecutionPolicy Bypass -File .\instalar.ps1
$ErrorActionPreference = 'Stop'
$de   = Join-Path $PSScriptRoot 'skills'
$para = Join-Path $env:USERPROFILE '.claude\skills'
New-Item -ItemType Directory -Force $para | Out-Null

Get-ChildItem $de -Directory -Filter 'gd-*' | ForEach-Object {
  $alvo = Join-Path $para $_.Name
  if (Test-Path $alvo) { Remove-Item $alvo -Recurse -Force }   # troca pela versão nova
  Copy-Item $_.FullName $alvo -Recurse
  Write-Host "  instalada: $($_.Name)"
}
Copy-Item (Join-Path $de 'gd-LEIA-ME.md') $para -Force
Write-Host "`nPronto. Feche e abra o Claude Code de novo. Para começar: 'use a gd-matriz para criar um app novo'."
