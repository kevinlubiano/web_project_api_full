import { useState, useEffect, useContext } from "react";
import avatar from "../../images/avatar.jpg";
import Popup from "./components/Popup/Popup";
import EditProfile from "../form/EditProfile/EditProfile";
import EditAvatar from "../form/EditAvatar/EditAvatar";
import NewCard from "../form/NewCard/NewCard";
import RemoveCard from "../form/RemoveCard/RemoveCard";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import { api } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  popup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("currentUser:", currentUser);

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const removeCardPopup = (card) => ({
    title: "Eliminar tarjeta",
    children: (
      <RemoveCard onClose={onClosePopup} onConfirm={() => onCardDelete(card)} />
    ),
  });

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar || avatar}
            alt="Avatar"
            className="profile__image"
          />
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Editar avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Editar perfil"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          aria-label="Agregar tarjeta"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={() => onOpenPopup(removeCardPopup(card))}
            />
          ))}
        </ul>
      </section>

      {popup?.type === "image" ? (
        <ImagePopup card={popup.card} onClose={onClosePopup} isOpen={!!popup} />
      ) : (
        popup && (
          <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
            {popup.children}
          </Popup>
        )
      )}
    </main>
  );
}
