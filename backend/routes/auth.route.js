import { Router } from 'express'
const router = Router()

import { loginController, logoutController, registerController } from '../controllers/auth.controller.js';

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/logout', logoutController)

export default router;