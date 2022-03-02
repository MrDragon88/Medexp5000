const e = require('express');
const express = require('express');
const router = express.Router();
const Usuarios =require('../../../../dao/usuarios/usuarios.model');
const usuarioModel = new Usuarios();
const jwt = require('jsonwebtoken');

router.post('/signin', async (req,res)=>{

    try{
        const {email,password}=req.body;
        //TODO: realizar validaciones de entrada de datos
        let rslt = await usuarioModel.new(email,password);
        res.status(200).json({status:'success',result:rslt});
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
    
});

router.post('/login', async (req,res)=>{
  try{
    const {email,password}=req.body;
    const userInDB = await usuarioModel.getByEmail(email);

    if(userInDB){
        const isPasswordValid = await usuarioModel.comparePassword(password,userInDB.password);

        if(isPasswordValid){
            const {email,roles, _id} = userInDB;
            const payload = {
                jwt:jwt.sign({email,roles, _id},process.env.JWT_SECRET),
                user: {email,roles, _id}
            }
            res.status(200).json(payload);
        }
        else{
            res.status(400).json({status:'failed', error: 2});
        }

    }else{
        res.status(400).json({status:'failed', error: 1});
    }
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed'});
  }

});

router.post('/resetPassword', async (req,res)=>{
    try{
        const {email,newpassword}=req.body;
        const userInDB = await usuarioModel.getByEmail(email);
        let text = userInDB._id;
    
        if(userInDB){
            console.log(userInDB._id);
            let sub = String(text).substring(0);
            console.log(sub);
            let result = await usuarioModel.updatePassword(sub,newpassword);
            console.log(result);
            res.status(200).json({status:'ok',result});
    
        }else{
            res.status(400).json({status:'failed', error: 1});
        }
      }
      catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
      }

});

module.exports=router;