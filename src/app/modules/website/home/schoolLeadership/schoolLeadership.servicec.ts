
import { prisma } from '../../../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../../../errors/ApiError';
import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';
import {
  ISchoolLeadership
} from './schoolLeadership.interface';

type MulterRequest = Request & {
  file?: Express.Multer.File;
  files: any;
  params: {
    id?: string;
  };
};


/**
 * Create School Leadership
 */

const createSchoolLeadership = async (
  req: MulterRequest
): Promise<ISchoolLeadership> => {
  const { founderName, principalName }:any = req.body;

  console.log('========== CREATE SCHOOL LEADERSHIP ==========');
  console.log('BODY:', req.body);
  console.log('FILES:', req.files);

  // =========================================
  // VALIDATE TEXT
  // =========================================

  if (!founderName?.trim()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Founder name is required'
    );
  }

  if (!principalName?.trim()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Principal name is required'
    );
  }

  // =========================================
  // GET FILES
  // =========================================

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const founderFile = files?.founderImage?.[0];
  const principalFile = files?.principalImage?.[0];

  // =========================================
  // VALIDATE FOUNDER FILE
  // =========================================

  if (!founderFile) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Founder image is required'
    );
  }

  // =========================================
  // VALIDATE PRINCIPAL FILE
  // =========================================

  if (!principalFile) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Principal image is required'
    );
  }

  // =========================================
  // UPLOAD FOUNDER IMAGE
  // =========================================

  console.log(
    'Uploading founder:',
    founderFile.originalname
  );

  const founderUpload =
    await FileUploadHelper.uploadToCloudinary(
      founderFile.buffer
    );

  console.log(
    'Founder Cloudinary result:',
    founderUpload
  );

  if (!founderUpload?.secure_url) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Founder image upload failed'
    );
  }

  const founderImage: string =
    founderUpload.secure_url;

  // =========================================
  // UPLOAD PRINCIPAL IMAGE
  // =========================================

  console.log(
    'Uploading principal:',
    principalFile.originalname
  );

  const principalUpload =
    await FileUploadHelper.uploadToCloudinary(
      principalFile.buffer
    );

  console.log(
    'Principal Cloudinary result:',
    principalUpload
  );

  if (!principalUpload?.secure_url) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Principal image upload failed'
    );
  }

  const principalImage: string =
    principalUpload.secure_url;

  // =========================================
  // IMPORTANT DEBUG
  // =========================================

  console.log('========== CLOUDINARY URLS ==========');
  console.log('Founder Image:', founderImage);
  console.log('Principal Image:', principalImage);

  // =========================================
  // DATABASE
  // =========================================

  const result = await prisma.schoolLeadership.create({
    data: {
      founderName: founderName.trim(),
      principalName: principalName.trim(),

      founderImage: founderImage,
      principalImage: principalImage,
    },
  });

  console.log(
    'School leadership created:',
    result
  );

  return result;
};


/**
 * Get School Leadership

 */
const getSchoolLeadership =
  async (): Promise<ISchoolLeadership | null> => {
    const result =
      await prisma.schoolLeadership.findFirst({
        orderBy: {
          createdAt: 'asc',
        },
      });

    return result;
  };

/**
 * Update School Leadership
 *
 * Images are optional during update.
 * If a new image is not provided,
 * the existing image remains unchanged.
 */
const updateSchoolLeadership = async (
  req: MulterRequest
): Promise<ISchoolLeadership> => {
  const { id } = req.params;

  const data: any = req.body;

  console.log(
    "========== UPDATE SCHOOL LEADERSHIP SERVICE =========="
  );

  console.log("ID:", id);
  console.log("Update data:", data);
  console.log("Files:", req.files);

  // --------------------------------------------------
  // Find existing record
  // --------------------------------------------------

  const existing =
    await prisma.schoolLeadership.findUnique({
      where: {
        id,
      },
    });

  if (!existing) {
    throw new Error(
      "School leadership not found."
    );
  }

  // --------------------------------------------------
  // Get uploaded files
  // --------------------------------------------------

  const files = req.files as {
    founderImage?: Express.Multer.File[];
    principalImage?: Express.Multer.File[];
  };

  const founderImage =
    files?.founderImage?.[0];

  const principalImage =
    files?.principalImage?.[0];

  console.log(
    "Founder image:",
    founderImage
      ? {
          name: founderImage.originalname,
          type: founderImage.mimetype,
          size: founderImage.size,
        }
      : null
  );

  console.log(
    "Principal image:",
    principalImage
      ? {
          name: principalImage.originalname,
          type: principalImage.mimetype,
          size: principalImage.size,
        }
      : null
  );

  // --------------------------------------------------
  // Founder image upload
  // --------------------------------------------------

  if (founderImage) {
    const uploadedFounderImage =
      await FileUploadHelper.uploadToCloudinary(
        founderImage.buffer
      );

    console.log(
      "Uploaded founder image:",
      uploadedFounderImage
    );

    if (uploadedFounderImage?.secure_url) {
      data.founderImage =
        uploadedFounderImage.secure_url;
    }
  }

  // --------------------------------------------------
  // Principal image upload
  // --------------------------------------------------

  if (principalImage) {
    const uploadedPrincipalImage =
      await FileUploadHelper.uploadToCloudinary(
        principalImage.buffer
      );

    console.log(
      "Uploaded principal image:",
      uploadedPrincipalImage
    );

    if (uploadedPrincipalImage?.secure_url) {
      data.principalImage =
        uploadedPrincipalImage.secure_url;
    }
  }

  // --------------------------------------------------
  // Update database
  // --------------------------------------------------

  return await prisma.schoolLeadership.update({
    where: {
      id,
    },
    data,
  });
};
/**
 * Delete School Leadership
 */
const deleteSchoolLeadership =
  async (): Promise<ISchoolLeadership> => {
    const existing =
      await getSchoolLeadership();

    if (!existing) {
      throw new Error(
        'School leadership not found.',
      );
    }

    const result =
      await prisma.schoolLeadership.delete({
        where: {
          id: existing.id,
        },
      });

    return result;
  };

export const SchoolLeadershipService = {
  getSchoolLeadership,
  createSchoolLeadership,
  updateSchoolLeadership,
  deleteSchoolLeadership,
};
