import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';

import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Configure multer to store files in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5500000 },
});

const uploadToCloudinary = async (
  fileBuffer: Buffer,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error('Cloudinary upload failed: No result returned'));
        }
      },
    );

    uploadStream.end(fileBuffer);
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};