// import express, { NextFunction, Request, Response } from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
// import auth from '../../middlewares/auth';
// import { UserController } from './user.controller';
// import { UserValidation } from './user.validations';
// import { StudentController } from '../student/student.controller';

// const router = express.Router();

// router.post(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   FileUploadHelper.upload.array('file', 4),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log('routes', req.body.data);
//     req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
//     return UserController.InsertIntoDB(req, res, next);
//   }
// );

// router.get('/:id', UserController.getByIdFromDB);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   FileUploadHelper.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     // Parse JSON data coming from FormData
//     if (req.body.data) {
//       req.body = UserValidation.update.parse(JSON.parse(req.body.data));
//     }

//     return UserController.UpdateIntoDB(req, res, next);
//   }
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.deleteByIdFromDB
// );
// router.get('/', UserController.getAllFromDB);

// export const userRoutes = router;

import express, { NextFunction, Request, Response } from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';

import { UserController } from './user.controller';
import { UserValidation } from './user.validations';

const router = express.Router();

/* =========================================================
   CREATE USER
========================================================= */

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),

  // Upload profile image
  FileUploadHelper.upload.single('file'),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request body:', req.body);
      console.log('Uploaded file:', req.file);

      // FormData sends JSON as string
      if (!req.body.data) {
        return res.status(400).json({
          success: false,
          message: 'User data is required',
        });
      }

      // Parse JSON
      const parsedData = JSON.parse(req.body.data);

      // Validate JSON data
      req.body = UserValidation.createUser.parse(parsedData);

      // File remains available as req.file
      return UserController.InsertIntoDB(req, res, next);
    } catch (error) {
      return next(error);
    }
  }
);

/* =========================================================
   GET USER BY ID
========================================================= */

router.get('/:id', UserController.getByIdFromDB);

/* =========================================================
   UPDATE USER
========================================================= */

router.patch(
  '/:id',

  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),

  // Upload ONE profile image
  FileUploadHelper.upload.single('file'),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Update body:', req.body);
      console.log('Update file:', req.file);

      /*
       * FormData:
       *
       * data -> JSON string
       * file -> profile image
       */

      if (!req.body.data) {
        return res.status(400).json({
          success: false,
          message: 'User data is required',
        });
      }

      // Convert JSON string to object
      const parsedData = JSON.parse(req.body.data);

      // Validate using Zod
      const validatedData = UserValidation.updateUser.parse(parsedData);

      /*
       * Replace req.body with validated data.
       *
       * req.file is NOT removed.
       * Multer stores it separately in req.file.
       */
      req.body = validatedData;

      return UserController.updateOneInDB(req, res, next);
    } catch (error) {
      return next(error);
    }
  }
);

/* =========================================================
   DELETE USER
========================================================= */

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteByIdFromDB
);

/* =========================================================
   GET ALL USERS
========================================================= */

router.get('/', UserController.getAllFromDB);

export const userRoutes = router;
