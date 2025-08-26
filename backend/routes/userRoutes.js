import { Router } from 'express'
import { SignUpUser } from '../controllers/userControllers.js';


const userRouter = Router();

userRouter.post('/SignUp',SignUpUser);

export default userRouter;