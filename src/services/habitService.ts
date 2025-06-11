import { HabitModel } from "../models/Habits";
import { HabitCreatePayload } from "../types";



export class HabitService {
    static async createHabit(userId:string,habitData:HabitCreatePayload){
        if(!habitData.title || habitData.title.trim().length == 0 ){
            throw new Error("Habit title is required.")
        }
        if(!['daily','weekly','monthly'].includes(habitData?.frequency)){
            throw new Error("Habit is invalid.")
        }
    return await HabitModel.create(userId, {
      title: habitData.title.trim(),
      description: habitData.description?.trim() || undefined,
      frequency: habitData.frequency
    });    }
}

