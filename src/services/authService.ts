import { UserModel } from "../models/User";
import { LoginRequest, RegisterRequest, UserResponse } from "../types";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { generateToken } from "../utils/jwt";

export class AuthService{

    static async register(userData:RegisterRequest):Promise<{
        user:UserResponse,
        token:string
    }>{
        const existingUser = await UserModel.findEmailExist(userData.email);
        if(existingUser){
            throw new Error('Email already exist,Please login!.')
        }

        const hashedPassword = await hashPassword(userData.password);
        const user  = await UserModel.create({
            ...userData,
            password:hashedPassword
        });
        const token = generateToken(
            {userId:user.id,
            email:user.email
            }
        )
        return {user,token}
    }

    static async login(loginData:LoginRequest):Promise<{
        user:UserResponse,
        token:string
    }>{
        const user = await UserModel.findEmail(loginData.email);
        if(!user){
            throw new Error('Invalid Email or Password')
        }
        const isPasswordVerify = await comparePassword(loginData.password,user.password);
        if(!isPasswordVerify){
            throw new Error('Invalid Email or password')
        }
        const token = generateToken({
            userId:user.id,
            email:user.email
        })
        const {password,...userResp}=user;
        return({user:userResp as UserResponse,token})
    }
    static async getProfile(userId:number):Promise<UserResponse>{
        const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user
}

}

