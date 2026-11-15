
/* ================= 1.2 EGYENESEK A SÍKBAN ================= */
const VA=0.62; /* világ-koordináták: x ∈ [-1,1], y ∈ [-VA,VA] */
function rng32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function isDarkTheme(){const t=document.documentElement.getAttribute("data-theme");if(t)return t==="dark";return matchMedia("(prefers-color-scheme: dark)").matches;}
function cssv(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||"#888";}
function hsl2rgb(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return [Math.round(255*f(0)),Math.round(255*f(8)),Math.round(255*f(4))];}
function lineX(a,b){const den=a.d[0]*b.d[1]-a.d[1]*b.d[0];if(Math.abs(den)<1e-10)return null;const dx=b.p[0]-a.p[0],dy=b.p[1]-a.p[1];return (dx*b.d[1]-dy*b.d[0])/den;}
const ptOn=(l,t)=>[l.p[0]+t*l.d[0],l.p[1]+t*l.d[1]];
function exactRegions(L){let r=1;for(let i=0;i<L.length;i++){const ts=[];for(let j=0;j<i;j++){const t=lineX(L[i],L[j]);if(t!==null&&!ts.some(u=>Math.abs(u-t)<1e-7))ts.push(t);}r+=1+ts.length;}return r;}
function allPts(L){const P=[];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const t=lineX(L[i],L[j]);if(t!==null)P.push(ptOn(L[i],t));}return P;}
const Lmax=n=>n*(n+1)/2+1;
function mkLine(p,th){return {p,d:[Math.cos(th),Math.sin(th)]};}
function genLine(L,rnd,strict){
  const ex=allPts(L);
  for(let a=0;a<600;a++){
    const lim=strict||a<400;const nl=mkLine([(rnd()*2-1)*.55,(rnd()*2-1)*VA*.55],rnd()*Math.PI);let ok=true;const pts=[];
    for(const l of L){const cr=Math.abs(nl.d[0]*l.d[1]-nl.d[1]*l.d[0]);if(cr<.14){ok=false;break;}const q=ptOn(nl,lineX(nl,l));if(lim&&(Math.abs(q[0])>.9||Math.abs(q[1])>VA*.88)){ok=false;break;}pts.push(q);}
    if(!ok)continue;
    if(pts.some(q=>ex.some(e=>Math.hypot(e[0]-q[0],e[1]-q[1])<.05)))continue;
    if(pts.some((q,i)=>pts.some((r,j)=>j>i&&Math.hypot(r[0]-q[0],r[1]-q[1])<.05)))continue;
    return nl;
  }
  return null;
}
function seededLines(seed,n,strict){const r=rng32(seed),L=[];while(L.length<n){const l=genLine(L,r,strict);if(!l)break;L.push(l);}return L;}
function clipT(p,d){let t0=-1e9,t1=1e9;const lo=[-1,-VA],hi=[1,VA];for(let k=0;k<2;k++){if(Math.abs(d[k])<1e-12){if(p[k]<lo[k]||p[k]>hi[k])return null;continue;}let a=(lo[k]-p[k])/d[k],b=(hi[k]-p[k])/d[k];if(a>b)[a,b]=[b,a];t0=Math.max(t0,a);t1=Math.min(t1,b);}return t0<t1?[t0,t1]:null;}

