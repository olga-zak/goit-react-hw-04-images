import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ arrayOfImages, openModal }) => {
  return (
    <List>
      {arrayOfImages.map(image => (
        <ImageGalleryItem
          openModal={openModal}
          key={image.id}
          previewImg={image.previewImageURL}
          largeImg={image.largeImageURL}
        />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  arrayOfImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewImageURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
