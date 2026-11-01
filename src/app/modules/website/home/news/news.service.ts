
import { prisma } from "../../../../../shared/prisma";

interface CreateNewsPayload {
  text: string;
  documentUrl?: string;
  documentName?: string;
}

interface UpdateNewsPayload {
  text?: string;
  documentUrl?: string | null;
  documentName?: string | null;
}

const createNews = async ({
  text,
  documentUrl,
  documentName,
}: CreateNewsPayload) => {
  const news = await prisma.news.create({
    data: {
      text: text.trim(),
      documentUrl: documentUrl ?? null,
      documentName: documentName ?? null,
    },
  });

  return news;
};

const getNews = async () => {
  return await prisma.news.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getNewsById = async (news_id: string) => {
  return await prisma.news.findUnique({
    where: {
      news_id,
    },
  });
};

const updateNews = async (
  news_id: string,
  payload: UpdateNewsPayload,
) => {
  const news = await prisma.news.update({
    where: {
      news_id,
    },
    data: {
      ...(payload.text !== undefined && {
        text: payload.text.trim(),
      }),

      ...(payload.documentUrl !== undefined && {
        documentUrl: payload.documentUrl,
      }),

      ...(payload.documentName !== undefined && {
        documentName: payload.documentName,
      }),
    },
  });

  return news;
};

const deleteNews = async (news_id: string) => {
  return await prisma.news.delete({
    where: {
      news_id,
    },
  });
};

export const NewsService = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
};