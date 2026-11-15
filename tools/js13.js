/* ================= 1.3 A JOSEPHUS-PROBLÉMA ================= */
function josSim(n,k){
  const a=Array.from({length:n},(_,i)=>i+1),order=[],starts=[];let i=0;
  while(a.length>1){starts.push(a[i]);i=(i+k-1)%a.length;order.push(a.splice(i,1)[0]);if(i>=a.length)i=0;}
  order.push(a[0]);return {order,starts};
}
const josJ=(n,k=2)=>josSim(n,k).order[n-1];
const josC=n=>{const m=31-Math.clz32(n);return 2*(n-(1<<m))+1;};
const sup2=m=>`2<sup>${m}</sup>`;

class Ring{
  constructor(svg,o){
    this.svg=svg;this.o=Object.assign({W:340,pick:false,onChange:null},o);
    svg.setAttribute("viewBox",`0 0 ${this.o.W} ${this.o.W}`);
    this.reset(this.o.n||10,this.o.k||2);
  }
  reset(n,k){
    this.n=n;this.k=k;const s=josSim(n,k);this.order=s.order;this.starts=s.starts;
    this.rank=new Array(n+1);s.order.forEach((p,i)=>{this.rank[p]=i;});
    this.step=0;this.guess=0;this.build();this.paint();
  }
  build(){
    clear(this.svg);const W=this.o.W,c=W/2,R=c-26,n=this.n,sp=2*Math.PI*R/n,r=Math.min(17,sp*.42);this.r=r;this.pp=[];
    this.hub=el("text",{x:c,y:c+7,"text-anchor":"middle"},this.svg);
    this.hub.style.cssText="font-family:var(--f-display);font-size:24px;fill:var(--muted)";
    for(let p=1;p<=n;p++){
      const a=-Math.PI/2+(p-1)*2*Math.PI/n,x=c+R*Math.cos(a),y=c+R*Math.sin(a);
      const g=el("g",{},this.svg);g.style.cursor=this.o.pick?"pointer":"default";
      const ci=el("circle",{cx:x,cy:y,r},g);
      const fs=Math.max(6.5,Math.min(13,r*1.05));
      const t=el("text",{x,y:y+fs*.36,"text-anchor":"middle"},g);
      t.style.cssText=`font-family:var(--f-mono);font-size:${fs}px;pointer-events:none`;t.textContent=p;
      g.addEventListener("click",()=>this.pick(p));
      this.pp[p]={ci,t,x,y};
    }
    this.sr=el("circle",{r:r+5,fill:"none"},this.svg);this.sr.style.cssText="stroke:var(--accent);stroke-width:2.2;pointer-events:none";
    this.gr=el("circle",{r:r+4,fill:"none"},this.svg);this.gr.style.cssText="stroke:var(--accent-2);stroke-width:2.2;stroke-dasharray:4 3;pointer-events:none";
  }
  pick(p){if(!this.o.pick||this.step>0)return;this.guess=this.guess===p?0:p;this.paint();this.o.onChange&&this.o.onChange(this);}
  next(){if(this.step<this.n-1){this.step++;this.paint();this.o.onChange&&this.o.onChange(this);return true;}return false;}
  done(){return this.step>=this.n-1;}
  survivor(){return this.order[this.n-1];}
  paint(){
    const done=this.done(),sv=this.survivor();
    for(let p=1;p<=this.n;p++){
      const q=this.pp[p],rk=this.rank[p],dead=rk<this.step&&!(done&&p===sv),last=rk===this.step-1&&!done,surv=done&&p===sv;
      let f="var(--surface)",s="var(--accent)",tc="var(--ink)",op=1,td="none";
      if(dead){f="var(--paper)";s="var(--line)";tc="var(--muted)";op=.6;td="line-through";}
      if(last){f="var(--bad)";s="var(--bad)";tc="var(--ink)";op=1;}
      if(surv){f="var(--accent-2)";s="var(--accent-2)";tc="#111";}
      q.ci.style.cssText=`fill:${f};fill-opacity:${last?.28:1};stroke:${s};stroke-width:1.6;opacity:${op}`;
      q.t.style.fill=tc;q.t.style.opacity=op;q.t.style.textDecoration=td;
    }
    if(!done){const st=this.starts[this.step],q=this.pp[st];this.sr.setAttribute("cx",q.x);this.sr.setAttribute("cy",q.y);this.sr.style.display="";}
    else this.sr.style.display="none";
    if(this.guess){const q=this.pp[this.guess];this.gr.setAttribute("cx",q.x);this.gr.setAttribute("cy",q.y);this.gr.style.display="";}else this.gr.style.display="none";
    this.hub.textContent=done?`J = ${sv}`:`${this.n-this.step} fő`;
  }
}

