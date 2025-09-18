import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ComponentType } from 'react';
import ImageScreen from '../screens/ImageScreen';
import EditProfileScreen from '../screens/ProfileTab/EditProfileScreen';
import NotificationsScreen from '../screens/ProfileTab/NotificationsScreen';
import SettingsScreen from '../screens/ProfileTab/SettingsScreen';
import TermsScreen from '../screens/ProfileTab/TermsScreen';
import HelpScreen from '../screens/HelpScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import DailyJournalScreen from '../screens/DailyJournalScreen';
import HomeGame from '../screens/Game/HomeGame';
import BoxBreathingGame from '../screens/Game/BoxBreathingGame';

import ScoresScreen from '../screens/Game/ScoresScreen';
import TapHappyGame from '../screens/Game/TapHappyGame';
import PaymentWebView from '../screens/PaymentWebView';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Splash: undefined;   // 👈 Add this
  Onboard: undefined;   
  EditProfileScreen: undefined;   
  NotificationsScreen: undefined;   
  SettingsScreen: undefined;   
  TermsScreen: undefined;   
  HelpScreen: undefined;   
  Subscription: undefined;   
  CategoryDetail: undefined;   
  Journal: undefined;   
  home: undefined;   
  breathing: undefined;   
  tapHappy: undefined;   
  scores: undefined;   
  PaymentWebView: undefined;   
  PaymentSuccess: undefined;   

};

export type MainTabParamList = {
  Home: undefined;
  Consults: undefined;
  Subscription: undefined;
  Profile: undefined;
};

export interface RouteConfig<T extends string = string> {
  name: T;
  component: ComponentType<any>;
  options?: any;
  icon?: string;
  showBackButton?: boolean;
  color?:string
}

export const authRoutes: RouteConfig<keyof AuthStackParamList>[] = [
  { name: 'Login', component: LoginScreen, options: { headerShown: false, title: 'Login', showBackButton: false } },
  { name: 'Signup', component: SignupScreen, options: { headerShown: true, title: 'Signup',showBackButton: false  } },
  { name: 'Onboard', component: ImageScreen, options: { headerShown: false, title: 'Onboard',showBackButton: false  } },
  { name: 'EditProfileScreen', component:EditProfileScreen , options: { headerShown: true, title: 'Edit Profile',showBackButton: true  } },
  { name: 'NotificationsScreen', component:NotificationsScreen , options: { headerShown: true, title: 'Notifications',showBackButton: false  } },
  { name: 'SettingsScreen', component:SettingsScreen , options: { headerShown: true, title: 'Settings',showBackButton: false  } },
  { name: 'TermsScreen', component:TermsScreen , options: { headerShown: true, title: 'Terms ',showBackButton: false  } },
  { name: 'HelpScreen', component:HelpScreen , options: { headerShown: true, title: 'Subscription',showBackButton: false  } },
  { name: 'CategoryDetail', component:CategoryDetailScreen , options: { headerShown: true, title: 'CategoryDetail',showBackButton: false  } },
  { name: 'Subscription', component:SubscriptionScreen,options: { headerShown: false, title: 'Subscription',showBackButton: false  }},
  { name: 'Journal', component:DailyJournalScreen,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
  { name: 'home', component:HomeGame,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
  { name: 'breathing', component:BoxBreathingGame,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
  { name: 'tapHappy', component:TapHappyGame,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
  { name: 'scores', component:ScoresScreen,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
  { name: 'PaymentWebView', component:PaymentWebView,options: { headerShown: false, title: 'PaymentWebView',showBackButton: true  }},
  { name: 'PaymentSuccess', component:PaymentSuccessScreen,options: { headerShown: false, title: 'PaymentSuccess',showBackButton: true  }},
];


export const mainRoutes: RouteConfig<keyof MainTabParamList>[] = [
  { name: 'Home', component: HomeScreen, icon: 'home', options: { headerShown: false, title: 'Home' },color:"red" },
  { name: 'Consults', component: BookingScreen, icon: 'message-text', options: { headerShown: true, title: 'Consults' },color:"blue" },
  // { name: 'Subscription', component: SubscriptionScreen, icon: 'crown', options: { headerShown: false, title: 'Subscription' } },
  { name: 'Profile', component: ProfileScreen, icon: 'account', options: { headerShown: false, title: 'Profile' },color:"pink" },
];
