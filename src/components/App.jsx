import { useState, useEffect } from 'react';

import { fetchImages } from 'services/imagesAPI';
import { arrayMapper } from 'services/arrayMapper';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { GlobalStyles } from './GlobalStyles';
import { AppStyled } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [totalAmoutOfPages, setTotalAmoutOfPages] = useState(0);

  useEffect(() => {
    const getImages = () => {
      setIsLoading(true);
      fetchImages(searchQuery, page)
        .then(response => {
          if (response.data.hits.length === 0) {
            console.log('no images found');
          }
          setImages(prevImages => [
            ...prevImages,
            ...arrayMapper(response.data.hits),
          ]);
          setTotalAmoutOfPages(Math.ceil(response.data.totalHits / 12));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    if (searchQuery) {
      getImages();
    }
  }, [searchQuery, page]);

  const updateSearchQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setTotalAmoutOfPages(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageURL => {
    setCurrentImage(imageURL);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <AppStyled>
      <SearchBar onSubmit={updateSearchQuery} />

      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery arrayOfImages={images} openModal={openModal} />
      )}

      {!isLoading && page < totalAmoutOfPages && (
        <Button text="Load More" clickHandler={loadMore} />
      )}

      {currentImage && <Modal image={currentImage} closeModal={closeModal} />}

      <GlobalStyles />
    </AppStyled>
  );
};
