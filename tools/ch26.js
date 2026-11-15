/* ================= 2.6 VÉGES ANALÍZIS ================= */
const gFall=(x,m)=>{let r=1n;for(let i=0;i<m;i++)r*=(BigInt(x)-BigInt(i));return r;};
const gSt=(()=>{const memo={};const f=(n,k)=>{if(n===k)return 1n;if(k===0||n===0||k>n)return 0n;const key=n+","+k;if(memo[key]!==undefined)return memo[key];return memo[key]=BigInt(k)*f(n-1,k)+f(n-1,k-1);};return f;})();
c2hero("veges-bevezeto",650,8,fr=>{
  const s=$("#g-hero"),N=8,W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const mx=N*N,bw=(W-40)/(N+1);
  for(let x=0;x<=N;x++){const h=Math.max(2,x*x/mx*(H-70)),X=20+x*bw;
    el("rect",{x:X+3,y:H-26-h,width:bw-6,height:h,rx:3,style:"fill:var(--accent);opacity:.45"},s);
    if(x>=1&&x<=fr){const dh=((x*x)-((x-1)**2))/mx*(H-70);
      el("rect",{x:X+3,y:H-26-h,width:bw-6,height:Math.max(2,dh),rx:3,style:`fill:${x===fr?"var(--accent-2)":"var(--accent)"}`},s);}
    txt(s,X+bw/2,H-8,x);
  }
  const f=Math.min(fr,N);$("#g-hero-a").textContent=f===0?"Δf(0) = 1":`Δf(${f-1}) = ${2*f-1}`;$("#g-hero-b").textContent=Math.max(1,f)**2;
});

/* --- §1 differenciaoperátor --- */
const gF={
  sq:{f:x=>rat(x*x),d:x=>rat(2*x+1),dn:"2x+1"},
  cube:{f:x=>rat(x**3),d:x=>rat(3*x*x+3*x+1),dn:"3x²+3x+1"},
  p2:{f:x=>rat(2n**BigInt(x)),d:x=>rat(2n**BigInt(x)),dn:"2ˣ"},
  p3:{f:x=>rat(3n**BigInt(x)),d:x=>rat(2n*3n**BigInt(x)),dn:"2·3ˣ"},
  harm:{f:x=>{let h=rat(0);for(let k=1;k<=x;k++)h=h.add(rat(1,k));return h;},d:x=>rat(1,x+1),dn:"1/(x+1)"},
  xp2:{f:x=>rat(BigInt(x)*2n**BigInt(x)),d:x=>rat(BigInt(x+2)*2n**BigInt(x)),dn:"(x+2)·2ˣ"}
};
function gKul(){
  const g=gF[$("#g-k-f").value];let a=+$("#g-k-a").value,b=+$("#g-k-b").value;
  $("#g-k-av").textContent=a;$("#g-k-bv").textContent=b;
  const N=9;let r1="<tr><th>x</th>",r2="<tr><th>f(x)</th>",r3="<tr><th>Δf(x)</th>",r4="<tr><th>Δ²f(x)</th>",allOk=true;
  const D=x=>g.f(x+1).sub(g.f(x));
  for(let x=0;x<=N;x++){const d=D(x),d2=D(x+1).sub(D(x));if(!d.eq(g.d(x)))allOk=false;
    r1+=`<td>${x}</td>`;r2+=`<td>${g.f(x)}</td>`;r3+=`<td>${d}</td>`;r4+=`<td>${d2}</td>`;}
  $("#g-k-tbl").innerHTML=r1+"</tr>"+r2+"</tr>"+r3+"</tr>"+r4+"</tr>";
  let S=rat(0);if(b>a)for(let x=a;x<b;x++)S=S.add(D(x));
  const ft=g.f(b).sub(g.f(a));
  $("#g-k-info").innerHTML=`Δf = ${g.dn} minden x ≤ ${N}-re ${ok(allOk)}<br>`+(b>a?`Σ<sub>x=${a}</sub><sup>${b-1}</sup> Δf(x) = ${S} &nbsp;·&nbsp; f(${b}) − f(${a}) = ${ft} ${ok(S.eq(ft))}`:`b ≤ a: üres összeg (0), f(b) − f(a) = ${ft}; az alaptétel itt b &gt; a-ra szól`)+
    ($("#g-k-f").value==="xp2"?`<br>szorzatszabály: Δ(x·2ˣ) = x·Δ2ˣ + 2<sup>x+1</sup>·Δx, x = 3-nál: ${rat(3).mul(rat(8)).add(rat(16)).mul(rat(1))} = ${D(3)} ${ok(rat(3).mul(rat(8)).add(rat(16)).eq(D(3)))}`:"");
}
["#g-k-f","#g-k-a","#g-k-b"].forEach(id=>$(id).addEventListener("input",gKul));gKul();

