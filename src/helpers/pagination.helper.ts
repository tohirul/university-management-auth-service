import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IPaginateElements = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IPaginateElements => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit || 10);

  const skip = (page - 1) * limit;
  const sortBy = options?.sortBy || 'createdAt';
  const sortOrder = options?.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
const paginationHelpers = {
  calculatePagination,
};
export default paginationHelpers;
