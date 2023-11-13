import mongoose, { Schema, Document } from "mongoose";
export interface RecoverCode extends Document {
    userID: mongoose.Types.ObjectId;
    code: String;
    expires_at: Date;
}
export declare const RecoverCodeSchema: Schema;
declare const RecoverCodeModel: mongoose.Model<RecoverCode, {}, {}, {}, mongoose.Document<unknown, {}, RecoverCode> & RecoverCode & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default RecoverCodeModel;
