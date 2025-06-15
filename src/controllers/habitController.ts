import { Request, Response } from "express";
import { ApiResponse, AuthenticatedRequest, UpdateHabitPayload } from "../types";
import { HabitService } from "../services/habitService";

export class HabitController {

    static async createHabit(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user) {
                res.status(400).json({
                    success: 'false',
                    message: 'User not Authenticated.'
                });
                return;
            }

            const habitData = req.body;
            // const habit = await 
        } catch (error) {
            res.status(400).json({
                success: 'false',
                message: 'Something Went wrong.'
            })
            return
        }
    }
    static async getUsersHabit(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                    error: 'Authentication required'
                });
                return;
            }
            const includeInactive = req.query.includeInactive === 'true';
            const habits = await HabitService.getUserHabits(req.user.userId, includeInactive);
            res.status(200).json({
                success: true,
                message: 'Habits retrieved successfully',
                data: { habits }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get habits';

            res.status(500).json({
                success: false,
                message: errorMessage,
                error: 'Habit retrieval error'
            });
        }
    }
      static async getHabit(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
          error: 'Authentication required'
        });
        return;
      }

      const habitId = parseInt(req.params.id);
      if (isNaN(habitId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid habit ID',
          error: 'ID must be a number'
        });
        return;
      }

      const habit = await HabitService.getIndividualHabit(habitId, req.user.userId);

      res.status(200).json({
        success: true,
        message: 'Habit retrieved successfully',
        data: { habit }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get habit';
      const statusCode = errorMessage.includes('not found') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: 'Habit retrieval error'
      });
    }
  }
    static async deleteHabit(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
          error: 'Authentication required'
        });
        return;
      }

      const habitId = parseInt(req.params.id);
      if (isNaN(habitId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid habit ID',
          error: 'ID must be a number'
        });
        return;
      }

      await HabitService.deleteHabit(habitId, req.user.userId);

      res.status(200).json({
        success: true,
        message: 'Habit deleted successfully'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete habit';
      const statusCode = errorMessage.includes('not found') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: 'Habit deletion error'
      });
    }
  }
    // Update habit
  static async updateHabit(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
          error: 'Authentication required'
        });
        return;
      }

      const habitId = parseInt(req.params.id);
      if (isNaN(habitId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid habit ID',
          error: 'ID must be a number'
        });
        return;
      }

      const updateData:UpdateHabitPayload  = req.body;
      const habit = await HabitService.updateHabit(habitId, req.user.userId, updateData);

      res.status(200).json({
        success: true,
        message: 'Habit updated successfully',
        data: { habit }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update habit';
      const statusCode = errorMessage.includes('not found') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: 'Habit update error'
      });
    }
  }
    static async completeHabit(req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
          error: 'Authentication required'
        });
        return;
      }

      const habitId = parseInt(req.params.id);
      if (isNaN(habitId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid habit ID',
          error: 'ID must be a number'
        });
        return;
      }

      const habit = await HabitService.completeHabit(habitId, req.user.userId);

      res.status(200).json({
        success: true,
        message: 'Habit marked as completed',
        data: { habit }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete habit';
      const statusCode = errorMessage.includes('not found') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: 'Habit completion error'
      });
    }
  }
}