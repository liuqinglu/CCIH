/**
 * Created by lql on 2017\ 04\ 13 23:57.
 */
'use strict';
var autoPlay = function (parentID, childTag) {
    var pictures = document.getElementById(parentID);
    var items = pictures.getElementsByTagName(childTag);
    var len = items.length;
    var index = 0;
    showItem();
    // 显示一张图片
    function showItem() {
        // 首先将所有图片透明度设为0
        hideItems();
        items[index].style.opacity = 1;
        // 将要显示的透明度改变让其显示
        if (index > len - 2) {
            index = 0;
        } else {
            index++;
        }
        // 在这里用setTimeout模拟setInterval的效果
        setTimeout(showItem, 3000);
    }

    // 将所有图片透明度设为0
    function hideItems() {
        for (var i = 0; i < len; i++) {
            items[i].style.opacity = 0;
        }
    }
};