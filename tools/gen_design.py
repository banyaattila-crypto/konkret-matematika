# Fejezetszínek generálása: minden szín WCAG-kontrasztra ellenőrizve (>= 4.5:1 szövegként használt színeknél)
import colorsys
H=[232,165,285,22,335,95,195,48,262,118];H2=[42,18,150,200,60,300,330,265,160,285]
def rgb(h,s,l):return colorsys.hls_to_rgb((h%360)/360,l/100,s/100)
def lum(c):
    f=lambda v:v/12.92 if v<=.03928 else((v+.055)/1.055)**2.4
    r,g,b=map(f,c);return .2126*r+.7152*g+.0722*b
def cr(a,b):
    x,y=lum(a),lum(b);x,y=max(x,y),min(x,y);return (x+.05)/(y+.05)
hx=lambda s:tuple(int(s[i:i+2],16)/255 for i in(1,3,5))
DS,LP=hx('#161C24'),hx('#EEF0EE')
def up(h,s,l,bg,t):  # világosít, amíg a kontraszt el nem éri a célt
    while cr(rgb(h,s,l),bg)<t and l<95:l+=1
    return l
def down(h,s,l,bg,t):
    while cr(rgb(h,s,l),bg)<t and l>10:l-=1
    return l
out=[]
for i,(h,h2) in enumerate(zip(H,H2),1):
    la=up(h,90,72,DS,5.5);lb=up(h2,90,60,DS,4.5)
    out.append(f':root[data-theme="dark"][data-ch="{i}"]{{--accent:hsl({h} 90% {la}%);--accent-2:hsl({h2} 90% {lb}%);--accent-2-ink:hsl({h2} 90% {lb}%);--accent-soft:hsl({h} 42% 20%);--bg1:hsl({h} 90% 62% / .20);--bg2:hsl({h2} 90% 55% / .12);--bg3:hsl({(h+120)%360} 70% 55% / .12);--hue:{h};--hue2:{h2}}}')
    la=down(h,72,42,LP,5.2);lb=down(h2,90,38,LP,4.8)
    out.append(f':root[data-theme="light"][data-ch="{i}"]{{--accent:hsl({h} 72% {la}%);--accent-2:hsl({h2} 90% 47%);--accent-2-ink:hsl({h2} 90% {lb}%);--accent-soft:hsl({h} 80% 93%);--bg1:hsl({h} 80% 55% / .16);--bg2:hsl({h2} 90% 50% / .13);--bg3:hsl({(h+120)%360} 60% 45% / .12);--hue:{h};--hue2:{h2}}}')
# fejezetszín-változók (oldalsáv, kezdőlap)
for th,s,l0,bg,t,fn in(("dark",90,72,DS,5.5,up),("light",72,42,LP,5.2,down)):
    vs=";".join(f'--cc{i}:hsl({h} {s}% {fn(h,s,l0,bg,t)}%)' for i,h in enumerate(H,1))
    out.append(f':root[data-theme="{th}"]{{{vs}}}')
open('/home/claude/km/tools/design.gen.css','w').write("/* generált: tools/gen_design.py */\n"+"\n".join(out)+"\n")
print(len(out))
