/* ================= 9.4 KÉT ASZIMPTOTIKUS FOGÁS ================= */
function bpA(n){let a=1;for(let i=0;i<n;i++)a=a+1/a;return a*a-2*n-0.5*Math.log(n);}
c2hero("ketfogas-bevezeto",900,12,fr=>{
  const s=c2svg("#bp-hero",420,250),ns=[10,30,100,300,1000,3000,10000,30000,1e5,3e5,1e6,3e6],N=Math.min(fr+1,12),w=30,x0=30;
  const vals=ns.map(bpA),mx=2.1;
  ns.forEach((n,i)=>{const h=vals[i]/mx*170;el("rect",{x:x0+i*w+3,y:205-h,width:w-6,height:h,rx:2,style:`fill:var(--accent);opacity:${i<N?.6:.14}`},s);if(i%2===0)txt(s,x0+i*w+w/2,222,n>=1e4?"1e"+Math.round(Math.log10(n)):n,"","middle");});
  $("#bp-hero-b").textContent=`n = ${ns[N-1]}: ${vals[N-1].toFixed(5)}`;
});
function bpAA(){
  const e=+$("#bp-a-e").value;$("#bp-a-ev").textContent=e;
  const hd=[],vals=[];for(let k=1;k<=e;k++){hd.push(`<td>10<sup>${k}</sup></td>`);vals.push(`<td>${bpA(10**k).toFixed(5)}</td>`);}
  $("#bp-a-t").innerHTML="<tr><th>n</th>"+hd.join("")+"</tr><tr><th>a<sub>n</sub>² − 2n − ½ ln n</th>"+vals.join("")+"</tr>";
  const n=10**e,a2=(()=>{let a=1;for(let i=0;i<n;i++)a=a+1/a;return a*a;})();
  $("#bp-a-info").innerHTML=`n = 10<sup>${e}</sup>: a<sub>n</sub>² = ${a2.toFixed(4)}, 2n + ½ ln n = ${(2*n+0.5*Math.log(n)).toFixed(4)}<br>a<sub>n</sub>² ≥ 2n+1: ${ok(a2>=2*n+1)}, a<sub>n</sub>² ≤ 2n + 5/2 + ½ ln n: ${ok(a2<=2*n+2.5+0.5*Math.log(n))}`;
}
$("#bp-a-e").addEventListener("input",bpAA);bpAA();
function bpX(){
  const e=+$("#bp-x-e").value,J=+$("#bp-x-j").value;$("#bp-x-ev").textContent=e;$("#bp-x-jv").textContent=J;
  const n=10**e;let r=Math.max(n/Math.log(n),3);for(let i=0;i<200;i++){r=r-(r*Math.log(r)-n)/(Math.log(r)+1);}
  const rel=x=>((x-r)/r*100).toFixed(2)+" %";
  let x=n;const rows=[`x<sub>0</sub> = n: ${rel(x)}`];for(let j=1;j<=J;j++){x=n/Math.log(x);if(j===J||j<=3)rows.push(`x<sub>${j}</sub>: ${rel(x)}`);}
  const l=Math.log(n),ll=Math.log(l);
  $("#bp-x-info").innerHTML=`n = 10<sup>${e}</sup>, gyök (Newton) = ${r.toPrecision(8)}, ellenőrzés x·ln x = ${(r*Math.log(r)).toPrecision(8)} ${ok(Math.abs(r*Math.log(r)/n-1)<1e-9)}<br>iteráció x<sub>j+1</sub> = n/ln x<sub>j</sub>: ${rows.join(" · ")}<br>n/ln n: ${rel(n/l)} · n/(ln n − ln ln n): ${rel(n/(l-ll))} · (n/ln n)(1+ln ln n/ln n): ${rel(n/l*(1+ll/l))}`;
}
["#bp-x-e","#bp-x-j"].forEach(i=>$(i).addEventListener("input",bpX));bpX();
function bpT(){
  const n=+$("#bp-t-n").value;$("#bp-t-nv").textContent=n;
  let S=rat(0),c=1n;for(let k=0;k<=n;k++){S=S.add(rat(1n,c));c=c*BigInt(n-k)/BigInt(k+1);}
  const d=S.sub(rat(2)).sub(rat(2,n)),lo=rat(4,n*(n-1)),hi=lo.add(rat(6*(n-5),n*(n-1)*(n-2)));
  const geq=(a,b)=>a.sub(b).num()>=0n;
  $("#bp-t-info").innerHTML=`S<sub>n</sub> = Σ 1/C(n,k) ${n<=20?"= "+S+" ":""}≈ ${Number(S.num()).toPrecision(8)}<br>alsó korlát 4/(n(n−1)) ≤ S<sub>n</sub> − 2 − 2/n ≤ felső korlát: ${ok(geq(d,lo)&&geq(hi,d))}<br>n²(S<sub>n</sub> − 2 − 2/n) = ${(n*n*Number(d.num())).toFixed(4)}`;
}
$("#bp-t-n").addEventListener("input",bpT);bpT();
