import mongoose, { Document } from 'mongoose';
export interface User extends Document {
    nomeCompleto: string;
    cpf: string;
    telefone?: string;
    email: string;
    senha?: string;
    endereco: string;
    fotoURL?: string;
    idade?: number;
    rg?: string;
    tipo: 'Prestador' | 'Contratante' | 'Admin';
    created_at?: Date;
    updated_at?: Date;
}
declare const UserModel: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default UserModel;
