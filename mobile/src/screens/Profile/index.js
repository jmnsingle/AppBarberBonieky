import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import api from '../../services/api';

import { Container } from './styles';

const Profile = () => {
  const navigation = useNavigation();

  const handleLogOut = useCallback(async () => {
    await api.signOut();

    navigation.reset({
      routes: [{ name: 'SignIn' }],
    });
  },[]);

  return (
    <Container onPress={handleLogOut}>
    </Container>
  );
}

export default Profile;
