const WA='https://wa.me/5551998622431?text=';
document.querySelectorAll('a[data-msg]').forEach(a=>a.href=WA+encodeURIComponent(a.dataset.msg));

(()=>{
  const btn=document.getElementById('hambBtn'),nav=document.getElementById('mobileNav'),bg=document.getElementById('mnavBackdrop'),close=document.getElementById('mnavClose');
  if(!btn||!nav||!bg)return;
  function open(){nav.hidden=false;bg.hidden=false;requestAnimationFrame(()=>{nav.classList.add('open');bg.classList.add('show')});btn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'}
  function shut(){nav.classList.remove('open');bg.classList.remove('show');btn.setAttribute('aria-expanded','false');document.body.style.overflow='';setTimeout(()=>{nav.hidden=true;bg.hidden=true},300)}
  btn.addEventListener('click',()=>btn.getAttribute('aria-expanded')==='true'?shut():open());
  close.addEventListener('click',shut);
  bg.addEventListener('click',shut);
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',shut));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true')shut()});
})();
const calmo=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-carousel]').forEach(c=>{
  const t=c.querySelector('.track'),s=[...t.children],d=c.querySelector('.dots');
  let i=0,timer,x0=null;
  s.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Ir para o slide '+(k+1));b.onclick=()=>{go(k);play()};d.append(b)});
  function go(k){
    i=(k+s.length)%s.length;
    t.style.transform='translateX(-'+i*100+'%)';
    [...d.children].forEach((b,j)=>b.classList.toggle('on',j===i));
    s.forEach((e,j)=>{e.setAttribute('aria-hidden',j!==i);e.querySelectorAll('a').forEach(a=>a.tabIndex=j===i?0:-1)});
  }
  function play(){clearInterval(timer);if(!calmo)timer=setInterval(()=>go(i+1),7000)}
  c.querySelector('.prev').onclick=()=>{go(i-1);play()};
  c.querySelector('.next').onclick=()=>{go(i+1);play()};
  c.addEventListener('mouseenter',()=>clearInterval(timer));
  c.addEventListener('mouseleave',play);
  c.addEventListener('focusin',()=>clearInterval(timer));
  c.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){go(i-1);play()}if(e.key==='ArrowRight'){go(i+1);play()}});
  c.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  c.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50){go(i+(dx<0?1:-1));play()}x0=null});
  go(0);play();
});

(()=>{
  const lb=document.getElementById('lb');if(!lb)return;
  const im=lb.querySelector('img'),cap=lb.querySelector('p');
  document.querySelectorAll('.gal button').forEach(b=>b.addEventListener('click',()=>{im.src=b.dataset.full;im.alt=b.dataset.alt;cap.textContent=b.dataset.alt;lb.showModal()}));
  lb.querySelector('.x').addEventListener('click',()=>lb.close());
  lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
})();

/* LGPD: mapa do Google so carrega apos o clique da pessoa */
(()=>{
  const box=document.querySelector('[data-map]');if(!box)return;
  const KEY='mapa-ok';
  function carregar(){
    const f=document.createElement('iframe');
    f.src=box.dataset.map;f.width='100%';f.height='220';f.style.border='0';f.loading='lazy';
    f.referrerPolicy='no-referrer-when-downgrade';f.title='Mapa - Josi Relax Massagem';
    box.classList.remove('consent');box.replaceChildren(f);
  }
  let ok=false;try{ok=localStorage.getItem(KEY)==='1'}catch(e){}
  if(ok){carregar();return}
  const btn=box.querySelector('button');if(!btn)return;
  btn.addEventListener('click',()=>{try{localStorage.setItem(KEY,'1')}catch(e){}carregar()});
})();
