/* ================= 9.3 EULER–MACLAURIN ================= */
const auG=0.5772156649015329;
c2hero("eulermac-bevezeto",700,12,fr=>{
  const n=fr+1,s=$("#au-hero"),W=420,H=250,B=H-26,X=x=>24+(x-1)/11.2*(W-48),Y=v=>B-v*(B-16);
  clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let k=1;k<=12;k++)el("rect",{x:X(k),y:Y(1/k),width:X(k+1)-X(k)-1,height:B-Y(1/k),style:`fill:var(--accent);opacity:${k<=n?.5:.12}`},s);
  let d="";for(let x=1;x<=13;x+=.1)d+=(x>1?"L":"M")+X(x)+" "+Y(1/x);
  el("path",{d,style:"fill:none;stroke:var(--accent-2);stroke-width:2.2"},s);
  let h=0;for(let k=1;k<=n;k++)h+=1/k;
  $("#au-hero-a").textContent=`n = ${n}`;$("#au-hero-b").textContent=fm(+(h-Math.log(n)).toFixed(4));
});
const auH=n=>{let h=0;for(let k=n;k>=1;k--)h+=1/k;return h;};
function auT(){
  const n=+$("#au-t-n").value;$("#au-t-nv").textContent=n;const S=auH(n),I=Math.log(n),T=I+(1+1/n)/2,T2=T+(1/12)*(-1/(n*n)+1);
  const r=(l,v)=>`<tr><td>${l}</td><td>${fm(+v.toFixed(8))}</td><td>${fm(+(v-S).toExponential(3))}</td></tr>`;
  $("#au-t-info").innerHTML=`n = ${n}, f = 1/x: Σ f(k) = H<sub>n</sub> = <b>${fm(+S.toFixed(8))}</b><div class="tbl-wrap"><table class="vals cmp"><tr><th>közelítés</th><th>érték</th><th>hiba</th></tr>`+r("∫₁ⁿ f",I)+r("+ (f(1)+f(n))/2",T)+r("+ (f′(n) − f′(1))/12",T2)+"</table></div>";
}
$("#au-t-n").addEventListener("input",auT);auT();
const auDefs=[
 {nm:"H(n)",ex:n=>auH(n),base:n=>Math.log(n)+auG,tr:[n=>1/(2*n),n=>-1/(12*n**2),n=>1/(120*n**4),n=>-1/(252*n**6)],lab:["ln n + γ","+ 1/(2n)","− 1/(12n²)","+ 1/(120n⁴)","− 1/(252n⁶)"]},
 {nm:"ln n!",ex:n=>{let t=0;for(let k=2;k<=n;k++)t+=Math.log(k);return t;},base:n=>n*Math.log(n)-n+.5*Math.log(2*Math.PI*n),tr:[n=>1/(12*n),n=>-1/(360*n**3),n=>1/(1260*n**5),n=>-1/(1680*n**7)],lab:["n ln n − n + ½ ln(2πn)","+ 1/(12n)","− 1/(360n³)","+ 1/(1260n⁵)","− 1/(1680n⁷)"]},
 {nm:"Σ 1/k²",ex:n=>{let t=0;for(let k=n;k>=1;k--)t+=1/(k*k);return t;},base:n=>Math.PI**2/6,tr:[n=>-1/n,n=>1/(2*n**2),n=>-1/(6*n**3),n=>1/(30*n**5)],lab:["π²/6","− 1/n","+ 1/(2n²)","− 1/(6n³)","+ 1/(30n⁵)"]},
];
function auE(){
  const d=auDefs[+$("#au-e-f").value],n=+$("#au-e-n").value;$("#au-e-nv").textContent=n;
  const S=d.ex(n);let a=d.base(n),rows=`<tr><td>${d.lab[0]}</td><td>${fm(+a.toFixed(12))}</td><td>${fm(+(a-S).toExponential(3))}</td></tr>`;
  d.tr.forEach((t,i)=>{a+=t(n);rows+=`<tr><td>${d.lab[i+1]}</td><td>${fm(+a.toFixed(12))}</td><td>${fm(+(a-S).toExponential(3))}</td></tr>`;});
  $("#au-e-info").innerHTML=`n = ${n}: ${d.nm} = <b>${fm(+S.toFixed(12))}</b> (közvetlen összegezés)<div class="tbl-wrap"><table class="vals cmp"><tr><th>új tag</th><th>közelítés</th><th>hiba</th></tr>${rows}</table></div>`;
}
$("#au-e-f").addEventListener("input",auE);$("#au-e-n").addEventListener("input",auE);auE();
