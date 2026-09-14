import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!name.trim()) {
      setNameError("El nombre es obligatorio");
      valid = false;
    } else {
      setNameError("");
    }

    if (!description.trim()) {
      setDescriptionError("La descripción es obligatoria");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!valid) return;

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Nombre"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error">
          {nameError}
        </span>
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error">
          {descriptionError}
        </span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!!nameError || !!descriptionError}
      >
        Guardar
      </button>
    </form>
  );
}
