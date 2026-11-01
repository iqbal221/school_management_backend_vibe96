"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
/* =========================================================
   CREATE USER
========================================================= */
const createUser = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User Id is required',
    })
        .min(1, 'User Id is required'),
    role: zod_1.z
        .string({
        required_error: 'Role is required',
    })
        .min(1, 'Role is required'),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
    })
        .min(6, 'Password must be at least 6 characters'),
    name: zod_1.z
        .string({
        required_error: 'Full Name is required',
    })
        .min(1, 'Full Name is required')
        .optional(),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Invalid email address')
        .optional(),
    dateOfBirth: zod_1.z
        .string({
        required_error: 'Date Of Birth is required',
    })
        .optional(),
    gender: zod_1.z
        .string({
        required_error: 'Gender is required',
    })
        .optional(),
    religious: zod_1.z
        .string({
        required_error: 'Religious is required',
    })
        .optional(),
    bloodGroup: zod_1.z
        .string({
        required_error: 'Blood Group is required',
    })
        .optional(),
    contactNo: zod_1.z
        .string({
        required_error: 'Contact No is required',
    })
        .optional(),
    emergencyContactNo: zod_1.z
        .string({
        required_error: 'Emergency Contact No is required',
    })
        .optional(),
    address: zod_1.z
        .string({
        required_error: 'Address is required',
    })
        .optional(),
    designation: zod_1.z
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
    profileImage: zod_1.z.string().url('Invalid profile image URL').optional(),
});
/* =========================================================
   UPDATE USER
========================================================= */
const updateUser = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
    name: zod_1.z.string().optional(),
    designation: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
    religious: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Invalid email address').optional(),
    contactNo: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    /*
     * Cloudinary URL only.
     *
     * The uploaded image itself is handled by Multer:
     * req.file
     */
    profileImage: zod_1.z.string().url('Invalid profile image URL').optional(),
});
/* =========================================================
   EXPORT
========================================================= */
exports.UserValidation = {
    createUser,
    updateUser,
};
