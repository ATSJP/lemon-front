var name = getCookie("name");
if (name !== undefined && name !== '') {
    $("#h-name").text(name);
} else {
    $("#h-name").text("未登录");
}