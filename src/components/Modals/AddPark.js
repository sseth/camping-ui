import axios from 'axios';
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
  const { isOpen, setIsOpen } = props;
  // TODO
  const formDataInit = {
    parkID: '',
    start: '2022-09-12',
    end: '2022-09-14',
    nights: '',
  };
  const [formData, setFormData] = React.useState(formDataInit);
  const [today, setToday] = React.useState('');
  const [tomorrow, setTomorrow] = React.useState('');

  React.useEffect(() => {
    const date = new Date();
    setToday(date.toLocaleDateString('en-CA'));
    date.setDate(date.getDate() + 1);
    setTomorrow(date.toLocaleDateString('en-CA'));
  }, [today, tomorrow])

  function closeModal() {
    setIsOpen(false);
  }

  const handleKeyDown = (e) => {
    if (
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.metaKey ||
      e.key === 'Tab' ||
      e.key === 'Delete' ||
      e.key === 'Backspace' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    )
      return;
    if (!isFinite(e.key)) e.preventDefault();
  };

  const update = (e) => {
    let { name, value } = e.target;
    if (name === 'parkID' || name === 'nights')
      value = value.replace(/[^0-9]/g, '');
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const addPark = async () => {
    if (!(formData.parkID && formData.start && formData.end)) return;

    try {
      const res = await axios.post('/parks', formData);
      if (res.status === 201) {
        props.refresh();
        setFormData(formDataInit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Add Park"
      onRequestClose={closeModal}
    >
      <h2>Add Park</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="parkID"
          onChange={update}
          value={formData.parkID}
          onKeyDown={handleKeyDown}
          placeholder="Park ID"
        />
        <label>
          Start Date:
          <input
            type="date"
            name="start"
            min={today}
            onChange={update}
            value={formData.start}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="end"
            min={tomorrow}
            onChange={update}
            value={formData.end}
          />
        </label>
        <input
          type="text"
          name="nights"
          onChange={update}
          value={formData.nights}
          onKeyDown={handleKeyDown}
          placeholder="Nights (optional)"
        />
      </div>
      <button onClick={addPark}>submit</button>
      <button onClick={closeModal}>close</button>
    </ReactModal>
  );
}
