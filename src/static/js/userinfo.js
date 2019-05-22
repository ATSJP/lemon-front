function initLoginUserForCenter(name) {
    if (name !== undefined && name !== '') {
        $("#isLogin").text(name).show();
        $("#h-name").text(name);
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

function ajaxGetUserVideo(pageIndex, uid) {
    $.ajax({
        url: "http://www.lemon.com/a/video/getVideoListByLoginId/" + pageIndex + "/8",
        type: "GET",
        data: {
            "uid": uid
        },
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                var html = "";
                if (data.videoDTOList.length === 0) {
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

function ajaxGetCollectVideo(pageIndex, uid) {
    $.ajax({
        url: "http://www.lemon.com/a/video/getCollectVideoListByLoginId/" + pageIndex + "/8",
        type: "GET",
        data: {
            "uid": uid
        },
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                var html = "";
                if (data.videoDTOList.length === 0) {
                    $(".sec-empty-hint").show();
                    return
                }
                $(".n-num").text(data.videoDTOList.length);

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
                $("#videoList2").html(html)
            }
        }
    })
}

function openSetting() {
    layer.open({
        title: '修改个人信息',
        type: 2,
        resize: true,
        area: ['800px', '600px'],
        move: true,
        content: ['http://www.lemon.com/user/setting.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
}