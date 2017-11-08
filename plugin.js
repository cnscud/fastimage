CKEDITOR.plugins.add( 'fastimage', {
    icons: 'fastimage',
    requires: 'filetools',
    lang: 'en,zh-cn', // %REMOVE_LINE_CORE%
    beforeInit: function( editor ) {
        if (!!!CKEDITOR.fileTools) {
            console.log("Please add the plugins fileTools and its requirements.")
        }
    },
    init: function( editor ) {
        var fileDialog = $('<input type="file" accept=".jpg,.jpeg,.png,.gif,.svg">');
        var lang = editor.lang.fastimage;
        
        fileDialog.on('change', function (e) {
            var fileTools = CKEDITOR.fileTools,
                uploadUrl = fileTools.getUploadUrl( editor.config, 'fastimage' ),
                file = e.target.files[0],
                loader = editor.uploadRepository.create(file),
                reader = new FileReader(),
                notification,
                img;

            var maxSize = editor.config.maxImageSize;
            if(!maxSize){
                maxSize = 5242880;
            }


            // verify
            if (!/image/i.test(file.type)) {
                notification = editor.showNotification( lang.badformat, 'warning' );

                setTimeout(function() {
                    notification.hide()
                }, 2000);

                return false;
            }

            if (file.size > maxSize) {
                notification = editor.showNotification( lang.sizetoobig, 'warning' );

                setTimeout(function() {
                    notification.hide()
                }, 2000);

                return false;
            }

            
            loader.upload(uploadUrl);

            // preview image
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = function (e) {
                img = editor.document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.setStyle('opacity', 0.3);
                editor.insertElement(img);
            };

            loader.on('uploaded', function(evt) {
                editor.widgets.initOn(img, 'image', {
                    src: evt.sender.url
                });
                img.setAttribute('src', evt.sender.url);
                img.setStyle('opacity', 1);
            });

            loader.on('error', function() {
                img.remove()
            });

            fileTools.bindNotifications(editor, loader);
            
            // empty input
            fileDialog[0].value = "";
        });

        editor.ui.addButton( 'Fastimage', {
            label: lang.menu,
            command: 'openDialog',
            toolbar: 'insert'
        });

        editor.addCommand('openDialog', {
            exec: function(editor) {
                fileDialog.click();
            }
        });
    }
});
