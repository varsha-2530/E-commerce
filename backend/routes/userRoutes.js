import { Router } from 'express'
import { SignUpUser, verifyEmailController } from '../controllers/userControllers.js';


const userRouter = Router();

userRouter.post('/SignUp',SignUpUser);
userRouter.post('/verifyEmail', verifyEmailController);


export default userRouter;