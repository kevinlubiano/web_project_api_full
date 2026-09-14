import { useContext, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!avatar.trim()) {
      setError("El campo no puede estar vacío");
      return;
    }

    if (!/^https?:\/\/.+/.test(avatar)) {
      setError("Ingresa un enlace válido (http/https)");
      return;
    }

    handleUpdateAvatar({ avatar });
    setError("");
    setAvatar("");
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar-url"
          id="avatar-link"
          name="avatar"
          placeholder="Image link"
          required
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <span className="popup__error" id="avatar-link-error">
          {error}
        </span>
      </label>

      <button className="button popup__button" type="submit" disabled={!!error}>
        Guardar
      </button>
    </form>
  );
}
