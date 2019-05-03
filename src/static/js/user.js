initLoginUser();

$("#loginView").click(function () {
    layer.open({
        title: '登录',
        type: 2,
        resize: false,
        area: ['400px', '260px'],
        resize: false,
        move: false,
        content: ['http://www.lemon.com/login.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
})

$("#registerView").click(function () {
    layer.open({
        title: '注册',
        type: 2,
        resize: false,
        area: ['400px', '400px'],
        resize: false,
        move: false,
        content: ['http://www.lemon.com/register.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
})

$("#loginOut").click(function () {
    layer.confirm('确定退出登陆吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            url: "http://www.lemon.com/u/user/logout?_method=DELETE",
            type: "POST",
            dataType: "json",
            before: function () {
                layui.loading()
            },
            success: function (data) {
                if (data.code === 0) {
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('退出成功');
                    });
                    removeToken();
                    initLoginUser();
                }
            }
        })
        layer.close(index);
    });
})

function removeToken() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

function setToken(data) {
    var t = new Date(+(new Date()) + 1000 * 120);
    document.cookie = 'uid=' + data.uid + ';expires=${t.toGMTString()};'
    document.cookie = 'token=' + data.token + ';expires=${t.toGMTString()};'
    document.cookie = 'sid=API_ALL;expires=${t.toGMTString()};'
    document.cookie = 'name=' + data.loginInfoVo.loginName + ';expires=${t.toGMTString()};'
}

function initLoginUser() {
    var name = getCookie('name');
    if (name !== undefined && name !== '') {
        $("#isLogin").text(name).show();
        $("#loginOut").show();
        $("#loginView").hide();
        $("#registerView").hide();
    } else {
        $("#isLogin").hide();
        $("#loginOut").hide();
        $("#loginView").show();
        $("#registerView").show();
    }
}

function getCookie(name) {
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    // 遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return "";
}