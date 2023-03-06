import { useState, useEffect } from 'react';
import { fetchImages } from 'services/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGallery = ({ searchResult }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchResult) {
      // Перший рендер
      return;
    }
    fetchImages(searchResult, pageNumber)
      .then(e => {
        setImages(prevDef => [...prevDef, ...e]);
        if (e.length === 0) {
          setStatus('rejected');
        } else {
          setStatus('resolved');
        }
        setLoadMore(12 - e.length);
      })
      .catch(error => console.log(error));
  }, [searchResult, pageNumber]);

  useEffect(() => {
    if (!searchResult) {
      // Перший рендер
      return;
    }
    setStatus('pending');
    setImages([]);
  }, [searchResult]);

  const handleLoadMore = () => {
    setPageNumber(prevDef => prevDef + 1);
  };

  const getLargeUrl = (imageUrl, tagNames) => {
    setLargeImageUrl(imageUrl);
    setTags(tagNames);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevDef => !prevDef);
  };

  if (status === 'resolved') {
    return (
      <ImageGalleryItem images={images} loadLargeUrl={getLargeUrl}>
        {loadMore === 0 && <Button onLoadMore={handleLoadMore} />}
        {showModal && (
          <Modal onClose={toggleModal} imgUrl={largeImageUrl} tags={tags} />
        )}
      </ImageGalleryItem>
    );
  }

  if (status === 'rejected') {
    return <Error inputValue={searchResult} />;
  }

  if (status === 'pending') {
    return <Loader />;
  }
};

ImageGallery.propTypes = {
  searchResult: PropTypes.string.isRequired,
};
