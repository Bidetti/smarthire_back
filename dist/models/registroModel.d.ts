import mongoose, { Schema, Document } from "mongoose";
export interface File extends Document {
    type: string;
    url: string;
}
export declare const FileSchema: Schema;
export interface Registro extends Document {
    userID: mongoose.Types.ObjectId;
    files: File[];
    comentario: string;
    created_at?: Date;
}
export declare const RegistroSchema: Schema;
declare const RegistroModel: mongoose.Model<Registro, {}, {}, {}, mongoose.Document<unknown, {}, Registro> & Registro & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default RegistroModel;
