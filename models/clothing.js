module.exports = function (sequelize, DataTypes) {
    var Clothing = sequelize.define("Clothing", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "Everyday"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        body: {
            type: DataTypes.TEXT,
        }
    });
    return Clothing;
};
