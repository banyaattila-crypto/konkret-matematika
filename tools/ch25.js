/* ================= 2.5 ÁLTALÁNOS MÓDSZEREK ================= */
const fSum2=n=>{let s=0;for(let k=0;k<=n;k++)s+=k*k;return s;};
const fPoly=cs=>{ /* cs[i] = együttható n^i-hez (Rat) */
  const t=[];for(let i=cs.length-1;i>=0;i--){const c=cs[i];if(c.n===0n)continue;
    const a=new Rat(c.n<0n?-c.n:c.n,c.d),sg=c.n<0n?"−":"+",v=(a.n===1n&&a.d===1n&&i>0)?"":String(a),nn=i===0?"":i===1?"n":"n"+"⁰¹²³⁴⁵⁶⁷⁸⁹"[i];
    t.push([sg,v+(v&&nn?"·":"")+nn]);}
  if(!t.length)return"0";return t.map((x,j)=>j===0?(x[0]==="−"?"−":"")+x[1]:" "+x[0]+" "+x[1]).join("");
};
c2hero("modszerek-bevezeto",650,9,fr=>{
  const s=$("#f-hero"),N=8,W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const S=[0];for(let i=1;i<=N;i++)S.push(S[i-1]+i*i);const mx=S[N],bw=(W-40)/(N+1);
  for(let i=0;i<=N;i++){const on=i<=fr,h=on?Math.max(2,S[i]/mx*(H-70)):0,x=20+i*bw;
    el("rect",{x:x+3,y:H-26-h,width:bw-6,height:h,rx:3,style:`fill:${i===fr?"var(--accent-2)":"var(--accent)"};opacity:${on?1:0}`},s);
    if(on)txt(s,x+bw/2,H-30-h,S[i],"");txt(s,x+bw/2,H-8,i);}
  const f=Math.min(fr,N);$("#f-hero-a").textContent="n = "+f;$("#f-hero-b").textContent=S[f];
});

/* --- §1 sejtés --- */
function fSej(){
  const N=+$("#f-s-n").value;$("#f-s-nv").textContent=N;
  const S=[];for(let n=0;n<=N;n++)S.push(fSum2(n));
  const D=[S];for(let d=1;d<=3;d++){const p=D[d-1];D.push(p.slice(1).map((v,i)=>v-p[i]));}
  let h="<tr><th>n</th>"+S.map((_,i)=>`<td>${i}</td>`).join("")+"</tr>";
  ["S","Δ","Δ²","Δ³"].forEach((nm,d)=>{h+=`<tr><th>${nm}</th>`+Array.from({length:N+1},(_,i)=>`<td>${D[d][i]===undefined?"":D[d][i]}</td>`).join("")+"</tr>";});
  $("#f-s-tbl").innerHTML=h;
  const F=n=>rat(n*(n+1)*(2*n+1),6);let okAll=true,ind=true;
  for(let n=0;n<=N;n++){if(!F(n).eq(rat(S[n])))okAll=false;if(n>0&&!F(n-1).add(rat(n*n)).eq(F(n)))ind=false;}
  const cst=D[3].every(v=>v===2);
  $("#f-s-info").innerHTML=`Δ³ állandó (=2): ${ok(cst)} → főegyüttható 2/3! = 1/3 &nbsp;·&nbsp; képlet = közvetlen összeg n ≤ ${N}-re ${ok(okAll)} &nbsp;·&nbsp; F(n−1) + n² = F(n) ${ok(ind)}`;
}
$("#f-s-n").addEventListener("input",fSej);fSej();

