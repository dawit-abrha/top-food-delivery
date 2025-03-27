import jwt from "jsonwebtoken"


const autheMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({ success: false, message: "No token provided, login again" });
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ success: false, message: "Token is invalid" });
    }

}



export default autheMiddleware;