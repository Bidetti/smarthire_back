import mongoose, { Schema, Document } from 'mongoose';

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

const UserSchema: Schema = new Schema({
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: true },
  fotoURL: { type: String },
  idade: { type: Number },
  rg: { type: String },
  tipo: { type: String, enum: ['Prestador', 'Contratante', 'Admin'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
