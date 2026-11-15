/* ================= 4.10 FELADATOK ================= */
exHero("feladatokszam-bevezeto","#v-hero","#v-hero-k",[3,3,2,2]);
function vTri(){
  const N=+$("#v-t-n").value;$("#v-t-nv").textContent=N;
  let b=0;for(let x=1;x<=N;x++)for(let y=1;y<=N;y++){const g=kGcd(x,y);for(let z=1;z<=N;z++)if(kGcd(g,z)===1)b++;}
  const mu=nMu(N);let m=0;for(let d=1;d<=N;d++)m+=mu[d]*Math.floor(N/d)**3;
  let z3=0;for(let k=1;k<=200000;k++)z3+=1/(k*k*k);
  $("#v-t-info").innerHTML=`gcd(a,b,c) = 1 hármasok: ${b} / ${N**3} = ${fm(+(b/N**3).toFixed(5))}<br>Σ μ(d)⌊N/d⌋³ = ${m} ${ok(b===m)} &nbsp;·&nbsp; 1/ζ(3) = ${fm(+(1/z3).toFixed(5))}`;
}
$("#v-t-n").addEventListener("input",vTri);vTri();
function vCar(){
  const N=+$("#v-c-n").value;$("#v-c-nv").textContent=N;const sv=lSieve(N),ps=[],car=[];
  for(let n=3;n<=N;n+=2){if(sv[n])continue;if(oPow(2,n-1,n)===1)ps.push(n);
    const f=lFactor(n);if(f.length>=2&&f.every(([p,e])=>e===1&&(n-1)%(p-1)===0))car.push(n);}
  let allOk=true;car.forEach(n=>{for(let a=2;a<n;a++)if(kGcd(a,n)===1&&oPow(a,n-1,n)!==1){allOk=false;break;}});
  $("#v-c-info").innerHTML=`összetett n ≤ ${N}, amelyre 2<sup>n−1</sup> ≡ 1: ${ps.length} db${ps.length?` (${ps.slice(0,10).join(", ")}${ps.length>10?", …":""})`:""}<br>Carmichael-számok (Korselt): ${car.join(", ")||"nincs"} &nbsp;·&nbsp; mindegyikre minden hozzá relatív prím alapra a<sup>n−1</sup> ≡ 1 ${car.length?ok(allOk):""}`;
}
$("#v-c-n").addEventListener("input",vCar);vCar();
