/* ================= 8.3 VALÓSZÍNŰSÉG-GENERÁLÓ FÜGGVÉNYEK ================= */
c2hero("valgf-bevezeto",900,7,fr=>{
  const k=2+fr,p=1/k,q=1-p,s=$("#ap-hero"),W=420,H=250,L=14,bw=(W-40)/L;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let i=1;i<=L;i++){const h=q**(i-1)*p/0.5*170;el("rect",{x:20+(i-1)*bw+2,y:H-30-h,width:bw-4,height:Math.max(h,0.5),rx:2,style:"fill:var(--accent);opacity:.85"},s);txt(s,20+(i-1)*bw+bw/2,H-12,i,"");}
  const x=20+(1/p-1)*bw+bw/2;if(1/p<=L)el("line",{x1:x,x2:x,y1:20,y2:H-30,style:"stroke:var(--accent-2);stroke-width:2;stroke-dasharray:4 3"},s);
  $("#ap-hero-a").textContent="p = 1/"+k;$("#ap-hero-b").textContent=k;
});
const pgDist=i=>{if(i===0)return Array.from({length:7},(_,k)=>k?rat(1,6):rat(0));
  if(i===1||i===3){const d=vkDist(i===1?2:3);return d.map(v=>rat(v,6**(i===1?2:3)));}
  const p=rat(3,10),q=rat(7,10);return Array.from({length:11},(_,k)=>{let r=rat(bC(10,k));for(let j=0;j<k;j++)r=r.mul(p);for(let j=0;j<10-k;j++)r=r.mul(q);return r;});};
function apG(){
  const P=pgDist(+$("#ap-g-d").value);let G1=rat(0),G2=rat(0),Gv=rat(0),E=rat(0),E2=rat(0);
  P.forEach((p,k)=>{Gv=Gv.add(p);G1=G1.add(p.mul(rat(k)));G2=G2.add(p.mul(rat(k*(k-1))));E=E.add(p.mul(rat(k)));E2=E2.add(p.mul(rat(k*k)));});
  const V=G2.add(G1).sub(G1.mul(G1)),V0=E2.sub(E.mul(E));
  $("#ap-g-info").innerHTML=`G(1) = ${Gv} ${ok(Gv.eq(rat(1)))}<br>G′(1) = ${G1} = E[X] ${ok(G1.eq(E))}<br>G″(1) = ${G2}<br>Var = G″(1) + G′(1) − G′(1)² = ${V} &nbsp;·&nbsp; E[X²] − E² = ${V0} ${ok(V.eq(V0))}`;
}
$("#ap-g-d").addEventListener("input",apG);apG();
function apQ(){
  const k=+$("#ap-q-k").value;$("#ap-q-kv").textContent=k;const p=1/k,q=1-p;let E=0,E2=0,t=0;
  for(let i=1;i<=500;i++){const pr=q**(i-1)*p;t+=pr;E+=i*pr;E2+=i*i*pr;}
  const V=E2-E*E;
  $("#ap-q-info").innerHTML=`p = 1/${k}: összeg (500 tag) = ${fm(+t.toFixed(8))}<br>E = ${fm(+E.toFixed(6))} &nbsp;·&nbsp; 1/p = ${k} ${ok(Math.abs(E-k)<1e-6)}<br>Var = ${fm(+V.toFixed(5))} &nbsp;·&nbsp; q/p² = ${fm(+(q/(p*p)).toFixed(5))} ${ok(Math.abs(V-q/(p*p))<1e-4)}`;
}
$("#ap-q-k").addEventListener("input",apQ);apQ();
function apO(){
  const n=+$("#ap-o-n").value;$("#ap-o-nv").textContent=n;const d=vkDist(n),tot=rat(6**n);let E=rat(0),E2=rat(0);
  d.forEach((c,k)=>{const p=rat(c).div(tot);E=E.add(p.mul(rat(k)));E2=E2.add(p.mul(rat(k*k)));});
  const V=E2.sub(E.mul(E)),eE=rat(7*n,2),eV=rat(35*n,12);
  $("#ap-o-info").innerHTML=`${n} kocka, G(x) = ((x+…+x⁶)/6)<sup>${n}</sup><br>E (a definícióból) = ${E} &nbsp;·&nbsp; 7n/2 = ${eE} ${ok(E.eq(eE))}<br>Var = ${V} &nbsp;·&nbsp; 35n/12 = ${eV} ${ok(V.eq(eV))}`;
}
$("#ap-o-n").addEventListener("input",apO);apO();
