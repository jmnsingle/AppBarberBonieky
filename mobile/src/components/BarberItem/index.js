import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const goToBarber = useCallback(() => {
    navigation.navigate('Barber', {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      stars: data.stars,
    });
  },[]);

  return (
    <Container onPress={goToBarber}>
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
