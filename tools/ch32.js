/* ================= 3.2 ALKALMAZÁSOK ================= */
function qLine(s,W,H,a,b,type){
  clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const lo=-6,hi=6,X=x=>20+(x-lo)*(W-40)/(hi-lo),y0=H/2+6;
  el("line",{x1:X(lo),x2:X(hi),y1:y0,y2:y0,class:"axis"},s);
  const inI=z=>(type[0]==="["?z>=a:z>a)&&(type[1]==="]"?z<=b:z<b);
  if(b>=a){el("rect",{x:X(a),y:y0-10,width:Math.max(2,X(b)-X(a)),height:10,rx:3,style:"fill:var(--accent);opacity:.35"},s);}
  for(let z=lo;z<=hi;z++){const on=b>=a&&inI(z);
    el("circle",{cx:X(z),cy:y0,r:on?6:3.5,style:`fill:${on?"var(--accent-2)":"var(--muted)"};opacity:${on?1:.7}`},s);txt(s,X(z),y0+22,z,"");}
  const endp=(x,closed)=>{if(x>=lo&&x<=hi){el("circle",{cx:X(x),cy:y0-5,r:7,style:`fill:${closed?"var(--accent)":"var(--surface)"};stroke:var(--accent);stroke-width:2.5`},s);}};
  if(b>=a){endp(a,type[0]==="[");endp(b,type[1]==="]");}
}
c2hero("alkalmazasok-bevezeto",600,8,fr=>{
  const s=$("#q-hero"),W=420,H=250,a=-2.3+0.2*fr,b=1.9+0.45*fr;
  const cnt=Math.floor(b)-Math.ceil(a)+1;
  qLine(s,W,H,a,b,"[]");
  $("#q-hero-a").textContent=`[${fm(a)}; ${fm(b)}]`;$("#q-hero-b").textContent=cnt;
});

/* --- §1 intervallum --- */
function qInt(){
  const av=+$("#q-i-a").value,bv=+$("#q-i-b").value;$("#q-i-av").textContent=fm(av/100);$("#q-i-bv").textContent=fm(bv/100);
  const a=av/100,b=bv/100;
  qLine(c2svg("#q-i-svg",640,130),640,130,a,b,"[]");
  /* egész aritmetika: x = v/100 */
  const FL=v=>Math.floor(v/100),CL=v=>-Math.floor(-v/100);
  const rows=[["[α, β]","[]",FL(bv)-CL(av)+1,"⌊β⌋ − ⌈α⌉ + 1",true],["(α, β)","()",CL(bv)-FL(av)-1,"⌈β⌉ − ⌊α⌋ − 1",false],["[α, β)","[)",CL(bv)-CL(av),"⌈β⌉ − ⌈α⌉",true],["(α, β]","(]",FL(bv)-FL(av),"⌊β⌋ − ⌊α⌋",true]];
  let h="<tr><th>intervallum</th><th>képlet</th><th>érték</th><th>felsorolás</th><th></th></tr>";
  rows.forEach(r=>{let c=0;if(bv>=av)for(let z=-10;z<=10;z++){const lo=r[1][0]==="["?100*z>=av:100*z>av,hi=r[1][1]==="]"?100*z<=bv:100*z<bv;if(lo&&hi)c++;}
    let val=r[2];const degenerate=bv<av||(!r[4]&&bv===av);
    h+=`<tr><th>${r[0]}</th><td>${r[3]}</td><td>${degenerate?"–":val}</td><td>${bv<av?"üres":c}</td><td>${degenerate?(bv<av?"α &gt; β":"α = β: a képlet nem érvényes"):ok(val===c)}</td></tr>`;});
  $("#q-i-tbl").innerHTML=h;
}
["#q-i-a","#q-i-b"].forEach(id=>$(id).addEventListener("input",qInt));qInt();

/* --- §2 Beatty --- */
const qAl={sqrt2:{a:Math.SQRT2},phi:{a:(1+Math.sqrt(5))/2},pi:{a:Math.PI},rat:{a:1.5,rat:true}};
function qBeatty(){
  const key=$("#q-b-a").value,N=+$("#q-b-n").value;$("#q-b-nv").textContent=N;
  const al=qAl[key].a,be=al/(al-1);
  const A=[],B=[];for(let n=1;n<=N;n++){const x=Math.floor(n*al+(qAl[key].rat?1e-9:0)),y=Math.floor(n*be+(qAl[key].rat?1e-9:0));if(x<=N)A.push(x);if(y<=N)B.push(y);}
  const cA={},cB={};A.forEach(x=>cA[x]=(cA[x]||0)+1);B.forEach(x=>cB[x]=(cB[x]||0)+1);
  let h=`<div class="cells" style="--nc:10">`,okAll=true,bad=[];
  for(let m=1;m<=N;m++){const a=cA[m]||0,b=cB[m]||0,tot=a+b,good=tot===1;if(!good){okAll=false;bad.push(m);}
    h+=`<div class="cell"><span class="cb ${a?"on":""}" style="${b&&!a?"background:var(--accent-2);border-color:var(--accent-2);color:#111;":""}${good?"":"outline:2px solid #e5484d;"}">${m}</span></div>`;}
  h+="</div>";$("#q-b-grid").innerHTML=h;
  $("#q-b-info").innerHTML=`α = ${fm(al)}, β = α/(α−1) = ${fm(be)}<br>α-spektrum (≤ ${N}): ${A.join(", ")}<br>β-spektrum (≤ ${N}): ${B.join(", ")}<br>`+
   (okAll?`minden 1…${N} egész pontosan egyszer szerepel ${ok(true)}`:`nem minden egész szerepel pontosan egyszer ${ok(false)}; hibás helyek: ${bad.slice(0,8).join(", ")}${bad.length>8?" …":""}`+(qAl[key].rat?" (racionális α: a tétel nem érvényes)":""));
}
["#q-b-a","#q-b-n"].forEach(id=>$(id).addEventListener("input",qBeatty));qBeatty();
