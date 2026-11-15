/* ================= 6.2 EULER-SZÁMOK ================= */
const bgFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const bgBin=(n,k)=>k<0||k>n||n<0?0n:bgFact(n)/(bgFact(k)*bgFact(n-k));
function bgRec(n){let row=[1n];for(let m=2;m<=n;m++){const nr=[];for(let k=0;k<m;k++)nr.push(BigInt(k+1)*(row[k]||0n)+BigInt(m-k)*(k>0?row[k-1]||0n:0n));row=nr;}return row;}
const bgForm=(n,k)=>{let s=0n;for(let j=0;j<=k+1;j++)s+=(j%2?-1n:1n)*bgBin(n+1,j)*BigInt(k+1-j)**BigInt(n);return s;};
function bgBrute(n){const c=Array(n).fill(0n),a=[...Array(n).keys()];
  (function rec(l,used,k,last){if(l===n){c[k]++;return;}for(let v=0;v<n;v++)if(!(used>>v&1))rec(l+1,used|1<<v,k+(l>0&&last<v?1:0),v);})(0,0,0,-1);return c;}
c2hero("eulerszam-bevezeto",520,8,fr=>{
  const n=fr+2,s=c2svg("#bg-hero",420,250),row=bgRec(n).map(Number),mx=Math.max(...row),w=Math.min(36,380/n),x0=(420-n*w)/2;
  row.forEach((v,k)=>{const h=v/mx*170;el("rect",{x:x0+k*w+2,y:205-h,width:w-4,height:h,rx:3,style:"fill:var(--accent);opacity:.55"},s);txt(s,x0+k*w+w/2,222,k,"","middle");if(w>=22)txt(s,x0+k*w+w/2,199-h,v,"","middle");});
  $("#bg-hero-a").textContent=`n = ${n}`;$("#bg-hero-b").textContent=`Σ A(${n},k) = ${row.reduce((a,b)=>a+b,0)} = ${n}!`;
});
function bgR(){
  const n=+$("#bg-r-n").value;$("#bg-r-nv").textContent=n;
  const br=bgBrute(n),rc=bgRec(n),fm_=Array.from({length:n},(_,k)=>bgForm(n,k));
  $("#bg-r-t").innerHTML="<tr><th>k</th>"+br.map((_,k)=>`<td>${k}</td>`).join("")+"</tr><tr><th>számlálás</th>"+br.map(x=>`<td>${x}</td>`).join("")+"</tr><tr><th>rekurzió</th>"+rc.map(x=>`<td>${x}</td>`).join("")+"</tr><tr><th>zárt képlet</th>"+fm_.map(x=>`<td>${x}</td>`).join("")+"</tr>";
  const sum=br.reduce((a,b)=>a+b,0n),sym=br.every((x,i)=>x===br[n-1-i]);
  $("#bg-r-info").innerHTML=`${bgFact(n)} permutáció (${n}!) · számlálás = rekurzió = képlet ${ok(br.every((x,i)=>x===rc[i]&&x===fm_[i]))} · összeg = ${sum} ${ok(sum===bgFact(n))} · szimmetria ${ok(sym)}`;
}
$("#bg-r-n").addEventListener("input",bgR);bgR();
function bgW(){
  const n=+$("#bg-w-n").value,x=+$("#bg-w-x").value;$("#bg-w-nv").textContent=n;$("#bg-w-xv").textContent=x;
  const row=bgRec(n),terms=row.map((a,k)=>a*bgBin(x+k,n)),S=terms.reduce((a,b)=>a+b,0n),P=BigInt(x)**BigInt(n);
  $("#bg-w-t").innerHTML="<tr><th>k</th>"+row.map((_,k)=>`<td>${k}</td>`).join("")+"</tr><tr><th>A(n,k)</th>"+row.map(a=>`<td>${a}</td>`).join("")+`</tr><tr><th>C(x+k,n)</th>`+row.map((_,k)=>`<td>${bgBin(x+k,n)}</td>`).join("")+"</tr><tr><th>szorzat</th>"+terms.map(t=>`<td>${t}</td>`).join("")+"</tr>";
  $("#bg-w-info").innerHTML=`Σ A(n,k)·C(x+k,n) = ${S}, x<sup>n</sup> = ${x}<sup>${n}</sup> = ${P} ${ok(S===P)}`;
}
["#bg-w-n","#bg-w-x"].forEach(i=>$(i).addEventListener("input",bgW));bgW();
