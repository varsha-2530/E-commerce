import { Router } from 'express'
import { login, SignUpUser, verifyEmailController } from '../controllers/userControllers.js';


const userRouter = Router();

userRouter.post('/SignUp',SignUpUser);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', login);

export default userRouter;