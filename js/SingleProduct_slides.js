/**
 * Created by lql on 2017/4/5 0005.
 */

//滚动图片对象
var srcollImages = {
    //将第一个li插在最后一个ul之后
    firstInsertAfterLast: function () {
        $("ul li:first").insertAfter($("ul li:last"));
    }
};
$(function () {
    //开启定时器
    var timerHandl = timerScroll();
    //鼠标悬停在li和离开li的处理,单击li后的处理
    $("ul li").hover(function () {
        //停止定时器
        clearInterval(timerHandl);
    }, function () {
        //保持句柄
        timerHandl = timerScroll();
    });
});
/*
 定时器开始，图片循环滚动
 timerHandl：定时器句柄，用来控制开启和停止*/
function timerScroll() {
    var timerHandl = setInterval(function () {
        //将第一个li插入最后一个li后面
        srcollImages.firstInsertAfterLast();
    }, 3000);
    return timerHandl;
}
