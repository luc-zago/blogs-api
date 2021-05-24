const jwt = require('../helpers/jwt');
const { BlogPost, Category } = require('../models');

const verifyToken = (headers) => {
  if (!headers.authorization) {
    throw new Error('Token not found');
  }
  const { authorization } = headers;
  return jwt.decodifyToken(authorization);
};

const validateField = (field, fieldname) => {
  // if (field === '') {
  //   throw new Error(`"${fieldname}" is not allowed to be empty`);
  // }
  if (!field) {
    throw new Error(`"${fieldname}" is required`);
  }
  // switch (fieldname) {
  //   case 'displayName':
  //     checkLength(field, fieldname, DISPLAY);
  //     break;
  //   case 'password':
  //     checkLength(field, fieldname, PASSWORD);
  //     break;
  //   default:
  //     validateEmail(field);
  // }
};

const checkCategories = async (categoryIds, counter) => {
  const newCounter = counter - 1;
  if (newCounter < 0) {
    return null;
  }
  const category = await Category.findByPk(categoryIds[newCounter]);
  if (!category) {
    throw new Error('"categoryIds" not found');
  }
  return checkCategories(categoryIds, newCounter);
};

// const validation = (name, quantity) => {
//   const FIVE = 5;
//   const ZERO = 0;

//   if (name.length < FIVE || typeof name !== 'string') {
//     const ERR_MESSAGE = '\"name\" length must be at least 5 characters long';
//     throw new Error(ERR_MESSAGE);
//   }
//   if (typeof quantity !== 'number') {
//     const ERR_MESSAGE = '\"quantity" must be a number';
//     throw new Error(ERR_MESSAGE);
//   }
//   if (quantity < ZERO || quantity === ZERO) {
//     const ERR_MESSAGE = '\"quantity" must be larger than or equal to 1';
//     throw new Error(ERR_MESSAGE);
//   }
// };

// const getAll = async (headers) => {
//   verifyToken(headers);

//   const categories = await Category.findAll();

//   return categories;
// };

// const getById = async (id) => {
//   const result = await productModel.getById(id);

//   if (!result) {
//     const ERR_MESSAGE = 'Wrong id format';
//     throw new Error(ERR_MESSAGE);
//   }

//   return result;
// };

const add = async ({ headers, body: { title, content, categoryIds } }) => {
  const { id: userId } = verifyToken(headers);
  validateField(title, 'title');
  validateField(content, 'content');
  validateField(categoryIds, 'categoryIds');
  await checkCategories(categoryIds, categoryIds.length);

  const post = await BlogPost.create({ title, content, userId, categoryIds });

  return post.dataValues;
};

// const update = (id, name, quantity) => {
//   validation(name, quantity);

//   return productModel.update(id, name, quantity);
// };

// const deleteProduct = async (id) => {
//   const product = await getById(id);

//   return productModel.deleteProduct(product);
// };

module.exports = {
  // getAll,
  // getById,
  add,
  // update,
  // deleteProduct,
};
