import User from './user.model';

const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const sendUserId = async (): Promise<string> => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  return (parseInt(currentId) + 1).toString().padStart(5, '0');
};

const findLastStrudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemester: {
    year: string;
    code: string;
  } | null
): Promise<string> => {
  const currentId =
    (await findLastStrudentId()) || '0'; /* (0).toString().padStart(5, '0'); */
  const increamentId = (parseInt(currentId, 10) + 1)
    .toString()
    .padStart(5, '0');
  return `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${increamentId}`;
};

const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findLastFacultyId()) || '0';
  const incrementId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
  return `F-${incrementId}`;
};

const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || '0';
  const incrementId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');
  return `A-${incrementId}`;
};
