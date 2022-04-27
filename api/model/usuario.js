"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "usuario",
    }
  );

  return Usuario;
};
