import mongoose, {Schema, Document} from "mongoose";

export interface RecoverCode extends Document {
    userID: mongoose.Types.ObjectId;
    code: number;
}

export const RecoverCodeSchema: Schema = new Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    code: {type: Number, required: true}
});

const RecoverCodeModel = mongoose.model<RecoverCode>("RecoverCode", RecoverCodeSchema);

export default RecoverCodeModel;