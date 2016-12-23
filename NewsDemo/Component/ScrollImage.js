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
    ScrollView
} from 'react-native';

// 屏幕宽
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


// 引入定时器
var TimerMixin = require('react-timer-mixin');

var ScrollImage = React.createClass({

    // 注册定时器
    mixins: [TimerMixin],

    // 设置固定值
    getDefaultProps(){
        return{
            // 间隔时间
            times:1000,

            // 所有的Image对象数组
            imageDataArr: []
        }
    },

    getInintialState(){
      return{
          // 设置初始值
          currentPage: 0,

          // 标题
          title: this.props.imageDataArr[0].title
      }
    },
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    //绑定标识 让后面拿到
                    ref='scrollView'
                    //横向排列
                    horizontal={true}
                    //隐藏横向滚动条
                    showsHorizontalScrollIndicator={false}
                    //自动分页
                    pagingEnabled={true}
                    //当一帧滚动结束
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    //开始拖拽事件
                    onScrollBeginDrag = {this.onScrollBeginDrag}
                    //停止拖拽事件
                    onScrollEndDrag = {this.onScrollEndDrag}
                >

                    {this.renderAllPic()}
                </ScrollView>
                <View style={styles.dot}>
                    {/*对应的标题*/}
                    <Text  style={{color:'white'}}>{this.state.title}</Text>
                    {/*5个点 */}
                    <View style={{flexDirection:'row'}}>
                        {this.renderDot()}
                    </View>

                </View>
            </View>
        );
    },

     // 调用开始拖拽
    onScrollBeginDrag(){
        // 停止定时器
        this.clearInterval(this.timer);
    },

    // 调用停止拖拽
    onScrollEndDrag(){
        //开启定时器
        this.startTimer();
    },

    // 实现一些复杂逻辑
    componentDidMount(){
      // 开启定时器
      this.startTimer();
    },

    // 设置定时器
    startTimer(){
        // 1 拿到scrollView
        var scrollView = this.refs.scrollView;

        var imgCount= this.props.imageDataArr.length;
        // 2 添加定时器
        this.timer = this.setInterval(function () {
            // 设置圆点
            var activePage = 0;

            if ((this.state.currentPage+1>=imgCount)){
                activePage = 0;
            }else{
                activePage = this.state.currentPage+1;
            }

            // 3 更新状态机
            this.setState({
                currentPage:activePage
            });

            // 4让scrollView滚起来
            var offsetX= activePage*width;
            scrollView.scrollResponderScrollTo({
                x:offsetX,
                y:0,
                animated:true
            });

        },this.props.times);
        
    },

    // 返回所有图片
    renderAllPic(){
        var allImage = [];
        var imgsArr= this.props.imageDataArr;

        for (var i=0; i<imgsArr.length;i++){
            var imgItem = imgsArr[i];
            allImage.push(
                <View>
                    <Image key={i} source={{uri:imgItem.imgsrc}} style={styles.imageStyle}/>
                </View>
            )
        }
        return allImage;
    },

    // 所有的点
    renderDot(){
        var allDot = [];
        var imgsArr= this.props.imageDataArr;
        var style;
        for (var i=0; i<imgsArr.length; i++){
            // 判断style的样式
            style= (i==this.state.currentPage) ? {color:'#000'} : {color:'red'};
            allDot.push(
                <Text key={i} style={[{fontSize:25,color:'#000'},style]}>&bull;</Text>
            )
        }
        return allDot;
    },

    // 当没帧动画结束时调用
    onAnimationEnd(e){
        //1水平方向偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        //2求出当前第几页
        var currentPage = Math.floor(offSetX/width);
        //3跟新状态机,重新绘制UI
        this.setState({
            currentPage:currentPage,

            title:this.props.imageDataArr[currentPage].title
        });
    }
})

const styles = StyleSheet.create({
    container: {

    },
    imageStyle: {
        width: width,
        height: 120
    },
    dot: {
        width: width,
        height:25,
        backgroundColor:'rgba(0,0,0,.4)',
        position:'absolute',
        bottom:0,
        // 改变主轴方向
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between'
    }
});

module.exports = ScrollImage;
