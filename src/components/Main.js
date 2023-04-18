import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import Park from './Park';
import { AddPark, AddDates, ConfirmDelete } from './Modals';

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function MainComponent(props) {
  const [parks, setParks] = useState([]);
  const [activePark, setActivePark] = useState({});

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDates, setIsOpenDates] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  useEffect(() => {
    if (props.data.length) console.log('setting main.parks');
    setParks(
      props.data.map((park) => (
        <Park
          key={park._id}
          data={park}
          openDatesModal={() => {
            setActivePark(park);
            setIsOpenDates(true);
          }}
          openDeleteModal={() => {
            setActivePark(park);
            setIsOpenDelete(true);
          }}
        />
      ))
    );
  }, [props.data]);

  return (
    <Main>
      <button onClick={() => setIsOpenAdd(true)}>add park</button>
      <AddPark
        isOpen={isOpenAdd}
        data={activePark}
        refresh={props.refresh}
        setIsOpen={setIsOpenAdd}
      />
      <AddDates
        data={activePark}
        isOpen={isOpenDates}
        refresh={props.refresh}
        setIsOpen={setIsOpenDates}
      />
      <ConfirmDelete
        data={activePark}
        isOpen={isOpenDelete}
        refresh={props.refresh}
        setIsOpen={setIsOpenDelete}
      />
      {parks.length ? parks : <div>Loading...</div>}
      {/* TODO: handle case where no parks */}
    </Main>
  );
}
