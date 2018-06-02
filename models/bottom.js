module.exports = function (sequelize, DataTypes) {
    var Bottom = sequelize.define("Bottom", {
        category: {
            type: DataTypes.STRING,
            defaultValue: "Everyday"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link: {
            type: DataTypes.STRING,
        }
    });
    return Bottom;
};