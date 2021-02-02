import { Document, model, Schema } from 'mongoose';
import { IProductCategory } from './product_category';
import { IStore } from './store';

interface IOption {
    name: string;
    maxQuantity: number;
    minQuantity: number;
    unitPrice: number;
}

export interface IProductOption {
    name: string;
    type: string;
    option: IOption;
}

export interface IProduct extends Document {
    category: string | IProductCategory;
    store: string | IStore;
    name: string;
    description: string;
    unitPrice: number;
    salePrice: number;
    active: boolean;
    quantity: number;
    productOptions: IProductOption;
}

const ProductOptionsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    options: {
        type: [
            {
                name: String,
                maxQuantity: Number,
                minQuantity: Number,
                unitPrice: Number,
            },
        ],
    },
});

const ProductSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'ProductCategory',
            required: true,
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        unitPrice: {
            type: Number,
        },
        salePrice: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        active: {
            type: Boolean,
            default: true,
        },
        productOptions: {
            type: [ProductOptionsSchema],
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

ProductSchema.methods.toJSON = function () {
    let { _id, __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IProduct>('Product', ProductSchema);
