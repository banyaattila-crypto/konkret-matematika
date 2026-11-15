/* ================= 6.4 HARMONIKUS SZÁMOK ÖSSZEGZÉSE ================= */
const bhFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const bhBin=(n,k)=>k<0||k>n||n<0?0n:bhFact(n)/(bhFact(k)*bhFact(n-k));
const bhH=n=>{let s=rat(0);for(let k=1;k<=n;k++)s=s.add(rat(1,k));return s;};
c2hero("harmosszeg-bevezeto",420,15,fr=>{
  const m=1,N=Math.min(fr+2,16),s=c2svg("#bh-hero",420,250),vals=[],forms=[];
  for(let n=1;n<=16;n++){let S=rat(0);for(let k=0;k<n;k++)S=S.add(rat(bhBin(k,m)).mul(bhH(k)));vals.push(S.num());forms.push(rat(bhBin(n,m+1)).mul(bhH(n).sub(rat(1,m+1))).num());}
  const mx=Math.max(...vals),w=22,x0=(420-16*w)/2;
  for(let n=1;n<=16;n++){const h=vals[n-1]/mx*170;el("rect",{x:x0+(n-1)*w+2,y:205-h,width:w-4,height:h,rx:2,style:`fill:var(--accent);opacity:${n<=N?.6:.14}`},s);if(n<=N)el("circle",{cx:x0+(n-1)*w+w/2,cy:205-forms[n-1]/mx*170,r:3,style:"fill:var(--text, #fff)"},s);if(n%3===1)txt(s,x0+(n-1)*w+w/2,222,n,"","middle");}
  $("#bh-hero-a").textContent="Σ k·H_k, k < n  (oszlop) · zárt alak (pont)";$("#bh-hero-b").textContent=`n = ${N}: ${fm(vals[N-1])}`;
});
function bhP(){
  const m=+$("#bh-p-m").value,n=+$("#bh-p-n").value;$("#bh-p-mv").textContent=m;$("#bh-p-nv").textContent=n;
  const ks=[],terms=[];let S=rat(0);
  for(let k=0;k<n;k++){const t=rat(bhBin(k,m)).mul(bhH(k));S=S.add(t);ks.push(k);terms.push(t);}
  const form=rat(bhBin(n,m+1)).mul(bhH(n).sub(rat(1,m+1)));
  $("#bh-p-t").innerHTML="<tr><th>k</th>"+ks.map(k=>`<td>${k}</td>`).join("")+"</tr><tr><th>H<sub>k</sub></th>"+ks.map(k=>`<td>${bhH(k)}</td>`).join("")+"</tr><tr><th>C(k,m)·H<sub>k</sub></th>"+terms.map(t=>`<td>${t}</td>`).join("")+"</tr>";
  $("#bh-p-info").innerHTML=`összeg (k < ${n}) = <b>${S}</b><br>C(n,m+1)·(H<sub>n</sub> − 1/(m+1)) = ${form} ${ok(S.eq(form))}`+(m===0?`<br>m = 0: nH<sub>n</sub> − n = ${rat(n).mul(bhH(n)).sub(rat(n))} ${ok(S.eq(rat(n).mul(bhH(n)).sub(rat(n))))}`:"");
}
["#bh-p-m","#bh-p-n"].forEach(i=>$(i).addEventListener("input",bhP));bhP();
function bhI(){
  const n=+$("#bh-i-n").value;$("#bh-i-nv").textContent=n;
  let a=rat(0),b=rat(0);const ra=[],rb=[];
  for(let k=1;k<=n;k++){const sg=k%2?1:-1,ta=rat(sg*Number(bhBin(n,k)),k),tb=rat(sg).mul(rat(bhBin(n,k))).mul(bhH(k));a=a.add(ta);b=b.add(tb);ra.push(ta);rb.push(tb);}
  $("#bh-i-t").innerHTML="<tr><th>k</th>"+ra.map((_,i)=>`<td>${i+1}</td>`).join("")+"</tr><tr><th>1. tag</th>"+ra.map(t=>`<td>${t}</td>`).join("")+"</tr><tr><th>2. tag</th>"+rb.map(t=>`<td>${t}</td>`).join("")+"</tr>";
  $("#bh-i-info").innerHTML=`1. tag: (−1)<sup>k−1</sup>C(n,k)/k; 2. tag: (−1)<sup>k−1</sup>C(n,k)H<sub>k</sub><br>Σ (−1)<sup>k−1</sup>C(n,k)/k = ${a}, H<sub>n</sub> = ${bhH(n)} ${ok(a.eq(bhH(n)))}<br>Σ (−1)<sup>k−1</sup>C(n,k)H<sub>k</sub> = ${b}, 1/n = ${rat(1,n)} ${ok(b.eq(rat(1,n)))}`;
}
$("#bh-i-n").addEventListener("input",bhI);bhI();
