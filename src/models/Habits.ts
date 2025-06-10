import { pool } from "../config/database";
import { HabitCreatePayload, HabitResponse, softDeleteResp, UpdateHabitPayload } from "../types";

export class HabitModel {
    static async create(user_id:string,habitData:HabitCreatePayload):Promise<HabitResponse | null>{
        const query = `INSERT INTO habits (user_id,title,description,frequency) VALUES ($1,$2,$3,$4) 
  updated_at: string;
        RETURNING id,title,description,streak_count,last_completed_date,frequency,is_active,created_at,updated_at`
     const VALUES =[user_id,habitData.title,habitData.title,habitData.title]
     try{
     const queryResp = await pool.query(query,VALUES);
     return queryResp.rows[0]
     }catch(error){
        throw error
     }
    }

    static async findByUserId(habitId:number,userId:number):Promise<HabitResponse[] | null>{
        const query = `SELECT id,title,description,streak_count,last_completed_date,frequency,is_active,created_at,updated_at FROM habits WHERE id = $1 AND user_id = $2`;
        const VALUES = [habitId,userId]
        try{
        const queryResp = await pool.query(query,VALUES)
        return queryResp.rows[0] || null;
        }catch(error){
            throw error
        }
    }

      static async findByIdAndUserId(habitId: number, userId: number): Promise<HabitResponse | null> {
    const query = `
      SELECT id, title, description, streak_count, last_completed_date, frequency, is_active, created_at, updated_at
      FROM habits 
      WHERE id = $1 AND user_id = $2
    `;

    try {
      const result = await pool.query(query, [habitId, userId]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

    static async UpdateHabit(habitId:number,userId:number,updateData:UpdateHabitPayload){
        let payloadIndex=1;
        let updateLoc = [];
        let values =[];
        if(updateData?.title){
            updateLoc.push(`title = $${payloadIndex}`);
            payloadIndex++;
            values.push(updateData?.title)
        }
        if(updateData?.description){
            updateLoc.push(`description = $${payloadIndex}`);
            payloadIndex++;
            values.push(updateData?.description)

        }
        if(updateData?.frequency){
            updateLoc.push(`frequency = $${payloadIndex}`);
            payloadIndex++;
            values.push(updateData?.frequency)

        }
        if(updateData?.is_active){
            updateLoc.push(`is_active = $${payloadIndex}`);
            payloadIndex++;
            values.push(updateData?.is_active)

        }
        const query = `UPDATE habits SET
        ${updateLoc?.join(', ')}
        WHERE id = ${payloadIndex} user_id = ${payloadIndex+1} 
                RETURNING id,title,description,streak_count,last_completed_date,frequency,is_active,created_at,updated_at
        `
        values.push(habitId,userId)
        try{
            const queryResp = await pool.query(query,values);
            return queryResp.rows[0]
        }catch(error){
            throw error
        }
    }

    static async markCompleted(habitId:string,userId:string):Promise<HabitResponse | null>{
    const today = new Date().toISOString().split('T')[0];
    const VALUES=[today,habitId,userId]
        const query = `UPDATE habits
            SET 
            last_completed_date = $1,
            streak_count = CASE
            WHEN last_completed_date = $1 THEN streak_count
            WHEN last_completed_date = $1::date - INTERVAL '1 day' THEN streak_count + 1
            ELSE 1
            WHERE id = $2 AND user_id = $3 
            RETURNING id,title,description,streak_count,last_completed_date,frequency,is_active,created_at,updated_at
        `
        try{
            const queryResp = await pool.query(query,VALUES);
            return queryResp.rows[0];
        }catch(error){
            throw error
        }
    }
    static async softDelete(habitId:string,userId:string):Promise<softDeleteResp | null>{
        
        const query = `UPDATE habits
            SET is_active = false
            WHERE id=$1 AND user_id=$2
            RETURNING id,title
        `
        const VALUES=[habitId,userId]
        try{
            const queryResp = await pool.query(query,VALUES);
            return queryResp.rows[0]
        }catch(error){
            throw error
        }
    }
    static async hardDelete(habitId: number, userId: number): Promise<boolean> {
    const query = `DELETE FROM habits WHERE id = $1 AND user_id = $2`;

    try {
      const result = await pool.query(query, [habitId, userId]);
    return(result.rowCount && result.rowCount>0?true:false) 
    } catch (error) {
      throw error;
    }
  }
//     UPDATE Products
// SET
//     Price = 1150.00,        -- New price
//     StockQuantity = 45,     -- New stock quantity
//     LastUpdatedDate = CURRENT_DATE -- Set to today's date
// WHERE ProductID = 101;

}