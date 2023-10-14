import mongoose, { Schema, Document, mongo } from 'mongoose';

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

const PrestadorSchema: Schema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  habilidades: [{ type: String, required: true }],
  curriculo: { type: String },
  disponibilidade: { type: String, required: true },
  horariosTrabalho: [{ type: String, required: true }],
  categoria: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const PrestadorModel = mongoose.model<Prestador>('Prestador', PrestadorSchema);

export default PrestadorModel;
