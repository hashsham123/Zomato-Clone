import express from 'express'
import { UserModel } from '../../database/user'

const Router = express.Router();

/**route :   /
 * Desc : Get authorised user data
 * params : none
 * Access : public
 * Method : GET
*/

Router.get("/",async(req,res)=>{
    try{
       const {email,fullName,phoneNumber,address} = req.user;
       return res.json({user:{email,fullName,phoneNumber,address}});
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});


/**route :   /:_id
 * Desc : Get user data
 * params : _id
 * Access : public
 * Method : GET
*/

Router.get("/:id",async(req,res)=>{
    try{
      const {_id} = req.params;
      const getUser = await UserModel.findById(_id);
      const {fullName} = getUser;
      if(!getUser){
        return res.status(404).json({error:"User not found by this id"})
      } 
      return res.json({user:{fullName}});
    }
    catch(error){
     return res.status(500).json({error:error.message});
    }
})

/**route :   /:_id
 * Desc :    Update user data by their ID
 * params : _id
 * Access : public
 * Method : PUT
*/

Router.put("/:id",async(req,res)=>{
    try{
     const {_id} = req.params;
     const {userData} = req.body;
     userData.password = undefined;
     const updateUserData = await UserModel.findById(_id,{$set:userData,},{
        new :true,
     }
     );
     return res.json({user:updateUserData});
    }
    catch(error){
     return res.status(500).json({error:error.message});
    }
})

export default Router;