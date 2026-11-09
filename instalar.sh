#!/usr/bin/env bash
# Instala (ou atualiza) as skills GD no Claude Code — Mac/Linux.  Uso: bash instalar.sh
set -e
DE="$(cd "$(dirname "$0")" && pwd)/skills"
PARA="$HOME/.claude/skills"
mkdir -p "$PARA"
for d in "$DE"/gd-*/; do
  n="$(basename "$d")"
  rm -rf "$PARA/$n"
  cp -R "$d" "$PARA/$n"
  echo "  instalada: $n"
done
cp "$DE/gd-LEIA-ME.md" "$PARA/"
echo
echo "Pronto. Feche e abra o Claude Code de novo. Para começar: 'use a gd-matriz para criar um app novo'."
