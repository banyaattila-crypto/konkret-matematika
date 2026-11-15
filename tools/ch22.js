/* ================= 2.2 ÖSSZEGEK ÉS REKURZIÓK ================= */
c2hero("rekurziok-bevezeto",700,8,fr=>{
  const s=$("#b-hero"),N=8,W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const T=[0];for(let i=1;i<=N;i++)T.push(2*T[i-1]+1);
  const mx=T[N],bw=(W-40)/(N+1);
  for(let i=0;i<=N;i++){
    const on=i<=fr,h=on?Math.max(2,T[i]/mx*(H-70)):0,x=20+i*bw;
    el("rect",{x:x+3,y:H-26-h,width:bw-6,height:h,rx:3,style:`fill:${i===fr?"var(--accent-2)":"var(--accent)"};opacity:${on?1:0}`},s);
    if(on)txt(s,x+bw/2,H-30-h,T[i],"");
    txt(s,x+bw/2,H-8,i);
  }
  $("#b-hero-a").textContent=`T${c2sub(Math.min(fr,N))} = ${T[Math.min(fr,N)]}`;
});

/* --- §1 --- */
function bAt(){
  const n=+$("#b-at-n").value;$("#b-at-nv").textContent=n;
  const vals=[];for(let i=0;i<=n;i++)vals.push(1-2**-i);
  c2bars(c2svg("#b-at-svg",640,200),vals,{H:200,xl:i=>i,fmt:v=>fm(v).slice(0,6),color:(i)=>i===n?"var(--accent-2)":"var(--accent)"});
  const T=2**n-1;
  $("#b-at-info").innerHTML=`T<sub>${n}</sub>/2<sup>${n}</sup> = 1 − 2<sup>−${n}</sup> = ${fm(vals[n])} &nbsp;·&nbsp; T<sub>${n}</sub> = 2<sup>${n}</sup> − 1 = <b>${T}</b> ${ok(Math.abs(T/2**n-vals[n])<1e-12)}`;
}
$("#b-at-n").addEventListener("input",bAt);bAt();

/* --- §2 összegzőtényező, egzakt törtekkel --- */
const bPre=[
 {id:"hanoi",t:"T(n) = 2T(n−1) + 1, T₀ = 0 (Hanoi)",a:n=>rat(1),b:n=>rat(2),c:n=>rat(1),T0:rat(0),closed:n=>rat((2n**BigInt(n))-1n)},
 {id:"lin",t:"T(n) = T(n−1) + n, T₀ = 0 (háromszögszámok)",a:n=>rat(1),b:n=>rat(1),c:n=>rat(n),T0:rat(0),closed:n=>rat(n*(n+1),2)},
 {id:"fact",t:"T(n) = n·T(n−1) + 1, T₀ = 0 (n!·Σ1/k!)",a:n=>rat(1),b:n=>rat(n),c:n=>rat(1),T0:rat(0),closed:null},
 {id:"qs",t:"n·T(n) = (n+1)·T(n−1) + 2n, T₀ = 0 (gyorsrendezés)",a:n=>rat(n),b:n=>rat(n+1),c:n=>rat(2*n),T0:rat(0),closed:n=>{let H=rat(0);for(let k=1;k<=n;k++)H=H.add(rat(1,k));return rat(2*(n+1)).mul(H).sub(rat(2*n));}}
];
$("#b-tn-p").innerHTML=bPre.map((p,i)=>`<option value="${i}">${p.t}</option>`).join("");
function bSumFactor(p,n){
  /* visszaadja {rec:[T0..Tn], sf:[null,T1..Tn], s:[null,s1..sn]} */
  const rec=[p.T0];for(let k=1;k<=n;k++)rec.push(p.b(k).mul(rec[k-1]).add(p.c(k)).div(p.a(k)));
  const s=[null,rat(1)];for(let k=2;k<=n;k++)s.push(s[k-1].mul(p.a(k-1)).div(p.b(k)));
  const sf=[p.T0];let acc=s[1].mul(p.b(1)).mul(p.T0);
  for(let k=1;k<=n;k++){acc=acc.add(s[k].mul(p.c(k)));sf.push(acc.div(s[k].mul(p.a(k))));}
  return {rec,sf,s};
}
function bTn(){
  const p=bPre[+$("#b-tn-p").value],n=+$("#b-tn-n").value;$("#b-tn-nv").textContent=n;
  const r=bSumFactor(p,n);let allok=true,rows="";
  for(let k=0;k<=n;k++){
    const same=r.rec[k].eq(r.sf[k]);allok=allok&&same;
    const cl=p.closed?p.closed(k):null,clok=cl?cl.eq(r.rec[k]):null;if(cl&&!clok)allok=false;
    rows+=`<tr><td>${k}</td><td>${k===0?"–":r.s[k]}</td><td>${r.rec[k]}</td><td>${r.sf[k]} ${ok(same)}</td><td>${cl?cl+" "+ok(clok):"–"}</td></tr>`;
  }
  $("#b-tn-tbl").innerHTML=`<tr><th>n</th><th>sₙ</th><th>rekurzióból</th><th>képletből</th><th>zárt alak</th></tr>${rows}`;
  $("#b-tn-info").innerHTML=`Az összegzőtényezős képlet és a közvetlen rekurzió minden n ≤ ${n}-re ${allok?"egyezik":"<b>nem egyezik</b>"} ${ok(allok)}`;
}
$("#b-tn-p").addEventListener("input",bTn);$("#b-tn-n").addEventListener("input",bTn);bTn();

