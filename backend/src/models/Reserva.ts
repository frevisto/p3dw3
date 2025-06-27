import { Schema, model } from "mongoose";

const reservaSchema = new Schema({
  nomeCliente: { type: String, required: true },
  numeroMesa: { type: Number, required: true },
  dataHora: { type: Date, required: true },
  status: {
    type: String,
    enum: ['reservado', 'ocupado', 'disponível'],
    required: true
  },
  contatoCliente: { type: String, required: true }
});

export const Reserva = model("Reserva", reservaSchema);
