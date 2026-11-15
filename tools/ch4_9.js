/* ================= 4.9 FI ÉS MŰ ================= */
const bbGcd=(a,b)=>b?bbGcd(b,a%b):a;
const bbFac=n=>{const f=[];for(let p=2;p*p<=n;p++){if(n%p===0){let e=0;while(n%p===0){n/=p;e++;}f.push([p,e]);}}if(n>1)f.push([n,1]);return f;};
const bbPhi=n=>{let c=0;for(let k=1;k<=n;k++)if(bbGcd(k,n)===1)c++;return c;};
const bbPhiF=n=>bbFac(n).reduce((t,[p])=>t/p*(p-1),n);
const bbMu=n=>{const f=bbFac(n);return f.some(([,e])=>e>1)?0:(f.length%2?-1:1);};
const bbDiv=n=>{const d=[];for(let k=1;k<=n;k++)if(n%k===0)d.push(k);return d;};
const bbPrime=n=>n>1&&bbFac(n).length===1&&bbFac(n)[0][1]===1;
c2hero("fimu-bevezeto",330,40,fr=>{
  const s=c2svg("#bb-hero",420,250),N=40,k=Math.min(fr+1,N),x0=18,w=(420-2*x0)/N,base=220,sc=170/N;
  for(let n=1;n<=k;n++){const v=bbPhi(n),pr=bbPrime(n),h=v*sc;
    el("rect",{x:x0+(n-1)*w+1,y:base-h,width:w-2,height:h,rx:2,style:`fill:${pr?"var(--accent)":"var(--muted, #888)"};opacity:${pr?.75:.35}`},s);
    if(n===k)el("rect",{x:x0+(n-1)*w+1,y:base-n*sc,width:w-2,height:n*sc,rx:2,style:"fill:none;stroke:var(--line);stroke-dasharray:2 2"},s);}
  el("line",{x1:x0,y1:base,x2:420-x0,y2:base,style:"stroke:var(--line)"},s);
  txt(s,210,240,"n = 1 … 40 · kiemelt: prímek (φ = n−1)","","middle");
  $("#bb-hero-a").textContent="φ(n), n = 1…40";$("#bb-hero-b").textContent=`φ(${k}) = ${bbPhi(k)}${bbPrime(k)?" (prím)":""}`;
});
function bbF(){
  const n=+$("#bb-f-n").value;$("#bb-f-nv").textContent=n;
  const ds=bbDiv(n),fs=bbFac(n),sum=ds.reduce((t,d)=>t+bbPhi(d),0),cnt=bbPhi(n),form=bbPhiF(n);
  $("#bb-f-t").innerHTML="<tr><th>d</th>"+ds.map(d=>`<td>${d}</td>`).join("")+"</tr><tr><th>φ(d)</th>"+ds.map(d=>`<td>${bbPhi(d)}</td>`).join("")+"</tr>";
  $("#bb-f-info").innerHTML=`n = ${n===1?1:fs.map(([p,e])=>e>1?`${p}<sup>${e}</sup>`:p).join(" · ")}<br>φ(n) számlálással: <b>${cnt}</b> &nbsp;·&nbsp; szorzat-formulával: ${form} ${ok(cnt===form)} &nbsp;·&nbsp; Σ<sub>d|n</sub> φ(d) = ${sum} ${ok(sum===n)}`;
}
$("#bb-f-n").addEventListener("input",bbF);bbF();
function bbM(){
  const n=+$("#bb-m-n").value;$("#bb-m-nv").textContent=n;
  const ds=bbDiv(n),sum=ds.reduce((t,d)=>t+bbMu(d),0),fs=bbFac(n),sf=fs.some(([,e])=>e>1);
  $("#bb-m-t").innerHTML="<tr><th>d</th>"+ds.map(d=>`<td>${d}</td>`).join("")+"</tr><tr><th>μ(d)</th>"+ds.map(d=>`<td>${bbMu(d)}</td>`).join("")+"</tr>";
  $("#bb-m-info").innerHTML=`μ(${n}) = <b>${bbMu(n)}</b> (${n===1?"1":sf?"prímnégyzettel osztható":fs.length+" különböző prím"}) &nbsp;·&nbsp; Σ<sub>d|n</sub> μ(d) = ${sum} ${ok(sum===(n===1?1:0))}`;
}
$("#bb-m-n").addEventListener("input",bbM);bbM();
function bbI(){
  const kind=$("#bb-i-f").value,n=+$("#bb-i-n").value;$("#bb-i-nv").textContent=n;
  const f=m=>kind==="phi"?bbPhi(m):kind==="sq"?m*m:kind==="p"?(bbPrime(m)?1:0):(m%2===0?m:-1);
  const g=m=>bbDiv(m).reduce((t,d)=>t+f(d),0),ds=bbDiv(n);
  const inv=ds.reduce((t,d)=>t+bbMu(n/d)*g(d),0);
  $("#bb-i-t").innerHTML="<tr><th>d</th>"+ds.map(d=>`<td>${d}</td>`).join("")+"</tr><tr><th>μ(n/d)</th>"+ds.map(d=>`<td>${bbMu(n/d)}</td>`).join("")+"</tr><tr><th>g(d)</th>"+ds.map(d=>`<td>${g(d)}</td>`).join("")+"</tr>";
  let all=true;for(let m=1;m<=200&&all;m++){if(bbDiv(m).reduce((t,d)=>t+bbMu(m/d)*g(d),0)!==f(m))all=false;}
  $("#bb-i-info").innerHTML=`g(${n}) = Σ f(d) = ${g(n)}<br>f(${n}) = Σ μ(n/d)·g(d) = <b>${inv}</b>, közvetlenül: ${f(n)} ${ok(inv===f(n))} &nbsp;·&nbsp; minden m ≤ 200-ra ${ok(all)}`;
}
$("#bb-i-f").addEventListener("change",bbI);$("#bb-i-n").addEventListener("input",bbI);bbI();
function bbA(){
  const n=+$("#bb-a-n").value,N=+$("#bb-a-N").value;$("#bb-a-nv").textContent=n;$("#bb-a-Nv").textContent=N;
  let brute=0;for(let x=0;x<(1<<n);x++){let per=false;for(let d=1;d<n&&!per;d++)if(n%d===0){let same=true;for(let i=0;i<n;i++){if(((x>>i)&1)!==((x>>((i+d)%n))&1)){same=false;break;}}if(same)per=true;}if(!per)brute++;}
  const form=bbDiv(n).reduce((t,d)=>t+bbMu(d)*2**(n/d),0);
  let cp=0;for(let a=1;a<=N;a++)for(let b=1;b<=N;b++)if(bbGcd(a,b)===1)cp++;
  let fm=0;for(let d=1;d<=N;d++)fm+=bbMu(d)*Math.floor(N/d)**2;
  $("#bb-a-info").innerHTML=`aperiodikus ${n} hosszú 0–1 sorozatok: Σ μ(d)·2<sup>n/d</sup> = <b>${form}</b>, brute force: ${brute} ${ok(form===brute)} (az összes: ${2**n})<br>relatív prím párok 1…${N}-ben: Σ μ(d)⌊N/d⌋² = <b>${fm}</b>, számlálva: ${cp} ${ok(fm===cp)} &nbsp;·&nbsp; arány ${(cp/(N*N)).toFixed(4).replace(".",",")} (6/π² ≈ 0,6079)`;
}
["#bb-a-n","#bb-a-N"].forEach(i=>$(i).addEventListener("input",bbA));bbA();
