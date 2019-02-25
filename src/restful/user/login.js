layui.use(['form', 'layedit', 'laydate'], function () {
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
        var json = data.field

        var pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        var sendJson;
        if (!pattern.test(json.userName)) {
            sendJson = {
                "userName": json.userName,
                "userPassword": json.userPassword
            }
        } else {
            sendJson = {
                "userPhone": json.userName,
                "userPassword": json.userPassword
            }
        }

        $.ajax({
            url: '${pageContext.request.contextPath}/user/login',
            type: 'POST',
            data: sendJson,
            dataType: 'json',
            beforeSend: function () {
                layer.load(0, {time: 1000});
            },
            success: function (data) {
                layer.closeAll('loading')
                if (data.success) {
                    layer.msg("登陆成功，正在自动跳转");
                    setTimeout(function () {
                        // 刷新当前页面
                        window.parent.location.reload();
                        // (window).attr('location', '${pageContext.request.contextPath}/');
                    }, 1000);
                } else {
                    data.code == '1' ? layer.msg("你的账号已被停用，如有问题请联系管理员") : layer.msg(data.msg);

                }
            },
            error: function () {
                layer.closeAll('loading')
                layer.msg("系统繁忙");
            }
        });

        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});
