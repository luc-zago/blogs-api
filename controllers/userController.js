// const salesModel = require('../models/salesModel');
const userService = require('../services/userService');

const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
const CONFLICT = 409;
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
//     const results = await salesModel.getAll();

//     res.status(OK).json({ sales: results });
//   } catch (error) {
//     console.error(error);
//     res.status(ERROR).json({ message: error.message });
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const results = await salesService.getById(id);

//     res.status(OK).json(results);
//   } catch (error) {
//     const { message } = error;
//     if (message.includes('found')) {
//       objError.err.code = 'not_found';
//       objError.err.message = error.message;
//       res.status(NOT_FOUND).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

const add = async (req, res) => {
  try {
    const result = await userService.add(req.body);

    return res.status(CREATE).json(result);
  } catch (error) {
    const { message } = error;
    if (message.includes('User')) {
      return res.status(CONFLICT).json({ message: error.message });
    }
    return res.status(BAD_REQUEST).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: error.message });
  }
};

// const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [sale] = req.body;
//     const result = await salesService.update(id, sale);

//     res.status(OK).json(result);
//   } catch (error) {
//     console.error(error);

//     const { message } = error;
//     if (message.includes('ID')) {
//       objError.err.code = 'invalid_data';
//       objError.err.message = error.message;
//       res.status(UNPROCESS).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

// const deleteSale = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await salesService.deleteSale(id);

//     res.status(OK).json(result);
//   } catch (error) {
//     console.error(error);

//     const { message } = error;
//     if (message.includes('id')) {
//       objError.err.code = 'invalid_data';
//       objError.err.message = 'Wrong sale ID format';
//       res.status(UNPROCESS).json(objError);
//     }
//     res.status(ERROR).json({ message: error.message });
//   }
// };

module.exports = {
  // getAll,
  // getById,
  add,
  login,
  // update,
  // deleteSale,
};
