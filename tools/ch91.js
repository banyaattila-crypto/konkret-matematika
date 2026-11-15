/* ================= 9.1 NAGY O ÉS TÁRSAI ================= */
c2hero("nagyo-bevezeto",700,10,fr=>{
  const n=20*(fr+1),s=$("#as-hero"),W=420,H=250,L=30,B=H-28,T=14;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const X=x=>L+x/200*(W-L-14),Y=v=>B-v/80000*(B-T);
  let d1="",d2="";for(let x=0;x<=200;x+=5){d1+=(x?"L":"M")+X(x)+" "+Y(x*x+100*x);d2+=(x?"L":"M")+X(x)+" "+Y(2*x*x);}
  el("path",{d:d1,style:"fill:none;stroke:var(--accent);stroke-width:2.2"},s);
  el("path",{d:d2,style:"fill:none;stroke:var(--accent-2);stroke-width:2.2"},s);
  el("line",{x1:X(100),x2:X(100),y1:T,y2:B,style:"stroke:currentColor;opacity:.25;stroke-dasharray:3 4"},s);
  el("line",{x1:X(n),x2:X(n),y1:T,y2:B,style:"stroke:currentColor;opacity:.6"},s);
  el("circle",{cx:X(n),cy:Y(n*n+100*n),r:4,style:"fill:var(--accent)"},s);el("circle",{cx:X(n),cy:Y(2*n*n),r:4,style:"fill:var(--accent-2)"},s);
  txt(s,X(100),H-10,"100","",  "middle");
  $("#as-hero-a").textContent=`n = ${n}`;$("#as-hero-b").textContent=`f ≤ 2g: ${n*n+100*n<=2*n*n?"igen":"nem"}`;
});
const asLF=n=>{if(n<30){let t=0;for(let k=2;k<=n;k++)t+=Math.log(k);return t;}return n*Math.log(n)-n+.5*Math.log(2*Math.PI*n)+1/(12*n)-1/(360*n**3);};
const asH=n=>{let h=0;for(let k=n;k>=1;k--)h+=1/k;return h;};
const asPairs=[
 {t:"n² + 100n  és  n²",r:n=>(n*n+100*n)/(n*n),v:"A hányados 1-hez tart: f ~ g, tehát f = Θ(g) is."},
 {t:"3n² + n·ln n  és  n²",r:n=>(3*n*n+n*Math.log(n))/(n*n),v:"A hányados 3-hoz tart: f = Θ(g), de f ~ g nem igaz."},
 {t:"n·ln n  és  n²",r:n=>n*Math.log(n)/(n*n),v:"A hányados 0-hoz tart: f = o(g)."},
 {t:"2ⁿ  és  n¹⁰",r:n=>Math.exp(n*Math.LN2-10*Math.log(n)),v:"A hányados nő minden határon túl: g = o(f). A hányados n = 2…58-ra 1 alatt van, n = 59-től fölötte."},
 {t:"Hₙ  és  ln n",r:n=>asH(n)/Math.log(n),v:"A hányados lassan 1-hez tart (1 + γ/ln n + …): H_n ~ ln n."},
 {t:"C(2n, n)  és  4ⁿ",r:n=>Math.exp(asLF(2*n)-2*asLF(n)-n*Math.log(4)),v:"A hányados 0-hoz tart, kb. 1/√(πn) ütemben: f = o(g)."},
 {t:"n!  és  (n/e)ⁿ",r:n=>Math.exp(asLF(n)-n*Math.log(n)+n),v:"A hányados nő, kb. √(2πn)-nel: g = o(f), de csak négyzetgyök-nagyságrenddel."},
];
const asSel=$("#as-r-p");asPairs.forEach((p,i)=>{const o=document.createElement("option");o.value=i;o.textContent=p.t;asSel.appendChild(o);});
const asFmt=v=>!isFinite(v)||v>1e12?"> 10¹²":v<1e-12?"< 10⁻¹²":fm(+v.toPrecision(4));
function asR(){
  const p=asPairs[+asSel.value],Ns=[10,100,1000,1e4,1e5,1e6];
  let h="<div class=\"tbl-wrap\"><table class=\"vals cmp\"><tr><th>n</th>"+Ns.map(n=>`<th>${n>=1e4?"10<sup>"+Math.round(Math.log10(n))+"</sup>":n}</th>`).join("")+"</tr><tr><td>f/g</td>"+Ns.map(n=>`<td>${asFmt(p.r(n))}</td>`).join("")+"</tr></table></div>";
  $("#as-r-info").innerHTML=h+`<p>${p.v}</p>`;
}
asSel.addEventListener("input",asR);asR();
