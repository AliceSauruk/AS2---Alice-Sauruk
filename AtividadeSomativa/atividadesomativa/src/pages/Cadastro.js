import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { auth, db } from '../services/firebase';

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function cadastrarUsuario() {
    setMensagem('');
    setErro('');

    try {
      const usuario = await auth.createUserWithEmailAndPassword(
        email,
        senha
      );

      await db.collection('usuarios').doc(usuario.user.uid).set({
        uid: usuario.user.uid,
        nome,
        sobrenome,
        email,
        dataNascimento
      });

      setMensagem('Usuário cadastrado com sucesso!');

      setNome('');
      setSobrenome('');
      setEmail('');
      setSenha('');
      setDataNascimento('');

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setErro('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
  }

  return (
    <div className="container">
      <div className="card">

        <h1>Cadastro</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />

        <button onClick={cadastrarUsuario}>
          Cadastrar
        </button>

        {mensagem && (
          <p className="sucesso">{mensagem}</p>
        )}

        {erro && (
          <p className="erro">{erro}</p>
        )}

        <p className="link">
          Já possui conta? <Link to="/">Faça login</Link>
        </p>

      </div>
    </div>
  );
}