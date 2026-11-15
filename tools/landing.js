/* ================= TÉMA + NYITÓOLDAL ================= */
function applyCh(r){
  const n=Math.min(10,Math.max(1,r&&r.ch?r.ch:1)),d=document.documentElement;
  d.setAttribute("data-ch",String(n));d.style.setProperty("--chnum",'"'+n+'"');
}

/* A Pascal-háromszög binomiális együtthatói mod m. Mod 2: Sierpiński-háromszög (Lucas tétele). */
const pascal=(()=>{
  const N=64,MODS=[2,3,4,5,7];
  const cv=$("#pascal"),cap=$("#pas-cap"),chips=$("#pas-chips"),ctx=cv.getContext("2d");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let m=2,rows=[],shown=0,raf=0,holdT=0,W=0,H=0,dpr=1,running=false,auto=!reduce,last=0;
  const NOTE={2:"C(n,k) mod 2: a páratlan helyek a Sierpiński-háromszöget adják, mert 64 = 2⁶.",
    3:"C(n,k) mod 3: a nullától különböző maradékok színezve, ugyanaz az önhasonlóság.",
    4:"C(n,k) mod 4: összetett modulusnál a minta bonyolultabb, de így is szabályos.",
    5:"C(n,k) mod 5: prímmodulusnál Lucas tétele miatt a kép 5-ös léptékben ismétlődik.",
    7:"C(n,k) mod 7: a nagyobb prím nagyobb, ritkább mintát rajzol."};
  function build(){
    rows=[];let prev=[1%m];rows.push(prev);
    for(let n=1;n<N;n++){const r=new Array(n+1);for(let k=0;k<=n;k++)r[k]=((prev[k-1]||0)+(prev[k]||0))%m;rows.push(r);prev=r;}
  }
  function size(){
    dpr=Math.min(2,window.devicePixelRatio||1);W=Math.max(220,cv.clientWidth||320);
    const pad=10,w=(W-2*pad)/N;H=Math.round(2*pad+N*w*.866+w);
    cv.style.height=H+"px";cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  }
  function col(n,v){
    const dark=isDarkTheme(),hue=m===2?(228+n*4.4)%360:(214+v*(300/m)+n*1.2)%360;
    return `hsl(${hue} ${dark?88:76}% ${dark?68:44}%)`;
  }
  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    const pad=10,w=(W-2*pad)/N,hh=w*.866,rad=Math.max(1.1,w*.4),dark=isDarkTheme();
    const full=Math.min(N,Math.floor(shown)),frac=shown-Math.floor(shown);
    for(let n=0;n<=Math.min(N-1,full);n++){
      const a=n===full?frac:1;if(a<=0)continue;
      for(let k=0;k<=n;k++){
        const v=rows[n][k],x=W/2+(k-n/2)*w,y=pad+w*.5+n*hh;
        if(v===0){ctx.globalAlpha=.10*a;ctx.fillStyle=dark?"#9aa6b6":"#5a6471";ctx.beginPath();ctx.arc(x,y,Math.max(.6,rad*.28),0,6.2832);ctx.fill();continue;}
        ctx.globalAlpha=a;ctx.fillStyle=col(n,v);ctx.beginPath();ctx.arc(x,y,rad,0,6.2832);ctx.fill();
      }
    }
    ctx.globalAlpha=1;
  }
  function setMod(x,byUser){
    clearTimeout(holdT);holdT=0;m=x;if(byUser)auto=false;build();shown=reduce?N:0;cap.textContent=NOTE[m]||"";
    chips.querySelectorAll("button").forEach(b=>{const on=+b.dataset.m===m;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
    draw();if(running&&!raf)raf=requestAnimationFrame(tick);
  }
  function tick(t){
    raf=0;if(!running)return;
    const dt=Math.min(60,t-(last||t));last=t;
    if(shown<N){shown=Math.min(N,shown+dt*.026);draw();}
    if(shown<N)raf=requestAnimationFrame(tick);
    else if(auto&&!holdT)holdT=setTimeout(()=>{holdT=0;if(running&&auto)setMod(MODS[(MODS.indexOf(m)+1)%MODS.length]);},6500);
  }
  chips.innerHTML=MODS.map(x=>`<button type="button" data-m="${x}" aria-pressed="false">mod ${x}</button>`).join("");
  chips.addEventListener("click",e=>{const b=e.target.closest("button");if(b)setMod(+b.dataset.m,true);});
  let rt=0;window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!running)return;size();draw();},120);});
  document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(running&&!raf&&shown<N){last=0;raf=requestAnimationFrame(tick);}});
  return {
    start(){if(running)return;running=true;size();setMod(m);last=0;if(!raf)raf=requestAnimationFrame(tick);},
    stop(){running=false;cancelAnimationFrame(raf);raf=0;clearTimeout(holdT);holdT=0;},
    redraw(){if(running){size();draw();}}
  };
})();

