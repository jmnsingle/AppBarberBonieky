import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

export const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

export const UserName = styled.Text`
  font-size: 17px;
`;

export const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`;

export const SeeProfile = styled.TouchableOpacity`
  width: 85px;
  height: 26px;
  border: 1px solid #4eadbe;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SeeProfileText = styled.Text`
  font-size: 13px;
  color: #268596;
`;