class Plane{
  constructor(cv,o){
    this.cv=cv;this.o=Object.assign({cell:2,interactive:false,bounded:false,onChange:null},o||{});
    this.lines=[];this.zz=[];this.mode="lines";this.hl=-1;this.pending=null;this.visible=0;this.boundedN=0;this.unboundedN=0;
    this.ro=new ResizeObserver(()=>this.render());this.ro.observe(cv);
    if(this.o.interactive)cv.addEventListener("pointerdown",e=>this.tap(e));
  }
  dims(){const r=this.cv.getBoundingClientRect();return {w:r.width,h:r.width*VA};}
  toS(x,y,w,h){return [(x+1)/2*w,(VA-y)/(2*VA)*h];}
  key(x,y){
    let k=0;
    if(this.mode==="zz"){this.zz.forEach((z,i)=>{const px=x-z.v[0],py=y-z.v[1],a=z.a,b=z.b,cr=a[0]*b[1]-a[1]*b[0],sg=cr>0?1:-1;if((a[0]*py-a[1]*px)*sg>0&&(px*b[1]-py*b[0])*sg>0)k|=1<<i;});return k;}
    const L=this.mode==="zzlines"?this.zzLines():this.lines;
    for(let i=0;i<L.length;i++){const l=L[i];if(l.d[0]*(y-l.p[1])-l.d[1]*(x-l.p[0])>0)k|=1<<i;}
    return k;
  }
  zzLines(){const L=[];this.zz.forEach(z=>{L.push({p:z.v,d:z.a});L.push({p:z.v,d:z.b});});return L;}
  render(){
    const {w,h}=this.dims();if(w<20)return;
    const dpr=Math.min(2,window.devicePixelRatio||1),cv=this.cv;cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);
    const ctx=cv.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);
    const c=this.o.cell,gw=Math.ceil(w/c),gh=Math.ceil(h/c),N=gw*gh,keys=new Int32Array(N);
    for(let j=0;j<gh;j++){const y=VA-((j+.5)*c/h)*2*VA;for(let i=0;i<gw;i++)keys[j*gw+i]=this.key(-1+((i+.5)*c/w)*2,y);}
    const lab=new Int32Array(N).fill(-1),st=new Int32Array(N),comp=[];
    for(let s=0;s<N;s++){if(lab[s]>=0)continue;const k=keys[s],id=comp.length;let sp=0,sz=0,bd=false;st[sp++]=s;lab[s]=id;
      while(sp){const q=st[--sp];sz++;const qi=q%gw,qj=(q/gw)|0;if(qi===0||qj===0||qi===gw-1||qj===gh-1)bd=true;
        if(qi>0&&lab[q-1]<0&&keys[q-1]===k){lab[q-1]=id;st[sp++]=q-1;}
        if(qi<gw-1&&lab[q+1]<0&&keys[q+1]===k){lab[q+1]=id;st[sp++]=q+1;}
        if(qj>0&&lab[q-gw]<0&&keys[q-gw]===k){lab[q-gw]=id;st[sp++]=q-gw;}
        if(qj<gh-1&&lab[q+gw]<0&&keys[q+gw]===k){lab[q+gw]=id;st[sp++]=q+gw;}}
      comp.push({k,sz,bd});}
    const dark=isDarkTheme(),seen=new Map();let vis=0,bnd=0,unb=0;
    const col=comp.map(cp=>{const big=cp.sz>=3;if(big){vis++;cp.bd?unb++:bnd++;}
      const dup=seen.get(cp.k)||0;seen.set(cp.k,dup+1);
      const h=((cp.k*2654435761>>>0)%360+dup*67)%360;
      if(this.o.bounded&&cp.bd)return dark?[34,40,48]:[226,229,227];
      return this.o.bounded?hsl2rgb(h,dark?55:70,dark?36:68):hsl2rgb(h,dark?42:68,dark?27:86);});
    this.visible=vis;this.boundedN=bnd;this.unboundedN=unb;
    const off=document.createElement("canvas");off.width=gw;off.height=gh;const octx=off.getContext("2d"),img=octx.createImageData(gw,gh);
    for(let s=0;s<N;s++){const cc=col[lab[s]];img.data[4*s]=cc[0];img.data[4*s+1]=cc[1];img.data[4*s+2]=cc[2];img.data[4*s+3]=255;}
    octx.putImageData(img,0,0);ctx.imageSmoothingEnabled=true;ctx.drawImage(off,0,0,w,h);
    const ink=cssv("--ink"),acc=cssv("--accent"),gold=cssv("--accent-2"),mut=cssv("--muted");
    const seg=(a,b,color,lw,dash)=>{const A=this.toS(a[0],a[1],w,h),B=this.toS(b[0],b[1],w,h);ctx.beginPath();ctx.setLineDash(dash||[]);ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();ctx.setLineDash([]);};
    const dot=(p,r,color)=>{const P=this.toS(p[0],p[1],w,h);ctx.beginPath();ctx.fillStyle=color;ctx.arc(P[0],P[1],r,0,7);ctx.fill();};
    if(this.mode==="zz"){
      this.zz.forEach(z=>{[z.a,z.b].forEach(d=>{const ct=clipT(z.v,d);if(ct)seg(z.v,ptOn({p:z.v,d},ct[1]),ink,2);const nd=[-d[0],-d[1]],ce=clipT(z.v,nd);if(ce)seg(z.v,ptOn({p:z.v,d:nd},ce[1]),mut,1.2,[5,5]);});dot(z.v,4,gold);});
    }else{
      const L=this.mode==="zzlines"?this.zzLines():this.lines;
      L.forEach((l,i)=>{if(i===this.hl)return;const ct=clipT(l.p,l.d);if(ct)seg(ptOn(l,ct[0]),ptOn(l,ct[1]),ink,1.6);});
      if(this.mode==="zzlines")this.zz.forEach(z=>dot(z.v,4,gold));
      if(this.hl>=0&&this.hl<L.length){
        const l=L[this.hl],ct=clipT(l.p,l.d);
        if(ct){seg(ptOn(l,ct[0]),ptOn(l,ct[1]),acc,3.4);
          const ts=[];for(let j=0;j<this.hl;j++){const t=lineX(l,L[j]);if(t!==null&&!ts.some(u=>Math.abs(u-t)<1e-7))ts.push(t);}ts.sort((a,b)=>a-b);
          const bounds=[ct[0],...ts.filter(t=>t>ct[0]&&t<ct[1]),ct[1]];
          for(let s=0;s<bounds.length-1;s++){const m=ptOn(l,(bounds[s]+bounds[s+1])/2),P=this.toS(m[0],m[1],w,h);
            ctx.beginPath();ctx.fillStyle=acc;ctx.arc(P[0],P[1],9,0,7);ctx.fill();ctx.fillStyle="#fff";ctx.font="600 11px "+getComputedStyle(document.body).getPropertyValue("--f-mono");ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(String(s+1),P[0],P[1]+.5);}
          ts.forEach(t=>dot(ptOn(l,t),4.5,gold));}
      }
    }
    if(this.pending){dot(this.pending,5,acc);}
    this.o.onChange&&this.o.onChange(this);
  }
  tap(e){
    const r=this.cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*2-1,y=VA-(e.clientY-r.top)/(r.width*VA)*2*VA;
    if(!this.pending){this.pending=[x,y];this.render();this.o.onInfo&&this.o.onInfo("Első pont megvan. Koppints a második pontra.","");return;}
    const a=this.pending;this.pending=null;const dx=x-a[0],dy=y-a[1],len=Math.hypot(dx,dy);
    if(len<.04){this.render();this.o.onInfo&&this.o.onInfo("A két pont túl közel van, kezdd újra.","bad");return;}
    this.add({p:a,d:[dx/len,dy/len]},"saját");
  }
  add(l,how){
    if(this.lines.length>=14){this.o.onInfo&&this.o.onInfo("Legfeljebb 14 egyenes fér el.","bad");return false;}
    for(const m of this.lines){const cr=l.d[0]*m.d[1]-l.d[1]*m.d[0];if(Math.abs(cr)<1e-6){const dist=Math.abs(m.d[0]*(l.p[1]-m.p[1])-m.d[1]*(l.p[0]-m.p[0]));if(dist<1e-4){this.o.onInfo&&this.o.onInfo("Ez az egyenes már a síkon van.","bad");return false;}}}
    this.lines.push(l);this.hl=this.lines.length-1;this.render();this.o.onAdd&&this.o.onAdd(how);return true;
  }
}

