import { z } from 'zod';

/* =========================================================
   CREATE USER
========================================================= */

const createUser = z.object({
  userId: z
    .string({
      required_error: 'User Id is required',
    })
    .min(1, 'User Id is required'),

  role: z
    .string({
      required_error: 'Role is required',
    })
    .min(1, 'Role is required'),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),

  name: z
    .string({
      required_error: 'Full Name is required',
    })
    .min(1, 'Full Name is required')
    .optional(),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .optional(),

  dateOfBirth: z
    .string({
      required_error: 'Date Of Birth is required',
    })
    .optional(),

  gender: z
    .string({
      required_error: 'Gender is required',
    })
    .optional(),

  religious: z
    .string({
      required_error: 'Religious is required',
    })
    .optional(),

  bloodGroup: z
    .string({
      required_error: 'Blood Group is required',
    })
    .optional(),

  contactNo: z
    .string({
      required_error: 'Contact No is required',
    })
    .optional(),

  emergencyContactNo: z
    .string({
      required_error: 'Emergency Contact No is required',
    })
    .optional(),

  address: z
    .string({
      required_error: 'Address is required',
    })
    .optional(),

  designation: z
    .string({
      required_error: 'Designation is required',
    })
    .optional(),

  /*
   * This is NOT the uploaded File.
   *
   * The actual image comes through:
   * req.file
   *
   * After Cloudinary upload, backend can set:
   * profileImage = cloudinaryUrl
   */
  profileImage: z.string().url('Invalid profile image URL').optional(),
});

/* =========================================================
   UPDATE USER
========================================================= */

const updateUser = z.object({
  userId: z.string().optional(),

  role: z.string().optional(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),

  name: z.string().optional(),

  designation: z.string().optional(),

  dateOfBirth: z.string().optional(),

  bloodGroup: z.string().optional(),

  gender: z.string().optional(),

  religious: z.string().optional(),

  email: z.string().email('Invalid email address').optional(),

  contactNo: z.string().optional(),

  emergencyContactNo: z.string().optional(),

  address: z.string().optional(),

  /*
   * Cloudinary URL only.
   *
   * The uploaded image itself is handled by Multer:
   * req.file
   */
  profileImage: z.string().url('Invalid profile image URL').optional(),
});

/* =========================================================
   EXPORT
========================================================= */

export const UserValidation = {
  createUser,
  updateUser,
};
