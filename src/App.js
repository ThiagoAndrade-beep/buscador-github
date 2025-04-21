import React, { useState } from 'react';
import './app.css';

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
      if (!res.ok) throw new Error('Usuário não encontrado');
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil GitHub</h1>
        
        <div className="input-area">
          <input
            type="text"
            placeholder="Digite o nome do usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && fetchUser()}
          />
          <button
            onClick={fetchUser}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>

        {loading && (
          <div className="animate-pulse bg-white p-4 rounded shadow mb-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        {userData && (
          <div className="profile">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src={userData.avatar_url}
                  alt={userData.name}
                  className="profile-info"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {userData.name || userData.login}
                  </h2>
                  <p className="text-gray-600">@{userData.login}</p>
                </div>
              </div>
              
              {userData.bio && (
                <p className="bio">{userData.bio}</p>
              )}
              
              <div className="stats">
                <div>
                  <p className="text-gray-500">Repositórios</p>
                  <p className="font-semibold">{userData.public_repos}</p>
                </div>
                <div>
                  <p className="text-gray-500">Seguidores</p>
                  <p className="font-semibold">{userData.followers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-area"
              >
                Ver perfil completo no GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}