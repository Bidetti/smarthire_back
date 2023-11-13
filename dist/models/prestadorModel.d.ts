import mongoose, { Document } from 'mongoose';
export interface Prestador extends Document {
    userID: mongoose.Types.ObjectId;
    habilidades: string[];
    curriculo?: string;
    disponibilidade: string;
    horariosTrabalho: string[];
    categoria: string;
    created_at?: Date;
    updated_at?: Date;
}
declare const PrestadorModel: mongoose.Model<Prestador, {}, {}, {}, mongoose.Document<unknown, {}, Prestador> & Prestador & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default PrestadorModel;
