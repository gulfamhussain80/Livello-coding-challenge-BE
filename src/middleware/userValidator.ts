import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUserPayload = [
  body('name').isString().isLength({ min: 1 }).withMessage('Name of User is required and should be a string'),
  body('hobbies').optional().isArray().isString().withMessage('Hobbies should be an array of strings'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateUserPayload = [
    body('id').isString().isLength({ min: 1 }).withMessage('User ID is required and should be a string'),
    body('name').optional().isString().isLength({ min: 1 }).withMessage('User Name should be a string'),
    body('hobbies').optional().isArray().isString().withMessage('Hobbies should be an array of strings'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

