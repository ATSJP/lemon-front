var videoObject = {
    //playerID:'ckplayer01',// 播放器ID，第一个字符不能是数字，用来在使用多个播放器时监听到的函数将在所有参数最后添加一个参数用来获取播放器的内容
    container: '#video', // 容器的ID或className
    variable: 'player', // 播放函数名称
    loaded: 'loadedHandler', // 当播放器加载后执行的函数
    loop: true, // 播放结束是否循环播放
    //autoplay: true, // 是否自动播放
    //duration: 500, // 设置视频总时间
    cktrack: '', // 字幕文件
    poster: '', // 封面图片
    preview: { // 预览图片
        file: ['http://120.79.251.217:9002/uploads/big/1c59de005b565e8d57dd00510314dd5d.png', 'http://120.79.251.217:9002/uploads/big/1c59de005b565e8d57dd00510314dd5d.png'],
        scale: 2
    },
    config: '', // 指定配置函数
    debug: true, // 是否开启调试模式
    //flashplayer: true, // 强制使用flashplayer
    drag: 'start', // 拖动的属性
    seek: 0, // 默认跳转的时间
    //playbackrate:1,// 默认速度的编号，只对html5有效,设置成-1则不显示倍速
    //advertisements:'website:ad.json',
    //front:'frontFun',// 上一集的操作函数
    //next:'nextFun',// 下一集的操作函数
    //广告部分开始
    adfront: 'http://www.ckplayer.com/yytf/swf/front001.swf,http://www.ckplayer.com/yytf/swf/front002.swf', // 前置广告
    adfronttime: '15,15',
    adfrontlink: '',
    adpause: 'http://www.ckplayer.com/yytf/swf/pause001.swf,http://www.ckplayer.com/yytf/swf/pause002.swf',
    adpausetime: '5,5',
    adpauselink: '',
    adinsert: 'http://www.ckplayer.com/yytf/swf/insert001.swf,http://www.ckplayer.com/yytf/swf/insert002.swf',
    adinserttime: '10,10',
    adinsertlink: '',
    inserttime: '10,80',
    adend: 'http://www.ckplayer.com/yytf/swf/end001.swf,http://www.ckplayer.com/yytf/swf/end002.swf',
    adendtime: '15,15',
    adendlink: '',
    // 广告部分结束
    promptSpot: [ // 提示点
        {
            words: '会员充值免广告',
            time: 30
        },
        {
            words: '会员充值免广告',
            time: 150
        }
    ],
    //mobileCkControls:true,// 是否在移动端（包括ios）环境中显示控制栏
    //live:true,// 是否是直播视频，true=直播，false=点播
    video: [
        ['http://www.lemon.com/video/test1.mp4', 'video/mp4', '标清', 0],
        ['http://www.lemon.com/video/test1.mp4', 'video/mp4', '高清', 0],
        ['http://www.lemon.com/video/test1.mp4', 'video/mp4', '超清', 0]
    ]
};
var player = new ckplayer(videoObject);

function loadedHandler() {
    player.addListener('error', errorHandler); //监听视频加载出错
    // player.addListener('loadedmetadata', loadedMetaDataHandler); //监听元数据
    // player.addListener('duration', durationHandler); //监听播放时间
    // player.addListener('time', timeHandler); //监听播放时间
    player.addListener('play', playHandler); //监听暂停播放
    player.addListener('pause', pauseHandler); //监听暂停播放
    // player.addListener('buffer', bufferHandler); //监听缓冲状态
    // player.addListener('seek', seekHandler); //监听跳转播放完成
    // player.addListener('seekTime', seekTimeHandler); //监听跳转播放完成
    player.addListener('volume', volumeChangeHandler); //监听音量改变
    player.addListener('full', fullHandler); //监听全屏/非全屏切换
    // player.addListener('ended', endedHandler); //监听播放结束
    // player.addListener('mouse', mouseHandler); //监听鼠标坐标
    // player.addListener('frontAd', frontAdHandler); //监听前置广告的动作
    // player.addListener('wheel', wheelHandler); //监听视频放大缩小
    // player.addListener('controlBar', controlBarHandler); //监听控制栏显示隐藏事件
    // player.addListener('clickEvent', clickEventHandler); //监听点击事件
    // player.addListener('definitionChange', definitionChangeHandler); //监听清晰度切换事件
    // player.addListener('speed', speedHandler); //监听加载速度
}

function errorHandler() {
    changeText('.playerstate', '状态：视频加载错误，停止执行其它动作，等待其它操作');
}

function loadedMetaDataHandler() {
    var metaData = player.getMetaDate();
    //console.log(metaData)
    var html = ''
    //console.log(metaData);
    if(parseInt(metaData['videoWidth']) > 0) {
        changeText('.playerstate', '状态：获取到元数据信息，如果数据错误，可以使用延迟获取');
        html += '总时间：' + metaData['duration'] + '秒，';
        html += '音量：' + metaData['volume'] + '（范围0-1），';
        html += '播放器的宽度：' + metaData['width'] + 'px，';
        html += '播放器的高度：' + metaData['height'] + 'px，';
        html += '视频宽度：' + metaData['videoWidth'] + 'px，';
        html += '视频高度：' + metaData['videoHeight'] + 'px，';
        html += '视频原始宽度：' + metaData['streamWidth'] + 'px，';
        html += '视频原始高度：' + metaData['streamHeight'] + 'px，';
        html += '是否暂停状态：' + metaData['paused'];
    } else {
        changeText('.playerstate', '状态：未正确获取到元数据信息');
        html = '没有获取到元数据';
    }
    changeText('.metadata', html);
}

