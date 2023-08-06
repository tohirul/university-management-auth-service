'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const pagination_helper_1 = __importDefault(
  require('../../../helpers/pagination.helper')
);
const academicDepartment_constant_1 = require('./academicDepartment.constant');
const academicDepartment_model_1 = __importDefault(
  require('./academicDepartment.model')
);
const createAcademicDepartmentInDb = async payload => {
  return (await academicDepartment_model_1.default.create(payload)).populate(
    'academicFaculty'
  );
};
const getAllAcademicDepartmentsFromDb = async (filters, options) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pagination_helper_1.default.calculatePagination(options);
  const conditions = [];
  if (searchTerm) {
    conditions.push({
      $or: academicDepartment_constant_1.AcademicDepartmentSearchableFields.map(
        field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })
      ),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const searchConditions =
    conditions.length > 0
      ? {
          $and: conditions,
        }
      : {};
  const total = await academicDepartment_model_1.default.countDocuments(
    searchConditions
  );
  const result = await academicDepartment_model_1.default
    .find(searchConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleDepartmentFromDb = async id => {
  return await academicDepartment_model_1.default.findById(id);
};
const updateAcademicDepartmentInDb = async (id, payload) => {
  return await academicDepartment_model_1.default
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .populate('academicFaculty');
};
const deleteAcademicDepartmentFromDb = async id => {
  return await academicDepartment_model_1.default
    .findByIdAndDelete(id)
    .populate('academicFaculty');
};
const AcademicDepartmentService = {
  createAcademicDepartmentInDb,
  getAllAcademicDepartmentsFromDb,
  getSingleDepartmentFromDb,
  deleteAcademicDepartmentFromDb,
  updateAcademicDepartmentInDb,
};
exports.default = AcademicDepartmentService;
