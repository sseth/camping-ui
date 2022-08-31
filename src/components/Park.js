import styled from 'styled-components/macro';
import React from 'react';

import unavailable from '../images/image-unavailable.jpg';
import { ReactComponent as Svg } from '../images/unavailable.svg';

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
  background-image: url(${unavailable});

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
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
            <Svg />
            <figcaption>Image Unavailable</figcaption>
          </figure>
        </Unavailable>
      )}
      <Content>
        <h3>{name}</h3>
        <button onClick={props.openModal}>add dates</button>
      </Content>
    </ParkDiv>
  );
}

// thumbnails: 700 x 525
// backup: 460 x 358
