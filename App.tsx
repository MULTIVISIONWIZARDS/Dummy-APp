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
import 'react-native-get-random-values';
import { SocketProvider } from './src/context/SocketContext';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
enableScreens(true); 
const App = () => {
  const linking = {
  prefixes: ["myapp://","https://vintagecms.cloud"],
  config: {
    screens: {
      PaymentSuccess: "payment-success",
      PaymentCancel: "payment-cancel",
    },
  },
};
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <SafeAreaProvider>
      <SocketProvider>
        <NavigationContainer linking={linking}>
         <StatusBar backgroundColor={Colors.statusBarP1} barStyle={Colors.statusBarP1Theme} />
          <AppNavigator />
           <Toast config={toastConfig}/>
        </NavigationContainer>
        </SocketProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
