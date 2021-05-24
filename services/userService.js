const jwt = require('../helpers/jwt');
const { User } = require('../models');

const validateEmail = (email) => {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(email)) {
      throw new Error('"email" must be a valid email');
    }
};

const checkLength = (field, fieldname, length) => {
  let ERR_MESSAGE = `"${fieldname}" length must be at least ${length} characters long`;
  if (fieldname === 'password') {
    ERR_MESSAGE = `"${fieldname}" length must be ${length} characters long`;
  }
  if (field.length < length) {
    throw new Error(ERR_MESSAGE);
  }
};

const validateField = (field, fieldname) => {
  const DISPLAY = 8;
  const PASSWORD = 6;
  if (field === '') {
    throw new Error(`"${fieldname}" is not allowed to be empty`);
  }
  if (!field) {
    throw new Error(`"${fieldname}" is required`);
  }
  switch (fieldname) {
    case 'displayName':
      checkLength(field, fieldname, DISPLAY);
      break;
    case 'password':
      checkLength(field, fieldname, PASSWORD);
      break;
    default:
      validateEmail(field);
  }
};

const verifyToken = (headers) => {
  if (!headers.authorization) {
    throw new Error('Token not found');
  }
  const { authorization } = headers;
  jwt.decodifyToken(authorization);
};

//   if (typeof quantity !== 'number'
//   || quantity < ZERO || quantity === ZERO) {
//     throw new Error(ERR_MESSAGE);
//   }
// };

// const validateProductId = (productId) => {
//   const product = productsModel.getById(productId);
//   if (!product) throw new Error(ERR_MESSAGE);
// };

// const validateSaleId = (saleId) => {
//   const sale = salesModel.getById(saleId);
//   if (!sale) throw new Error(ERR_MESSAGE);

//   return sale;
// };

const getAll = async (headers) => {
  verifyToken(headers);

  const users = await User.findAll();

  return users;
};

const getById = async ({ params: { id }, headers }) => {
  verifyToken(headers);
  const user = await User.findAll({ where: { id } });

  if (!user.length) {
    throw new Error('User does not exist');
  }

  return user[0].dataValues;
};

const add = async (userData) => {
  validateField(userData.displayName, 'displayName');
  validateField(userData.email, 'email');
  validateField(userData.password, 'password');

  const exists = await User.findAll({ where: { email: userData.email } });

  if (exists.length) throw new Error('User already registered');

  const user = await User.create(userData);

  return { token: jwt.createToken(user.dataValues) };
};

const login = async ({ email, password }) => {
  validateField(email, 'email');
  validateField(password, 'password');
  
  const user = await User.findAll({ where: { email, password } });

  if (!user.length) throw new Error('Invalid fields');

  return { token: jwt.createToken(user[0].dataValues) };
};

// const update = async (id, sale) => {
//   const { productId, quantity } = sale;
//   validateQuantity(quantity);
//   validateProductId(productId);
//   validateSaleId(id);

//   return salesModel.update(id, productId, quantity);
// };

// const deleteSale = async (id) => {
//   const sale = await validateSaleId(id);

//   return salesModel.deleteSale(sale);
// };

module.exports = {
  getAll,
  getById,
  add,
  login,
  // update,
  // deleteSale
};
