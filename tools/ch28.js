/* ================= 2.8 FELADATOK ================= */
exHero("feladatokosszeg-bevezeto","#x-hero","#x-hero-k",[3,3,2,2]);
function xRe(){
  const m=+$("#x-m").value;$("#x-mv").textContent=m;
  let a=0;for(let k=1;k<=3*m;k++)a+=(k%2?1:-1)/k;
  let b=0,p=1,q=2;for(let j=0;j<m;j++){b+=1/p;p+=2;b+=1/p;p+=2;b-=1/q;q+=2;}
  const L=Math.log(2);
  $("#x-minfo").innerHTML=`az első ${3*m} tag, eredeti sorrend: ${fm(+a.toFixed(6))} (ln 2 = ${fm(+L.toFixed(6))})<br>az első ${3*m} tag, átrendezve (2 pozitív, 1 negatív): ${fm(+b.toFixed(6))} (3/2·ln 2 = ${fm(+(1.5*L).toFixed(6))}) ${ok(Math.abs(b-1.5*L)<3/m)}`;
}
$("#x-m").addEventListener("input",xRe);xRe();
function xHarm(){
  const T=+$("#x-t").value;$("#x-tv").textContent=T;
  const g=0.5772156649015329;let h=0,n=0;while(h<=T){n++;h+=1/n;}
  const est=Math.exp(T-g);
  $("#x-tinfo").innerHTML=`legkisebb n, amelyre H<sub>n</sub> &gt; ${T}: <b>${n}</b> &nbsp;·&nbsp; H<sub>${n-1}</sub> = ${fm(+(h-1/n).toFixed(6))} ≤ ${T} &lt; H<sub>${n}</sub> = ${fm(+h.toFixed(6))}<br>becslés e<sup>T−γ</sup> = ${fm(+est.toFixed(2))}, kerekítve fölfelé: ${Math.ceil(est)} ${ok(Math.abs(Math.ceil(est)-n)<=1)}`;
}
$("#x-t").addEventListener("input",xHarm);xHarm();
