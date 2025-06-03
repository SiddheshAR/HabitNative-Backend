
import { Request,Response,NextFunction } from "express";

import { AuthenticatedRequest,ApiResponse } from "../types";
import { verifyToken } from "../utils/jwt";

export const authenticatedToken = (req:Request,res:Response,next:NextFunction)=>{

    const authHeader = req.headers['authorization'];
    const getToken=authHeader && authHeader?.split(' ')[1];

    if(!getToken){
        res.json(400).json({
            success:false,
            message:"Token not found.",
            error:"Token not found"
        })
        return;
    }
    
    try{
        const tokenCheck = verifyToken(getToken);
        req.user=tokenCheck;
        next();
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Token is invalid",
            error:"Token not valid"
        })
    }
}











