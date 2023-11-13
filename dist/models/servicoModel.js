"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FileSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    url: { type: String, required: true }
});
const ServicoSchema = new mongoose_1.Schema({
    contratanteID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    prestadorID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    status: { type: String, required: true },
    files: [{ type: FileSchema, required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
const ServicoModel = mongoose_1.default.model('Servico', ServicoSchema);
exports.default = ServicoModel;
//# sourceMappingURL=servicoModel.js.map