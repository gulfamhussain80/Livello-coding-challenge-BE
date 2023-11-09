import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateHobbyPayload = [
  body('passionLevel').isString().isLength({ min: 1 }).withMessage('Passion Level is required and should be a string'),
  body('name').isString().isLength({ min: 1 }).withMessage('Hobby name is required and should be a string'),
  body('year').isNumeric().withMessage('Year is required and should be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateHobbyPayload = [
    body('id').isString().isLength({ min: 1 }).withMessage('Hobby ID is required and should be a string'),
    body('passionLevel').optional().isString().isLength({ min: 1 }).withMessage('Passion Level is required and should be a string'),
    body('name').optional().isString().isLength({ min: 1 }).withMessage('Hobby name is required and should be a string'),
    body('year').optional().isNumeric().withMessage('Year is required and should be a number'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
