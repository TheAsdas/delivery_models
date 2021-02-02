import { Document, model, Schema } from 'mongoose';
import { IStore } from './store';
import { IUser } from './user';

export interface IReview extends Document {
    store: string | IStore;
    score: number;
    description: string;
    user: string | IUser;
}

const ReviewSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

ReviewSchema.methods.toJSON = function () {
    let { _id, __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
};

export default model<IReview>('Review', ReviewSchema);
