import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByOverlayCLick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.closeByOverlayCLick}>
        <ModalWindow className="modal">
          <img src={this.props.image} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
