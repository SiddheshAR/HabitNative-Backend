import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;


export const validateRegisteration=(req:Request,resp:Response,next:NextFunction):void=>{
const {email,password,first_name,last_name}= req.body;
if(!email || !password || !first_name || !last_name){
    resp.status(400).json({
        success:false,
        message:"Please fill all details.",
        error:"Missing Data."
        }
    )
    return;
}
if(!emailRegex.test(email)){
    resp.status(400).json({
        success:false,
        message:"Email is not valid",
        error:"Email is not valid."
    })
    return;
}
if(!passwordRegex.test(password)){
    resp.status(400).json({
        status :false,
        message:"Password is not Strong Enough",
        error:"Password is not enough"
    })
    return;
}

if(first_name.trim().length<2 || last_name.trim().length<2){
    resp.status(400).json({
        status:false,
        message:"First & Last Name is not valid",
        error:"First & Last name is not valid"
    })
}
next();
}

export const validateLoginRequest = (req:Request,res:Response,next:NextFunction):void=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            status:false,
            message:"Please Add all credentials",
            error:"something went wrong."
        })
        return
    }
      if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email format',
      error: 'Email validation failed'
    });
    return;
  }
    next();
}