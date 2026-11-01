import { User } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { prisma } from '../../../shared/prisma';

type MulterRequest = {
  files: any;
  file?: Express.Multer.File;
  params: any; // Adjust the type of 'files' according to your implementation
} & Request;

const InsertIntoDB = async (req: MulterRequest): Promise<User> => {


  // 2. Support both single and multiple uploaded files
  const files = req.file
    ? [req.file]
    : Array.isArray(req.files)
      ? req.files
      : req.files && !Array.isArray(req.files)
        ? Object.values(req.files).flat()
        : [];

  const imageUrlList: string[] = [];

  for (const file of files) {
    // Use buffer for memoryStorage, path for diskStorage
    const uploadedImage = file.path
      ? await FileUploadHelper.uploadToCloudinary(file.path)
      : await FileUploadHelper.uploadToCloudinary(file.buffer);

    if (uploadedImage?.secure_url) {
      imageUrlList.push(uploadedImage.secure_url);
    }
  }

  const data: any = req.body;
  console.log('hello', data);
  data.profileImage = imageUrlList;

  if (data.dateOfBirth) {
    const dateString = data.dateOfBirth;
    const dateObject = new Date(dateString);
    // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    data.dateOfBirth = isoString;
  }

  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (req: MulterRequest): Promise<User> => {
  const { id } = req.params;

  const data: any = req.body;

  console.log('Update data:', data);
  console.log('Uploaded file:', req.file);

  // Only update image when a new image is selected
  if (req.file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(
      req.file.buffer
    );

    if (uploadedImage?.secure_url) {
      data.profileImage = [uploadedImage.secure_url];
    }
  }

  if (data.dateOfBirth) {
    const dateObject = new Date(data.dateOfBirth);

    if (!isNaN(dateObject.getTime())) {
      data.dateOfBirth = dateObject;
    }
  }

  delete data.file;

  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteByIdFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  InsertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  UpdateIntoDB,
  deleteByIdFromDB,
};
