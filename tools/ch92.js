/* ================= 9.2 AZ O ALGEBRÁJA ÉS A STIRLING-FORMULA ================= */
const atFactB=n=>{let f=1n;for(let k=2n;k<=BigInt(n);k++)f*=k;return f;};
const atLF=n=>{let t=0;for(let k=2;k<=n;k++)t+=Math.log(k);return t;};
const atStirLn=n=>n*Math.log(n)-n+.5*Math.log(2*Math.PI*n);
c2hero("stirfej-bevezeto",700,12,fr=>{
  const n=fr+1,s=$("#at-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const R=k=>Math.exp(atLF(k)-atStirLn(k));const bw=(W-40)/12;
  const y1=H-30-(1-0.99)*0,yb=k=>H-30-(R(k)-1)/0.09*180;
  for(let k=1;k<=12;k++){el("rect",{x:20+(k-1)*bw+2,y:yb(k),width:bw-4,height:H-30-yb(k),rx:2,style:`fill:var(--accent);opacity:${k<=n?.85:.15}`},s);txt(s,20+(k-1)*bw+bw/2,H-12,k,"","middle");}
  el("line",{x1:20,x2:W-20,y1:H-30,y2:H-30,style:"stroke:var(--accent-2)"},s);
  $("#at-hero-a").textContent=`n = ${n}`;$("#at-hero-b").textContent=fm(+R(n).toFixed(4));
});
function atA(){
  const n=+$("#at-a-n").value;$("#at-a-nv").textContent=n;const ex=Math.pow(1+1/n,n);
  const a0=Math.E,a1=Math.E*(1-1/(2*n)),a2=Math.E*(1-1/(2*n)+11/(24*n*n));
  const row=(l,a,pred)=>`<tr><td>${l}</td><td>${fm(+a.toFixed(8))}</td><td>${fm(+(a-ex).toExponential(3))}</td><td>${pred}</td></tr>`;
  $("#at-a-info").innerHTML=`n = ${n}: (1 + 1/n)<sup>n</sup> = <b>${fm(+ex.toFixed(8))}</b><div class="tbl-wrap"><table class="vals cmp"><tr><th>közelítés</th><th>érték</th><th>hiba</th><th>várt nagyságrend</th></tr>`+
   row("e",a0,"≈ e/(2n) = "+fm(+(Math.E/(2*n)).toExponential(2)))+row("e(1 − 1/(2n))",a1,"≈ 11e/(24n²) = "+fm(+(11*Math.E/(24*n*n)).toExponential(2)))+row("e(1 − 1/(2n) + 11/(24n²))",a2,"O(n⁻³) ≈ "+fm(+(1/n**3).toExponential(2)))+"</table></div>";
}
$("#at-a-n").addEventListener("input",atA);atA();
function atS(){
  const n=+$("#at-s-n").value;$("#at-s-nv").textContent=n;const F=atFactB(n),fs=F.toString();
  const ex=fs.length>22?`${fs[0]},${fs.slice(1,7)}·10<sup>${fs.length-1}</sup>`:fs;
  const lf=atLF(n),R=Math.exp(lf-atStirLn(n));
  const c0=1,c1=1+1/(12*n),c2=1+1/(12*n)+1/(288*n*n);
  const er=(c)=>fm(+((1/(R/c))-1).toExponential(3));
  $("#at-s-info").innerHTML=`n = ${n}: n! = <b>${ex}</b> (${fs.length} jegy)<br>n! / (√(2πn)(n/e)<sup>n</sup>) = <b>${fm(+R.toFixed(8))}</b><div class="tbl-wrap"><table class="vals cmp"><tr><th>korrekciós tagok</th><th>(közelítés − n!) / n!</th></tr><tr><td>0</td><td>${er(c0)}</td></tr><tr><td>1 (1/(12n))</td><td>${er(c1)}</td></tr><tr><td>2 (+1/(288n²))</td><td>${er(c2)}</td></tr></table></div>`;
}
$("#at-s-n").addEventListener("input",atS);atS();
