import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

import styled from 'styled-components/native';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const View = styled.View``;
const Text = styled.Text``;

const Write: React.FC<IProps> = () => (
  <View>
    <Text>Write</Text>
  </View>
);
export default Write;