/* 3D logó: lassan forgó gömb-tetraéder (a Pascal-háromszög térbeli változata), halvány élekkel */
(function(){
  const svg=document.getElementById("logo3d");if(!svg)return;
  const NS="http://www.w3.org/2000/svg",pts=[],S=8.6,K=Math.sqrt(2/3);
  for(let j=0;j<3;j++){const cx=j/2,cz=j*Math.sqrt(3)/6;
    for(let b=0;b<=j;b++)for(let a=0;a+b<=j;a++)pts.push([a+b/2-cx,(j-1)*K,b*Math.sqrt(3)/2-cz]);}
  const edges=[];for(let i=0;i<pts.length;i++)for(let k=i+1;k<pts.length;k++){const d=Math.hypot(pts[i][0]-pts[k][0],pts[i][1]-pts[k][1],pts[i][2]-pts[k][2]);if(Math.abs(d-1)<0.05)edges.push([i,k]);}
  const ls=edges.map(()=>{const l=document.createElementNS(NS,"line");l.setAttribute("stroke","currentColor");l.setAttribute("stroke-width","0.5");svg.appendChild(l);return l;});
  const gs=pts.map(()=>{const g=document.createElementNS(NS,"g"),c=document.createElementNS(NS,"circle"),h=document.createElementNS(NS,"circle");
    c.setAttribute("fill","currentColor");h.setAttribute("fill","#fff");h.setAttribute("opacity",".3");g.append(c,h);svg.appendChild(g);return [g,c,h];});
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,tilt=0.95,ct=Math.cos(tilt),st=Math.sin(tilt);
  function draw(th){
    const ca=Math.cos(th),sa=Math.sin(th);
    const q=pts.map((p,i)=>{const x=p[0]*ca+p[2]*sa,z=-p[0]*sa+p[2]*ca,y=p[1]*ct-z*st,z2=p[1]*st+z*ct;return {i,x,y,z:z2};});
    edges.forEach(([i,k],n)=>{const u=q[i],v=q[k],l=ls[n];l.setAttribute("x1",14+u.x*S);l.setAttribute("y1",14+u.y*S);l.setAttribute("x2",14+v.x*S);l.setAttribute("y2",14+v.y*S);l.setAttribute("opacity",(0.3+0.12*(u.z+v.z)/2).toFixed(2));});
    q.slice().sort((u,v)=>u.z-v.z).forEach(o=>{const [g,c,h]=gs[o.i],r=1.75*(1+0.14*o.z),px=14+o.x*S,py=14+o.y*S;
      svg.appendChild(g);c.setAttribute("cx",px);c.setAttribute("cy",py);c.setAttribute("r",r);
      c.setAttribute("opacity",(0.68+0.22*o.z).toFixed(2));
      h.setAttribute("cx",px-r*0.3);h.setAttribute("cy",py-r*0.35);h.setAttribute("r",r*0.32);});
  }
  if(reduce){draw(0.6);return;}
  const T0=performance.now();(function f(t){draw(((t-T0)/1000)*(2*Math.PI/20));requestAnimationFrame(f);})(T0);
})();

