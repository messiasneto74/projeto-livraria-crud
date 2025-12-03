import { useState, useEffect } from "react";
import "./pagestyles.css"; // <-- use este caminho SE seu CSS está dentro de /src

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          className="profile-avatar"
          src={user.photo || "/default-avatar.png"}
          alt="Foto do usuário"
        />

        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p className="info-small">ID: {user._id}</p>
      </div>
    </div>
  );
}

export default Profile;
