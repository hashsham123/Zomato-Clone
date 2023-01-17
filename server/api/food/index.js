import express from 'express';
import { FoodModel } from '../../database/allModels';
import { validateCategory, validateId } from '../../validation/common.validation';

const Router = express.Router();
/**  route     /:_id
 * Desc : Get food based on id
 * params : _id
 * Access : public
 * Method : GET
*/

Router.get("/:_id",async(req,res)=>{
    try{
        const {_id} = req.params
        await validateId(req.params);
        const food = FoodModel.findById(_id)
        return res.json(foods);
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});

/**  route     /r/:_id
 * Desc : Get all food based on the particular restaurant
 * params : _id
 * Access : public
 * Method : GET
*/

Router.get("/r/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        await validateId(req.params);
            const foods = await FoodModel.find({
            restaurant:_id,
            });
            return res.json({foods})
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});

/**  route     /c/category
 * Desc : Get all food based on the particular food category
 * params : category
 * Access : public
 * Method : GET
*/

Router.get("/c/:category",async(req,res)=>{
    try{
        const {category} = req.params;
        await validateCategory(req.params);
            const foods = await FoodModel.find({
            category:{$regex:category,$options:"i"}
            });
            return res.json({foods})
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});




export default Router;