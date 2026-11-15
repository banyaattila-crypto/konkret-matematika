/* ================= 4.1 OSZTHATÓSÁG ================= */
const kSteps=(a,b)=>{const s=[];while(b){const q=Math.floor(a/b),r=a%b;s.push([a,q,b,r]);a=b;b=r;}return {s,g:a};};
const kGcd=(a,b)=>{while(b){[a,b]=[b,a%b];}return a;};
function kXgcd(a,b){let r0=a,r1=b,x0=1,x1=0,y0=0,y1=1;const rows=[[r0,"–",x0,y0]];rows.push([r1,"–",x1,y1]);
  while(r1){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[x0,x1]=[x1,x0-q*x1];[y0,y1]=[y1,y0-q*y1];rows.push([r1,q,x1,y1]);}
  return {g:r0,x:x0,y:y0,rows};}
c2hero("oszthatosag-bevezeto",1000,5,fr=>{
  const s=$("#k-hero"),W=420,H=250,A=252,B=105,k=1.4,ox=33,oy=48;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const cols=["var(--accent)","var(--accent-2)","var(--good)"];
  const sq=[];for(let i=0;i<2;i++)sq.push({x:i*105,y:0,s:105,c:0});
  for(let i=0;i<2;i++)sq.push({x:210,y:i*42,s:42,c:1});
  for(let i=0;i<2;i++)sq.push({x:210+i*21,y:84,s:21,c:2});
  const upto=[0,2,4,6,6][Math.min(fr,4)];
  el("rect",{x:ox,y:oy,width:A*k,height:B*k,rx:3,style:"fill:none;stroke:var(--line);stroke-width:2"},s);
  sq.slice(0,upto).forEach(q=>{el("rect",{x:ox+q.x*k,y:oy+q.y*k,width:q.s*k,height:q.s*k,rx:2,style:`fill:${cols[q.c]};opacity:.85;stroke:var(--paper);stroke-width:1.5`},s);
    txt(s,ox+(q.x+q.s/2)*k,oy+(q.y+q.s/2)*k+4,q.s,"ink");});
  const lab=["252 × 105","252 = 2·105 + 42","105 = 2·42 + 21","42 = 2·21 + 0","42 = 2·21 + 0"][Math.min(fr,4)];
  $("#k-hero-a").textContent=lab;$("#k-hero-b").textContent=fr>=3?"21":"?";
});
/* --- §1 --- */
function kEuk(){
  const a=+$("#k-e-a").value,b=+$("#k-e-b").value;$("#k-e-av").textContent=a;$("#k-e-bv").textContent=b;
  const {s,g}=kSteps(a,b),l=a/g*b;
  let h="<tr><th>a</th><th>q</th><th>b</th><th>maradék</th></tr>";
  s.forEach(r=>{h+=`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`;});
  $("#k-e-t").innerHTML=h;
  $("#k-e-info").innerHTML=`gcd(${a}, ${b}) = <b>${g}</b> &nbsp;·&nbsp; lcm = ${l} &nbsp;·&nbsp; gcd·lcm = ${g*l} = a·b = ${a*b} ${ok(g*l===a*b)}<br>lépések száma: ${s.length}`;
}
$("#k-e-p").addEventListener("change",()=>{const v=$("#k-e-p").value.split(",").map(Number);if(v[0]){$("#k-e-a").value=v[0];$("#k-e-b").value=v[1];kEuk();}});
["#k-e-a","#k-e-b"].forEach(i=>$(i).addEventListener("input",()=>{$("#k-e-p").value="0,0";kEuk();}));kEuk();
/* --- §2 --- */
function kBez(){
  const a=+$("#k-b-a").value,b=+$("#k-b-b").value,c=+$("#k-b-c").value;
  $("#k-b-av").textContent=a;$("#k-b-bv").textContent=b;$("#k-b-cv").textContent=c;
  const r=kXgcd(a,b);let h="<tr><th>r<sub>i</sub></th><th>q</th><th>x<sub>i</sub></th><th>y<sub>i</sub></th><th>a·x + b·y</th></tr>";
  r.rows.forEach(w=>{h+=`<tr><td>${w[0]}</td><td>${w[1]}</td><td>${c2sg(w[2])}</td><td>${c2sg(w[3])}</td><td>${a*w[2]+b*w[3]}</td></tr>`;});
  $("#k-b-t").innerHTML=h;
  const g=r.g;let t=`${a}·(${c2sg(r.x)}) + ${b}·(${c2sg(r.y)}) = ${a*r.x+b*r.y} = gcd = ${g} ${ok(a*r.x+b*r.y===g)}<br>`;
  if(c%g===0){const m=c/g,x0=r.x*m,y0=r.y*m,db=b/g,da=a/g;
    t+=`${a}x + ${b}y = ${c}: megoldható (${g} | ${c}). Egy megoldás: x = ${c2sg(x0)}, y = ${c2sg(y0)} ${ok(a*x0+b*y0===c)}<br>összes: x = ${c2sg(x0)} + ${db}t, y = ${c2sg(y0)} − ${da}t; például t = 1: (${c2sg(x0+db)}, ${c2sg(y0-da)}) ${ok(a*(x0+db)+b*(y0-da)===c)}`;
  }else t+=`${a}x + ${b}y = ${c}: nincs egész megoldás, mert ${g} ∤ ${c}.`;
  $("#k-b-info").innerHTML=t;
}
["#k-b-a","#k-b-b","#k-b-c"].forEach(i=>$(i).addEventListener("input",kBez));kBez();
