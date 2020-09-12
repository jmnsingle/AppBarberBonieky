import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Geolocation from 'expo-location';

import api from '../../services/api';
import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea
} from './styles';

const Home = () => {
  const [ locationText, setLocationText ] = useState('');
  const [ coords, setCoords ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ list, setList ] = useState([]);



  const handleMyLocation = useCallback(async () => {
    setCoords(null);

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    } else {
      setLoading(true);
      setLocationText('');
      setList([]);

      const location = await Geolocation.getCurrentPositionAsync({});

      setCoords(location.coords);
      getBarbers();
    }
  },[]);

  const getBarbers = useCallback(async () => {
    setLoading(true);
    setList([]);

    let latitude = null;
    let longitude = null;

    if (coords) {
      latitude=coords.latitude;
      longitude=coords.longitude;
    }

    const response = await api.getBarbers(latitude, longitude, locationText);

    if (response.error) {
      alert('Erro: ', response.error)
    } else {
      if (response.loc) {
        setLocationText(response.loc)
      }
      setList(response.data)
    }

    setLoading(false);
  },[]);

  useEffect(() => {
    getBarbers();
  },[]);

  const onRefresh = useCallback(() => {
    setRefreshing(false);
    getBarbers();
  }, []);

  const handleLocationSearch = useCallback(() => {
    setCoords({});
    getBarbers();
  },[]);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLiner={2}>Encontre seu barbeiro favorito</HeaderTitle>
          <SearchButton>
            <SearchIcon width='26' height='26' fill='#fff' />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder='Onde você está ?'
            placeholderTextColor='#fff'
            value={locationText}
            onChangeText={t => setLocationText(t)}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleMyLocation}>
            <MyLocationIcon width='24' height='24' fill='#fff' />
          </LocationFinder>
        </LocationArea>

        {loading &&
          <LoadingIcon size='large' color='#fff' />
        }

        <ListArea>
          {list.map((item, index) => (
            <BarberItem key={index} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
}

export default Home;
