#!/bin/bash
# usage: render.sh deck.pptx outprefix
set -e
D=$(dirname "$0"); IN="$1"; P="$2"
rm -rf "$D/rend" && mkdir -p "$D/rend"
cp "$IN" "$D/rend/deck.pptx"
python3 /root/.claude/skills/synced/f645b6fd-1c15-41aa-b893-bcf299d581fd_134687ea-0a50-49d4-a20e-b4d96b5a7b75/pptx/scripts/office/soffice.py --headless --convert-to pdf --outdir "$D/rend" "$D/rend/deck.pptx" >/dev/null 2>&1
python3 - "$D/rend/deck.pdf" "$P" <<'PY'
import fitz, sys
d = fitz.open(sys.argv[1])
for i, p in enumerate(d):
    p.get_pixmap(dpi=int(sys.argv[3]) if len(sys.argv)>3 else 80).save(f"{sys.argv[2]}-{i+1:02d}.png")
print(len(d), 'pages')
PY
