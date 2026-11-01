"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serialNo: zod_1.z.string({
            required_error: 'Serial No is required',
        }),
        entryDate: zod_1.z.string({
            required_error: 'Entry Date is required',
        }),
        expenseHead: zod_1.z.string({
            required_error: 'Expense Head is required',
        }),
        expenseType: zod_1.z.string({
            required_error: 'Expense Type is required',
        }),
        amount: zod_1.z.number({
            required_error: 'Amount is required',
        }),
        comment: zod_1.z.string({
            required_error: 'Comment is required',
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
exports.ExpenseValidation = {
    create,
    update,
};
