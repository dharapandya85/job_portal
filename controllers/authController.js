import userModel from "../models/userModel.js";

export const registerController= async(req,res,next)=>{
    
        const {name,email,password,lastName,role}=req.body
        //validate
        if(!name) return next("name is required");
        
        if(!email)return next("email is required");
        
        if(!password||password.length<6) return next("password is required greator than 6 character");
        
        const normalizedRole = role?.toLowerCase();
        if(!normalizedRole||!['recruiter','student'].includes(normalizedRole)){
            next("Valid role is required(recruiter or student)");
        }

        const existingUser= await userModel.findOne({email})
        if(existingUser){
            next("Email Already Register Please Login");
            
        }
        const user= await userModel.create({name,email,password,lastName,role:normalizedRole});
        //token
        const token=user.createJWT()
        res.status(201).send({
            success:true,
            message:"User Created Successfully",
            user:{
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                role:user.role,
                location:user.location,
            },
            token,
        });

    
};
export const loginController=async(req,res,next)=>{
    const {email,password}= req.body
    //validation
    if(!email || !password){
        next('Please Provide All Fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next('Invalid Username or password ')
    }
    //compare password
    const isMatch= await user.comparePassword(password)
    if(!isMatch){
        next('Invalid Username or password')
    }
    user.password= undefined;
    const token= user.createJWT()
    res.status(200).json({
        success:true,
        message:'Login Successfully',
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
        },
        token,
    });
};
