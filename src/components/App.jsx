import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = inputSearch => {
    setInputValue(inputSearch);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
      }}
    >
      <Searchbar onSubmitInput={handleFormSubmit} />
      <ImageGallery searchResult={inputValue} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
};
