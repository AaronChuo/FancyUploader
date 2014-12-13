'use strict';

var files;

$('input[type=file]').on('change', getFiles);
$('form').on('submit', uploadFiles);

function getFiles(e) {
  files = e.target.files;
}

function uploadFiles(e) {
  e.stopPropagation();
  e.preventDefault();
  
  var data = new FormData();
  var reader;
  var item;

  $.each(files, function (key, val) {
    var file = files[key];
    reader = new FileReader();
    reader.onload = function (e) {
      var item = '<li><img src="' + e.target.result + '"></li>';
      $('#preview').append(item);
    };
    reader.readAsDataURL(file);
    data.append(key, val);
  });
  
	$.ajax({
    xhr: function()
    {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (e) {
        if(e.lengthComputable) {
          var percentComplete = Math.ceil(e.loaded / e.total * 100);
          console.log(percentComplete);
        }
      }, false);

      return xhr;
    },
    type: 'POST',
    url: "https://playground-api.herokuapp.com/upload",
    data: data,
    cache: false,
    dataType: 'html',
    processData: false,
    contentType: false,
    success: function (res) {
      console.log(res);
    }
	}); 
}