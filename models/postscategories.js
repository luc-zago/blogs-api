module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_post',
      through: PostsCategories,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostsCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };

  return PostsCategories;
};