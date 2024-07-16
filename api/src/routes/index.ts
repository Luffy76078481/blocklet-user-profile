import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/users/getInfo', (req, res) => {
    userController.getUser(req, res);
});

router.post('/users/updateInfo', (req, res) => {
    userController.updateUser(req, res);
});

export default router;
