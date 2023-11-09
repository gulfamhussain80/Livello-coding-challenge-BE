import { Request, Response } from 'express';
import Hobby from '../models/hobbies.model';

export const createHobby = async (req: Request, res: Response) => {
  try {
    const newHobby = new Hobby(req.body);
    await newHobby.save();
    res.status(201).json(newHobby);
  } catch (error) {
    res.status(500).json({ error: 'Could not create hobby' });
  }
}

export const getAllHobbies = async (req: Request, res: Response) => {
    try {
        const hobbies = await Hobby.find();
        if(!hobbies) return res.status(204).json({"message": "No hobbies found"});
        
        res.status(200).json(hobbies);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch hobbies' });
    }
}

export const getHobbyByID = async (req: Request, res: Response) => {
    try {
        if(!req?.params?.id){
            return res.status(400).json({"message":"Hobby Id is required"});
        }
        const hobby = await Hobby.findOne({_id:req.params.id});
        if(!hobby){
            return res.status(400).json({"message": `No Hobby found against Id ${req.params.id}`});
        }
        
        res.status(200).json(hobby);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch hobby' });
    }
}

export const deleteHobbyByID = async (req: Request, res: Response) => {
    try {
        if(!req?.body?.id){
            return res.status(400).json({"message":"Hobby Id is required"});
        }
        const hobby = await Hobby.findOne({_id: req.body.id}).exec();
        if(!hobby){
            return res.status(400).json({"message": `No hobby found againt Id ${req.body.id}`});
        }
        const result = await hobby.deleteOne({_id:req.body.id});
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Could not delete hobby' });
    }
}

export const updateHobbyByID = async (req: Request, res: Response) => {
    try {
        const hobby = await Hobby.findOne({_id: req.body.id}).exec();
        if(!hobby){
            return res.status(204).json({"message": `No hobby matches with Id ${req.body.id}`});
        }
        if(req.body?.name) hobby.name = req.body.name;
        if(req.body?.passionLevel) hobby.passionLevel = req.body.passionLevel;
        if(req.body?.year) hobby.year = req.body.year;
        const result = await hobby.save();
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Could not update hobby' });
    }
}
