(function(){
  // Emergency queue: use #ops=queue to hide call-first CTAs
  if (location.hash.indexOf('ops=queue') !== -1) {
    document.querySelectorAll('.js-phone').forEach(function(a){ a.style.display='none'; });
    var sticky = document.getElementById('sticky-bar'); if (sticky) sticky.style.display='none';
  }
})();

