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
    timestamps: false,
  });
};










// const { DataTypes } = require('sequelize');
// const uuid = require('uuid');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: uuid.v4(),
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     platforms: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//     },
//     background_image: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     released: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     rating: {
//       type: DataTypes.ENUM("1", "2", "3", "4", "5"),
//       allowNull: false,
//       validate: {
//           min: 1,
//           max: 5,
//       }
//     }
//   },
//   {
//     timestamps: false,
//   }
// );
// };
