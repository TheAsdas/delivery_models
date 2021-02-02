import { Document, model, Schema } from 'mongoose';
import { IStore } from './store';
import { IUser } from './user';

export interface IProductCategory extends Document {
    name: string;
    description: string;
    author: string | IUser;
    store: string | IStore;
    createdAt: Date;
    updatedAt: Date;
}

const ProductCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
        },
    },
    { timestamps: true }
);

ProductCategorySchema.methods.toJSON = function () {
    let { _id, __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IProductCategory>(
    'ProductCategory',
    ProductCategorySchema
);
