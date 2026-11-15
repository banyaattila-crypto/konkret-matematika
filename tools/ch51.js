/* ================= 5.1 ALAPAZONOSSÁGOK ================= */
const bC=(n,k)=>{if(k<0||k>n)return 0;k=Math.min(k,n-k);let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r);};
c2hero("binomalap-bevezeto",700,8,fr=>{
  const s=$("#i-hero"),W=420,H=250,n=Math.min(fr,7);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let r=0;r<=n;r++){let sum=0;for(let k=0;k<=r;k++){const v=bC(r,k);sum+=v;const x=W/2+(k-r/2)*44,y=28+r*28;
    el("rect",{x:x-18,y:y-12,width:36,height:22,rx:6,style:`fill:var(--accent);opacity:${r===n?.9:.4}`},s);txt(s,x,y+4,v,"ink");}}
  $("#i-hero-a").textContent="n = "+n;$("#i-hero-b").textContent=2**n;
});
function bPas(){
  const n=+$("#i-p-n").value,m=+$("#i-p-m").value;$("#i-p-nv").textContent=n;
  const W=640,cw=Math.min(36,(W-20)/n),H=Math.round(n*cw*.9+30),s=c2svg("#i-p-svg",W,H),num=n<=11;
  const cols=["var(--accent)","var(--accent-2)","var(--good)","var(--bad)","var(--line)"];
  for(let r=0;r<n;r++)for(let k=0;k<=r;k++){const v=bC(r,k),x=W/2+(k-r/2)*cw,y=16+r*cw*.9;
    const c=m?(v%m===0?"var(--paper)":cols[(v%m)%4]):"var(--accent)";
    el("rect",{x:x-cw*.46,y:y-cw*.4,width:cw*.92,height:cw*.8,rx:4,style:`fill:${c};stroke:var(--line);opacity:${m&&v%m===0?1:.85}`},s);
    if(num&&cw>=30)txt(s,x,y+4,v,v%m===0&&m?"":"ink");}
  let tot=0;for(let k=0;k<n;k++)tot+=bC(n-1,k);
  const odd=m===2?(()=>{let c=0;for(let k=0;k<n;k++)if(bC(n-1,k)%2)c++;return c;})():null;
  $("#i-p-info").innerHTML=`az utolsó (${n-1}.) sor összege: ${tot} = 2<sup>${n-1}</sup> = ${2**(n-1)} ${ok(tot===2**(n-1))}${odd!==null?`<br>páratlan elemek az utolsó sorban: ${odd} = 2<sup>s₂(${n-1})</sup> = ${2**(((n-1)).toString(2).replace(/0/g,"").length)} ${ok(odd===2**((n-1).toString(2).replace(/0/g,"").length))}`:""}`;
}
["#i-p-n","#i-p-m"].forEach(i=>$(i).addEventListener("input",bPas));bPas();
function bAz(){
  let n=+$("#i-a-n").value,m=+$("#i-a-m").value,k=+$("#i-a-k").value;
  m=Math.min(m,n);k=Math.min(k,m);$("#i-a-m").value=m;$("#i-a-k").value=k;
  $("#i-a-nv").textContent=n;$("#i-a-mv").textContent=m;$("#i-a-kv").textContent=k;
  const s1=bC(n,k),s2=bC(n,n-k),a1=k*bC(n,k),a2=n*bC(n-1,k-1),t1=bC(n,m)*bC(m,k),t2=bC(n,k)*bC(n-k,m-k);
  $("#i-a-info").innerHTML=`szimmetria: C(${n},${k}) = ${s1} = C(${n},${n-k}) = ${s2} ${ok(s1===s2)}<br>elnyelés: ${k}·C(${n},${k}) = ${a1} = ${n}·C(${n-1},${k-1}) = ${a2} ${ok(a1===a2)}<br>háromtagú: C(${n},${m})·C(${m},${k}) = ${t1} = C(${n},${k})·C(${n-k},${m-k}) = ${t2} ${ok(t1===t2)}`;
}
["#i-a-n","#i-a-m","#i-a-k"].forEach(i=>$(i).addEventListener("input",bAz));bAz();
function bBin(){
  const n=+$("#i-b-n").value;$("#i-b-nv").textContent=n;
  const co=[];for(let k=0;k<=n;k++)co.push(bC(n,k));
  let ev=0,od=0,alt=0;co.forEach((c,k)=>{if(k%2)od+=c;else ev+=c;alt+=(k%2?-c:c);});
  const sup=i=>String(i).split("").map(c=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");
  const terms=co.map((c,k)=>`${c>1||(k!==0&&k!==n)?c:""}${k?"x"+(k>1?sup(k):""):""}${n-k?"y"+(n-k>1?sup(n-k):""):""}`.replace(/^$/,"1"));
  $("#i-b-info").innerHTML=`(x + y)<sup>${n}</sup> = ${terms.join(" + ")}<br>x = y = 1: ${co.reduce((a,b)=>a+b,0)} = 2<sup>${n}</sup> ${ok(co.reduce((a,b)=>a+b,0)===2**n)} &nbsp;·&nbsp; x = −1, y = 1: ${alt} ${ok(alt===0)} &nbsp;·&nbsp; páros indexűek: ${ev}, páratlanok: ${od} ${ok(ev===od&&ev===2**(n-1))}`;
}
$("#i-b-n").addEventListener("input",bBin);bBin();