/* --- hero --- */
const eHero=new Plane($("#e-hero"),{cell:3});
(async function eHeroLoop(){
  if(reduce){eHero.lines=seededLines(11,5,true);eHero.render();$("#e-hero-n").textContent="n = 5";$("#e-hero-L").textContent=Lmax(5);return;}
  let seed=21;
  for(;;){
    eHero.lines=[];eHero.hl=-1;eHero.render();$("#e-hero-n").textContent="n = 0";$("#e-hero-L").textContent="1";
    const L=seededLines(seed++,7,true);
    for(const l of L){await sleep(1300);while(document.hidden||curPage!=="egyenesek-bevezeto")await sleep(400);eHero.lines.push(l);eHero.hl=eHero.lines.length-1;eHero.render();
      const n=eHero.lines.length;$("#e-hero-n").textContent=`n = ${n} · +${n}`;$("#e-hero-L").textContent=exactRegions(eHero.lines);}
    await sleep(2600);
  }
})();

/* --- §1 játszótér --- */
const ePgMsg=(s,c)=>{const m=$("#e-pg-msg");m.textContent=s;m.className="msg "+(c||"");};
const eRnd=rng32(Date.now()%100000);
const ePg=new Plane($("#e-pg"),{interactive:true,onInfo:ePgMsg,onAdd:how=>ePgStats(how)});
function ePgStats(how){
  const n=ePg.lines.length,r=exactRegions(ePg.lines),mx=Lmax(n);
  $("#e-pg-n").textContent=n;$("#e-pg-r").textContent=r;$("#e-pg-max").textContent=mx;
  if(!how)return;
  const prev=exactRegions(ePg.lines.slice(0,-1)),gain=r-prev;
  if(r===mx)ePgMsg(`${n}. egyenes: +${gain} tartomány (ez a maximum). Összesen ${r} = L${String(n).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join("")}.`,"ok");
  else ePgMsg(`${n}. egyenes: csak +${gain} tartomány, a maximum +${n} lett volna. Összesen ${mx-r} tartomány hiányzik a maximumból.`,"bad");
}
$("#e-pg-rand").onclick=()=>{const l=genLine(ePg.lines,eRnd,false);if(!l){ePgMsg("Nem találtam szabad helyet új általános egyenesnek. Törölj vagy vonj vissza.","bad");return;}ePg.add(l,"rand");};
$("#e-pg-par").onclick=()=>{if(!ePg.lines.length){ePgMsg("Előbb kell legalább egy egyenes.","bad");return;}const m=ePg.lines[Math.floor(eRnd()*ePg.lines.length)];const nrm=[-m.d[1],m.d[0]];const off=(eRnd()<.5?-1:1)*(.12+eRnd()*.25);ePg.add({p:[m.p[0]+nrm[0]*off,m.p[1]+nrm[1]*off],d:m.d.slice()},"par");};
$("#e-pg-conc").onclick=()=>{const P=allPts(ePg.lines).filter(q=>Math.abs(q[0])<.95&&Math.abs(q[1])<VA*.95);if(!P.length){ePgMsg("Ehhez kell egy látható metszéspont (legalább két nem párhuzamos egyenes).","bad");return;}const q=P[Math.floor(eRnd()*P.length)];
  for(let a=0;a<100;a++){const l=mkLine(q.slice(),eRnd()*Math.PI);if(ePg.lines.every(m=>Math.abs(l.d[0]*m.d[1]-l.d[1]*m.d[0])>.15)){ePg.add(l,"conc");return;}}ePgMsg("Nem találtam megfelelő irányt, próbáld újra.","bad");};
