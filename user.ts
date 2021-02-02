import { Document, model, Schema } from 'mongoose';
import { IAddress } from './address';

export type Role =
    | 'ADMIN'
    | 'CLIENT'
    | 'DELIVERMAN'
    | 'CLIENT-DELIVERMAN'
    | 'SUPPORT'
    | 'STOREADMIN';

export interface IUser extends Document {
    email: string;
    emaiVerify: boolean;
    password: string;
    firstName: string;
    lastName: string;
    addresses: IAddress[];
    phone: string;
    phoneVerify: boolean;
    photoUrl: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role[];
    active: boolean;
}

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        emailVerify: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        addresses: {
            type: [
                { type: Schema.Types.ObjectId, ref: 'Address', required: true },
            ],
        },
        phone: {
            type: String,
            unique: true,
        },
        phoneVerify: {
            type: Boolean,
            default: false,
        },
        photoUrl: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
        role: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    let { password, __v, _id, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IUser>('User', UserSchema);
