"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    designation: zod_1.z.string({
        required_error: 'Designation is required',
    }),
    contact: zod_1.z.string({
        required_error: 'Contact No is required',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    bloodGroup: zod_1.z.string({
        required_error: 'Blood Group is required',
    }),
    address: zod_1.z.string({
        required_error: 'Address is required',
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contact: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.OfficialValidation = {
    create,
    update,
};
