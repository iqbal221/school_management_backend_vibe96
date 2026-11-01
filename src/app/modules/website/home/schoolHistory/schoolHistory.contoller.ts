import { Request, Response } from 'express';
import { SchoolHistoryService } from './schoolHistory.service';



// =====================================
// Create School History
// =====================================
const createSchoolHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { sectionTitle, aboutSchool } = req.body;

    // Validate section title
    if (
      typeof sectionTitle !== 'string' ||
      !sectionTitle.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Section title is required',
      });
    }

    // Validate about school
    if (
      typeof aboutSchool !== 'string' ||
      !aboutSchool.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'About school is required',
      });
    }

    // Check existing record
    const existing =
      await SchoolHistoryService.getSchoolHistory();

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          'School history already exists. Please update the existing record.',
        data: existing,
      });
    }

    // Create
    const result =
      await SchoolHistoryService.createSchoolHistory({
        sectionTitle: sectionTitle.trim(),
        aboutSchool: aboutSchool.trim(),
      });

    return res.status(201).json({
      success: true,
      message: 'School history added successfully',
      data: result,
    });
  } catch (error: any) {
    console.error(
      'Create School History Error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        'Failed to add school history',
    });
  }
};

// =====================================
// Get School History
// =====================================
const getSchoolHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await SchoolHistoryService.getSchoolHistory();

    return res.status(200).json({
      success: true,
      message: 'School history retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(
      'Get School History Error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve school history',
    });
  }
};



// =====================================
// Update School History
// =====================================
const updateSchoolHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { sectionTitle, aboutSchool } = req.body;

   
    // Update
    const result =
      await SchoolHistoryService.updateSchoolHistory({
        sectionTitle: sectionTitle.trim(),
        aboutSchool: aboutSchool.trim(),
      });

    return res.status(200).json({
      success: true,
      message: 'School history updated successfully',
      data: result,
    });
  } catch (error) {
    console.error(
      'Update School History Error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to update school history',
    });
  }
};

// =====================================
// Export Controller
// =====================================
export const SchoolHistoryController = {
  createSchoolHistory,
  getSchoolHistory,
  updateSchoolHistory,
};