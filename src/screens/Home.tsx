import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import colors from '../colors';
import {useDB} from '../context';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(41, 30, 95, 0.1);
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Home: React.FC<IProps> = ({navigation}) => {
  const unitId =
    Platform.OS === 'ios'
      ? 'ca-app-pub-2931981606209596/7244275057'
      : 'ca-app-pub-2931981606209596/4359091419';

  const bannerRef = useRef(null);
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  useEffect(() => {
    const feelings = realm?.objects('Feeling');
    feelings?.addListener(feelings => {
      LayoutAnimation.spring();
      setFeelings(feelings.sorted('_id', true));
    });
    return () => {
      feelings?.removeAllListeners();
    };
  }, [realm]);

  const onPress = id => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey('Feeling', id);
      realm.delete(feeling);
    });
  };

  return (
    <>
      <View>
        <Title>My journal</Title>
        <FlatList
          data={feelings}
          contentContainerStyle={{paddingVertical: 10}}
          ItemSeparatorComponent={Separator}
          keyExtractor={feeling => feeling._id + ''}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPress(item._id)}>
              <Record>
                <Emotion>{item.emotion}</Emotion>
                <Message>{item.message}</Message>
              </Record>
            </TouchableOpacity>
          )}
        />
        <Btn onPress={() => navigation.navigate('Write')}>
          <Ionicons name="add" color="white" size={40} />
        </Btn>
      </View>
      <BannerAd
        ref={bannerRef}
        size={BannerAdSize.ADAPTIVE_BANNER}
        unitId={TestIds.BANNER}
        onAdFailedToLoad={error => console.error(error)}
      />
    </>
  );
};
export default Home;
