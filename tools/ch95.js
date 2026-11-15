/* ================= 9.5 FELADATOK ================= */
exHero("feladatokasz-bevezeto","#aw-hero","#aw-hero-k",[3,3,2,2]);
function awC(){
  const k=+$("#aw-c-k").value;$("#aw-c-kv").textContent=k;
  const K=BigInt(k);let last=1;for(let m=2;m<=4000;m++){if((1n<<BigInt(m))<=BigInt(m)**K)last=m;}
  const n0=last+1;let x=4*k;const tr=[x];for(let j=0;j<60;j++){x=k*Math.log2(x);if(j<4)tr.push(x);}
  const ok1=Math.floor(x+1e-9)+1===n0;
  $("#aw-c-info").innerHTML=`k = ${k}: n<sub>0</sub>(k) = <b>${n0}</b> (BigInt: 2<sup>n</sup> ≤ n<sup>k</sup> utoljára n = ${last}-nál)<br>iteráció x<sub>j+1</sub> = k·log₂ x<sub>j</sub>, x<sub>0</sub> = 4k: ${tr.map(v=>fm(+v.toFixed(2))).join(" → ")} → … → <b>${fm(+x.toFixed(3))}</b><br>⌊x*⌋ + 1 = ${Math.floor(x+1e-9)+1} ${ok(ok1)} &nbsp;·&nbsp; k·log₂k = ${fm(+(k*Math.log2(k)).toFixed(2))} &nbsp;·&nbsp; n<sub>0</sub>/(k·log₂k) = ${fm(+(n0/(k*Math.log2(k))).toFixed(3))}`;
}
$("#aw-c-k").addEventListener("input",awC);awC();
function awS(){
  const n=+$("#aw-s-n").value;$("#aw-s-nv").textContent=n;let lf=0;for(let k=2;k<=n;k++)lf+=Math.log(k);
  const e=lf-(n*Math.log(n)-n+.5*Math.log(2*Math.PI*n)),v=n*e;
  $("#aw-s-info").innerHTML=`n = ${n}: n·(ln n! − n ln n + n − ½ ln 2πn) = <b>${fm(+v.toFixed(10))}</b><br>1/12 − érték = ${fm(+(1/12-v).toExponential(3))} &nbsp;·&nbsp; 1/(360n²) = ${fm(+(1/(360*n*n)).toExponential(3))}`;
}
$("#aw-s-n").addEventListener("input",awS);awS();
