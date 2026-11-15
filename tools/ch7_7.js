/* ================= 7.7 DIRICHLET-FÉLE GENERÁTORFÜGGVÉNY ================= */
const bmN=240,bmDiv=n=>{const r=[];for(let d=1;d<=n;d++)if(n%d===0)r.push(d);return r;};
const bmMu=n=>{let r=1;for(let p=2;p*p<=n;p++)if(n%p===0){n/=p;if(n%p===0)return 0;r=-r;}return n>1?-r:r;};
const bmGcd=(a,b)=>b?bmGcd(b,a%b):a;
const bmFn=[n=>n===1?1:0,n=>1,n=>n,bmMu,n=>{let c=0;for(let k=1;k<=n;k++)if(bmGcd(k,n)===1)c++;return c;},n=>bmDiv(n).length,n=>bmDiv(n).reduce((a,b)=>a+b,0)];
const bmNm=["ε","1","id","μ","φ","τ","σ"];
const bmConv=(f,g,n)=>bmDiv(n).reduce((s,d)=>s+bmFn[f](d)*bmFn[g](n/d),0);
const bmKnown={"1,1":5,"1,2":6,"1,3":0,"2,3":4,"1,4":2};
c2hero("dirichlet-bevezeto",800,12,fr=>{
  const s=c2svg("#bm-hero",420,250),N=Math.min(fr*3+6,30),w=13.2,x0=12,mx=8;
  for(let n=1;n<=30;n++){const t=bmFn[5](n),h=t/mx*170;el("rect",{x:x0+(n-1)*w+1.5,y:205-h,width:w-3,height:h,rx:2,style:`fill:var(--accent);opacity:${n<=N?.6:.14}`},s);if(n%5===0)txt(s,x0+(n-1)*w+w/2,222,n,"","middle");}
  $("#bm-hero-b").textContent=`n = ${N}: τ = ${bmFn[5](N)}`;
});
function bmD(){
  const f=+$("#bm-d-f").value,g=+$("#bm-d-g").value,N=+$("#bm-d-n").value;$("#bm-d-nv").textContent=N;
  const vals=[];for(let n=1;n<=N;n++)vals.push(bmConv(f,g,n));
  const sh=vals.slice(0,14);
  $("#bm-d-t").innerHTML="<tr><th>n</th>"+sh.map((_,i)=>`<td>${i+1}</td>`).join("")+`</tr><tr><th>(${bmNm[f]}∗${bmNm[g]})(n)</th>`+sh.map(v=>`<td>${v}</td>`).join("")+"</tr>";
  let comm=true;for(let n=1;n<=N;n++)if(bmConv(g,f,n)!==vals[n-1])comm=false;
  let mult=true,cnt=0;for(let m=2;m<=15;m++)for(let n=2;n<=15;n++)if(bmGcd(m,n)===1&&m*n<=N){cnt++;if(vals[m*n-1]!==vals[m-1]*vals[n-1])mult=false;}
  const key=[f,g].sort().join(","),k=bmKnown[f+","+g]!==undefined?bmKnown[f+","+g]:bmKnown[g+","+f];
  let known="";if(f===0||g===0){const h=f===0?g:f;known=`ε egység: ε∗${bmNm[h]} = ${bmNm[h]} ${ok(vals.every((v,i)=>v===bmFn[h](i+1)))}`;}
  else if(k!==undefined){const h=k;known=`ismert azonosság: ${bmNm[Math.min(f,g)]}∗${bmNm[Math.max(f,g)]} = ${bmNm[h]} ${ok(vals.every((v,i)=>v===bmFn[h](i+1)))}`;}
  $("#bm-d-info").innerHTML=`n ≤ ${N}: kommutatív ${ok(comm)} · multiplikatív (${cnt} relatív prím pár, mn ≤ ${N}) ${ok(mult)}`+(known?`<br>${known}`:"");
}
["#bm-d-f","#bm-d-g"].forEach(i=>$(i).addEventListener("change",bmD));$("#bm-d-n").addEventListener("input",bmD);bmD();
function bmE(){
  const s=+$("#bm-e-s").value,P=+$("#bm-e-p").value,N=+$("#bm-e-n").value;$("#bm-e-pv").textContent=P;$("#bm-e-nv").textContent=N;
  const zt={2:Math.PI**2/6,3:1.2020569031595942,4:Math.PI**4/90}[s];
  let prod=1;for(let p=2;p<=P;p++){let pr=true;for(let q=2;q*q<=p;q++)if(p%q===0){pr=false;break;}if(pr)prod*=1/(1-Math.pow(p,-s));}
  let sum=0;for(let n=1;n<=N;n++)sum+=Math.pow(n,-s);
  $("#bm-e-info").innerHTML=`ζ(${s}) ≈ ${zt.toFixed(8)}<br>∏<sub>p ≤ ${P}</sub> 1/(1−p<sup>−${s}</sup>) = ${prod.toFixed(8)}, hiba ${(zt-prod).toExponential(2)}<br>Σ<sub>n ≤ ${N}</sub> n<sup>−${s}</sup> = ${sum.toFixed(8)}, hiba ${(zt-sum).toExponential(2)}`;
}
["#bm-e-s"].forEach(i=>$(i).addEventListener("change",bmE));["#bm-e-p","#bm-e-n"].forEach(i=>$(i).addEventListener("input",bmE));bmE();
