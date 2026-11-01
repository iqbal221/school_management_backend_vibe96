"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    admission: zod_1.z.string({
        required_error: 'Admission is required',
    }),
    roll: zod_1.z.string({
        required_error: 'Roll No is required',
    }),
    fatherName: zod_1.z.string({
        required_error: 'Father Name is required',
    }),
    motherName: zod_1.z.string({
        required_error: 'Mother Name is required',
    }),
    contact: zod_1.z.string({
        required_error: 'Contact No is required',
    }),
    emergencyContactNo: zod_1.z.string({
        required_error: 'Contact No is required',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    gender: zod_1.z.string({
        required_error: 'Gender is required',
    }),
    religious: zod_1.z.string({
        required_error: 'Religious is required',
    }),
    dateOfBirth: zod_1.z.string({
        required_error: 'Date Of Birth is required',
    }),
    bloodGroup: zod_1.z.string({
        required_error: 'Blood Group is required',
    }),
    address: zod_1.z.string({
        required_error: 'Address is required',
    }),
});
const uploadResult = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    admission: zod_1.z.string({
        required_error: 'Admission is required',
    }),
    roll: zod_1.z.string({
        required_error: 'Roll No is required',
    }),
    banglaMarks: zod_1.z.string({
        required_error: 'Bangla Marks is required',
    }),
    banglaGrade: zod_1.z.string({
        required_error: 'Bangla Grade is required',
    }),
    englishMarks: zod_1.z.string({
        required_error: 'English Marks is required',
    }),
    englishGrade: zod_1.z.string({
        required_error: 'English Grade is required',
    }),
    mathematicsMarks: zod_1.z.string({
        required_error: 'Mathematics Marks is required',
    }),
    mathematicsGrade: zod_1.z.string({
        required_error: 'Mathematics Grade is required',
    }),
    scienceMarks: zod_1.z.string({
        required_error: 'Science Marks is required',
    }),
    scienceGrade: zod_1.z.string({
        required_error: 'Science Grade is required',
    }),
    religiousMarks: zod_1.z.string({
        required_error: 'Religious Marks is required',
    }),
    religiousGrade: zod_1.z.string({
        required_error: 'Religious Grade is required',
    }),
    point: zod_1.z.string({
        required_error: 'Point is required',
    }),
    grade: zod_1.z.string({
        required_error: 'Grade is required',
    }),
});
const update = zod_1.z.object({
    name: zod_1.z.string().optional(),
    admission: zod_1.z.string().optional(),
    roll: zod_1.z.string().optional(),
    fatherName: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    contact: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
    religious: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    image: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.StudentValidation = {
    create,
    uploadResult,
    update,
};
