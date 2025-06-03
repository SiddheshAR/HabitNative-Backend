import {Request,Response} from 'express';
import { ApiResponse, RegisterRequest } from '../types';
import { AuthService } from '../services/authService';


export class AuthController{
    static async register(req:Request,res:Response<ApiResponse>):Promise<void>{
        try{
        const userData:RegisterRequest = req.body;
        const result = await AuthService.register(userData);
        res.status(201).json({
            success:true,
            message:"User Created Success",
            data:{
                user:result.user,
                token:result.token
            }
        })
        }
        catch(error){
            const errorMessage = error instanceof Error ? error.message : "Registration failed";
            res.status(400).json({
                success:false,
                message:errorMessage,
                error:"Registration Error"
            })
        }
    }   
}