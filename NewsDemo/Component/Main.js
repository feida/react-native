/**
 * Created by adimn on 2016/12/17.
 */
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
    Image,
    Platform,  //用来判断当前运行的系统
    Navigator
} from 'react-native';

// 导入外部TabNavigator组件
import TabNavigator from 'react-native-tab-navigator';

var Home = require('../Component/Home');
var Find = require('../Component/Find');
var Mine = require('../Component/Mine');
var More = require('../Component/More');

var Main = React.createClass({
    // 初始化函数
    getInitialState(){
      return{
          selectedTab:'home' //默认是第一个
      }
    },

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    title="首页"
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_homepage'}} style={styles.iconStyle} />} //图标
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_homepage_selected'}} style={styles.iconStyle} />}  //点击后的图标
                    onPress = {() => {this.setState({selectedTab: 'home'})}}
                    selected = {this.state.selectedTab==='home'}
                    selectedTitleStyle = {{color:'orange'}}
                >
                    <Navigator
                        initialRoute={{ name: '首页', component: Home }}
                        configureScene={() => {
                            return Navigator.SceneConfigs.PushFromRight;
                        }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="寻找"
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_merchant_normal'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_merchant_selected'}} style={styles.iconStyle} />}
                    onPress = {() => {this.setState({selectedTab: 'find'})}}
                    selected = {this.state.selectedTab==='find'}
                    selectedTitleStyle = {{color:'orange'}}
                >
                    <Find />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我的"
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_mine'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_mine_selected'}} style={styles.iconStyle} />}
                    onPress = {() => {this.setState({selectedTab: 'mine'})}}
                    selected = {this.state.selectedTab==='mine'}
                    selectedTitleStyle = {{color:'orange'}}
                >
                    <Mine />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="更多"
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_misc'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_misc_selected'}} style={styles.iconStyle} />}
                    onPress = {() => {this.setState({selectedTab: 'more'})}}
                    selected = {this.state.selectedTab==='more'}
                    selectedTitleStyle = {{color:'orange'}}
                >
                    <More />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
})

const styles = StyleSheet.create({
    iconStyle:{
        width: Platform.OS==='ios' ? 30 :25,
        height: Platform.OS==='ios' ? 30 :25
    }
});

module.exports = Main;