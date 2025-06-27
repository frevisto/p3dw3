import { useEffect, useState } from 'react';
import api from '../api';
import EditReservationForm from './EditReservationForm';

interface Reserva {
  _id: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  status: string;
  contatoCliente: string;
}

export default function ReservationList() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    const res = await api.get('/');
    setReservas(res.data);
  };

  const removerReserva = async (id: string) => {
    await api.delete(`/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservas.map(r => (
          <li key={r._id}>
            <div>
              <strong>{r.nomeCliente}</strong> | Mesa {r.numeroMesa} |
              <span className={`status ${r.status}`}> {r.status}</span><br />
              {new Date(r.dataHora).toLocaleString()}
            </div>
            <div>
              <button onClick={() => setEditId(r._id)}>Editar</button>
              <button onClick={() => removerReserva(r._id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {editId && (
        <EditReservationForm
          id={editId}
          onClose={() => setEditId(null)}
          onUpdated={fetchData}
        />
      )}
    </div>
  );
}