/* --- §2 eséspolinomok és Stirling-számok --- */
function gEs(){
  const p=+$("#g-e-p").value,x=+$("#g-e-x").value;$("#g-e-pv").textContent=p;$("#g-e-xv").textContent=x;
  let r1="<tr><th>m</th>",r2="<tr><th>S(p,m)</th>",r3=`<tr><th>${x}<sup><u>m</u></sup></th>`,r4="<tr><th>S·x<sup><u>m</u></sup></th>",tot=0n;
  for(let m=0;m<=p;m++){const s=gSt(p,m),f=gFall(x,m);tot+=s*f;r1+=`<td>${m}</td>`;r2+=`<td>${s}</td>`;r3+=`<td>${f}</td>`;r4+=`<td>${s*f}</td>`;}
  $("#g-e-tbl").innerHTML=r1+"</tr>"+r2+"</tr>"+r3+"</tr>"+r4+"</tr>";
  let dok=true;for(let m=1;m<=p;m++)for(let y=0;y<=12;y++)if(gFall(y+1,m)-gFall(y,m)!==BigInt(m)*gFall(y,m-1))dok=false;
  const pw=BigInt(x)**BigInt(p);
  $("#g-e-info").innerHTML=`Σ S(p,m)·x<sup><u>m</u></sup> = ${tot} &nbsp;·&nbsp; x<sup>p</sup> = ${x}<sup>${p}</sup> = ${pw} ${ok(tot===pw)}<br>Δ x<sup><u>m</u></sup> = m·x<sup><u>m−1</u></sup> minden m ≤ ${p}, x ≤ 12 esetén ${ok(dok)}`;
}
["#g-e-p","#g-e-x"].forEach(id=>$(id).addEventListener("input",gEs));gEs();

/* --- §3 összegzés --- */
function gOssz(){
  const p=+$("#g-o-p").value,n=+$("#g-o-n").value;$("#g-o-pv").textContent=p;$("#g-o-nv").textContent=n;
  let direct=0n;for(let k=0;k<n;k++)direct+=BigInt(k)**BigInt(p);
  let tot=rat(0);const terms=[],syms=[];
  for(let m=1;m<=p;m++){const s=gSt(p,m),t=new Rat(s*gFall(n,m+1),BigInt(m+1));tot=tot.add(t);terms.push(String(t));syms.push(`${s===1n?"":s+"·"}n<sup><u>${m+1}</u></sup>/${m+1}`);}
  $("#g-o-info").innerHTML=`Σ<sub>k=0</sub><sup>n−1</sup> k<sup>${p}</sup> = ${syms.join(" + ")}<br>n = ${n}: ${terms.join(" + ")} = <b>${tot}</b> &nbsp;·&nbsp; közvetlenül: ${direct} ${ok(tot.eq(rat(direct)))}`;
}
["#g-o-p","#g-o-n"].forEach(id=>$(id).addEventListener("input",gOssz));gOssz();

/* --- §4 összegzés részenként --- */
function gRes(){
  const m=$("#g-r-m").value,n=+$("#g-r-n").value,c=Math.max(2,Math.round(+$("#g-r-c").value)||2);
  $("#g-r-nv").textContent=n;$("#g-r-cl").style.display=m==="kc"?"":"none";
  const i=$("#g-r-info"),pw=(b,e)=>{let r=1n;for(let j=0;j<e;j++)r*=BigInt(b);return r;};
  if(m==="kc"){
    let S=rat(0);for(let k=0;k<n;k++)S=S.add(rat(BigInt(k)*pw(c,k)));
    const uv=rat(BigInt(n)*pw(c,n),c-1);
    let Es=rat(0);for(let k=0;k<n;k++)Es=Es.add(rat(pw(c,k+1),c-1));
    const rhs=uv.sub(Es),cl=new Rat(BigInt(n)*pw(c,n)*BigInt(c-1)-BigInt(c)*(pw(c,n)-1n),BigInt((c-1)**2));
    i.innerHTML=`u = k, Δv = c<sup>k</sup> ⇒ v = c<sup>k</sup>/(c−1), Ev = c<sup>k+1</sup>/(c−1), Δu = 1<br>`+
      `[u·v]<sub>0</sub><sup>${n}</sup> = ${uv} &nbsp;·&nbsp; Σ Ev·Δu = ${Es}<br>különbség = ${rhs} &nbsp;·&nbsp; közvetlen Σ k·${c}<sup>k</sup> = ${S} ${ok(rhs.eq(S))}<br>zárt alak [n·c<sup>n</sup>(c−1) − c(c<sup>n</sup>−1)]/(c−1)² = ${cl} ${ok(cl.eq(S))}`;
  }else{
    const H=[rat(0)];for(let k=1;k<=n;k++)H.push(H[k-1].add(rat(1,k)));
    let S=rat(0);for(let k=0;k<n;k++)S=S.add(H[k]);
    let Es=rat(0);for(let k=0;k<n;k++)Es=Es.add(rat(k+1).mul(rat(1,k+1)));
    const uv=rat(n).mul(H[n]),rhs=uv.sub(Es);
    i.innerHTML=`u = H(k), Δv = 1 ⇒ v = k, Ev = k+1, Δu = 1/(k+1)<br>[u·v]<sub>0</sub><sup>${n}</sup> = n·H(n) = ${uv} &nbsp;·&nbsp; Σ Ev·Δu = Σ 1 = ${Es}<br>különbség = ${rhs} &nbsp;·&nbsp; közvetlen Σ H(k) = ${S} ${ok(rhs.eq(S))} (nH<sub>n</sub> − n)`;
  }
}
["#g-r-m","#g-r-c","#g-r-n"].forEach(id=>$(id).addEventListener("input",gRes));gRes();
