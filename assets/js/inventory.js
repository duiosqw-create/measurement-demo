(function(){
  function loadJSON(path){ return fetch(path, { cache:'no-store' }).then(function(r){ return r.json(); }); }
  function applyBadges(items){
    items.forEach(function(it){ var el=document.querySelector('[data-item-id="'+it.id+'"]'); if(!el) return; var b=document.createElement('span'); b.textContent=it.badge; b.style.marginLeft='8px'; b.style.fontSize='12px'; b.style.color='#a8b3c5'; el.appendChild(b);
      if (it.doc_days<7) { var cta=el.querySelector('.btn'); if(cta) cta.style.opacity='0.6'; }
    });
  }
  window.INVENTORY = { init: function(){ return loadJSON('/data/inventory.json').then(function(d){ applyBadges(d.items||[]); }); } };
})();

