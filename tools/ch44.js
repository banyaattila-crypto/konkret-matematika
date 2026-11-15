/* ================= 4.5 RELATÍV PRÍMEK ================= */
function nNodes(maxD){const arr=[];(function rec(l,r,d,par){if(d>maxD)return null;const m=[l[0]+r[0],l[1]+r[1]];const node={n:m[0],d:m[1],lvl:d,par:par};
  const left=rec(l,m,d+1,node);arr.push(node);const right=rec(m,r,d+1,node);return node;})([0,1],[1,0],0,null);arr.forEach((x,i)=>x.i=i);return arr;}
c2hero("sternbrocot-bevezeto",1100,5,fr=>{
  const s=$("#n-hero"),W=420,H=250,nodes=nNodes(3),L=Math.min(fr,3),ox=18,dx=(W-2*ox)/nodes.length,oy=30,dy=62;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const X=n=>ox+(n.i+.5)*dx,Y=n=>oy+n.lvl*dy;let cnt=0;
  nodes.filter(n=>n.lvl<=L).forEach(n=>{if(n.par)el("line",{x1:X(n.par),y1:Y(n.par)+10,x2:X(n),y2:Y(n)-10,style:"stroke:var(--line);stroke-width:1.5"},s);});
  nodes.filter(n=>n.lvl<=L).forEach(n=>{cnt++;const c=["var(--accent)","var(--accent-2)","var(--good)","var(--bad)"][n.lvl];
    el("rect",{x:X(n)-12.5,y:Y(n)-10,width:25,height:20,rx:5,style:`fill:${c};opacity:.85`},s);txt(s,X(n),Y(n)+4,n.n+"/"+n.d,"ink");});
  $("#n-hero-a").textContent="szint: "+L;$("#n-hero-b").textContent=cnt;
});
/* --- §1 fa --- */
function nPath(p,q){let l=[0,1],r=[1,0];const rows=[];let path="",det=true;
  for(let i=0;i<200;i++){const m=[l[0]+r[0],l[1]+r[1]];if(r[0]*l[1]-l[0]*r[1]!==1)det=false;
    if(m[0]===p&&m[1]===q){rows.push([i,l,r,m,"megtaláltuk"]);return {path,rows,det};}
    const left=p*m[1]<q*m[0];rows.push([i,l,r,m,left?"L":"R"]);path+=left?"L":"R";if(left)r=m;else l=m;}
  return {path,rows,det};}
function nCf(p,q){const a=[];while(q){a.push(Math.floor(p/q));[p,q]=[q,p%q];}return a;}
function nPathCf(a){let s="";a.forEach((x,i)=>{const c=x-(i===a.length-1?1:0);s+=(i%2?"L":"R").repeat(Math.max(0,c));});return s;}
const nFr=(a)=>`${a[0]}/${a[1]}`;
function nFa(){
  let p=+$("#n-f-p").value,q=+$("#n-f-q").value;$("#n-f-pv").textContent=p;$("#n-f-qv").textContent=q;
  const g=kGcd(p,q),pp=p/g,qq=q/g,r=nPath(pp,qq);
  let h="<tr><th>lépés</th><th>bal</th><th>jobb</th><th>mediáns</th><th>irány</th></tr>";
  r.rows.forEach(w=>{h+=`<tr><td>${w[0]+1}</td><td>${nFr(w[1])}</td><td>${nFr(w[2])}</td><td>${nFr(w[3])}</td><td>${w[4]}</td></tr>`;});
  $("#n-f-t").innerHTML=h;
  const cf=nCf(pp,qq),pc=nPathCf(cf),runs=r.path.replace(/(.)\1*/g,m=>m[0]+"<sup>"+m.length+"</sup>");
  $("#n-f-info").innerHTML=`${g>1?`${p}/${q} = ${pp}/${qq} (egyszerűsítve)<br>`:""}út: <b>${r.path||"(gyökér)"}</b> ${r.path?"= "+runs:""} &nbsp;·&nbsp; lánctört: [${cf[0]}; ${cf.slice(1).join(", ")||"–"}]<br>az útból a lánctörttel: ${pc||"(gyökér)"} ${ok(pc===r.path)} &nbsp;·&nbsp; minden lépésben bc − ad = 1 ${ok(r.det)}`;
}
["#n-f-p","#n-f-q"].forEach(i=>$(i).addEventListener("input",nFa));nFa();
/* --- §2 Farey --- */
function nPhi(m){let c=0;for(let k=1;k<=m;k++)if(kGcd(k,m)===1)c++;return c;}
function nFarey(n){const f=[];for(let b=1;b<=n;b++)for(let a=0;a<=b;a++)if(kGcd(a,b)===1)f.push([a,b]);f.sort((x,y)=>x[0]*y[1]-y[0]*x[1]);return f;}
function nFar(){
  const n=+$("#n-r-n").value;$("#n-r-nv").textContent=n;const f=nFarey(n);
  const t=$("#n-r-t");t.style.gridTemplateColumns="repeat(auto-fill,minmax(54px,1fr))";
  t.innerHTML=f.map(x=>`<span class="jc${x[1]===n?" dr":""}"><i style="visibility:hidden">·</i>${x[0]}/${x[1]}</span>`).join("");
  let det=true;for(let i=0;i+1<f.length;i++){const [a,b]=f[i],[c,d]=f[i+1];if(b*c-a*d!==1)det=false;}
  let s=1;for(let k=1;k<=n;k++)s+=nPhi(k);
  $("#n-r-info").innerHTML=`|F<sub>${n}</sub>| = ${f.length} &nbsp;·&nbsp; 1 + Σφ(k) (k ≤ ${n}) = ${s} ${ok(f.length===s)}<br>szomszédos törtekre bc − ad = 1 ${ok(det)} &nbsp;·&nbsp; új törtek (nevező = ${n}): ${f.filter(x=>x[1]===n).length}`;
}
$("#n-r-n").addEventListener("input",nFar);nFar();
/* --- §3 valószínűség --- */
function nMu(N){const mu=new Int8Array(N+1);mu[1]=1;const sp=new Int32Array(N+1);for(let i=2;i<=N;i++)if(!sp[i])for(let j=i;j<=N;j+=i)if(!sp[j])sp[j]=i;
  for(let n=2;n<=N;n++){const p=sp[n],m=n/p;mu[n]=m%p===0?0:-mu[m];}return mu;}
function nVal(){
  const N=+$("#n-v-n").value;$("#n-v-nv").textContent=N;
  let b=0;for(let x=1;x<=N;x++)for(let y=1;y<=N;y++)if(kGcd(x,y)===1)b++;
  const mu=nMu(N);let m=0;for(let d=1;d<=N;d++)m+=mu[d]*Math.floor(N/d)**2;
  const sv=lSieve(N);let e=1;for(let p=2;p<=N;p++)if(sv[p])e*=1-1/(p*p);
  $("#n-v-info").innerHTML=`közvetlen számolás: ${b} pár &nbsp;·&nbsp; Σ μ(d)⌊N/d⌋² = ${m} ${ok(b===m)}<br>arány: ${b}/${N*N} = ${fm(+(b/(N*N)).toFixed(5))} &nbsp;·&nbsp; 6/π² = ${fm(+(6/Math.PI**2).toFixed(5))} &nbsp;·&nbsp; ∏(1 − 1/p²), p ≤ ${N}: ${fm(+e.toFixed(5))}`;
}
$("#n-v-n").addEventListener("input",nVal);nVal();
