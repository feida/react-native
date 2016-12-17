/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';

// 屏幕宽
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

// 获取json数据
var WineData = require('./Wine.json');
var AwesomeProject = React.createClass({
    // 设置初始值
    getInitialState(){
        // 设置数据源
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
        // 设置返回数据
        return {
            dataSource:ds.cloneWithRows(WineData)
        }
    },
    // 设置render
    render() {
        return (
            // 必须2个参数,renderRow,数据源
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow}
            />
        );
    },

    // 返回具体的renderRow
    renderRow(rowData, sectionID, rowID, highlightRow){
        return (
            <TouchableOpacity activeOpacity = {0.5} onPress={() => Alert.alert(
                '点击了第'+ rowID +'行'
            )}>
                <View style={styles.container}>
                    <Image source={{uri:rowData.img}} style={styles.listImageStyle}/>
                    <View style={styles.listRightStyle}>
                        <Text style={styles.textTopStyle}>{rowData.name}</Text>
                        <Text style={styles.textBottomStyle}>￥{rowData.money}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

});
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        backgroundColor: '#ccc'
    },
    listImageStyle: {
        width: 80,
        height: 80,
        marginRight: 15
    },
    listRightStyle: {
        justifyContent: 'center'
    },
    textTopStyle: {
        width: width*0.7,
        fontSize: 15,
        color: '#000',
        marginBottom: 2
    },
    textBottomStyle: {
        color: 'red'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
