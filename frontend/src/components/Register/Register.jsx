import "../AuthForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <>
      <Header />

      <main className="form">
        <h2 className="form__title">Regístrate</h2>

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
            Regístrate
          </button>
        </form>

        <p className="form__link">
          ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
        </p>
      </main>
    </>
  );
}

export default Register;
