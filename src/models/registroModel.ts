import mongoose, {Schema, Document} from "mongoose";

export interface File extends Document {
    type: string;
    url: string;
}

export const FileSchema: Schema = new Schema({
    type: {type: String, required: true},
    url: {type: String, required: true}
});

export interface Registro extends Document {
    userID: mongoose.Types.ObjectId;
    files: File[];
    comentario: string;
    created_at?: Date;
}

export const RegistroSchema: Schema = new Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    files: [{type: FileSchema, required: true}],
    comentario: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

const RegistroModel = mongoose.model<Registro>("Registro", RegistroSchema);

export default RegistroModel;