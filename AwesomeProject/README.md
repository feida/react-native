 #react-native项目小练手
 ##主要练习RN中的组件写法
 +View组件
 +Image组件
 +Text组件
 
 ##Image组件加载图片的几种方式
 
 ###静态图片资源
 +只需把图片文件放在代码文件夹中某处，然后像下面这样去引用它：<Image source={require('./my-icon.png')} />
 
 ###使用混合App的图片资源
 +ios中图片资源放入ios/项目名/Image.xcassect/中
 +android中图片资源放入android/app/src/main/res/需创建几个文件夹中
 ++drawable-hdpi
 ++drawable-mdpi
 ++drawable-xhdpi
 ++drawable-xxhdpi
 +<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
 
 
 ###网络图片
 +<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 400}} />
