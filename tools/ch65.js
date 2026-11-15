/* ================= 6.8 FELADATOK ================= */
exHero("feladatokspec-bevezeto","#ah-hero","#ah-hero-k",[3,3,2,2]);
function ahH(){
  const n=+$("#ah-h-n").value;$("#ah-h-nv").textContent=n;
  const v2=x=>{let c=0n;while(x%2n===0n){x/=2n;c++;}return Number(c);};
  const H=hnR(n),a=Math.floor(Math.log2(n));let all=true,noint=true;
  for(let m=1;m<=200;m++){const h=hnR(m);if(v2(h.d)!==Math.floor(Math.log2(m)))all=false;if(m>1&&h.d===1n)noint=false;}
  const s=H.toString();
  $("#ah-h-info").innerHTML=`H<sub>${n}</sub> nevezője: ${s.includes("/")?s.split("/")[1].length>40?s.split("/")[1].slice(0,38)+"…":s.split("/")[1]:"1"}<br>a 2 kitevője a nevezőben: ${v2(H.d)} &nbsp;·&nbsp; ⌊log₂ ${n}⌋ = ${a} ${ok(v2(H.d)===a)}<br>n ≤ 200-ig minden esetben egyezik ${ok(all)} &nbsp;·&nbsp; H<sub>n</sub> egyik n &gt; 1-re sem egész ${ok(noint)}`;
}
$("#ah-h-n").addEventListener("input",ahH);ahH();
const ahPis=m=>{let a=0,b=1%m,c=0;do{[a,b]=[b,(a+b)%m];c++;}while(!(a===0&&b===1%m));return c;};
function ahP(){
  const m=+$("#ah-p-m").value;$("#ah-p-mv").textContent=m;const p=ahPis(m);
  let all=true;const eq=[];for(let k=2;k<=200;k++){const q=ahPis(k);if(q>6*k)all=false;if(q===6*k)eq.push(k);}
  const seq=[];let a=0,b=1%m;for(let i=0;i<Math.min(p,24);i++){seq.push(a);[a,b]=[b,(a+b)%m];}
  $("#ah-p-info").innerHTML=`F<sub>n</sub> mod ${m}: ${seq.join(", ")}${p>24?", …":""}<br>Pisano-periódus π(${m}) = <b>${p}</b> &nbsp;·&nbsp; π/m = ${fm(+(p/m).toFixed(3))}<br>π(m) ≤ 6m minden 2 ≤ m ≤ 200-ra ${ok(all)} &nbsp;·&nbsp; egyenlőség: m = ${eq.join(", ")}`;
}
$("#ah-p-m").addEventListener("input",ahP);ahP();
