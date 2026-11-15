/* ================= 8.6 KLASSZIKUS FELADATOK ================= */
const qNoMatch=(n,D)=>{let p=1;for(let k=0;k<n;k++)p*=1-k/D;return p;};
const qRng=seed=>{let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};};
c2hero("klasszikus-bevezeto",700,12,fr=>{
  const n=5*(fr+1),s=$("#aq-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let k=5;k<=60;k+=5){const h=(1-qNoMatch(k,365))*180,x=20+(k/5-1)*(W-40)/12;el("rect",{x:x+2,y:H-30-h,width:(W-40)/12-4,height:Math.max(h,0.5),rx:2,style:`fill:var(--accent);opacity:${k<=n?.85:.15}`},s);txt(s,x+(W-40)/24,H-12,k,"");}
  const y=H-30-0.5*180;el("line",{x1:20,x2:W-20,y1:y,y2:y,style:"stroke:var(--accent-2);stroke-dasharray:4 4"},s);
  $("#aq-hero-a").textContent=`n = ${n} ember`;$("#aq-hero-b").textContent=fm(+(1-qNoMatch(n,365)).toFixed(3));
});
function aqB(){
  const n=+$("#aq-b-n").value,D=+$("#aq-b-d").value;$("#aq-b-nv").textContent=n;
  const W=640,H=170,s=c2svg("#aq-b-svg",W,H),L=100,bw=(W-40)/L;
  for(let k=1;k<=L;k++){const h=(1-qNoMatch(k,D))*(H-40);el("rect",{x:20+(k-1)*bw,y:H-22-h,width:Math.max(1,bw-1),height:Math.max(h,0.3),style:`fill:${k===n?"var(--accent-2)":"var(--accent)"};opacity:${k===n?1:.6}`},s);}
  txt(s,20,H-6,1,"");txt(s,W-20,H-6,L,"");
  const pe=1-qNoMatch(n,D),ap=1-Math.exp(-n*(n-1)/(2*D));let m=1;while(1-qNoMatch(m,D)<0.5)m++;
  $("#aq-b-info").innerHTML=`n = ${n}, D = ${D}: P(egyezés) = <b>${fm(+pe.toFixed(5))}</b><br>exponenciális közelítés: ${fm(+ap.toFixed(5))} (≤ pontos érték ${ok(ap<=pe+1e-12)})<br>a legkisebb n, amelynél P ≥ 50%: <b>${m}</b> &nbsp;·&nbsp; párok száma ekkor: ${m*(m-1)/2}`;
}
["#aq-b-n","#aq-b-d"].forEach(i=>$(i).addEventListener("input",aqB));aqB();
function aqK(){
  const n=+$("#aq-k-n").value;$("#aq-k-nv").textContent=n;
  const H=hnR(n);let H2=rat(0),V=rat(0);for(let k=1;k<=n;k++)H2=H2.add(rat(1,k*k));
  for(let i=1;i<=n;i++)V=V.add(rat(n*(i-1),(n-i+1)**2));
  const E=H.mul(rat(n)),V2=H2.mul(rat(n*n)).sub(E);
  const rnd=qRng(12345);let tot=0;const R=2000;for(let r=0;r<R;r++){const seen=new Set();let t=0;while(seen.size<n){seen.add(Math.floor(rnd()*n));t++;}tot+=t;}
  $("#aq-k-info").innerHTML=`E[T] = n·H<sub>n</sub> = ${E} = ${fm(+E.num().toFixed(4))}<br>Var = Σ n(i−1)/(n−i+1)² = ${V} &nbsp;·&nbsp; n²H<sub>n</sub><sup>(2)</sup> − nH<sub>n</sub> = ${V2} ${ok(V.eq(V2))}<br>szimuláció (${R} futás, rögzített mag): átlag ${fm(+(tot/R).toFixed(3))}, eltérés a várható értéktől ${fm(+(Math.abs(tot/R-E.num())/E.num()*100).toFixed(2))}%`;
}
$("#aq-k-n").addEventListener("input",aqK);aqK();
const aqThomas=(a,b,c,d)=>{const n=b.length,cp=[],dp=[];cp[0]=c[0]/b[0];dp[0]=d[0]/b[0];for(let i=1;i<n;i++){const m=b[i]-a[i]*cp[i-1];cp[i]=c[i]/m;dp[i]=(d[i]-a[i]*dp[i-1])/m;}const x=Array(n);x[n-1]=dp[n-1];for(let i=n-2;i>=0;i--)x[i]=dp[i]-cp[i]*x[i+1];return x;};
function aqR(){
  const P=+$("#aq-r-p").value,N0=+$("#aq-r-n").value;let i=+$("#aq-r-i").value;const N=N0;if(i>N-1){i=N-1;$("#aq-r-i").value=i;}$("#aq-r-i").max=N-1;
  $("#aq-r-pv").textContent=P;$("#aq-r-iv").textContent=i;$("#aq-r-nv").textContent=N;
  const p=P/100,q=1-p,m=N-1,a=[],b=[],c=[],d=[],d2=[];
  for(let k=1;k<=m;k++){a.push(k>1?-q:0);b.push(1);c.push(k<m?-p:0);d.push(k===m?p:0);d2.push(1);}
  const x=aqThomas(a,b,c,d),y=aqThomas(a,b,c,d2),r=q/p;
  const f=P===50?i/N:(1-r**i)/(1-r**N);
  $("#aq-r-info").innerHTML=`p = ${fm(p)}, i = ${i}, N = ${N}: P(siker)<br>egyenletrendszer: ${fm(+x[i-1].toFixed(8))} &nbsp;·&nbsp; képlet: ${fm(+f.toFixed(8))} ${ok(Math.abs(x[i-1]-f)<1e-9)}<br>várható játékhossz (egyenletrendszer): ${fm(+y[i-1].toFixed(4))}`+(P===50?` &nbsp;·&nbsp; i(N−i) = ${i*(N-i)} ${ok(Math.abs(y[i-1]-i*(N-i))<1e-6)}`:`<br>(méltányos játéknál, p = 50%, a képlet i(N−i))`);
}
["#aq-r-p","#aq-r-i","#aq-r-n"].forEach(i=>$(i).addEventListener("input",aqR));aqR();
