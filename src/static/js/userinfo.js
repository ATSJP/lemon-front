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

function ajaxGetUserVideo(pageIndex) {
    $.ajax({
        url: "http://www.lemon.com/a/video/getVideoListByLoginId/" + pageIndex + "/20",
        type: "GET",
        data: {
            "uid": getCookie("uid")
        },
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                var html = "";
                if (data.videoDTOList === "") {
                    $(".sec-empty-hint").show();
                    return
                }
                $.each(data.videoDTOList, function (index, value) {
                    var videoDetailDTO = value.videoDetailDTO
                    var picFile;
                    $.each(value.bizFileDTOList, function (index, value) {
                        if (value.linkType === 1) {
                            picFile = value;
                        }
                    })
                    html += "<li class=\"item\">\n" +
                        "                        <a href=\"http://www.lemon.com/v/play.html?playId=" + videoDetailDTO.videoId + "\" target='_blank' class=\"img-link\">\n" +
                        "                            <img src=\"http://www.lemon.com/image/" + picFile.fileName + picFile.fileSuffix + "\"\n" +
                        "                                 alt=\"#\">\n" +
                        "                            <span class=\"mask\"></span>\n" +
                        "                            <span class=\"time\">" + videoDetailDTO.time + "</span>\n" +
                        "                        </a>\n" +
                        "                        <div class=\"img-info\">\n" +
                        "                            <a href=\"http://www.lemon.com/v/play.html?playId=" + videoDetailDTO.videoId + "\">" + videoDetailDTO.videoName + "</a>\n" +
                        "                            <div class=\"btm\">\n" +
                        "                                <div class=\"user\"><i></i>" + videoDetailDTO.userName + "</div>\n" +
                        "                                <div class=\"online\"><i></i>" + videoDetailDTO.playNum + "</div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </li>";
                })
                $("#videoList").html(html)
            }
        }
    })
}