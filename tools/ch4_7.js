/* ================= 4.7 FÜGGETLEN MARADÉKOK ================= */
const azGcd=(a,b)=>b?azGcd(b,a%b):a;
const azPow=(a,e,m)=>{let r=1%m,b=a%m;while(e>0){if(e&1)r=r*b%m;b=b*b%m;e=Math.floor(e/2);}return r;};
function azXg(a,b){if(b===0)return[a,1,0];const[g,x,y]=azXg(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
const azInv=(a,m)=>{const[g,x]=azXg(((a%m)+m)%m,m);return g===1?((x%m)+m)%m:null;};
function azFac(n){const f=[];for(let p=2;p*p<=n;p++){if(n%p===0){let e=0;while(n%p===0){n/=p;e++;}f.push([p,e]);}}if(n>1)f.push([n,1]);return f;}
/* hero: (x mod m, x mod n) rács, két modulus-pár */
c2hero("fuggetlen-bevezeto",330,39,fr=>{
  const two=fr>=15,m=two?4:3,n=two?6:5,xmax=two?Math.min(fr-15,23):Math.min(fr,14),s=c2svg("#az-hero",420,250);
  const cw=Math.min(52,380/n),ch=Math.min(44,190/m),x0=(420-n*cw)/2,y0=24;
  for(let i=0;i<m;i++)for(let j=0;j<n;j++)el("rect",{x:x0+j*cw+1,y:y0+i*ch+1,width:cw-2,height:ch-2,rx:5,style:"fill:none;stroke:var(--line)"},s);
  const seen={};let coll=0;
  for(let x=0;x<=xmax;x++){const i=x%m,j=x%n,k=i+","+j,bad=k in seen;if(bad)coll++;else seen[k]=x;
    el("rect",{x:x0+j*cw+1,y:y0+i*ch+1,width:cw-2,height:ch-2,rx:5,style:`fill:${bad?"var(--bad)":"var(--accent)"};opacity:${bad?.9:.22}`},s);
    const t=txt(s,x0+j*cw+cw/2,y0+i*ch+ch/2+4,bad?seen[k]+"/"+x:x,"","middle");t.style.fontWeight=x===xmax?"700":"400";}
  txt(s,210,238,"sor: x mod "+m+" · oszlop: x mod "+n,"","middle");
  $("#az-hero-a").textContent=`(m, n) = (${m}, ${n})`;
  $("#az-hero-b").innerHTML=`x = ${xmax} → (${xmax%m}, ${xmax%n}) · ütközés: ${coll}`;
});
/* --- §1 --- */
function azT(){
  const m=+$("#az-t-m").value,n=+$("#az-t-n").value;$("#az-t-mv").textContent=m;$("#az-t-nv").textContent=n;
  const M=m*n,g=azGcd(m,n),L=M/g,cell={};
  for(let x=0;x<M;x++){const k=(x%m)+","+(x%n);if(!(k in cell))cell[k]=x;}
  let h="<tr><th></th>"+Array.from({length:n},(_,j)=>`<th>${j}</th>`).join("")+"</tr>";
  for(let i=0;i<m;i++){h+=`<tr><th>${i}</th>`;for(let j=0;j<n;j++){const v=cell[i+","+j];h+=`<td>${v===undefined?"·":v}</td>`;}h+="</tr>";}
  $("#az-t-t").innerHTML=h;
  let hom=true;for(let x=0;x<M&&hom;x++)for(let y=0;y<M;y++){const s=(x+y)%M,p=(x*y)%M;if(s%m!==(x%m+y%m)%m||s%n!==(x%n+y%n)%n||p%m!==((x%m)*(y%m))%m||p%n!==((x%n)*(y%n))%n){hom=false;break;}}
  $("#az-t-info").innerHTML=`gcd(${m}, ${n}) = ${g} &nbsp;·&nbsp; mn = ${M} &nbsp;·&nbsp; lcm = ${L} &nbsp;·&nbsp; kitöltött cella: ${Object.keys(cell).length} ${ok(Object.keys(cell).length===L)}<br>`+
   (g===1?`kölcsönösen egyértelmű: minden cella pontosan egy számot kap (${M} = ${M}) ${ok(Object.keys(cell).length===M)}`:`nem egyértelmű: ${M-L} szám ütközik egy korábbival`)+` &nbsp;·&nbsp; összeadás és szorzás komponensenként ${ok(hom)}`;
}
["#az-t-m","#az-t-n"].forEach(i=>$(i).addEventListener("input",azT));azT();
/* --- §2 --- */
function azS(){
  const a=+$("#az-s-a").value,e=+$("#az-s-e").value,ms=$("#az-s-m").value.split(",").map(Number);
  $("#az-s-av").textContent=a;$("#az-s-ev").textContent=e;
  const M=ms.reduce((p,q)=>p*q,1),rs=ms.map(m=>azPow(a,e,m)),xs=[];let sum=0,w=1,h="<tr><th>i</th><th>mᵢ</th><th>aᵉ mod mᵢ = rᵢ</th><th>jegy xᵢ</th><th>súly m₁···mᵢ₋₁</th></tr>";
  ms.forEach((m,i)=>{const inv=azInv(w,m);let d=(((rs[i]-sum)%m+m)%m)*(inv===null?0:inv)%m;if(i===0)d=rs[i];xs.push(d);
    h+=`<tr><td>${i+1}</td><td>${m}</td><td>${rs[i]}</td><td>${d}</td><td>${w}</td></tr>`;sum+=d*w;w*=m;});
  $("#az-s-t").innerHTML=h;const x=sum,dir=azPow(a,e,M);
  $("#az-s-info").innerHTML=`x = ${xs.map((d,i)=>i===0?d:`${d}·${ms.slice(0,i).join("·")}`).join(" + ")} = <b>${x}</b> (mod ${M})<br>közvetlen számolás: ${a}<sup>${e}</sup> mod ${M} = ${dir} ${ok(x===dir)} &nbsp;·&nbsp; ${ms.map((m,i)=>`${x} mod ${m} = ${x%m}`).join(", ")} ${ok(ms.every((m,i)=>x%m===rs[i]))}`;
}
["#az-s-a","#az-s-e"].forEach(i=>$(i).addEventListener("input",azS));$("#az-s-m").addEventListener("change",azS);azS();
/* --- §3 --- */
function azG(){
  const n=+$("#az-g-n").value,q=$("#az-g-q").value;$("#az-g-nv").textContent=n;
  const sol=[];for(let x=0;x<n;x++){if(q==="1"?(x*x)%n===1%n:(x*x)%n===x%n)sol.push(x);}
  const f=azFac(n);let pred;
  if(q==="x")pred=2**f.length;else{let e=0,m=n;while(m%2===0){m/=2;e++;}const c=e<=1?1:e===2?2:4;pred=c*2**azFac(m).length;}
  $("#az-g-info").innerHTML=`n = ${f.map(([p,e])=>e>1?`${p}<sup>${e}</sup>`:p).join(" · ")} &nbsp;·&nbsp; megoldás 0…${n-1}: <b>${sol.length}</b>, képlet: ${pred} ${ok(sol.length===pred)}<br>${sol.length<=24?"megoldások: "+sol.join(", "):"első megoldások: "+sol.slice(0,24).join(", ")+", …"}`;
}
$("#az-g-n").addEventListener("input",azG);$("#az-g-q").addEventListener("change",azG);azG();
/* --- §4 --- */
function azA(){
  const m=+$("#az-a-m").value,n=+$("#az-a-n").value;let a=+$("#az-a-a").value,b=+$("#az-a-b").value;
  $("#az-a-a").max=m-1;$("#az-a-b").max=n-1;a=Math.min(a,m-1);b=Math.min(b,n-1);$("#az-a-a").value=a;$("#az-a-b").value=b;
  ["m","n","a","b"].forEach(k=>$("#az-a-"+k+"v").textContent=$("#az-a-"+k).value);
  const g=azGcd(m,n),L=m*n/g,okc=((a-b)%g+g)%g===0;let x=null;
  if(okc){const mg=m/g,ng=n/g,d=(b-a)/g,t=ng===1?0:(((d%ng)+ng)%ng)*azInv(mg%ng,ng)%ng;x=((a+m*t)%L+L)%L;}
  const bru=[];for(let y=0;y<m*n;y++)if(y%m===a&&y%n===b)bru.push(y);
  const agree=okc?(bru.length===g&&bru.every(y=>y%L===x)):bru.length===0;
  $("#az-a-info").innerHTML=`gcd = ${g}, lcm = ${L} &nbsp;·&nbsp; a − b = ${a-b}, ${okc?`osztható ${g}-vel`:`<b>nem</b> osztható ${g}-vel`}<br>`+
   (okc?`megoldás: <b>x ≡ ${x} (mod ${L})</b>; 0…${m*n-1} között ${bru.length} db (g = ${g}): ${bru.slice(0,8).join(", ")}${bru.length>8?", …":""} ${ok(agree)}`:`nincs megoldás; a 0…${m*n-1} tartományban ${bru.length} db található ${ok(agree)}`);
}
["#az-a-m","#az-a-n","#az-a-a","#az-a-b"].forEach(i=>$(i).addEventListener("input",azA));azA();
