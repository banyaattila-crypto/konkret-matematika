/* ================= 8.2 VÁRHATÓ ÉRTÉK ÉS SZÓRÁS ================= */
c2hero("varhato-bevezeto",900,6,fr=>{
  const n=2+fr,s=$("#ao-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const D=[1,0];for(let i=2;i<=n;i++)D.push((i-1)*(D[i-1]+D[i-2]));let f=1;for(let i=2;i<=n;i++)f*=i;
  const pr=Array.from({length:n+1},(_,k)=>bC(n,k)*D[n-k]/f),bw=(W-60)/(n+1);
  pr.forEach((p,k)=>{const h=p*180;el("rect",{x:30+k*bw+3,y:H-30-h,width:bw-6,height:Math.max(h,0.5),rx:3,style:"fill:var(--accent);opacity:.85"},s);txt(s,30+k*bw+bw/2,H-12,k,"");});
  const mu=pr.reduce((a,p,k)=>a+p*k,0),x=30+mu*bw+bw/2;
  el("line",{x1:x,x2:x,y1:20,y2:H-30,style:"stroke:var(--accent-2);stroke-width:2;stroke-dasharray:4 3"},s);
  const v=pr.reduce((a,p,k)=>a+p*k*k,0)-mu*mu;
  $("#ao-hero-a").textContent="n = "+n;$("#ao-hero-b").textContent=fm(+v.toFixed(4));
});
function aoL(){
  const n=+$("#ao-l-n").value;$("#ao-l-nv").textContent=n;
  let fx=0,cy=0,rc=0,cnt=0;const a=Array.from({length:n},(_,i)=>i);
  const eval1=()=>{cnt++;let f=0;for(let i=0;i<n;i++)if(a[i]===i)f++;fx+=f;
    const seen=Array(n).fill(false);let c=0;for(let i=0;i<n;i++)if(!seen[i]){c++;let j=i;while(!seen[j]){seen[j]=true;j=a[j];}}cy+=c;
    let mx=-1,r=0;for(let i=0;i<n;i++)if(a[i]>mx){mx=a[i];r++;}rc+=r;};
  const g=k=>{if(k===n){eval1();return;}for(let i=k;i<n;i++){[a[k],a[i]]=[a[i],a[k]];g(k+1);[a[k],a[i]]=[a[i],a[k]];}};g(0);
  const H=hnR(n),m1=rat(fx,cnt),m2=rat(cy,cnt),m3=rat(rc,cnt);
  $("#ao-l-info").innerHTML=`${cnt} permutáció<br>fixpontok átlaga: ${m1} &nbsp;·&nbsp; képlet: 1 ${ok(m1.eq(rat(1)))}<br>ciklusok átlaga: ${m2} &nbsp;·&nbsp; H<sub>${n}</sub> = ${H} ${ok(m2.eq(H))}<br>balról jobbra rekordok átlaga: ${m3} &nbsp;·&nbsp; H<sub>${n}</sub> ${ok(m3.eq(H))}`;
}
$("#ao-l-n").addEventListener("input",aoL);aoL();
function aoS(){
  const n=+$("#ao-s-n").value,P=+$("#ao-s-p").value;$("#ao-s-nv").textContent=n;$("#ao-s-pv").textContent=P;
  const p=rat(P,100),q=rat(100-P,100);let E=rat(0),E2=rat(0),pm=[];
  for(let k=0;k<=n;k++){let pk=rat(bC(n,k));for(let i=0;i<k;i++)pk=pk.mul(p);for(let i=0;i<n-k;i++)pk=pk.mul(q);pm.push(pk);E=E.add(pk.mul(rat(k)));E2=E2.add(pk.mul(rat(k*k)));}
  const V=E2.sub(E.mul(E)),tot=pm.reduce((a,b)=>a.add(b),rat(0));
  const W=640,H=160,s=c2svg("#ao-s-svg",W,H),mx=Math.max(...pm.map(x=>x.num())),bw=(W-40)/(n+1);
  pm.forEach((x,k)=>{const h=x.num()/mx*(H-40);el("rect",{x:20+k*bw+2,y:H-22-h,width:Math.max(2,bw-4),height:h,rx:2,style:"fill:var(--accent);opacity:.8"},s);});
  txt(s,20,H-6,0,"");txt(s,W-20,H-6,n,"");
  const En=p.mul(rat(n)),Vn=p.mul(q).mul(rat(n));
  $("#ao-s-info").innerHTML=`összeg a definícióból: P(0…n) összege = ${tot} ${ok(tot.eq(rat(1)))}<br>E = ${E} &nbsp;·&nbsp; np = ${En} ${ok(E.eq(En))}<br>Var = E[X²] − E² = ${V} &nbsp;·&nbsp; np(1−p) = ${Vn} ${ok(V.eq(Vn))}`;
}
["#ao-s-n","#ao-s-p"].forEach(i=>$(i).addEventListener("input",aoS));aoS();
