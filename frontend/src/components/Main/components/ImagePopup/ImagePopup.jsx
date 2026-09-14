import Popup from "../Popup/Popup";

export default function ImagePopup(props) {
  const { card, onClose, isOpen } = props;

  return (
    <Popup onClose={onClose} isOpen={isOpen}>
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption">{card.name}</p>
    </Popup>
  );
}
