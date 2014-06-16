/**
 * Created by Administrator on 2014/6/9.
 */

var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
    //res.response.writeHade(301,{'Location':'/home','Cache-Control':'no-cache,must-revalidate,no-store','Pragma':'no-cache'});
    res.redirect('/blog/home');
});

router.get("/add",function (req,res){
    res.render('blog/blog_add', { title: '发表博客',home:true });
});

router.get('/home', function(req, res) {
//    db.User.findAll({
//        include: [ db.Task ]
//    }).success(function(users) {
//        res.render('blog/blog_indexd', {
//            title: '博客主页',
//            users: users,
//            home:true
//        })
//    })

//    res.render('blog/blog_indexd', { title: '博客主页',home:true });


    var bgs = db.Blog.findAll({order:[['id',"DESC"]],limit:20});

    res.render('blog/blog_indexd', { title: '博客主页',home:true,blogs:bgs });


});

router.get('/onRoad', function(req, res) {
    res.render('blog/blog_onRoad', { title: '在路上',onRoad:true });
});

router.get('/science', function(req, res) {
    res.render('blog/blog_science', { title: '技术宅',science:true });
});

router.get('/aboutMe', function(req, res) {
    res.render('blog/blog_aboutMe', { title: '关于我',aboutMe:true });
});

router.get('/about', function(req, res) {
    res.render('blog/blog_about', { title: '其他',about:true });
});


module.exports = router;
