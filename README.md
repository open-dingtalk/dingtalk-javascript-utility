# journey

🔥 A modern JavaScript utility library , using in Web and Weex.

## 安装

```bash
npm install weex-dingtalk-journey --save
```

## 使用示例

```JavaScript
import journey from 'weex-dingtalk-journey';

// name=icepy&github=icepy -> {name:'icepy',github:'icepy'}

const { querystring, URL } = journey;
const query = querystring.parse('name=icepy&github=icepy');
console.log(query);
```

## Apis 示例

Apis示例，如果例子不详细可以 `npm run test` 跑一下单元测试，查看每一个函数的最终效果。

### querystring

**parse(qs, sep, eq)**

- qs The URL Query string to parse
- sep 默认为“&”，你也可以设置自己的分隔符
- eq 默认为“=”，你也可以设置自己的赋值符

这个方法会返回一个对象，For example, the query string 'name=icepy&github=icepy' is parsed into:

```JavaScript
{
  name: "icepy",
  github: "icepy"
}
```

**stringify(obj, sep, eq)**

- obj The object to serialize into a URL query string
- sep 默认为“&”，你也可以设置自己的分隔符
- eq 默认为“=”，你也可以设置自己的赋值符

这个方法会返回一个字符串，例子 `{name:'icepy',github:'icepy'}` ：

```JavaScript
querystring.stringify( {name:'icepy',github:'icepy'});
//name=icepy&github=icepy
```

### URL

> 注意 ⚠️ URL目前只能处理query

**format(url, query)**

- url，默认url的前缀部分
- query 需要拼接的GET参数

这个方法会返回一个字符串，例子 `{name:'alibaba-dingtalk'}` ：

```JavaScript
URL.format('https://github.com/icepy',{name:'alibaba-dingtalk'});
//https://github.com/icepy?name=alibaba-dingtalk
```

**parse(url,parseQueryString)**

- url 需要解析query的URL
- parseQueryString 可选参数，如果此参数有值，那么将返回query对象中具体的某个参数

例子：

```JavaScript
var query = URL.parse('https://github.com/icepy?name=alibaba-dingtalk');
console.log(query);
// {name: 'alibaba-dingtalk'}

var val = URL.parse('https://github.com/icepy?name=alibaba-dingtalk','name');
// alibaba-dingtalk
```

### env

- isiOS：判断是否为iOS环境
- isAndroid：判断是否为Android环境
- isDingtalk：判断是否为钉钉容器环境
- isWeexWeb：判断是否为有weex render 的Web环境
- isWeexNative：判断是否为有Weex render 的Native环境
- isWeb：判断是否为无Weex环境的Web
