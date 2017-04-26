var huiju = {};

huiju.common = new HuiJuCommon();

function HuiJuCommon() {};
/*******************************************************************************
 * 获取参数值
 *
 * @param name 参数名称
 * @returns 参数值
 */
HuiJuCommon.prototype.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
};
/********************* 页面全局变量 ***********************/
/* 生成loading */
HuiJuCommon.prototype.innerloading = function (msg) {
    if (!msg) {
        msg = '正在加载中...';
    }
    $("body").append('<div class="win-mask">\
                          <div class="win-load-box">\
                              <div class="loading-box">\
                                  <div class="loadings"></div>&nbsp;&nbsp;' + msg + '\
                              </div>\
                          </div>\
                      </div>');
};

/* 显示loading */
HuiJuCommon.prototype.showloading = function (msg) {
    var hadMask = $("body div").hasClass(".win-mask");
    if (hadMask) {
        $(".win-mask").show();
    } else {
        HuiJuCommon.prototype.innerloading(msg);
    }
};

/* 隐藏loading */
HuiJuCommon.prototype.hideloading = function () {
    $(".win-mask").remove();
};
HuiJuCommon.prototype.errBackFn = function (xhr, type) {
    HuiJuCommon.prototype.showloading("网络错误，请稍候再试。");
    setTimeout(function () {
        HuiJuCommon.prototype.hideloading();
    }, 2000);
}
/* getAjax */
HuiJuCommon.prototype.ajaxGet = function (apiUrl, param, callBackFunction) {
    HuiJuCommon.prototype.showloading();
    $.ajax({
        type: 'GET',
        url: apiUrl,
        data: param, //暂时get方法 参数直接加在地址后面
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        /*
         timeout: 300,
         context: $('body'),
         */
        success: function (data) {
            HuiJuCommon.prototype.hideloading();
            callBackFunction(data);
        },
        error: function (xhr, type) {
            HuiJuCommon.prototype.hideloading();
            HuiJuCommon.prototype.errBackFn(xhr, type);
        }
    })
}

/* postAjax */
HuiJuCommon.prototype.ajaxPost = function (apiUrl, param, callBackFunction) {
    HuiJuCommon.prototype.showloading();
    $.ajax({
        type: 'POST',
        url: apiUrl,
        data: param,
        contentType: 'application/json',
        success: function (data) {
            HuiJuCommon.prototype.hideloading();
            callBackFunction(data);
        },
        error: function (xhr, type) {
            HuiJuCommon.prototype.hideloading();
            HuiJuCommon.prototype.errBackFn(xhr, type);
        }
    })
}
var errorCode = {
    "0": "操作成功",
    "99": "操作失败",
    "1": "参数不对",
    "2": "非法请求",
    "3": "必填字段不能为空",
    "101": "用户名错误",
    "102": "密码错误",
    "103": "用户不存在",
    "104": "用户已存在",
    "105": "用户已登录",
    "106": "用户未登录",
    "107": "没有令牌",
    "108": "没有手机号码",
    "109": "验证码无效",
    "110": "发送短信失败",
    "111": "检查验证码失败",
    "112": "手机号长度错误",
    "113": "用户名长度错误",
    "114": "密码必须大于6小于20个字符",
    "115": "手机号错误",
    "116": "上传失败",
    "117": "用户名或密码错误",
    "118": "用户名不能是纯数字",
    "119": "两次输入的密码不一致",
    "120": "此手机号码已在枫车平台注册，请直接登陆",
    "201": "活动不存在",
    "202": "活动订单提交失败",
    "203": "活动订单不存在",
    "204": "活动订单支付失败",
    "205": "很抱歉，无法使用洗车券。您当天已使用过1次洗车券，须隔天才能再次使用",
    "206": "优惠券不能用于此次交易，请联系枫车客服",
    "207": "您并没有可用的洗车券",
    "208": "商家未参与优惠活动",
    "301": "广告不存在",
    "302": "图片资源不存在",
    "401": "用户已报名该活动",

    "501": "需要输入参数",

    "601": "红包领取成功",
    "602": "红包领取失败",

    "701": "店铺没有正常营业",
    "702": "没有可管理的店铺",
    "703": "没有权限操作店铺",
    "704": "必须先设置银行信息，才能提现",
    "705": "请先设置提现密码，才可以提现",

    "801": "订单无效",
    "802": "订单未完成",
    "803": "订单已评价",
    "804": "订单确认收货15天后，无法评价",

    "1001": "支付代码无效",
    "1002": "订单已付款",
    "1003": "订单类型无效",
    "1004": "订单ID无效",
    "1005": "生成预支付订单失败，请重试"
}