import styled from 'styled-components/macro';
import React from 'react';

import bg from '../images/image-unavailable.jpg';
import { ReactComponent as Trash } from '../images/trash-can.svg';
import { ReactComponent as NotFoundIcon } from '../images/unavailable.svg';

const Delete = styled.button`
  width: 22px;
  height: 22px;
  border: none;
  cursor: pointer;
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;

  & svg:hover {
    fill: #f55;
  }
`;

const Thumbnail = styled.img`
  height: 100%;
  margin-right: 30px;
  align-self: center;
`;

const Unavailable = styled.div`
  width: 43.8%;
  height: 100%;
  display: flex;
  margin-right: 30px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${bg});

  & figure {
    fill: #fff;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  & figure svg {
    width: 50%;
    height: 50%;
  }
`;

const Content = styled.div`
  padding-top: 20px;
`;

const ParkDiv = styled.div`
  width: 800px;
  display: flex;
  height: 262.5px;
  margin-top: 50px;
  position: relative;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  & .delete {
    display: none;
  }

  &:hover .delete {
    display: block;
  }
`;

export default function Park(props) {
  const { name, thumbnailUrl } = props.data;

  return (
    <ParkDiv>
      {thumbnailUrl ? (
        <Thumbnail src={thumbnailUrl} alt="thumbnail" />
      ) : (
        <Unavailable>
          <figure aria-label="unavailable">
            <NotFoundIcon />
            <figcaption>Image Unavailable</figcaption>
          </figure>
        </Unavailable>
      )}
      <Content>
        <h3>{name}</h3>
        <button onClick={props.openDatesModal}>add dates</button>
      </Content>
      <Delete className="delete" onClick={props.openDeleteModal}>
        <Trash />
      </Delete>
    </ParkDiv>
  );
}

// thumbnails: 700 x 525
// backup: 460 x 358
