import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />

        <h2 className="popup__title">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "¡Uy, algo salió mal! Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
