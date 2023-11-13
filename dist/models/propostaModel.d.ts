import mongoose, { Document } from "mongoose";
export interface Proposta extends Document {
    prestadorID: mongoose.Types.ObjectId;
    contratanteID: mongoose.Types.ObjectId;
    descricao: string;
    valor: number;
}
declare const PropostaModel: mongoose.Model<Proposta, {}, {}, {}, mongoose.Document<unknown, {}, Proposta> & Proposta & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default PropostaModel;
