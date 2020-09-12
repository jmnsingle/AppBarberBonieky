import React from 'react';

import Stars from '../Stars';

import {
  Container,
  Avatar,
  InfoArea,
  UserName,
  SeeProfile,
  SeeProfileText
} from './styles';

const BarberItem = ({ data }) => {
  return (
    <Container>
      <Avatar source={{ uri: data.avatar }} />


      <InfoArea>
        <UserName>{data.name}</UserName>

        <Stars stars={data.stars} showNumber={true}/>

        <SeeProfile>
          <SeeProfileText>Ver perfil</SeeProfileText>
        </SeeProfile>
      </InfoArea>
    </Container>
  );
}

export default BarberItem;
