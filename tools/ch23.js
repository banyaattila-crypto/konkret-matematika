/* ================= 2.3 ÖSSZEGEK KEZELÉSE ================= */
c2hero("kezeles-bevezeto",600,9,fr=>{
  const s=$("#c-hero"),N=8,W=420,H=250,u=(H-70)/9,bw=(W-40)/N;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let i=0;i<N;i++){
    const x=20+i*bw,h1=(i+1)*u,h2=(N-i)*u,on=i<fr;
    el("rect",{x:x+3,y:H-26-h1,width:bw-6,height:h1,rx:3,style:"fill:var(--accent)"},s);
    if(on)el("rect",{x:x+3,y:H-26-h1-h2,width:bw-6,height:h2,rx:3,style:"fill:var(--accent-2)"},s);
    else el("rect",{x:x+3,y:H-26-9*u,width:bw-6,height:9*u,rx:3,style:"fill:none;stroke:var(--line);stroke-dasharray:3 4"},s);
    txt(s,x+bw/2,H-8,i+1);
  }
  $("#c-hero-a").textContent="tükrözött párok: "+Math.min(fr,N);
});

/* --- §1 elosztás, összevonás --- */
function cE(){
  const fa=c2expr($("#c-ea").value),fb=c2expr($("#c-eb").value),c=+$("#c-ec").value,n=Math.round(+$("#c-en").value),i=$("#c-e-info");
  if(!fa||!fb||!isFinite(c)||!(n>=1&&n<=30)){i.textContent="Hibás kifejezés vagy határ (1 ≤ n ≤ 30; használd a k változót).";return;}
  let A=0,B=0,L=0;for(let k=1;k<=n;k++){A+=fa(k);B+=fb(k);L+=c*fa(k)+fb(k);}
  if(![A,B,L].every(isFinite)){i.textContent="A kifejezés valamelyik k-ra nem értelmezett.";return;}
  const R=c*A+B,eq=Math.abs(L-R)<1e-9*Math.max(1,Math.abs(L));
  i.innerHTML=`Σ<sub>k=1</sub><sup>${n}</sup>(${c}·a<sub>k</sub> + b<sub>k</sub>) = ${c2ptsum(L)}<br>${c}·Σa<sub>k</sub> + Σb<sub>k</sub> = ${c}·${c2ptsum(A)} + ${c2ptsum(B)} = ${c2ptsum(R)} ${ok(eq)}`;
}
["#c-ea","#c-eb","#c-ec","#c-en"].forEach(id=>$(id).addEventListener("input",cE));cE();

/* --- §1 átrendezés --- */
function cP(){
  const n=+$("#c-pn").value;$("#c-pnv").textContent=n;const kind=$("#c-pp").value;
  const P={rev:k=>n-k,rot:k=>(k+1)%(n+1),swap:k=>k^1,plus:k=>k+1,half:k=>Math.floor(k/2)}[kind];
  const a=k=>k*k+1;let S0=0,S1=0,r1="<tr><th>k</th>",r2="<tr><th>p(k)</th>",r3="<tr><th>a<sub>p(k)</sub></th>";
  const img=new Set(),inK=v=>v>=0&&v<=n;let inside=true;
  for(let k=0;k<=n;k++){const q=P(k);img.add(q);if(!inK(q))inside=false;S0+=a(k);S1+=a(q);
    r1+=`<td>${k}</td>`;r2+=`<td>${q}</td>`;r3+=`<td>${a(q)}</td>`;}
  $("#c-p-tbl").innerHTML=r1+"</tr>"+r2+"</tr>"+r3+"</tr>";
  const bij=inside&&img.size===n+1;
  $("#c-p-info").innerHTML=`Σ a<sub>k</sub> = <b>${S0}</b> &nbsp;·&nbsp; Σ a<sub>p(k)</sub> = <b>${S1}</b> ${ok(S0===S1)} &nbsp;·&nbsp; p ${bij?"permutáció":"<b>nem permutáció</b>"}`+
   (bij?"":` (${inside?"két indexből ugyanaz lett":"kilóg a {0…"+n+"} halmazból"})`);
}
$("#c-pp").addEventListener("input",cP);$("#c-pn").addEventListener("input",cP);cP();

