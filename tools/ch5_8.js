/* ================= 5.8 MECHANIKUS ÖSSZEGZÉS ================= */
/* polinomok: Rat tömb, alacsony fokú tag elöl; a nullpolinom [] */
const bfTrim=p=>{p=p.slice();while(p.length&&p[p.length-1].n===0n)p.pop();return p;};
const bfAdd=(p,q)=>{const n=Math.max(p.length,q.length),r=[];for(let i=0;i<n;i++)r.push((p[i]||rat(0)).add(q[i]||rat(0)));return bfTrim(r);};
const bfSc=(p,s)=>bfTrim(p.map(x=>x.mul(s)));
const bfSub=(p,q)=>bfAdd(p,bfSc(q,rat(-1)));
const bfMul=(p,q)=>{if(!p.length||!q.length)return[];const r=Array.from({length:p.length+q.length-1},()=>rat(0));p.forEach((x,i)=>q.forEach((y,j)=>{r[i+j]=r[i+j].add(x.mul(y));}));return bfTrim(r);};
const bfShift=(p,s)=>{let res=[],pow=[rat(1)];p.forEach(c=>{res=bfAdd(res,bfSc(pow,c));pow=bfMul(pow,[rat(s),rat(1)]);});return res;};
const bfEv=(p,x)=>p.reduceRight((s,c)=>s.mul(x).add(c),rat(0));
const bfDeg=p=>p.length-1;
const bfLin=(al)=>[al,rat(1)];/* k+α */
const bfProd=(als,lead)=>{let p=[lead];als.forEach(al=>{p=bfMul(p,bfLin(al));});return p;};
const bfSup=n=>String(n).split("").map(c=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");
function bfStr(p,v="k"){if(!p.length)return"0";let out="";for(let i=p.length-1;i>=0;i--){const c=p[i];if(c.n===0n)continue;const neg=c.n<0n,a=neg?c.neg():c,one=a.eq(rat(1));let t;
  if(i===0)t=""+a;else t=(one?"":(a.d===1n?a.n+"":"("+a+")"))+v+(i>1?bfSup(i):"");
  out+=(out?(neg?" − ":" + "):(neg?"−":""))+t;}return out||"0";}
function bfSolve(rows,rhs,nu){/* sorok: Rat[nu]; rhs: Rat[] ; Gauss-elimináció; visszaad megoldást vagy null */
  const M=rows.map((r,i)=>[...r,rhs[i]]),piv=[];let r0=0;
  for(let c=0;c<nu&&r0<M.length;c++){let p=-1;for(let i=r0;i<M.length;i++)if(M[i][c].n!==0n){p=i;break;}if(p<0)continue;[M[r0],M[p]]=[M[p],M[r0]];const d=M[r0][c];M[r0]=M[r0].map(x=>x.div(d));
    for(let i=0;i<M.length;i++)if(i!==r0&&M[i][c].n!==0n){const f=M[i][c];M[i]=M[i].map((x,j)=>x.sub(f.mul(M[r0][j])));}piv.push(c);r0++;}
  for(let i=r0;i<M.length;i++)if(M[i][nu].n!==0n)return null;
  const x=Array.from({length:nu},()=>rat(0));piv.forEach((c,i)=>{x[c]=M[i][nu];});return x;}
function bfGosper(S){
  const log=[];let A=S.num.map(x=>x),B=S.den.map(x=>x),C=[rat(1)];const z=S.z;
  for(;;){let best=null;for(let i=0;i<A.length;i++)for(let j=0;j<B.length;j++){const d=A[i].sub(B[j]);if(d.d===1n&&d.n>=0n){const h=Number(d.n);if(!best||h<best.h)best={i,j,h};}}
    if(!best)break;const{i,j,h}=best,al=A[i];log.push(`h = ${h}: közös tényező (k${al.n<0n?"−"+al.neg():"+"+al})`);
    for(let q=1;q<=h;q++)C=bfMul(C,bfLin(al.sub(rat(q))));A.splice(i,1);B.splice(j,1);}
  const a=bfProd(A,z),b=bfProd(B,rat(1)),c=C,bm=bfShift(b,-1);
  /* hányados-azonosság ellenőrzése pontokon */
  const r=k=>{let t=z;S.num.forEach(x=>{t=t.mul(rat(k).add(x));});S.den.forEach(x=>{t=t.div(rat(k).add(x));});return t;};
  let idOk=true;[11,12,13].forEach(k=>{const L=r(k),R=bfEv(a,rat(k)).div(bfEv(b,rat(k))).mul(bfEv(c,rat(k+1))).div(bfEv(c,rat(k)));if(!L.eq(R))idOk=false;});
  /* fokszámkorlát */
  const da=bfDeg(a),db=bfDeg(b),dc=bfDeg(c);let D,why;
  const la=a[da]||rat(0),lb=b[db]||rat(0);
  if(da!==db||!la.eq(lb)){D=dc-Math.max(da,db);why=`deg a = ${da}, deg b = ${db}${da===db?" (a főegyütthatók különböznek)":""} → deg x = deg c − max = ${D}`;}
  else{const m=da,a1=m>=1?a[m-1]:rat(0),b1=m>=1?bm[m-1]:rat(0),d0=b1.sub(a1).div(la);const cand=[dc-m+1];if(d0.d===1n&&d0.n>=0n)cand.push(Number(d0.n));D=Math.max(...cand);why=`deg a = deg b = ${m}, a főegyütthatók egyeznek → deg x ≤ max(deg c − m + 1 = ${dc-m+1}${d0.d===1n&&d0.n>=0n?`, (β₁−a₁)/α = ${d0}`:""}) = ${D}`;}
  const res={A,B,a,b,c,log,idOk,D,why,x:null,z:null};
  if(D<0||D>40){res.fail=D<0?"a fokszámkorlát negatív":"a fokszámkorlát túl nagy";return res;}
  const N=Math.max(da+D,db+D,dc)+1,cols=[];
  for(let i=0;i<=D;i++){const xi=[...Array(i).fill(rat(0)),rat(1)];cols.push(bfSub(bfMul(a,bfShift(xi,1)),bfMul(bm,xi)));}
  const rows=Array.from({length:N},(_,r)=>cols.map(cp=>cp[r]||rat(0))),rhs=Array.from({length:N},(_,r)=>c[r]||rat(0));
  const sol=bfSolve(rows,rhs,D+1);
  if(!sol){res.fail="az egyenletrendszer ellentmondásos: nincs polinom x";return res;}
  res.x=bfTrim(sol);return res;
}
const bfPresets=[
 {id:"kfact",n:"k·k!",tex:"k·k!",k0:1,t0:rat(1),z:rat(1),num:[rat(1),rat(1)],den:[rat(0)]},
 {id:"k2k",n:"k·2ᵏ",tex:"k·2^k",k0:1,t0:rat(2),z:rat(2),num:[rat(1)],den:[rat(0)]},
 {id:"ksq",n:"k²",tex:"k²",k0:1,t0:rat(1),z:rat(1),num:[rat(1),rat(1)],den:[rat(0),rat(0)]},
 {id:"kk1",n:"1/(k(k+1))",tex:"1/(k(k+1))",k0:1,t0:rat(1,2),z:rat(1),num:[rat(0)],den:[rat(2)]},
 {id:"kk12",n:"1/(k(k+1)(k+2))",tex:"1/(k(k+1)(k+2))",k0:1,t0:rat(1,6),z:rat(1),num:[rat(0)],den:[rat(3)]},
 {id:"hoki",n:"C(k+3,3)",tex:"C(k+3,3)",k0:0,t0:rat(1),z:rat(1),num:[rat(4)],den:[rat(1)]},
 {id:"kozep",n:"C(2k,k)/4ᵏ",tex:"C(2k,k)/4^k",k0:0,t0:rat(1),z:rat(1),num:[rat(1,2)],den:[rat(1)]},
 {id:"harm",n:"1/k",tex:"1/k",k0:1,t0:rat(1),z:rat(1),num:[rat(0)],den:[rat(1)]},
 {id:"kf",n:"k!",tex:"k!",k0:0,t0:rat(1),z:rat(1),num:[rat(1)],den:[]},
 {id:"cb",n:"C(2k,k)",tex:"C(2k,k)",k0:0,t0:rat(1),z:rat(4),num:[rat(1,2)],den:[rat(1)]},
 {id:"inv2",n:"1/k²",tex:"1/k²",k0:1,t0:rat(1),z:rat(1),num:[rat(0),rat(0)],den:[rat(1),rat(1)]}
];
$("#bf-g-s").innerHTML=bfPresets.map(s=>`<option value="${s.id}">${s.n}</option>`).join("");
c2hero("gosper-bevezeto",460,7,fr=>{
  const s=c2svg("#bf-hero",420,250),K=Math.min(fr+2,7),zf=k=>{let r=1;for(let i=2;i<=k;i++)r*=i;return r;},mx=zf(7),w=40,x0=(420-6*w)/2;
  for(let k=1;k<K;k++){const h0=zf(k)/mx*185,h1=(zf(k+1)-zf(k))/mx*185,x=x0+(k-1)*w+4;
    el("rect",{x,y:220-h0,width:w-8,height:h0,rx:2,style:"fill:var(--muted, #888);opacity:.35"},s);
    el("rect",{x,y:220-h0-h1,width:w-8,height:h1,rx:2,style:"fill:var(--accent);opacity:.6"},s);
    txt(s,x+(w-8)/2,236,k,"","middle");}
  $("#bf-hero-b").textContent=`k = ${K-1}: ${K-1}·${K-1}! = ${(K)}! − ${K-1}! = ${zf(K)} − ${zf(K-1)}`;
});
function bfG(){
  const S=bfPresets.find(p=>p.id===$("#bf-g-s").value),R=bfGosper(S);
  const fac=(als,z)=>(z.eq(rat(1))?"":z+"·")+(als.length?als.map(x=>`(k${x.n<0n?"−"+x.neg():"+"+x})`).join(""):"1");
  let h=`tag: t<sub>k</sub> = ${S.tex}, t<sub>${S.k0}</sub> = ${S.t0}<br>1. hányados: t(k+1)/t(k) = ${fac(S.num,S.z)} / ${fac(S.den,rat(1))}<br>`;
  h+=`eltolások: ${R.log.length?R.log.join("; "):"nincs"}<br>a(k) = ${bfStr(R.a)}, b(k) = ${bfStr(R.b)}, c(k) = ${bfStr(R.c)} &nbsp;·&nbsp; a normálalak hányadosa egyezik az eredetivel ${ok(R.idOk)}<br>`;
  h+=`2. egyenlet: a(k)·x(k+1) − b(k−1)·x(k) = c(k)<br>3. fokszámkorlát: ${R.why}<br>`;
  const t=[S.t0];const rr=k=>{let q=S.z;S.num.forEach(x=>{q=q.mul(rat(k).add(x));});S.den.forEach(x=>{q=q.div(rat(k).add(x));});return q;};
  for(let k=S.k0;k<S.k0+9;k++)t.push(t[t.length-1].mul(rr(k)));
  if(!R.x){h+=`4. <b>nincs hipergeometrikus antidifferencia</b>: ${R.fail}.`;$("#bf-g-info").innerHTML=h;$("#bf-g-t").innerHTML="";return;}
  h+=`4. megoldás: x(k) = <b>${bfStr(R.x)}</b><br>z(k) = b(k−1)·x(k)/c(k)·t<sub>k</sub>, ahol b(k−1) = ${bfStr(bfShift(R.b,-1))}`;
  const zf=k=>{const ck=bfEv(R.c,rat(k));if(ck.n===0n)return null;return bfEv(bfShift(R.b,-1),rat(k)).mul(bfEv(R.x,rat(k))).div(ck).mul(t[k-S.k0]);};
  const ks=[],rows=[];let all=true;
  for(let k=S.k0;k<S.k0+7;k++){const z1=zf(k+1),z0=zf(k);if(z1===null||z0===null){rows.push([k,t[k-S.k0],"–",false]);continue;}const d=z1.sub(z0),good=d.eq(t[k-S.k0]);if(!good)all=false;rows.push([k,t[k-S.k0],d,good]);}
  let sums=[],sOk=true,z0=zf(S.k0),acc=rat(0);
  for(let m=S.k0+1;m<=S.k0+6;m++){acc=acc.add(t[m-1-S.k0]);const zm=zf(m);const good=zm!==null&&z0!==null&&zm.sub(z0).eq(acc);if(!good)sOk=false;sums.push([m,acc,zm&&z0?zm.sub(z0):"–",good]);}
  $("#bf-g-t").innerHTML="<tr><th>k</th>"+rows.map(r=>`<td>${r[0]}</td>`).join("")+"</tr><tr><th>t(k)</th>"+rows.map(r=>`<td>${r[1]}</td>`).join("")+"</tr><tr><th>z(k+1)−z(k)</th>"+rows.map(r=>`<td>${r[2]}</td>`).join("")+"</tr><tr><th>m</th>"+sums.map(r=>`<td>${r[0]}</td>`).join("")+`</tr><tr><th>Σ<sub>k=${S.k0}</sub><sup>m−1</sup> t</th>`+sums.map(r=>`<td>${r[1]}</td>`).join("")+"</tr><tr><th>z(m)−z(k₀)</th>"+sums.map(r=>`<td>${r[2]}</td>`).join("")+"</tr>";
  $("#bf-g-info").innerHTML=h+`<br>ellenőrzés: z(k+1) − z(k) = t(k) ${ok(all)} &nbsp;·&nbsp; részletösszegek = z(m) − z(k₀) ${ok(sOk)}`;
}
$("#bf-g-s").addEventListener("change",bfG);bfG();
/* Zeilberger-tanúsítvány ellenőrzése */
const bfFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const bfBin=(n,k)=>k<0||k>n||n<0?0n:bfFact(n)/(bfFact(k)*bfFact(n-k));
function bfZ(){
  const f=$("#bf-z-f").value,N=+$("#bf-z-n").value;$("#bf-z-nv").textContent=N;let all=true,cnt=0,bad="";
  for(let n=0;n<=N;n++){
    for(let k=0;k<=n+2;k++){
      let L,R;
      if(f==="b1"){L=rat(bfBin(n+1,k)-2n*bfBin(n,k));const G=kk=>rat(-bfBin(n,kk-1));R=G(k+1).sub(G(k));}
      else{L=rat(BigInt(n+1)*bfBin(n+1,k)**2n-2n*BigInt(2*n+1)*bfBin(n,k)**2n);const G=kk=>rat(-BigInt(kk*kk)*BigInt(3*n+3-2*kk)*bfBin(n+1,kk)**2n,BigInt((n+1)*(n+1)));R=G(k+1).sub(G(k));}
      cnt++;if(!L.eq(R)){all=false;if(!bad)bad=`n=${n}, k=${k}`;}
    }
  }
  let S=[1n],rec=true;/* összegek: S(n) és a rekurzió */
  for(let n=0;n<=N;n++){let s=0n;for(let k=0;k<=n;k++)s+=f==="b1"?bfBin(n,k):bfBin(n,k)**2n;S[n]=s;}
  for(let n=0;n<N;n++){if(f==="b1"?S[n+1]!==2n*S[n]:BigInt(n+1)*S[n+1]!==2n*BigInt(2*n+1)*S[n])rec=false;}
  const tgt=n=>f==="b1"?1n<<BigInt(n):bfBin(2*n,n);let ts=true;for(let n=0;n<=N;n++)if(S[n]!==tgt(n))ts=false;
  $("#bf-z-info").innerHTML=`tanúsítvány-azonosság ${cnt} (n, k) pontra ${ok(all)}${bad?" (első hiba: "+bad+")":""}<br>rekurzió ${f==="b1"?"S(n+1) = 2·S(n)":"(n+1)·S(n+1) = 2(2n+1)·S(n)"} n < ${N}-re ${ok(rec)}<br>S(n) = ${f==="b1"?"2ⁿ":"C(2n,n)"} n ≤ ${N}-re ${ok(ts)}`;
}
$("#bf-z-f").addEventListener("change",bfZ);$("#bf-z-n").addEventListener("input",bfZ);bfZ();
