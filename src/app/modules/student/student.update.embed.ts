/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent } from './student.interface';

const updateEmbeded = (
  field: Record<string, unknown>,
  data: Partial<IStudent>,
  nameString: string
): Partial<IStudent> => {
  Object.keys(field).forEach(key => {
    const filedInner = `${nameString}.${key}`;
    (data as any)[filedInner] = field[key as keyof typeof field];
  });
  return data;
};

export default updateEmbeded;
