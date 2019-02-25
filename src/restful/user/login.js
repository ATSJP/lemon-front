layui.use(['form'], function () {
    var form = layui.form;

    //自定义验证规则
    form.verify({
        loginName: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        }
        , password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]

    });

    //监听指定开关
    // form.on('switch(switchTest)', function(data){
    //     layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
    //         offset: '6px'
    //     });
    //     layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    // });

    //监听提交
    form.on('submit(login)', function (data) {
        const sendJson = {
            "uid": "147",
            "sid": "WEB20190225",
            "loginName": data.field.loginName,
            "password": data.field.password
        };

        $.ajax({
            url: 'http://www.lemon.com/u/user/login',
            type: 'POST',
            data: sendJson,
            dataType: 'json',
            beforeSend: function () {
                layer.load(0, {time: 1000});
            },
            success: function (data) {
                layer.closeAll('loading');
                if (data.code === 0) {
                    $.cookie('token', data.data);
                    layer.msg("登陆成功，正在自动跳转");
                    setTimeout(function () {
                        // 刷新当前页面
                        window.parent.location.reload();
                        // (window).attr('location', '${pageContext.request.contextPath}/');
                    }, 1000);
                } else {
                    layer.msg(data.msg);
                }
            },
            error: function () {
                layer.closeAll('loading');
                layer.msg("系统繁忙");
            }
        });

        return false;
    });

});
