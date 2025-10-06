(function(){
  window.PRIVACY = {
    forget: function(){
      try {
        ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','session_uuid'].forEach(function(k){ sessionStorage.removeItem(k); });
        ['consent_level'].forEach(function(k){ localStorage.removeItem(k); });
      } catch(e) {}
    }
  };
})();

