import { Router } from "express";
import {
  criarReserva,
  listarReservas,
  atualizarReserva,
  removerReserva
} from "../controllers/reservaController";

const router = Router();

router.post("/", criarReserva);
router.get("/", listarReservas);
router.put("/:id", atualizarReserva);
router.delete("/:id", removerReserva);

export default router;
