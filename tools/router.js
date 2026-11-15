/* ---------- menürendszer: kezdőlap → fejezet → téma → oldalak ---------- */
const TOPICS={
  hanoi:{n:"1.1",t:"Hanoi tornyai",prefix:"s-",
    pages:[["bevezeto","Bevezető"],["feladat","A feladat – játék"],["kis","Kis esetek"],["felso","Felső korlát"],["also","Alsó korlát"],["fa","A rekurzió kibontva"],["indukcio","Sejtés és indukció"],["fixpont","Jóslás nélkül: a +1 trükk"],["leptek","Léptékek"],["binaris","Bináris szerkezet"],["gyak","Gyakorlatok"],["modszer","A módszer"]],
    foot:"Forrás: R. L. Graham – D. E. Knuth – O. Patashnik: <i>Konkrét matematika</i>, 1. fejezet, 1.1 Hanoi tornyai. A szöveg saját feldolgozás; a §5, a §7 második fele, a §8 ellenőrzései, a §9 és a §10 kiegészítések."},
  egyenesek:{n:"1.2",t:"Egyenesek a síkon",prefix:"e-",
    pages:[["bevezeto","Bevezető"],["feladat","A feladat – rajzolás"],["kis","Kis esetek"],["rekurzio","A rekurzió"],["zart","Zárt alak"],["cikkcakk","Cikkcakk"],["korlatos","Korlátos tartományok"],["gyak","Gyakorlatok"],["modszer","Összevetés"]],
    foot:"Forrás: R. L. Graham – D. E. Knuth – O. Patashnik: <i>Konkrét matematika</i>, 1. fejezet, 1.2 Egyenesek a síkon. A szöveg saját feldolgozás, a magyar kiadás szövege nélkül; a §4 metszéspont-értelmezése, a §6 és a §7 kiegészítések."}
};
const CH=[
 {n:1,t:"Rekurziós problémák",d:"Három klasszikus feladat, amelyek megoldása egy kisebb, hasonló feladat megoldására épül.",
  lead:"Mindhárom feladatot újra és újra vizsgálták a matematikusok, és mindháromban ugyanaz a gondolat dolgozik: a megoldás egy kisebb, ugyanilyen feladat megoldására épül. A cél mindenütt a rekurzióból zárt képlethez jutni.",
  topics:[{id:"hanoi",d:"Hány lépésben költöztethető át egy n korongos torony? Rekurzió, alsó és felső korlát, zárt alak."},
          {id:"egyenesek",d:"Legfeljebb hány részre vágja a síkot n egyenes? És n darab cikkcakk?"},
          {n:"1.3",t:"A Josephus probléma",d:"Körben állók, minden második kiesik: ki marad utoljára? Bináris forgatás és repertoármódszer."}]},
 {n:2,t:"Összegek",d:"Összegzési jelölés, perturbáció, többszörös összegek."},
 {n:3,t:"Egész függvények",d:"Alsó és felső egészrész, mod, spektrumok."},
 {n:4,t:"Számelmélet",d:"Oszthatóság, prímek, kongruenciák, Stern–Brocot-fa."},
 {n:5,t:"Binomiális együtthatók",d:"Azonosságok, hipergeometrikus függvények."},
 {n:6,t:"Speciális számok",d:"Stirling-, Euler-, harmonikus, Bernoulli- és Fibonacci-számok."},
 {n:7,t:"Generátorfüggvények",d:"Rekurziók megoldása hatványsorokkal."},
 {n:8,t:"Diszkrét valószínűség",d:"Várható érték, szórás, generátorfüggvények a valószínűségben."},
 {n:9,t:"Aszimptotika",d:"Nagy O, Euler–Maclaurin-összegzés."}];
