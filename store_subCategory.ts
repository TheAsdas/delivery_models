import { model, Schema, Document } from "mongoose";
import { IStoreCategory } from "./store_category";

export interface IStoreSubCategory extends Document {
  name: string;
  description: string;
  photoUrl: string;
  storeCategory: string | IStoreCategory;
}

const StoreSubCategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  photoUrl: {
    type: String,
    required: true,
  }
});

export default model<IStoreSubCategory>("StoreSubCategory", StoreSubCategorySchema);