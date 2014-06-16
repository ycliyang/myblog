/**
 * Created by Administrator on 2014/6/16.
 */
module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Task.belongsTo(models.User)
            }
        }
    })

    return Task
}