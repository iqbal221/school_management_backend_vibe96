import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';
import { SchoolLeadershipController } from './schoolLeadership.controller';


const router = express.Router();

// =========================================================
// CREATE SCHOOL HEADER
// =========================================================

router.post(
  '/',
  FileUploadHelper.upload.fields([
    {
      name: 'founderImage',
      maxCount: 1,
    },
    {
      name: 'principalImage',
      maxCount: 1,
    },
  ]),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('========== CREATE SCHOOL LEADERSHIP ==========');

      console.log('BODY BEFORE PARSE:', req.body);
      console.log('FILES:', req.files);

      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }

      console.log('BODY AFTER PARSE:', req.body);

      return SchoolLeadershipController.createSchoolLeadership(
        req,
        res,
        next
      
      );
    } catch (error) {
      console.error('CREATE SCHOOL LEADERSHIP ERROR:', error);
      next(error);
    }
  }
);

// =========================================================
// GET ALL SCHOOL HEADERS
// =========================================================

router.get('/', SchoolLeadershipController.getSchoolLeadership);


// =========================================================
// UPDATE SCHOOL HEADER
// =========================================================

// UPDATE SCHOOL LEADERSHIP
// =========================================================

router.patch(
  '/:id',

  FileUploadHelper.upload.fields([
    {
      name: 'founderImage',
      maxCount: 1,
    },
    {
      name: 'principalImage',
      maxCount: 1,
    },
  ]),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        '========== UPDATE SCHOOL LEADERSHIP =========='
      );

  
      console.log('BODY BEFORE PARSE:', req.body);
      console.log('FILES:', req.files);

      // =========================================
      // PARSE JSON DATA
      // =========================================

      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }

      console.log('BODY AFTER PARSE:', req.body);
      console.log('FILES AFTER PARSE:', req.files);

      return SchoolLeadershipController.updateSchoolLeadership(
        req,
        res,
        next
      );
    } catch (error) {
      console.error(
        'UPDATE SCHOOL LEADERSHIP ERROR:',
        error
      );

      next(error);
    }
  }
);

// =========================================================
// DELETE SCHOOL HEADER
// =========================================================

router.delete(
  '/:id',

  SchoolLeadershipController.deleteSchoolLeadership
);

export const SchoolLeadershipRoutes = router;