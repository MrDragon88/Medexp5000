const verifyApiHeaderToken = (req,res,next)=>{

    const apitoken = req.get('apitoken');

    if(apitoken){

        if(apitoken === process.env.API_TOKEN){
            return next();
        }else{
            sendUnauthorized(res);
        }

    }else{
        sendUnauthorized(res);
    }

}

const sendUnauthorized =(res)=>{
    return res.status(401).json({"Error":"Recurso no Autorizado!!"});
}

module.exports = {
    verifyApiHeaderToken,
};