/* --- §2 perturbáció --- */
const fBin=(n,k)=>{let r=1n;for(let i=1n;i<=BigInt(k);i++)r=r*(BigInt(n)-i+1n)/i;return r;};
function fPert(){
  const p=+$("#f-p-p").value,n=+$("#f-p-n").value;$("#f-p-pv").textContent=p;$("#f-p-nv").textContent=n;
  const pw=(b,e)=>{let r=1n;for(let i=0;i<e;i++)r*=BigInt(b);return r;};
  const S=[];for(let i=0;i<=p;i++){let s=0n;for(let k=0;k<=n;k++)s+=(i===0?1n:pw(k,i));S.push(s);}
  /* S_0..S_{p-1} 'ismert', S_p-t a perturbációból számoljuk */
  let rest=pw(n+1,p+1);for(let i=0;i<p;i++)rest-=fBin(p+1,i)*S[i];
  const Sp=new Rat(rest,BigInt(p+1));
  const all=Array.from({length:p+1},(_,i)=>`${fBin(p+1,i)}·${S[i]}`).join(" + ");
  $("#f-p-info").innerHTML=`(n+1)<sup>${p+1}</sup> = ${pw(n+1,p+1)} = ${all} ${ok(Array.from({length:p+1},(_,i)=>fBin(p+1,i)*S[i]).reduce((a,b)=>a+b,0n)===pw(n+1,p+1))}<br>`+
    `S<sub>${p}</sub> = [ (n+1)<sup>${p+1}</sup> − Σ<sub>i&lt;${p}</sub> C(${p+1},i)·S<sub>i</sub> ] / ${p+1} = ${Sp} &nbsp;·&nbsp; közvetlenül: ${S[p]} ${ok(Sp.eq(rat(S[p])))}`;
}
["#f-p-p","#f-p-n"].forEach(id=>$(id).addEventListener("input",fPert));fPert();

/* --- §3 repertoár --- */
function fRep(){
  const al=Math.round(+$("#f-r-a").value),be=Math.round(+$("#f-r-b").value),ga=Math.round(+$("#f-r-c").value),de=Math.round(+$("#f-r-d").value);
  if(![al,be,ga,de].every(Number.isFinite)){$("#f-r-info").textContent="Adj meg egész paramétereket.";return;}
  const A=rat(de,3),B=A.mul(rat(3)).add(rat(ga)).div(rat(2)),C=rat(be).sub(A).add(B),D=rat(al);
  const cf=n=>A.mul(rat(n**3)).add(B.mul(rat(n*n))).add(C.mul(rat(n))).add(D);
  const R=[rat(al)];for(let n=1;n<=10;n++)R.push(R[n-1].add(rat(be+ga*n+de*n*n)));
  let okAll=true,r1="<tr><th>n</th>",r2="<tr><th>rekurzió</th>",r3="<tr><th>An³+Bn²+Cn+D</th>";
  for(let n=0;n<=10;n++){const e=cf(n).eq(R[n]);okAll=okAll&&e;r1+=`<td>${n}</td>`;r2+=`<td>${R[n]}</td>`;r3+=`<td>${cf(n)}</td>`;}
  $("#f-r-tbl").innerHTML=r1+"</tr>"+r2+"</tr>"+r3+"</tr>";
  $("#f-r-info").innerHTML=`A = ${A}, B = ${B}, C = ${C}, D = ${D}<br>R<sub>n</sub> = <b>${fPoly([D,C,B,A])}</b> &nbsp;·&nbsp; egyezés n ≤ 10-re ${ok(okAll)}`;
}
["#f-r-a","#f-r-b","#f-r-c","#f-r-d"].forEach(id=>$(id).addEventListener("input",fRep));
document.querySelectorAll("#f-r-pre button").forEach(b=>b.onclick=()=>{const v=b.dataset.p.split(",");["a","b","c","d"].forEach((x,i)=>$("#f-r-"+x).value=v[i]);document.querySelectorAll("#f-r-pre button").forEach(x=>x.classList.toggle("primary",x===b));fRep();});
fRep();

