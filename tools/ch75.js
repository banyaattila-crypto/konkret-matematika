/* ================= 7.9 FELADATOK ================= */
exHero("feladatokgf-bevezeto","#am-hero","#am-hero-k",[3,3,2,2]);
const amP=pcWays(Array.from({length:100},(_,i)=>i+1),100);
function amR(){
  const n=+$("#am-r-n").value;$("#am-r-nv").textContent=n;
  const tests=[[5,4],[7,5],[11,6]];let all=true;for(const [m,r] of tests)for(let k=0;m*k+r<=100;k++)if(amP[m*k+r]%m!==0)all=false;
  const line=tests.map(([m,r])=>n%m===r%m&&n>=r?`n = ${m}·${(n-r)/m}+${r}: p(n) mod ${m} = ${amP[n]%m}`:null).filter(Boolean);
  $("#am-r-info").innerHTML=`p(${n}) = ${amP[n]}<br>${line.length?line.join("<br>"):"ez az n egyik kongruencia-osztályban sincs"}<br>p(5m+4) ≡ 0 (5), p(7m+5) ≡ 0 (7), p(11m+6) ≡ 0 (11) minden n ≤ 100 helyen ${ok(all)}`;
}
$("#am-r-n").addEventListener("input",amR);amR();
function amE(){
  const n=+$("#am-e-n").value;$("#am-e-nv").textContent=n;const N=60,c=[1,...Array(N).fill(0)];
  let a=c.slice();for(let k=1;k<=N;k++){const d=a.slice();for(let i=0;i<=N;i++){if(i>=k)d[i]+=a[i-k];if(i>=2*k)d[i]+=a[i-2*k];}a=d;}
  const b=pcWays(Array.from({length:N},(_,i)=>i+1).filter(k=>k%3),N);let all=true;for(let i=0;i<=N;i++)if(a[i]!==b[i])all=false;
  $("#am-e-info").innerHTML=`legfeljebb kétszer szereplő tagok: <b>${a[n]}</b> &nbsp;·&nbsp; 3-mal nem osztható tagok: <b>${b[n]}</b> ${ok(a[n]===b[n])}<br>0 ≤ n ≤ 60 minden értékére egyezik ${ok(all)}`;
}
$("#am-e-n").addEventListener("input",amE);amE();
