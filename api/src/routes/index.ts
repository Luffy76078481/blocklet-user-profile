import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

import userController from '../controllers/userController';


router.get('/users/getInfo', (req, res) => {
    userController.getUser(req, res);
});

router.post('/users/updateInfo', (req, res) => {
    userController.updateUser(req, res);
});


export default router;
