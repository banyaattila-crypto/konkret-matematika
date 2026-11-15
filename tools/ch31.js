/* ================= 3.1 PADLÓ ÉS PLAFON ================= */
const pFl=j=>Math.floor(j/12),pCl=j=>-Math.floor(-j/12); /* x = j/12 */
const pNum=v=>fm(v);
/* lépcsőgrafikon: x ∈ [−3,3], y ∈ [−3,3] */
function pStairs(s,W,H,xv){
  clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const X=x=>W/2+x*(W-40)/6,Y=y=>H/2-y*(H-40)/6;
  for(let i=-3;i<=3;i++){el("line",{x1:X(i),x2:X(i),y1:Y(-3),y2:Y(3),class:"grid-l"},s);el("line",{x1:X(-3),x2:X(3),y1:Y(i),y2:Y(i),class:"grid-l"},s);txt(s,X(i),Y(0)+14,i);if(i)txt(s,X(0)-6,Y(i)+4,i,"","end");}
  el("line",{x1:X(-3),x2:X(3),y1:Y(0),y2:Y(0),class:"axis"},s);el("line",{x1:X(0),x2:X(0),y1:Y(-3),y2:Y(3),class:"axis"},s);
  el("line",{x1:X(-3),x2:X(3),y1:Y(-3),y2:Y(3),style:"stroke:var(--muted);stroke-dasharray:3 4;stroke-width:1"},s);
  for(let n=-3;n<3;n++){
    el("line",{x1:X(n),x2:X(n+1),y1:Y(n),y2:Y(n),style:"stroke:var(--accent);stroke-width:3"},s);
    el("circle",{cx:X(n),cy:Y(n),r:4,style:"fill:var(--accent)"},s);el("circle",{cx:X(n+1),cy:Y(n),r:4,style:"fill:var(--surface);stroke:var(--accent);stroke-width:2"},s);
    el("line",{x1:X(n),x2:X(n+1),y1:Y(n+1),y2:Y(n+1),style:"stroke:var(--accent-2);stroke-width:3"},s);
    el("circle",{cx:X(n+1),cy:Y(n+1),r:4,style:"fill:var(--accent-2)"},s);el("circle",{cx:X(n),cy:Y(n+1),r:4,style:"fill:var(--surface);stroke:var(--accent-2);stroke-width:2"},s);
  }
  const f=Math.floor(xv),c=-Math.floor(-xv);
  el("line",{x1:X(xv),x2:X(xv),y1:Y(f),y2:Y(c),style:"stroke:var(--ink);stroke-width:1.5;stroke-dasharray:3 3"},s);
  el("circle",{cx:X(xv),cy:Y(f),r:5.5,style:"fill:var(--accent);stroke:var(--ink)"},s);el("circle",{cx:X(xv),cy:Y(c),r:5.5,style:"fill:var(--accent-2);stroke:var(--ink)"},s);
  txt(s,W-8,Y(3)+14,"kék: ⌊x⌋ · sárga: ⌈x⌉","","end");
}
c2hero("padlo-bevezeto",450,12,fr=>{
  const x=-2.75+0.5*fr;pStairs($("#p-hero"),420,250,x);
  $("#p-hero-a").textContent="x = "+fm(x);$("#p-hero-b").textContent=Math.floor(x);$("#p-hero-c").textContent=-Math.floor(-x);
});

/* --- §1 definíció --- */
function pDef(){
  const v=+$("#p-d-x").value,x=v/100;$("#p-d-xv").textContent=fm(x);
  pStairs(c2svg("#p-d-svg",640,300),640,300,x);
  const f=Math.floor(v/100),c=-Math.floor(-v/100),fr=(v-100*f)/100;
  $("#p-d-fl").textContent=f;$("#p-d-cl").textContent=c;$("#p-d-fr").textContent=fm(fr);
  const isInt=v%100===0;
  $("#p-d-info").innerHTML=`⌈x⌉ − ⌊x⌋ = ${c-f} = [x ∉ ℤ] = ${isInt?0:1} ${ok(c-f===(isInt?0:1))} &nbsp;·&nbsp; ⌈x⌉ = −⌊−x⌋ = ${-Math.floor(-v/100)} ${ok(c===-Math.floor(-v/100))} &nbsp;·&nbsp; x = ⌊x⌋ + {x}: ${f} + ${fm(fr)} ${ok(Math.abs(f+fr-x)<1e-9)} &nbsp;·&nbsp; ⌊x + ½⌋ = ${Math.floor((v+50)/100)}`;
}
$("#p-d-x").addEventListener("input",pDef);pDef();

