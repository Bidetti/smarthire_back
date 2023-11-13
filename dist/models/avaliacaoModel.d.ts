import mongoose, { Document } from "mongoose";
export interface Avaliacao extends Document {
    avaliadorID: mongoose.Types.ObjectId;
    avaliadoID: mongoose.Types.ObjectId;
    comentario: string;
    nota: number;
    created_at?: Date;
}
declare const AvaliacaoModel: mongoose.Model<Avaliacao, {}, {}, {}, mongoose.Document<unknown, {}, Avaliacao> & Avaliacao & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default AvaliacaoModel;
