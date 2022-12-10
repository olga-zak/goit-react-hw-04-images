import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ previewImg, largeImg, openModal }) => {
  return (
    <Item>
      <Image
        onClick={() => {
          openModal(largeImg);
        }}
        src={previewImg}
        alt=""
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  previewImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
