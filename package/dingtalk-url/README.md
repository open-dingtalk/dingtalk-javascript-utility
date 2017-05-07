# dingtalk-url

> parse url query

## For Chinese

[dingtalk-url 中文]()

## Install

```bash
$ npm install dingtalk-url --save
```

## Usage

```JavaScript
import url from 'dingtalk-url';

var query = url.parse('https://github.com/icepy?name=alibaba-dingtalk');
console.log(query);
// {name: 'alibaba-dingtalk'}

var val = url.parse('https://github.com/icepy?name=alibaba-dingtalk','name');
// alibaba-dingtalk

url.format('https://github.com/icepy',{name:'alibaba-dingtalk'});
//https://github.com/icepy?name=alibaba-dingtalk

```
