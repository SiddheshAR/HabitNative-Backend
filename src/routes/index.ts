import { Router } from "express";
import authRoles from './auth'

const router = Router();

router.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Server running properly',
        timestamp:new Date().toISOString()
    })
})
router.use('/auth',authRoles);
export default router