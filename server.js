var http = require('http');
var url = require('url');

var app = require('app_core/app.js');
var routes = require('app_core/app-routes.js');
routes.owner = app;

//var MessagingServer = require('websocket-messaging/server.js');

routes.add('/', function ()
{
	app.utils.serveContent(__dirname + '/templates/index.html');
});
routes.add('/cover.css', function ()
{
	app.utils.serveContent(__dirname + '/templates/cover.css');
});

routes.add('^/assets', function ()
{
	app.utils.serveContent(__dirname + '/templates/' + routes.context.path);
});

routes.add('^/bootstrap', function ()
{
	app.utils.serveContent(__dirname + '/templates/' + routes.context.path);
});

var httpServer = http.createServer(function (request, response)
{
	app.request = request;
	app.response = response;

	routes.process();
}).listen(process.env.PORT || process.env.VMC_APP_PORT || 1337, null);

console.log(app.title + ' is up and running');
