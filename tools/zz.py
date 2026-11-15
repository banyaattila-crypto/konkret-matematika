import numpy as np, random, json
from scipy import ndimage
A=0.62; W,H=900,int(900*A)
xs=np.linspace(-1,1,W); ys=np.linspace(-A,A,H); X,Y=np.meshgrid(xs,ys)
def comps(keys):
    # count connected components of equal key (4-conn)
    tot=0
    for k in np.unique(keys):
        lab,n=ndimage.label(keys==k); 
        sizes=np.bincount(lab.ravel())[1:]; tot+=int((sizes>=6).sum())
    return tot
def keys_lines(Ls):
    k=np.zeros(X.shape,np.int64)
    for i,(p,d) in enumerate(Ls):
        s=(d[0]*(Y-p[1])-d[1]*(X-p[0]))>0
        k|=s.astype(np.int64)<<i
    return k
def keys_zz(Z):
    k=np.zeros(X.shape,np.int64)
    for i,(v,a,b) in enumerate(Z):
        px,py=X-v[0],Y-v[1]
        c=a[0]*b[1]-a[1]*b[0]
        s1=(a[0]*py-a[1]*px)*np.sign(c)>0; s2=(px*b[1]-py*b[0])*np.sign(c)>0
        k|=(s1&s2).astype(np.int64)<<i
    return k
def unit(t): return (np.cos(t),np.sin(t))
random.seed(7); found={}
for k in [1,2,3]:
    L2=2*k*(2*k+1)//2+1; Zk=2*k*k-k+1
    for it in range(4000):
        Z=[]
        for i in range(k):
            v=(random.uniform(-.75,.75),random.uniform(-.45,.45))
            t=random.uniform(0,2*np.pi); w=random.uniform(.35,2.6)
            Z.append((v,unit(t),unit(t+w)))
        Ls=[]
        for v,a,b in Z: Ls+= [(v,a),(v,b)]
        if comps(keys_lines(Ls))!=L2: continue
        if comps(keys_zz(Z))!=Zk: continue
        found[k]=[[round(v[0],3),round(v[1],3),round(float(np.arctan2(a[1],a[0])),4),round(float(np.arctan2(b[1],b[0])),4)] for v,a,b in Z]
        print(k,it,found[k]);break
json.dump(found,open('zz.json','w'))
