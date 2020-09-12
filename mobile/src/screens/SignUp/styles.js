import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #63c2d1;
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export const InputArea = styled.View`
  padding: 40px;
  align-self: stretch;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #268596;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const SignButtonText = styled.Text`
  font-size: 16px;
  color: #268596;
`;

export const SignButtonTextBold = styled.Text `
font-size: 18px;
  color: #1a5863;
  /* font-weight: bold; */
  margin-left: 5px;
`;
