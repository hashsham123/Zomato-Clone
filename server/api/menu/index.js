import express from "express";
import { validateId } from "../../validation/common.validation";

const Router = express.Router();

/**  route     /list/:_id
 * Desc : Get all list of menu based on restaurant id
 * params : _id
 * Access : public
 * Method : POST
*/

Router.post("/list/:_id",async(req,res)=>{
    try{
      const {_id} = req.params;
      await validateId(req.params);
     const menu = await MenuModel.findById(_id);

     if(!menus){
        return res.status(404).json({error:"No menu present for this restaurant"})
     }
     return res.json({menus});
    }catch(error){
        return res.status.json({error:error.message})
    }
});


/**  route     /image
 * Desc : Get all all menu images with there restaurant ids
 * params : _id
 * Access : public
 * Method : POST
*/

Router.get("/image/:_id",async(req,res)=>{
    try{
      const {_id} = req.params;
      const menuImages = await ImageModel.findById(_id);
      if(!menyImages) return res.status(404).json({message:"No menu Images found here"});
      return res.json({menuImages});
    }catch(error){
        return res.status.json({error:error.message})
    }
});



export default Router;