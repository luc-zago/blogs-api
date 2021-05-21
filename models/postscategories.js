module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostsCategories;
};