/* --- hero --- */
const jHero=new Ring($("#j-hero"),{n:10,k:2});
(async function jHeroLoop(){
  const up=()=>{$("#j-hero-b").innerHTML=jHero.done()?`túlélő: <b>${jHero.survivor()}</b>`:`kiesett: <b>${jHero.step}</b>`;};
  if(reduce){jHero.step=jHero.n-1;jHero.paint();up();return;}
  for(;;){
    jHero.reset(10,2);up();
    while(!jHero.done()){await sleep(900);while(document.hidden||curPage!=="josephus-bevezeto")await sleep(400);jHero.next();up();}
    await sleep(3400);
  }
})();

/* --- §1 játszótér --- */
let jTok=0,jPlaying=false;
const jPg=new Ring($("#j-pg"),{n:10,k:2,pick:true,onChange:()=>jPgUpd()});
function jPgUpd(){
  const r=jPg,done=r.done();
  $("#j-pg-out").textContent=r.step;$("#j-pg-left").textContent=r.n-r.step;$("#j-pg-surv").textContent=done?r.survivor():"?";
  let msg="",cls="";
  if(done){
    const s=r.survivor();
    if(r.guess){msg=r.guess===s?`Eltaláltad: a ${s}. ember maradt.`:`A túlélő a ${s}. ember, te a ${r.guess}.-ra tippeltél.`;cls=r.guess===s?"ok":"bad";}
    else msg=`A túlélő a ${s}. ember.`;
    if(r.k===2)msg+=` Képlet: J(${r.n}) = ${josC(r.n)}.`;
    if(r.k===3&&r.n===41)msg+` `;
    if(r.k===3&&r.n===41)msg+=` A legenda szerint Josephus a ${s}., a társa a ${r.order[r.n-2]}. helyen állt.`;
  }else if(r.step===0)msg=r.guess?`Tipp: ${r.guess}. ember. Indulhat a kiesés.`:"Koppints egy emberre a tippeléshez.";
  else msg=`Kiesett: ${r.order[r.step-1]}.`;
  const m=$("#j-pg-msg");m.textContent=msg;m.className="msg "+cls;
  $("#j-pg-order").textContent=r.step?`Sorrend: ${r.order.slice(0,r.step).join(", ")}${done?"  →  túlélő: "+r.survivor():""}`:"";
  $("#j-pg-step").disabled=done;
}
function jPgReset(){jTok++;jPlaying=false;$("#j-pg-play").textContent="Lejátszás";jPg.reset(+$("#j-pg-n").value,jPg.k);jPgUpd();}
function jSetK(k){jPg.k=k;$("#j-pg-k2").classList.toggle("primary",k===2);$("#j-pg-k3").classList.toggle("primary",k===3);jPgReset();}
$("#j-pg-n").addEventListener("input",()=>{$("#j-pg-nv").textContent=$("#j-pg-n").value;jPgReset();});
$("#j-pg-k2").onclick=()=>jSetK(2);$("#j-pg-k3").onclick=()=>jSetK(3);
$("#j-pg-leg").onclick=()=>{$("#j-pg-n").value=41;$("#j-pg-nv").textContent=41;jSetK(3);};
$("#j-pg-reset").onclick=jPgReset;
$("#j-pg-step").onclick=()=>{jTok++;jPlaying=false;$("#j-pg-play").textContent="Lejátszás";jPg.next();};
$("#j-pg-play").onclick=async()=>{
  if(jPlaying){jTok++;jPlaying=false;$("#j-pg-play").textContent="Lejátszás";return;}
  if(jPg.done()){jPg.reset(jPg.n,jPg.k);jPgUpd();}
  const tok=++jTok;jPlaying=true;$("#j-pg-play").textContent="Szünet";
  while(jPlaying&&tok===jTok&&!jPg.done()){jPg.next();await sleep(jPg.n>24?240:520);}
  if(tok===jTok){jPlaying=false;$("#j-pg-play").textContent="Lejátszás";}
};
jPgUpd();

