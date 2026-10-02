import sys, glob
from PIL import Image, ImageDraw
files = sorted(glob.glob(sys.argv[1] + '-*.png')); out = sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 2
per = int(sys.argv[4]) if len(sys.argv) > 4 else 6
W = 900
for k in range(0, len(files), per):
    chunk = files[k:k+per]
    ims = [Image.open(f).convert('RGB') for f in chunk]
    h = int(ims[0].height * W / ims[0].width)
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * (W + 10) + 10, rows * (h + 30) + 10), (120, 120, 120))
    d = ImageDraw.Draw(sheet)
    for i, im in enumerate(ims):
        x = 10 + (i % cols) * (W + 10); y = 10 + (i // cols) * (h + 30)
        sheet.paste(im.resize((W, h)), (x, y + 20)); d.text((x, y + 4), chunk[i].split('/')[-1], fill=(255, 255, 255))
    sheet.save(f'{out}_{k//per+1}.png'); print(f'{out}_{k//per+1}.png')
