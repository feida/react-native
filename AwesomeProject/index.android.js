/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

// 屏幕宽
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
// 列
var col = 3;
var boxW = 100;
var vMargin = (width-col*boxW)/(col+1);
var hMargin = 25
// 获取json数据
var shareData = require('./shareData.json');
export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.renderAllbadge()}
      </View>
    );
  }

  // 返回一个包
  renderAllbadge() {
    // 定义数组装所有数据
    var allBadge =[];
    //遍历数据
    for(var i = 0; i < shareData.data.length; i++){
      var badge = shareData.data[i];

      // 装入数组
      allBadge.push(
          <View key={i} style={styles.outViewStyle}>
            <Image source={{uri:badge.icon}} style={styles.imageStyle}/>
            <Text style={styles.mainTitleStyle}>
              {badge.title}
            </Text>
          </View>
      );
    }
    // 返回数组
    return allBadge;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  outViewStyle: {
    backgroundColor: 'red',
    width: boxW,
    height: boxW,
    alignItems: 'center',
    marginTop: hMargin,
    marginLeft: vMargin
  },
  mainTitleStyle:{
    fontSize: 12
  },
  imageStyle: {
    width: 80,
    height: 80
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
