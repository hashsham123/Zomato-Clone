import express, { json } from "express"
import { OrderModel } from "../../database/order";
const Router = express.Router();

/**route :   /
 * Desc  :   Get all orders by user id
 * params :  _id
 * Access :  public
 * Method :  GET
*/

Router.get("/",async(req,res)=>{
    try{
        const {user} = req.user;
        const getOrders = await OrderModel.findOne({user:user._id});
        if(!getOrders) return res.status(400).json({error : "No order for this user found here"})
        return res.status(200).json({orders:getOrders})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});


/**route :   /new
 * Desc  :   Add new oders
 * params :  _id
 * Access :  public
 * Method :  PUT
*/

Router.put("/new",async(req,res)=>{
  try{
    const {user} = req;
    const {orderDetails} = req.body;
    const addNewOrder = await OrderModel.findByIdAndUpdate({
        user:user._id
    },
    {
        // will push the new update in the database
        $push:{
            orderDetails:orderDetails,
        },
    },
    {
        // will update the database
        new:true
    }
);
return res.json({order : addNewOrder});
  }catch(error){
    return res.status(500).json({error:error.message});
  }
});

export default Router;