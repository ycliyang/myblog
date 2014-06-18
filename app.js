var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var blogd = require('./routes/blogd');
var db = require('./models');
//
db
    .sequelize
    .sync({ force: true })
    .complete(function(err) {
        if (err) {
            throw err[0]
        } else {
//            http.createServer(app).listen(app.get('port'), function(){
//                console.log('Express server listening on port ' + app.get('port'))
//            })
        }
    })


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/blog', blogd);




/*
//redis连接
var redis = require('redis');
var db = redis.createClient();

//接下来是纪录用户在线的中间件。 这里我们使用sorted sets, 它的一个好处是我们可以查询最近N毫秒内在线的用户。 我们通过传入一个时间戳来当作成员的"score"。 注意我们使用 User-Agent 作为一个标识用户的id。
app.use(function(req, res, next){
    //这里是以浏览器类型作为在线用户的统计标准
    //如何要做到精确需要使用到cookie来作为统计的标准
    var ua = req.headers['user-agent'];
    db.zadd('online', Date.now(), ua, next);
});

//下一个中间件是通过zrevrangebyscore来查询上一分钟在线用户。 我们将能得到从当前时间算起在60,000毫秒内活跃的用户。
app.use(function(req, res, next){
    var min = 60 * 1000;
    var ago = Date.now() - min;
    db.zrevrangebyscore('online', '+inf', ago, function(err, users){
        if (err) return next(err);
        req.online = users;
        next();
    });
});

app.get('/online', function(req, res){
    res.send(req.online.length + ' users online');
});
*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
