import JWT from 'jsonwebtoken'

const userAuth =async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
       return next("Auth Failed");
    }
    const token= authHeader.split(" ")[1]
    try{
        const payload= JWT.verify(token,process.env.JWT_SECRET);
        req.user={userId:payload.userId};
        next();
    } catch(error){
        return next("Auth Failed");
    }
    const tryUserAuth = async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer")) {
          const token = authHeader.split(" ")[1];
          try {
            const payload = JWT.verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload.userId };
          } catch (err) {
            // token is invalid — ignore and treat as guest
          }
        }
        next();
      };
};

export default userAuth;