/* --- §4 integrálás --- */
function fInt(){
  const st=+$("#f-i-s").value,N=+$("#f-i-n").value;$("#f-i-nv").textContent=N;
  const res=n=>{let r=rat(fSum2(n));if(st>=1)r=r.sub(rat(n**3,3));if(st>=2)r=r.sub(rat(n*n,2));if(st>=3)r=r.sub(rat(n,6));return r;};
  const vals=[];for(let n=1;n<=N;n++)vals.push(res(n).num());
  c2bars(c2svg("#f-i-svg",640,200),vals,{H:200,label:false,color:(i)=>i+1===N?"var(--accent-2)":"var(--accent)"});
  const deg=3-st,q=res(N).num()/N**deg;
  $("#f-i-info").innerHTML=st<3?`n = ${N}: maradék = ${res(N)} ≈ ${fm(res(N).num())}; maradék / n<sup>${deg}</sup> = ${fm(q)} → ${["1/3 ≈ 0,3333","1/2 = 0,5","1/6 ≈ 0,1667"][st]} (a következő együttható)`:
    `maradék minden n ≤ ${N}-re: ${Array.from({length:N},(_,i)=>res(i+1)).every(r=>r.n===0n)?"pontosan 0":"nem 0"} ${ok(Array.from({length:N},(_,i)=>res(i+1)).every(r=>r.n===0n))}`;
}
["#f-i-s","#f-i-n"].forEach(id=>$(id).addEventListener("input",fInt));fInt();

/* --- §5 kibontás --- */
function fKib(){
  const n=+$("#f-k-n").value;$("#f-k-nv").textContent=n;
  let S=rat(0);for(let k=1;k<=n;k++)S=S.add(rat(k*k));
  let S2=rat(0);for(let j=1;j<=n;j++)for(let k=j;k<=n;k++)S2=S2.add(rat(k));
  let S3=rat(0);for(let j=1;j<=n;j++)S3=S3.add(rat((n+j)*(n+1-j),2));
  const lin=rat(n*(n+1),2),rhs=rat(1,2).mul(rat(n*n*(n+1)).add(lin).sub(S));
  const fin=rat(n*(n+1),1).mul(rat(2*n+1,2)).div(rat(3));
  $("#f-k-info").innerHTML=`Σk² = ${S}<br>Σ<sub>j</sub>Σ<sub>k=j</sub><sup>n</sup> k = ${S2} ${ok(S2.eq(S))}<br>Σ<sub>j</sub> (n+j)(n+1−j)/2 = ${S3} ${ok(S3.eq(S))}<br>½[n²(n+1) + n(n+1)/2 − S] = ${rhs} ${ok(rhs.eq(S))}<br>3S = n(n+1)(n+½) → S = ${fin} ${ok(fin.eq(S))}`;
}
$("#f-k-n").addEventListener("input",fKib);fKib();

/* --- §6 összevetés --- */
function fOsszev(){
  const n=+$("#f-o-n").value;$("#f-o-nv").textContent=n;
  const dir=rat(fSum2(n));
  const guess=rat(n*(n+1)*(2*n+1),6);
  const S0=n+1,S1=n*(n+1)/2,pert=rat((n+1)**3-S0-3*S1,3);
  const rep=rat(n**3,3).add(rat(n*n,2)).add(rat(n,6));
  const integ=rat(n**3,3).add(rat(n*n,2)).add(rat(n,6));
  const kib=rat(n*(n+1)*(2*n+1),2).div(rat(3));
  const rows=[["közvetlen összeg",dir],["sejtés + indukció",guess],["perturbáció (k³-ből)",pert],["repertoár (A,B,C = 1/3, 1/2, 1/6)",rep],["integrálás (főtag + maradékok)",integ],["kibontás (3S = n(n+1)(2n+1)/2)",kib]];
  $("#f-o-tbl").innerHTML="<tr><th>Módszer</th><th>Σ<sub>k=0</sub><sup>"+n+"</sup> k²</th><th></th></tr>"+rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${ok(r[1].eq(dir))}</td></tr>`).join("");
}
$("#f-o-n").addEventListener("input",fOsszev);fOsszev();
