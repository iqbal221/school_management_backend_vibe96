import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../../config';
import ApiError from '../../../../errors/ApiError';
import { jwtHelpers } from '../../../../helpers/jwtHelpers';
import { prisma } from '../../../../shared/prisma';
import {
  ILoginUser,
  IUserLoginResponse,
} from './apps.auth.interface';


// ======================================================
// REGISTER USER
// ======================================================

const registerUser = async (
  payload: any
): Promise<any> => {
  const {
    name,
    email,
    password,
  } = payload;

  console.log(name, email, password);

  // Validate required fields
  if (!name || !email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Name, email and password are required'
    );
  }

  if (password.length < 6) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Password must be at least 6 characters'
    );
  }

  // Check existing email
  const existingUser = await prisma.appsUser.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User with this email already exists'
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.appsUser.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    },
  });

  return {
   user: {
      name: user.name,
      email: user.email,
    },
  };
};


// ======================================================
// LOGIN USER
// ======================================================

const loginUser = async (
  payload: ILoginUser
): Promise<IUserLoginResponse> => {
  const {
    email,
    password,
  } = payload;

  console.log(email, password);

  const isUserExist = await prisma.appsUser.findFirst({
    where: {
    email:email.trim().toLowerCase(),
    },
  });

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User does not exist'
    );
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Invalid password'
    );
  }

  // Create access token
  const accessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
   
  };
};


// ======================================================
// GET CURRENT USER
// ======================================================

const GetUser = async (
  userData: JwtPayload | null
) => {
  if (!userData?.email) {
    return null;
  }

  const result = await prisma.appsUser.findFirst({
    where: {
      email: userData.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};


export const AuthService = {
  registerUser,
  loginUser,
  GetUser,
};