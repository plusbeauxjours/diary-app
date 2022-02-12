import React, {useState} from 'react';

import Realm from 'realm';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './navigator';
import {DBContext} from './context';
import {useEffect} from 'react';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string',
  },
  primaryKey: '_id',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: 'nomadDiaryDB',
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };

  const onFinish = () => setReady(true);

  useEffect(() => {
    if (!ready) {
      try {
        startLoading();
      } catch (e) {
        console.log(e);
      } finally {
        onFinish();
      }
    }
  }, [ready]);

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
