const mongosee = require("mongoose");

const basketSchema = new mongosee.Schema({
    _id:String,
    productId:String,
    price:Number,
    quantity:Number,
    userId:String
});

const Basket = mongosee.model("Basket", basketSchema);
module.exports = Basket;