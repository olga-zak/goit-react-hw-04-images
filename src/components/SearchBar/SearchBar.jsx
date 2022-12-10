import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  Input,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleIputChange = event => {
    setSearchQuery(event.target.value);
  };

  const sendNewSQueryToApp = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={sendNewSQueryToApp}>
        <SearchFormButton type="submit" />
        <Input
          value={searchQuery}
          onChange={handleIputChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search for images..."
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
