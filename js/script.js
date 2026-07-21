// Mobile nav
const burger=document.getElementById('burger');
const mainNav=document.getElementById('mainNav');
burger.addEventListener('click',()=>{
  burger.classList.toggle('active');
  mainNav.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{
  burger.classList.remove('active');
  mainNav.classList.remove('open');
}));

// Header hide on scroll down
let lastScroll=0;
const header=document.getElementById('siteHeader');
window.addEventListener('scroll',()=>{
  const cur=window.scrollY;
  if(cur>lastScroll && cur>120){header.style.transform='translateY(-100%)';}
  else{header.style.transform='translateY(0)';}
  lastScroll=cur;
});

// Reveal on scroll
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  });
},{threshold:.15});
revealEls.forEach(el=>io.observe(el));

// Generic carousel factory
function makeCarousel(trackId,dotsId,prefix){
  const track=document.getElementById(trackId);
  const slides=track.children;
  const dotsWrap=document.getElementById(dotsId);
  let idx=0;
  for(let i=0;i<slides.length;i++){
    const d=document.createElement('span');
    if(i===0)d.classList.add('active');
    d.addEventListener('click',()=>{idx=i;update();});
    dotsWrap.appendChild(d);
  }
  function update(){
    track.style.transform=`translateX(-${idx*100}%)`;
    [...dotsWrap.children].forEach((d,i)=>d.classList.toggle('active',i===idx));
  }
  document.querySelectorAll(`[data-carousel="${prefix}"]`).forEach(btn=>{
    btn.addEventListener('click',()=>{
      const dir=parseInt(btn.dataset.dir);
      idx=(idx+dir+slides.length)%slides.length;
      update();
    });
  });
  let autoTimer=setInterval(()=>{idx=(idx+1)%slides.length;update();},6000);
  track.parentElement.addEventListener('mouseenter',()=>clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave',()=>{autoTimer=setInterval(()=>{idx=(idx+1)%slides.length;update();},6000);});
}
makeCarousel('certTrack','certDots','cert');
makeCarousel('reviewTrack','reviewDots','review');