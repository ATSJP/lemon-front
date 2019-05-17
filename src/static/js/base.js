function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
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


$(".post").click(function () {
    layer.open({
        title: '文件上传',
        type: 2,
        resize: true,
        area: ['400px', '280px'],
        move: true,
        content: ['http://www.lemon.com/v/upload.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
})