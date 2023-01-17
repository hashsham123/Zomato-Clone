import express from 'express';
import { RestaurantModel } from '../../database/allModels';
import { validateSearchString } from '../../validation/common.validation';
import { validateId } from '../../validation/common.validation';

const Router = express.Router();
/**  route     /
 * Desc : Get all the restaurant details based on the city
 * params : none
 * Access : public
 * Method : GET
*/
Router.get("/",async(req,res)=>{
    try{
        const {city} = req.query
        const restaurant = await RestaurantModel.find(city)
        if(restaurant.length===0){
            return res.json({error:"No restaurant found in this city"})
        }
        return res.json({restaurant})
    }
    catch(error){
        // http://localhost:4000/restaurant/?city=hospet
       
        return res.status(500).json({erro:error.message});
    }
});

/**  route :    /:_id
 * Desc : Get idividual restaurant details based on the id
 * params : _id
 * Access : public
 * Method : GET
*/
Router.get("/:_id",async(req,res)=>{
    try{
       const{_id} = req.params;
      await validateId(req.params);
       
       const restaurant = await RestaurantModel.findById(_id)
       if(!restaurant){
        return res.status(400).json({error:"Restaurant Not Found"})
       }
       return res.status(500).json({error:error.message});
    }
    catch(error){
        // http://localhost:4000/restaurant/?city=hospet
       
        return res.status(500).json({erro:error.message});
    }
});


/**  route :    /search/:searchString
 * Desc : Get Restaurants details based on search string
 * params : searchString
 * Access : public
 * Method : GET
*/
Router.get("/search/:searchString",async(req,res)=>{
    try{
        // searchString "udupi Hotel"
        /**
         * It will match with all this
         * results={
         * udupiMandirHotel
         * udupi Hotel
         * Hospet udupi
         * }
         */
        const {searchString}=req.params;
        await validateSearchString(req.params);
        const restaurant = await RestaurantModel.find({name:{$regex:searchString,$options:"i"}
    })
    if(!restaurant.length===0){
        return res.status(404).json({error:'No restaurant matched with ${searchString}'})
    }
    return res.json({restaurant});
    }
    catch(error){
        // http://localhost:4000/restaurant/?city=hospet
       
        return res.status(500).json({erro:error.message});
    }
});

export default Router;