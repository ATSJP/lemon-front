//qq好友分享
function qqFriend(urlFrom, title, context, pic) {
    var p = {
        /*获取URL，可加上来自分享到QQ标识，方便统计*/
        url: urlFrom,
        desc: '',
        /*分享标题(可选)*/
        title: title,
        /*分享摘要(可选)*/
        summary: context,
        /*分享图片(可选)*/
        pics: pic,
        /*视频地址(可选)*/
        flash: urlFrom,
        /*分享来源(可选) 如：QQ分享*/
        site: '',
        style: '201',
        width: 32,
        height: 32
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    var url = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
    window.open(url);
}

function qqZone(urlFrom, title, context, pic) {
    var p = {
        url: urlFrom,
        showcount: '1',    /*是否显示分享总数,显示：'1'，不显示：'0' */
        desc: '',        /*默认分享理由(可选)*/
        summary: context,   /*分享摘要(可选)*/
        title: title,    /*分享标题(可选)*/
        site: '',   /*分享来源 如：腾讯网(可选)*/
        pics: pic,
        style: '203',
        width: 98,
        height: 22
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&');
    window.open(url);
}

function sinaWeiBo(urlFrom, title, context, pic) {
    var p = {
        // 表示是否显示当前页面被分享数量(1 显示)(可选， 允许为空)
        count: '1',
        //将页面地址转成短域名， 并显示在内容文字后面。(可选， 允许为空)
        url: urlFrom,
        //用于发布微博的来源显示， 为空则分享的内容来源会显示来自互联网。(可选， 允许为空)
        appkey: '',
        //分享时所示的文字内容， 为空则自动抓取分享页面的title值(可选， 允许为空)
        title: title,
        //自定义图片地址， 作为微博配图(可选， 允许为空)
        pic: pic,
        //转发时会 @相关的微博账号(可选， 允许为空)
        ralateUid: '',
        //语言设置(zh_cn | zh_tw)(可选)
        language: 'zh_cn'
    };

    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    var url = "http://service.weibo.com/share/share.php?" + s.join('&');
    window.open(url);
}