function volumeChangeHandler(vol) {
    changeText('.volumechangestate', '当前音量：' + vol);
}

function fullHandler(b) {
    if(b) {
        html = ' 全屏';
    } else {
        html = ' 否';
    }
    changeText('.fullstate', getHtml('.fullstate') + html);
}

function playHandler() {
    //player.animateResume();//继续播放所有弹幕
    changeText('.playstate', getHtml('.playstate') + ' 播放');
    window.setTimeout(function () {
        loadedMetaDataHandler();
    }, 1000);
    loadedMetaDataHandler();
}

function pauseHandler() {
    //player.animatePause();//暂停所有弹幕
    changeText('.playstate', getHtml('.playstate') + ' 暂停');
    loadedMetaDataHandler();
}

function newVideo(videoUrl, picUrl) {
    changeVideo(videoUrl, picUrl);
}

function changeVideo(videoUrl, picUrl) {
    if (player == null) {
        return;
    }
    console.log(picUrl);
    console.log(videoUrl);
    var newVideoObject = {
        container: '#video', // 容器的ID
        variable: 'player',
        autoplay: false, // 是否自动播放
        loaded: 'loadedHandler', // 当播放器加载后执行的函数
        video: videoUrl
    }
    //判断是需要重新加载播放器还是直接换新地址

    if(player.playerType == 'html5video') {
        if(player.getFileExt(videoUrl) == '.flv' || player.getFileExt(videoUrl) == '.m3u8' || player.getFileExt(videoUrl) == '.f4v' || videoUrl.substr(0, 4) == 'rtmp') {
            player.removeChild();

            player = null;
            player = new ckplayer();
            player.embed(newVideoObject);
        } else {
            player.newVideo(newVideoObject);
        }
    } else {
        if(player.getFileExt(videoUrl) == '.mp4' || player.getFileExt(videoUrl) == '.webm' || player.getFileExt(videoUrl) == '.ogg') {
            player = null;
            player = new ckplayer();
            player.embed(newVideoObject);
        } else {
            player.newVideo(newVideoObject);
        }
    }
}

function newDanmu(text) {
    var x = "100%";
    var  y = Math.floor(Math.random() * 100) + "%";
    // 弹幕说明
    var danmuObj = {
        list: [{
            type: 'image', //定义元素类型：只有二种类型，image=使用图片，text=文本
            file: 'http://120.79.251.217:9002/uploads/big/54bd931e8705936f58067e5ae3396820.jpg', //图片地址
            radius: 30, //图片圆角弧度
            width: 30, //定义图片宽，必需要定义
            height: 30, //定义图片高，必需要定义
            alpha: 0.9, //图片透明度(0-1)
            marginLeft: 10, //图片离左边的距离
            marginRight: 10, //图片离右边的距离
            marginTop: 10, //图片离上边的距离
            marginBottom: 10, //图片离下边的距离
            clickEvent: "link->http://"
        }, {
            type: 'text', //说明是文本
            text: text, //文本内容
            color: '0xFFDD00', //文本颜色
            size: 14, //文本字体大小，单位：px
            font: '"Microsoft YaHei", YaHei, "微软雅黑", SimHei,"\5FAE\8F6F\96C5\9ED1", "黑体",Arial', //文本字体
            leading: 30, //文字行距
            alpha: 1, //文本透明度(0-1)
            paddingLeft: 10, //文本内左边距离
            paddingRight: 10, //文本内右边距离
            paddingTop: 0, //文本内上边的距离
            paddingBottom: 0, //文本内下边的距离
            marginLeft: 0, //文本离左边的距离
            marginRight: 10, //文本离右边的距离
            marginTop: 10, //文本离上边的距离
            marginBottom: 0, //文本离下边的距离
            backgroundColor: '0xFF0000', //文本的背景颜色
            backAlpha: 0.5, //文本的背景透明度(0-1)
            backRadius: 30, //文本的背景圆角弧度
            clickEvent: "actionScript->videoPlay"
        }],
        x: x, //x轴坐标
        y: y, //y轴坐标
        //position:[2,1,0],//位置[x轴对齐方式（0=左，1=中，2=右），y轴对齐方式（0=上，1=中，2=下），x轴偏移量（不填写或null则自动判断，第一个值为0=紧贴左边，1=中间对齐，2=贴合右边），y轴偏移量（不填写或null则自动判断，0=紧贴上方，1=中间对齐，2=紧贴下方）]
        alpha: 1,
        //backgroundColor:'#FFFFFF',
        backAlpha: 0.8,
        backRadius: 30 //背景圆角弧度
    }
    var danmu = player.addElement(danmuObj);
    var danmuS = player.getElement(danmu);
    var obj = {
        element: danmu,
        parameter: 'x',
        static: true, //是否禁止其它属性，true=是，即当x(y)(alpha)变化时，y(x)(x,y)在播放器尺寸变化时不允许变化
        effect: 'None.easeOut',
        start: null,
        end: -danmuS['width'],
        speed: 10,
        overStop: true,
        pauseStop: true,
        callBack: 'deleteChild'
    };
    var danmuAnimate = player.animate(obj);
}

function deleteChild(ele) {
    if (player) {
        player.deleteElement(ele);
    }
}

function changeText(div, text) {
    player.getByElement(div).innerHTML = text;
}

function getHtml(div) {
    return player.getByElement(div).innerHTML;
}

var zoom = 1;
