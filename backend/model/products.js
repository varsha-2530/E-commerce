import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stockquantity: {
    type: String,
    required: true,
  },
  categoryid:{
   type:String,
   required:true
  },
  

});