/* --- §2 szabályok: tesztelő --- */
const pRules=[
 {t:"⌊x⌋ = n  ⇔  n ≤ x < n+1",f:(j,n)=>(pFl(j)===n)===(12*n<=j&&j<12*n+12)},
 {t:"⌈x⌉ = n  ⇔  n−1 < x ≤ n",f:(j,n)=>(pCl(j)===n)===(12*n-12<j&&j<=12*n)},
 {t:"x < n  ⇔  ⌊x⌋ < n",f:(j,n)=>(j<12*n)===(pFl(j)<n)},
 {t:"n < x  ⇔  n < ⌈x⌉",f:(j,n)=>(12*n<j)===(n<pCl(j))},
 {t:"x ≤ n  ⇔  ⌈x⌉ ≤ n",f:(j,n)=>(j<=12*n)===(pCl(j)<=n)},
 {t:"n ≤ x  ⇔  n ≤ ⌊x⌋",f:(j,n)=>(12*n<=j)===(n<=pFl(j))},
 {t:"⌊x + n⌋ = ⌊x⌋ + n  (n egész)",f:(j,n)=>pFl(j+12*n)===pFl(j)+n},
 {t:"⌈x⌉ = −⌊−x⌋",f:(j,n)=>pCl(j)===-pFl(-j)},
 {t:"⌊x + y⌋ = ⌊x⌋ + ⌊y⌋  (y = n/12, HAMIS)",f:(j,n)=>pFl(j+n)===pFl(j)+pFl(n)}
];
$("#p-s-r").innerHTML=pRules.map((r,i)=>`<option value="${i}">${r.t}</option>`).join("");
function pSz(){
  const r=pRules[+$("#p-s-r").value];let cnt=0,bad=null,badN=0;
  const R=r.t.includes("y = n/12")?24:6;
  for(let j=-60;j<=60;j++)for(let n=-R;n<=R;n++){cnt++;if(!r.f(j,n)){badN++;if(!bad)bad=[j,n];}}
  const fr=(a)=>a%12===0?String(a/12):`${a}/12`;
  $("#p-s-info").innerHTML=badN===0?`${cnt} esetből mind teljesül ${ok(true)}`:`${cnt} esetből ${badN} hibás ${ok(false)}; első ellenpélda: x = ${fr(bad[0])}`+(r.t.includes("y = n/12")?`, y = ${fr(bad[1])}: ⌊x+y⌋ = ${pFl(bad[0]+bad[1])}, ⌊x⌋+⌊y⌋ = ${pFl(bad[0])+pFl(bad[1])}`:`, n = ${bad[1]}`);
}
$("#p-s-r").addEventListener("input",pSz);pSz();

/* --- §3 integralitási tétel --- */
const pFd=(p,q)=>Math.floor(p/q);                 /* p, q > 0 egészek */
const pFn={
  half:{fl:(a,b)=>pFd(a,2*b),cl:(a,b)=>-pFd(-a,2*b)},
  lin:{fl:(a,b)=>pFd(a+3*b,5*b),cl:(a,b)=>-pFd(-(a+3*b),5*b)},
  sqrt:{fl:(a,b)=>{let t=0;while((t+1)*(t+1)*b<=a)t++;return t;},cl:(a,b)=>{let t=0;while(t*t*b<a)t++;return t;}},
  dbl:{fl:(a,b)=>pFd(2*a,b),cl:(a,b)=>-pFd(-2*a,b)},
  sq:{fl:(a,b)=>pFd(a*a,b*b),cl:(a,b)=>-pFd(-a*a,b*b)}
};
function pInt(){
  const g=pFn[$("#p-i-f").value];let n=0,badF=null,badC=null;
  for(let j=0;j<=600;j++){n++;
    const x=j/12,xf=Math.floor(j/12),xc=-Math.floor(-j/12);
    if(g.fl(j,12)!==g.fl(xf,1)&&!badF)badF=[j,g.fl(j,12),g.fl(xf,1)];
    if(g.cl(j,12)!==g.cl(xc,1)&&!badC)badC=[j,g.cl(j,12),g.cl(xc,1)];}
  const fr=a=>a%12===0?String(a/12):`${a}/12`;
  $("#p-i-info").innerHTML=`${n} racionális x-re (0 … 50): `+
   (badF?`⌊f(x)⌋ ≠ ⌊f(⌊x⌋)⌋ ${ok(false)}, pl. x = ${fr(badF[0])}: ${badF[1]} ≠ ${badF[2]}`:`⌊f(x)⌋ = ⌊f(⌊x⌋)⌋ mindenütt ${ok(true)}`)+"<br>"+
   (badC?`⌈f(x)⌉ ≠ ⌈f(⌈x⌉)⌉ ${ok(false)}, pl. x = ${fr(badC[0])}: ${badC[1]} ≠ ${badC[2]}`:`⌈f(x)⌉ = ⌈f(⌈x⌉)⌉ mindenütt ${ok(true)}`);
}
$("#p-i-f").addEventListener("input",pInt);pInt();
