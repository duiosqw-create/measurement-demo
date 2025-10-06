(function(){
  if (new URLSearchParams(location.search).get('debug') !== '1') return;
  var log=[]; var origPush = dataLayer.push; dataLayer.push = function(){ var ev=arguments[0]; if (log.length>9) log.shift(); log.push(ev); try { origPush.apply(dataLayer, arguments);} catch(e){} update(); };
  function update(){ var el=document.getElementById('debug-pre'); if(!el) return; var payload={ consent: __consent.getConsent(), utms:{ utm_source: sessionStorage.getItem('utm_source')||'', utm_medium: sessionStorage.getItem('utm_medium')||'', utm_campaign: sessionStorage.getItem('utm_campaign')||'' }, session_uuid: sessionStorage.getItem('session_uuid')||'', experiments: window.EXP?window.EXP.snapshot():{}, last_events: log, page_bytes_kb: Math.round((document.documentElement.outerHTML.length)/1024) }; el.textContent=JSON.stringify(payload,null,2); }
  update();
})();

