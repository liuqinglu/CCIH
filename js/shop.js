/**
 * Created by lql on 2017/4/13 0013.
 */
/**
 * 获取url地址栏参数
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
}
var GalleryCode = GetQueryString("GalleryCode");
// alert(GalleryCode);
// var GalleryCode = '90193027';

/**
 * 获取当前时间(如:2017-12-12 12:12)
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

var responseObj = null;
var site_url = "http://120.77.39.182:5001/api/";//API公用地址


/**
 * 查询展厅信息
 */
function galleryMessage(GalleryCode) {
    $.ajax({
        type: 'post',
        url: site_url + 'gallery.select.bygallerycode',//查询---根据展厅编号查询展厅信息（展厅首页信息展示）
        cache: false,
        async: true,
        dataType: 'json',
        data: '{"RequestBaseHeader":{"SeesionKey":"null","TimeSpan":"' + current_time() + '"},"GalleryCode":"' + GalleryCode + '"}',
        success: function (data) {
            responseObj = eval(data);
            var json_Logo = responseObj.TBGalleryViewLogo;//logo
            var json_Main = responseObj.TBGalleryViewMain;//主图
            var json_FuSmall = responseObj.TBGalleryViewFuSmall;//幅图-小
            var json_FuBig = responseObj.TBGalleryViewFuBig;//幅图-大

            $('.bxslider>li').remove();//清空幅图-小
            $('#bigPictures>li').remove();//清空幅图-大

            if (responseObj.IsError === false) {
                /**
                 * logo
                 */
                $.each(json_Logo, function (idx, item) {
                    $('.logo').html('<img src="' + item.ImgPath + '">');
                });

                /**
                 * 展厅主题和介绍
                 */
                $('.copywriting').html('<div class="copywriting_title">' + responseObj.GalleryTheme + '</div><p>' + responseObj.GalleryMessage + '</p>');

                /**
                 * 主图
                 */
                $.each(json_Main, function (idx, item) {
                    var img_main = '<img src="' + item.ImgPath + '">';
                    $('.left_img').html(img_main);
                });

                /**
                 * 幅图-小
                 */
                $.each(json_FuSmall, function (idx, item) {
                    var li = '<li><img src="' + item.ImgPath + '"/><span>' + item.ImgName + '</span></li>';
                    $('.bxslider').append(li);
                });

                /**
                 * 幅图-大
                 */
                $.each(json_FuBig, function (idx, item) {
                    var li = '<li><img src="' + item.ImgPath + '" alt=""><span>' + item.ImgName + '</span></li>';
                    $('#bigPictures').append(li);
                });
            }
        }
    });
}

galleryMessage(GalleryCode);
