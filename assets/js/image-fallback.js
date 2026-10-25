(()=>{
 const headerImg=document.querySelector('.official-wordmark');
 const fallback=document.querySelector('.official-wordmark-fallback');
 const heroImg=document.querySelector('.hero-wordmark');
 if(headerImg){
  const showFallback=()=>{headerImg.hidden=true; if(fallback) fallback.hidden=false;};
  headerImg.addEventListener('error',showFallback);
  if(headerImg.complete && !headerImg.naturalWidth) showFallback();
 }
 if(heroImg){
  const hideHero=()=>{heroImg.parentElement.hidden=true;};
  heroImg.addEventListener('error',hideHero);
  if(heroImg.complete && !heroImg.naturalWidth) hideHero();
 }
})();
