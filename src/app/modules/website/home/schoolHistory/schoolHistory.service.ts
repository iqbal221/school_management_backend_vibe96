import { prisma } from '../../../../../shared/prisma';
import { ISchoolHistory } from './schoolHistory.interface';


// =====================================
// Create School History
// =====================================
const createSchoolHistory = async (
  data: ISchoolHistory
): Promise<ISchoolHistory> => {
  const existing = await prisma.schoolHistory.findFirst();

  if (existing) {
    throw new Error(
      'School history already exists. Please update the existing record.'
    );
  }

  const result = await prisma.schoolHistory.create({
    data: {
      sectionTitle: data.sectionTitle,
      aboutSchool: data.aboutSchool,
    },
  });

  return result;
};


// =====================================
// Get School History
// =====================================
const getSchoolHistory = async (): Promise<ISchoolHistory | null> => {
  const result = await prisma.schoolHistory.findFirst({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return result;
};


// =====================================
// Update School History
// =====================================
const updateSchoolHistory = async (
  data: ISchoolHistory
): Promise<ISchoolHistory> => {
  const existing = await prisma.schoolHistory.findFirst({
    orderBy: {
      createdAt: 'asc',
    },
  });
  console.log('Existing School History:', existing);

  if (!existing) {
    throw new Error(
      'School history not found. Please add school history first.'
    );
  }

  const result = await prisma.schoolHistory.update({
    where: {
      id: existing.id,
    },
    data: {
      sectionTitle: data.sectionTitle,
      aboutSchool: data.aboutSchool,
    },
  });

  return result;
};

export const SchoolHistoryService = {
  createSchoolHistory,
  getSchoolHistory,
  updateSchoolHistory,
};