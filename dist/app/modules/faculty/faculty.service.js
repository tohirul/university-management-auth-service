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
const faculty_constant_1 = require('./faculty.constant');
const faculty_model_1 = __importDefault(require('./faculty.model'));
const faculty_update_embed_1 = __importDefault(
  require('./faculty.update.embed')
);
const getFacultyFromDb = async id => {
  return await faculty_model_1.default
    .findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
};
const getAllFacultyFromDb = async (filters, options) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pagination_helper_1.default.calculatePagination(options);
  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $or: faculty_constant_1.FacultySearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;
  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};
  const result = await faculty_model_1.default
    .find(searchConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await faculty_model_1.default.countDocuments(searchConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateFacultyInDb = async (id, payload) => {
  const exists = await faculty_model_1.default.findOne({ id });
  if (!exists)
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      'Faculty not found'
    );
  const { name, ...facultyData } = payload;
  let updatedFacultyData = { ...facultyData };
  if (name && Object.keys(name).length) {
    updatedFacultyData = (0, faculty_update_embed_1.default)(
      name,
      updatedFacultyData,
      'name'
    );
  }
  return await faculty_model_1.default
    .findOneAndUpdate({ id }, updatedFacultyData, {
      new: true,
    })
    .populate('academicDepartment')
    .populate('academicFaculty');
};
const deleteFacultyFromDb = async id => {
  const faculty = await faculty_model_1.default.findOne({ id });
  if (!faculty) {
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      'Faculty not found'
    );
  }
  const session = await mongoose_1.default.startSession();
  session.startTransaction();
  try {
    const deletedFaculty = await faculty_model_1.default.findOneAndDelete(
      { id },
      { session }
    );
    if (!deletedFaculty) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Failed to delete faculty'
      );
    }
    // Related User model that needs to be deleted
    await user_model_1.default.deleteOne({ id }).session(session);
    await session.commitTransaction();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session after either commit or rollback
    session.endSession();
  }
};
const FacultyService = {
  getFacultyFromDb,
  getAllFacultyFromDb,
  updateFacultyInDb,
  deleteFacultyFromDb,
};
exports.default = FacultyService;
