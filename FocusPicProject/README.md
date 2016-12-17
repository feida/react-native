使用ScrollView组件 实现焦点图自动滚动效果
用到了定时器 插件包 react-timer-mixin 用法如下
  1. 首先下载 npm install react-timer-mixin -save
  2引入定时器
    var TimerMixin = require('react-timer-mixin');
  3 在 创建的类里面注册
     mixins: [TimerMixin],
     
     
    
