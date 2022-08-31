import React from 'react';
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
  // let subtitle = React.createRef();
  const { isOpen, setIsOpen, data } = props;

  function afterOpenModal() {
    // console.log(data);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      contentLabel={data.name}
      onRequestClose={closeModal}
      onAfterOpen={afterOpenModal}
    >
      <h2>{data.name}</h2>
      <button onClick={closeModal}>close</button>
      <button onClick={props.refresh}>refresh</button>
    </ReactModal>
  );
}
