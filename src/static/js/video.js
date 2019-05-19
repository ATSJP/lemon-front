/**
 * 首页用
 */
function ajaxGetIndexVideoRank() {
    /**
     * 播放率
     */
    $.ajax({
        url: "http://www.lemon.com/a/video/getVideoOrderBySortKey/0",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                var videoDTOList = data.videoDTOList;
                var html = "";
                $.each(videoDTOList, function (index, value) {
                    var videoDetailDTO = value.videoDetailDTO;
                    html += " <li class=\"item\">\n" +
                        "                            <a href=\"http://www.lemon.com/v/play.html?playId=" + videoDetailDTO.videoId + "\"><i class=\"n2\">" + (index + 1) + "</i>" + videoDetailDTO.videoName + "</a>\n" +
                        "                        </li>";
                })
                $("#playNumRank").append(html);
            } else {
                layer.msg('系统异常')
            }
        }
    })
    /**
     * 评价数
     */
    $.ajax({
        url: "http://www.lemon.com/a/video/getVideoOrderBySortKey/1",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                var videoDTOList = data.videoDTOList;
                var html = "";
                $.each(videoDTOList, function (index, value) {
                    var videoDetailDTO = value.videoDetailDTO;
                    html += " <li class=\"item\">\n" +
                        "                            <a href=\"http://www.lemon.com/v/play.html?playId=" + videoDetailDTO.videoId + "\"><i class=\"n2\">" + (index + 1) + "</i>" + videoDetailDTO.videoName + "</a>\n" +
                        "                        </li>";
                })
                $("#remarkNumRank").append(html);
            } else {
                layer.msg('系统异常')
            }
        }
    })
}

/**
 * 根据分类，分页查询视频list-首页
 *
 * @param categoryId 分类id
 */
function ajaxGetVideoList(categoryId, pageIndex, view) {
    $.ajax({
        url: "http://www.lemon.com/a/video/getVideoList/" + categoryId + "/" + pageIndex + "/20",
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                var html = "";
                $.each(data.videoDTOList, function (index, value) {
                    var videoDetailDTO = value.videoDetailDTO
                    var bizFileDTOList = value.bizFileDTOList

                    html += "<li class=\"item\">\n" +
                        "                        <a href=\"http://www.lemon.com/v/play.html?playId=" + videoDetailDTO.videoId + "\" target='_blank' class=\"img-link\">\n" +
                        "                            <img src=\"http://120.79.251.217:9002/uploads/big/" + bizFileDTOList[0].fileName + bizFileDTOList[0].fileSuffix + "\"\n" +
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
                $("#" + view).append(html)
            }
        }
    })
}

/**
 * 获取分类list-首页
 */
function ajaxGetCateList() {
    $.ajax({
        url: "http://www.lemon.com/a/category/tree",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var html1 = "";
            var toolbar = "";
            $.each(data.categoryDTOList, function (index, value) {
                var head = "<li class=\"item\"><a href=\"#" + value.categoryId + "\" class=\"link\"><div class=\"num\"><i>0</i></div>" + value.categoryName + "</a>";
                var body = "<ul class=\"nav-item__hover\">";
                var headEnd = "</li>";
                var bodyEnd = "</ul>";
                $.each(value.subCategoryDTOList, function (index, value) {
                    body += "<li><a href=\"#\"+ value.categoryId +\"\"><em>" + value.categoryName + "<i></i></em></a></li>";
                });
                html1 += head + body + bodyEnd + headEnd;
                toolbar += "<a href=\"#\">" + value.categoryName + "</a>";

                // if (value.subCategoryDTOList === null || value.subCategoryDTOList.length === 0) {
                //     // 加载分类下的分页内容
                //     ajaxGetVideoList(value.categoryId, 1);
                // } else {
                //     // 加载该一级分类下默认第一个子集分类下的分页内容
                //     ajaxGetVideoList(value.subCategoryDTOList[0].categoryId, 1);
                // }
            })
            $(".nav-list").append(html1)
            $(".sideBar-list").append(toolbar + "<a href=\"#\"><i></i>排序</a>")
        }
    })
}

/**
 * 广告倒计时
 */
