import { z } from 'zod';

const create = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  admission: z.string({
    required_error: 'Admission is required',
  }),
  roll: z.string({
    required_error: 'Roll No is required',
  }),
  fatherName: z.string({
    required_error: 'Father Name is required',
  }),
  motherName: z.string({
    required_error: 'Mother Name is required',
  }),
  contact: z.string({
    required_error: 'Contact No is required',
  }),
  emergencyContactNo: z.string({
    required_error: 'Contact No is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  gender: z.string({
    required_error: 'Gender is required',
  }),
  religious: z.string({
    required_error: 'Religious is required',
  }),
  dateOfBirth: z.string({
    required_error: 'Date Of Birth is required',
  }),
  bloodGroup: z.string({
    required_error: 'Blood Group is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
});

const uploadResult = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  admission: z.string({
    required_error: 'Admission is required',
  }),
  roll: z.string({
    required_error: 'Roll No is required',
  }),
  banglaMarks: z.string({
    required_error: 'Bangla Marks is required',
  }),
  banglaGrade: z.string({
    required_error: 'Bangla Grade is required',
  }),
  englishMarks: z.string({
    required_error: 'English Marks is required',
  }),
  englishGrade: z.string({
    required_error: 'English Grade is required',
  }),
  mathematicsMarks: z.string({
    required_error: 'Mathematics Marks is required',
  }),
  mathematicsGrade: z.string({
    required_error: 'Mathematics Grade is required',
  }),
  scienceMarks: z.string({
    required_error: 'Science Marks is required',
  }),
  scienceGrade: z.string({
    required_error: 'Science Grade is required',
  }),
  religiousMarks: z.string({
    required_error: 'Religious Marks is required',
  }),
  religiousGrade: z.string({
    required_error: 'Religious Grade is required',
  }),
  point: z.string({
    required_error: 'Point is required',
  }),
  grade: z.string({
    required_error: 'Grade is required',
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const StudentValidation = {
  create,
  uploadResult,
  update,
};
