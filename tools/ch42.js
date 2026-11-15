/* ================= 4.2 PRÍMEK ================= */
function lFactor(n){const f=[];for(let d=2;d*d<=n;d++){let e=0;while(n%d===0){n/=d;e++;}if(e)f.push([d,e]);}if(n>1)f.push([n,1]);return f;}
function lSieve(n){const s=new Uint8Array(n+1).fill(1);s[0]=s[1]=0;for(let i=2;i*i<=n;i++)if(s[i])for(let j=i*i;j<=n;j+=i)s[j]=0;return s;}
const lPow=(f)=>f.map(([p,e])=>e>1?`${p}<sup>${e}</sup>`:`${p}`).join(" · ")||"1";
c2hero("primek-bevezeto",1100,5,fr=>{
  const s=$("#l-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const ps=[2,3,5,7],use=ps.slice(0,Math.min(fr,4)),cw=36,ch=21,ox=30,oy=10;let left=0;
  for(let n=1;n<=100;n++){
    const x=ox+((n-1)%10)*cw,y=oy+Math.floor((n-1)/10)*ch;
    const cr=n>1&&use.some(p=>n!==p&&n%p===0);
    const isP=n>1&&lFactor(n).length===1&&lFactor(n)[0][1]===1;
    if(!cr&&n>1)left++;
    el("rect",{x:x+1,y:y+1,width:cw-3,height:ch-3,rx:3,style:`fill:${cr?"var(--line)":(isP&&fr>=4?"var(--accent)":"var(--paper)")};opacity:${cr?.35:1};stroke:var(--line)`},s);
    txt(s,x+cw/2-1,y+ch/2+3,n,cr?"":"ink");
  }
  $("#l-hero-a").textContent=fr===0?"szitálás: –":"szitálás: "+use.join(", ");$("#l-hero-b").textContent=fr>=4?25:left;
});
/* --- §1 Euklidész–Mullin --- */
function lEM(k){const t=[2];while(t.length<k){let N=1;t.forEach(x=>N*=x);N+=1;const f=lFactor(N);t.push(f[0][0]);}return t;}
function lVeg(){
  const k=+$("#l-v-k").value;$("#l-v-kv").textContent=k;
  const t=lEM(k);let N=1;t.forEach(x=>N*=x);N+=1;const f=lFactor(N);
  $("#l-v-info").innerHTML=`lista: ${t.join(", ")}<br>szorzat + 1 = ${t.join(" · ")} + 1 = <b>${N}</b> = ${lPow(f)}<br>${f.length===1&&f[0][1]===1?"ez a szám maga is prím":"ez a szám összetett"}; a legkisebb prímosztó: <b>${f[0][0]}</b>, és ez nincs a listában ${ok(!t.includes(f[0][0]))}`;
}
$("#l-v-k").addEventListener("input",lVeg);lVeg();
/* --- §2 szita --- */
function lSzita(){
  const N=+$("#l-s-n").value,P=+$("#l-s-p").value;$("#l-s-nv").textContent=N;$("#l-s-pv").textContent=P;
  const mark=new Uint8Array(N+1);const used=[];
  for(let p=2;p<=P;p++){if(lFactor(p).length===1&&lFactor(p)[0][1]===1){used.push(p);for(let j=p*p;j<=N;j+=p)mark[j]=1;}}
  const pr=lSieve(N);let h="",left=0;
  for(let n=2;n<=N;n++){if(!mark[n])left++;const isUsed=used.includes(n);
    h+=`<span class="jc${isUsed?" dr":""}" style="${mark[n]?"opacity:.3;text-decoration:line-through":""}">${n}</span>`;}
  $("#l-s-t").innerHTML=h;
  const pi=pr.reduce((a,b)=>a+b,0),full=P*P>=N;
  $("#l-s-info").innerHTML=`szitált prímek: ${used.join(", ")||"–"} &nbsp;·&nbsp; megmaradt (2-től): ${left}<br>${full?`P² = ${P*P} ≥ N, ezért a megmaradtak pontosan a prímek: π(${N}) = ${pi} ${ok(left===pi)}`:`P² = ${P*P} &lt; N: a megmaradtak között még összetett számok is vannak (${left-pi} db)`}`;
}
["#l-s-n","#l-s-p"].forEach(i=>$(i).addEventListener("input",lSzita));lSzita();
/* --- §3 felbontás --- */
function lFel(){
  const a=+$("#l-f-a").value,b=+$("#l-f-b").value;$("#l-f-av").textContent=a;$("#l-f-bv").textContent=b;
  const fa=lFactor(a),fb=lFactor(b),ps=[...new Set([...fa.map(x=>x[0]),...fb.map(x=>x[0])])].sort((x,y)=>x-y);
  const ea=p=>(fa.find(x=>x[0]===p)||[0,0])[1],eb=p=>(fb.find(x=>x[0]===p)||[0,0])[1];
  let h="<tr><th>p</th><th>a kitevője</th><th>b kitevője</th><th>min</th><th>max</th></tr>",g=1,l=1;
  ps.forEach(p=>{const m=Math.min(ea(p),eb(p)),M=Math.max(ea(p),eb(p));g*=p**m;l*=p**M;h+=`<tr><td>${p}</td><td>${ea(p)}</td><td>${eb(p)}</td><td>${m}</td><td>${M}</td></tr>`;});
  $("#l-f-t").innerHTML=h;
  const tau=f=>f.reduce((x,[,e])=>x*(e+1),1),ge=kGcd(a,b);
  $("#l-f-info").innerHTML=`a = ${a} = ${lPow(fa)}, &nbsp; b = ${b} = ${lPow(fb)}<br>gcd = ${g}, lcm = ${l} &nbsp;·&nbsp; Euklidész szerint gcd = ${ge} ${ok(g===ge)} &nbsp;·&nbsp; gcd·lcm = ${g*l} = ab = ${a*b} ${ok(g*l===a*b)}<br>osztók száma: τ(a) = ${tau(fa)}, τ(b) = ${tau(fb)}`;
}
["#l-f-a","#l-f-b"].forEach(i=>$(i).addEventListener("input",lFel));lFel();
/* --- §4 eloszlás --- */
function lElo(){
  const X=+$("#l-e-x").value;$("#l-e-xv").textContent=X;
  const W=640,H=300,s=c2svg("#l-e-svg",W,H),L=46,R=12,T=14,B=26,pr=lSieve(X);
  const pi=new Array(X+1).fill(0);for(let i=2;i<=X;i++)pi[i]=pi[i-1]+pr[i];
  const maxV=pi[X]*1.25,xs=x=>L+(W-L-R)*x/X,ys=v=>H-B-(H-B-T)*v/maxV;
  for(let g=0;g<=4;g++){const v=maxV*g/4;el("line",{x1:L,x2:W-R,y1:ys(v),y2:ys(v),class:"grid-l"},s);txt(s,L-6,ys(v)+4,Math.round(v),"","end");}
  el("line",{x1:L,x2:W-R,y1:H-B,y2:H-B,class:"axis"},s);
  const curve=(f,col,w)=>{let d="";for(let x=2;x<=X;x+=Math.max(1,Math.floor(X/300))){const v=f(x);d+=(d?"L":"M")+xs(x).toFixed(1)+" "+ys(v).toFixed(1);}el("path",{d,style:`fill:none;stroke:${col};stroke-width:${w}`},s);};
  curve(x=>x/Math.log(x),"var(--accent-2)",2);curve(x=>x/(Math.log(x)-1),"var(--good)",2);
  let d="";for(let x=2;x<=X;x++){d+=(d?"L":"M")+xs(x).toFixed(1)+" "+ys(pi[x]).toFixed(1);}el("path",{d,style:"fill:none;stroke:var(--accent);stroke-width:2.5"},s);
  [["π(x)","var(--accent)"],["x/ln x","var(--accent-2)"],["x/(ln x − 1)","var(--good)"]].forEach((q,i)=>{const x=L+14+i*118;el("line",{x1:x,x2:x+22,y1:T+8,y2:T+8,style:`stroke:${q[1]};stroke-width:3`},s);txt(s,x+28,T+12,q[0],"","start");});
  const a=X/Math.log(X),b=X/(Math.log(X)-1);
  $("#l-e-info").innerHTML=`π(${X}) = <b>${pi[X]}</b> &nbsp;·&nbsp; x/ln x = ${fm(+a.toFixed(1))} (hiba ${fm(+((a/pi[X]-1)*100).toFixed(1))} %) &nbsp;·&nbsp; x/(ln x − 1) = ${fm(+b.toFixed(1))} (hiba ${fm(+((b/pi[X]-1)*100).toFixed(1))} %)`;
}
$("#l-e-x").addEventListener("input",lElo);lElo();
