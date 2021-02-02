import { Document, model, Schema } from "mongoose";
import { IStoreCategory } from "./store_category";
import { IUser } from "./user";

export interface IStoreLocation {
  latitude: number;
  longitude: number;
}

export interface IStoreAddress {
  street: string;
  number: string;
  city: string;
  country: string;
  locality: string;
  phone: string;
}

export interface IStoreSchedule {
  value: boolean;
  initTime: Date;
  endTime: Date;
}

export interface IStoreRating {
  average: number;
  quantity: number;
}

export interface IStore extends Document {
  name: string;
  location: IStoreLocation;
  address: IStoreAddress;
  schedule: IStoreSchedule[];
  photoUrl: string;
  shippingCost: number;
  rating: IStoreRating;
  category: string | IStoreCategory;
  active: boolean;
  admin: string | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema = new Schema(
  {
    value: {
      type: Boolean,
      default: false,
    },
    initTime: Date,
    endTime: Date,
  },
  { _id: false }
);

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    address: {
      street: String,
      number: String,
      city: String,
      country: String,
      locality: String,
      phone: String,
    },
    schedule: {
      type: [ScheduleSchema],
      default: [false, false, false, false, false, false, false],
      length: 7,
    },
    photoUrl: String,
    shippingCost: {
      type: Number,
      required: true,
    },
    rating: {
      average: Number,
      quantity: { type: Number, default: 0 },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "StoreCategory",
      required: true,
    },
    subCategory: {
      type: [{ type: Schema.Types.ObjectId, ref: "StoreSubCategory" }],
    },
    active: {
      type: Boolean,
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

StoreSchema.methods.toJSON = function () {
  let { _id, __v, ...object } = this.toObject();
  object.id = this._id;
  return object;
};

export default model<IStore>("Store", StoreSchema);
