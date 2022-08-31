import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
// import axios from 'axios';

import ModalB from './Modal2';
import ModalA from './Modal';
import Park from './Park';

// const Main = styled.main`
//   max-width: 50%;
//   min-width: 960px;
//   margin: 50px auto;
//   padding-top: 50px;
//   padding-bottom: 50px;
//   border: 1px solid rgba(0, 0, 0, 0.2);
// `;

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
  
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  
  useEffect(() => {
    if (props.data.length) console.log('setting main.parks');
    setParks(
      props.data.map((park) => (
        <Park
          key={park._id}
          data={park}
          openModal={() => {
            setActivePark(park);
            setIsOpenA(true);
          }}
        />
      ))
    );
  }, [props.data]);

  return (
    <Main>
      <button onClick={() => setIsOpenB(true)}>add park</button>
      <ModalA
        isOpen={isOpenA}
        setIsOpen={setIsOpenA}
        data={activePark}
        refresh={props.refresh}
      />
      <ModalB isOpen={isOpenB} setIsOpen={setIsOpenB} />
      {parks.length ? parks : <div>Loading...</div>}
    </Main>
  );
}