function setTime() {
    $djx = $("#djs");
    var nowT = parseInt($djx.text());
    if (nowT > 0) {
        $djx.text(nowT - 1);
        setTimeout('setTime()', 1000)
    }
}

/**
 * 播放正片
 */
function checkTimeOut(video, pic) {//后置广告倒计时
    var it = setInterval(function () {
        var nowT = parseInt($("#djs").text());
        if (nowT <= 0) {
            newVideo(video, pic)
            clearInterval(it);
            $("#daojs").empty()
            return;
        }
    }, 1000)
}

/**
 * 获取视频详细
 * @param videoId
 */
function ajaxGetVideoInfo(videoId) {
    $.ajax({
        url: "http://www.lemon.com/a/video/get",
        type: "GET",
        data: {
            "videoId": videoId,
            "uid": getCookie("uid")
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                var videoDetailDTO = data.videoDTO.videoDetailDTO;
                var bizFileDTOList = data.videoDTO.bizFileDTOList;
                var categoryDTO = data.videoDTO.categoryDTO;
                var remarkDTO = data.videoDTO.remarkDTO;
                var isUp = data.videoDTO.isUp;
                var isCollect = data.videoDTO.isCollect;

                $(".video-title")[0].title = videoDetailDTO.videoName;
                $(".tit").html(videoDetailDTO.videoName);
                $(".view").html(videoDetailDTO.playNum + "播放 · ");
                $(".dm").html(remarkDTO.length + "弹幕");
                $(".username").html(videoDetailDTO.userName);
                $(".username").attr('href', '//www.lemon.com/userInfo.html?uid=' + videoDetailDTO.userId);

                // 分类
                $("#parentCate").html(categoryDTO.categoryName).attr('href', '//www.lemon.com/v/list.html?cid=' + categoryDTO.categoryId);
                $("#childCate").html(categoryDTO.subCategoryDTOList[0].categoryName).attr('href', '//www.lemon.com/v/list.html?cid=' + categoryDTO.subCategoryDTOList[0].categoryId);

                $("#createTime").html(videoDetailDTO.createTime);
                $(".open").html(videoDetailDTO.videoContext);

                // 视频
                var video = "http://www.lemon.com/video/";
                var pic = "http://120.79.251.217:9002/uploads/big/";
                $.each(bizFileDTOList, function (index, value) {
                    if (value.linkType === 0) {
                        video += value.fileName + value.fileSuffix;
                    }
                    if (value.linkType === 1) {
                        pic += value.fileName + value.fileSuffix;
                    }
                });

                // 播放广告
                newVideo("http://www.lemon.com/video/test.mp4", "http://120.79.251.217:9002/uploads/big/469a8686b7e9091be50f51435f2637c5.jpg");
                setTime()
                checkTimeOut(video, pic)

                // 点赞 收藏
                if (isUp === 0) {
                    $(".van-icon-videodetails_like").css("color", "#505050");
                } else {
                    $(".van-icon-videodetails_like").css("color", "red");
                }
                if (isCollect === 0) {
                    $(".van-icon-videodetails_collec").css("color", "#505050");
                } else {
                    $(".van-icon-videodetails_collec").css("color", "red");
                }

                // 评论
                var htmlComment = "";
                $.each(remarkDTO, function (index, value) {
                    htmlComment +=
                        "                                <div class=\"list-item reply-wrap is-top\" data-id=\"\"\n" +
                        "                                     data-index=\"0\">\n" +
                        "                                    <div class=\"con \">\n" +
                        "                                        <div class=\"user\">\n" +
                        "                                            <a data-usercard-mid=\"\" href=\"/www.lemon.com/userInfo.html?uid=" + value.loginId + "\" target=\"_blank\"\n" +
                        "                                            class=\"name vip-red-name\">" + value.loginName + "</a>\n" +
                        "                                        </div>\n" +
                        "                                        <p class=\"text\">" + value.remarkContext + "</p>\n" +
                        "                                        <div class=\"info\">\n" +
                        "                                            <span class=\"time\">" + value.remarkTime + "</span>\n" +
                        "                                            <!--<span class=\"reply btn-hover btn-highlight\">回复</span>-->\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n";
                    if (value.childRemarkDTOList !== null) {
                        $.each(value.childRemarkDTOList, function (index, value) {
                            htmlComment +=
                                "                                <div class=\"list-item reply-wrap is-top\" data-id=\"\"\n" +
                                "                                     data-index=\"0\">\n" +
                                "                                    <div class=\"con \">\n" +
                                "                                        <div class=\"user\">\n" +
                                "                                            <a data-usercard-mid=\"\" href=\"/www.lemon.com/userInfo.html?uid=" + value.loginId + "\" target=\"_blank\"\n" +
                                "                                            class=\"name vip-red-name\">" + value.loginName + "</a>\n" +
                                "                                        </div>\n" +
                                "                                        <p class=\"text\">" + value.remarkContext + "</p>\n" +
                                "                                        <div class=\"info\">\n" +
                                "                                            <span class=\"time\">" + value.remarkTime + "</span>\n" +
                                "                                            <!--<span class=\"reply btn-hover btn-highlight\">回复</span>-->\n" +
                                "                                        </div>\n" +
                                "                                    </div>\n" +
                                "                                </div>\n";
                        })
                    }

                })
                $(".comment-list").html(htmlComment);

                // 定时弹幕
                var time = 1000;
                // if (remarkDTO !== null) {
                //     if (remarkDTO.length > 5) {
                //         time = 1000;
                //     }
                // }
                setInterval(function () {
                    if (remarkDTO !== null) {
                        $.each(remarkDTO, function (index, value) {
                            newDanmu(value.remarkContext);
                            if (value.childRemarkDTOList !== null) {
                                $.each(value.childRemarkDTOList, function (index, value) {
                                    newDanmu(value.remarkContext);
                                })
                            }
                        })
                    }
                }, time);
            } else {
                layer.msg('系统异常')
            }

        }
    })
}

