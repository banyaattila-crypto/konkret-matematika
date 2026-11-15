/* ================= 8.7 FELADATOK ================= */
exHero("feladatokval-bevezeto","#ar-hero","#ar-hero-k",[3,3,2,2]);
function arN(){
  const n=+$("#ar-n-n").value;$("#ar-n-nv").textContent=n;
  let d=[1];for(let t=0;t<n;t++){const e=Array(d.length+6).fill(0);d.forEach((v,i)=>{for(let f=1;f<=6;f++)e[i+f]+=v/6;});d=e;}
  const mu=3.5*n,sg=Math.sqrt(35/12*n);let pin=0,tot=0;d.forEach((v,k)=>{tot+=v;if(Math.abs(k-mu)<=sg)pin+=v;});
  $("#ar-n-info").innerHTML=`n = ${n}: μ = ${fm(mu)}, σ = ${fm(+sg.toFixed(4))}<br>P(|S − μ| ≤ σ) = <b>${fm(+pin.toFixed(4))}</b> &nbsp;·&nbsp; normális eloszlás ±1σ: 0,6827<br>az eloszlás összege = ${fm(+tot.toFixed(10))} ${ok(Math.abs(tot-1)<1e-9)}`;
}
$("#ar-n-n").addEventListener("input",arN);arN();
function arK(){
  const e=+$("#ar-k-e").value,n=10**e;$("#ar-k-ev").textContent=e;let h=0,h2=0;for(let k=n;k>=1;k--){h+=1/k;h2+=1/(k*k);}
  const sd=Math.sqrt(n*n*h2-n*h)/n;
  $("#ar-k-info").innerHTML=`n = 10<sup>${e}</sup>: E[T]/(n ln n) = ${fm(+(h/Math.log(n)).toFixed(5))} &nbsp;·&nbsp; 1 + γ/ln n = ${fm(+(1+0.5772156649/Math.log(n)).toFixed(5))}<br>σ/n = ${fm(+sd.toFixed(5))} &nbsp;·&nbsp; π/√6 = ${fm(+(Math.PI/Math.sqrt(6)).toFixed(5))} (eltérés: ${fm(+(sd-Math.PI/Math.sqrt(6)).toFixed(5))})`;
}
$("#ar-k-e").addEventListener("input",arK);arK();
