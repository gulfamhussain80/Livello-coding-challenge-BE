import { Request, Response } from 'express';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('hobbies');
        if(!users) return res.status(204).json({"message": "No users found"});
        
        res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch users' });
    }
}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        if(!req?.params?.id){
            return res.status(400).json({"message":"User Id is required"});
        }
        const user = await User.findOne({_id:req.params.id}).populate('hobbies');
        if(!user){
            return res.status(400).json({"message": `No User found against Id ${req.params.id}`});
        }
        
        res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch user' });
    }
}

export const deleteUserByID = async (req: Request, res: Response) => {
    try {
        if(!req?.body?.id){
            return res.status(400).json({"message":"User Id is required"});
        }
        const user = await User.findOne({_id: req.body.id}).exec();
        if(!user){
            return res.status(400).json({"message": `No user found againt Id ${req.body.id}`});
        }
        const result = await user.deleteOne({_id:req.body.id});
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Could not delete user' });
    }
}

export const updateUserByID = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.body.id}).exec();
        if(!user){
            return res.status(204).json({"message": `No user matches with Id ${req.body.id}`});
        }
        if(req.body?.name) user.name = req.body.name;
        if(req.body?.hobbies) user.hobbies = req.body.hobbies;
        const result = await user.save();
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Could not update user' });
    }
}
