import './Popup.css';

const Popup = ({ onClose, header, isOpen }) => {
  return (
    <section 
      className={ `popup ${ isOpen ? 'popup_opened' : '' }` } 
      onClick={ onClose }
    >
      <div 
        className="popup__box" 
        onClick={ (evt) => {evt.stopPropagation();} }
      >
        <h2 className="popup__header">
          { header }
        </h2>
        <button 
          className="popup__button-close" 
          type="button" 
          onClick={ onClose } 
        />
      </div>
    </section>
  );
};

export default Popup;