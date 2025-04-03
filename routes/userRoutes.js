import { paymentRazorpay, registerUser, userCredits} from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import express from "express"
import userAuth from "../middleware/auth.js";
import { verifyRazorpay } from "../controllers/userController.js";
const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)//this states that before executing userCredits userAuth the middleware is executed to get userID
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)
export default userRouter ;
//localhost:4000/api/user/register
//localhost:4000/api/user/login