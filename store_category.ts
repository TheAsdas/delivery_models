import { Document, model, Schema } from "mongoose";
import { IStoreSubCategory } from "./store_subCategory";

export interface IStoreCategory extends Document {
  name: string;
  description: string;
  photoUrl: string;
  subCategories: string[] | IStoreSubCategory[];
  createdAt: Date;
  updatedAt: Date;
}

const StoreCategorySchema = new Schema(
  {
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
    },
    subCategories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "StoreSubCategory",
        },
      ],
    },
  },
  { timestamps: true }
);

StoreCategorySchema.methods.toJSON = function () {
  let { _id, __v, ...object } = this.toObject();
  object.id = this._id;
  return object;
};

export default model<IStoreCategory>("StoreCategory", StoreCategorySchema);
