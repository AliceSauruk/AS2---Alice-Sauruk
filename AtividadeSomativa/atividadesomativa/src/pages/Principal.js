import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../services/firebase';

export default function Principal() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function buscarUsuario() {

      const usuarioLogado = auth.currentUser;

      if (!usuarioLogado) {
        navigate('/');
        return;
      }

      try {
        const dadosUsuario = await db
          .collection('usuarios')
          .doc(usuarioLogado.uid)
          .get();

        setUsuario(dadosUsuario.data());

      } catch (error) {
        console.log(error);
      }
    }

    buscarUsuario();
  }, [navigate]);

  function sair() {
    auth.signOut();
    navigate('/');
  }

  return (
    <div className="container">
      <div className="card">

        <h1>Bem-vindo(a)!</h1>

        {usuario && (
          <>
            <p>
              <strong>Nome:</strong> {usuario.nome}
            </p>

            <p>
              <strong>Sobrenome:</strong> {usuario.sobrenome}
            </p>

            <p>
              <strong>E-mail:</strong> {usuario.email}
            </p>

            <p>
              <strong>Data de Nascimento:</strong>
              {' '}
              {usuario.dataNascimento}
            </p>
          </>
        )}

        <button onClick={sair}>
          Sair
        </button>

      </div>
    </div>
  );
}