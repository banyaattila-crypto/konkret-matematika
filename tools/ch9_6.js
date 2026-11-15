/* ================= 9.6 VÉGES ÖSSZEGZÉS ================= */
const bqZ2=Math.PI*Math.PI/6,bqZm=-0.2078862249773545,bqZh=-1.4603545088095868;
const bqH2=n=>{let s=0;for(let k=n;k>=1;k--)s+=1/(k*k);return s;};
c2hero("aszveges-bevezeto",800,10,fr=>{
  const s=c2svg("#bq-hero",420,250),N=Math.min(fr+1,10),ns=[1,2,3,4,5,6,8,10,15,20],w=34,x0=40;
  ns.forEach((n,i)=>{const v=n*(bqZ2-bqH2(n)),h=v*170;el("rect",{x:x0+i*w+3,y:205-h,width:w-6,height:h,rx:2,style:`fill:var(--accent);opacity:${i<N?.6:.14}`},s);txt(s,x0+i*w+w/2,222,n,"","middle");});
  el("line",{x1:x0,x2:x0+10*w,y1:205-170,y2:205-170,style:"stroke:var(--accent);stroke-dasharray:4 4;opacity:.7"},s);
  const n=ns[N-1];$("#bq-hero-b").textContent=`n = ${n}: ${(n*(bqZ2-bqH2(n))).toFixed(5)}`;
});
function bqK(){
  const n=+$("#bq-k-n").value;$("#bq-k-nv").textContent=n;
  const t=bqZ2-bqH2(n);
  const m=Math.min(n,40);let S=rat(0);for(let k=1;k<=m;k++)S=S.add(rat(k,2n**BigInt(k)));
  const ex=rat(2).sub(rat(m+2,2n**BigInt(m)));
  $("#bq-k-info").innerHTML=`ζ(2) − Σ<sub>k≤${n}</sub> 1/k² = ${t.toExponential(5)}<br>1/(n+1) = ${(1/(n+1)).toExponential(5)} ≤ farok ≤ 1/n = ${(1/n).toExponential(5)}: ${ok(t>=1/(n+1)-1e-12&&t<=1/n+1e-12)}<br>n·farok = ${(n*t).toFixed(5)}<br>Σ<sub>k≤${m}</sub> k·2<sup>−k</sup> = 2 − (${m}+2)·2<sup>−${m}</sup>: ${ok(S.eq(ex))}, farok = ${((m+2)/2**m).toExponential(3)}`;
}
$("#bq-k-n").addEventListener("input",bqK);bqK();
function bqD(){
  const e=+$("#bq-d-e").value,n=10**e;$("#bq-d-ev").textContent=e;
  let s1=0,s2=0;for(let k=n;k>=1;k--){s1+=Math.sqrt(k);s2+=1/Math.sqrt(k);}
  const D1=s1-(2/3)*n**1.5-0.5*Math.sqrt(n),D2=s2-2*Math.sqrt(n)-0.5/Math.sqrt(n);
  const r1=(D1-bqZm)*Math.sqrt(n);
  $("#bq-d-info").innerHTML=`n = 10<sup>${e}</sup><br>Σ√k − ⅔n<sup>3/2</sup> − ½√n = ${D1.toFixed(7)}, ζ(−½) ≈ ${bqZm.toFixed(7)}, √n·különbség = ${r1.toFixed(5)} (1/24 = ${(1/24).toFixed(5)}) ${ok(Math.abs(r1*24-1)<0.01)}<br>Σ1/√k − 2√n − ½/√n = ${D2.toFixed(7)}, ζ(½) ≈ ${bqZh.toFixed(7)}, különbség = ${(D2-bqZh).toExponential(2)}`;
}
$("#bq-d-e").addEventListener("input",bqD);bqD();
