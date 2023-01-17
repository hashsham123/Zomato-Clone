import express, { json } from "express"
// import { OrderModel } from "../../database/order";
import { ReviewModel } from "../../database/allModels";
const Router = express.Router();

/**route :   /:resId
 * Desc  :   Get all reviews for a particular restaurant Id
 * params :  resId
 * Access :  public
 * Method :  GET
*/

Router.get("/:resId",async(req,res)=>{
    try{
     const {resId} = req.params
     const reviews = await ReviewModel.find
    //  sort is the function of mongodb -1 will make a list of sorted array from latest first
     ({restaurant:resId}).sort({
        createdAt:-1
     });
     return res.json({reviews})
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});


/**route :   /new
 * Desc  :   add new food/restaurant review and rating
 * params :  none
 * Access :  public
 * Method :  POST
*/

Router.post("/new",async(req,res)=>{
try {
     const {_id} = req.user;
     const {reviewData} = req.body;
     const newReview = await ReviewModel.create({...reviewData,user:_id});
     return res.json({newReview});
}catch(error){
return res.status(500).json({error:error.message});
}
});



/**route :   /delete
 * Desc  :  delete a review
 * params :  none
 * Access :  public
 * Method :  DELETE
*/

Router.delete("/delete/:id",async(req,res)=>{
try{
const {user} = req;
const {id} = req.params;
const data = await ReviewModel.findOneAndDelete({
    _id:id,//this is the id of the review
    user:user._id// this is the id of the user who creared that review it is given as he can only delete it
});
if(!data){
    return res.json({message:"Review was not deleted"})
}
return res.json({message:"successfully deleted you review",data});
}catch(error){
    return res.status(500).json({error:error.message});

}
})


export default Router;