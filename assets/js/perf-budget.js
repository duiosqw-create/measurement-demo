(function(){
  var host=location.hostname; var isPreview=host.endsWith('github.io')||host==='localhost'; if(!isPreview) return;
  function warn(label,cond){ if(cond) console.warn('[Perf budget]',label); }
  try { var htmlSize=document.documentElement.outerHTML.length; warn('HTML > 100KB', htmlSize>100*1024); } catch(e) {}
  try { new PerformanceObserver(function(list){ var total=0; list.getEntries().forEach(function(e){ if(e.duration>50) total+=e.duration; }); setTimeout(function(){ warn('Main-thread blocking > 200ms', total>200); },3000); }).observe({entryTypes:['longtask']}); } catch(e) {}
  // Resource sizes (rough)
  try {
    setTimeout(function(){
      var entries = performance.getEntriesByType('resource') || [];
      var js=0, css=0, img=0; entries.forEach(function(r){
        var kb = (r.transferSize||0)/1024; if(/\.js(\?|$)/.test(r.name)) js+=kb; else if(/\.css(\?|$)/.test(r.name)) css+=kb; else if(/\.(png|jpg|jpeg|webp|gif|svg)(\?|$)/.test(r.name)) img=Math.max(img,kb);
      });
      warn('JS > 120KB', js>120); warn('CSS > 50KB', css>50); warn('Hero image > 180KB', img>180);
    }, 4000);
  } catch(e) {}
})();

