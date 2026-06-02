import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { auth } from '../services/firebase';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erro, setErro] = useState('');

  async function realizarLogin() {
    setErro('');

    try {
      await auth.signInWithEmailAndPassword(email, senha);

      navigate('/principal');

    } catch (error) {
      setErro('Usuário não cadastrado ou senha incorreta');
    }
  }

  return (
    <div className="container">
      <div className="card">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={realizarLogin}>
          Entrar
        </button>

        {erro && (
          <p className="erro">{erro}</p>
        )}

        <p className="link">
          Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

      </div>
    </div>
  );
}