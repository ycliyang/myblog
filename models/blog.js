/**
 * Created by Administrator on 2014/6/16.
 */
module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define('Blog', {
        title: DataTypes.STRING,
        content: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Blog.belongsTo(models.User);
                Blog.belongsTo(models.BlogFlag);
            }
        }
    })

    return Blog;
}