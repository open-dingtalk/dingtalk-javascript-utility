import querystring from 'dingtalk-querystring';

function format(url, query){
  let search = querystring.stringify(query);
  return url + '?' + search;
}

function parse(url,parseQueryString){
  let location = {
    hash: null,
    search: null
  };
  const hashIndex = url.indexOf('#');
  const searchIndex = url.indexOf('?');
  if (searchIndex === -1){
    return null;
  }
  if (hashIndex > -1){
    location.hash = url.slice(hashIndex);
    location.search = url.slice(searchIndex, hashIndex);
  } else {
    location.search = url.slice(searchIndex);
  }
  const searchString = location.search.slice(1);
  const query = querystring.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0){
    return query[parseQueryString];
  } else {
    return query;
  }
}

export default {
  format,
  parse
}
