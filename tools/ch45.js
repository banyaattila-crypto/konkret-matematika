/* ================= 4.5 KONGRUENCIÁK ================= */
const oInv=(a,m)=>{const r=kXgcd(a%m,m);return r.g===1?((r.x%m)+m)%m:null;};
const oPow=(a,e,m)=>{let r=1%m,b=a%m;while(e>0){if(e&1)r=r*b%m;b=b*b%m;e=Math.floor(e/2);}return r;};
function oPhi(m){let c=0;for(let k=1;k<=m;k++)if(kGcd(k,m)===1)c++;return c;}
c2hero("kongruencia-bevezeto",1000,6,fr=>{
  const s=$("#o-hero"),W=420,H=250,m=60,a=2+Math.min(fr,5),cx=210,cy=125,R=108;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const P=k=>[cx+R*Math.cos(2*Math.PI*k/m-Math.PI/2),cy+R*Math.sin(2*Math.PI*k/m-Math.PI/2)];
  el("circle",{cx,cy,r:R,style:"fill:none;stroke:var(--line)"},s);
  for(let k=0;k<m;k++){const p=P(k),q=P(a*k%m);el("line",{x1:p[0].toFixed(1),y1:p[1].toFixed(1),x2:q[0].toFixed(1),y2:q[1].toFixed(1),style:"stroke:var(--accent);stroke-width:1;opacity:.55"},s);}
  for(let k=0;k<m;k++){const p=P(k);el("circle",{cx:p[0].toFixed(1),cy:p[1].toFixed(1),r:2.2,style:"fill:var(--accent-2)"},s);}
  $("#o-hero-a").textContent="a = "+a;
});
/* --- §1 --- */
function oSz(){
  const m=+$("#o-s-m").value;$("#o-s-mv").textContent=m;let h="",u=0,okAll=true;
  for(let a=1;a<m;a++){const v=oInv(a,m);if(v!==null){u++;if(a*v%m!==1%m)okAll=false;}
    h+=`<span class="jc${v!==null?" dr":""}"><i>${a}</i>${v!==null?v:"–"}</span>`;}
  $("#o-s-t").innerHTML=h;
  $("#o-s-info").innerHTML=`invertálható maradékok (1…${m-1}): ${u+(m===1?1:0)} &nbsp;·&nbsp; φ(${m}) = ${oPhi(m)} ${ok(u===oPhi(m))} &nbsp;·&nbsp; minden inverzre a·a′ ≡ 1 (mod ${m}) ${ok(okAll)}`;
}
$("#o-s-m").addEventListener("input",oSz);oSz();
/* --- §2 CRT --- */
function oCrtSet(){const ms=$("#o-k-p").value.split(",").map(Number);[1,2,3].forEach((i,j)=>{const e=$("#o-k-"+i);e.max=ms[j]-1;if(+e.value>ms[j]-1)e.value=ms[j]-1;});}
function oKi(){
  const ms=$("#o-k-p").value.split(",").map(Number),rs=[1,2,3].map(i=>+$("#o-k-"+i).value);
  [1,2,3].forEach(i=>$("#o-k-"+i+"v").textContent=$("#o-k-"+i).value);
  const M=ms.reduce((a,b)=>a*b,1);let x=0,h="<tr><th>i</th><th>mᵢ</th><th>rᵢ</th><th>Mᵢ = M/mᵢ</th><th>yᵢ</th><th>rᵢ·Mᵢ·yᵢ</th></tr>";
  ms.forEach((m,i)=>{const Mi=M/m,y=oInv(Mi%m,m),t=rs[i]*Mi*y;x+=t;h+=`<tr><td>${i+1}</td><td>${m}</td><td>${rs[i]}</td><td>${Mi}</td><td>${y}</td><td>${t}</td></tr>`;});
  x%=M;$("#o-k-t").innerHTML=h;
  let cnt=0;for(let k=0;k<M;k++)if(ms.every((m,i)=>k%m===rs[i]))cnt++;
  $("#o-k-info").innerHTML=`M = ${ms.join("·")} = ${M} &nbsp;·&nbsp; x = ${x} (mod ${M})<br>ellenőrzés: ${ms.map((m,i)=>`${x} mod ${m} = ${x%m}`).join(", ")} ${ok(ms.every((m,i)=>x%m===rs[i]))} &nbsp;·&nbsp; megoldások 0…${M-1} között: ${cnt} ${ok(cnt===1)}`;
}
$("#o-k-p").addEventListener("change",()=>{oCrtSet();oKi();});[1,2,3].forEach(i=>$("#o-k-"+i).addEventListener("input",oKi));oCrtSet();oKi();
/* --- §3 Euler --- */
function oEu(){
  const a=+$("#o-e-a").value,m=+$("#o-e-m").value;$("#o-e-av").textContent=a;$("#o-e-mv").textContent=m;
  const g=kGcd(a,m),ph=oPhi(m);const f=lFactor(m);let phf=m;f.forEach(([p])=>{phf=phf/p*(p-1);});
  let ds=0;for(let d=1;d<=m;d++)if(m%d===0)ds+=oPhi(d);
  let t=`φ(${m}) = ${ph} = ${m}·∏(1 − 1/p) = ${phf} ${ok(ph===phf)} &nbsp;·&nbsp; Σ<sub>d|${m}</sub> φ(d) = ${ds} ${ok(ds===m)}<br>`;
  if(g===1){let k=1,x=a%m;const seq=[x];while(x!==1%m&&k<500){x=x*a%m;k++;seq.push(x);}
    t+=`gcd(${a}, ${m}) = 1, ezért a<sup>φ</sup> = ${a}<sup>${ph}</sup> ≡ <b>${oPow(a,ph,m)}</b> (mod ${m}) ${ok(oPow(a,ph,m)===1%m)}<br>az ${a} rendje: <b>${k}</b>, és ${k} | ${ph} ${ok(ph%k===0)}<br>hatványok: ${seq.slice(0,20).join(", ")}${seq.length>20?", …":""}`;}
  else{const seq=[];let x=a%m;for(let i=0;i<14;i++){seq.push(x);x=x*a%m;}
    t+=`gcd(${a}, ${m}) = ${g} &gt; 1: az ${a} nem invertálható, a hatványai sosem lesznek 1 (mod ${m})<br>hatványok: ${seq.join(", ")}, …`;}
  $("#o-e-info").innerHTML=t;
}
["#o-e-a","#o-e-m"].forEach(i=>$(i).addEventListener("input",oEu));oEu();
