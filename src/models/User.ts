
import { pool } from '../config/database';
import { User, UserResponse, RegisterRequest } from '../types';

export class UserModel {
    static async create(userData:RegisterRequest):Promise<UserResponse>{
        const query = `INSERT INTO users (email,password,first_name,last_name) VALUES ($1,$2,$3,$4)
        RETURNING id,email,password,first_name,last_name,created_at
        `
        const values = [userData.email,userData.password,userData.first_name,userData.last_name]

        try{
            const result = await pool.query(query,values);
            return result.rows[0]
        }catch(error){
            throw error
        }
    }
    static async findEmail(email:string):Promise<User | null>{
        const query = 'SELECT * FROM users WHERE email = $1';
        const values=[email]
        try{
        const result = await pool.query(query,values);
            return result.rows[0] || null   
        }catch(error){
            throw error;
        }
    }
    static async findById(id:number):Promise<User | null>{
        const query = `SELECT * FROM users WHERE id = $1`;
        const value = [id]
        try{
            const result = await pool.query(query,value);
            return result.rows[0];
        }catch(error){
            throw error
        }
    }

    static async findEmailExist(email:string):Promise<boolean>{

        const query = `SELECt id FROM users WHERE email = $1 `
        const values = [email]
        try{
            const response = await pool.query(query,values);
            if(response.rows.length >0){
                return true
            }else{
                return false
            }
        }catch(error){
            throw error
        }

    }

}