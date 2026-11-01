import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';
import { SchoolHeaderController } from './schoolHeader.controller';

const router = express.Router();

// =========================================================
// CREATE SCHOOL HEADER
// =========================================================

router.post(
  '/',

  FileUploadHelper.upload.single('file'),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('========== CREATE SCHOOL HEADER ==========');


      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }

      // console.log('PARSED BODY:', req.body);

      return SchoolHeaderController.createSchoolHeader(req, res, next);
    } catch (error) {
     console.log(error)
    }
  }
);

// =========================================================
// GET ALL SCHOOL HEADERS
// =========================================================

router.get('/', SchoolHeaderController.getSchoolHeaders);

// =========================================================
// GET ACTIVE SCHOOL HEADER
// =========================================================

router.get('/active', SchoolHeaderController.getActiveSchoolHeader);

// =========================================================
// GET SCHOOL HEADER BY ID
// =========================================================

router.get('/:id', SchoolHeaderController.getSchoolHeaderById);

// =========================================================
// UPDATE SCHOOL HEADER
// =========================================================

router.patch(
  '/:id',

  FileUploadHelper.upload.single('file'),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('========== UPDATE SCHOOL HEADER ==========');

      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }

      console.log('PARSED BODY:', req.body.data);

      return SchoolHeaderController.updateSchoolHeader(req, res, next);
    } catch (error) {
      return next(error);
    }
  }
);

// =========================================================
// DELETE SCHOOL HEADER
// =========================================================

router.delete(
  '/:id',

  SchoolHeaderController.deleteSchoolHeader
);

export const SchoolHeaderRoutes = router;