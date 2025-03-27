import userModel from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


//login

const loginUser =async (req, res) => {

const {email, password} = req.body;
try{
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ success: false, message: "Password is incorrect" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token});

}
catch(err){
    console.error("Error registering user:", err);
    res.status(500).json({ success: false, message: "Server error" });
}
}

//generate token
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1h' });
   
}

//register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

try{
const exists =await userModel.findOne({email});
if(exists){
    return res.status(400).json({ success: false, message: "Email already exists" });
}
if(!validator.isEmail(email)){
    return res.status(400).json({ success: false, message: "Invalid email" });
}
if(password.length < 8){
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
}
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)
const newUser = userModel({
    name:name,
    email:email,
    password: hashedPassword
})
const user = await newUser.save()

const token = createToken(user._id)

res.json({ success: true, message: "User registered successfully", token});
// res.json({ success: true, token});
console.log( JSON.stringify() );
}



catch(error){
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
}

}

export {
    loginUser,
    registerUser,
}