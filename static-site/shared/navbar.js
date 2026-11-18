const navbar=document.querySelector('.navbar');

// Experimental values for review, in CSS pixels. Transition: 320ms in CSS.
const HIDE_DISTANCE=60, REVEAL_DISTANCE=14, TOP_ZONE=12;
const position=()=>Math.max(0,Math.min(scrollY,document.documentElement.scrollHeight-innerHeight));
let low=position(),high=low,queued=false;
function show(){navbar.dataset.hidden='false';}
function reset(){low=high=position();}
function update(){
 queued=false;const y=position();
 const shortPage=document.documentElement.scrollHeight<=innerHeight+1;
 navbar.dataset.surface=shortPage||y>TOP_ZONE?'filled':'clear';
 if(shortPage){show();reset();return;}
 if(y<=TOP_ZONE || navbar.contains(document.activeElement) || navbar.classList.contains('menu-open')){show();reset();return;}
 if(navbar.dataset.hidden==='true'){
  high=Math.max(high,y);
  if(high-y>=REVEAL_DISTANCE){show();low=y;}
 }else{
  low=Math.min(low,y);
  if(y-low>=HIDE_DISTANCE){navbar.dataset.hidden='true';high=y;}
 }
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
addEventListener('resize',()=>{reset();update();});
navbar.addEventListener('focusin',()=>{show();reset();update();});
navbar.addEventListener('focusout',()=>{reset();});
navbar.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{
 if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 if(!link.hash)return;const target=document.querySelector(link.hash);if(!target)return;
 event.preventDefault();target.focus({preventScroll:true});target.scrollIntoView({behavior:'instant',block:'start'});
 history.pushState(null,'',link.hash);show();reset();update();
}));
update();


const menuToggle=navbar.querySelector('.menu-toggle');
const menuLinks=navbar.querySelector('.links');
function setMenu(open){
 navbar.classList.toggle('menu-open',open);
 menuToggle.setAttribute('aria-expanded',String(open));
 menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
 if(innerWidth<=700)menuLinks.inert=!open;
 else menuLinks.inert=false;
 if(open)show();
}
setMenu(false);
menuToggle.addEventListener('click',()=>setMenu(!navbar.classList.contains('menu-open')));
menuLinks.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false)});
addEventListener('resize',()=>{if(innerWidth>700)setMenu(false);else menuLinks.inert=!navbar.classList.contains('menu-open')});
addEventListener('keydown',event=>{if(event.key==='Escape'&&navbar.classList.contains('menu-open')){setMenu(false);menuToggle.focus()}});
