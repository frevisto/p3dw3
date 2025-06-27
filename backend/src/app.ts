import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reservaRoutes from "./routes/reservaRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use("/api/reservas", reservaRoutes);

export default app;
