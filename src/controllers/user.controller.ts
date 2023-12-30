import { Request, Response } from "express"
import { RequestWithUserId } from "../types/request.type";
import { Users } from "../entities/user.entity"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.find();
        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // check if the email is already in use
        const emailAlreadyExists = await Users.findOne({ where: { email } });
        if (emailAlreadyExists) {
            throw new Error('This email is already in use');
        }

        // create new user and save it
        const user = await Users.create({ name, email, password }).save();
        // send back the created user
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(403).json({ message: error.message });
        }
    }
}

export const findUserByID = async (req: RequestWithUserId, res: Response) => {
    try {
        const userId = req.userId;
        const user = await Users.findOne({ where: { user_id: userId ? +userId : 1 } })
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteUser = async (req: RequestWithUserId, res: Response) => {
    try {
        const userId = req.userId;
        await Users.delete({  user_id: userId ? +userId : 1 })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}