$("#e-pg-undo").onclick=()=>{ePg.lines.pop();ePg.hl=ePg.lines.length-1;ePg.pending=null;ePg.render();ePgStats();ePgMsg("Visszavonva.","");};
$("#e-pg-clear").onclick=()=>{ePg.lines=[];ePg.hl=-1;ePg.pending=null;ePg.render();ePgStats();ePgMsg("Üres sík: 1 tartomány.","");};
ePgStats();

/* --- §2 kis esetek --- */
(function eSmall(){
  const box=$("#e-film");const base=seededLines(5,3,true);
  [0,1,2,3].forEach(n=>{const d=document.createElement("div");d.className="frame";const cv=document.createElement("canvas");cv.className="plane";d.appendChild(cv);const c=document.createElement("div");c.className="fc";c.textContent=`n = ${n}: L = ${Lmax(n)}`;d.appendChild(c);box.appendChild(d);
    const p=new Plane(cv,{cell:3});p.lines=base.slice(0,n);p.hl=n-1;p.render();});
  const N=8;let h="<tr><th>n</th>";for(let n=0;n<=N;n++)h+=`<td>${n}</td>`;h+="</tr><tr class=\"hl\"><th>L<sub>n</sub></th>";for(let n=0;n<=N;n++)h+=`<td>${Lmax(n)}</td>`;
  h+="</tr><tr><th>2<sup>n</sup></th>";for(let n=0;n<=N;n++)h+=`<td>${2**n}</td>`;$("#e-vals").innerHTML=h+"</tr>";
  const s=$("#e-bars"),W=640,H=210,l=40,r=10,tp=16,b=26;s.setAttribute("viewBox",`0 0 ${W} ${H}`);const bw=(W-l-r)/(N+1),ys=v=>H-b-(H-b-tp)*v/256;
  [0,64,128,192,256].forEach(v=>{el("line",{x1:l,x2:W-r,y1:ys(v),y2:ys(v),class:"grid-l"},s);txt(s,l-6,ys(v)+4,v,"","end");});
  for(let n=0;n<=N;n++){const x=l+n*bw,w=bw*.36;
    el("rect",{x:x+bw*.12,y:ys(Lmax(n)),width:w,height:H-b-ys(Lmax(n)),rx:2,style:"fill:var(--accent)"},s);
    el("rect",{x:x+bw*.12+w+2,y:ys(2**n),width:w,height:H-b-ys(2**n),rx:2,style:"fill:var(--muted);opacity:.55"},s);
    if(n>=3)txt(s,x+bw*.12+w/2,ys(Lmax(n))-4,Lmax(n),"acc");txt(s,x+bw/2,H-8,"n="+n);}
})();

