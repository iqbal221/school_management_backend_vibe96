import { Request, Response } from 'express';

import { StudentAttendanceService } from './studentAttendance.service';


// =======================================================
// CREATE STUDENT ATTENDANCE
// =======================================================

const createStudentAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await StudentAttendanceService.createStudentAttendance(
        req.body
      );

      console.log('createStudentAttendance result:', result);

    res.status(201).json({
      success: true,

      message:
        'Student attendance created successfully',

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error?.message ||
        'Failed to create student attendance',

      error,
    });
  }
};


// =======================================================
// GET ALL STUDENT ATTENDANCE
// =======================================================

const getAllStudentAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await StudentAttendanceService.getAllStudentAttendance(
        req.query
      );

    res.status(200).json({
      success: true,

      message:
        'Student attendance retrieved successfully',

      meta: result.meta,

      data: result.data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error?.message ||
        'Failed to retrieve student attendance',

      error,
    });
  }
};


// =======================================================
// GET SINGLE ATTENDANCE
// =======================================================

const getStudentAttendanceById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await StudentAttendanceService.getStudentAttendanceById(
        id
      );

    res.status(200).json({
      success: true,

      message:
        'Student attendance retrieved successfully',

      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,

      message:
        error?.message ||
        'Student attendance not found',

      error,
    });
  }
};


// =======================================================
// STUDENT ATTENDANCE HISTORY
// =======================================================

const getStudentAttendanceHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.params;

    const result =
      await StudentAttendanceService.getStudentAttendanceHistory(
        studentId,
        req.query
      );

    res.status(200).json({
      success: true,

      message:
        'Student attendance history retrieved successfully',

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error?.message ||
        'Failed to retrieve attendance history',

      error,
    });
  }
};


// =======================================================
// UPDATE ATTENDANCE
// =======================================================

const updateStudentAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await StudentAttendanceService.updateStudentAttendance(
        id,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        'Student attendance updated successfully',

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error?.message ||
        'Failed to update student attendance',

      error,
    });
  }
};


// =======================================================
// DELETE ATTENDANCE
// =======================================================

const deleteStudentAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await StudentAttendanceService.deleteStudentAttendance(
        id
      );

    res.status(200).json({
      success: true,

      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error?.message ||
        'Failed to delete student attendance',

      error,
    });
  }
};


export const StudentAttendanceController = {
  createStudentAttendance,
  getAllStudentAttendance,
  getStudentAttendanceById,
  getStudentAttendanceHistory,
  updateStudentAttendance,
  deleteStudentAttendance,
};