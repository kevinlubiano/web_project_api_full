import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !link.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^https?:\/\/.+/.test(link)) {
      setError("Ingresa un enlace válido (http/https)");
      return;
    }

    handleAddPlaceSubmit({ name, link });
    setError("");
    setName("");
    setLink("");
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="name"
          placeholder="Title"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      {error && <span className="popup__error">{error}</span>}
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
