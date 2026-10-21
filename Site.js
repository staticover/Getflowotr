// Flow sunburst logo: tapered rays around an empty center
document.querySelectorAll('svg.sun').forEach((svg,k)=>{
  const n=+svg.dataset.rays||40, cx=100, cy=100, r0=34, r1=96, w=3.2;
  const ns='http://www.w3.org/2000/svg', id='g'+k;
  const defs=document.createElementNS(ns,'defs');
  defs.innerHTML=svg.dataset.dark
    ? `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#2f6bff"/></linearGradient>`
    : `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#cfd6e4"/><stop offset="1" stop-color="#9fb4e8"/></linearGradient>`;
  svg.appendChild(defs);
  let d='';
  for(let i=0;i<n;i++){
    const a=i/n*Math.PI*2, ca=Math.cos(a), sa=Math.sin(a), rm=r0+(r1-r0)*.42, px=-sa*w, py=ca*w;
    d+=`M${cx+ca*r0} ${cy+sa*r0}L${cx+ca*rm+px} ${cy+sa*rm+py}L${cx+ca*r1} ${cy+sa*r1}L${cx+ca*rm-px} ${cy+sa*rm-py}Z`;
  }
  const p=document.createElementNS(ns,'path');
  p.setAttribute('d',d); p.setAttribute('fill',`url(#${id})`);
  svg.appendChild(p);
});

// Hamburger menu
const burger=document.getElementById('burger');
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  burger.setAttribute('aria-expanded',open);
  burger.setAttribute('aria-label',open?'Close menu':'Open menu');
}
if(burger){
  burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(innerWidth>1080)setMenu(false)});
}

// Preview forms: show a note instead of sending
document.querySelectorAll('form[data-preview]').forEach(f=>{
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const ok=f.querySelector('.form-ok');
    if(ok) ok.hidden=false;
  });
});
