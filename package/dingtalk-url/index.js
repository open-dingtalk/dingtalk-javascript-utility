import querystring from 'dingtalk-querystring';

function format(url, query){
  let search = querystring.stringify(query);
  return url + '?' + search;
}

function parse(url,parseQueryString){
  const searchIndex = url.indexOf('?');
  const searchString = url.slice(searchIndex + 1);
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