/* --- §3 rekurzió --- */
let eRecN=4;const eRecBase=seededLines(77,9,true);
const eRec=new Plane($("#e-rec"));
function eRecDraw(){const n=eRecN;eRec.lines=eRecBase.slice(0,n);eRec.hl=n-1;eRec.render();$("#e-rec-n").textContent="n = "+n;
  $("#e-rec-info").innerHTML=`A kiemelt ${n}. egyenes ${n-1} metszéspontot kap (sárga), ezért ${n} darabra esik (számozva).<br>L${String(n-1).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join("")} + ${n} = ${Lmax(n-1)} + ${n} = ${Lmax(n)}`;}
$("#e-rec-minus").onclick=()=>{eRecN=Math.max(1,eRecN-1);eRecDraw();};$("#e-rec-plus").onclick=()=>{eRecN=Math.min(eRecBase.length,eRecN+1);eRecDraw();};
eRecDraw();

/* --- §4 Gauss-lépcső --- */
function eGauss(){
  const n=+$("#e-gauss-n").value;$("#e-gauss-nv").textContent=n;const s=$("#e-gauss");clear(s);
  const W=640,H=300,u=Math.min(40,Math.min((W-80)/n,(H-50)/(n+1)));s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const x0=(W-n*u)/2,y0=H-24;
  for(let i=0;i<n;i++){const k=i+1;
    for(let j=0;j<k;j++)el("rect",{x:x0+i*u+1,y:y0-(j+1)*u+1,width:u-2,height:u-2,rx:3,style:"fill:var(--accent)"},s);
    for(let j=k;j<n+1;j++)el("rect",{x:x0+i*u+1,y:y0-(j+1)*u+1,width:u-2,height:u-2,rx:3,style:"fill:var(--accent-2);opacity:.85"},s);
    if(u>=16)txt(s,x0+i*u+u/2,y0+16,k);}
  txt(s,x0-8,y0-(n+1)*u/2,`${n+1}`,"ink","end");
  $("#e-gauss-info").innerHTML=`kék: 1 + 2 + … + ${n} = S${String(n).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join("")} · sárga: ugyanez fordítva<br>együtt: ${n} × ${n+1} = ${n*(n+1)} négyzet → S = ${n*(n+1)/2}, L = ${n*(n+1)/2+1}`;
}
$("#e-gauss-n").addEventListener("input",eGauss);eGauss();

