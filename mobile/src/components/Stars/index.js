import React from 'react';

import FullStar from '../../assets/star.svg';
import HalfStar from '../../assets/star_half.svg';
import EmptyStar from '../../assets/star_empty.svg';

import {
  Container,
  StarView,
  StarText,
} from './styles';

const Stars = ({ stars, showNumber }) => {
  let starsRate = [0, 0, 0, 0, 0];
  //Return the first piece of stars rate
  const getStarIntegerPiece = Math.floor(stars);
  //Return the second piece of stars rate
  const getStarRestPiece = stars - getStarIntegerPiece;

  let i = 0;

  for (i; i < getStarIntegerPiece; i++) {
    starsRate[i] = 2;
  }

  if (getStarRestPiece > 0) {
    starsRate[i] = 1;
  }

  return (
    <Container>
      {starsRate.map((item, index) => (
        <StarView key={index}>
          {item === 0 && <EmptyStar width='18' height='18' fill='#ff9200' />}
          {item === 1 && <HalfStar width='18' height='18' fill='#ff9200' />}
          {item === 2 && <FullStar width='18' height='18' fill='#ff9200' />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </Container>
  );
}

export default Stars;
