const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    timestamps: false,//no me mostrará las dos tables que sequelize crea por defecto(createdAt and updateAt)
  });
};










