import React, { useCallback, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import SignInput from '../../components/SingnInput'
import api from '../../services/api';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import {
  Container,
  InputArea,
  // SignInput,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignButtonText,
  SignButtonTextBold,
 } from './styles';

const SignIn = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = useCallback(async () => {
    if (email.trim() != "" && password != "") {
      const response = await api.signIn(email, password);

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
        alert('Email e/ou senha incorretos.')
      }
    } else {
      alert('Preencha todos os campos!');
    }
  },[email, password]);

  const handleNavigateToSignUp = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'SignUp' }]
    });
  },[]);

  return (
    <Container>
      <BarberLogo width="100%" height="160 " />

      <InputArea>
        <SignInput
          placeholder="Digite seu email"
          IconSvg={EmailIcon}
          onChangeText={t => setEmail(t)}
          value={email}
        />
        <SignInput
          placeholder="Digite sua senha"
          IconSvg={LockIcon}
          onChangeText={t => setPassword(t)}
          value={password}
          passwordVisible={true}
        />

        <CustomButton onPress={handleLogin}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleNavigateToSignUp}>
        <SignButtonText>Ainda não possui uma conta ?</SignButtonText>
        <SignButtonTextBold>Crie uma conta</SignButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}

export default SignIn;
