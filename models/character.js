const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Character extends Model {}

Character.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4, //check this
            allowNull: false,
            primaryKey: true,
        },
        dm_id_fk: {
            type: DataTypes.UUID,
            allowNull: false,
            references : {
                model: 'dm',
                key: 'id'
            }
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        met_party: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notes: {
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "character",
    }
);

module.exports = Character