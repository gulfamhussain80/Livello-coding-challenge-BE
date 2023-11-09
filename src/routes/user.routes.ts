import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as userValidator from '../middleware/userValidator';

const router = Router();

router.
    post('/users', userValidator.validateCreateUserPayload, userController.createUser).
    get('/users', userController.getAllUsers).
    delete('/users', userController.deleteUserByID).
    put('/users', userValidator.validateUpdateUserPayload, userController.updateUserByID)

router.route('/users/:id')
    .get(userController.getUserByID);

export default router
// Implement other user routes for CRUD operations.
