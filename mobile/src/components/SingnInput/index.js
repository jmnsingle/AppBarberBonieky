import React from 'react';

import { Container, Input } from './styles';

const SingnInput = ({ IconSvg, placeholder, value, onChangeText, passwordVisible }, ...rest) => {
  return (
    <Container>
      <IconSvg width='24' height='24' color='#268596' />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={passwordVisible}
        {...rest}
      />
    </Container>
  );
}

export default SingnInput;
