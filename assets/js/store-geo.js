(function(){
  function loadJSON(path){ return fetch(path, { cache:'no-store' }).then(function(r){ return r.json(); }); }
  function clusterFromParam(){ var p=new URLSearchParams(location.search).get('cluster'); return p||''; }
  window.STORE_GEO = {
    init: function(){
      return loadJSON('/data/stores.json').then(function(cfg){ return { cfg: cfg, cluster: clusterFromParam() }; });
    }
  };
})();

