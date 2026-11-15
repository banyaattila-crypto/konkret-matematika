/* ================= 9.4 ALKALMAZÁSOK ================= */
const avBin=n=>{let r=1n;for(let k=1n;k<=BigInt(n);k++)r=r*(BigInt(n)+k)/k;return r;};
const avR=n=>Number(avBin(n))/(Math.pow(4,n)/Math.sqrt(Math.PI*n));
c2hero("aszalk-bevezeto",700,12,fr=>{
  const n=fr+1,s=$("#av-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const bw=(W-40)/12,yb=k=>H-30-(avR(k)-0.85)/0.17*180;
  for(let k=1;k<=12;k++){el("rect",{x:20+(k-1)*bw+2,y:yb(k),width:bw-4,height:H-30-yb(k),rx:2,style:`fill:var(--accent);opacity:${k<=n?.85:.15}`},s);txt(s,20+(k-1)*bw+bw/2,H-12,k,"","middle");}
  el("line",{x1:20,x2:W-20,y1:H-30-0.15/0.17*180,y2:H-30-0.15/0.17*180,style:"stroke:var(--accent-2);stroke-dasharray:4 4"},s);
  $("#av-hero-a").textContent=`n = ${n}`;$("#av-hero-b").textContent=fm(+avR(n).toFixed(4));
});
function avB(){
  const n=+$("#av-b-n").value;$("#av-b-nv").textContent=n;const B=avBin(n),bs=B.toString(),ex=Number(B),a=Math.pow(4,n)/Math.sqrt(Math.PI*n);
  const rows=[["4ⁿ/√(πn)",a],["× (1 − 1/(8n))",a*(1-1/(8*n))],["× (1 − 1/(8n) + 1/(128n²))",a*(1-1/(8*n)+1/(128*n*n))]];
  const sh=bs.length>22?`${bs[0]},${bs.slice(1,7)}·10<sup>${bs.length-1}</sup>`:bs;
  $("#av-b-info").innerHTML=`n = ${n}: C(2n, n) = <b>${sh}</b><div class="tbl-wrap"><table class="vals cmp"><tr><th>közelítés</th><th>relatív hiba</th></tr>`+rows.map(r=>`<tr><td>${r[0]}</td><td>${fm(+((r[1]-ex)/ex).toExponential(3))}</td></tr>`).join("")+"</table></div>";
}
$("#av-b-n").addEventListener("input",avB);avB();
function avQ(){
  const n=+$("#av-q-n").value;$("#av-q-nv").textContent=n;
  const C=[0];let S=0;for(let m=1;m<=n;m++){S+=C[m-1];C.push(m-1+2/m*S);}
  let H=0;for(let k=1;k<=n;k++)H+=1/k;const cf=2*(n+1)*H-4*n,g=0.5772156649015329;
  const a1=2*n*Math.log(n),a2=a1+(2*g-4)*n,a3=a2+2*Math.log(n)+2*g+1;
  const rows=[["2n ln n",a1],["+ (2γ − 4)n",a2],["+ 2 ln n + 2γ + 1",a3]];
  $("#av-q-info").innerHTML=`n = ${n}: C<sub>n</sub> (rekurzióból) = <b>${fm(+C[n].toFixed(6))}</b><br>2(n+1)H<sub>n</sub> − 4n = ${fm(+cf.toFixed(6))} ${ok(Math.abs(cf-C[n])<1e-6*Math.max(1,C[n]))}<div class="tbl-wrap"><table class="vals cmp"><tr><th>közelítés</th><th>érték</th><th>hiba</th></tr>`+rows.map(r=>`<tr><td>${r[0]}</td><td>${fm(+r[1].toFixed(4))}</td><td>${fm(+(r[1]-C[n]).toFixed(4))}</td></tr>`).join("")+`</table></div>legrosszabb eset: n(n−1)/2 = ${n*(n-1)/2}`;
}
$("#av-q-n").addEventListener("input",avQ);avQ();
