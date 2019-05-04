/**
 * 分页查询
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
                        "                        <a href=\"#\" class=\"img-link\">\n" +
                        "                            <img src=\"http://120.79.251.217:9002/uploads/big/"+ bizFileDTOList[0].fileName + bizFileDTOList[0].fileSuffix +"\"\n" +
                        "                                 alt=\"#\">\n" +
                        "                            <span class=\"mask\"></span>\n" +
                        "                            <span class=\"time\">"+ videoDetailDTO.time +"</span>\n" +
                        "                        </a>\n" +
                        "                        <div class=\"img-info\">\n" +
                        "                            <a href=\"#"+ videoDetailDTO.videoId +"\">"+ videoDetailDTO.videoName +"</a>\n" +
                        "                            <div class=\"btm\">\n" +
                        "                                <div class=\"user\"><i></i>"+ videoDetailDTO.userName +"</div>\n" +
                        "                                <div class=\"online\"><i></i>"+ videoDetailDTO.playNum +"</div>\n" +
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