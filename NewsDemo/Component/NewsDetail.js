/**
 * Created by adimn on 2016/12/18.
 */
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
    WebView,
    TouchableOpacity
} from 'react-native';

var NewsDetail = React.createClass({

    getDefaultProps(){
        return{

        }
    },

    getInitialState(){
      return {
          detailData: ''
      }
    },

    render() {
        return (

            <WebView
                allowsInlineMediaPlayback={true}
                style={styles.webView}
                source={{html: this.state.detailData, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}

            />

        );
    },

    componentDidMount(){
        // 请求路径
        console.log(this.props.rowData)
        var url_api = 'http://c.3g.163.com/nc/article/' + this.props.rowData.docid + '/full.html';

        fetch(url_api)
            .then((response) => response.json())
            .then((responseData) => {
                var allData = responseData[this.props.rowData.docid];

                var bodyHtml = allData['body'];

                // 拿到图片数据
                if(allData['img'].length>0){
                    for (var i=0; i<allData['img'].length;i++){
                        var img = allData['img'][i];

                        var imgSrc = img['src'];
                        var imgHtml = '<img src="'+ imgSrc +'" width="100%"/>'
                        
                        // 替换body中的图像占位符
                        bodyHtml = bodyHtml.replace(img['ref'], imgHtml);
                    }
                }

                // 更新状态机

                this.setState({
                    detailData: bodyHtml
                });
            })
            .catch((error) => {
                alert('请求数据失败');
            })
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = NewsDetail;
