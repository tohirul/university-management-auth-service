import { z } from 'zod';

export const studentNameSubdocument = z.object({
  firstName: z.string({
    required_error: 'Please enter First Name',
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: 'Please enter Last Name',
  }),
});

export const guardianSubdocument = z.object({
  fatherName: z.string({
    required_error: 'Please enter your fathers Name',
  }),
  fatherOccupation: z.string({
    required_error: 'Please enter your fathers current occupation',
  }),
  fatherContactNo: z.string({
    required_error: 'Please enter your fathers Contact No',
  }),
  motherName: z.string({
    required_error: 'Please enter your mothers Name',
  }),
  motherOccupation: z.string({
    required_error: 'Please enter your mothers occupation',
  }),
  motherContactNo: z.string({
    required_error: 'Please enter your mothers Contact No',
  }),
  address: z.string({
    required_error: 'Please enter your guardians present Address',
  }),
});

export const localGuardianSubdocument = z.object({
  name: z.string({
    required_error: 'Please enter your local guardians name',
  }),
  occupation: z.string({
    required_error: 'Please enter your local guardians occupation',
  }),
  contactNo: z.string({
    required_error: 'Please enter your local guardian Contact No',
  }),
  address: z.string({
    required_error: 'Please enter your local guardians address',
  }),
});
