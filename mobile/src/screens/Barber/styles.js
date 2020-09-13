import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwiperDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${props => props.active ? '#000' : '#fff'};
  border-radius: 5px;
  margin: 3px;
`;

export const SwiperItem = styled.View`
  flex: 1;
  background-color: #63c2d1;
`;

export const SwiperImage = styled.Image`
  width: 100%;
  height: 260px;
`;

export const FakeSwipper = styled.View`
  background-color: #63c2d1;
  height: 150px;
`;

export const PageBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 50px;
  margin-top: -85px;

  min-height: 400px;
`;

export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border: 4px;
  border-color: #fff;
`;

export const Info = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0 20px;
`;


export const ServiceArea = styled.View`
  margin-top: 30px;
`;

export const TestimonialArea = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
  background-color: #268596;
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  margin: 0 40px 0 40px;
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const TestimonialBody = styled.Text`
  color: #fff;
  font-size: 13px;
`;


export const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 0;
  z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ServicesTitle = styled.Text`
  font-size: 20px;
  color: #268596;
  margin: 0 0 20px 30px;
`;

export const ServiceItem = styled.View`
  flex-direction: row;
  margin: 0px 30px 20px 30px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  color: #268596;
`;

export const ServicePrice = styled.Text`
  color: #268596;
`;

export const ServiceButton = styled.TouchableOpacity`
  background-color: #4eadbe;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
`;