/* ================= MATEMATIKAI ESŐ A FŐOLDALON ================= */
const mrain=(()=>{
  const cv=$("#mrain");if(!cv)return;const ctx=cv.getContext("2d"),home=$("#view-home");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G="∑∫π φ∞√≡⌊⌋∂∇ℵζθλΔ≈≤≥∈∀∃ℤℝ∏0123456789!+=".replace(/ /g,"").split("");
  const FM=["e^(iπ) + 1 = 0","Σ k = n(n+1)/2","ζ(2) = π²/6","φ = (1+√5)/2","Fₙ₊₂ = Fₙ₊₁ + Fₙ","Tₙ = 2ⁿ − 1","⌊x⌋ ≤ x < ⌊x⌋ + 1","a ≡ b (mod m)","C(n,k) = C(n,n−k)","Hₙ ≈ ln n + γ","n! ~ √(2πn)(n/e)ⁿ","1+2+4+…+2ⁿ = 2ⁿ⁺¹ − 1","gcd(a,b) = gcd(b, a mod b)","(a+b)² = a² + 2ab + b²","∫₀^∞ e^(−x²) dx = √π/2","Σ 1/k² = π²/6","E[X] = Σ x·P(X=x)","1/(1−x) = Σ xⁿ"];
  const CELL=20;let W=0,H=0,dpr=1,cols=[],items=[],raf=0,last=0,acc=0,col="#888",fc=0,left=0;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  function size(){
    const r=home.getBoundingClientRect();left=r.left;W=Math.max(1,Math.round(r.width));H=innerHeight;dpr=Math.min(1.5,devicePixelRatio||1);
    cv.style.left=left+"px";cv.style.width=W+"px";cv.style.height=H+"px";cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    const n=Math.floor(W/CELL);cols=Array.from({length:n},(_,i)=>({y:rnd(-H/CELL,0),sp:rnd(.12,.42),on:Math.random()<.55,tr:[]}));
    const k=W<700?5:10;items=Array.from({length:k},()=>({t:FM[Math.floor(Math.random()*FM.length)],x:rnd(0,W-120),y:rnd(0,H),v:rnd(14,34),fs:rnd(15,24),a:rnd(.10,.2)}));
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  }
  function frame(t){
    raf=0;if(!home.classList.contains("on")||document.hidden){return;}
    raf=requestAnimationFrame(frame);
    const dt=Math.min(80,t-(last||t));last=t;acc+=dt;if(acc<40)return;const step=acc;acc=0;
    if(++fc%40===1)col=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#888";
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    ctx.fillStyle=col;ctx.font="600 15px 'Fraunces',Georgia,serif";ctx.textBaseline="top";
    cols.forEach((c,i)=>{
      if(!c.on){if(Math.random()<.002)c.on=true;return;}
      const prev=Math.floor(c.y);c.y+=c.sp*step/40;const cy=Math.floor(c.y);
      if(cy!==prev&&cy>=0){c.tr.push({r:cy,ch:G[Math.floor(Math.random()*G.length)]});if(c.tr.length>9)c.tr.shift();}
      const n=c.tr.length;for(let k=0;k<n;k++){const t=c.tr[k];ctx.globalAlpha=.08+.82*Math.pow((k+1)/n,2.2);ctx.fillText(t.ch,i*CELL+3,t.r*CELL);}
      if(c.y*CELL>H+rnd(0,H*.6)){c.y=rnd(-12,-1);c.sp=rnd(.12,.42);c.on=Math.random()<.8;c.tr=[];}
    });
    items.forEach(it=>{
      it.y+=it.v*step/1000;if(it.y>H+30){it.y=-30;it.x=rnd(0,Math.max(10,W-140));it.t=FM[Math.floor(Math.random()*FM.length)];}
      ctx.globalAlpha=it.a;ctx.font=`italic 500 ${it.fs}px 'Fraunces',Georgia,serif`;ctx.fillText(it.t,it.x,it.y);
    });
    ctx.globalAlpha=1;
  }
  function stat(){size();col=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#888";ctx.fillStyle=col;ctx.font="600 16px 'Fraunces',Georgia,serif";ctx.textBaseline="top";for(let i=0;i<70;i++){ctx.globalAlpha=rnd(.06,.16);ctx.fillText(G[Math.floor(Math.random()*G.length)],rnd(0,W),rnd(0,H));}ctx.globalAlpha=1;}
  function go(){if(!home.classList.contains("on")){cancelAnimationFrame(raf);raf=0;return;}if(reduce){stat();return;}size();if(!raf){last=0;raf=requestAnimationFrame(frame);}}
  addEventListener("hashchange",()=>setTimeout(go,60));addEventListener("resize",()=>{clearTimeout(go.t);go.t=setTimeout(go,150);});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)go();});
  new MutationObserver(go).observe(home,{attributes:true,attributeFilter:["class"]});
  setTimeout(go,300);
  return {go};
})();
