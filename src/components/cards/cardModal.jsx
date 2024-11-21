const Modal = ({ vehiclePlate, imgPath }) => {
    
    return (
        <dialog id={vehiclePlate} className="modal">
            <div className="modal-box rounded-md w-fit max-w-6xl h-fit max-h-6xl overflow-hidden">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg mb-1">Hình ảnh vi phạm của phương tiện {vehiclePlate}</h3>
                <img className='w-full h-full rounded' src={imgPath} alt='...'/>
            </div>
        </dialog>
    );
}

import PropTypes from 'prop-types';

Modal.propTypes = {
  vehiclePlate: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
};

export default Modal;