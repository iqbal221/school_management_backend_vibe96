/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { AuthService } from './apps.auth.service';

/**
 * Register User
 */
const registerUser: RequestHandler = async (req, res, next) => {
  const { ...registerData } = req.body;

  try {
    const result = await AuthService.registerUser(registerData);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login User
 */
const loginUser: RequestHandler = async (req, res, next) => {
  const { ...loginData } = req.body;

  try {
    const result = await AuthService.loginUser(loginData);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User login successfully',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Current User
 */
const GetUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthService.GetUser(req.user);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User fetch successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  registerUser,
  loginUser,
  GetUser,
};