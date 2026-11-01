import { prisma } from '../../../../../shared/prisma';

const createRecentNews = async (text: string) => {
  const lastNews = await prisma.recentNews.findFirst({
    orderBy: {
      order: 'desc',
    },
  });

  const news = await prisma.recentNews.create({
    data: {
      text: text.trim(),
      order: lastNews ? lastNews.order + 1 : 0,
    },
  });

  return news;
};

const getRecentNews = async () => {
  const news = await prisma.recentNews.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return news;
};

const getRecentNewsById = async (id: string) => {
  const news = await prisma.recentNews.findUnique({
    where: {
      id,
    },
  });

  return news;
};

const updateRecentNews = async (
  id: string,
  payload: {
    text?: string;
    isActive?: boolean;
    order?: number;
  }
) => {
  const news = await prisma.recentNews.update({
    where: {
      id,
    },
    data: {
      ...(payload.text !== undefined && {
        text: payload.text.trim(),
      }),

      ...(payload.isActive !== undefined && {
        isActive: payload.isActive,
      }),

      ...(payload.order !== undefined && {
        order: payload.order,
      }),
    },
  });

  return news;
};

const deleteRecentNews = async (id: string) => {
  const news = await prisma.recentNews.delete({
    where: {
      id,
    },
  });

  return news;
};

export const RecentNewsService = {
  createRecentNews,
  getRecentNews,
  getRecentNewsById,
  updateRecentNews,
  deleteRecentNews,
};
