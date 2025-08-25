import mongoose from "mongoose";
import categoryModel from "./category";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
  ],
},{timestamps:true});


const subCategoryModel = mongoose.model("subCategory", subCategorySchema)
export default subCategoryModel