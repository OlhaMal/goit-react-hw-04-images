import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, imgUrl, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContainer}>
        <img src={imgUrl} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { imgUrl, tags } = this.props;
//     return createPortal(
//       <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
//         <div className={css.modalContainer}>
//           <img src={imgUrl} alt={tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
