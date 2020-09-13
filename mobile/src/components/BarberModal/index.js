import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import api from '../../services/api';

import ExpandIcon from '../../assets/expand.svg';
import BackButtonIcon from '../../assets/nav_prev.svg';
import NextButtonIcon from '../../assets/nav_next.svg';

import {
  Container,
  ModalArea,
  ModalBody,
  CloseButton,
  ModalItem,
  UserInfo,
  UserAvatar,
  UserName,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  FinishButton,
  FinishButtonText,
  DateInfo,
  DatePrevArea,
  DateNextArea,
  DateTitleArea,
  DateTitle,
  ListDays,
  DateItem,
  DateItemWeekDay,
  DateItemNumber,
  TimeList,
  TimeItem,
  TimeText,
} from './styles';


const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const days = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb'
];

const BarberModal = ({ showModal, setShowModal, userData, serviceChoosed }) => {
  const navigation = useNavigation();

  const [ selectedYear, setSelectedYear ] = useState(0);
  const [ selectedMonth, setSelectedMonth ] = useState(0);
  const [ selectedDay, setSelectedDay ] = useState(0);
  const [ selectedHour, setSelectedHour ] = useState(null);
  const [ listDays, setListDays ] = useState([]);
  const [ listHours, setListHours ] = useState([]);

  useEffect(() => {
    if (userData.available) {
      if (selectedDay > 0) {
        const auxDate = new Date(selectedYear, selectedMonth, selectedDay);
        const year = auxDate.getFullYear();
        let month = auxDate.getMonth() + 1;
        let day = auxDate.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const finalDate = year + '-' + month + '-' + day;

        const availability = userData.available.filter(elem => elem.date === finalDate);

        if (availability.length > 0) {
          setListHours(availability[0].hours);
        }

      }
    }
    setSelectedHour(null);
  },[userData, selectedDay]);

  useEffect(() => {
    let newListDays = [];
    if (userData.available) {
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        const auxDate = new Date(selectedYear, selectedMonth, i);
        const year = auxDate.getFullYear();
        let month = auxDate.getMonth() + 1;
        let day = auxDate.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const finalDate = year + '-' + month + '-' + day;

        const availability = userData.available.filter(elem => elem.date === finalDate);

        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekDay: days[ auxDate.getDay() ],
          number: i,
        })
      }
    }

    setListDays(newListDays);
    setSelectedDay(0);
    setListHours([]);
    setSelectedHour(0);

  }, [userData, selectedYear, selectedMonth])

  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  },[]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  },[]);

  const handlePrevDate = () => {
    let prevDate = new Date(selectedYear, selectedMonth, 1);
    prevDate.setMonth(prevDate.getMonth() - 1);
    setSelectedYear(prevDate.getFullYear());
    setSelectedMonth(prevDate.getMonth());
    setSelectedDay(0);
  };

  const handleNextDate = () => {
    let nextDate = new Date(selectedYear, selectedMonth, 1);
    nextDate.setMonth(nextDate.getMonth() + 1);
    setSelectedYear(nextDate.getFullYear());
    setSelectedMonth(nextDate.getMonth());
    setSelectedDay(0);
  };

  const handleFinish = async () => {
        console.log('userData', userData);
        console.log('serviceChoosed', serviceChoosed);
        console.log('selectedYear', selectedYear);
        console.log('selectedMonth', selectedMonth);
        console.log('selectedDay', selectedDay);
        console.log('selectedHour', selectedHour);

    if (
      userData.id &&
      serviceChoosed != null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour != null
    ) {
      // const response = await api.setAppointment(
      //   userData.id,
      //   serviceChoosed,
      //   selectedYear,
      //   selectedMonth,
      //   selectedDay,
      //   selectedHour
      // );

      // if (response.erro == '') {
      //   setShowModal(false);
      //   navigation.reset({
      //     routes: [{ name: 'Appointments' },]
      //   });
      // } else {
      //   alert('Error: ', response.error);
      // }
      navigation.navigate('Appointments');
      setShowModal(false);
    } else {
      alert('Preencha todos os dados.');
    }
  };

  return (
    <Container
      transparent
      visible={showModal}
      animationType='slide'
    >
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={closeModal}>
            <ExpandIcon width='40' height='40' fill='#000' />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{ uri: userData.avatar }} />
              <UserName>{userData.name}</UserName>
            </UserInfo>
          </ModalItem>

          {serviceChoosed != null &&
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{userData.services[serviceChoosed].name}</ServiceName>
                <ServicePrice>R${userData.services[serviceChoosed].price.toFixed(2)}</ServicePrice>
              </ServiceInfo>
            </ModalItem>
          }

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handlePrevDate}>
                <BackButtonIcon height='35' width='35' fill='#000' />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle> {months[selectedMonth]} {selectedYear}</DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleNextDate}>
                <NextButtonIcon height='35' width='35' fill='#000' />
              </DateNextArea>
            </DateInfo>

            <ListDays
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {listDays.map((item, index) => (
                <DateItem
                  key={index}
                  onPress={() => setSelectedDay(item.number)}
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor: item.number === selectedDay ? '#4eadbe' : '#fff'
                  }}
                  disabled={!item.status}
                >
                  <DateItemWeekDay
                    style={{color: item.number === selectedDay ? '#fff' : '#000'}}
                  >{item.weekDay}</DateItemWeekDay>
                  <DateItemNumber
                    style={{color: item.number === selectedDay ? '#fff' : '#000'}}
                  >{item.number}</DateItemNumber>
                </DateItem>
              ))}
            </ListDays>
          </ModalItem>

          {listHours.length > 0 &&
            <ModalItem>
              <TimeList
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {listHours.map((item, index) => (
                  <TimeItem
                    key={index}
                    onPress={() => setSelectedHour(item)}
                    style={{backgroundColor: item === selectedHour ? '#4eadbe' : '#fff'}}
                  >
                    <TimeText
                      style={{color: item === selectedHour ? '#fff' : '#000'}}
                    >{item}</TimeText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          }

          <FinishButton onPress={handleFinish}>
            <FinishButtonText>Finalizar agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Container>
  );
}

export default BarberModal;
