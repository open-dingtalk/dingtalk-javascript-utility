function parse(qs, sep, eq){
  const obj = Object.create(null);
  if (typeof qs !== 'string' || qs.length === 0 ){
    return obj;
  }
  sep = sep || '&';
  eq = eq || '=';
  const params = qs.split(sep);
  let i = 0;
  let l = params.length;
  for(;i<l;i++){
    let items = params[i].split(eq);
    let queryKey = items[0].trim();
    let queryVal = '';
    if (items.length >= 3){
      items.splice(0,1);
      let lastIndex = items.length - 1;
      items.forEach(function(v,i){
        v = v.trim();
        if (i === lastIndex){
          queryVal += v;
        } else {
          queryVal += v + eq
        }
      });
    } else {
      queryVal = items[1].trim();
    }
    let cur = obj[queryKey];
    if (cur){
      if (Array.isArray(cur)){
        cur.push(decodeURIComponent(queryVal));
      } else {
        let temp = cur;
        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(decodeURIComponent(queryVal));
      }
    } else {
      obj[queryKey] = decodeURIComponent(queryVal);
    }
  }
  return obj;
}

function stringify(obj, sep, eq){
  sep = sep || '&';
  eq = eq || '=';
  if (obj !== null && typeof obj === 'object'){
    const keys = Object.keys(obj);
    const len = keys.length;
    const flast = len - 1;
    let fields = '';
    let i = 0;
    for (;i<len; i++){
      let k = keys[i];
      let v = obj[k];
      let ks = k + eq;
      if (Array.isArray(v)){
        let vlen = v.length;
        let vlast = vlen - 1;
        let j = 0;
        for (; j < vlen; ++j) {
           fields += ks + decodeURIComponent(v[j]);
           if (j < vlast){
             fields += sep;
           }
        }
        if (vlen && i < flast){
          fields += sep;
        }
      } else {
        fields += ks + decodeURIComponent(v);
        if (i < flast){
          fields += sep;
        }
      }
    }
    return fields;
  }
  return '';
}

export default {
  stringify,
  parse
};
