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
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    sortBy: options?.sortBy || 'createdAt',
    sortOrder: options?.sortOrder || 'desc',
  };
};
const paginationHelpers = {
  calculatePagination,
};
export default paginationHelpers;
