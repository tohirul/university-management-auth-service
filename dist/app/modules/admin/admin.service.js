'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const pagination_helper_1 = __importDefault(
  require('../../../helpers/pagination.helper')
);
const user_model_1 = __importDefault(require('../user/user.model'));
const admin_constant_1 = require('./admin.constant');
const admin_model_1 = __importDefault(require('./admin.model'));
const admin_update_embed_1 = __importDefault(require('./admin.update.embed'));
const getAllAdmin = async (filters, options) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pagination_helper_1.default.calculatePagination(options);
  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $$or: admin_constant_1.adminDataSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filtersData).length)
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  const sortConditions = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;
  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
  const result = await admin_model_1.default
    .find(searchConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await admin_model_1.default.countDocuments(searchConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAdminById = async id => {
  return await admin_model_1.default
    .findOne({ id })
    .populate('managementDepartment');
};
const updateAdminById = async (id, payload) => {
  const exists = await admin_model_1.default.findOne({ id });
  if (!exists)
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Admin not found'
    );
  const { name, ...adminData } = payload;
  let updatedAdminData = { ...adminData };
  if (name && Object.keys(name).length)
    updatedAdminData = (0, admin_update_embed_1.default)(
      name,
      updatedAdminData,
      'name'
    );
  return await admin_model_1.default
    .findOneAndUpdate({ id }, updatedAdminData, {
      new: true,
    })
    .populate('managementDepartment');
};
const deleteAdmin = async id => {
  const exists = await admin_model_1.default.findOne({ id });
  if (!exists)
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Admin not found'
    );
  const session = await mongoose_1.default.startSession();
  await session.startTransaction();
  try {
    const deletedAdmin = await admin_model_1.default.findOneAndDelete(
      { id },
      { session }
    );
    if (!deletedAdmin)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to delete admin'
      );
    await user_model_1.default.deleteOne({ id }).session(session);
    await session.commitTransaction();
    return deletedAdmin;
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const AdminService = {
  getAllAdmin,
  updateAdminById,
  getAdminById,
  deleteAdmin,
};
exports.default = AdminService;
