
import { prisma } from "../../../../../shared/prisma";

interface CreateNoticePayload {
  text: string;
  documentUrl?: string;
  documentName?: string;
}

interface UpdateNoticePayload {
  text?: string;
  documentUrl?: string | null;
  documentName?: string | null;
}

const createNotice = async ({
  text,
  documentUrl,
  documentName,
}: CreateNoticePayload) => {
  const Notice = await prisma.notice.create({
    data: {
      text: text.trim(),
      documentUrl: documentUrl ?? null,
      documentName: documentName ?? null,
    },
  });

  return Notice;
};

const getNotice = async () => {
  return await prisma.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getNoticeById = async (notice_id: string) => {
  return await prisma.notice.findUnique({
    where: {
      notice_id,
    },
  });
};

const updateNotice = async (
  notice_id: string,
  payload: UpdateNoticePayload,
) => {
  const Notice = await prisma.notice.update({
    where: {
      notice_id,
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

  return Notice;
};

const deleteNotice = async (notice_id: string) => {
  return await prisma.notice.delete({
    where: {
      notice_id,
    },
  });
};

export const NoticeService = {
  createNotice,
  getNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
};