$("#loginView").click(function () {
    openLoginWindow();
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
            beforeSend: function () {
                layer.load(3, {time: 1 * 1000});
            },
            success: function (data) {
                //关闭加载层
                layer.closeAll('loading');
                if (data.code === 0) {
                    removeToken('退出成功');
                    initLoginUser();
                }
                if (data.code === 4) {
                    removeToken('由于长时间未操作，您已退出');
                    initLoginUser();
                }
            }
        })
        layer.close(index);
    });
})

function openLoginWindow() {
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
}

function removeToken(msg) {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        layui.use('layer', function () {
            var layer = layui.layer;
            if ('由于长时间未操作，你已退出' === msg) {
                layer.confirm('由于长时间未操作,你已处于退出,是否去登陆?', {icon: 5, title:'安全提示'}, function(index){
                    openLoginWindow();
                    layer.close(index);
                });
            } else {
                layer.msg(msg);
            }
        });
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

function checkStatus() {
    // layui.use('layer', function () {
        $.ajax({
            url: "http://www.lemon.com/u/user/checkStatus",
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                layer.load(3, {time: 1 * 1000});
            },
            success: function (data) {
                if (data.code === 0) {
                    initLoginUser();
                } else {
                    removeToken('由于长时间未操作，你已退出');
                    initLoginUser();
                }
                //关闭加载层
                layer.closeAll('loading');
            }
        })
    // });
}