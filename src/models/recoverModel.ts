import mongoose, {Schema, Document} from "mongoose";

export interface RecoverCode extends Document {
    userID: mongoose.Types.ObjectId;
    code: String;
    expires_at: Date;
}

export const RecoverCodeSchema: Schema = new Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    code: {type: String, required: true},
    expires_at: {type: Date, default: Date.now, expires: 3600}
});

const RecoverCodeModel = mongoose.model<RecoverCode>("RecoverCode", RecoverCodeSchema);

export default RecoverCodeModel;