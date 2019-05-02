$("#loginView").click(function () {
    layer.open({
        title: '登录',
        type: 2,
        resize: false,
        area: ['400px', '260px'],
        resize: false,
        move: false,
        content: ['http://www.lemon.com/login.html', 'no'],
        yes: function (index, layero) {
//                layero.find('#draftClue').submit();
        }
    })
})

function setToken(data) {
    var t = new Date(+(new Date()) + 1000 * 120);
    document.cookie = 'uid=' + data.uid + ';expires=${t.toGMTString()};'
    document.cookie = 'token=' + data.token + ';expires=${t.toGMTString()};'
    // localStorage.setItem('uid', data.uid);
    // localStorage.setItem('token', data.token);
    // console.log(localStorage.key(0)); // order
    // console.log(localStorage.getItem('token')) // a109
    // localStorage.removeItem('order');
    // localStorage.clear();
}