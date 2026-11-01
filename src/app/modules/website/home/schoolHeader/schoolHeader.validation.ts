// import { z } from 'zod';

// const createSchoolHeader = z.object({
//   body: z.object({
//     schoolName: z
//       .string({
//         required_error: 'School name is required',
//       })
//       .trim()
//       .min(1, 'School name is required')
//       .max(200, 'School name cannot exceed 200 characters'),

//     slogan: z
//       .string()
//       .trim()
//       .max(300, 'Slogan cannot exceed 300 characters')
//       .optional(),

//     isActive: z.boolean().optional(),
//   }),
// });

// const updateSchoolHeader = z.object({
//   body: z.object({
//     schoolName: z.string().trim().min(1).max(200).optional(),

//     slogan: z.string().trim().max(300).optional(),

//     isActive: z.boolean().optional(),
//   }),
// });

// export const SchoolHeaderValidation = {
//   createSchoolHeader,
//   updateSchoolHeader,
// };
