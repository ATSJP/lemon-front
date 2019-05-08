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
    }
}