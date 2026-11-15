/* ================= 10.1 A KÖTET TÉRKÉPE ================= */
const axCh=["","Rekurziós problémák","Összegek","Egészrész-függvények","Számelmélet","Binomiális együtthatók","Speciális számok","Generátorfüggvények","Diszkrét valószínűség","Aszimptotika"];
const axE=[[1,2,"rekurzió és összeg kölcsönös átírása"],[1,7,"rekurzió megoldása hatványsorral"],[2,6,"teleszkópos összeg és perturbáció: harmonikus és Bernoulli-számok"],[2,9,"összeg közelítése integrállal (Euler–Maclaurin)"],[3,4,"egészrész és mod a számelméletben"],[4,5,"oszthatóság és paritás a binomiális együtthatókban"],[5,7,"binomiális tétel és generátorfüggvény"],[5,8,"binomiális eloszlás"],[5,9,"a C(2n,n) aszimptotikája"],[6,8,"harmonikus és Stirling-számok a valószínűségben"],[6,9,"Bernoulli-számok az Euler–Maclaurin-sorban"],[7,8,"generátorfüggvény és valószínűség-generáló függvény"],[8,9,"a kupongyűjtő aszimptotikája"]];
function axDraw(svg,sel,upto){
  const W=420,H=300,cx=W/2,cy=H/2,R=110,P=i=>[cx+R*Math.sin(2*Math.PI*(i-1)/9),cy-R*Math.cos(2*Math.PI*(i-1)/9)];
  clear(svg);svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
  axE.forEach((e,k)=>{if(upto!==undefined&&k>upto)return;const a=P(e[0]),b=P(e[1]),on=sel&&(e[0]===sel||e[1]===sel);
    el("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],style:`stroke:${on||upto!==undefined&&k===upto?"var(--accent-2)":"var(--accent)"};stroke-width:${on||upto!==undefined&&k===upto?3:1.4};opacity:${sel&&!on?.15:.75}`},svg);});
  for(let i=1;i<=9;i++){const p=P(i),on=sel===i;
    const c=el("circle",{cx:p[0],cy:p[1],r:on?17:14,style:`fill:${on?"var(--accent-2)":"var(--accent)"};opacity:.92;cursor:${sel!==undefined?"pointer":"default"}`},svg);
    const t=txt(svg,p[0],p[1]+4,i,"","middle");if(t&&t.style){t.style.fill="#fff";t.style.fontWeight="700";t.style.pointerEvents="none";}if(sel!==undefined)c.addEventListener("click",()=>{$("#ax-m-c").value=i;axM();});}
}
c2hero("osszegzes-bevezeto",700,13,fr=>{
  axDraw($("#ax-hero"),undefined,fr);const e=axE[fr];
  $("#ax-hero-a").textContent=`${fr+1}. kapcsolat`;$("#ax-hero-b").textContent=`${e[0]} → ${e[1]}`;
});
const axSel=$("#ax-m-c");for(let i=1;i<=9;i++){const o=document.createElement("option");o.value=i;o.textContent=`${i}. ${axCh[i]}`;axSel.appendChild(o);}
function axM(){
  const c=+axSel.value;axDraw($("#ax-m-svg"),c);
  const l=axE.filter(e=>e[0]===c||e[1]===c).map(e=>{const o=e[0]===c?e[1]:e[0];return `<li>${o}. ${axCh[o]}: ${e[2]}</li>`;}).join("");
  $("#ax-m-info").innerHTML=`<b>${c}. ${axCh[c]}</b> kapcsolatai (${axE.filter(e=>e[0]===c||e[1]===c).length}):<ul>${l}</ul>`;
}
axSel.addEventListener("input",axM);axM();
function axH(){
  const n=+$("#ax-h-n").value;$("#ax-h-nv").textContent=n;
  const H=hnR(n);
  let fact=1;for(let k=2;k<=n;k++)fact*=k;let sk=0;for(let k=1;k<=n;k++)sk+=k*sS1[n][k];
  const cyc=rat(sk,fact);
  let T=rat(0);for(let i=1;i<=n;i++)T=T.add(rat(n,n-i+1));const coup=T.div(rat(n));
  const C=[0];let S=0;for(let m=1;m<=n;m++){S+=C[m-1];C.push(m-1+2/m*S);}
  const qs=(C[n]+4*n)/(2*(n+1)),g=0.5772156649015329;
  const em=Math.log(n)+g+1/(2*n)-1/(12*n*n)+1/(120*n**4)-1/(252*n**6);
  const hv=H.num();
  $("#ax-h-info").innerHTML=`n = ${n}: H<sub>n</sub> = <b>${H}</b> = ${fm(+hv.toFixed(10))}<div class="tbl-wrap"><table class="vals cmp"><tr><th>forrás</th><th>érték</th><th>egyezik</th></tr>`+
   `<tr><td>ciklusok várható száma</td><td>${cyc}</td><td>${ok(cyc.eq(H))}</td></tr>`+
   `<tr><td>kupongyűjtő E[T]/n</td><td>${coup}</td><td>${ok(coup.eq(H))}</td></tr>`+
   `<tr><td>gyorsrendezés (C<sub>n</sub> + 4n)/(2(n+1))</td><td>${fm(+qs.toFixed(10))}</td><td>${ok(Math.abs(qs-hv)<1e-9)}</td></tr>`+
   `<tr><td>Euler–Maclaurin (5 tag)</td><td>${fm(+em.toFixed(10))}</td><td>hiba ${fm(+(em-hv).toExponential(2))}</td></tr></table></div>`;
}
$("#ax-h-n").addEventListener("input",axH);axH();
