/* ================= 5.5 FELADATOK ================= */
exHero("feladatokbinom-bevezeto","#ac-hero","#ac-hero-k",[3,3,2,2]);
function acFi(){
  const n=+$("#ac-f-n").value;$("#ac-f-nv").textContent=n;
  const D=m=>{let s=0;for(let k=0;2*k<=m;k++)s+=bC(m-k,k);return s;};
  const ph=(1+Math.sqrt(5))/2;let all=true;for(let m=0;m<=40;m++)if(D(m)!==abFib(m+1))all=false;
  $("#ac-f-info").innerHTML=`D<sub>${n}</sub> = ${D(n)} &nbsp;·&nbsp; F<sub>${n+1}</sub> = ${abFib(n+1)} ${ok(D(n)===abFib(n+1))}<br>D<sub>${n+1}</sub>/D<sub>${n}</sub> = ${fm(+(D(n+1)/D(n)).toFixed(9))} &nbsp;·&nbsp; φ = ${fm(+ph.toFixed(9))} &nbsp;·&nbsp; D<sub>m</sub> = F<sub>m+1</sub> minden m ≤ 40-re ${ok(all)}`;
}
$("#ac-f-n").addEventListener("input",acFi);acFi();
/* Pascal-háromszög mod 2 (pontos, nincs lebegőpontos kerekítés) */
const acRows=(()=>{const R=[[1]];for(let n=1;n<256;n++){const p=R[n-1],r=[1];for(let k=1;k<n;k++)r.push((p[k-1]+p[k])%2);r.push(1);R.push(r);}return R;})();
function acPar(){
  const n=+$("#ac-p-n").value;$("#ac-p-nv").textContent=n;
  const pc=m=>m.toString(2).replace(/0/g,"").length;
  const odd=acRows[n].reduce((a,b)=>a+b,0);let sub=0;for(let k=0;k<=n;k++)if((n&k)===k)sub++;
  const s=pc(n);let all=true;for(let m=0;m<256;m++)if(acRows[m].reduce((a,b)=>a+b,0)!==2**pc(m))all=false;
  $("#ac-p-info").innerHTML=`n = ${n} = ${n.toString(2)}<sub>2</sub>, s₂(n) = ${s}<br>páratlan elemek a ${n}. sorban: ${odd} &nbsp;·&nbsp; 2<sup>s₂(n)</sup> = ${2**s} ${ok(odd===2**s)} &nbsp;·&nbsp; k &amp; n = k feltételű k-k: ${sub} ${ok(sub===odd)}<br>minden n &lt; 256-ra igaz ${ok(all)}`;
}
$("#ac-p-n").addEventListener("input",acPar);acPar();
