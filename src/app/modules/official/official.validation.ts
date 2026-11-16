import { z } from 'zod';

const create = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  officialId: z.string({
    required_error: 'OfficialId is required',
  }),
  designation: z.string({
    required_error: 'Designation is required',
  }),
  contact: z.string({
    required_error: 'Contact No is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  bloodGroup: z.string({
    required_error: 'Blood Group is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    officialId: z.string().optional(),
    designation: z.string().optional(),
    email: z.string().optional(),
    contact: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const OfficialValidation = {
  create,
  update,
};
