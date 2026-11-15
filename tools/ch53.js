/* ================= 5.3 FORTÉLYOK ================= */
function aaDyck(n){const out=[];(function rec(p,u,d){if(u===n&&d===n){out.push(p);return;}if(u<n)rec(p+"U",u+1,d);if(d<u)rec(p+"D",u,d+1);})("",0,0);return out;}
c2hero("binomfortely-bevezeto",900,8,fr=>{
  const s=$("#aa-hero"),W=420,H=250,n=4,u=44,ox=(W-n*u)/2,oy=28,P=aaDyck(4),idx=[0,3,5,7,9,11,12,13][Math.min(fr,7)];clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let i=0;i<=n;i++){el("line",{x1:ox,x2:ox+n*u,y1:oy+i*u,y2:oy+i*u,style:"stroke:var(--line)"},s);el("line",{x1:ox+i*u,x2:ox+i*u,y1:oy,y2:oy+n*u,style:"stroke:var(--line)"},s);}
  el("line",{x1:ox,y1:oy+n*u,x2:ox+n*u,y2:oy,style:"stroke:var(--accent-2);stroke-dasharray:5 4;stroke-width:2"},s);
  let x=0,y=0,d=`M${ox} ${oy+n*u}`;for(const c of P[idx]){if(c==="U")x++;else y++;d+=`L${ox+x*u} ${oy+n*u-y*u}`;}
  /* fent: U = jobbra, D = fel; az út az átló alatt marad (x ≥ y) */
  el("path",{d,style:"fill:none;stroke:var(--accent);stroke-width:4;stroke-linejoin:round"},s);
  $("#aa-hero-a").textContent=`út: ${idx+1} / 14`;
});
function aaNeg(){
  const r=+$("#aa-n-r").value,k=+$("#aa-n-k").value;$("#aa-n-rv").textContent=r;$("#aa-n-kv").textContent=k;
  let num=1;for(let i=0;i<k;i++)num*=(-r-i);let f=1;for(let i=1;i<=k;i++)f*=i;const d=num/f;
  const form=(k%2?-1:1)*bC(r+k-1,k);
  /* sorszorzás: (1+x+x²+…)^r, 13 tagig */
  let ser=[1,...Array(12).fill(0)];for(let t=0;t<r;t++){const nx=Array(13).fill(0);for(let i=0;i<13;i++)for(let j=0;i+j<13;j++)nx[i+j]+=ser[i];ser=nx;}
  const coefs=ser.map((c,i)=>bC(r+i-1,i));
  $("#aa-n-info").innerHTML=`C(−${r}, ${k}) definícióból: ${d} &nbsp;·&nbsp; (−1)<sup>${k}</sup>·C(${r+k-1}, ${k}) = ${form} ${ok(d===form)}<br>1/(1−x)<sup>${r}</sup> sorának együtthatói: ${coefs.join(", ")}<br>az ${r}-szeres sorszorzatból ugyanez ${ok(ser.every((c,i)=>c===coefs[i]))}`;
}
["#aa-n-r","#aa-n-k"].forEach(i=>$(i).addEventListener("input",aaNeg));aaNeg();
function aaCat(){
  const n=+$("#aa-c-n").value;$("#aa-c-nv").textContent=n;
  const cf=m=>bC(2*m,m)-bC(2*m,m-1);
  const rec=[1];for(let m=0;m<14;m++){let s=0;for(let k=0;k<=m;k++)s+=rec[k]*rec[m-k];rec.push(s);}
  let h="<tr><th>n</th><th>C(2n,n) − C(2n,n−1)</th><th>1/(n+1)·C(2n,n)</th><th>rekurzió</th><th>utak száma</th></tr>",all=true;
  for(let m=0;m<=n;m++){
    const dp=Array.from({length:m+1},()=>Array(m+1).fill(0));dp[0][0]=1;for(let x=0;x<=m;x++)for(let y=0;y<=x;y++){if(x||y)dp[x][y]=(x?dp[x-1][y]:0)+(y?dp[x][y-1]:0);}
    const a=m?cf(m):1,b=bC(2*m,m)/(m+1),c=rec[m],d=dp[m][m];if(!(a===b&&b===c&&c===d))all=false;
    h+=`<tr><td>${m}</td><td>${a}</td><td>${b}</td><td>${c}</td><td>${d}</td></tr>`;}
  $("#aa-c-t").innerHTML=h;
  $("#aa-c-info").innerHTML=`C<sub>${n}</sub> = <b>${rec[n]}</b>; a négy számolás minden n ≤ ${n}-re egyezik ${ok(all)}`;
}
$("#aa-c-n").addEventListener("input",aaCat);aaCat();
function aaNew(){
  const r=+$("#aa-w-r").value,x=+$("#aa-w-x").value,N=+$("#aa-w-n").value;
  $("#aa-w-xv").textContent=fm(x);$("#aa-w-nv").textContent=N;
  let c=1,s=0;const cs=[];for(let k=0;k<N;k++){s+=c*x**k;if(k<6)cs.push(c);c=c*(r-k)/(k+1);}
  const ex=(1+x)**r;
  let cat=true;for(let k=1;k<=12;k++){let c2=1;for(let i=0;i<k;i++)c2*=(0.5-i)/(i+1);const cn=bC(2*(k-1),k-1)/k;if(Math.abs(c2-(k%2?1:-1)*cn/2**(2*k-1))>1e-12)cat=false;}
  $("#aa-w-info").innerHTML=`első ${N} tag összege: ${fm(+s.toFixed(8))} &nbsp;·&nbsp; pontos (1+x)<sup>r</sup>: ${fm(+ex.toFixed(8))} &nbsp;·&nbsp; hiba: ${fm(+(s-ex).toExponential(2))}<br>együtthatók: ${cs.map(v=>fm(+v.toFixed(5))).join(", ")}, …<br>C(1/2,k) = (−1)<sup>k−1</sup>·C<sub>k−1</sub>/2<sup>2k−1</sup>, k ≤ 12 ${ok(cat)}`;
}
["#aa-w-r","#aa-w-x","#aa-w-n"].forEach(i=>$(i).addEventListener("input",aaNew));aaNew();
