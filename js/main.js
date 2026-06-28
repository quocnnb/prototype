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
        [].forEach.call(el.children,function(c,i){ c.style.transitionDelay=(i*90)+'ms'; });
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
  var link=document.getElementById('hheroLink');
  if(slides.length<2) return;
  var i=0;
  function show(n){
    slides[i].classList.remove('on'); i=n; slides[i].classList.add('on');
    var s=slides[i];
    if(pill){ var info=s.getAttribute('data-info'); if(info) pill.textContent=info; }
    if(link){ var href=s.getAttribute('data-href'); if(href) link.setAttribute('href',href); }
  }
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){ show((i+1)%slides.length); },5000);
  }
})();
(function(){
  // restaurants index: cuisine filter + hide empty region groups
  var filter=document.querySelector('.rx-filter'); if(!filter) return;
  var cards=[].slice.call(document.querySelectorAll('.rcard[data-cuisine]'));
  var groups=[].slice.call(document.querySelectorAll('.rx-group'));
  var empty=document.getElementById('rxEmpty');
  filter.addEventListener('click',function(e){
    var b=e.target.closest('.rx-chip'); if(!b) return;
    var f=b.getAttribute('data-val');
    [].forEach.call(filter.querySelectorAll('.rx-chip'),function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false');});
    var shown=0;
    cards.forEach(function(c){
      var ok=(f==='all')||c.getAttribute('data-cuisine')===f;
      c.classList.toggle('hide',!ok); if(ok) shown++;
    });
    groups.forEach(function(g){ g.classList.toggle('hide',!g.querySelector('.rcard:not(.hide)')); });
    if(empty) empty.hidden=shown!==0;
  });
})();


(function(){
  // what's on: combined filter (year chips + restaurant dropdown + search) + reveal-older
  var grid=document.querySelector('.wo-grid'); if(!grid) return;
  var yearF=document.querySelector('.wo-filter');
  var venueSel=document.getElementById('woVenue');
  var search=document.getElementById('woSearch');
  var empty=document.getElementById('woEmpty');
  var cards=[].slice.call(grid.querySelectorAll('.wo-card[data-year]'));
  var year='all';
  function apply(){
    var v=venueSel?venueSel.value:'all';
    var q=search?search.value.trim().toLowerCase():'';
    var shown=0;
    cards.forEach(function(c){
      var okY=(year==='all')||c.getAttribute('data-year')===year;
      var cv=c.getAttribute('data-venue')||'';
      var okV=(v==='all')||cv===v||cv==='all-venues';
      var okQ=!q||(c.textContent||'').toLowerCase().indexOf(q)>-1;
      var hidden=c.classList.contains('wo-hidden');
      var ok=okY&&okV&&okQ;
      c.classList.toggle('hide',!ok);
      if(ok&&!hidden) shown++;
    });
    if(empty) empty.hidden=shown!==0;
  }
  if(yearF){ yearF.addEventListener('click',function(e){
    var b=e.target.closest('.rx-chip'); if(!b) return;
    year=b.getAttribute('data-val');
    [].forEach.call(yearF.querySelectorAll('.rx-chip'),function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false');});
    apply();
  }); }
  if(venueSel) venueSel.addEventListener('change',apply);
  if(search) search.addEventListener('input',apply);
  // reveal older (prototype) events; real pagination comes with the CMS
  var btn=document.getElementById('woMore');
  if(btn){ btn.addEventListener('click',function(){
    [].forEach.call(grid.querySelectorAll('.wo-card.wo-hidden'),function(c){ c.classList.remove('wo-hidden'); });
    var wrap=btn.parentNode; if(wrap&&wrap.parentNode) wrap.parentNode.removeChild(wrap);
    apply();
  }); }
})();
(function(){
  // subscribe modal
  var modal=document.getElementById('subModal'); if(!modal) return;
  var form=modal.querySelector('#subForm');
  var emailI=modal.querySelector('#subEmail'), nameI=modal.querySelector('#subName');
  var errE=modal.querySelector('#subErrEmail'), errN=modal.querySelector('#subErrName');
  var wrap=modal.querySelector('#subFormWrap'), done=modal.querySelector('#subDone'), doneMsg=modal.querySelector('#subDoneMsg');
  var registered=[], lastFocus=null;
  function reset(){ wrap.hidden=false; done.hidden=true; form.reset(); errE.textContent=''; errN.textContent=''; emailI.classList.remove('bad'); nameI.classList.remove('bad'); }
  function open(e){ if(e) e.preventDefault(); lastFocus=document.activeElement; reset(); modal.classList.add('on'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; setTimeout(function(){emailI.focus();},40); }
  function close(){ modal.classList.remove('on'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
  [].forEach.call(document.querySelectorAll('[data-subscribe]'),function(o){ o.addEventListener('click',open); });
  modal.addEventListener('click',function(e){ if(e.target.hasAttribute('data-sub-close')) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal.classList.contains('on')) close(); });
  form.addEventListener('submit',function(e){
    e.preventDefault(); errE.textContent=''; errN.textContent=''; emailI.classList.remove('bad'); nameI.classList.remove('bad');
    var em=emailI.value.trim(), nm=nameI.value.trim(), ok=true;
    if(!nm){ errN.textContent='Please enter your name.'; nameI.classList.add('bad'); ok=false; }
    if(!em){ errE.textContent='Please enter your email.'; emailI.classList.add('bad'); ok=false; }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ errE.textContent='Please enter a valid email address.'; emailI.classList.add('bad'); ok=false; }
    if(!ok) return;
    if(registered.indexOf(em.toLowerCase())>-1){ errE.textContent='This email is already subscribed.'; emailI.classList.add('bad'); return; }
    registered.push(em.toLowerCase());
    doneMsg.textContent='Thanks, '+nm+'! You\'re on the list.';
    wrap.hidden=true; done.hidden=false;
  });
})();
(function(){
  // careers: search + department filter, expandable details, view-all
  var list=document.querySelector('.job-list'); if(!list) return;
  var s=document.getElementById('jobSearch'), d=document.getElementById('jobDept'), empty=document.getElementById('jobEmpty');
  var jobs=[].slice.call(list.querySelectorAll('.job'));
  function apply(){
    var q=s?s.value.trim().toLowerCase():'', dep=d?d.value:'all', shown=0;
    jobs.forEach(function(j){
      var okD=(dep==='all')||j.getAttribute('data-dept')===dep;
      var okQ=!q||(j.textContent||'').toLowerCase().indexOf(q)>-1;
      var ok=okD&&okQ; j.classList.toggle('hide',!ok);
      if(ok && !j.classList.contains('job-hidden')) shown++;
    });
    if(empty) empty.hidden=shown!==0;
  }
  if(s) s.addEventListener('input',apply);
  if(d) d.addEventListener('change',apply);
  // expand / collapse a role
  list.addEventListener('click',function(e){
    var b=e.target.closest('.job-toggle'); if(!b) return;
    var det=b.closest('.job').querySelector('.job-detail'); if(!det) return;
    var opening=det.hasAttribute('hidden');
    if(opening){ det.removeAttribute('hidden'); } else { det.setAttribute('hidden',''); }
    b.setAttribute('aria-expanded', opening?'true':'false');
    b.textContent = opening ? 'Hide details' : 'View details';
  });
  // view all roles
  var more=document.getElementById('jobMore');
  if(more){ more.addEventListener('click',function(){
    [].forEach.call(list.querySelectorAll('.job.job-hidden'),function(j){ j.classList.remove('job-hidden'); });
    var w=more.parentNode; if(w&&w.parentNode) w.parentNode.removeChild(w);
    apply();
  }); }
})();
(function(){
  // media: type + year chip filters
  var grid=document.querySelector('.md-grid'); if(!grid) return;
  var cards=[].slice.call(grid.querySelectorAll('.wo-card'));
  var typeF=document.querySelector('.md-types'), yearF=document.querySelector('.md-years'), empty=document.getElementById('mdEmpty');
  var type='all', year='all';
  function apply(){
    var shown=0;
    cards.forEach(function(c){
      var okT=(type==='all')||c.getAttribute('data-type')===type;
      var okY=(year==='all')||c.getAttribute('data-year')===year;
      var ok=okT&&okY; c.classList.toggle('hide',!ok); if(ok) shown++;
    });
    if(empty) empty.hidden=shown!==0;
  }
  function bind(f,set){ if(!f) return; f.addEventListener('click',function(e){
    var b=e.target.closest('.rx-chip'); if(!b) return;
    set(b.getAttribute('data-val'));
    [].forEach.call(f.querySelectorAll('.rx-chip'),function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false');});
    apply();
  }); }
  bind(typeF,function(v){type=v;}); bind(yearF,function(v){year=v;});
})();
(function(){
  // contact: prototype form validation (no backend; shows a thank-you)
  var form=document.getElementById('ctForm'); if(!form) return;
  var name=document.getElementById('ctName'), email=document.getElementById('ctEmail'), msg=document.getElementById('ctMsg');
  var eN=document.getElementById('ctErrName'), eE=document.getElementById('ctErrEmail'), eM=document.getElementById('ctErrMsg');
  var done=document.getElementById('ctDone');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    eN.textContent='';eE.textContent='';eM.textContent='';
    name.classList.remove('bad');email.classList.remove('bad');msg.classList.remove('bad');
    var ok=true, nm=name.value.trim(), em=email.value.trim(), mg=msg.value.trim();
    if(!nm){eN.textContent='Please enter your name.';name.classList.add('bad');ok=false;}
    if(!em){eE.textContent='Please enter your email.';email.classList.add('bad');ok=false;}
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){eE.textContent='Please enter a valid email address.';email.classList.add('bad');ok=false;}
    if(!mg){eM.textContent='Please enter a message.';msg.classList.add('bad');ok=false;}
    if(!ok) return;
    form.reset(); done.hidden=false;
  });
})();
