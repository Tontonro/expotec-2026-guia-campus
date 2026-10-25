(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const scroll=(id)=>$(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 const selectBlock=(block)=>{
   const area=document.querySelector('.area[data-id="'+block+'"]');
   if(!area)return;
   area.dispatchEvent(new MouseEvent('click',{bubbles:true}));
   scroll('mapCard');
   document.querySelectorAll('.quick-block').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.goBlock===block)));
   $('mobileExplore')?.classList.remove('dock-active');$('mobileMap')?.classList.add('dock-active');
 };
 document.querySelectorAll('[data-go-block]').forEach(el=>el.addEventListener('click',()=>selectBlock(el.dataset.goBlock)));
 const agenda=()=>{$('modeAgenda')?.click();scroll('explorar');selectDock('mobileAgenda')};
 const blocks=()=>{$('modeBlocks')?.click();scroll('explorar');selectDock('mobileExplore')};
 function selectDock(which){document.querySelectorAll('.dock-btn').forEach(el=>el.classList.toggle('dock-active',el.id===which))}
 $('navAgenda')?.addEventListener('click',e=>{e.preventDefault();agenda()});
 document.querySelectorAll('[data-open-agenda]').forEach(el=>el.addEventListener('click',agenda));
 $('mobileExplore')?.addEventListener('click',blocks);
 $('mobileAgenda')?.addEventListener('click',agenda);
 $('mobileMap')?.addEventListener('click',()=>{scroll('mapCard');selectDock('mobileMap')});
 // Site remains usable with keyboard. Keep the active mode visible in the mobile dock.
 $('modeBlocks')?.addEventListener('click',()=>selectDock('mobileExplore'));
 $('modeAgenda')?.addEventListener('click',()=>selectDock('mobileAgenda'));
})();
