import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { RequestWithUserId } from "../types/request.type";


export const handleUserById = (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    
    const user = User.findOneBy({ user_id: +userId });

    if (!user) return res.status(404).json('User not found');
   
    req.userId = userId;
    next();
}