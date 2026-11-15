/* ================= 6.2 HARMONIKUS SZÁMOK ================= */
const hnR=n=>{let s=rat(0);for(let k=1;k<=n;k++)s=s.add(rat(1,k));return s;};
const hnF=n=>{let s=0;for(let k=n;k>=1;k--)s+=1/k;return s;};
const hGamma=0.5772156649015329;
c2hero("harmonikus-bevezeto",800,12,fr=>{
  const s=$("#ae-hero"),W=420,H=250,n=1+fr;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);let acc=0;const bw=(W-40)/12;
  for(let k=1;k<=12;k++){const h=1/k*150,x=20+(k-1)*bw,on=k<=n;if(on)acc+=1/k;
    el("rect",{x:x+2,y:H-30-h,width:bw-4,height:h,rx:3,style:`fill:var(--accent);opacity:${on?.85:.15}`},s);txt(s,x+bw/2,H-12,k,"");}
  $("#ae-hero-a").textContent="n = "+n;$("#ae-hero-b").textContent=fm(+acc.toFixed(4));
});
function aeN(){
  const e=+$("#ae-n-e").value,n=10**e;$("#ae-n-ev").textContent=e;
  const h=hnF(n),as=Math.log(n)+hGamma+1/(2*n)-1/(12*n*n);
  $("#ae-n-info").innerHTML=`n = 10<sup>${e}</sup>: H<sub>n</sub> = ${(+h.toFixed(10)).toString().replace(".",",")}<br>ln n + γ + 1/(2n) − 1/(12n²) = ${(+as.toFixed(10)).toString().replace(".",",")}<br>különbség: ${(h-as).toExponential(2).replace(".",",")} ${ok(Math.abs(h-as)<1e-8)} &nbsp;·&nbsp; H<sub>n</sub> − ln n = ${(+(h-Math.log(n)).toFixed(8)).toString().replace(".",",")} → γ ≈ 0,5772`;
}
$("#ae-n-e").addEventListener("input",aeN);aeN();
function aeM(){
  const m=+$("#ae-n-m").value;$("#ae-n-mv").textContent=m;let s=0,n=0;while(s<=m){n++;s+=1/n;}
  const est=Math.exp(m-hGamma);
  $("#ae-n-info2").innerHTML=`legkisebb n, amelyre H<sub>n</sub> &gt; ${m}: <b>${n}</b><br>becslés e<sup>m−γ</sup> = ${fm(+est.toFixed(2))} (eltérés: ${fm(+(n-est).toFixed(2))})`;
}
$("#ae-n-m").addEventListener("input",aeM);aeM();
function aeO(){
  const n=+$("#ae-o-n").value;$("#ae-o-nv").textContent=n;
  const H=hnR(n);let s1=rat(0),s2=rat(0),s3=rat(0),h2=rat(0);
  for(let k=1;k<=n;k++){const Hk=hnR(k);s1=s1.add(Hk);s2=s2.add(Hk.mul(rat(k)));s3=s3.add(Hk.div(rat(k)));h2=h2.add(rat(1,k*k));}
  const c1=H.mul(rat(n+1)).sub(rat(n)),c2=H.mul(rat(n*(n+1),2)).sub(rat(n*(n-1),4)),c3=H.mul(H).add(h2).div(rat(2));
  $("#ae-o-tb").innerHTML=`<tr><th>összeg</th><th>közvetlen</th><th>zárt alak</th></tr>
  <tr><td>ΣH<sub>k</sub></td><td>${s1}</td><td>${c1}</td></tr><tr><td>ΣkH<sub>k</sub></td><td>${s2}</td><td>${c2}</td></tr><tr><td>ΣH<sub>k</sub>/k</td><td>${s3}</td><td>${c3}</td></tr>`;
  $("#ae-o-info").innerHTML=`mindhárom zárt alak egyezik a közvetlen összeggel ${ok(s1.eq(c1)&&s2.eq(c2)&&s3.eq(c3))}`;
}
$("#ae-o-n").addEventListener("input",aeO);aeO();
