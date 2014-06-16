/**
 * Created by Administrator on 2014/6/16.
 */


var fs        = require('fs')
    , path      = require('path')
    , Sequelize = require('sequelize')
    , lodash    = require('lodash')
//    , sequelize = new Sequelize('mysql://115.28.63.150:3306/myBlog', {username:'root',password: 'mysql@greenfruiter.com'})
    , db        = {}

var sequelize = new Sequelize('myBlog', 'root', 'mysql@greenfruiter.com', {host : '115.28.63.150', port : '3306', dialect : 'mysql'});

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)
