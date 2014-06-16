/**
 * Created by Administrator on 2014/6/16.
 */
module.exports = function(sequelize, DataTypes) {
    var BlogFlag = sequelize.define('BlogFlag', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                BlogFlag.hasMany(models.Blog);
            }
        }
    })

    return BlogFlag
}