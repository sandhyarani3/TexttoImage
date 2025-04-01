import jwt from "jsonwebtoken"

const userAuth=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised.Login Again"});
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id;
        }
        else{
            return res.json({success:false,message:"Not Authorised.Login Again"}); 
        }
        next();//to execute controller userCredits
    } catch (error) {
        return res.json({success:false,message:"Not Authorised.Login Again"});
    }
}
export default userAuth;