(function(){
  var s=[].slice.call(document.querySelectorAll('#hero .slide')).slice(0,5);
  if(s.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var i=0; setInterval(function(){ s[i].classList.remove('on'); i=(i+1)%s.length; s[i].classList.add('on'); },5000);
  }
})();
(function(){
  // sticky appears after the intro card
  var sticky=document.getElementById('sticky'), trig=document.getElementById('trigger');
  if(sticky && trig){
    var on=function(){ sticky.classList.toggle('show', trig.getBoundingClientRect().top < 0); };
    window.addEventListener('scroll', on, {passive:true}); on();
  }
})();
(function(){
  // intro + desktop-sticky delivery dropdowns
  var dds=[].slice.call(document.querySelectorAll('.dd'));
  dds.forEach(function(dd){
    dd.querySelector('.dd-btn').addEventListener('click', function(e){
      e.stopPropagation();
      var was=dd.classList.contains('open');
      dds.forEach(function(d){d.classList.remove('open')});
      if(!was) dd.classList.add('open');
    });
  });
  // mobile top-nav menu
  var navBtn=document.getElementById('navBtn'), navMenu=document.getElementById('navMenu');
  if(navBtn){ navBtn.addEventListener('click', function(e){ e.stopPropagation(); var o=navMenu.classList.toggle('open'); navBtn.setAttribute('aria-expanded',o); }); }
  // mobile sticky: dots panel + nested delivery
  var stM=document.getElementById('stickyM'), smToggle=document.getElementById('smToggle');
  var spWrap=document.querySelector('.sp-deliv-wrap'), spBtn=document.querySelector('.sp-deliv-btn'), spDeliv=document.querySelector('.sp-deliv');
  if(smToggle){ smToggle.addEventListener('click', function(e){ e.stopPropagation(); var o=stM.classList.toggle('open'); smToggle.setAttribute('aria-expanded',o); }); }
  if(spBtn){ spBtn.addEventListener('click', function(e){ e.stopPropagation(); spDeliv.classList.toggle('open'); spWrap.classList.toggle('sp-deliv-open'); }); }
  document.addEventListener('click', function(){
    dds.forEach(function(d){d.classList.remove('open')});
    if(navMenu){ navMenu.classList.remove('open'); navBtn.setAttribute('aria-expanded','false'); }
  });
})();
(function(){
  // gentle reveal on scroll (sections + staggered grids)
  var els=[].slice.call(document.querySelectorAll('.reveal, .reveal-stagger'));
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(function(el){el.classList.add('in')}); return;
  }
  var io=new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target;
      if(el.classList.contains('reveal-stagger')){
        [].forEach.call(el.children,function(c,i){ c.style.transitionDelay=(i*60)+'ms'; });
      }
      el.classList.add('in');
      io.unobserve(el);
    });
  },{rootMargin:'0px 0px -10% 0px',threshold:0.06});
  els.forEach(function(el){io.observe(el)});
})();

(function(){
  // home hero slideshow: crossfade bg + sync the name/address pill
  var hero=document.getElementById('hhero'); if(!hero) return;
  var slides=[].slice.call(hero.querySelectorAll('.hhero-bg img'));
  var pill=document.getElementById('hheroPill');
  if(slides.length<2) return;
  var i=0;
  function show(n){
    slides[i].classList.remove('on'); i=n; slides[i].classList.add('on');
    if(pill){ var info=slides[i].getAttribute('data-info'); if(info) pill.textContent=info; }
  }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){ show((i+1)%slides.length); },5000);
  }
})();
