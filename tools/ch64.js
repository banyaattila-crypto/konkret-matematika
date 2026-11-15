/* ================= 6.4 BERNOULLI-SZÁMOK ================= */
const bnB=(()=>{const B=[rat(1)];for(let m=1;m<=24;m++){let s=rat(0);for(let k=0;k<m;k++)s=s.add(B[k].mul(rat(bC(m+1,k))));B.push(s.neg().div(rat(m+1)));}return B;})();
c2hero("bernoulli-bevezeto",900,13,fr=>{
  const s=$("#ag-hero"),W=420,H=250,m=fr,bw=(W-40)/13;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  el("line",{x1:20,x2:W-20,y1:H/2,y2:H/2,style:"stroke:var(--line)"},s);
  for(let k=0;k<=12;k++){const v=bnB[k].num(),h=Math.sign(v)*Math.min(100,Math.sqrt(Math.abs(v))*110),on=k<=m,x=20+k*bw;
    if(v!==0)el("rect",{x:x+2,y:h>0?H/2-h:H/2,width:bw-4,height:Math.abs(h),rx:3,style:`fill:${v>0?"var(--accent)":"var(--accent-2)"};opacity:${on?.85:.12}`},s);txt(s,x+bw/2,H-10,k,"");}
  $("#ag-hero-a").textContent="m = "+m;$("#ag-hero-b").textContent=bnB[m].toString();
});
function agH(){
  const p=+$("#ag-h-p").value,n=+$("#ag-h-n").value;$("#ag-h-pv").textContent=p;$("#ag-h-nv").textContent=n;
  const N=BigInt(n);let dir=0n;for(let k=1n;k<=N;k++)dir+=k**BigInt(p);
  /* Stirling: sum_{k=0}^{n} k^p, azaz N'=n+1 */
  const M=n+1;let st=rat(0);for(let j=1;j<=p;j++){let f=1n;for(let i=0;i<=j;i++)f*=BigInt(M-i);st=st.add(rat(BigInt(sS2[p][j])*f,j+1));}
  let fa=rat(0);for(let j=0;j<=p;j++){fa=fa.add(bnB[j].mul(rat(bC(p+1,j))).mul(rat(BigInt(M)**BigInt(p+1-j))));}fa=fa.div(rat(p+1));
  const e1=st.eq(rat(dir)),e2=fa.eq(rat(dir));
  $("#ag-h-info").innerHTML=`Σ<sub>k=1…${n}</sub> k<sup>${p}</sup> közvetlenül: <b>${dir}</b><br>Stirling-szám alapú összegzés: ${st} ${ok(e1)}<br>Faulhaber (Bernoulli-számok): ${fa} ${ok(e2)}`;
}
["#ag-h-p","#ag-h-n"].forEach(i=>$(i).addEventListener("input",agH));agH();
function agS(){
  const m=+$("#ag-s-m").value;$("#ag-s-mv").textContent=m;let h="<tr><th>j</th><th>B<sub>j</sub></th><th>Σ C(j+1,k)·B<sub>k</sub></th></tr>",all=true;
  for(let j=0;j<=m;j++){let s=rat(0);if(j>=1){for(let k=0;k<=j;k++)s=s.add(rat(bC(j+1,k)).mul(bnB[k]));if(s.n!==0n)all=false;}
    h+=`<tr><td>${j}</td><td>${bnB[j]}</td><td>${j?s:"–"}</td></tr>`;}
  $("#ag-s-tb").innerHTML=h;
  const x=0.5;let ser=0;for(let k=0;k<=24;k++){let f=1;for(let i=2;i<=k;i++)f*=i;ser+=bnB[k].num()*x**k/f;}
  const ex=x/(Math.exp(x)-1);
  $("#ag-s-info").innerHTML=`a rekurzió minden m ≤ ${m}-re 0-t ad ${ok(all)}<br>x = 0,5: ΣB<sub>n</sub>xⁿ/n! = ${(+ser.toFixed(10)).toString().replace(".",",")} és x/(eˣ−1) = ${(+ex.toFixed(10)).toString().replace(".",",")} ${ok(Math.abs(ser-ex)<1e-10)}`;
}
$("#ag-s-m").addEventListener("input",agS);agS();
