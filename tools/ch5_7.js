/* ================= 5.7 PARCIÁLIS HIPERGEOMETRIKUS SOROK ================= */
const beFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const beBin=(n,k)=>k<0||k>n||n<0?0n:beFact(n)/(beFact(k)*beFact(n-k));
c2hero("parcialis-bevezeto",380,13,fr=>{
  const n=12,m=Math.min(fr,n),s=c2svg("#be-hero",420,250),w=26,x0=(420-(n+1)*w)/2;
  let S=0n;for(let k=0;k<=m;k++)S+=beBin(n,k);
  for(let k=0;k<=n;k++){let T=0n;for(let j=0;j<=k;j++)T+=beBin(n,j);const h=Number(T*1000n/4096n)/1000*170;
    el("rect",{x:x0+k*w+2,y:205-h,width:w-4,height:h,rx:3,style:`fill:var(--accent);opacity:${k<=m?.6:.15}`},s);txt(s,x0+k*w+w/2,222,k,"","middle");}
  el("line",{x1:x0,y1:205-170,x2:x0+(n+1)*w,y2:205-170,style:"stroke:var(--line);stroke-dasharray:3 3"},s);
  txt(s,x0+(n+1)*w-4,205-174,"2ⁿ = 4096","","end");
  $("#be-hero-a").textContent="n = 12, Σ C(12,k), k ≤ m";$("#be-hero-b").textContent=`m = ${m}: ${S}/4096 = ${(Number(S)/4096).toFixed(3).replace(".",",")}`;
});
function beZ(){
  const f=$("#be-z-f").value,p=+$("#be-z-p").value;$("#be-z-pv").textContent=p;
  const M=Math.min(p+3,10),rows=[];let S=0n,all=true;
  for(let m=0;m<=M;m++){
    const t=f==="alt"?(m%2?-1n:1n)*beBin(p,m):beBin(p+m,m);S+=t;
    const form=f==="alt"?(m%2?-1n:1n)*beBin(p-1,m):beBin(p+m+1,m);
    if(S!==form)all=false;rows.push([m,t,S,form]);}
  $("#be-z-t").innerHTML="<tr><th>m</th>"+rows.map(r=>`<td>${r[0]}</td>`).join("")+"</tr><tr><th>tₘ</th>"+rows.map(r=>`<td>${r[1]}</td>`).join("")+"</tr><tr><th>Sₘ</th>"+rows.map(r=>`<td>${r[2]}</td>`).join("")+"</tr><tr><th>képlet</th>"+rows.map(r=>`<td>${r[3]}</td>`).join("")+"</tr>";
  $("#be-z-info").innerHTML=(f==="alt"?`Sₘ = (−1)<sup>m</sup>·C(${p}−1, m)`:`Sₘ = C(${p}+m+1, m)`)+` minden m ≤ ${M}-re ${ok(all)}`;
}
$("#be-z-f").addEventListener("change",beZ);$("#be-z-p").addEventListener("input",beZ);beZ();
function beR(){
  const n=+$("#be-r-n").value,x=BigInt($("#be-r-x").value);$("#be-r-nv").textContent=n;
  const S=(N,m)=>{let s=0n,xp=1n;for(let k=0;k<=m;k++){s+=beBin(N,k)*xp;xp*=x;}return s;};
  const pw=(b,e)=>{let r=1n;for(let i=0;i<e;i++)r*=b;return r;};
  const rows=[];let all=true;
  for(let m=0;m<=n+1;m++){const a=S(n,m),b=S(n+1,m),c=(1n+x)*a-beBin(n,m)*pw(x,m+1);if(b!==c)all=false;rows.push([m,a,b,c]);}
  $("#be-r-t").innerHTML="<tr><th>m</th>"+rows.map(r=>`<td>${r[0]}</td>`).join("")+`</tr><tr><th>S(${n},m)</th>`+rows.map(r=>`<td>${r[1]}</td>`).join("")+`</tr><tr><th>S(${n+1},m)</th>`+rows.map(r=>`<td>${r[2]}</td>`).join("")+"</tr><tr><th>(1+x)S − C·x<sup>m+1</sup></th>"+rows.map(r=>`<td>${r[3]}</td>`).join("")+"</tr>";
  $("#be-r-info").innerHTML=`S(n+1,m) = (1+x)·S(n,m) − C(n,m)·x<sup>m+1</sup> minden m ≤ ${n+1}-re ${ok(all)}`;
}
$("#be-r-n").addEventListener("input",beR);$("#be-r-x").addEventListener("change",beR);beR();
function beM(){
  const n=+$("#be-m-n").value;$("#be-m-nv").textContent=n;
  let num=0n;for(let k=0;k<=n;k++)num+=beBin(n+k,k)<<BigInt(n-k);
  const target=1n<<BigInt(n)<<BigInt(n);
  $("#be-m-info").innerHTML=`Σ<sub>k=0..n</sub> C(n+k,k)·2<sup>−k</sup> = ${num}/2<sup>${n}</sup> = ${num===target?"2<sup>"+n+"</sup>":"?"} ${ok(num===target)}<br>minden n ≤ ${n}-re: ${ok((()=>{for(let q=1;q<=n;q++){let s=0n;for(let k=0;k<=q;k++)s+=beBin(q+k,k)<<BigInt(q-k);if(s!==(1n<<BigInt(2*q)))return false;}return true;})())}`;
}
$("#be-m-n").addEventListener("input",beM);beM();