/* --- §2 kis esetek --- */
(function jSmall(){
  const N=16;let h="<tr><th>n</th>";for(let n=1;n<=N;n++)h+=`<td>${n}</td>`;
  h+="</tr><tr class=\"hl\"><th>J(n)</th>";for(let n=1;n<=N;n++)h+=`<td>${josJ(n)}</td>`;$("#j-vals").innerHTML=h+"</tr>";
  const s=$("#j-bars"),W=640,H=210,l=34,r=10,tp=18,b=26;s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const bw=(W-l-r)/N,ys=v=>H-b-(H-b-tp)*v/16;
  [0,4,8,12,16].forEach(v=>{el("line",{x1:l,x2:W-r,y1:ys(v),y2:ys(v),class:"grid-l"},s);txt(s,l-6,ys(v)+4,v,"","end");});
  for(let n=1;n<=N;n++){const j=josJ(n),x=l+(n-1)*bw;
    el("rect",{x:x+bw*.18,y:ys(j),width:bw*.64,height:H-b-ys(j),rx:2,style:`fill:${j===1?"var(--accent-2)":"var(--accent)"}`},s);
    txt(s,x+bw/2,ys(j)-4,j,j===1?"gold":"acc");txt(s,x+bw/2,H-8,n);}
})();

/* --- §3 rekurzió: egy kör után --- */
let jRecPar=0;
function jRecDraw(){
  const n=+$("#j-rec-n").value;$("#j-rec-nv").textContent=n;const N=2*n+jRecPar,s=$("#j-rec");clear(s);
  const W=360;s.setAttribute("viewBox",`0 0 ${W} ${W}`);const c=W/2,R1=c-26,R2=R1*.5;
  const P=(i,cnt,R)=>{const a=-Math.PI/2+i*2*Math.PI/cnt;return [c+R*Math.cos(a),c+R*Math.sin(a)];};
  const r1=Math.min(14,2*Math.PI*R1/N*.42),r2=Math.min(18,2*Math.PI*R2/n*.42);
  const alive=[];for(let p=1;p<=N;p++){if(!(p%2===0||(jRecPar&&p===1)))alive.push(p);}
  /* összekötő vonalak (alul) */
  alive.forEach((p,j)=>{const [x1,y1]=P(p-1,N,R1),[x2,y2]=P(j,n,R2);el("line",{x1,y1,x2,y2,style:"stroke:var(--accent-2);stroke-width:1.2;opacity:.55"},s);});
  for(let p=1;p<=N;p++){
    const [x,y]=P(p-1,N,R1),dead=!alive.includes(p);
    const g=el("g",{},s);
    el("circle",{cx:x,cy:y,r:r1,style:dead?"fill:var(--paper);stroke:var(--line);stroke-width:1.5;opacity:.65":"fill:var(--surface);stroke:var(--accent);stroke-width:1.6"},g);
    const t=el("text",{x,y:y+4,"text-anchor":"middle"},g);t.style.cssText=`font-family:var(--f-mono);font-size:${Math.max(8,r1*.95)}px;fill:${dead?"var(--muted)":"var(--ink)"};${dead?"text-decoration:line-through;opacity:.7":""}`;t.textContent=p;
  }
  alive.forEach((p,j)=>{const [x,y]=P(j,n,R2);
    el("circle",{cx:x,cy:y,r:r2,style:"fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.8"},s);
    const t=el("text",{x,y:y+4.5,"text-anchor":"middle"},s);t.style.cssText=`font-family:var(--f-mono);font-size:${Math.max(9,r2*.9)}px;font-weight:600;fill:var(--accent)`;t.textContent=j+1;});
  const h=el("text",{x:c,y:c+4,"text-anchor":"middle"},s);h.style.cssText="font-family:var(--f-body);font-size:12px;fill:var(--muted)";h.textContent="új számozás";
  const Jn=josJ(n),JN=josJ(N),pred=jRecPar?2*Jn+1:2*Jn-1;
  $("#j-rec-info").innerHTML=`Külső kör: ${N} ember, eredeti sorszámokkal (áthúzva: kiesettek). Belső kör: ${n} ember, új sorszámokkal.<br>`+
    `J(${N}) = 2·J(${n}) ${jRecPar?"+":"−"} 1 = 2·${Jn} ${jRecPar?"+":"−"} 1 = ${pred}<br>Szimulációval: J(${N}) = ${JN} ${JN===pred?"✓":"✗"}`;
  $("#j-rec-even").classList.toggle("primary",!jRecPar);$("#j-rec-odd").classList.toggle("primary",!!jRecPar);
}
$("#j-rec-n").addEventListener("input",jRecDraw);
$("#j-rec-even").onclick=()=>{jRecPar=0;jRecDraw();};$("#j-rec-odd").onclick=()=>{jRecPar=1;jRecDraw();};
jRecDraw();

