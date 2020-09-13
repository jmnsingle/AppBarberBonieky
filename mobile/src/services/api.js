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

  signOut: async () => {
    const token = await AsyncStorage.getItem('token');

    await fetch(`${BASER_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ token }),
    });

    return;
  },

  getBarbers: async (latitude=null, longitude=null, address=null) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASER_URL}/barbers?token=${token}&lat=${latitude}&lng=${longitude}&address=${address}`);
    const responseToJson = await req.json();

    return responseToJson;
  },

  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASER_URL}/barber/${id}?token=${token}`);

    const responseToJson = await req.json();
    return responseToJson;
  },

  setFavorited: async (barberId) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASER_URL}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ barber: barberId, token }),
    });

    const responseToJson = await req.json();

    return responseToJson;
  },

  setAppointments: async (
    userId,
    serviceChoosed,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour
  ) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASER_URL}/user/appointment`, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({
        token,
        id: userId,
        service: serviceChoosed,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour
      }),
    });

    const responseToJson = await req.json();

    return responseToJson;
  }
}
