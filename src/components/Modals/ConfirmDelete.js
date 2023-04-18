import React from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Modal(props) {
  let subtitle = React.createRef();
  const { isOpen, setIsOpen, data } = props;

  const [deleted, setDeleted] = React.useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    const sub = subtitle.current;
    sub.style.color = '#800';
  }

  function closeModal() {
    setIsOpen(false);
    setDeleted(false);
  }

  const deletePark = async () => {
    try {
      const res = await axios.delete(`/parks/${data.parkID}`);
      if (res.status === 200) {
        setDeleted(true);
        await props.refresh();
        setTimeout(closeModal, 5000);
      }
    } catch (error) {
      console.log(error);
      // TODO: show error message  
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete"
    >
      {deleted ? (
        <h2>Deleted</h2>
      ) : (
        <>
          <h2 ref={subtitle}>{`Delete ${data.name}?`}</h2>
          <button onClick={deletePark}>yes</button>
          <button onClick={closeModal}>close</button>
        </>
      )}
    </ReactModal>
  );
}
