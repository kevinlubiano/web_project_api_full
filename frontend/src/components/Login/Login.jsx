import "../AuthForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <>
      <Header />

      <main
        className="form"
        style={{
          width: "358px",
          margin: "57px auto 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="form__title">Inicia sesión</h2>

        <form className="form__container" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="form__button">
            Inicia sesión
          </button>
        </form>

        <p className="form__link">
          ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
        </p>
      </main>
    </>
  );
}

export default Login;