/* --- §4 fűrészfog --- */
function jSawDraw(){
  const sel=+$("#j-saw-n").value;$("#j-saw-nv").textContent=sel;
  const s=$("#j-saw"),W=640,H=270,l=38,r=10,tp=14,b=34,NN=64;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const X=n=>l+(n-.5)*(W-l-r)/NN,Y=v=>H-b-(H-b-tp)*v/NN;
  [0,16,32,48,64].forEach(v=>{el("line",{x1:l,x2:W-r,y1:Y(v),y2:Y(v),class:"grid-l"},s);txt(s,l-6,Y(v)+4,v,"","end");});
  [1,2,4,8,16,32,64].forEach(p=>{el("line",{x1:X(p),x2:X(p),y1:tp,y2:H-b,style:"stroke:var(--line);stroke-dasharray:3 4"},s);txt(s,X(p),H-b+16,String(p),"",p===64?"end":"middle");});
  txt(s,(l+W-r)/2,H-4,"n  (a függőleges vonalak a kettőhatványok)","");
  for(let m=0;m<=6;m++){
    const a=1<<m,z=Math.min(2*a-1,NN),col=m%2?"var(--accent-2)":"var(--accent)";
    el("polyline",{points:Array.from({length:z-a+1},(_,i)=>`${X(a+i)},${Y(josC(a+i))}`).join(" "),style:`fill:none;stroke:${col};stroke-width:2`},s);
    for(let n=a;n<=z;n++)el("circle",{cx:X(n),cy:Y(josC(n)),r:n===sel?0:2.6,style:`fill:${col}`},s);
  }
  const jv=josC(sel);
  el("line",{x1:X(sel),x2:X(sel),y1:Y(jv),y2:H-b,style:"stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"},s);
  el("circle",{cx:X(sel),cy:Y(jv),r:6,style:"fill:var(--ink);stroke:var(--surface);stroke-width:2"},s);
  const m=31-Math.clz32(sel),l_=sel-(1<<m);
  $("#j-saw-info").innerHTML=`n = ${sel} = ${sup2(m)} + ${l_} &nbsp;→&nbsp; J = 2·${l_} + 1 = <b>${jv}</b><br>Szimulációval: J(${sel}) = ${josJ(sel)} ${josJ(sel)===jv?"✓":"✗"}`;
}
$("#j-saw-n").addEventListener("input",jSawDraw);jSawDraw();

