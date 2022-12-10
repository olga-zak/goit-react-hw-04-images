import { Component } from 'react';

import { fetchImages } from 'services/imagesAPI';
import { arrayMapper } from 'services/arrayMapper';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { GlobalStyles } from './GlobalStyles';
import { AppStyled } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    currentImage: null,
    totalAmoutOfPages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.getImages();
    }
  }

  updateSearchQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      totalAmoutOfPages: 0,
    });
  };

  //метод отправки запроса на бэк с поиск.словом, которое ввели в SearchForm инпут
  getImages = () => {
    const { searchQuery, page } = this.state;
    //Пока ждем ответа на HTTP-запрос, показываем идтикатор загрузки.Как только пришел ответ, прячем индикатор.
    //Для этого на старте запроса ставим isLoading в true, а при успешном ответе или ошибке в false - в .finally()
    this.setState({ isLoading: true });

    fetchImages(searchQuery, page) //отправляем запрос на сервер
      //обрабатываем ответ:
      .then(response => {
        if (response.data.hits.length === 0) {
          console.log('no images found');
        }

        //записываем в стэйт images (массив картинок пропускаем через ф-цию arrayMapper)
        this.setState(prevState => ({
          images: [...prevState.images, ...arrayMapper(response.data.hits)],
        }));
        //записываем в стэйт totalAmoutOfPages для логики рендера кнопки Load more
        this.setState({
          totalAmoutOfPages: Math.ceil(response.data.totalHits / 12),
        });
      })
      //если ответ не пришёл, записываем в стэйт error.message (потом можно будет вывести ошибки для пользователя)
      .catch(error => {
        this.setState({ error: error.message });
      })
      //и в любом случае делаем это:
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = imageURL => {
    this.setState({
      currentImage: imageURL,
    });
  };

  closeModal = () => {
    this.setState({
      currentImage: null,
    });
  };

  render() {
    return (
      <AppStyled>
        {/* Компонент SearchBar принимает один проп onSubmit - функцию для
        передачи значения инпута при сабмите формы. */}
        <SearchBar onSubmit={this.updateSearchQuery} />

        {this.state.isLoading && <Loader />}

        {this.state.images.length > 0 && (
          <ImageGallery
            arrayOfImages={this.state.images}
            openModal={this.openModal}
          />
        )}
        {/* 
        1. кнопка рендерится когда галерея зарендерилась, т.е запрос завершил свою работу (isLoading = false)
        2. и если page < totalAmOfPages
        */}
        {!this.state.isLoading &&
          this.state.page < this.state.totalAmoutOfPages && (
            <Button text="Load More" clickHandler={this.loadMore} />
          )}

        {this.state.currentImage && (
          <Modal image={this.state.currentImage} closeModal={this.closeModal} />
        )}

        <GlobalStyles />
      </AppStyled>
    );
  }
}
