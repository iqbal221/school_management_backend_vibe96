"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryFeesValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        admission: zod_1.z.string({
            required_error: 'Admission is required',
        }),
        roll: zod_1.z.string({
            required_error: 'Roll No is required',
        }),
        feesType: zod_1.z.string({
            required_error: 'Fees Type is required',
        }),
        fees: zod_1.z.string({
            required_error: 'Fees is required',
        }),
        entryDate: zod_1.z.string({
            required_error: 'Date is required',
        }),
        comment: zod_1.z.string({
            required_error: 'Comment is required',
        }),
        amount: zod_1.z.number({
            required_error: 'Amount is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        category: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
const createAuthorization = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z
            .string({
            required_error: 'StudentId is required',
        })
            .optional(),
        status: zod_1.z.boolean({
            required_error: 'Status is required',
        }),
        approval: zod_1.z
            .boolean({
            required_error: 'Approval is required',
        })
            .optional(),
    }),
});
const updateAuthorization = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z
            .string({
            required_error: 'StudentId is required',
        })
            .optional(),
        status: zod_1.z.boolean({
            required_error: 'Status is required',
        }),
        approval: zod_1.z
            .boolean({
            required_error: 'Approval is required',
        })
            .optional(),
    }),
});
exports.EntryFeesValidation = {
    create,
    createAuthorization,
    update,
    updateAuthorization,
};
