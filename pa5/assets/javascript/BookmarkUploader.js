/* Classes for elements - Everything gets attached to app class */
(function () {

    var app = this['App'];
    var uploader;
    function BookmarkUploader() {
        uploader = this;
        uploader.myDropzone = null;
        uploader.template   = app.templates['assets/templates/upload-file.hbs'];
    }

    BookmarkUploader.prototype.show = function showBookmarkUploader() {
        app.show('bm-upload-file-dialog', this.template);
        var dz = uploader.myDropzone = new Dropzone('bm-upload-file-dialog bm-dialog-body', {
            url: '/api/bookmarks/upload',
            acceptedFiles: '.csv',
            paramName: 'file',
            uploadMultiple: false,
            createImageThumbnails: false,
            clickable: true,
            addRemoveLinks: true
        });

        dz.on('error', function (error, errorMessage) {
            console.log(error, errorMessage);
            errorMessage.message = 'Upload failed: ' + errorMessage.message;
            app.errorDialog.show(errorMessage);
            var element = document.getElementsByTagName('bm-upload-file-dialog')[0];
            app.dialogContainer.removeChild(element);
        });
    };

    app.bookmarkUploader = new BookmarkUploader();

})(window);
