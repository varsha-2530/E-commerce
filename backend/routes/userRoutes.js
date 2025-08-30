import { Router } from 'express'
import { login, logout, SignUpUser, verifyEmailController ,uploadAvatar, EditUserProfile, forgotPassword, verifyForgotPasswordOtp, resetPassword, refreshtoken} from '../controllers/userControllers.js';
import auth from '../middleware/Auth..js';
import upload from '../middleware/multer.js';


const userRouter = Router();

userRouter.post('/SignUp',SignUpUser);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', login);
userRouter.get('/logout',auth,logout);
userRouter.put('/addAvatar', auth, upload.single('avatar'),uploadAvatar)
userRouter.put('/EditUserProfile', auth,EditUserProfile);
userRouter.post('/forgotPassword' , forgotPassword)
userRouter.put('/verifyForgotPasswordOtp', verifyForgotPasswordOtp)
userRouter.put('/resetPassword', resetPassword)
userRouter.post("/refreshToken", refreshtoken)

export default userRouter;