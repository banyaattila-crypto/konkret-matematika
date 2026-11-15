/* ================= 4.8 TOVÁBBI ALKALMAZÁSOK ================= */
const baGcd=(a,b)=>b?baGcd(b,a%b):a;
function baPow(a,e,m){let r=1n,b=BigInt(a)%BigInt(m);const M=BigInt(m);e=BigInt(e);while(e>0n){if(e&1n)r=r*b%M;b=b*b%M;e>>=1n;}return r%M;}
function baIsPrime(n){if(n<2)return false;for(let p=2;p*p<=n;p++)if(n%p===0)return false;return true;}
function baInv(a,m){let[r0,r1,s0,s1]=[BigInt(m),BigInt(a)%BigInt(m),0n,1n];while(r1!==0n){const q=r0/r1;[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];}return r0===1n?((s0%BigInt(m))+BigInt(m))%BigInt(m):null;}
c2hero("alkalmazasok-bevezeto",330,34,fr=>{
  const s=c2svg("#ba-hero",420,250),cx=210,cy=125,R=100,P=17,k=Math.min(fr,P-1);
  const pos=i=>[cx+R*Math.cos(2*Math.PI*i/P-Math.PI/2),cy+R*Math.sin(2*Math.PI*i/P-Math.PI/2)];
  const seq=[1];for(let i=1;i<=P-1;i++)seq.push(seq[i-1]*3%P);
  for(let i=0;i<P;i++){const[x,y]=pos(i);el("circle",{cx:x,cy:y,r:i===0?3:13,style:"fill:none;stroke:var(--line)"},s);if(i>0)txt(s,x,y+4,i,"","middle");}
  for(let i=0;i<k;i++){const[x1,y1]=pos(seq[i]),[x2,y2]=pos(seq[i+1]);el("line",{x1,y1,x2,y2,style:"stroke:var(--accent);opacity:.45"},s);}
  for(let i=0;i<=k;i++){const[x,y]=pos(seq[i]);el("circle",{cx:x,cy:y,r:13,style:`fill:var(--accent);opacity:${i===k?.55:.22}`},s);}
  $("#ba-hero-a").textContent="3ᵏ mod 17";$("#ba-hero-b").textContent=`k = ${k} → ${seq[k]}`;
});
function baH(){
  const a=+$("#ba-h-a").value,e=+$("#ba-h-e").value,m=+$("#ba-h-m").value;
  $("#ba-h-av").textContent=a;$("#ba-h-ev").textContent=e;$("#ba-h-mv").textContent=m;
  const bits=e.toString(2);let r=1n,M=BigInt(m),mul=0,sq=0;
  for(const b of bits){r=r*r%M;sq++;if(b==="1"){r=r*BigInt(a)%M;mul++;}}
  const naive=(()=>{let t=1n;for(let i=0;i<e;i++)t=t*BigInt(a)%M;return t;})();
  const tot=(sq-1)+(mul-1);
  $("#ba-h-info").innerHTML=`e = ${e} = (${bits})<sub>2</sub> &nbsp;·&nbsp; ${a}<sup>${e}</sup> mod ${m} = <b>${r}</b><br>négyzetre emelés: ${sq-1}, szorzás: ${mul-1}, összesen ${tot} (naiv: ${e-1}) &nbsp;·&nbsp; ismételt szorzással ${naive} ${ok(naive===r)} &nbsp;·&nbsp; BigInt: ${baPow(a,e,m)} ${ok(baPow(a,e,m)===r)}`;
}
["#ba-h-a","#ba-h-e","#ba-h-m"].forEach(i=>$(i).addEventListener("input",baH));baH();
function baF(){
  const n=+$("#ba-f-n").value;$("#ba-f-nv").textContent=n;
  const pr=baIsPrime(n);let cop=0,pass=0,wit=[];
  for(let a=2;a<n;a++){const g=baGcd(a,n);if(g===1){cop++;if(baPow(a,n-1,n)===1n)pass++;else if(wit.length<8)wit.push(a);}}
  const car=!pr&&n>2&&cop>0&&pass===cop;
  const first=[];for(let a=2;a<n&&first.length<6;a++)if(baPow(a,n-1,n)!==1n)first.push(a);
  $("#ba-f-info").innerHTML=`n = ${n} — ${pr?"prím":"összetett"} &nbsp;·&nbsp; relatív prím alapok (2…n−1): ${cop}, közülük a<sup>n−1</sup> ≡ 1: ${pass}<br>`+
   (pr?`prímnél minden alap átmegy ${ok(pass===cop)}`:car?`<b>Carmichael-szám</b>: minden relatív prím alap átmegy. Leleplező (nem relatív prím) alapok: ${first.join(", ")} ${ok(true)}`:`tanúk (alapok, amelyek leleplezik): ${first.length?first.join(", "):"nincs"} ${ok(first.length>0)}`);
}
$("#ba-f-n").addEventListener("input",baF);baF();
function baR(){
  const [p,q]=$("#ba-r-k").value.split(",").map(BigInt),n=p*q,ph=(p-1n)*(q-1n);let e=17n;while(baGcd(Number(e),Number(ph))!==1)e+=2n;
  const d=baInv(e,ph);const mx=Number(n)-1;const inp=$("#ba-r-m");inp.max=mx;if(+inp.value>mx)inp.value=mx;
  const m=BigInt(inp.value);$("#ba-r-mv").textContent=inp.value;
  const c=baPow(m,e,n),back=baPow(c,d,n);
  $("#ba-r-info").innerHTML=`p = ${p}, q = ${q} → n = ${n}, φ(n) = ${ph}<br>e = ${e}, d = ${d} (e·d mod φ = ${e*d%ph} ${ok(e*d%ph===1n)})<br>titkosítás: ${m}<sup>${e}</sup> mod ${n} = <b>${c}</b> &nbsp;·&nbsp; visszafejtés: ${c}<sup>${d}</sup> mod ${n} = <b>${back}</b> ${ok(back===m)}<br><i>csak szemléltetés, a valódi RSA-hoz ez nem elég</i>`;
}
$("#ba-r-k").addEventListener("change",baR);$("#ba-r-m").addEventListener("input",baR);baR();
function baI(){
  const raw=$("#ba-i-s").value.replace(/[\s-]/g,"").toUpperCase(),out=$("#ba-i-info");
  if(/^\d{9}[\dX]$/.test(raw)){
    const v=[...raw].map(ch=>ch==="X"?10:+ch),s=v.reduce((t,x,i)=>t+x*(10-i),0),part=v.slice(0,9).reduce((t,x,i)=>t+x*(10-i),0),need=(11-part%11)%11;
    out.innerHTML=`ISBN-10 · Σ(11−i)·dᵢ = ${s} = 11·${Math.floor(s/11)} + ${s%11} → ${s%11===0?"érvényes":"<b>érvénytelen</b>"} ${ok(s%11===0||need!==v[9])}<br>az első 9 jegyhez tartozó ellenőrző jegy: ${need===10?"X":need}`;
  }else if(/^\d{13}$/.test(raw)){
    const v=[...raw].map(Number),s=v.reduce((t,x,i)=>t+x*(i%2?3:1),0),part=v.slice(0,12).reduce((t,x,i)=>t+x*(i%2?3:1),0),need=(10-part%10)%10;
    out.innerHTML=`ISBN-13 · Σ wᵢ·dᵢ = ${s} → ${s%10===0?"érvényes":"<b>érvénytelen</b>"} (mod 10 = ${s%10}) ${ok(s%10===0||need!==v[12])}<br>az első 12 jegyhez tartozó ellenőrző jegy: ${need}`;
  }else out.innerHTML="Adj meg 10 jegyet (az utolsó lehet X) vagy 13 jegyet.";
}
$("#ba-i-s").addEventListener("input",baI);baI();
function baD(){
  const t=$("#ba-d-t");let n=Math.max(0,Math.floor(+t.value||0));if(n>999999999999)n=999999999999;
  const ds=String(n).split("").map(Number),s9=ds.reduce((a,b)=>a+b,0);
  const alt=ds.slice().reverse().reduce((a,x,i)=>a+(i%2?-x:x),0);
  const grp=[];let z=String(n);while(z.length){grp.push(+z.slice(-3));z=z.slice(0,-3);}
  const g=grp.reduce((a,x,i)=>a+(i%2?-x:x),0),md=(x,m)=>((x%m)+m)%m;
  $("#ba-d-info").innerHTML=`számjegyösszeg ${s9} → mod 9: ${md(s9,9)}, a szám mod 9: ${n%9} ${ok(md(s9,9)===n%9)}<br>váltakozó összeg ${alt} → mod 11: ${md(alt,11)}, a szám mod 11: ${n%11} ${ok(md(alt,11)===n%11)}<br>hármas csoportok váltakozó összege ${g} → mod 1001: ${md(g,1001)}, a szám mod 1001: ${n%1001} ${ok(md(g,1001)===n%1001)} · mod 7, 11, 13: ${md(g,7)}, ${md(g,11)}, ${md(g,13)} ${ok(md(g,7)===n%7&&md(g,11)===n%11&&md(g,13)===n%13)}`;
}
$("#ba-d-t").addEventListener("input",baD);baD();
