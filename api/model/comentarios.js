"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comentarios = sequelize.define(
    "Comentarios",
    {
      id_usuario: DataTypes.INTEGER,
      id_livro: DataTypes.INTEGER,
      comentario: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "comentarios",
    }
  );

  return Comentarios;
};
