module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  return Categories;
};