import userModel from "../models/userModel.js"

export const updateUserController=async(req,res,next)=>{
    const {name,email,lastName,password,location}=req.body
    if(!name||!email||!lastName||!password ||!location){
        next('Please Provide All Fields')
    }
    const user= await userModel.findOne({_id:req.user.userId})
    user.name = name
    user.lastName= lastName
    user.email=email
    user.location=location

    await user.save()
    const token= user.createJWT()
    res.status(200).json({
        user,
        token,
    });
};
//get User data
export const getUserController=async(req,res,next)=>{
try{
    const user =await userModel.findById({_id:req.body.user.userId});
    const userId= req.user.userId;
    //console.log("User ID not found",userId);
    user.password= undefined;
    if(!userId){
        return res.status(200).send({
            message:'User Not Found',
            success:false,
        });
    }
    //const user =await userModel.findById(userId);
    else{
       res.status(200).send({
            success:true,
            data:user,
        });
    }
}catch(error){
    console.log(error);
    res.status(500).send({
        message:'auth error',
        success:false,
        error:error.message,
    });
}
};