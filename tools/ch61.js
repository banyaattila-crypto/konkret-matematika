/* ================= 6.1 STIRLING-SZÁMOK ================= */
const sS2=(()=>{const T=[[1]];for(let n=1;n<=14;n++){T.push([]);for(let k=0;k<=n;k++)T[n][k]=(k===0||k>n-1&&k!==n?0:0);}
  for(let n=1;n<=14;n++)for(let k=0;k<=n;k++){T[n][k]=(k===0)?0:(k===n?1:k*(T[n-1][k]||0)+(T[n-1][k-1]||0));}return T;})();
const sS1=(()=>{const T=[[1]];for(let n=1;n<=14;n++){T.push([]);for(let k=0;k<=n;k++)T[n][k]=(k===0)?0:(k===n?1:(n-1)*(T[n-1][k]||0)+(T[n-1][k-1]||0));}return T;})();
const sFact=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;};
const sFall=(x,k)=>{let r=1;for(let i=0;i<k;i++)r*=x-i;return r;};
c2hero("stirling-bevezeto",800,8,fr=>{
  const s=$("#ad-hero"),W=420,H=250,n=1+Math.min(fr,6);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);let sum=0;
  for(let r=1;r<=n;r++)for(let k=1;k<=r;k++){const v=sS2[r][k],x=W/2+(k-(r+1)/2)*48,y=20+(r-1)*32,last=r===n;if(last)sum+=v;
    el("rect",{x:x-20,y:y-13,width:40,height:24,rx:6,style:`fill:var(--accent);opacity:${last?.9:.4}`},s);txt(s,x,y+4,v,"ink");}
  $("#ad-hero-a").textContent="n = "+n;$("#ad-hero-b").textContent=sum;
});
function sdPa(){
  const t=+$("#ad-p-t").value,n=+$("#ad-p-n").value,T=t===2?sS2:sS1;$("#ad-p-nv").textContent=n;
  let h="<tr><th>n \\ k</th>"+Array.from({length:n},(_,i)=>`<th>${i+1}</th>`).join("")+"<th>Σ</th></tr>",okAll=true;
  for(let r=1;r<=n;r++){let sum=0;h+=`<tr><th>${r}</th>`;for(let k=1;k<=n;k++){const v=k<=r?T[r][k]:"";if(k<=r)sum+=v;h+=`<td>${v}</td>`;}
    if(t===1&&sum!==sFact(r))okAll=false;h+=`<td><b>${sum}</b></td></tr>`;}
  $("#ad-p-tb").innerHTML=h;
  /* rekurzió-ellenőrzés */
  let rec=true;for(let r=2;r<=n;r++)for(let k=1;k<=r;k++){const e=t===2?k*(T[r-1][k]||0)+(T[r-1][k-1]||0):(r-1)*(T[r-1][k]||0)+(T[r-1][k-1]||0);if(k<r+0&&e!==T[r][k]&&k!==r)rec=false;}
  $("#ad-p-info").innerHTML=`rekurzió minden elemre ${ok(rec)}`+(t===1?` &nbsp;·&nbsp; sorösszeg = n! ${ok(okAll)}`:` &nbsp;·&nbsp; a ${n}. sor összege a ${n}. Bell-szám`);
}
["#ad-p-t","#ad-p-n"].forEach(i=>$(i).addEventListener("input",sdPa));sdPa();
function sdHa(){
  const n=+$("#ad-h-n").value,x=+$("#ad-h-x").value;$("#ad-h-nv").textContent=n;$("#ad-h-xv").textContent=x;
  let h="<tr><th>k</th><th>{n k}</th><th>x<sup>k̲</sup></th><th>szorzat</th><th>k!·{n k}</th><th>szita-képlet</th></tr>",tot=0,sj=true;
  for(let k=0;k<=n;k++){const c=sS2[n][k],f=sFall(x,k);tot+=c*f;let sz=0;for(let j=0;j<=k;j++)sz+=(j%2?-1:1)*bC(k,j)*(k-j)**n;
    const e=sFact(k)*c;if(sz!==e)sj=false;h+=`<tr><td>${k}</td><td>${c}</td><td>${f}</td><td>${c*f}</td><td>${e}</td><td>${sz}</td></tr>`;}
  $("#ad-h-tb").innerHTML=h;
  $("#ad-h-info").innerHTML=`Σ = ${tot} &nbsp;·&nbsp; ${x}<sup>${n}</sup> = ${x**n} ${ok(tot===x**n)}<br>szürjekciók: k!·{n k} egyezik a szita-képlettel minden k-ra ${ok(sj)}`;
}
["#ad-h-n","#ad-h-x"].forEach(i=>$(i).addEventListener("input",sdHa));sdHa();
function sdCy(){
  const n=+$("#ad-c-n").value;$("#ad-c-nv").textContent=n;
  const cnt=Array(n+1).fill(0);const a=Array.from({length:n},(_,i)=>i);
  const cyc=p=>{const seen=Array(n).fill(false);let c=0;for(let i=0;i<n;i++)if(!seen[i]){c++;let j=i;while(!seen[j]){seen[j]=true;j=p[j];}}return c;};
  const gen=(k)=>{if(k===n){cnt[cyc(a)]++;return;}for(let i=k;i<n;i++){[a[k],a[i]]=[a[i],a[k]];gen(k+1);[a[k],a[i]]=[a[i],a[k]];}};
  gen(0);
  const W=640,H=200,s=c2svg("#ad-c-svg",W,H),mx=Math.max(...cnt),bw=Math.min(60,(W-60)/n);
  for(let k=1;k<=n;k++){const hh=cnt[k]/mx*(H-60),x=30+(k-1)*(bw+8);
    el("rect",{x,y:H-30-hh,width:bw,height:hh,rx:4,style:"fill:var(--accent);opacity:.85"},s);
    txt(s,x+bw/2,H-12,"k = "+k,"");txt(s,x+bw/2,H-34-hh,cnt[k],"");}
  let all=true;for(let k=1;k<=n;k++)if(cnt[k]!==sS1[n][k])all=false;
  let two=n>=2?sFact(n-1)*Array.from({length:n-1},(_,i)=>1/(i+1)).reduce((p,q)=>p+q,0):null;
  $("#ad-c-info").innerHTML=`${sFact(n)} permutáció, ciklusszám szerinti darabszámok: ${cnt.slice(1).join(", ")}<br>egyezik az elsőfajú Stirling-számokkal ${ok(all)}`+(two!==null?` &nbsp;·&nbsp; (n−1)!·H<sub>n−1</sub> = ${Math.round(two)} = [n 2] = ${sS1[n][2]} ${ok(Math.round(two)===sS1[n][2])}`:"");
}
$("#ad-c-n").addEventListener("input",sdCy);sdCy();
