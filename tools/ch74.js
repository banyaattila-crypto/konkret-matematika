/* ================= 7.6 EXPONENCIÁLIS GENERÁTORFÜGGVÉNYEK ================= */
const eFact=n=>{let r=1n;for(let i=2;i<=n;i++)r*=BigInt(i);return r;};
const eRat=(seq,N)=>Array.from({length:N},(_,n)=>rat(seq(n),eFact(n)));
const eMul=(a,b,N)=>{const c=Array(N).fill(0).map(()=>rat(0));for(let i=0;i<N;i++)for(let j=0;i+j<N;j++)c[i+j]=c[i+j].add(a[i].mul(b[j]));return c;};
const eSeqs=[n=>1n,n=>2n**BigInt(n),n=>eFact(n),n=>n%2?-1n:1n];
const eNames=["1","2ⁿ","n!","(−1)ⁿ"];
c2hero("gfexp-bevezeto",800,9,fr=>{
  const s=$("#al-hero"),W=420,H=250,n=2+fr,inv=1/Math.E;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const D=m=>{let a=1,b=0;if(m===0)return 1;for(let i=2;i<=m;i++){[a,b]=[b,(i-1)*(a+b)];}return b;};
  const y=v=>H-30-(v-0.3)*(H-60)/0.25,x=k=>30+(k-2)*(W-60)/8,f=m=>{let a=0,b=1;for(let i=2;i<=m;i++){[a,b]=[b,(i-1)*(a+b)];}let fac=1;for(let i=2;i<=m;i++)fac*=i;return b/fac;};
  el("line",{x1:20,x2:W-10,y1:y(inv),y2:y(inv),style:"stroke:var(--accent-2);stroke-dasharray:4 4"},s);txt(s,W-30,y(inv)-6,"1/e","");
  for(let k=2;k<=n;k++){el("circle",{cx:x(k),cy:y(f(k)),r:5,style:`fill:var(--accent);opacity:${k===n?1:.5}`},s);txt(s,x(k),H-10,k,"");}
  $("#al-hero-a").textContent="n = "+n;$("#al-hero-b").textContent=fm(+f(n).toFixed(5));
});
function alS(){
  const ia=+$("#al-s-a").value,ib=+$("#al-s-b").value,N=10;
  const A=eRat(eSeqs[ia],N),B=eRat(eSeqs[ib],N),P=eMul(A,B,N);
  const lhs=P.map((v,n)=>v.mul(rat(eFact(n)))),rhs=[];
  for(let n=0;n<N;n++){let s=rat(0);for(let k=0;k<=n;k++)s=s.add(rat(bC(n,k)).mul(rat(eSeqs[ia](k))).mul(rat(eSeqs[ib](n-k))));rhs.push(s);}
  $("#al-s-info").innerHTML=`c<sub>n</sub> = n!·[xⁿ](Â·B̂): ${lhs.join(", ")}, …<br>c<sub>n</sub> = Σ C(n,k)·a<sub>k</sub>·b<sub>n−k</sub>: ${rhs.join(", ")}, …<br>egyezik (n &lt; ${N}) ${ok(lhs.every((v,n)=>v.eq(rhs[n])))}`;
}
["#al-s-a","#al-s-b"].forEach(i=>$(i).addEventListener("input",alS));alS();
function alB(){
  const n=+$("#al-b-n").value;let k=+$("#al-b-k").value;if(k>n){k=n;$("#al-b-k").value=n;}$("#al-b-nv").textContent=n;$("#al-b-kv").textContent=k;
  const N=13,ex=eRat(m=>1n,N);const em1=ex.map((v,i)=>i?v:rat(0));
  /* (e^x-1)^k / k! */
  let pw=[rat(1),...Array(N-1).fill(0).map(()=>rat(0))];for(let t=0;t<k;t++)pw=eMul(pw,em1,N);
  const st=pw[n].mul(rat(eFact(n))).div(rat(eFact(k)));
  /* Bell: exp(e^x-1) deriváltjából */
  const B=[1n];for(let m=0;m<12;m++){let s=0n;for(let j=0;j<=m;j++)s+=BigInt(bC(m,j))*B[j];B.push(s);}
  let rows=0n;for(let j=0;j<=n;j++)rows+=BigInt(sS2[n][j]);
  $("#al-b-info").innerHTML=`n!/k!·[xⁿ](eˣ−1)<sup>k</sup> = ${st} &nbsp;·&nbsp; {${n} ${k}} = ${sS2[n][k]} ${ok(st.eq(rat(sS2[n][k])))}<br>szürjekciók (k! {n k}): ${sS2[n][k]*sFact(k)}<br>Bell-számok a rekurzióból: ${B.slice(0,10).join(", ")}, …<br>B<sub>${n}</sub> = ${B[n]} = a {${n} k} sor összege ${ok(B[n]===rows)}`;
}
["#al-b-n","#al-b-k"].forEach(i=>$(i).addEventListener("input",alB));alB();
function alD(){
  const n=+$("#al-d-n").value;$("#al-d-nv").textContent=n;
  const N=BigInt(n);let fm1=0n,f=eFact(n);for(let k=0;k<=n;k++){const t=f/eFact(k);fm1+=k%2?-t:t;}
  const Dr=[1n,0n];for(let i=2;i<=n;i++)Dr.push(BigInt(i-1)*(Dr[i-1]+Dr[i-2]));
  const Ir=[1n,1n];for(let i=2;i<=n;i++)Ir.push(Ir[i-1]+BigInt(i-1)*Ir[i-2]);
  let brute="",bok=true;
  if(n<=8){let d=0,inv=0;const a=Array.from({length:n},(_,i)=>i);const g=k=>{if(k===n){if(a.every((v,i)=>v!==i))d++;if(a.every((v,i)=>a[v]===i))inv++;return;}for(let i=k;i<n;i++){[a[k],a[i]]=[a[i],a[k]];g(k+1);[a[k],a[i]]=[a[i],a[k]];}};g(0);
    brute=`<br>összes permutáció végigszámolva: fixpontmentes ${d}, involúció ${inv} ${ok(BigInt(d)===fm1&&BigInt(inv)===Ir[n])}`;}
  const rnd=n>=1?Math.round(Number(f)/Math.E):1;
  $("#al-d-info").innerHTML=`D<sub>${n}</sub> képlettel: <b>${fm1}</b> &nbsp;·&nbsp; rekurzióval: ${Dr[n]} ${ok(fm1===Dr[n])}<br>involúciók I<sub>${n}</sub> = ${Ir[n]}${brute}<br>D<sub>n</sub>/n! = ${fm(+(Number(fm1)/Number(f)).toFixed(8))} &nbsp;·&nbsp; 1/e = 0,36787944<br>${n<=15?`D<sub>n</sub> = kerekítés(n!/e) = ${rnd} ${ok(BigInt(rnd)===fm1)}`:"(a kerekítéses ellenőrzés n ≤ 15-ig pontos lebegőpontosan)"}`;
}
$("#al-d-n").addEventListener("input",alD);alD();
