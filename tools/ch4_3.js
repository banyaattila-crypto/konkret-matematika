/* ================= 4.3 PRÍM PÉLDÁK ================= */
const ayPow=(a,e,m)=>{let r=1%m,b=a%m;while(e>0){if(e&1)r=r*b%m;b=b*b%m;e=Math.floor(e/2);}return r;};
const ayPrimes=n=>{const r=[];for(let k=2;k<=n;k++){let ok=true;for(let d=2;d*d<=k;d++)if(k%d===0){ok=false;break;}if(ok)r.push(k);}return r;};
function ayLL(p){if(p===2)return true;const M=(1n<<BigInt(p))-1n;let s=4n;for(let i=0;i<p-2;i++)s=(s*s-2n)%M;return s===0n;}
function ayMf(p){const M=2**p-1;for(let d=3;d*d<=M;d+=2)if(M%d===0)return d;return null;}
const ayPr31=ayPrimes(31);
c2hero("primpeldak-bevezeto",700,10,fr=>{
  const s=c2svg("#ay-hero",420,250),pm=Math.min(31,4+fr*3),cw=27,x0=(420-15*cw)/2;let last=null;
  for(let p=2;p<=31;p++){const i=p-2,x=x0+(i%15)*cw,y=30+Math.floor(i/15)*86,shown=p<=pm;
    const isP=ayPr31.includes(p),f=isP?ayMf(p):null,col=!isP?"var(--line)":(f===null?"var(--good)":"var(--bad)");
    el("rect",{x:x+2,y,width:cw-4,height:cw-4,rx:5,style:`fill:${col};opacity:${shown?(isP?.92:.45):.12}`},s);
    txt(s,x+cw/2,y+cw/2+2,p,"","middle").style.fill=isP&&shown?"#fff":"var(--muted)";
    if(shown&&isP&&f!==null)last=p;}
  txt(s,210,226,"zöld: M_p prím · piros: p prím, M_p összetett · szürke: p összetett","","middle");
  $("#ay-hero-a").textContent="p ≤ "+pm;
  $("#ay-hero-b").innerHTML=last?`M<sub>${last}</sub> = ${ayMf(last)}·${(2**last-1)/ayMf(last)}`:"–";
});
/* --- §1 --- */
const ayPs=ayPrimes(47);$("#ay-m-p").innerHTML=ayPs.map(p=>`<option${p===11?" selected":""}>${p}</option>`).join("");
function ayM(){
  const p=+$("#ay-m-p").value,M=2**p-1,lim=Math.floor(Math.sqrt(M));
  if(p===2){$("#ay-m-info").innerHTML=`M<sub>2</sub> = 3 prím.`;return;}
  let a=0,fa=null;for(let k=1;;k++){const q=2*k*p+1;if(q>lim)break;a++;if(ayPow(2,p,q)===1){fa=q;break;}}
  let b=0,fb=null;for(let d=3;d<=lim;d+=2){b++;if(M%d===0){fb=d;break;}}
  const agree=fa===fb;
  $("#ay-m-info").innerHTML=`M<sub>${p}</sub> = 2<sup>${p}</sup> − 1 = ${M}<br>`+
   (fa?`legkisebb osztó: <b>${fa}</b> = 2·${(fa-1)/(2*p)}·${p} + 1, a hányados ${M/fa} `:`nincs osztó √M-ig, <b>M<sub>${p}</sub> prím</b> `)+`${ok(agree)}<br>`+
   `próbák: csak 2kp+1 alakúak ${a} db &nbsp;·&nbsp; minden páratlan szám ${b} db &nbsp;·&nbsp; arány ≈ ${fm(+(b/Math.max(1,a)).toFixed(1))} (p = ${p})`;
}
$("#ay-m-p").addEventListener("change",ayM);ayM();
function ayL(){
  const n=+$("#ay-l-n").value;$("#ay-l-nv").textContent=n;
  const ps=ayPrimes(n).filter(p=>p>=2),hit=ps.filter(ayLL);
  const chk=ps.filter(p=>p<=47&&p>2).every(p=>(ayMf(p)===null)===ayLL(p));
  $("#ay-l-info").innerHTML=`Lucas–Lehmer p ≤ ${n}-re: M<sub>p</sub> prím, ha p = <b>${hit.join(", ")}</b><br>a többi prím kitevő összetett M<sub>p</sub>-t ad (${ps.length-hit.length} db) &nbsp;·&nbsp; p ≤ 47-ig egyezik az osztókereséssel ${ok(chk)}`;
}
$("#ay-l-n").addEventListener("input",ayL);ayL();
/* --- §2 --- */
function ayF(){
  const n=+$("#ay-f-n").value;$("#ay-f-nv").textContent=n;const F=(1n<<(1n<<BigInt(n)))+1n;
  let prod=1n;for(let k=0;k<n;k++)prod*=(1n<<(1n<<BigInt(k)))+1n;
  let h=`F<sub>${n}</sub> = ${F}<br>`;
  if(n<=4){let pr=true;const m=Number(F);for(let d=2;d*d<=m;d++)if(m%d===0){pr=false;break;}h+=`prím ${ok(pr)}<br>`;}
  else if(n===5){h+=`641 osztja: ${ok(F%641n===0n)} &nbsp;·&nbsp; F<sub>5</sub> = 641 · ${F/641n} &nbsp;·&nbsp; 2<sup>32</sup> mod 641 = ${ayPow(2,32,641)} = 641 − 1 ${ok(ayPow(2,32,641)===640)}<br>`;}
  else{h+=`274177 osztja: ${ok(F%274177n===0n)} &nbsp;·&nbsp; F<sub>6</sub> = 274177 · ${F/274177n}<br>`;}
  h+=`F<sub>${n}</sub> − 2 = F<sub>0</sub>···F<sub>${Math.max(0,n-1)}</sub>${n===0?" (üres szorzat = 1, F<sub>0</sub> − 2 = 1)":" = "+prod} ${ok(F-2n===prod)}`;
  let cop=true;const Fs=[0,1,2,3,4,5,6].slice(0,n+1).map(k=>(1n<<(1n<<BigInt(k)))+1n);
  for(let i=0;i<Fs.length;i++)for(let j=i+1;j<Fs.length;j++)if(rgcd(Fs[i],Fs[j])!==1n)cop=false;
  h+=`<br>F<sub>0</sub>…F<sub>${n}</sub> páronként relatív prímek ${ok(cop)}`;
  $("#ay-f-info").innerHTML=h;
}
$("#ay-f-n").addEventListener("input",ayF);ayF();
/* --- §3 --- */
(function(){
  const pp=[2,3,5,7,11,13,17,19,23,29,31,37];let P=1,h="<tr><th>n</th><th>pₙ</th><th>Eₙ</th><th>legkisebb prímosztó</th></tr>",allNew=true,first=[];
  pp.forEach((p,i)=>{P*=p;const E=P+1;let f=null;for(let d=2;d*d<=E;d++)if(E%d===0){f=d;break;}
    if(f!==null&&f<=p)allNew=false;if(f===null)first.push(i+1);
    h+=`<tr><td>${i+1}</td><td>${p}</td><td>${E}</td><td>${f===null?"<b>prím</b>":f}</td></tr>`;});
  $("#ay-e-t").innerHTML=h;
  $("#ay-e-info").innerHTML=`n ≤ 12-ig Eₙ prím, ha n = ${first.join(", ")} &nbsp;·&nbsp; minden prímosztó nagyobb pₙ-nél ${ok(allNew)}`;
})();
const ayN=1000000,ayS=new Uint8Array(ayN+1),ayP=[];for(let i=2;i<=ayN;i++){if(!ayS[i]){ayP.push(i);for(let j=i*i;j<=ayN;j+=i)ayS[j]=1;}}
function ayG(){
  const g=+$("#ay-g-n").value;$("#ay-g-nv").textContent=g;
  let f=null;for(let i=1;i<ayP.length;i++)if(ayP[i]-ayP[i-1]>=g){f=[ayP[i-1],ayP[i],ayP[i]-ayP[i-1]];break;}
  let fact=1n;for(let k=2n;k<=BigInt(g);k++)fact*=k;let comp=true;for(let k=2n;k<=BigInt(g);k++)if((fact+k)%k!==0n)comp=false;
  $("#ay-g-info").innerHTML=(f?`az első legalább ${g} különbségű prímpár: <b>${f[0]}</b> és <b>${f[1]}</b> (különbség ${f[2]}, azaz ${f[2]-1} összetett szám köztük)`:`1 000 000-ig nincs legalább ${g} különbségű prímpár`)+
   `<br>a konstrukció: ${g}! + 2, …, ${g}! + ${g} mind összetett ${ok(comp)} &nbsp;·&nbsp; ${g}! ${String(fact).length} jegyű szám`;
}
$("#ay-g-n").addEventListener("input",ayG);ayG();
