import mongoose, { Document, Schema } from "mongoose";


export interface Avaliacao extends Document {
    avaliadorID: mongoose.Types.ObjectId;
    avaliadoID: mongoose.Types.ObjectId;
    comentario: string;
    nota: number;
    created_at?: Date;
}

const AvaliacaoSchema:Schema = new Schema({
    avaliadorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    avaliadoID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comentario: { type: String, required: true },
    nota: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

const AvaliacaoModel = mongoose.model<Avaliacao>("Avaliacao", AvaliacaoSchema);

export default AvaliacaoModel;