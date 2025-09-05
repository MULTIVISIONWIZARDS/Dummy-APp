import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ComponentType } from 'react';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Subscription: undefined;
  Profile: undefined;
};

export interface RouteConfig<T extends string = string> {
  name: T;
  component: ComponentType<any>;
  options?: any;
  icon?: string;
}

export const authRoutes: RouteConfig<keyof AuthStackParamList>[] = [
  { name: 'Login', component: LoginScreen, options: { headerShown: true, title: 'Login' } },
  { name: 'Signup', component: SignupScreen, options: { headerShown: true, title: 'Signup' } },
];

export const mainRoutes: RouteConfig<keyof MainTabParamList>[] = [
  { name: 'Home', component: HomeScreen, icon: 'home', options: { headerShown: true, title: 'Home' } },
  { name: 'Bookings', component: BookingScreen, icon: 'calendar', options: { headerShown: true, title: 'Bookings' } },
  { name: 'Subscription', component: SubscriptionScreen, icon: 'crown', options: { headerShown: true, title: 'Subscription' } },
  { name: 'Profile', component: ProfileScreen, icon: 'account', options: { headerShown: true, title: 'Profile' } },
];
