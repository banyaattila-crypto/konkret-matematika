/* ================= 6.3 FIBONACCI-SZÁMOK ================= */
const fbB=(()=>{const a=[0n,1n];for(let i=2;i<=130;i++)a.push(a[i-1]+a[i-2]);return a;})();
const fbGcd=(a,b)=>{while(b){[a,b]=[b,a%b];}return a;};
c2hero("fibonacci-bevezeto",700,10,fr=>{
  const s=$("#af-hero"),W=420,H=250,n=2+fr,phi=(1+Math.sqrt(5))/2;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const y=v=>H-30-(v-1)*(H-60)/1.2,x=k=>30+(k-2)*(W-60)/10;
  el("line",{x1:20,x2:W-10,y1:y(phi),y2:y(phi),style:"stroke:var(--accent-2);stroke-dasharray:4 4"},s);txt(s,W-30,y(phi)-6,"φ","");
  for(let k=2;k<=n;k++){const r=Number(fbB[k+1])/Number(fbB[k]);el("circle",{cx:x(k),cy:y(r),r:5,style:`fill:var(--accent);opacity:${k===n?1:.5}`},s);txt(s,x(k),H-10,k,"");}
  $("#af-hero-a").textContent="n = "+n;$("#af-hero-b").textContent=fm(+(Number(fbB[n+1])/Number(fbB[n])).toFixed(6));
});
function afA(){
  const n=+$("#af-a-n").value,m=+$("#af-a-m").value;$("#af-a-nv").textContent=n;$("#af-a-mv").textContent=m;
  const cas=fbB[n-1]*fbB[n+1]-fbB[n]*fbB[n],ex=n%2?-1n:1n,add=fbB[m+n]===fbB[m]*fbB[n+1]+fbB[m-1]*fbB[n];
  let sm=0n,sq=0n;for(let k=1;k<=n;k++){sm+=fbB[k];sq+=fbB[k]*fbB[k];}
  $("#af-a-info").innerHTML=`Q<sup>${n}</sup> = [[${fbB[n+1]}, ${fbB[n]}], [${fbB[n]}, ${fbB[n-1]}]]<br>F<sub>n−1</sub>F<sub>n+1</sub> − F<sub>n</sub>² = ${cas} = (−1)<sup>${n}</sup> ${ok(cas===ex)}<br>F<sub>m+n</sub> = F<sub>m</sub>F<sub>n+1</sub> + F<sub>m−1</sub>F<sub>n</sub> = ${fbB[m+n]} ${ok(add)}<br>ΣF<sub>k</sub> (k ≤ n) = ${sm} = F<sub>n+2</sub> − 1 ${ok(sm===fbB[n+2]-1n)} &nbsp;·&nbsp; ΣF<sub>k</sub>² = ${sq} = F<sub>n</sub>F<sub>n+1</sub> ${ok(sq===fbB[n]*fbB[n+1])}`;
}
["#af-a-n","#af-a-m"].forEach(i=>$(i).addEventListener("input",afA));afA();
function afO(){
  const m=+$("#af-o-m").value,n=+$("#af-o-n").value;$("#af-o-mv").textContent=m;$("#af-o-nv").textContent=n;
  const g=fbGcd(fbB[m],fbB[n]),gi=Number(fbGcd(BigInt(m),BigInt(n)));
  let all=true;for(let a=1;a<=60;a++)for(let b=1;b<=60;b++)if(fbGcd(fbB[a],fbB[b])!==fbB[Number(fbGcd(BigInt(a),BigInt(b)))])all=false;
  $("#af-o-info").innerHTML=`F<sub>${m}</sub> = ${fbB[m]}<br>F<sub>${n}</sub> = ${fbB[n]}<br>gcd = ${g} &nbsp;·&nbsp; F<sub>gcd(${m},${n})</sub> = F<sub>${gi}</sub> = ${fbB[gi]} ${ok(g===fbB[gi])}<br>a tétel minden 1 ≤ m, n ≤ 60-ra igaz ${ok(all)}`;
}
["#af-o-m","#af-o-n"].forEach(i=>$(i).addEventListener("input",afO));afO();
const afZs=(()=>{const c={};const rec=(i,last,s)=>{if(i>16){c[s]=(c[s]||0)+1;return;}rec(i+1,last,s);if(last!==i-1)rec(i+1,i,s+Number(fbB[i]));};rec(2,0,0);return c;})();
function afZ(){
  let n=+$("#af-z-n").value;$("#af-z-nv").textContent=n;const idx=[],r0=n;
  for(let i=16;i>=2;i--)if(Number(fbB[i])<=n){idx.push(i);n-=Number(fbB[i]);}
  const nonc=idx.every((v,i)=>i===0||idx[i-1]-v>=2),sum=idx.reduce((a,i)=>a+Number(fbB[i]),0);
  let uniq=true;for(let k=0;k<=1596;k++)if(afZs[k]!==1)uniq=false;
  const bits=[];for(let i=16;i>=2;i--)bits.push(idx.includes(i)?1:0);
  $("#af-z-info").innerHTML=`${r0} = ${idx.map(i=>`F<sub>${i}</sub>`).join(" + ")} = ${idx.map(i=>fbB[i]).join(" + ")} = ${sum} ${ok(sum===r0)}<br>nincs két szomszédos index ${ok(nonc)}<br>bináris alak (F<sub>16</sub> … F<sub>2</sub>): ${bits.join("")}<br>0…1596 minden száma pontosan egy nem szomszédos részhalmaz összege ${ok(uniq&&Object.keys(afZs).length===1597)}`;
}
$("#af-z-n").addEventListener("input",afZ);afZ();
