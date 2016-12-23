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
    TouchableOpacity,
    ListView
} from 'react-native';

var Dimensions = require('Dimensions');

var {width, height} = Dimensions.get('window');

// 本地数据
var LocalData = require('../localData.json');

// 导入外部组件
// var ScrollImage = require('../Component/ScrollImage');
 var NewsDetail = require('../Component/NewsDetail');
var Home = React.createClass({

    getDefaultProps(){
        return {
            url_api:'http://c.m.163.com/nc/article/headline/Ygfhdhdjj/0-20.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=20&version=8.1&spever=false&net=wifi&lat=5OtqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jKlRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311&sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
            key_word: 'Ygfhdhdjj'
        }
    },

    getInitialState(){
        return {
            // 头部数据
            headerDataArr: [],

            // cell的数据
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    },

    render() {
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow}
                renderHeader = {this.renderHeader}
            />
        );
    },

    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress= {() =>{this.pushToNewDetail(rowData)}}>
                <View style={styles.cellViewStyle}>
                    {/*左边*/}
                    <Image source={{uri: rowData.imgsrc}} style={styles.imgStyle}/>
                    {/*右边*/}
                    <View style={styles.rightViewStyle}>
                        <Text style={styles.titleStyle}>{rowData.title}</Text>
                        <Text style={styles.subTitleStyle}>{rowData.lmodify}</Text>
                        <Text style={styles.flowTitleStyle}>{rowData.replyCount}跟贴</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },

    // 跳转到新闻页面
    pushToNewDetail(rowData){

        this.props.navigator.push({
            component: NewsDetail,
            title: rowData.title,
            params:{rowData}
        });
    },

    // 头部广告
    /*renderHeader(){
       // 判断数据为空 直接返回
        if(this.state.headerDataArr.length==0) return;

        return(
            <ScrollImage
                imageDataArr = {this.state.headerDataArr}
            />
        );
    },*/

    //请求网络数据
    componentDidMount(){
        this.loadDataFromNet();
    },

    loadDataFromNet(){
        fetch(this.props.url_api)
            .then((response) => response.json())
            .then((responseJson) => {
                // 拿到数据
                var jsonData = responseJson[this.props.key_word];
                // 处理数据
                this.dealWithData(jsonData);
            })
            .catch((error) => {
                if (error){
                    var jsonData = LocalData[this.props.key_word];
                    this.dealWithData(jsonData);
                }
            })
    },
    // 处理网络数据
    dealWithData(jsonData){
        var headerData = [], listData = [];
        // 遍历数据
        for (var i=0; i<jsonData.length; i++){
            // 拿到每一个数据
            var data = jsonData[i];

            // 判断是不是头部的数据
            if(data.hasAD ==1){
                // 头部广告的数据
                headerData = data.ads;
            }else{
                listData.push(data);
            }
        }

        // 更新状态机

        this.setState({
            // 头部数据源
            headerDataArr: headerData,

            // cell数据源
            dataSource: this.state.dataSource.cloneWithRows(listData)
        })

        console.log(headerData, listData);
    }

});

const styles = StyleSheet.create({
    cellViewStyle: {
        flexDirection: 'row',
        padding:10,
        borderBottomWidth:0.5,
        borderBottomColor: 'gray'
    },
    imgStyle: {
        width:90,
        height:90
    },
    rightViewStyle: {
        width: width*0.7,
        marginLeft: 8
    },
    titleStyle: {
        fontSize:16,
        marginBottom: 8
    },
    subTitleStyle: {
        color: 'gray',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    flowTitleStyle: {
        position:'absolute',
        right: 5,
        bottom: 0,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth : 0.5,
        padding: 2,
        fontSize: 12
    }
});

module.exports = Home;