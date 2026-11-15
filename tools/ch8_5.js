/* ================= 8.5 HASÍTÁSI TECHNIKÁK ================= */
function boRng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const boBin2=n=>n*(n-1)/2;
function boEnum(m,n){/* összes m^n hozzárendelés: ütköző párok összege, üres rekeszek összege, ütközésmentesek száma */
  const total=m**n,h=Array(n).fill(0),cnt=Array(m);let pairs=0,empty=0,free=0;
  for(let t=0;t<total;t++){cnt.fill(0);for(let i=0;i<n;i++)cnt[h[i]]++;let pr=0,em=0;for(let r=0;r<m;r++){pr+=cnt[r]*(cnt[r]-1)/2;if(!cnt[r])em++;}pairs+=pr;empty+=em;if(pr===0)free++;
    for(let i=0;i<n;i++){if(++h[i]<m)break;h[i]=0;}}
  return {total,pairs,empty,free};
}
c2hero("hasitas-bevezeto",700,16,fr=>{
  const s=c2svg("#bo-hero",420,250),m=16,N=fr*2+2,rnd=boRng(7),cnt=Array(m).fill(0);
  for(let i=0;i<N;i++)cnt[Math.floor(rnd()*m)]++;
  const w=22,x0=(420-m*w)/2;let pairs=0;
  cnt.forEach((c,r)=>{pairs+=c*(c-1)/2;for(let k=0;k<c;k++)el("rect",{x:x0+r*w+2,y:205-(k+1)*16,width:w-4,height:14,rx:2,style:"fill:var(--accent);opacity:.6"},s);});
  $("#bo-hero-b").textContent=`${N} kulcs, ${pairs} ütköző pár (várható ${(boBin2(N)/m).toFixed(2)})`;
});
function boL(){
  const m=+$("#bo-l-m").value,n=+$("#bo-l-n").value;$("#bo-l-mv").textContent=m;$("#bo-l-nv").textContent=n;
  if(m**n>1000000){$("#bo-l-info").innerHTML=`m<sup>n</sup> = ${m**n} > 300 000: a felsorolás kimarad. Képlet: C(n,2)/m = ${rat(n*(n-1)/2,m)}`;return;}
  const r=boEnum(m,n),avg=rat(r.pairs,r.total),f=rat(n*(n-1)/2,m);
  $("#bo-l-info").innerHTML=`${r.total} hozzárendelés felsorolva: ütköző párok átlaga = <b>${avg}</b><br>C(${n},2)/${m} = ${f} ${ok(avg.eq(f))}<br>sikeres keresés (láncolás) = 1 + (n−1)/(2m) = ${rat(1).add(rat(n-1,2*m))}`;
}
["#bo-l-m","#bo-l-n"].forEach(i=>$(i).addEventListener("input",boL));boL();
function boU(){
  const m=+$("#bo-u-m").value,n=+$("#bo-u-n").value;$("#bo-u-mv").textContent=m;$("#bo-u-nv").textContent=n;
  const empty=Math.pow(1-1/m,n)*m;
  const pfF=(()=>{let p=1;for(let i=0;i<n;i++)p*=Math.max(0,1-i/m);return p;})(),approx=Math.exp(-n*(n-1)/(2*m));
  let html=`P(nincs ütközés) = ${pfF.toFixed(6)} (pontos szorzat)<br>e<sup>−n(n−1)/(2m)</sup> = ${approx.toFixed(6)} (közelítés, felső korlát ${ok(pfF<=approx+1e-12)})<br>üres rekeszek várható száma = ${empty.toFixed(4)}`;
  if(m**n<=1000000){const r=boEnum(m,n);html+=`<br>felsorolás (${r.total} hozzárendelés): ütközésmentes ${r.free}/${r.total} = ${(r.free/r.total).toFixed(6)} ${ok(Math.abs(r.free/r.total-pfF)<1e-12)}, üres rekeszek átlaga ${(r.empty/r.total).toFixed(4)} ${ok(Math.abs(r.empty/r.total-empty)<1e-9)}`;}
  else{const rnd=boRng(99),T=5000;let free=0,em=0;for(let t=0;t<T;t++){const c=Array(m).fill(0);let col=false;for(let i=0;i<n;i++){const r=Math.floor(rnd()*m);if(c[r])col=true;c[r]++;}if(!col)free++;em+=c.filter(x=>!x).length;}
    html+=`<br>szimuláció (${T} kísérlet): ütközésmentes ${(free/T).toFixed(4)}, üres rekeszek átlaga ${(em/T).toFixed(2)}`;}
  $("#bo-u-info").innerHTML=html;
}
["#bo-u-m","#bo-u-n"].forEach(i=>$(i).addEventListener("input",boU));boU();
function boP(){
  const m=+$("#bo-p-m").value,a=+$("#bo-p-a").value/100,n=Math.round(a*m);$("#bo-p-av").textContent=(n/m).toFixed(2).replace(".",",");
  const rnd=boRng(2024),T=60;let sS=0,sU=0;
  for(let t=0;t<T;t++){const tab=new Uint8Array(m);let disp=0;
    for(let i=0;i<n;i++){let h=Math.floor(rnd()*m),d=0;while(tab[h]){h=(h+1)%m;d++;}tab[h]=1;disp+=d+1;}
    sS+=disp/n;
    /* sikertelen: minden rekeszből indulva a próbák száma */
    let tot=0;for(let h0=0;h0<m;h0++){let h=h0,p=1;while(tab[h]){h=(h+1)%m;p++;}tot+=p;}sU+=tot/m;}
  const al=n/m,S=0.5*(1+1/(1-al)),U=0.5*(1+1/((1-al)*(1-al)));
  $("#bo-p-info").innerHTML=`m = ${m}, n = ${n}, α = ${al.toFixed(3)}, ${T} tábla<br>sikeres: mért ${(sS/T).toFixed(3)}, képlet ${S.toFixed(3)} (eltérés ${(100*((sS/T)/S-1)).toFixed(1)}%)<br>sikertelen: mért ${(sU/T).toFixed(3)}, képlet ${U.toFixed(3)} (eltérés ${(100*((sU/T)/U-1)).toFixed(1)}%)`;
}
$("#bo-p-m").addEventListener("change",boP);$("#bo-p-a").addEventListener("input",boP);boP();
