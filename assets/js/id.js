// Session identity and consent-bound hashing utilities
(function(global){
  function getOrCreateSessionUUID(){
    var k = 'session_uuid'; var id = sessionStorage.getItem(k);
    if (!id) { id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : 'sess-'+Math.random().toString(36).slice(2)+Date.now(); sessionStorage.setItem(k, id); }
    return id;
  }
  function sha256Hex(text){
    if (!text) return Promise.resolve('');
    if (!(global.crypto && global.crypto.subtle)) return Promise.resolve('');
    var enc = new TextEncoder();
    return crypto.subtle.digest('SHA-256', enc.encode(text)).then(function(buf){
      return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
    });
  }
  global.ID = { getOrCreateSessionUUID: getOrCreateSessionUUID, sha256Hex: sha256Hex };
})(window);

