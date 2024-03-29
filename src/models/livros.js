'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Livros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Livros.init(
    {
      author: DataTypes.STRING,
      bookformat: DataTypes.STRING,
      desc: DataTypes.STRING,
      genre: DataTypes.STRING,
      img: DataTypes.STRING,
      isbn: DataTypes.STRING,
      isbn13: DataTypes.BIGINT,
      link: DataTypes.STRING,
      pages: DataTypes.BIGINT,
      rating: DataTypes.BIGINT,
      reviews: DataTypes.STRING,
      title: DataTypes.STRING,
      totalratings: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Livros'
    }
  )
  return Livros
}
