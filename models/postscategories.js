module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};