$(function ($) {
    var miFn={
        int:function () {
            miFn.routerFn();
            miFn.scrollFn();
        },
        routerFn:function () {
            var router = new Router({
                container: '#container'
            });
            router.push({
                url: '/index',
                className: 'home',
                render: function (callback){
                    $("#container").html("");
                    huiju.common.ajaxGet('data.json','',function (data) {
                        var html=template('mi-index',data.data);
                        callback(null,html);
                        //console.debug(data);
                    })
                },
                bind:function () {
                    $(".mi-tabbar").show();
                    $(".swiper-container").swiper({
                        loop: true,
                        autoplay: 3000
                    });
                    var load=false;
                    var _navTop=$(".mi-Search").height();
                    $(window).scroll(function () {
                        if (!load){
                            HuiJuCommon.prototype.hideloading();
                            huiju.common.ajaxGet('data1.json','',function (data) {
                                var html=template('mi-index',data.data);
                                $(".home").append(html);
                                $(".calssify-box").hide();
                                $(".mi-nav-classify").hide();
                            });
                            load=true;
                        }
                        var scrollTop=$("body").scrollTop();
                        /*  console.debug(_navTop,scrollTop);*/
                        if (_navTop<=scrollTop){
                            $(".mi-Search").css("background-color","rgb(229, 131, 53)");
                        }else{
                            $(".mi-Search").css("background-color","");
                        }
                    });
                    $(".mi-tabbar >a").removeClass("weui-bar__item--on");
                    $(".mi-tabbar >a").eq(0).addClass("weui-bar__item--on");
                    $(".mi-tabbar >a").click(function () {
                        $(this).addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
                    });
                }
            }).push({
                url: '/product/category',
                className: 'category',
                render: function (callback){
                    $("#container").html("");
                    huiju.common.ajaxGet('package.json','',function (data) {
                        var html=template('mi-index',{sections:data.data});
                        callback(null,html);
                    })
                },
                bind:function () {
                    $(".mi-tabbar").show();
                    var _navTop=$(".mi-nav-classify").offset().top;
                    $(window).scroll(function () {
                        var scrollTop=$("body").scrollTop();
                        /*  console.debug(_navTop,scrollTop);*/
                        if (_navTop<=scrollTop){
                            $(".mi-nav-classify").addClass("fixed");
                        }else{
                            $(".mi-nav-classify").removeClass("fixed");
                        }
                    })
                    $(".mi-tabbar >a").removeClass("weui-bar__item--on");
                    $(".mi-tabbar >a").eq(1).addClass("weui-bar__item--on");
                    $(".mi-tabbar >a").click(function () {
                        $(this).addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
                    });
                }
            }).push({
                url: '/cart/index',
                className: 'category',
                render: function (callback){
                    $("#container").html("");
                    huiju.common.ajaxGet('recommendBlank.json','',function (data) {
                        var html=template('cartContent',data.data);
                        callback(null,html);
                    })
                },
                bind:function () {
                    $(".mi-tabbar").show();
                    $(".mi-tabbar >a").removeClass("weui-bar__item--on");
                    $(".mi-tabbar >a").eq(2).addClass("weui-bar__item--on");
                    $(".mi-tabbar >a").click(function () {
                        $(this).addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
                    });
                }
            }).push({
                url: '/user/index',
                className: '',
                render: function (){
                    var html=template('miUser',{});
                    document.getElementById('container').innerHTML = html;
                },
                bind:function () {
                    $(".mi-tabbar").show();
                    $(".mi-tabbar >a").removeClass("weui-bar__item--on");
                    $(".mi-tabbar >a").eq(3).addClass("weui-bar__item--on");
                    $(".mi-tabbar >a").click(function () {
                        $(this).addClass("weui-bar__item--on").siblings().removeClass("weui-bar__item--on");
                    });
                }
            }).push({
                url: '/search/index',
                className: 'search',
                render: function (callback){
                    huiju.common.ajaxGet('search.json','',function (data) {
                        var html=template('searchContent',data.data);
                        callback(null,html);
                    })
                },
                bind:function () {
                    $(".s-box").focus();
                    $(".mi-tabbar").hide();
                }
            }).setDefault('/index').init();
        },
        //通知滚动效果
        scrollFn:function () {

        }
    }
    miFn.int();
})