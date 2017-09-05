# React-timer

## 运行方式

```js
$ npm run
```

## 构建方式

```js
$ npm build
```

## 组件使用说明

1. 支持自定义提交显示文本(默认值如下，`{{time}}`指代倒计时时间、照写就是)。

```js
<App timeHintText='请耐心等待 {{time}}s' />
```

2. 支持自定义倒计时时间设置(默认值如下)。

```js
<App time={60} />
```
