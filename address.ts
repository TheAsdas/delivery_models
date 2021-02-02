import { Document, model, Schema } from 'mongoose';
import { IUser } from './user';

export interface IAddress extends Document {
    user: string | IUser;
    alias: string;
    street: string;
    number: string;
    city: string;
    country: string;
    reference: string;
    phone: string;
    principal: boolean;
}

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    alias: {
        type: String,
    },
    street: {
        type: String,
    },
    number: {
        type: String,
    },
    city: {
        type: String,
    },
    locality: {
        type: String,
    },
    country: {
        type: String,
    },
    reference: {
        type: String,
    },
    phone: {
        type: String,
    },
    principal: {
        type: Boolean,
        default: false,
    },
});

AddressSchema.methods.toJSON = function () {
    let { _id, __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IAddress>('Address', AddressSchema);
