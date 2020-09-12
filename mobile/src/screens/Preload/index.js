import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';

import { Container, LoadingIcon } from './styles';

const Preload = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if(token) {
        const response = await api.checkToken(token);
        if (response.token) {
          await AsyncStorage.setItem( 'token', response.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: response.data.avatar,
            }
          });
          navigation.reset({
            routes: [{ name: 'MainTab' }],
          });
        } else {
          alert("Token Expirado.");
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    }
    checkToken();
  },[])

  return (
    <Container>
      <BarberLogo width="100%" height="160 " />
      <LoadingIcon size='large' color='#fff' />
    </Container>
    );
}

export default Preload;
