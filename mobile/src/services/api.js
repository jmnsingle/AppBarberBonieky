import AsyncStorage from '@react-native-community/async-storage';

const BASER_URL = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async (token) => {
    const req = await fetch(`${BASER_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ token }),
    });

    const responseToJson = await req.json();

    return responseToJson;
  },

  signIn: async (email, password) => {
    const req = await fetch(`${BASER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ email, password }),
    });

    const responseToJson = await req.json();

    return responseToJson;
  },

  signUp: async (name, email, password) => {
    const req = await fetch(`${BASER_URL}/user`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseToJson = await req.json();

    return responseToJson;
  },

  getBarbers: async (latitude=null, longitude=null, address=null) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASER_URL}/barbers?token=${token}&lat=${latitude}&lng=${longitude}&address=${address}`);
    const responseToJson = req.json();

    return responseToJson;
  }
}
