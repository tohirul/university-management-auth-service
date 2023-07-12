import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemesterInDb = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  return await AcademicSemester.create(payload);
};

const AcademicSemesterService = {
  createSemesterInDb,
};

export default AcademicSemesterService;