CH.forEach(c=>c.topics&&c.topics.forEach(tp=>{if(tp.id){tp.n=TOPICS[tp.id].n;tp.t=TOPICS[tp.id].t;tp.ready=true;}}));
const side=$("#side"),mb=$("#menuBtn");
function closeMenu(){side.classList.remove("open");mb.setAttribute("aria-expanded","false");}
mb.onclick=()=>{const o=side.classList.toggle("open");mb.setAttribute("aria-expanded",o);};
function renderTree(r){
  let h="";
  CH.forEach(c=>{
    const has=!!c.topics,on=r.ch===c.n;
    h+=has?`<a class="chh${on&&!r.topic?" on":""}" href="#fejezet-${c.n}"><span class="num">${c.n}</span>${c.t}</a>`:`<span class="chh dis"><span class="num">${c.n}</span>${c.t}</span>`;
    if(has&&on)c.topics.forEach(tp=>{
      if(tp.ready){h+=`<a class="tp${r.topic===tp.id?" on":""}" href="#${tp.id}-bevezeto"><span>${tp.n} ${tp.t}</span></a>`;
        if(r.topic===tp.id)TOPICS[tp.id].pages.forEach(([id,tt],i)=>{h+=`<a class="pg${r.page===id?" on":""}" href="#${tp.id}-${id}">${i===0?"":"§"+i+" "}${tt}</a>`;});}
      else h+=`<span class="tp dis"><span>${tp.n} ${tp.t}</span><em>hamarosan</em></span>`;});
  });
  $("#tree").innerHTML=h;
}
function homeCards(){
  $("#home-cards").innerHTML=CH.map(c=>{const ready=c.topics?c.topics.filter(t=>t.ready).length:0,tot=c.topics?c.topics.length:0;
    const st=c.topics?`<span class="st ok">${ready} / ${tot} téma kész</span>`:`<span class="st">tervezett</span>`;
    const inner=`<span class="cn">${c.n}</span><span class="ct">${c.t}</span><span class="cd">${c.d}</span>${st}`;
    return c.topics?`<a class="ccard" href="#fejezet-${c.n}">${inner}</a>`:`<div class="ccard dis">${inner}</div>`;}).join("");
}
function chapterView(c){
  $("#ch-eyebrow").textContent=`${c.n}. fejezet`;$("#ch-title").textContent=c.t;$("#ch-lead").textContent=c.lead||c.d;
  const box=$("#ch-cards");
  box.innerHTML=c.topics.map(tp=>{const thumb=tp.id==="hanoi"?`<svg data-thumb="hanoi"></svg>`:tp.id==="egyenesek"?`<canvas class="plane" data-thumb="egyenesek"></canvas>`:"";
    const inner=`${thumb}<span class="cn">${tp.n}</span><span class="ct">${tp.t}</span><span class="cd">${tp.d}</span><span class="st${tp.ready?" ok":""}">${tp.ready?TOPICS[tp.id].pages.length+" oldal · kész":"hamarosan"}</span>`;
    return tp.ready?`<a class="ccard" href="#${tp.id}-bevezeto">${inner}</a>`:`<div class="ccard dis">${inner}</div>`;}).join("");
  box.querySelectorAll('[data-thumb="hanoi"]').forEach(sv=>new Tower(sv,{n:5,W:300,H:110,mode:"last",nums:false,labels:false}));
  box.querySelectorAll('[data-thumb="egyenesek"]').forEach(cv=>{const p=new Plane(cv,{cell:3});p.lines=seededLines(5,4,true);p.render();});
}
function crumb(r){
  const parts=[];const c=CH.find(x=>x.n===r.ch);
  parts.push(c?`<a href="#kezdolap">Kezdőlap</a>`:`<b>Kezdőlap</b>`);
  if(c)parts.push(r.topic?`<a href="#fejezet-${c.n}">${c.n}. fejezet</a>`:`<b>${c.n}. ${c.t}</b>`);
  if(r.topic){const T=TOPICS[r.topic],i=T.pages.findIndex(p=>p[0]===r.page);parts.push(`<b>${T.n} ${T.t} · ${i===0?"Bevezető":"§"+i}</b>`);}
  $("#crumb").innerHTML=parts.join('<span class="sep">›</span>');
}
function parse(){
  const h=decodeURIComponent(location.hash.slice(1));
  const m=h.match(/^([a-z]+)-([a-z]+)$/);
  if(m&&TOPICS[m[1]]&&TOPICS[m[1]].pages.some(p=>p[0]===m[2]))return {ch:1,topic:m[1],page:m[2]};
  const f=h.match(/^fejezet-(\d+)$/);if(f&&CH.find(c=>c.n===+f[1]&&c.topics))return {ch:+f[1]};
  const old=h.match(/^s-([a-z]+)$/);if(old&&TOPICS.hanoi.pages.some(p=>p[0]===old[1]))return {ch:1,topic:"hanoi",page:old[1]};
  return {};
}
let curTopic="";
function route(){
  const r=parse();closeMenu();
  ["home","chapter","topic"].forEach(v=>$("#view-"+v).classList.toggle("on",v===(r.topic?"topic":r.ch?"chapter":"home")));
  if(r.topic){
    const T=TOPICS[r.topic],P=T.pages,i=P.findIndex(p=>p[0]===r.page);curTopic=r.topic;curPage=r.topic+"-"+r.page;
    document.querySelectorAll("#view-topic .page").forEach(pg=>pg.classList.toggle("on",pg.id===T.prefix+r.page));
    $("#prog").innerHTML=P.map((_,j)=>`<i class="${j<i?"done":j===i?"cur":""}"></i>`).join("");
    $("#pmid").innerHTML=`${i+1} / ${P.length}<span class="pt"> · ${P[i][1]}</span>`;
    $("#pv").disabled=i===0;$("#nx").textContent=i===P.length-1?"Fejezet ↑":"Következő →";
    $("#pv").onclick=()=>{if(i>0)location.hash=r.topic+"-"+P[i-1][0];};
    $("#nx").onclick=()=>{location.hash=i<P.length-1?r.topic+"-"+P[i+1][0]:"fejezet-1";};
    $("#foot").innerHTML=`<div>${T.foot}</div><div>Interaktív tananyag · Konkrét Matematika sorozat · ${T.n} modul</div>`;
  }else{curPage="";curTopic="";}
  if(r.ch&&!r.topic)chapterView(CH.find(c=>c.n===r.ch));
  renderTree(r);crumb(r);window.scrollTo(0,0);
}
document.addEventListener("keydown",e=>{
  if(!curTopic||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName||""))return;
  const P=TOPICS[curTopic].pages,i=P.findIndex(p=>curPage===curTopic+"-"+p[0]);
  if(e.key==="ArrowRight"&&i<P.length-1)location.hash=curTopic+"-"+P[i+1][0];
  if(e.key==="ArrowLeft"&&i>0)location.hash=curTopic+"-"+P[i-1][0];
});
window.addEventListener("hashchange",route);
homeCards();route();
