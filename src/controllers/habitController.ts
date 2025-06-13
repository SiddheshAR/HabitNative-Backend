import { Request,Response } from "express";
import { AuthenticatedRequest } from "../types";

export class HabitController {

    static async createHabit(req:AuthenticatedRequest,res:Response){
        try{
            if(!req.user){
                res.status(400).json({
                success:'false',
                message:'User not Authenticated.'
            });
            return;  
            }

            const habitData = req.body;
            // const habit = await 
        }catch(error){
            res.status(400).json({
                success:'false',
                message:'Something Went wrong.'
            })
            return
        }
    }
    // static async getUsersHabit(){

    // }

}