import React, { useState } from 'react';
import './app.css';
import githubIcon from './img/image 1.png';
import lupa from './img/Frame 52.png';
import ClipLoader from 'react-spinners/ClipLoader';

export default function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente');
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <img
            src={githubIcon}
            alt="Ícone GitHub"
            className="w-6 h-6"
          />
          Perfil GitHub
        </h1>

        <div className="input-area">
          <input
            type="text"
            placeholder="Digite um usuário do Github"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && fetchUser()}
          />
          <button
            onClick={fetchUser}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded px-4"
          >
            <img
              src={lupa}
              alt="Lupa busca usuario"
              className="w-4 h-4"
            />
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center mt-8">
            <ClipLoader color="#3B82F6" size={48} />
            <p className="text-gray-600 mt-4 text-sm">Carregando perfil...</p>
          </div>
        )}

        {error && (
          <div className="erro">
            <p className='texto-erro'>{error}</p>
          </div>
        )}

        {userData && (
          <div className="profile">
            <div className="p-6">
              <div className="content">
                <img
                  src={userData.avatar_url}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="name">
                    {userData.name || userData.login}
                  </h2>
                  <p className="bio">
                    {userData.bio || "Sem bio disponível."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
