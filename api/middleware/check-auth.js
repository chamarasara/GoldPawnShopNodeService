const jwt = require('jsonwebtoken');

module.exports=(req, res, next)=>{
    //console.log(req)
    //get token from header
    const token = req.header('authorization');
    //check if not token
    if(!token){
        return res.status(401).json({message: 'No toekn, auth faild'})
    }
    try{
        //console.log(req.headers.get("Authorization"));
        // const token = req.headers.authorization;
        // console.log("body",req.body.header.headers.authorization)
        // console.log(" Header", token)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData=decoded.users;
        next();
    } catch(error){
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};