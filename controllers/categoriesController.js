const categoriesService = require('../services/categoriesService');

// const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
// const UNPROCESS = 422;
// const ERROR = 500;
// const objError = {
//   err: {
//     code: 'invalid_data',
//     message: '',
//   },
// };

// const getAll = async (_req, res) => {
//   try {
//     const results = await productsModel.getAll();

//     res.status(OK).json({ products: results });
//   } catch (error) {
//     console.error(error);
//     res.status(ERROR).json({ message: error.message });
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await productsService.getById(id);

//     res.status(OK).json(result);
//   } catch (error) {
//     console.error(error);

//     const { message } = error;
//     if (message.includes('id')) {
//       objError.err.message = error.message;
//       res.status(UNPROCESS).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

const add = async (req, res) => {
  try {
    const result = await categoriesService.add(req);

    return res.status(CREATE).json(result);
  } catch (error) {
    const { message } = error;
    if (message.includes('required')) {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

// const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     const result = await productsService.update(id, name, quantity);

//     res.status(OK).json(result);
//   } catch (error) {
//     console.error(error);

//     const { message } = error;
//     if (message.includes('quantity')
//     || message.includes('name') || message.includes('Product')) {
//       objError.err.message = error.message;
//       res.status(UNPROCESS).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await productsService.deleteProduct(id);

//     res.status(OK).json(result);
//   } catch (error) {
//     console.error(error);

//     const { message } = error;
//     if (message.includes('id')) {
//       objError.err.message = error.message;
//       res.status(UNPROCESS).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

module.exports = {
  // getAll,
  // getById,
  add,
  // update,
  // deleteProduct,
};
