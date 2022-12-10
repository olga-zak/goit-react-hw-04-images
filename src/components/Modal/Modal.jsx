import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const closeByEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByOverlayCLick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={closeByOverlayCLick}>
      <ModalWindow className="modal">
        <img src={image} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
