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
  let subtitle = React.createRef();
  const { isOpen, setIsOpen } = props;
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    const sub = subtitle.current;
    sub.style.color = '#0f0';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={subtitle}>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </ReactModal>
  );
}
