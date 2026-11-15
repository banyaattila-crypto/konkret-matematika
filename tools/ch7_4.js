/* ================= 7.4 SPECIÁLIS GENERÁTORFÜGGVÉNYEK ================= */
const bkFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const bkBin=(n,k)=>k<0||k>n||n<0?0n:bkFact(n)/(bkFact(k)*bkFact(n-k));
const bkH=n=>{let s=rat(0);for(let k=1;k<=n;k++)s=s.add(rat(1,k));return s;};
function bkStir(N,K){const S=[];for(let n=0;n<=N;n++){S[n]=[];for(let k=0;k<=K;k++)S[n][k]=(n===0&&k===0)?1n:(n===0||k===0)?0n:S[n-1][k-1]+BigInt(k)*S[n-1][k];}return S;}
function bkSer(k,N){/* z^k / prod(1-jz) együtthatói n=0..N */
  let c=Array(N+1).fill(0n);c[0]=1n;
  for(let j=1;j<=k;j++){for(let n=1;n<=N;n++)c[n]+=BigInt(j)*c[n-1];}
  const r=Array(N+1).fill(0n);for(let n=k;n<=N;n++)r[n]=c[n-k];return r;
}
function bkBern(M){const B=[rat(1)];for(let m=1;m<=M;m++){let s=rat(0);for(let j=0;j<m;j++)s=s.add(rat(bkBin(m+1,j)).mul(B[j]));B[m]=s.neg().div(rat(m+1));}return B;}
c2hero("gfspec-bevezeto",900,14,fr=>{
  const s=c2svg("#bk-hero",420,250),S=bkStir(18,3),N=Math.min(fr+3,16),x0=26,w=24;
  const lg=n=>Math.log10(Number(S[n][3])),mx=lg(16);
  for(let n=3;n<=16;n++){const h=lg(n)/mx*170;el("rect",{x:x0+(n-3)*w+3,y:205-h,width:w-6,height:h,rx:2,style:`fill:var(--accent);opacity:${n<=N?.6:.14}`},s);if(n%3===0)txt(s,x0+(n-3)*w+w/2,222,n,"","middle");}
  $("#bk-hero-b").textContent=`n = ${N}: ${S[N][3]}`;
});
function bkHm(){
  const m=+$("#bk-h-m").value,n=+$("#bk-h-n").value;$("#bk-h-mv").textContent=m;$("#bk-h-nv").textContent=n;
  let c=rat(0);for(let k=1;k<=n;k++)c=c.add(rat(1,k).mul(rat(bkBin(n-k+m,m))));
  const f=rat(bkBin(n+m,m)).mul(bkH(n+m).sub(bkH(m)));
  $("#bk-h-info").innerHTML=`z<sup>${n}</sup> együtthatója a ln(1/(1−z))/(1−z)<sup>${m+1}</sup> sorban = <b>${c}</b><br>C(n+m,m)·(H<sub>n+m</sub> − H<sub>m</sub>) = ${f} ${ok(c.eq(f))}`+(m===0?`<br>H<sub>${n}</sub> = ${bkH(n)} ${ok(c.eq(bkH(n)))}`:"");
}
["#bk-h-m","#bk-h-n"].forEach(i=>$(i).addEventListener("input",bkHm));bkHm();
function bkSt(){
  const k=+$("#bk-s-k").value,N=+$("#bk-s-n").value;$("#bk-s-kv").textContent=k;$("#bk-s-nv").textContent=N;
  const ser=bkSer(k,N),S=bkStir(N,k);let good=true;const row=[];
  for(let n=0;n<=N;n++){row.push(ser[n]);if(ser[n]!==S[n][k])good=false;}
  $("#bk-s-t").innerHTML="<tr><th>n</th>"+row.map((_,n)=>`<td>${n}</td>`).join("")+"</tr><tr><th>[zⁿ] S<sub>k</sub></th>"+row.map(v=>`<td>${v}</td>`).join("")+"</tr>";
  $("#bk-s-info").innerHTML=`S<sub>${k}</sub>(z) = z<sup>${k}</sup>/∏(1−jz), együtthatók n ≤ ${N}-ig<br>egyezés a rekurzióval számolt {n,${k}} értékekkel: ${ok(good)}`+(k===2?`<br>{n,2} = 2<sup>n−1</sup> − 1: ${ok(row.every((v,n)=>n<2?v===0n:v===(2n**BigInt(n-1))-1n))}`:"");
}
["#bk-s-k","#bk-s-n"].forEach(i=>$(i).addEventListener("input",bkSt));bkSt();
function bkBr(){
  const M=+$("#bk-b-m").value;$("#bk-b-mv").textContent=M;const B=bkBern(M);let good=true;
  for(let m=1;m<=M;m++){let s=rat(0);for(let j=0;j<=m;j++)s=s.add(rat(bkBin(m+1,j)).mul(B[j]));if(!s.eq(rat(0)))good=false;}
  let odd=true;for(let j=3;j<=M;j+=2)if(!B[j].eq(rat(0)))odd=false;
  $("#bk-b-t").innerHTML="<tr><th>j</th>"+B.map((_,j)=>`<td>${j}</td>`).join("")+"</tr><tr><th>B<sub>j</sub></th>"+B.map(b=>`<td>${b}</td>`).join("")+"</tr>";
  $("#bk-b-info").innerHTML=`Σ C(m+1,j)·B<sub>j</sub> = 0, 1 ≤ m ≤ ${M}: ${ok(good)}<br>páratlan j ≥ 3: B<sub>j</sub> = 0: ${ok(odd)}`;
}
$("#bk-b-m").addEventListener("input",bkBr);bkBr();
