这个库存在的意义是提供一些便捷的Utility函数，这些Utility函数将抹平Web Weex之间的一些差异，提供统一的接口，让用户使用，目前实现了7个模块可供使用。

源码访问：[https://github.com/icepy/dingtalk-javascript-utility](https://github.com/icepy/dingtalk-javascript-utility)

# 安装

```bash
$ npm install dingtalk-javascript-utility --save
```

# env（Object）

* bundleFrameworkType （渲染框架标识 Vue or Rax）
* isDingtalk 是否在钉钉客户端中
* isWeb 是否为Web环境
* isWebAndroid 是否为Web环境中的Android设备
* isWebiOS 是否为Web环境中的iOS设备
* isWeex 是否为Weex环境
* isWeexAndroid 是否为Weex环境中的Android设备
* isWeexiOS 是否为Weex环境中的iOS设备
* originalUrl 用户配置的originalUrl
* version 钉钉客户端版本号
* platform 输出环境标识符

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { env } = utility;

console.log(env)
```

# querystring（Object）

* parse 解析传统的search参数

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { querystring } = utility;

// name=icepy&job=develop
const result = querystring.parse('name=icepy&job=develop')

console.log(result)
// {name:'icepy',job:'develop'}
```

* stringify 将一个key/value的对象转换成字符串

```JavaScript
import utilityfrom 'dingtalk-javascript-utility';
const { querystring } = utility;

// {name:'icepy',job:'develop'}
const result = querystring.stringify({name:'icepy',job:'develop'});

console.log(result)

// name=icepy&job=develop
```

> Note 这两个方法都支持自定义 sep 和 eq

# url（Object）

* parse 解析URL中的search参数

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { url } = utility

// https://github.com/icepy/?name=icepy&job=develop
const result = url.parse('https://github.com/icepy/?name=icepy&job=develop')

console.log(result)
// {name:'icepy',job:'develop'}

const result2 = url.parse('https://github.com/icepy/?name=icepy&job=develop','job')
// develop

```

* format 将一个key/value的对象转换成传统URL格式的字符串

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { url } = utility

// https://github.com/icepy/ | {name:'icepy',job:'develop'}

const result = url.format('https://github.com/icepy', {name:'icepy',job:'develop'});

// https://github.com/icepy?name=icepy&job=develop

```

# requireModule（Function）

载入一个客户端module，支持Web，Weex

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { requireModule } = utility

requireModule('modal')

```

# timer（Object）

* setTimeout 设置一个数值，延迟多少毫秒执行，且执行一次
* clearTimeout 可以将setTimeout函数clear
* setInterval 设置一个数值，延迟多少毫秒重复执行
* clearInterval 可以将setInterval函数clear

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { timer } = utility

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
import utility from 'dingtalk-javascript-utility';
const { document } = utility;

console.log(document)
```

> Note 不建议大家直接操作DOM

# compareVersion（Function）

钉钉客户端版本对比的处理函数

```JavaScript
import utility from 'dingtalk-javascript-utility';
const { compareVersion } = utility;

compareVersion('3.4.10','3.5') // true 

compareVersion('3.4.10','3.4') // false

```

# log（Object）

日志等级系统

```JavaScript
import utility from 'dingtalk-javascript-utility'

const { LogType, setLog,log} = utility;

log(['default'])
log(['info ...'],LogType.INFO)
log(['error ...'],LogType.ERROR)
log(['warning ...'],LogType.WARNING)
```

# callTransform

将钉钉JSAPI转换成返回Promise对象

```JavaScript
import utility from 'dingtalk-javascript-utility'

const { callTransform } = utility;

callTransform('biz.navigation.setTitle',{}).then(response => {}).catch(err => {})

```

# Private

实验性质（慎用）

> index.js 为阻塞版本，一直会等待生成API列表之后，程序才会执行，可以直接引用，大概需要80ms。

```JavaScript

import dd from './dingtalk-apisync/index.js'

dd.biz.navigation.setTitle({}) // 内部无ready包装

```
> addReady.js 会给每一个api添加一个包装ready方法

```JavaScript
import dd from './dingtalk-apisync/addReady.js'

dd.biz.navigation.setTitle({}) //内部有ready包装

```

`ready`包装函数主要用于SDK初始化完成的回调以及JSAPI授权认证的回调，在钉钉中有些API是需要授权的，需要在ready方法中。
