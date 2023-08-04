/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdmin } from './admin.interface';

const updateEmbeded = (
  field: Record<string, unknown>,
  data: Partial<IAdmin>,
  nameString: string
): Partial<IAdmin> => {
  Object.keys(field).forEach(key => {
    const filedInner = `${nameString}.${key}`;
    (data as any)[filedInner] = field[key as keyof typeof field];
  });
  return data;
};

export default updateEmbeded;