/* --- §5 bináris forgatás --- */
function jBinDraw(){
  const n=Math.max(1,Math.min(511,Math.round(+$("#j-bin-n").value)||1)),b=n.toString(2),rot=b.slice(1)+"1",jv=josC(n);
  const lz=(rot.match(/^0*/)||[""])[0].length;
  const mk=(str,leadIdx,zeros)=>`<div class="bits" style="--nb:${str.length}">`+[...str].map((ch,i)=>`<span class="bit${i===leadIdx?" lead":""}${i<zeros?" zero":""}">${ch}</span>`).join("")+"</div>";
  $("#j-bits-a").outerHTML=`<div class="bits" id="j-bits-a" style="--nb:${b.length}">${[...b].map((ch,i)=>`<span class="bit${i===0?" lead":""}">${ch}</span>`).join("")}</div>`;
  $("#j-bits-b").outerHTML=`<div class="bits" id="j-bits-b" style="--nb:${rot.length}">${[...rot].map((ch,i)=>`<span class="bit${i===rot.length-1?" lead":""}${i<lz?" zero":""}">${ch}</span>`).join("")}</div>`;
  const m=b.length-1,l=n-(1<<m);
  const ch=[n];while(josC(ch[ch.length-1])!==ch[ch.length-1])ch.push(josC(ch[ch.length-1]));
  const nu=(b.match(/1/g)||[]).length;
  $("#j-bin-info").innerHTML=`${n} = ${b}<sub>2</sub> → ${rot}<sub>2</sub> = <b>${jv}</b> &nbsp;·&nbsp; képlettel: ${sup2(m)} + ${l}, 2·${l} + 1 = ${jv} ${jv===parseInt(rot,2)?"✓":"✗"}<br>`+
    `J ismételve: ${ch.join(" → ")}${ch.length===1?" (fixpont)":""} &nbsp;·&nbsp; ν(n) = ${nu} → ${sup2(nu)} − 1 = ${(1<<nu)-1} ${ch[ch.length-1]===(1<<nu)-1?"✓":"✗"}`;
}
$("#j-bin-n").addEventListener("input",jBinDraw);
document.querySelectorAll("[data-bn]").forEach(bt=>bt.onclick=()=>{$("#j-bin-n").value=bt.dataset.bn;jBinDraw();});
jBinDraw();

/* --- §6 általános rekurzió, repertoár --- */
function jGenDraw(){
  const a=Math.round(+$("#j-a").value)||0,b=Math.round(+$("#j-b").value)||0,c=Math.round(+$("#j-c").value)||0;
  const n=Math.max(1,Math.min(100000,Math.round(+$("#j-gn").value)||1));
  const rec=k=>k===1?a:2*rec(k>>1)+((k&1)?c:b);
  const A=k=>1<<(31-Math.clz32(k)),Bf=k=>A(k)-1-(k-A(k)),Cf=k=>k-A(k);
  const clo=k=>A(k)*a+Bf(k)*b+Cf(k)*c;
  const bn=n.toString(2),m=bn.length-1,l=n-(1<<m);
  const dig=[...bn].map((ch,i)=>i===0?a:(ch==="1"?c:b));
  const sg=v=>v<0?"−"+Math.abs(v):""+v;
  const dv=dig.reduce((acc,d)=>2*acc+d,0);
  $("#j-gen-info").innerHTML=`n = ${n} = ${bn}<sub>2</sub> = ${sup2(m)} + ${l}<br>`+
    `A = ${1<<m}, &nbsp;B = ${1<<m} − 1 − ${l} = ${Bf(n)}, &nbsp;C = ${l}<br>`+
    `f(${n}) = ${1<<m}·α + ${Bf(n)}·β + ${l}·γ = ${1<<m}·${sg(a)} + ${Bf(n)}·${sg(b)} + ${l}·${sg(c)} = <b>${sg(clo(n))}</b><br>`+
    `Számjegycsere: (${dig.map(sg).join(", ")})<sub>2</sub> = ${sg(dv)} &nbsp;·&nbsp; rekurzióval: ${sg(rec(n))} ${clo(n)===rec(n)&&dv===rec(n)?"✓":"✗"}`;
  let h="<tr><th>n</th>";for(let k=1;k<=16;k++)h+=`<td>${k}</td>`;
  h+="</tr><tr class=\"hl\"><th>rekurzió</th>";for(let k=1;k<=16;k++)h+=`<td>${sg(rec(k))}</td>`;
  h+="</tr><tr><th>zárt alak</th>";for(let k=1;k<=16;k++)h+=`<td>${sg(clo(k))}</td>`;
  h+="</tr><tr><th></th>";for(let k=1;k<=16;k++)h+=`<td style="color:var(--${clo(k)===rec(k)?"good":"bad"})">${clo(k)===rec(k)?"✓":"✗"}</td>`;
  $("#j-gen-tbl").innerHTML=h+"</tr>";
}
["#j-a","#j-b","#j-c","#j-gn"].forEach(id=>$(id).addEventListener("input",jGenDraw));
document.querySelectorAll("[data-pre]").forEach(bt=>bt.onclick=()=>{const v=bt.dataset.pre.split(",");$("#j-a").value=v[0];$("#j-b").value=v[1];$("#j-c").value=v[2];
  document.querySelectorAll("[data-pre]").forEach(x=>x.classList.toggle("primary",x===bt));jGenDraw();});
jGenDraw();
