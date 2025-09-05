import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { authRoutes, mainRoutes, AuthStackParamList, MainTabParamList } from './Routes';
import AppHeader from '../components/AppHeader';

const Stack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTasbs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const current = mainRoutes.find(r => r.name === route.name);
        return {
          header: (props: any) => <AppHeader {...props} title={current?.options?.title ?? current?.name} />,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name={current?.icon ?? 'circle'} size={size} color={color} />
          ),
        };
      }}
    >
      {mainRoutes.map(route => (
        <Tab.Screen key={route.name} name={route.name as any} component={route.component} options={route.options} />
      ))}
    </Tab.Navigator>
  );
}
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // hide default header, since you use AppHeader
      }}
    >
      {mainRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name as any}
          component={route.component}
          options={{
            ...route.options,
            tabBarIcon: ({ color, size }) => (
              <Icon name={route.icon ?? 'circle'} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {authRoutes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name as any}
          component={route.component}
          options={{
            ...route.options,
            header: (props: any) => <AppHeader {...props} title={route.options?.title ?? route.name} />,
          }}
        />
      ))}

      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
