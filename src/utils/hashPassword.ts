import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';

dotenv.config();
const SALT_ROUNDS = process.env.SALT_ROUNDS || 12;

export const hashPassword = async(password:string):Promise<string>=>{
    try{
        console.log(password)
        return await bcrypt.hash(password,Number(SALT_ROUNDS))
    }catch(error){
        throw new Error("Failed while Hashing.")
    }
}

export const comparePassword = async (plainPassword:string,hashedPassword:string):Promise<boolean>=>{
    try{
        return await bcrypt.compare(plainPassword,hashedPassword);
    }catch(error){
        throw new Error('Password Comparing failed')
    }   
}