import React, { useCallback, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../contexts/UserContext';

import SignInput from '../../components/SingnInput'
import api from '../../services/api';

import BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
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

const SignUp = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const navigation = useNavigation();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleRegister = useCallback(async () => {
    if (name.trim() != "" && email.trim() != "" && password != "") {
      const response = await api.signUp(name, email, password);

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
  },[name, email, password]);

  const handleNavigateToSignIn = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  },[]);

  return (
    <Container>
      <BarberLogo width="100%" height="160 " />

      <InputArea>
        <SignInput
          placeholder="Digite seu nome"
          IconSvg={PersonIcon}
          value={name}
          onChangeText={text => setName(text)}
        />
        <SignInput
          placeholder="Digite seu email"
          IconSvg={EmailIcon}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <SignInput
          placeholder="Digite sua senha"
          IconSvg={LockIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          passwordVisible={true}
        />

        <CustomButton onPress={handleRegister}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleNavigateToSignIn}>
        <SignButtonText>Já tenho uma conta!</SignButtonText>
        <SignButtonTextBold>Fazer login.</SignButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}

export default SignUp;
