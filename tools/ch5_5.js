/* ================= 5.5 HIPERGEOMETRIKUS FÜGGVÉNYEK ================= */
const bcFact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const bcBin=(n,k)=>k<0||k>n?0n:bcFact(n)/(bcFact(k)*bcFact(n-k));
const bcRise=(x,m)=>{let r=rat(1);for(let i=0;i<m;i++)r=r.mul(x.add(rat(i)));return r;};
const bcZ=s=>{const[p,q]=s.split("/");return rat(BigInt(p),BigInt(q||1));};
const bcMin=v=>(v<0?"−"+(-v):""+v);
c2hero("hipergeom-bevezeto",420,10,fr=>{
  const n=fr+1,s=c2svg("#bc-hero",420,250),vals=[];for(let k=0;k<=n;k++)vals.push(Number(bcBin(n,k)**2n));
  const mx=Math.max(...vals),w=Math.min(30,360/(n+1)),x0=(420-(n+1)*w)/2;
  vals.forEach((v,k)=>{const h=v/mx*170;el("rect",{x:x0+k*w+2,y:210-h,width:w-4,height:h,rx:3,style:"fill:var(--accent);opacity:.55"},s);txt(s,x0+k*w+w/2,226,k,"","middle");});
  $("#bc-hero-a").textContent=`n = ${n}`;$("#bc-hero-b").textContent=`Σ = ${vals.reduce((a,b)=>a+b,0)} = C(${2*n},${n}) = ${bcBin(2*n,n)}`;
});
function bcT(){
  const kind=$("#bc-t-s").value,n=+$("#bc-t-n").value;$("#bc-t-nv").textContent=n;
  const t=k=>{switch(kind){case"bin":return rat(bcBin(n,k));case"sq":return rat(bcBin(n,k)**2n);case"cat":return rat(bcBin(2*k,k),k+1);case"fact":return rat(bcFact(k));case"inv":return rat(1n,bcFact(k));default:{let a=0n,b=1n;for(let i=0;i<k;i++)[a,b]=[b,a+b];return rat(a);}}};
  const rf={bin:k=>rat(n-k,k+1),sq:k=>rat((n-k)**2,(k+1)**2),cat:k=>rat(2*(2*k+1),k+2),fact:k=>rat(k+1),inv:k=>rat(1,k+1)};
  const K=Math.min(n,7),start=kind==="fib"?1:0,rows=[];
  for(let k=start;k<start+K;k++){if(t(k).n===0n)continue;rows.push([k,t(k+1).div(t(k))]);}
  let h="<tr><th>k</th>"+rows.map(r=>`<td>${r[0]}</td>`).join("")+"</tr><tr><th>t(k+1)/t(k)</th>"+rows.map(r=>`<td>${r[1]}</td>`).join("")+"</tr>";
  if(rf[kind])h+="<tr><th>képlet</th>"+rows.map(r=>`<td>${rf[kind](r[0])}</td>`).join("")+"</tr>";
  $("#bc-t-t").innerHTML=h;
  const names={bin:"(n−k)/(k+1)",sq:"((n−k)/(k+1))²",cat:"2(2k+1)/(k+2)",fact:"k+1",inv:"1/(k+1)"};
  $("#bc-t-info").innerHTML=rf[kind]?`hányados: ${names[kind]} ${ok(rows.every(r=>r[1].eq(rf[kind](r[0]))))}<br>racionális függvény → hipergeometrikus`:`hányados: 1; 2; 3/2; 5/3; 8/5; … → φ ≈ 1,618 (irracionális)<br>nem racionális függvény → <b>nem</b> hipergeometrikus (az érv a szövegben)`;
}
$("#bc-t-s").addEventListener("change",bcT);$("#bc-t-n").addEventListener("input",bcT);bcT();
function bcG(){
  const a=+$("#bc-g-a").value,b=+$("#bc-g-b").value,c=+$("#bc-g-c").value,z=bcZ($("#bc-g-z").value);
  $("#bc-g-av").textContent=bcMin(a);$("#bc-g-bv").textContent=bcMin(b);$("#bc-g-cv").textContent=c;
  const term=a<=0||b<=0,m=a<=0&&b<=0?Math.min(-a,-b):(a<=0?-a:(b<=0?-b:0)),nt=term?m:0;
  const isTerm=(a<=0)||(b<=0);let N=isTerm?m:0;
  const t=[rat(1)];if(isTerm){for(let k=0;k<N;k++)t.push(t[k].mul(rat(k+a)).mul(rat(k+b)).mul(z).div(rat(k+c)).div(rat(k+1)));}
  else for(let k=0;k<12;k++)t.push(t[k].mul(rat(k+a)).mul(rat(k+b)).mul(z).div(rat(k+c)).div(rat(k+1)));
  const show=t.slice(0,isTerm?t.length:8);
  $("#bc-g-t").innerHTML="<tr><th>k</th>"+show.map((_,k)=>`<td>${k}</td>`).join("")+"</tr><tr><th>tₖ</th>"+show.map(x=>`<td>${x}</td>`).join("")+"</tr>";
  let info="";
  if(isTerm){
    const S=t.reduce((s,x)=>s.add(x),rat(0));info=`véges sor (${N+1} tag): F = <b>${S}</b>`;
    const mm=a<=0?-a:-b,bb=a<=0?b:a;
    if(z.eq(rat(1))&&mm>=0){const cv=bcRise(rat(c-bb),mm).div(bcRise(rat(c),mm));info+=`<br>Chu–Vandermonde: (c−b)<sup>(${mm})</sup>/c<sup>(${mm})</sup> = ${cv} ${ok(cv.eq(S))}`;}
  }else{
    if(z.eq(rat(1))||z.eq(rat(-1))||Math.abs(z.num())>=1){
      if(z.eq(rat(1))&&c-a-b>=3){let s=0,tt=1;for(let k=0;k<20000;k++){s+=tt;tt*=(k+a)*(k+b)/((k+c)*(k+1));}
        const f=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;};const g=f(c-1)*f(c-a-b-1)/(f(c-a-1)*f(c-b-1));
        info=`végtelen sor, z = 1, c − a − b = ${c-a-b} > 0: részletösszeg (20000 tag) ≈ ${fm(s)}<br>Gauss: Γ(c)Γ(c−a−b)/(Γ(c−a)Γ(c−b)) = ${fm(g)} ${ok(Math.abs(s-g)/Math.abs(g)<1e-3)}`;}
      else info=`végtelen sor, |z| ≥ 1 vagy c − a − b < 3: itt nem számolunk (nem konvergál, vagy lassan). Válassz negatív a-t vagy b-t, vagy |z| < 1-et.`;
    }else{let s=0,tt=1;for(let k=0;k<400;k++){s+=tt;tt*=(k+a)*(k+b)/((k+c)*(k+1))*z.num();}info=`végtelen sor, |z| < 1: 400 tag összege ≈ <b>${fm(s)}</b> (a hányados-szabály szerint számolva)`;}
  }
  $("#bc-g-info").innerHTML=info+`<br>hányados: (k${a>=0?"+":"−"}${Math.abs(a)})(k${b>=0?"+":"−"}${Math.abs(b)}) / ((k+${c})(k+1)) · ${z}`;
}
["#bc-g-a","#bc-g-b","#bc-g-c"].forEach(i=>$(i).addEventListener("input",bcG));$("#bc-g-z").addEventListener("change",bcG);bcG();
