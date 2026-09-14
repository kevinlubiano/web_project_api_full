export default function RemoveCard({ onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <form
      className="popup__form"
      name="remove-card-form"
      id="remove-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__title">¿Estás seguro?</h2>
      <button className="button popup__button" type="submit">
        Sí, eliminar
      </button>
      <button
        className="button popup__button popup__button_type_cancel"
        type="button"
        onClick={onClose}
      >
        Cancelar
      </button>
    </form>
  );
}
