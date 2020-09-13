import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import api from '../../services/api';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

import FavoriteIcon from '../../assets/favorite.svg';
import IsFavoritedIcon from '../../assets/favorite_full.svg';
import GoBackIcon from '../../assets/back.svg';
import BackButtonIcon from '../../assets/nav_prev.svg';
import NextButtonIcon from '../../assets/nav_next.svg';

import {
  Container,
  Scroller,
  SwiperDot,
  SwiperItem,
  SwiperImage,
  FakeSwipper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  UserAvatar,
  Info,
  UserInfoName,
  FavoriteButton,
  GoBackButton,
  LoadingIcon,

  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceButton,
  ServiceButtonText,

  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';

const Barber = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ loading, setLoading ] = useState(false);
  const [ isFavorited, setIsFavorited ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ serviceChoosed, setServiceChoosed ] = useState('');
  const [ userInfo, setUserInfo ] = useState({
    id: route.params.id,
    name: route.params.name,
    avatar: route.params.avatar,
    stars: route.params.stars,
  });

  useEffect(() => {

    const getBarberInfo = async () => {
      setLoading(true);
      const response = await api.getBarber(userInfo.id);

      console.log(response.data.services);
      if (response.error == '') {
        setUserInfo(response.data);
        setIsFavorited(response.data.favorited);
      } else {
        alert('Error: ', response.error);
      }
      setLoading(false);

    };

    getBarberInfo();

  },[]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleFavorite = useCallback(async () => {
    setIsFavorited(!isFavorited);

    await api.setFavorited(userInfo.id);

  },[isFavorited]);

  const handleServiceChoosed = (index) => {
    setServiceChoosed(index);
    setModal(true);
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ?
        <Swiper
            style={{height: 260}}
            dot={<SwiperDot/>}
            activeDot={<SwiperDot active/>}
            paginationStyle={{top: 25, right: 15, bottom: null, left: null}}
            autoplay
          >
            {userInfo.photos.map((item, index) => (
              <SwiperItem key={index}>
                <SwiperImage source={{ uri: item.url }} resizeMode='cover'/>
              </SwiperItem>
            ))}

          </Swiper>
          :
          <FakeSwipper />
        }

        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{ uri: userInfo.avatar }} />

            <Info>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber />
            </Info>
            <FavoriteButton onPress={handleFavorite}>
              {isFavorited ?
                <IsFavoritedIcon height='24' width='24' fill='#666' />
                :
                <FavoriteIcon height='24' width='24' fill='#666' />
              }
            </FavoriteButton>
          </UserInfoArea>

          {loading &&
            <LoadingIcon size='large' color='#666' />
          }

          {userInfo.services &&
            <ServiceArea>
              <ServicesTitle>Lista de serviços</ServicesTitle>
              {userInfo.services.map((item, index) => (
                <ServiceItem key={index}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceButton onPress={() => handleServiceChoosed(index)}>
                    <ServiceButtonText>Agendar</ServiceButtonText>
                  </ServiceButton>
                </ServiceItem>
              ))}
          </ServiceArea>
          }

          {userInfo.testimonials && userInfo.testimonials.length > 0 &&
            <TestimonialArea>
              <Swiper
                style={{ height: 110 }}
                showsPagination={false}
                showsButtons
                autoplay
                prevButton={<BackButtonIcon width='25' height='25' fill='#000' />}
                nextButton={<NextButtonIcon width='25' height='25' fill='#000' />}
              >
                {userInfo.testimonials.map((item, index) => (
                  <TestimonialItem key={index}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>

                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          }
        </PageBody>
      </Scroller>
      <GoBackButton onPress={handleGoBack}>
        <GoBackIcon width='44' height='44' fill='#fff' />
      </GoBackButton>

      <BarberModal
        showModal={modal}
        setShowModal={setModal}
        userData={userInfo}
        serviceChoosed={serviceChoosed || null}
      />
    </Container>
  );
}

export default Barber;
