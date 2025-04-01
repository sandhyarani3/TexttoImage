import { registerUser, userCredits} from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import express from "express"
import userAuth from "../middleware/auth.js";

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)//this states that before executing userCredits userAuth the middleware is executed to get userID
export default userRouter ;
//localhost:4000/api/user/register
//localhost:4000/api/user/login