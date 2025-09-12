import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { store, persistor } from './src/store';
import Toast from 'react-native-toast-message';
import toastConfig from './src/utils/toastConfig';
import Colors from './src/constants/Colors';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
         {/* <StatusBar backgroundColor='#F4F6F8' barStyle="dark-content" /> */}

          <AppNavigator />
           <Toast config={toastConfig}/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
