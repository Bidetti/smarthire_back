import mongoose, { Schema, Document } from 'mongoose';

export interface File extends Document {
    type: string;
    url: string;
}

export interface Servico extends Document {
    contratanteID: mongoose.Types.ObjectId;
    prestadorID: mongoose.Types.ObjectId;
    descricao: string;
    valor: number;
    status: string;
    files: File[];
    created_at?: Date;
    updated_at?: Date;
}

const FileSchema: Schema = new Schema({
    type: { type: String, required: true },
    url: { type: String, required: true }
});

const ServicoSchema: Schema = new Schema({
    contratanteID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prestadorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    status: { type: String, required: true },
    files: [{ type: FileSchema, required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ServicoModel = mongoose.model<Servico>('Servico', ServicoSchema);

export default ServicoModel;