/* --- §3 gyorsrendezés --- */
const bCn=n=>{const c=[rat(0)];let pre=rat(0);for(let k=1;k<=n;k++){pre=pre.add(c[k-1]);c.push(rat(k+1).add(rat(2,k).mul(pre)));}return c;};
function bQsCost(a){ /* az első elem a pivot; költség: n+1 felosztásonként (n>=1) */
  if(a.length===0)return 0;
  const p=a[0],L=[],R=[];for(let i=1;i<a.length;i++)(a[i]<p?L:R).push(a[i]);
  return a.length+1+bQsCost(L)+bQsCost(R);
}
function bPerms(n){const out=[],a=Array.from({length:n},(_,i)=>i);(function g(k){if(k===n){out.push(a.slice());return;}for(let i=k;i<n;i++){[a[k],a[i]]=[a[i],a[k]];g(k+1);[a[k],a[i]]=[a[i],a[k]];}})(0);return out;}
function bQs(){
  const n=+$("#b-qs-n").value;$("#b-qs-nv").textContent=n;
  const C=bCn(20),vals=C.map(x=>x.num()).slice(1);
  c2bars(c2svg("#b-qs-svg",640,210),vals,{H:210,xl:i=>i+1,label:false,color:(i)=>i+1===n?"var(--accent-2)":"var(--accent)"});
  const P=bPerms(n);let tot=0;for(const q of P)tot+=bQsCost(q);
  let H=rat(0);for(let k=1;k<=n;k++)H=H.add(rat(1,k));
  const avg=rat(tot,P.length);
  const cf=rat(2*(n+1)).mul(H).sub(rat(2*n));
  $("#b-qs-info").innerHTML=`n = ${n}: ${P.length} sorrend, átlagos költség = ${tot}/${P.length} = <b>${avg}</b><br>`+
   `rekurzióból C<sub>${n}</sub> = ${C[n]} ${ok(C[n].eq(avg))} &nbsp;·&nbsp; 2(n+1)H<sub>n</sub> − 2n = ${cf} ${ok(cf.eq(avg))}`+
   `<br>közelítés: 2n·ln n − 0,846·n = ${fm(2*n*Math.log(n)-0.8456*n)} (n kicsi, a közelítés még durva)`;
}
$("#b-qs-n").addEventListener("input",bQs);bQs();
