import { Router } from 'express';
import * as hobbiesController from '../controllers/hobbies.controller';
import * as hobbiesValidator from '../middleware/hobbyValidator'

const router = Router();

router.
    post('/hobbies', hobbiesValidator.validateCreateHobbyPayload, hobbiesController.createHobby).
    get('/hobbies', hobbiesController.getAllHobbies).
    delete('/hobbies', hobbiesController.deleteHobbyByID).
    put('/hobbies', hobbiesValidator.validateUpdateHobbyPayload, hobbiesController.updateHobbyByID)

router.route('/hobbies/:id')
    .get(hobbiesController.getHobbyByID);


export default router;
// Implement other hobby routes for CRUD operations.
