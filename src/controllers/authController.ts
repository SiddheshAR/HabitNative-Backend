import {Request,Response} from 'express';
import { ApiResponse, AuthenticatedRequest, LoginRequest, RegisterRequest } from '../types';
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
    static async login(req:Request,res:Response<ApiResponse>):Promise<void>{
        try{
            const loginData:LoginRequest = req.body;
            const result = await AuthService.login(loginData);
            res.status(200).json({
                success:true,
                message:"Login Success",
                data:{
                    user:result.user,
                    token:result.token
                }
            })
        }catch(error){
            const errorMessage = error instanceof Error ? error.message : 'Login Failed';
            res.status(401).json({
                success:false,
                message:errorMessage,
                error:'Authentication error'
            })
        }
    }
    static async getProfile(req:AuthenticatedRequest,res:Response<ApiResponse>):Promise<void>{
        try{
            if(!req.user){
                res.status(401).json({
                    success:false,
                    message:"User not Authenticated",
                    error:'Authentication required.'
                })
                return;
            }
            const user = await AuthService.getProfile(req.user?.userId);
            res.status(200).json({
                success:true,
                message:"Profile Retrieved Successfully.",
                data:{user}
            })
        }catch(error){
            const errorMessage = error instanceof Error ? error.message :'Failed to get profile'
            res.status(404).json({
                success:false,
                message:errorMessage,
                error:'Profile Error'
            });
        }
    }
}