/* --- §2 tükrözés --- */
function cG(){
  const a=+$("#c-ga").value,b=+$("#c-gb").value,n=+$("#c-gn").value;$("#c-gav").textContent=a;$("#c-gbv").textContent=b;$("#c-gnv").textContent=n;
  const W=640,H=240,l=20,r=20,t=14,bt=26,tot=2*a+b*n||1,bw=(W-l-r)/(n+1),u=(H-t-bt)/tot,s=c2svg("#c-g-svg",W,H);
  let S=0;
  for(let k=0;k<=n;k++){
    const h1=(a+b*k)*u,h2=(a+b*(n-k))*u,x=l+k*bw;S+=a+b*k;
    el("rect",{x:x+bw*.1,y:H-bt-h1,width:bw*.8,height:Math.max(0,h1),rx:2,style:"fill:var(--accent)"},s);
    el("rect",{x:x+bw*.1,y:H-bt-h1-h2,width:bw*.8,height:Math.max(0,h2),rx:2,style:"fill:var(--accent-2)"},s);
    if(n<=14)txt(s,x+bw/2,H-8,k);
  }
  const F=(n+1)*(2*a+b*n)/2;
  $("#c-g-info").innerHTML=`2S = (n+1)(2a+bn) = ${n+1}·${2*a+b*n} = ${(n+1)*(2*a+b*n)} &nbsp;·&nbsp; S = <b>${F}</b>, közvetlen összeg: ${S} ${ok(F===S)}`;
}
["#c-ga","#c-gb","#c-gn"].forEach(id=>$(id).addEventListener("input",cG));cG();

/* --- §3 perturbáció, egzakt törtekkel --- */
function cPert(){
  const m=$("#c-pm").value,n=+$("#c-pn2").value;$("#c-pn2v").textContent=n;
  $("#c-pxbox").style.display=m==="geo"?"":"none";
  const i=$("#c-pi");
  const pw=(x,e)=>{let r=rat(1);for(let j=0;j<e;j++)r=r.mul(x);return r;};
  if(m==="geo"){
    const x=rat(Math.round(+$("#c-px").value),Math.max(1,Math.round(+$("#c-pq").value)));
    let S=rat(0);for(let k=0;k<=n;k++)S=S.add(pw(x,k));
    const lhs=S.add(pw(x,n+1)),rhs=rat(1).add(x.mul(S));
    if(x.eq(rat(1))){i.innerHTML=`x = 1: S<sub>${n}</sub> = ${S} = n + 1 ${ok(S.eq(rat(n+1)))}<br>S + a<sub>n+1</sub> = ${lhs}, a<sub>0</sub> + x·S = ${rhs} ${ok(lhs.eq(rhs))} (az egyenlet S-re triviális, nem ad megoldást)`;return;}
    const cl=rat(1).sub(pw(x,n+1)).div(rat(1).sub(x));
    i.innerHTML=`x = ${x}: S<sub>${n}</sub> = <b>${S}</b><br>S + a<sub>n+1</sub> = ${lhs} &nbsp;·&nbsp; a<sub>0</sub> + x·S = ${rhs} ${ok(lhs.eq(rhs))}<br>(1 − x<sup>n+1</sup>)/(1 − x) = ${cl} ${ok(cl.eq(S))}`;
  }else if(m==="k2k"){
    let S=rat(0),T=rat(0);for(let k=0;k<=n;k++){S=S.add(rat(k).mul(pw(rat(2),k)));T=T.add(pw(rat(2),k));}
    const lhs=S.add(rat(n+1).mul(pw(rat(2),n+1))),rhs=rat(2).mul(S).add(rat(2).mul(T)),cl=rat(n-1).mul(pw(rat(2),n+1)).add(rat(2));
    i.innerHTML=`S<sub>${n}</sub> = Σ k·2<sup>k</sup> = <b>${S}</b><br>S + (n+1)2<sup>n+1</sup> = ${lhs} &nbsp;·&nbsp; 2S + 2Σ2<sup>k</sup> = ${rhs} ${ok(lhs.eq(rhs))}<br>(n−1)2<sup>n+1</sup> + 2 = ${cl} ${ok(cl.eq(S))}`;
  }else{
    let S=rat(0),L=rat(0);for(let k=0;k<=n;k++){S=S.add(rat(k*k));L=L.add(rat(k));}
    const lhs=S.add(rat((n+1)*(n+1))),rhs=S.add(rat(2).mul(L)).add(rat(n+1));
    const lin=rat((n+1)*(n+1)-(n+1),2);
    i.innerHTML=`S<sub>${n}</sub> = Σ k² = ${S}<br>S + (n+1)² = ${lhs} &nbsp;·&nbsp; S + 2Σk + (n+1) = ${rhs} ${ok(lhs.eq(rhs))}<br>az S kiesik; marad: 2Σk = (n+1)² − (n+1), azaz Σk = ${lin} ${ok(lin.eq(L))}`;
  }
}
["#c-pm","#c-pn2","#c-px","#c-pq"].forEach(id=>$(id).addEventListener("input",cPert));cPert();
