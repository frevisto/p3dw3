import { useState } from 'react';
import api from '../api';

export default function ReservationForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    numeroMesa: '',
    dataHora: '',
    status: 'reservado',
    contatoCliente: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/', formData);
      alert('Reserva criada!');
      onSuccess();
    } catch {
      alert('Erro ao criar reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="nomeCliente" placeholder="Nome do Cliente" onChange={handleChange} required />
      <input name="numeroMesa" type="number" placeholder="Mesa" onChange={handleChange} required />
      <input name="dataHora" type="datetime-local" onChange={handleChange} required />
      <select name="status" onChange={handleChange}>
        <option value="reservado">Reservado</option>
        <option value="ocupado">Ocupado</option>
        <option value="disponível">Disponível</option>
      </select>
      <input name="contatoCliente" placeholder="Contato" onChange={handleChange} required />
      <button type="submit">Salvar</button>
    </form>
  );
}
