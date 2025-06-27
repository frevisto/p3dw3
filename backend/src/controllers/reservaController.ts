import { Request, Response } from "express";
import { Reserva } from '../models/Reserva';

export const criarReserva = async (req: Request, res: Response) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.status(201).json(reserva);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const listarReservas = async (req: Request, res: Response) => {
  try {
    const { cliente, mesa } = req.query;
    const filtros: any = {};
    if (cliente) filtros.nomeCliente = cliente;
    if (mesa) filtros.numeroMesa = mesa;

    const reservas = await Reserva.find(filtros);
    res.json(reservas);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export const atualizarReserva = async (req: Request, res: Response) => {
  try {
    const reservaAtualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reservaAtualizada);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const removerReserva = async (req: Request, res: Response) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ message: "Reserva removida com sucesso" });
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};
