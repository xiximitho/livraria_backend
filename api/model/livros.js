"use strict";
module.exports = (sequelize, DataTypes) => {
  const Livros = sequelize.define(
    "Livros",
    {
      author: DataTypes.STRING,
      bookformat: DataTypes.STRING,
      desc: DataTypes.STRING,
      genre: DataTypes.STRING,
      img: DataTypes.STRING,
      isbn: DataTypes.STRING,
      isbn13: DataTypes.STRING,
      link: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      reviews: DataTypes.INTEGER,
      title: DataTypes.STRING,
      totalratings: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      tableName: "livros",
    }
  );

  return Livros;
};
