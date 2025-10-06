// Simple experiments router reading /config/experiments.json
(function(global){
  var assignments = {};
  function weightPick(weights){ var roll = Math.random()*100, acc=0, pick; Object.keys(weights).some(function(k){ acc+=weights[k]; if(roll<=acc){ pick=k; return true;} return false;}); return pick || Object.keys(weights)[0]; }
  function assign(name, weights){ var key='ab_'+name; var ex=sessionStorage.getItem(key); if(ex) return ex; var v=weightPick(weights); sessionStorage.setItem(key, v); return v; }
  function snapshot(){ var out={}; Object.keys(assignments).forEach(function(n){ out[n]=sessionStorage.getItem('ab_'+n); }); return out; }
  function init(){
    fetch('/config/experiments.json', { cache:'no-store' }).then(function(r){ return r.ok ? r.json() : {}; }).then(function(cfg){
      assignments = cfg || {}; Object.keys(assignments).forEach(function(n){ assign(n, assignments[n].variants); });
      global.EXP = { snapshot: snapshot };
      var el = document.getElementById('ab_assignments'); if (el) el.value = JSON.stringify(snapshot());
    }).catch(function(){ global.EXP = { snapshot: function(){ return {}; } }; });
  }
  init();
})(window);

