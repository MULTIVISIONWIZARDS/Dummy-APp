import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ComponentType } from 'react';
import ImageScreen from '../screens/ImageScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Splash: undefined;   // 👈 Add this
  Onboard: undefined;   // 👈 Add this

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
  showBackButton?: boolean;
}

export const authRoutes: RouteConfig<keyof AuthStackParamList>[] = [
  { name: 'Login', component: LoginScreen, options: { headerShown: false, title: 'Login', showBackButton: false } },
  { name: 'Signup', component: SignupScreen, options: { headerShown: true, title: 'Signup',showBackButton: false  } },
  { name: 'Onboard', component: ImageScreen, options: { headerShown: false, title: 'Onboard',showBackButton: false  } },
];

export const mainRoutes: RouteConfig<keyof MainTabParamList>[] = [
  { name: 'Home', component: HomeScreen, icon: 'home', options: { headerShown: false, title: 'Home' } },
  { name: 'Bookings', component: BookingScreen, icon: 'calendar', options: { headerShown: false, title: 'Bookings' } },
  { name: 'Subscription', component: SubscriptionScreen, icon: 'crown', options: { headerShown: false, title: 'Subscription' } },
  { name: 'Profile', component: ProfileScreen, icon: 'account', options: { headerShown: false, title: 'Profile' } },
];
