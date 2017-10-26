这个库存在的意义是提供一些便捷的Utility函数，这些Utility函数将抹平Web Native之间的一些差异，提供统一的接口，让用户使用。

源码访问：[https://github.com/icepy/dingtalk-javascript-utility](https://github.com/icepy/dingtalk-javascript-utility)


# UMD

引用 `https://g.alicdn.com/dingding/dingtalk-javascript-utility/0.2.7/index.js`

```HTML
<script src="https://g.alicdn.com/dingding/dingtalk-javascript-utility/0.2.7/index.js"> </script>
```

```JavaScript
var DTUtility = window.DTUtility;
```

# 安装

```bash
$ npm install dingtalk-javascript-utility --save
```

# 导入方式

第一种方式：

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { env } = DTUtility;
```

第二种方式：
```JavaScript
import { env } from 'dingtalk-javascript-utility';
```

# env（Object）

* isDingTalk, // 是否在钉钉的容器中（包含移动端和PC端）
* isWebiOS, //是否为Web iOS
* isWebAndroid, //是否为Web Android
* isWeexiOS, // 是否为Weex iOS
* isWeexAndroid, // 是否为Weex Android
* isDingTalkPCMac, // 是否为Mac客户端中
* isDingTalkPCWeb, // 是否在PC Web网页中
* isDingTalkPCWindows, // 是否在PC Windows客户端中
* isDingTalkPC, // 是否为PC
* runtime,  // 字符串【'Web','Weex','Unknown'】
* framework, // 字符串【'Vue','Rax','Unknown'】
* platform, // 字符串【'Mac','Windows','iOS','Android','iPad','Browser','Unknown'】
* version // 客户端版本

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { env } = DTUtility;

console.log(env)
```

# querystring（Object）

* parse 解析传统的search参数

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { querystring } = DTUtility;

// name=icepy&job=develop
const result = querystring.parse('name=icepy&job=develop')

console.log(result)
// {name:'icepy',job:'develop'}
```

* stringify 将一个key/value的对象转换成字符串

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { querystring } = DTUtility;

// {name:'icepy',job:'develop'}
const result = querystring.stringify({name:'icepy',job:'develop'});

console.log(result)

// name=icepy&job=develop
```

> Note 这两个方法都支持自定义 sep 和 eq

# url（Object）

* parse 解析URL中的search参数

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { url } = DTUtility

// https://github.com/icepy/?name=icepy&job=develop
const result = url.parse('https://github.com/icepy/?name=icepy&job=develop')

console.log(result)
// {name:'icepy',job:'develop'}

const result2 = url.parse('https://github.com/icepy/?name=icepy&job=develop','job')
// develop

```

* format 将一个key/value的对象转换成传统URL格式的字符串

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { url } = DTUtility

// https://github.com/icepy/ | {name:'icepy',job:'develop'}

const result = url.format('https://github.com/icepy', {name:'icepy',job:'develop'});

// https://github.com/icepy?name=icepy&job=develop

```

# requireModule（Function）

载入一个客户端module，支持Web，Weex

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { requireModule } = DTUtility

requireModule('modal')

```

# timer（Object）

* setTimeout 设置一个数值，延迟多少毫秒执行，且执行一次
* clearTimeout 可以将setTimeout函数clear
* setInterval 设置一个数值，延迟多少毫秒重复执行
* clearInterval 可以将setInterval函数clear

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { timer } = DTUtility

const once = timer.setTimeout(function(){
	timer.clearTimeout(once)
},1000);

const two = timer.setInterval(function(){
	timer.clearInterval(two)
},1000);

```

# document （Object）

支持Weex Native DOM API 和 Web document API

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { document } = DTUtility;

console.log(document)
```

> Note 不建议大家直接操作DOM

# compareVersion（Function）

钉钉客户端版本对比的处理函数

```JavaScript
import DTUtility from 'dingtalk-javascript-utility';
const { compareVersion } = DTUtility;

compareVersion('3.4.10','3.5') // true 

compareVersion('3.4.10','3.4') // false

```

# log（Object）

日志等级系统

```JavaScript
import DTUtility from 'dingtalk-javascript-utility'

const { LogType, setLog, log } = DTUtility;

log(['default'])
log(['info ...'],LogType.INFO)
log(['error ...'],LogType.ERROR)
log(['warning ...'],LogType.WARNING)
```

# config（Object）

日志等级系统

```JavaScript
import DTUtility from 'dingtalk-javascript-utility'

const { config } = DTUtility;

// config.bundleUrl
// config.originalUrl
```

# Private

实验性质（慎用）
