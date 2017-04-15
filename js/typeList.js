/**
 * Created by lql on 2017/4/6 0006.
 */

var site_url = "http://120.77.39.182:5001/api/";//API公用地址
var responseObj = null;

/**
 * 获取当前时间(如:2017-04-18 00:00)
 */
function current_time() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
    var clock = year + "-";
    if (month < 10) {
        clock += "0";
    }
    clock += month + "-";
    if (day < 10) {
        clock += "0";
    }
    clock += day + " ";
    if (hh < 10) {
        clock += "0";
    }
    clock += hh + ":";
    if (mm < 10) {
        clock += '0';
    }
    clock += mm + ":";
    if (ss < 10) {
        clock += '0';
    }
    clock += ss;
    return (clock);
}

/**
 * 查询分类列表
 */
function typeList() {
    $.ajax({
        type: 'post',
        timeout: 1000, //超时时间设置，单位毫秒
        url: site_url + 'goodstype.select.all',//查询--类别信息
        cache: false,
        async: true,
        dataType: 'json',
        data: '{"RequestBaseHeader":{"SeesionKey":"null","TimeSpan":"' + current_time() + '"}}',
        success: function (data) {
            responseObj = eval(data);
            var json = responseObj.TB_GoodsTypeList;
            $('.list-group li').remove();//清空左侧分类列表
            if (responseObj.IsError === false) {
                $.each(json, function (idx, item) {
                    var li = '<li class="list-group-item" data-typeid=' + item.GoodsTypeID + ' onclick="typePicture(' + item.GoodsTypeID + ')">' + item.GoodsTypeName + '</li>';
                    $('.list-group').append(li);//分类列表
                });
                $('.list-group .list-group-item').first().addClass("listColor");//查询分类列表后，给分类列表中的第一个添加默认选中样式
                var TypeID = $('.list-group .list-group-item').first().data('typeid');
                typePicture(TypeID);//默认查询第一个商品类型的商品信息
            }
        }
    });
}
typeList();//查询分类列表


/**
 * 为分类选中项添加样式，并调用typePicture();
 */
$(".list-group").delegate("li", "click", function () {
    $(this).addClass("listColor").siblings().removeClass("listColor");
    typePicture($(this).data('typeid'));
});

/**
 * 查询--类型对应商品图片
 */
function typePicture(TypeID) {
    $.ajax({
        type: 'post',
        url: site_url + 'goodstype.type.picture.select',//查询--类型对应商品图片
        cache: false,
        async: false,
        dataType: 'json',
        data: '{"RequestBaseHeader":{"SeesionKey":"null","TimeSpan":"' + current_time() + '"}, "GoodsTypeID": "' + TypeID + '"}',
        success: function (data) {
            responseObj = eval(data);
            var json = responseObj.TB_TypePictureList;
            //清空右侧轮播图和右侧商品列表
            $('.poster-list li,.img_list li').remove();
            if (responseObj.IsError === false) {
                $.each(json, function (idx, item) {
                    //产品轮播图
                    var li = '<li class="poster-item"><a href="#"><img src="' + item.ImgPath + '" width="100%" max-height="300px"></a></li>';
                    $('.poster-list').append(li);
                    //产品列表
                    var li = '<li><div><img src="' + item.ImgPath + '" alt=""></div><p>' + item.ImgName + '</p></li>';
                    $('.img_list').append(li);
                });

                // 轮播图初始化
                $(".B_Demo").PicCarousel({
                    "width": 900,		 //幻灯片的宽度
                    "height": 300,		 //幻灯片的高度
                    "posterWidth": 520,	 //幻灯片第一帧的宽度
                    "posterHeight": 300, //幻灯片第一张的高度
                    "scale": 0.9,		 //记录显示比例关系
                    "speed": 1500,		 //记录幻灯片滚动速度
                    "autoPlay": true,	 //是否开启自动播放
                    "delay": 4000,		 //自动播放间隔
                    "verticalAlign": "middle"	//图片对齐位置
                });
            }
        }
    });
}

/**
 * 每隔5分钟查询一次类型对应商品图片
 */
setTimeout(function () {
    typePicture($('.listColor').data('typeid'));
}, 300000);
