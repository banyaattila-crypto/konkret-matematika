import numpy as np, random, json, math
from scipy import ndimage
A=0.62
def rayx(v1,a,v2,b):
    den=a[0]*(-b[1])-a[1]*(-b[0])
    if abs(den)<1e-9: return None
    dx,dy=v2[0]-v1[0],v2[1]-v1[1]
    s=(dx*(-b[1])-dy*(-b[0]))/den; t=(a[0]*dy-a[1]*dx)/den
    if s>1e-6 and t>1e-6: return (v1[0]+s*a[0],v1[1]+s*a[1])
    return None
def inside(p,m=.9): return abs(p[0])<m and abs(p[1])<A*m
def linex(p1,d1,p2,d2):
    den=d1[0]*d2[1]-d1[1]*d2[0]
    if abs(den)<1e-9: return None
    dx,dy=p2[0]-p1[0],p2[1]-p1[1]; s=(dx*d2[1]-dy*d2[0])/den
    return (p1[0]+s*d1[0],p1[1]+s*d1[1])
def ok(Z):
    pts=[]
    for i in range(len(Z)):
        for j in range(i+1,len(Z)):
            for a in (Z[i][1],Z[i][2]):
                for b in (Z[j][1],Z[j][2]):
                    q=rayx(Z[i][0],a,Z[j][0],b)
                    if q is None or not inside(q): return False
                    pts.append(q)
    # also full lines all intersect inside (for line-mode = L_2k visible)
    Ls=[(v,a) for v,a,b in Z]+[(v,b) for v,a,b in Z]
    allp=[]
    for i in range(len(Ls)):
        for j in range(i+1,len(Ls)):
            q=linex(*Ls[i],*Ls[j])
            if q is None or not inside(q,.93): return False
            allp.append(q)
    for i in range(len(allp)):
        for j in range(i+1,len(allp)):
            if math.dist(allp[i],allp[j])<.05: return False
    # angles not too close
    for i in range(len(Ls)):
        for j in range(i+1,len(Ls)):
            d1,d2=Ls[i][1],Ls[j][1]
            if abs(d1[0]*d2[1]-d1[1]*d2[0])<.12: return False
    return True
u=lambda t:(math.cos(t),math.sin(t))
random.seed(3); out=json.load(open('zz.json')) if False else {}
for k in [1,2,3,4]:
    for it in range(400000):
        Z=[]
        for i in range(k):
            v=(random.uniform(-.8,.8),random.uniform(-.5,.5)); t=random.uniform(0,2*math.pi); w=random.uniform(.3,1.4)
            Z.append((v,u(t),u(t+w)))
        if ok(Z):
            out[k]=[[round(v[0],3),round(v[1],3),round(math.atan2(a[1],a[0]),4),round(math.atan2(b[1],b[0]),4)] for v,a,b in Z]; print(k,it,out[k]); break
    else: print(k,'none')
json.dump(out,open('zz.json','w'))
# pixel verify
W=1000;H=int(W*A);xs=np.linspace(-1,1,W);ys=np.linspace(-A,A,H);X,Y=np.meshgrid(xs,ys)
def comps(keys):
    t=0
    for kk in np.unique(keys):
        lab,n=ndimage.label(keys==kk); s=np.bincount(lab.ravel())[1:]; t+=int((s>=4).sum())
    return t
for k,Zr in out.items():
    kz=np.zeros(X.shape,np.int64); kl=np.zeros(X.shape,np.int64); b=0
    for i,(vx,vy,ta,tb) in enumerate(Zr):
        a=u(ta);c=u(tb);px,py=X-vx,Y-vy;cr=a[0]*c[1]-a[1]*c[0]
        s1=(a[0]*py-a[1]*px)*np.sign(cr)>0; s2=(px*c[1]-py*c[0])*np.sign(cr)>0
        kz|=(s1&s2).astype(np.int64)<<i
        for d in (a,c):
            kl|=((d[0]*py-d[1]*px)>0).astype(np.int64)<<b; b+=1
    print(k,'zig',comps(kz),'expect',2*k*k-k+1,'lines',comps(kl),'expect',k*(2*k+1)+1)
