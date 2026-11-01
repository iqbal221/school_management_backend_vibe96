import { Request, Response } from 'express';
import { RecentNewsService } from './recentNews.service';

const createRecentNews = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    console.log('Rexen', text);

    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'News text is required',
      });
    }

    const news = await RecentNewsService.createRecentNews(text);
    console.log(news);

    return res.status(201).json({
      success: true,
      message: 'Recent news created successfully',
      data: news,
    });
  } catch (error) {
    console.error('Create Recent News Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create recent news',
    });
  }
};

const getRecentNews = async (req: Request, res: Response) => {
  try {
    const news = await RecentNewsService.getRecentNews();

    return res.status(200).json({
      success: true,
      message: 'Recent news retrieved successfully',
      data: news,
    });
  } catch (error) {
    console.error('Get Recent News Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent news',
    });
  }
};

const getRecentNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const news = await RecentNewsService.getRecentNewsById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Recent news not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recent news retrieved successfully',
      data: news,
    });
  } catch (error) {
    console.error('Get Recent News By ID Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent news',
    });
  }
};

const updateRecentNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, isActive, order } = req.body;

    if (text !== undefined) {
      if (typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({
          success: false,
          message: 'News text cannot be empty',
        });
      }
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean',
      });
    }

    let parsedOrder: number | undefined;

    if (order !== undefined) {
      parsedOrder = Number(order);

      if (!Number.isInteger(parsedOrder) || parsedOrder < 0) {
        return res.status(400).json({
          success: false,
          message: 'Order must be a non-negative integer',
        });
      }
    }

    const existingNews = await RecentNewsService.getRecentNewsById(id);

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'Recent news not found',
      });
    }

    const news = await RecentNewsService.updateRecentNews(id, {
      ...(text !== undefined && {
        text: text.trim(),
      }),
      ...(isActive !== undefined && {
        isActive,
      }),
      ...(parsedOrder !== undefined && {
        order: parsedOrder,
      }),
    });

    return res.status(200).json({
      success: true,
      message: 'Recent news updated successfully',
      data: news,
    });
  } catch (error) {
    console.error('Update Recent News Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update recent news',
    });
  }
};

const deleteRecentNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingNews = await RecentNewsService.getRecentNewsById(id);

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'Recent news not found',
      });
    }

    await RecentNewsService.deleteRecentNews(id);

    return res.status(200).json({
      success: true,
      message: 'Recent news deleted successfully',
    });
  } catch (error) {
    console.error('Delete Recent News Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete recent news',
    });
  }
};

export const RecentNewsController = {
  createRecentNews,
  getRecentNews,
  getRecentNewsById,
  updateRecentNews,
  deleteRecentNews,
};
