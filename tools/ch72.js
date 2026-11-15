/* ================= 7.2 REKURZIÓK MEGOLDÁSA ================= */
c2hero("gfrek-bevezeto",900,10,fr=>{
  const s=$("#aj-hero"),W=420,H=250,n=1+fr;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const a=k=>3**k-2**k,y=v=>H-30-(v-1.5)*(H-60)/3.7,x=k=>30+(k-1)*(W-60)/9;
  el("line",{x1:20,x2:W-10,y1:y(3),y2:y(3),style:"stroke:var(--accent-2);stroke-dasharray:4 4"},s);txt(s,W-24,y(3)-6,"3","");
  for(let k=1;k<=n;k++){const r=a(k+1)/a(k);el("circle",{cx:x(k),cy:y(r),r:5,style:`fill:var(--accent);opacity:${k===n?1:.5}`},s);txt(s,x(k),H-10,k,"");}
  $("#aj-hero-a").textContent="n = "+n;$("#aj-hero-b").textContent=fm(+(a(n+1)/a(n)).toFixed(5));
});
function ajR(){
  const c1=+$("#aj-r-c1").value,c2=+$("#aj-r-c2").value,a0=+$("#aj-r-a0").value,a1=+$("#aj-r-a1").value,N=14;
  $("#aj-r-c1v").textContent=c1;$("#aj-r-c2v").textContent=fm(c2);$("#aj-r-a0v").textContent=a0;$("#aj-r-a1v").textContent=a1;
  const P=[a0,a1-c1*a0],Q=[1,-c1,-c2],s=gfDiv(P,Q,N),d=[a0,a1];for(let n=2;n<N;n++)d.push(c1*d[n-1]+c2*d[n-2]);
  const disc=c1*c1+4*c2;
  const sg=(v,t)=>v===0?"":(v>0?"+ ":"− ")+(Math.abs(v)===1&&t?"":Math.abs(v))+t;
  $("#aj-r-info").innerHTML=`számláló: ${a0} ${sg(P[1],"x")||""}<br>nevező: 1 ${sg(-c1,"x")} ${sg(-c2,"x²")}<br>sorfejtés: ${s.slice(0,10).join(", ")}, …<br>rekurzió: ${d.slice(0,10).join(", ")}, … ${ok(s.every((v,i)=>v===d[i]))}<br>karakterisztikus diszkrimináns: ${disc} ${disc>0?"(két valós gyök)":disc===0?"(kettős gyök)":"(komplex gyökpár)"}`;
}
["#aj-r-c1","#aj-r-c2","#aj-r-a0","#aj-r-a1"].forEach(i=>$(i).addEventListener("input",ajR));ajR();
function ajP(){
  const r1=+$("#aj-p-r1").value,r2=+$("#aj-p-r2").value,a0=+$("#aj-p-a0").value,a1=+$("#aj-p-a1").value,N=14;
  $("#aj-p-r1v").textContent=fm(r1);$("#aj-p-r2v").textContent=fm(r2);$("#aj-p-a0v").textContent=a0;$("#aj-p-a1v").textContent=a1;
  const c1=r1+r2,c2=-r1*r2,d=[a0,a1];for(let n=2;n<N;n++)d.push(c1*d[n-1]+c2*d[n-2]);
  if(r1===r2){const al=rat(a0),be=rat(a1-r1*a0,r1||1);
    if(r1===0){$("#aj-p-info").innerHTML="r₁ = r₂ = 0: a rekurzió a₂-től minden tagot nullára állít.";return;}
    const f=n=>al.add(be.mul(rat(n))).mul(rat(r1**n));
    $("#aj-p-info").innerHTML=`kettős gyök (r = ${r1}): a<sub>n</sub> = (α + βn)·${r1}<sup>n</sup>, α = ${al}, β = ${be}<br>rekurzió: ${d.slice(0,8).join(", ")}, …<br>képlet egyezik az első ${N} taggal ${ok(d.every((v,n)=>f(n).eq(rat(v))))}`;return;}
  const al=rat(a1-r2*a0,r1-r2),be=rat(r1*a0-a1,r1-r2);
  const f=n=>al.mul(rat(r1**n)).add(be.mul(rat(r2**n)));
  $("#aj-p-info").innerHTML=`a<sub>n</sub> = α·${fm(r1)}<sup>n</sup> + β·${fm(r2)}<sup>n</sup>, α = ${al}, β = ${be}<br>rekurzió: ${d.slice(0,8).join(", ")}, …<br>a képlet az első ${N} taggal egyezik ${ok(d.every((v,n)=>f(n).eq(rat(v))))}`;
}
["#aj-p-r1","#aj-p-r2","#aj-p-a0","#aj-p-a1"].forEach(i=>$(i).addEventListener("input",ajP));ajP();
function ajC(){
  const it=+$("#aj-c-n").value,N=14;$("#aj-c-nv").textContent=it;
  let c=[1,...Array(N-1).fill(0)];for(let t=0;t<it;t++){const sq=gfMul(c,c,N);c=[1,...sq.slice(0,N-1)];}
  const ex=Array.from({length:N},(_,n)=>bC(2*n,n)/(n+1));
  let good=0;while(good<N&&c[good]===ex[good])good++;
  /* a binomiális sorból: C_n = -C(1/2,n+1)(-4)^(n+1)/2 */
  let h=rat(1),bin=[];for(let k=0;k<=N;k++){if(k>0)h=h.mul(rat(1,2).sub(rat(k-1))).div(rat(k));bin.push(h);}
  const cb=Array.from({length:N},(_,n)=>bin[n+1].mul(rat((-4)**(n+1))).neg().div(rat(2)));
  $("#aj-c-info").innerHTML=`${it}. iteráció: ${c.slice(0,10).join(", ")}, …<br>az első ${good} együttható már helyes (C<sub>n</sub> = C(2n,n)/(n+1): ${ex.slice(0,10).join(", ")}, …)<br>a (1−√(1−4x))/(2x) binomiális sorából számolt együtthatók is egyeznek ${ok(cb.every((v,n)=>v.eq(rat(ex[n]))))}`;
}
$("#aj-c-n").addEventListener("input",ajC);ajC();
