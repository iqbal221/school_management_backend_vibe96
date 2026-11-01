
import { Request, Response } from 'express';
import { NoticeService } from './notice.service';


/* =========================================================
   CREATE Notice
========================================================= */

const createNotice = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      text,
      documentUrl,
      documentName,
    } = req.body;

    console.log('Notice Text:', text);
    console.log('Document URL:', documentUrl);
    console.log('Document Name:', documentName);

    /* =====================================================
       VALIDATE TEXT
    ===================================================== */

    if (
      typeof text !== 'string' ||
      !text.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Notice text is required',
      });
    }

    /* =====================================================
       VALIDATE DOCUMENT URL
    ===================================================== */

    if (
      documentUrl !== undefined &&
      documentUrl !== null &&
      typeof documentUrl !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document URL',
      });
    }

    /* =====================================================
       VALIDATE DOCUMENT NAME
    ===================================================== */

    if (
      documentName !== undefined &&
      documentName !== null &&
      typeof documentName !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document name',
      });
    }

    /* =====================================================
       CREATE
    ===================================================== */

    const Notice =
      await NoticeService.createNotice({
        text: text.trim(),

        documentUrl:
          documentUrl?.trim() || null,

        documentName:
          documentName?.trim() || null,
      });

    console.log(
      'Created Notice:',
      Notice,
    );

    return res.status(201).json({
      success: true,
      message:
        'Recent Notice created successfully',
      data: Notice,
    });
  } catch (error) {
    console.error(
      'Create Recent Notice Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to create recent Notice',
    });
  }
};

/* =========================================================
   GET ALL Notice
========================================================= */

const getNotice = async (
  req: Request,
  res: Response,
) => {
  try {
    const Notice =
      await NoticeService.getNotice();

    return res.status(200).json({
      success: true,
      message:
        'Recent Notice retrieved successfully',
      data: Notice,
    });
  } catch (error) {
    console.error(
      'Get Recent Notice Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to retrieve recent Notice',
    });
  }
};

/* =========================================================
   GET Notice BY ID
========================================================= */

const getNoticeById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const Notice =
      await NoticeService.getNoticeById(id);

    if (!Notice) {
      return res.status(404).json({
        success: false,
        message:
          'Recent Notice not found',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Recent Notice retrieved successfully',
      data: Notice,
    });
  } catch (error) {
    console.error(
      'Get Recent Notice By ID Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to retrieve recent Notice',
    });
  }
};

/* =========================================================
   UPDATE Notice
========================================================= */

const updateNotice = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const {
      text,
      documentUrl,
      documentName,
      removeDocument,
    } = req.body;

    console.log(
      'Update Notice ID:',
      id,
    );

    console.log(
      'Update Notice Text:',
      text,
    );

    console.log(
      'Update Document URL:',
      documentUrl,
    );

    console.log(
      'Update Document Name:',
      documentName,
    );

    console.log(
      'Update Remove Document:',
      removeDocument,
    );

    /* =====================================================
       CHECK EXISTING Notice
    ===================================================== */

    const existingNotice =
      await NoticeService.getNoticeById(id);

    if (!existingNotice) {
      return res.status(404).json({
        success: false,
        message:
          'Recent Notice not found',
      });
    }

    /* =====================================================
       VALIDATE TEXT
    ===================================================== */

    if (text !== undefined) {
      if (
        typeof text !== 'string' ||
        !text.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Notice text cannot be empty',
        });
      }
    }

    /* =====================================================
       PARSE REMOVE DOCUMENT
    ===================================================== */

    const shouldRemoveDocument =
      removeDocument === true ||
      removeDocument === 'true';

    /* =====================================================
       UPDATE DATA
    ===================================================== */

    const updateData: {
      text?: string;
      documentUrl?: string | null;
      documentName?: string | null;
    } = {};

    /* =====================================================
       TEXT
    ===================================================== */

    if (text !== undefined) {
      updateData.text =
        text.trim();
    }

    /* =====================================================
       REMOVE DOCUMENT
    ===================================================== */

    if (shouldRemoveDocument) {
      updateData.documentUrl =
        null;

      updateData.documentName =
        null;
    }

    /* =====================================================
       NEW CLOUDINARY DOCUMENT
    ===================================================== */

    /*
     * If removeDocument is NOT true and a new
     * Cloudinary URL was provided, replace the
     * existing document.
     */

    if (
      !shouldRemoveDocument &&
      documentUrl !== undefined
    ) {
      if (
        documentUrl !== null &&
        typeof documentUrl !== 'string'
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid document URL',
        });
      }

      updateData.documentUrl =
        documentUrl?.trim() || null;

      /*
       * If documentName is not provided,
       * keep the existing document name.
       */
      if (
        documentName !== undefined
      ) {
        if (
          documentName !== null &&
          typeof documentName !== 'string'
        ) {
          return res.status(400).json({
            success: false,
            message:
              'Invalid document name',
          });
        }

        updateData.documentName =
          documentName?.trim() || null;
      }
    }

    /* =====================================================
       DOCUMENT NAME WITHOUT URL
    ===================================================== */

    /*
     * Normally documentUrl and documentName
     * are sent together.
     *
     * This handles the case where only
     * documentName is provided.
     */

    if (
      !shouldRemoveDocument &&
      documentUrl === undefined &&
      documentName !== undefined
    ) {
      if (
        documentName !== null &&
        typeof documentName !== 'string'
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid document name',
        });
      }

      updateData.documentName =
        documentName?.trim() || null;
    }

    console.log(
      'Final Notice Update Data:',
      updateData,
    );

    /* =====================================================
       UPDATE
    ===================================================== */

    const Notice =
      await NoticeService.updateNotice(
        id,
        updateData,
      );

    console.log(
      'Updated Notice:',
      Notice,
    );

    return res.status(200).json({
      success: true,
      message:
        'Recent Notice updated successfully',
      data: Notice,
    });
  } catch (error) {
    console.error(
      'Update Recent Notice Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to update recent Notice',
    });
  }
};

/* =========================================================
   DELETE Notice
========================================================= */

const deleteNotice = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    /* =====================================================
       CHECK EXISTING Notice
    ===================================================== */

    const existingNotice =
      await NoticeService.getNoticeById(id);

    if (!existingNotice) {
      return res.status(404).json({
        success: false,
        message:
          'Recent Notice not found',
      });
    }

    /* =====================================================
       DELETE
    ===================================================== */

    await NoticeService.deleteNotice(id);

    return res.status(200).json({
      success: true,
      message:
        'Recent Notice deleted successfully',
    });
  } catch (error) {
    console.error(
      'Delete Recent Notice Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to delete recent Notice',
    });
  }
};

/* =========================================================
   EXPORT
========================================================= */

export const NoticeController = {
  createNotice,
  getNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
};