/**
 * 点赞
 * @param videoId
 */
function ajaxPutUp(videoId) {
    var color = $(".van-icon-videodetails_like").css("color");
    var url = "http://www.lemon.com/a/up?";
    if (color === 'rgb(255, 0, 0)') {
        // 红色
        url += "_method=DELETE";
    } else {
        url += "_method=PUT";
    }
    $.ajax({
        url: url,
        type: "POST",
        data: {
            "videoId": videoId,
            "uid": getCookie("uid")
        },
        dataType: "json",
        beforeSend: function () {
            // layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                if (color === 'rgb(255, 0, 0)') {
                    // 红色
                    $(".van-icon-videodetails_like").css("color", "rgb(80, 80, 80)");
                }
                if (color === 'rgb(80, 80, 80)') {
                    // 灰色
                    $(".van-icon-videodetails_like").css("color", "rgb(255, 0, 0)");
                }
                // layer.msg('操作成功', {offset: ['52px', '1760px']}); /// 右上角
                layer.msg('操作成功', {offset: 't'});
            } else {
                layer.msg(data.msg);
            }
        }
    })
}

/**
 * 收藏
 * @param videoId
 */
function ajaxPutCollect(videoId) {
    var color = $(".van-icon-videodetails_collec").css("color");
    var url = "http://www.lemon.com/a/collect?";
    if (color === 'rgb(255, 0, 0)') {
        // 红色
        url += "_method=DELETE";
    } else {
        url += "_method=PUT";
    }
    $.ajax({
        url: url,
        type: "POST",
        data: {
            "videoId": videoId,
            "uid": getCookie("uid")
        },
        dataType: "json",
        beforeSend: function () {
            // layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                if (color === 'rgb(255, 0, 0)') {
                    // 红色
                    $(".van-icon-videodetails_collec").css("color", "rgb(80, 80, 80)");
                }
                if (color === 'rgb(80, 80, 80)') {
                    // 灰色
                    $(".van-icon-videodetails_collec").css("color", "rgb(255, 0, 0)");
                }
                layer.msg('操作成功', {offset: 't'});
            } else {
                layer.msg(data.msg);
            }
        }
    })
}

/**
 * 上传视频
 */
$(".post").click(function () {
    layer.open({
        title: '文件上传',
        type: 2,
        resize: true,
        area: ['900px', '600px'],
        move: true,
        content: ['http://www.lemon.com/v/upload.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
})