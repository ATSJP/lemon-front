$(".comment-submit").click(function () {
    var remarkContext = $(".ipt-txt").val();
    var uid = getCookie("uid");
    var name = getCookie("name");
    if (remarkContext === '' || remarkContext.length > 200) {
        layer.alert("请输入0-200字", {icon: 2});
        return
    }
    $.ajax({
        url: "http://www.lemon.com/a/remark?_method=POST",
        type: "POST",
        data: {
            "remarkContext": remarkContext,
            "videoId": getQueryString("playId"),
            "repeatId": -1,
            "parentId": -1,
            "uid": uid
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                layer.msg(data.msg, {icon: 1});
                var html =
                    "<div class=\"list-item reply-wrap is-top\" data-id=\"\"\n" +
                    "                                     data-index=\"0\">\n" +
                    "                                    <div class=\"con \">\n" +
                    "                                        <div class=\"user\">\n" +
                    "                                            <a data-usercard-mid=\"\" href=\"/www.lemon.com/userInfo.html?uid=" + uid + "\" target=\"_blank\"\n" +
                    "                                            class=\"name vip-red-name\">" + name + "</a>\n" +
                    "                                        </div>\n" +
                    "                                        <p class=\"text\">" + remarkContext + "</p>\n" +
                    "                                        <div class=\"info\">\n" +
                    "                                            <span class=\"time\">刚刚</span>\n" +
                    "                                            <!--<span class=\"reply btn-hover btn-highlight\">回复</span>-->\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n";
                $(".comment-list").append(html);
            } else {
                layer.alert(data.msg);
            }
        },
    })
})