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
                        "                            <a href=\"http://www.lemon.com/play.html?playId=" + videoDetailDTO.videoId + "\"><i class=\"n2\">" + (index + 1) + "</i>" + videoDetailDTO.videoName + "</a>\n" +
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
                        "                            <a href=\"http://www.lemon.com/play.html?playId=" + videoDetailDTO.videoId + "\"><i class=\"n2\">" + (index + 1) + "</i>" + videoDetailDTO.videoName + "</a>\n" +
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
 * 根据分类 分页查询视频list
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
                        "                        <a href=\"http://www.lemon.com/play.html?playId=" + videoDetailDTO.videoId + "\" target='_blank' class=\"img-link\">\n" +
                        "                            <img src=\"http://120.79.251.217:9002/uploads/big/" + bizFileDTOList[0].fileName + bizFileDTOList[0].fileSuffix + "\"\n" +
                        "                                 alt=\"#\">\n" +
                        "                            <span class=\"mask\"></span>\n" +
                        "                            <span class=\"time\">" + videoDetailDTO.time + "</span>\n" +
                        "                        </a>\n" +
                        "                        <div class=\"img-info\">\n" +
                        "                            <a href=\"http://www.lemon.com/play.html?playId=" + videoDetailDTO.videoId + "\">" + videoDetailDTO.videoName + "</a>\n" +
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

function ajaxGetVideoInfo(videoId) {
    $.ajax({
        url: "http://www.lemon.com/a/video/get/" + videoId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                var videoDetailDTO = data.videoDTO.videoDetailDTO;
                var bizFileDTOList = data.videoDTO.bizFileDTOList;
                var categoryDTO = data.videoDTO.categoryDTO;
                var remarkDTO = data.videoDTO.remarkDTO;

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

                // 评论
                // newVideo("http://www.91jiexi.cn/test1.mp4");
            } else {
                layer.msg('系统异常')
            }

        }
    })
}

function ajaxPutUp(videoId) {
    $.ajax({
        url: "http://www.lemon.com/a/up?_method=PUT",
        type: "POST",
        data: {
            "videoId": videoId,
            "uid": getCookie("uid")
        },
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                $(".van-icon-videodetails_like").css("color", "red").attr('disabled',true);
                layer.msg("谢谢");
            } else {
                layer.msg(data.msg);
            }
        }
    })
}

function ajaxPutCollect(videoId) {
    $.ajax({
        url: "http://www.lemon.com/a/collect?_method=PUT",
        type: "POST",
        data: {
            "videoId": videoId,
            "uid": getCookie("uid")
        },
        dataType: "json",
        beforeSend: function () {
            layer.load(3, {time: 1 * 1000});
        },
        success: function (data) {
            if (data.code === 0) {
                $(".van-icon-videodetails_collec").css("color", "red").attr('disabled', true);
                layer.msg("谢谢");
            } else {
                layer.msg(data.msg);
            }
        }
    })
}
