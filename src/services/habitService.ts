import { HabitModel } from "../models/Habits";
import { HabitCreatePayload, HabitResponse, UpdateHabitPayload } from "../types";

export class HabitService {
    static async createHabit(userId: string, habitData: HabitCreatePayload) {
        if (!habitData.title || habitData.title.trim().length == 0) {
            throw new Error("Habit title is required.")
        }
        if (!['daily', 'weekly', 'monthly'].includes(habitData?.frequency)) {
            throw new Error("Habit is invalid.")
        }
        return await HabitModel.create(userId, {
            title: habitData.title.trim(),
            description: habitData.description?.trim() || undefined,
            frequency: habitData.frequency
        });
    }

    static async getUserHabits(userId: number, isActive: boolean = false){
        const resp = await HabitModel.findByUserId(
            userId,isActive
        )
        return resp
    }
    static async getIndividualHabit(userId:number,habitId:number):Promise<HabitResponse | null>{
        return await HabitModel.findByIdAndUserId(userId,habitId);
    }

    static async updateHabit(habitId:number,userId:number,updateData:UpdateHabitPayload):Promise<HabitResponse | null>{
        if(updateData.frequency && !['weekly','daily','monthly'].includes(updateData.frequency)){
            throw new Error('Invalid Frequency')
        }

        if(updateData.title){
            if(updateData.title.trim().length<1){
                throw new Error('Title cannot be empty space.')
            }
        }
        if(updateData.description){
            if(updateData.description.trim().length<1){
                throw new Error('Description cannot be empty')
            }
        }
        const updateReq = await HabitModel.UpdateHabit(habitId, userId, updateData);
        return updateReq;
    }
      static async deactivateHabit(habitId: number, userId: number): Promise<void> {
    const success = await HabitModel.softDelete(habitId, userId);
    if (!success) {
      throw new Error('Habit not found or access denied');
    }
  }
    static async completeHabit(habitId: number, userId: number): Promise<HabitResponse> {
    const completedHabit = await HabitModel.markCompleted(habitId, userId);
    if (!completedHabit) {
      throw new Error('Habit not found, inactive, or access denied');
    }
    return completedHabit;
  }

  // Permanently delete habit
  static async deleteHabit(habitId: number, userId: number): Promise<void> {
    const success = await HabitModel.hardDelete(habitId, userId);
    if (!success) {
      throw new Error('Habit not found or access denied');
    }
  }
  static async getUserStats(userId:number){
//  {
//   "totalHabits": 3,
//   "activeHabits": 2,
//   "totalCompletions": 17,
//   "averageStreak": 7.5
// }
    const totalHabitsResp =await HabitModel.findByUserId(userId,true) ?? []
const totalHabitCount = totalHabitsResp.reduce((acc, curr) => {
    return acc + (curr.streak_count ?? 0);
}, 0);

    const avgStreakCount = totalHabitsResp.length>0 ? totalHabitCount/totalHabitsResp?.length : 0;
    return{
        totalHabits:totalHabitsResp.length,
        totalCompletions:totalHabitCount,
        averageStreak:Math.round(avgStreakCount * 100) / 100
    }
  } 
}
