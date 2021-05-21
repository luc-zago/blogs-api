module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: models.PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_post',
      through: models.PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostsCategories;
};