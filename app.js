var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var formidable = require('formidable');
var util = require('util');

app.use(bodyParser({
	uploadDir: './tmp',
	defer: true
}));
app.use('/public', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);

app.get('/', function (req, res) {
	res.sendfile('index.html');
});

app.post('/upload', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');

	var form = new formidable.IncomingForm();
	
	form.parse(req, function (err, fields, files) {
		//res.writeHead(200, {'content-type': 'application/json'});
		res.json({'hello':'world'});
		//res.end(util.inspect({message: 'success', fields: fields, files: files}));
	});

	// form.on('progress', function (bytesReceived, bytesExpected) {
	// 	console.log((bytesReceived / bytesExpected * 100).toFixed(2));
	// });

	// form.on('end', function (fields, files) {
	// 	console.log('success!'); //this.openedFiles
	// 	res.json({
	// 		message: 'success',
	// 		files: this.openedFiles 
	// 	});
	// });
});