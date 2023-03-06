import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmitInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleNameChange = evt => {
    setInputValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSumbit = evt => {
    evt.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Please write something!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    onSubmitInput(inputValue);
    setInputValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSumbit}>
        <button type="submit" className={css.button}>
          <ImSearch size="1.3em" />
        </button>

        <input
          className={css.input}
          type="text"
          name="inputValue"
          value={inputValue}
          placeholder="Search images and photos"
          onChange={handleNameChange}
          autoFocus
          autoComplete="off"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitInput: PropTypes.func.isRequired,
};
