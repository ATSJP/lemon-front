var name = getCookie("name");
if (name !== undefined && name !== '') {
    $("#h-name").text(name);
} else {
    $("#h-name").text("未登录");
}

function initLoginUserForCenter() {
    var name = getCookie('name');
    if (name !== undefined && name !== '') {
        $("#isLogin").text(name).show();
        $("#loginOut").show();
    } else {
        $("#isLogin").hide();
        $("#loginOut").hide();
        layer.open({
            content: '请前往首页进行登陆',
            closeBtn: 0,
            yes: function (index, layero) {
                //do something
                layer.close(index); //如果设定了yes回调，需进行手工关闭
                window.location.href = "http://www.lemon.com";
            }
        });
    }
}