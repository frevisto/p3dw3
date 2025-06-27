import { useEffect, useState } from 'react';
import api from '../api';

interface Props {
  id: string;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditReservationForm({ id, onClose, onUpdated }: Props) {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    numeroMesa: '',
    dataHora: '',
    status: 'reservado',
    contatoCliente: ''
  });

  useEffect(() => {
    api.get('/').then(res => {
      const reserva = res.data.find((r: any) => r._id === id);
      if (reserva) setFormData(reserva);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/${id}`, formData);
      alert('Reserva atualizada!');
      onUpdated();
      onClose();
    } catch {
      alert('Erro ao atualizar reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="nomeCliente" value={formData.nomeCliente} onChange={handleChange} required />
      <input name="numeroMesa" type="number" value={formData.numeroMesa} onChange={handleChange} required />
      <input name="dataHora" type="datetime-local" value={formData.dataHora.slice(0, 16)} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="reservado">Reservado</option>
        <option value="ocupado">Ocupado</option>
        <option value="disponível">Disponível</option>
      </select>
      <input name="contatoCliente" value={formData.contatoCliente} onChange={handleChange} required />
      <button type="submit">Salvar Alterações</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}
