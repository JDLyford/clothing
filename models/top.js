module.exports = function (sequelize, DataTypes) {
    var Top = sequelize.define("Top", {
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
    return Top;
};