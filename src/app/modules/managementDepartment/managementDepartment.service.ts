import { IManagementDepartment } from './managementDepartment.interface';
import ManagementDepartment from './managementDepartment.model';

const createManagementDepartment = async (
  data: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.create(data);
};

const ManagementDepartmentService = {
  createManagementDepartment,
};

export default ManagementDepartmentService;
