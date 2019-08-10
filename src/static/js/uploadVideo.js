(function ($) {
    // 当domReady的时候开始初始化
    $(function () {
        //视频上传 start
        var $list = $('#videoListTable'),
            $btn = $('#ctlBtn');
        var uploaderVideo = WebUploader.create({
            resize: false, // 不压缩image
            swf: '../plugin/webupload/swf/expressInstall.swf', // swf文件路径
            server: 'http://lemon.shijianpeng.top/a/file/upload', // 文件接收服务端。
            formData: {
                "linkType": 0,
                "linkId": $("input[name=videoId]").val(),
                "uid": getCookie("uid")
            },
            pick: '#picker', // 选择文件的按钮。可选
            // chunked: true, // 是否要分片处理大文件上传
            // chunkSize: 2 * 1024 * 1024, // 分片上传，每片2M，默认是5M
            // auto: true, // 选择文件后是否自动上传
            // chunkRetry : 2, // 如果某个分片由于网络问题出错，允许自动重传次数
            // runtimeOrder: 'html5,flash',
            accept: {
                title: 'Video',
                extensions: 'mp4',
                mimeTypes: 'video/*'
            },
            duplicate: false, // 是否支持重复上传
            // 设置文件上传域的name
            fileVal: 'files',
            fileNumLimit: 1,
            // 验证文件总大小是否超出限制, 超出则不允许加入队列。
            fileSizeLimit: 512 * 1024 * 1024,    // 512 M
            fileSingleSizeLimit: 512 * 1024 * 1024   // 512 M
        });
        uploaderVideo.on('ready', function () {
            window.uploaderVideo = uploaderVideo;
        });
        uploaderVideo.on('uploadBeforeSend', function (obj, data, headers) {
            data.linkId = $("input[name=videoId]").val()
        });
        // 当有文件被添加进队列的时候
        uploaderVideo.on('fileQueued', function (file) {
            $list.append('<tr id="' + file.id + '" class="file-item"><td class="file-name">' + file.name + '</td>' + '<td class="file-size">' + (file.size / 1024 / 1024).toFixed(1) + 'M' + '</td>' + '<td class="file-pro">0%</td>' + '<td class="file-status">等待上传</td>' + '<td class="file-manage"><a class="stop-btn" href="javascript:;">暂停</a><br><a class="remove-this" href="javascript:;">取消</a></td>' + '</tr>');
            // 暂停上传的文件
            $list.on('click', '.stop-btn', function () {
                uploaderVideo.stop(true);
            })
            // 删除上传的文件
            $list.on('click', '.remove-this', function () {
                if ($(this).parents(".file-item").attr('id') == file.id) {
                    uploaderVideo.removeFile(file);
                    $(this).parents(".file-item").remove();
                }
            })
        });
        // 重复添加文件
        var timer1;
        uploaderVideo.onError = function (code) {
            clearTimeout(timer1);
            timer1 = setTimeout(function () {
                layer.msg('已存在一个视频');
            }, 250);
        }
        // 文件上传过程中创建进度条实时显示
        uploaderVideo.on('uploadProgress', function (file, percentage) {
            $("td.file-pro").text("");
            var $li = $('#' + file.id).find('.file-pro'),
                $percent = $li.find('.file-progress .progress-bar');
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="file-progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>' + '<div class="per">0%</div>').appendTo($li).find('.progress-bar');
            }
            $li.siblings('.file-status').text('上传中');
            $li.find('.per').text((percentage * 100).toFixed(2) + '%');
            $percent.css('width', percentage * 100 + '%');
        });
        // 文件上传成功
        uploaderVideo.on('uploadSuccess', function (file, response) {
            $('#' + file.id).find('.file-status').text('已上传');
            if (response.code === 0) {
                $("input[name=videoFileId]").val(response.fileDTOList[0].fileId)
            } else {
                $btn.text("重新上传");
                layer.msg(response.msg);
            }
        });
        // 文件上传失败，显示上传出错
        uploaderVideo.on('uploadError', function (file) {
            $('#' + file.id).find('.file-status').html('<span style="color: red;">上传出错</span>');
        });
        // 完成上传完后将视频添加到视频列表，显示状态为：转码中
        uploaderVideo.on('uploadComplete', function (file) {
            // $( '#'+file.id ).find('.file-progress').fadeOut();
        });
        $btn.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            uploaderVideo.upload();
        });
    });
})(jQuery);