/* --- §5 cikkcakk --- */
const ZZP={1:[[-0.419,0.044,2.3245,-2.9944]],2:[[0.07,0.169,-2.4895,-2.0122],[-0.581,0.125,-0.7266,-0.2747]],3:[[-0.195,0.235,-0.6574,-0.1012],[-0.084,-0.5,1.2913,1.6089],[0.479,0.212,-2.8392,-2.3358]]};
let eZk=2,eZm="zz";
const eZ=new Plane($("#e-zz"),{cell:2,onChange:p=>{$("#e-zz-r").textContent=p.visible;}});
function eZdraw(){
  eZ.zz=ZZP[eZk].map(([x,y,a,b])=>({v:[x,y],a:[Math.cos(a),Math.sin(a)],b:[Math.cos(b),Math.sin(b)]}));eZ.mode=eZm==="zz"?"zz":"zzlines";eZ.hl=-1;eZ.render();
  $("#e-zz-k").textContent="n = "+eZk;$("#e-zz-n").textContent=eZm==="zz"?eZk:`${2*eZk} egyenes`;
  const sub=String(eZk).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join(""),sub2=String(2*eZk).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join("");
  $("#e-zz-f").textContent=eZm==="zz"?`Z${sub} = ${2*eZk*eZk-eZk+1}`:`L${sub2} = ${Lmax(2*eZk)}`;
  $("#e-zz-mode").textContent=eZm==="zz"?"Meghosszabbítás egyenessé":"Vissza cikkcakkra";
}
$("#e-zz-minus").onclick=()=>{eZk=Math.max(1,eZk-1);eZdraw();};$("#e-zz-plus").onclick=()=>{eZk=Math.min(3,eZk+1);eZdraw();};
$("#e-zz-mode").onclick=()=>{eZm=eZm==="zz"?"lines":"zz";eZdraw();};
eZdraw();
(function(){let h="<tr><th>n</th>";for(let n=0;n<=8;n++)h+=`<td>${n}</td>`;h+="</tr><tr class=\"hl\"><th>Z<sub>n</sub></th>";for(let n=0;n<=8;n++)h+=`<td>${2*n*n-n+1}</td>`;
  h+="</tr><tr><th>L<sub>n</sub></th>";for(let n=0;n<=8;n++)h+=`<td>${Lmax(n)}</td>`;h+="</tr><tr><th>L<sub>2n</sub></th>";for(let n=0;n<=8;n++)h+=`<td>${Lmax(2*n)}</td>`;$("#e-zz-tbl").innerHTML=h+"</tr>";})();

/* --- §6 korlátos tartományok --- */
const eKorBase=seededLines(303,9,true);
const eKor=new Plane($("#e-kor"),{bounded:true,onChange:p=>{$("#e-kor-b").textContent=p.boundedN;$("#e-kor-u").textContent=p.unboundedN;}});
function eKorDraw(){const n=+$("#e-kor-n").value;$("#e-kor-nv").textContent=n;eKor.lines=eKorBase.slice(0,n);eKor.hl=-1;eKor.render();$("#e-kor-f").textContent=(n-1)*(n-2)/2;}
$("#e-kor-n").addEventListener("input",eKorDraw);eKorDraw();
