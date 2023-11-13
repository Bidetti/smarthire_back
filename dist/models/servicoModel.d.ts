import mongoose, { Document } from 'mongoose';
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
declare const ServicoModel: mongoose.Model<Servico, {}, {}, {}, mongoose.Document<unknown, {}, Servico> & Servico & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default ServicoModel;
