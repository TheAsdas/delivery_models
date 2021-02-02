import { Document, model, Schema } from 'mongoose';
import { IProduct } from './product';
import { IStore } from './store';
import { IUser } from './user';

export interface IStatus {
    status: string;
    description: string;
    detail: string;
    date: Date;
}

export interface IProducts {
    product: string | IProduct;
    quantity: number;
}

export interface IOrder extends Document {
    user: IUser | string;
    store: string | IStore;
    address: string;
    phone: string;
    coupon: string;
    discount: number;
    total: number;
    status: IStatus[];
    products: IProducts[];
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        coupon: {
            type: String,
        },
        discount: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
        },
        payment: {
            type: String,
            required: true,
        },
        status: {
            type: [
                {
                    status: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    detail: {
                        type: String,
                    },
                    date: {
                        type: Date,
                        required: true,
                    },
                },
            ],
        },
        products: {
            type: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        default: 1,
                    },
                },
            ],
            required: true,
        },
    },
    { timestamps: true }
);

OrderSchema.methods.toJSON = function () {
    let { _id, __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IOrder>('Order', OrderSchema);
