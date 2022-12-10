import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  Input,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleIputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  sendNewSQueryToApp = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.sendNewSQueryToApp}>
          <SearchFormButton type="submit" />
          <Input
            value={this.state.searchQuery}
            onChange={this.handleIputChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search for images..."
          />
        </SearchForm>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
