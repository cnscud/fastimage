Sample

```
<!-- for editor -->
var editor = CKEDITOR.replace('editable', {
    filebrowserImageUploadUrl: '/upload/image/?ckcallback=true',
    imageUploadUrl: '/upload/image/', //for uploadimage: paste
    fastimageUploadUrl: "/upload/image/", //for quick image
    maxImageSize: 5242880,
    toolbar: [
        {name: 'basicstyles', items: ['Bold', 'Strike', 'Underline', 'Format', '-', 'RemoveFormat']},
        ['TextColor', 'BGColor'],
        {name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote']},
        {name: 'insert', items: ['Fastimage', 'Link', 'Table', 'Smiley' ]},
        {name: 'clipboard', items: ['Undo', 'Redo', 'Source', 'Maximize']}
    ],
    customConfig: '',
    extraPlugins: 'uploadimage,smiley,image2,fastimage',
    removePlugins: 'image',
    height: 600,
    contentsCss: ['/static/ckeditor4/contents.css', //全局样式文件
        '/static/your-content.css?1.0' //自己的样式文件
    ],
    format_tags: 'p;h1;h2;h3',
    removeDialogTabs: 'image:advanced;link:advanced;link:upload'
});


//for uploadimage plugin
editor.on('fileUploadResponse', function (evt) {
    // Prevent the default response handler.
    evt.stop();

    var data = evt.data, xhr = data.fileLoader.xhr;
    var result = jQuery.parseJSON(xhr.responseText);

    if (result.code == 0) {
        data.url = result.bigurl;
    }
    else {
        data.message = result.msg;
        evt.cancel();
    }
});
```