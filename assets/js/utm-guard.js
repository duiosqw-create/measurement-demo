(function(){
  var host = location.hostname; var isPreview = host.endsWith('github.io') || host==='localhost'; if (!isPreview) return;
  var params = new URLSearchParams(location.search);
  function sanitize(k, v){ if (!v) return v; v=v.trim(); if (k==='utm_source'||k==='utm_medium') v=v.toLowerCase(); return v.replace(/[^a-zA-Z0-9_\-\.\s]/g,''); }
  var required=['utm_source','utm_medium','utm_campaign'];
  var missing = required.filter(function(k){ return !(sessionStorage.getItem(k)||params.get(k)); });
  required.forEach(function(k){ var val=sessionStorage.getItem(k)||params.get(k)||''; var s=sanitize(k,val); if (s!==val) console.warn('[UTM sanitize]',k,'=>',s); });
  if (missing.length) { console.warn('[UTM check] Missing:', missing.join(', ')); } else { console.log('%c[UTM check] OK','color:#2bbf87'); }
})();

