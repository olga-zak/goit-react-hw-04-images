export const arrayMapper = array => {
  return array.map(({ id, webformatURL: previewImageURL, largeImageURL }) => ({
    id,
    previewImageURL,
    largeImageURL,
  }));
};
