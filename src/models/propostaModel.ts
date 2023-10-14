import mongoose, { Document, Schema } from "mongoose";

export interface Proposta extends Document{
    prestadorID: mongoose.Types.ObjectId;
    contratanteID: mongoose.Types.ObjectId;
    descricao: string;
    valor: number;
}

const PropostaSchema:Schema = new Schema({
    prestadorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contratanteID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true }
});

const PropostaModel = mongoose.model<Proposta>("Proposta", PropostaSchema);

export default PropostaModel;