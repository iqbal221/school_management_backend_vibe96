
import type { Request } from 'express';

export interface StudentFaceRegistrationBody {
  studentId: string;
  faceEmbedding: string | number[];
}

export interface StudentFaceRegistrationRequest
  extends Request {
  body: StudentFaceRegistrationBody;
  file?: Express.Multer.File;
}

export interface FaceImageUploadResult {
  imageUrl: string;
  publicId: string;
}

export interface StudentFaceRegistrationResult {
  id: string;
  faceImageUrl: string;
  faceImagePublicId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
