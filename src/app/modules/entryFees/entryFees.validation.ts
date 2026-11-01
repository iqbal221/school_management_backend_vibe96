import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    admission: z.string({
      required_error: 'Admission is required',
    }),
    roll: z.string({
      required_error: 'Roll No is required',
    }),
    feesType: z.string({
      required_error: 'Fees Type is required',
    }),
    fees: z.string({
      required_error: 'Fees is required',
    }),
    entryDate: z.string({
      required_error: 'Date is required',
    }),
    comment: z.string({
      required_error: 'Comment is required',
    }),
    amount: z.number({
      required_error: 'Amount is required',
    }),
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

const createAuthorization = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'StudentId is required',
      })
      .optional(),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    approval: z
      .boolean({
        required_error: 'Approval is required',
      })
      .optional(),
  }),
});

const updateAuthorization = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'StudentId is required',
      })
      .optional(),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    approval: z
      .boolean({
        required_error: 'Approval is required',
      })
      .optional(),
  }),
});

export const EntryFeesValidation = {
  create,
  createAuthorization,
  update,
  updateAuthorization,
};
