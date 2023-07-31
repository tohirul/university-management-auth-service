/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFaculty } from './faculty.interface';

const updateEmbeded = (
  field: Record<string, unknown>,
  data: Partial<IFaculty>,
  nameString: string
): Partial<IFaculty> => {
  Object.keys(field).forEach(key => {
    const filedInner = `${nameString}.${key}`;
    (data as any)[filedInner] = field[key as keyof typeof field];
  });
  return data;
};

export default updateEmbeded;
