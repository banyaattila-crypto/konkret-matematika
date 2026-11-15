/* ================= TÉMA + NYITÓOLDAL ================= */
function applyCh(r){
  const n=Math.min(10,Math.max(1,r&&r.ch?r.ch:1)),d=document.documentElement;
  d.setAttribute("data-ch",String(n));d.style.setProperty("--chnum",'"'+n+'"');
}

/* Hero: a kötet 3D-s összefüggés-gráfja. Hubok = fejezetek (a 10.1 térkép 13 éle), kis csomópontok = témák. */
const hero3d=(()=>{
  const cv=$("#hgraph"),cap=$("#h3-cap"),ctx=cv.getContext("2d");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const E=[[1,2],[1,7],[2,6],[2,9],[3,4],[4,5],[5,7],[5,8],[5,9],[6,8],[6,9],[7,8],[8,9]];
  let nodes=[],edges=[],cols=[],W=0,H=0,dpr=1,running=false,raf=0,last=0;
  let yaw=.6,pit=.38,vy=reduce?0:.00018,vp=0,drag=null,moved=0,hover=null,idleT=0,proj=[];
  function build(){
    nodes=[];edges=[];const hub={};
    const G=Math.PI*(3-Math.sqrt(5));
    for(let c=1;c<=9;c++){const y=1-2*(c-.5)/9,r=Math.sqrt(1-y*y),t=(c-1)*G;
      const v=[r*Math.cos(t),y,r*Math.sin(t)];hub[c]=nodes.length;nodes.push({x:v[0],y:v[1],z:v[2],c,hub:true,label:c+". "+CH[c-1].t,href:"#fejezet-"+c,r:9});}
    hub[10]=nodes.length;nodes.push({x:0,y:0,z:0,c:10,hub:true,label:"10. "+CH[9].t,href:"#fejezet-10",r:11});
    CH.forEach(ch=>{const c=ch.n,ts=(ch.topics||[]).filter(t=>t.ready);if(!ts.length)return;
      const h=nodes[hub[c]],L=Math.hypot(h.x,h.y,h.z)||1;
      let n=[h.x/L,h.y/L,h.z/L];if(c===10)n=[0,1,0];
      let u=Math.abs(n[1])>.9?[1,0,0]:[0,1,0];
      let e1=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]];const l1=Math.hypot(...e1);e1=e1.map(q=>q/l1);
      const e2=[n[1]*e1[2]-n[2]*e1[1],n[2]*e1[0]-n[0]*e1[2],n[0]*e1[1]-n[1]*e1[0]];
      ts.forEach((tp,i)=>{const a=2*Math.PI*i/ts.length+c,rr=.30+.04*(i%2),k=c===10?.0:.12;
        const x=h.x+k*n[0]+rr*(Math.cos(a)*e1[0]+Math.sin(a)*e2[0]),y=h.y+k*n[1]+rr*(Math.cos(a)*e1[1]+Math.sin(a)*e2[1]),z=h.z+k*n[2]+rr*(Math.cos(a)*e1[2]+Math.sin(a)*e2[2]);
        const id=nodes.length;nodes.push({x,y,z,c,hub:false,label:tp.n+" "+tp.t,href:"#"+tp.id+"-"+TOPICS[tp.id].pages[0][0],r:3.6});
        edges.push({a:hub[c],b:id,k:0});});});
    E.forEach(([a,b])=>edges.push({a:hub[a],b:hub[b],k:1}));
    for(let c=1;c<=9;c++)edges.push({a:hub[10],b:hub[c],k:2});
  }
  function colors(){const cs=getComputedStyle(document.documentElement);cols=[""];for(let c=1;c<=10;c++)cols.push(cs.getPropertyValue("--cc"+c).trim()||"#7c8cff");}
  function size(){
    dpr=Math.min(2,window.devicePixelRatio||1);W=Math.max(240,cv.clientWidth||320);H=Math.round(W*(W<500?1.0:.94));
    cv.style.height=H+"px";cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  }
  function project(){
    const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit),D=3.3,sc=Math.min(W,H)*.44;
    proj=nodes.map(n=>{
      const x1=n.x*cy+n.z*sy,z1=-n.x*sy+n.z*cy,y1=n.y*cp-z1*sp,z2=n.y*sp+z1*cp;
      const f=D/(D-z2);return {x:W/2+x1*sc*f/1.45,y:H/2+y1*sc*f/1.45,z:z2,f,n};});
  }
  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);project();
    const dark=isDarkTheme(),ink=dark?"#c9d3e3":"#33405a";
    edges.forEach(e=>{const p=proj[e.a],q=proj[e.b],dz=(p.z+q.z)/2,al=Math.max(.04,.5+.4*dz);
      const on=hover!==null&&(hover===e.a||hover===e.b);
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
      if(e.k===1){ctx.strokeStyle=ink;ctx.globalAlpha=Math.min(1,(on?.9:.42*al+.12));ctx.lineWidth=on?2:1.3;ctx.setLineDash([]);}
      else if(e.k===2){ctx.strokeStyle=ink;ctx.globalAlpha=on?.6:.07*al+.02;ctx.lineWidth=.8;ctx.setLineDash([2,4]);}
      else{ctx.strokeStyle=cols[p.n.c];ctx.globalAlpha=on?.9:.35*al+.1;ctx.lineWidth=on?1.6:1;ctx.setLineDash([]);}
      ctx.stroke();});
    ctx.setLineDash([]);
    const ord=proj.map((p,i)=>i).sort((a,b)=>proj[a].z-proj[b].z);
    ord.forEach(i=>{const p=proj[i],n=p.n,al=Math.max(.35,.72+.4*p.z),r=n.r*p.f*(W<500?.9:1.05),on=hover===i;
      ctx.globalAlpha=Math.min(1,al);ctx.fillStyle=cols[n.c];ctx.beginPath();ctx.arc(p.x,p.y,on?r*1.35:r,0,6.2832);ctx.fill();
      if(n.hub){ctx.globalAlpha=1;ctx.fillStyle="#fff";ctx.font=`700 ${Math.round(r*1.15)}px 'Fraunces',Georgia,serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(String(n.c),p.x,p.y+.5);}
      if(on){ctx.globalAlpha=1;ctx.strokeStyle=dark?"#fff":"#111";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p.x,p.y,r*1.35+3,0,6.2832);ctx.stroke();}
    });
    ctx.globalAlpha=1;
  }
  function pick(ev){
    const r=cv.getBoundingClientRect(),x=ev.clientX-r.left,y=ev.clientY-r.top;let best=null,bd=1e9;
    proj.forEach((p,i)=>{const d=Math.hypot(p.x-x,p.y-y),lim=Math.max(14,p.n.r*p.f*1.6);if(d<lim&&d-p.z*4<bd){bd=d-p.z*4;best=i;}});
    return best;
  }
  function setHover(h){
    if(h===hover)return;hover=h;cv.style.cursor=h===null?(drag?"grabbing":"grab"):"pointer";
    cap.innerHTML=h===null?HINT:`<b>${nodes[h].label}</b> <span>${nodes[h].hub?"fejezet":"téma"} · kattints a megnyitáshoz</span>`;
    if(!running||reduce)draw();
  }
  let HINT="";
  function tick(t){
    raf=0;if(!running)return;const dt=Math.min(50,t-(last||t));last=t;
    if(!drag){yaw+=vy*dt*(hover!==null?.15:1);pit+=vp*dt;vp*=.94;pit=Math.max(-1.2,Math.min(1.2,pit));if(Math.abs(vy)>.00018)vy=vy*.96+(reduce?0:.00018)*.04;}
    draw();raf=requestAnimationFrame(tick);
  }
  cv.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY,yaw,pit};moved=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor="grabbing";});
  cv.addEventListener("pointermove",e=>{
    if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=Math.max(moved,Math.abs(dx)+Math.abs(dy));
      const ny=drag.yaw+dx*.008,np=Math.max(-1.2,Math.min(1.2,drag.pit+dy*.006));vy=(ny-yaw)/16;yaw=ny;pit=np;if(reduce||!running)draw();return;}
    if(e.pointerType==="mouse")setHover(pick(e));
  });
  cv.addEventListener("pointerup",e=>{
    const was=drag;drag=null;cv.style.cursor="grab";
    if(was&&moved<6){const h=pick(e);if(h!==null){setHover(h);if(e.pointerType==="mouse")location.hash=nodes[h].href;else{ if(cv.dataset.last===String(h))location.hash=nodes[h].href;cv.dataset.last=String(h);}}}
  });
  cv.addEventListener("pointercancel",()=>{drag=null;});
  cv.addEventListener("pointerleave",()=>{if(!drag)setHover(null);});
  let rt=0;window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!running)return;size();draw();},120);});
  document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(running&&!raf&&!reduce){last=0;raf=requestAnimationFrame(tick);}});
  return {
    start(){if(running)return;running=true;if(!nodes.length){build();}colors();size();
      HINT=`<b>${CH.filter(c=>c.topics&&c.topics.some(t=>t.ready)).length} fejezet, ${Object.keys(TOPICS).length} téma, 13 összefüggés.</b> <span>Húzd el a forgatáshoz; kattints egy csomópontra (érintésnél kétszer).</span>`;
      if(hover===null)cap.innerHTML=HINT;draw();last=0;if(!reduce&&!raf)raf=requestAnimationFrame(tick);},
    stop(){running=false;cancelAnimationFrame(raf);raf=0;},
    redraw(){if(running){colors();size();draw();}}
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

/* ================= LASSAN LEHULLÓ KÉPLETEK A FŐOLDALON ================= */
const mrain=(()=>{
  const cv=$("#mrain");if(!cv)return;const ctx=cv.getContext("2d"),home=$("#view-home");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FM=["e^(iπ) + 1 = 0","Σ k = n(n+1)/2","ζ(2) = π²/6","φ = (1+√5)/2","Fₙ₊₂ = Fₙ₊₁ + Fₙ","Tₙ = 2Tₙ₋₁ + 1","Tₙ = 2ⁿ − 1","⌊x⌋ ≤ x < ⌊x⌋ + 1","a ≡ b (mod m)","C(n,k) = C(n,n−k)","C(n,k) = n!/(k!(n−k)!)","Hₙ ≈ ln n + γ","n! ~ √(2πn)(n/e)ⁿ","1+2+4+…+2ⁿ = 2ⁿ⁺¹ − 1","gcd(a,b) = gcd(b, a mod b)","(a+b)² = a² + 2ab + b²","∫₀^∞ e^(−x²) dx = √π/2","Σ 1/k² = π²/6","E[X] = Σ x·P(X=x)","1/(1−x) = Σ xⁿ","(1+x)ⁿ = Σ C(n,k)xᵏ","Σ C(n,k) = 2ⁿ","C(n,k) = C(n−1,k) + C(n−1,k−1)","φ(n) = n Π(1 − 1/p)","Σ_{d|n} φ(d) = n","⌊n/2⌋ + ⌈n/2⌉ = n","J(n) = 2L + 1","Var X = E[X²] − (E X)²","Fₙ = (φⁿ − ψⁿ)/√5","C(2n,n) ~ 4ⁿ/√(πn)","Σ Hₖ = (n+1)Hₙ − n","ln n! = n ln n − n + ½ ln(2πn)","a·b = gcd(a,b)·lcm(a,b)","Σ_{k=1}^{n} (2k−1) = n²","x = ⌊x⌋ + {x}","e = Σ 1/n!","lim (1+1/n)ⁿ = e","Cₙ = C(2n,n)/(n+1)","Σ_{p} 1/p → ∞","aᵖ ≡ a (mod p)"];
  let W=0,H=0,dpr=1,items=[],raf=0,last=0,col="#888",fc=0,left=0,bag=[];
  const rnd=(a,b)=>a+Math.random()*(b-a);
  function next(){if(!bag.length){bag=FM.slice();for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}}return bag.pop();}
  function place(it,top){it.t=next();it.fs=rnd(W<700?14:16,W<700?19:26);ctx.font=`italic 500 ${it.fs}px 'Fraunces',Georgia,serif`;it.w=ctx.measureText(it.t).width;
    it.x=rnd(-it.w*.1,Math.max(10,W-it.w*.9));it.y=top?rnd(-60,-20):rnd(0,H);it.v=rnd(5,12);it.a=rnd(.17,.32);}
  function size(){
    const r=home.getBoundingClientRect();left=r.left;W=Math.max(1,Math.round(r.width));H=innerHeight;dpr=Math.min(1.5,devicePixelRatio||1);
    cv.style.left=left+"px";cv.style.width=W+"px";cv.style.height=H+"px";cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    const k=W<700?7:13;items=Array.from({length:k},()=>({}));items.forEach((it,i)=>{place(it,false);it.y=(i+rnd(.1,.9))*H/k;});
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function paint(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle=col;ctx.textBaseline="top";
    items.forEach(it=>{const edge=Math.min(1,it.y/90,(H-it.y)/90);ctx.globalAlpha=Math.max(0,it.a*Math.min(1,edge+.15));ctx.font=`italic 500 ${it.fs}px 'Fraunces',Georgia,serif`;ctx.fillText(it.t,it.x,it.y);});ctx.globalAlpha=1;}
  function frame(t){
    raf=0;if(!home.classList.contains("on")||document.hidden)return;
    raf=requestAnimationFrame(frame);
    const dt=Math.min(80,t-(last||t));last=t;if(dt<33)return;
    if(++fc%40===1)col=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#888";
    items.forEach(it=>{it.y+=it.v*dt/1000;if(it.y>H+10)place(it,true);});
    paint();
  }
  function go(){if(!home.classList.contains("on")){cancelAnimationFrame(raf);raf=0;return;}size();col=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#888";
    if(reduce){paint();return;}if(!raf){last=0;raf=requestAnimationFrame(frame);}}
  addEventListener("hashchange",()=>setTimeout(go,60));addEventListener("resize",()=>{clearTimeout(go.t);go.t=setTimeout(go,150);});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)go();});
  new MutationObserver(go).observe(home,{attributes:true,attributeFilter:["class"]});
  setTimeout(go,300);
  return {go};
})();

/* Verziószám (SemVer, lásd VERSION és CHANGELOG.md) */
const APP_VERSION="1.2.0";
(function(){const t=document.getElementById("tree");if(t){const v=document.createElement("div");v.className="ver";v.textContent="v"+APP_VERSION;v.title="Verzió: "+APP_VERSION;t.after(v);}})();

/* PWA: szolgáltatásmunkás (offline) és telepítés gomb. Csak http(s) alól, csendes hibakezeléssel. */
(function(){
  let dp=null;const btn=document.getElementById("goInstall");
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;if(btn)btn.hidden=false;});
  if(btn)btn.addEventListener("click",async()=>{if(!dp)return;dp.prompt();try{await dp.userChoice}catch(_){}dp=null;btn.hidden=true;});
  addEventListener("appinstalled",()=>{if(btn)btn.hidden=true;});
  if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){
    addEventListener("load",()=>{try{navigator.serviceWorker.register("sw.js").catch(()=>{});}catch(_){}});
  }
})();
