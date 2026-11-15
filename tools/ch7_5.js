/* ================= 7.5 KONVOLÚCIÓK ================= */
const blFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const blBin=(n,k)=>k<0||k>n||n<0?0n:blFact(n)/(blFact(k)*blFact(n-k));
const blCat=n=>blBin(2*n,n)/BigInt(n+1);
function blF(n){let a=0n,b=1n;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;}
function blL(n){let a=2n,b=1n;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;}
c2hero("konvolucio-bevezeto",900,8,fr=>{
  const r=fr+1,s=c2svg("#bl-hero",420,250),w=Math.min(22,380/(2*r+1)),x0=(420-(2*r+1)*w)/2,mx=Number(blBin(2*r,r));
  for(let n=0;n<=2*r;n++){let c=0n;for(let k=0;k<=n;k++)c+=blBin(r,k)*blBin(r,n-k);
    const h=Number(c)/mx*170;el("rect",{x:x0+n*w+2,y:205-h,width:w-4,height:h,rx:2,style:"fill:var(--accent);opacity:.6"},s);}
  $("#bl-hero-b").textContent=`r = ${r}: középső = ${blBin(2*r,r)}`;
});
function blV(){
  const r=+$("#bl-v-r").value,s=+$("#bl-v-s").value,n=+$("#bl-v-n").value;["r","s","n"].forEach((k,i)=>$("#bl-v-"+k+"v").textContent=[r,s,n][i]);
  let a=0n;for(let k=0;k<=n;k++)a+=blBin(r,k)*blBin(s,n-k);
  const m=Math.floor(r/2),l=Math.floor(s/2);let b=0n;for(let k=0;k<=n;k++)b+=blBin(k,m)*blBin(n-k,l);
  $("#bl-v-info").innerHTML=`Σ C(${r},k)·C(${s},${n}−k) = <b>${a}</b>, C(${r+s},${n}) = ${blBin(r+s,n)} ${ok(a===blBin(r+s,n))}<br>Σ<sub>k=0..${n}</sub> C(k,${m})·C(${n}−k,${l}) = <b>${b}</b>, C(${n+1},${m+l+1}) = ${blBin(n+1,m+l+1)} ${ok(b===blBin(n+1,m+l+1))}`;
}
["#bl-v-r","#bl-v-s","#bl-v-n"].forEach(i=>$(i).addEventListener("input",blV));blV();
function blK(){
  const n=+$("#bl-k-n").value;$("#bl-k-nv").textContent=n;
  let a=0n;for(let k=0;k<=n;k++)a+=blBin(2*k,k)*blBin(2*n-2*k,n-k);
  let c=0n;for(let k=0;k<=n;k++)c+=blCat(k)*blCat(n-k);
  $("#bl-k-info").innerHTML=`Σ C(2k,k)·C(2n−2k,n−k) = <b>${a}</b>, 4<sup>${n}</sup> = ${4n**BigInt(n)} ${ok(a===4n**BigInt(n))}<br>Σ C<sub>k</sub>·C<sub>${n}−k</sub> = <b>${c}</b>, C<sub>${n+1}</sub> = ${blCat(n+1)} ${ok(c===blCat(n+1))}`;
}
$("#bl-k-n").addEventListener("input",blK);blK();
function blFi(){
  const n=+$("#bl-f-n").value;$("#bl-f-nv").textContent=n;
  let a=0n;for(let k=0;k<=n;k++)a+=blF(k)*blF(n-k);
  const num=BigInt(n)*blL(n)-blF(n),f=num/5n;
  $("#bl-f-info").innerHTML=`Σ F<sub>k</sub>·F<sub>${n}−k</sub> = <b>${a}</b><br>(nL<sub>n</sub> − F<sub>n</sub>)/5 = (${n}·${blL(n)} − ${blF(n)})/5 = ${f} ${ok(a===f&&num%5n===0n)}`;
}
$("#bl-f-n").addEventListener("input",blFi);blFi();
