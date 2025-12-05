// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';

// import SubscriptionScreen from '../screens/SubscriptionScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import { ComponentType } from 'react';
// import ImageScreen from '../screens/ImageScreen';
// import EditProfileScreen from '../screens/ProfileTab/EditProfileScreen';
// import NotificationsScreen from '../screens/ProfileTab/NotificationsScreen';
// import SettingsScreen from '../screens/ProfileTab/SettingsScreen';
// import TermsScreen from '../screens/ProfileTab/TermsScreen';
// import HelpScreen from '../screens/SubscriptionandFeature';
// import CategoryDetailScreen from '../screens/CategoryDetailScreen';

// import DailyJournalScreen from '../screens/DailyJournalScreen';
// import HomeGame from '../screens/Game/HomeGame';
// import BoxBreathingGame from '../screens/Game/BoxBreathingGame';

// import ScoresScreen from '../screens/Game/ScoresScreen';
// import TapHappyGame from '../screens/Game/TapHappyGame';
// import PaymentWebView from '../screens/PaymentWebView';
// import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
// import ConsultScreen from '../screens/ConsultScreen';
// import SubscriptionandFeature from '../screens/SubscriptionandFeature';
// import VideoMeetingScreen from '../components/BookinMeet/VideoMeetingScreen';
// import SubscriptionDetailsScreen from '../screens/SubscriptionDetails';

// export type AuthStackParamList = {
//   Login: undefined;
//   Signup: undefined;
//   Main: undefined;
//   Splash: undefined;   // 👈 Add this
//   Onboard: undefined;   
//   EditProfileScreen: undefined;   
//   NotificationsScreen: undefined;   
//   SettingsScreen: undefined;   
//   TermsScreen: undefined;   
//   HelpScreen: undefined;   
//   Subscription: undefined;   
//   CategoryDetail: undefined;   
//   Journal: undefined;   
//   home: undefined;   
//   breathing: undefined;   
//   tapHappy: undefined;   
//   scores: undefined;   
//   PaymentWebView: undefined;   
//   PaymentSuccess: undefined;   
//   Video: undefined;   
//   SubscriptionDetails: undefined;   

// };

// export type MainTabParamList = {
//   Home: undefined;
//   Consults: undefined;
//   Subscription: undefined;
//   Profile: undefined;
// };

// export interface RouteConfig<T extends string = string> {
//   name: T;
//   component: ComponentType<any>;
//   options?: any;
//   icon?: string;
//   showBackButton?: boolean;
//   color?:string
// }

// export const authRoutes: RouteConfig<keyof AuthStackParamList>[] = [
//   { name: 'Login', component: LoginScreen, options: { headerShown: false, title: 'Login', showBackButton: false } },
//   { name: 'Signup', component: SignupScreen, options: { headerShown: true, title: 'Signup',showBackButton: false  } },
//   { name: 'Onboard', component: ImageScreen, options: { headerShown: false, title: 'Onboard',showBackButton: false  } },
//   { name: 'EditProfileScreen', component:EditProfileScreen , options: { headerShown: true, title: 'Edit Profile',showBackButton: true  } },
//   { name: 'NotificationsScreen', component:NotificationsScreen , options: { headerShown: true, title: 'Notifications',showBackButton: false  } },
//   { name: 'SettingsScreen', component:SettingsScreen , options: { headerShown: true, title: 'Settings',showBackButton: false  } },
//   { name: 'TermsScreen', component:TermsScreen , options: { headerShown: true, title: 'Terms ',showBackButton: false  } },
//   { name: 'HelpScreen', component:SubscriptionandFeature , options: { headerShown: true, title: 'Subscription',showBackButton: false  } },
//   { name: 'CategoryDetail', component:CategoryDetailScreen , options: { headerShown: true, title: 'CategoryDetail',showBackButton: false  } },
//   { name: 'Subscription', component:SubscriptionScreen,options: { headerShown: false, title: 'Subscription',showBackButton: false  }},
//   { name: 'Journal', component:DailyJournalScreen,options: { headerShown: true, title: 'Journal',showBackButton: true  }},
//   { name: 'home', component:HomeGame,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
//   { name: 'breathing', component:BoxBreathingGame,options: { headerShown: true, title: 'Breathing',showBackButton: true  }},
//   { name: 'tapHappy', component:TapHappyGame,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
//   { name: 'scores', component:ScoresScreen,options: { headerShown: false, title: 'Journal',showBackButton: true  }},
//   { name: 'PaymentWebView', component:PaymentWebView,options: { headerShown: false, title: 'PaymentWebView',showBackButton: true  }},
//   { name: 'PaymentSuccess', component:PaymentSuccessScreen,options: { headerShown: false, title: 'PaymentSuccess',showBackButton: true  }},
//   { name: 'Video', component:VideoMeetingScreen,options: { headerShown: false, title: 'Video',showBackButton: true  }},
//   { name: 'SubscriptionDetails', component:SubscriptionDetailsScreen,options: { headerShown: true, title: 'Subscription Details',showBackButton: true  }},
// ];


// export const mainRoutes: RouteConfig<keyof MainTabParamList>[] = [
//   { name: 'Home', component: HomeScreen, icon: 'home', options: { headerShown: false, title: 'Home',back:false },color:"red" },
//   { name: 'Consults', component: ConsultScreen, icon: 'message-text', options: { headerShown: true, title: 'Consults',back:true },color:"blue" },
//   // { name: 'Subscription', component: SubscriptionScreen, icon: 'crown', options: { headerShown: false, title: 'Subscription' } },
//   { name: 'Profile', component: ProfileScreen, icon: 'account', options: { headerShown: true, title: 'Profile',back:true },color:"pink" },
// ];


import { ComponentType } from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SubscriptionScreen from '../components/CommonSubscription';
import ProfileScreen from '../screens/ProfileScreen';
import ImageScreen from '../screens/ImageScreen';
import EditProfileScreen from '../screens/ProfileTab/EditProfileScreen';
import NotificationsScreen from '../screens/ProfileTab/NotificationsScreen';
import SettingsScreen from '../screens/ProfileTab/SettingsScreen';
import TermsScreen from '../screens/ProfileTab/TermsScreen';
import SubscriptionandFeature from '../screens/SubscriptionandFeature';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import DailyJournalScreen from '../screens/DailyJournalScreen';
import HomeGame from '../screens/Game/HomeGame';
import BoxBreathingGame from '../screens/Game/BoxBreathingGame';
import ScoresScreen from '../screens/Game/ScoresScreen';
import TapHappyGame from '../screens/Game/TapHappyGame';
import PaymentWebView from '../screens/PaymentWebView';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import ConsultScreen from '../screens/ConsultScreen';
import VideoMeetingScreen from '../components/BookinMeet/VideoMeetingScreen';
import SubscriptionDetailsScreen from '../screens/SubscriptionDetails';
import ExtraFeeScreen from '../screens/ExtraFeeScreen';

// ----------------------
// 1️⃣ Route Types
// ----------------------
export interface RouteConfig<T extends string = string> {
  name: T;
  component: ComponentType<any>;
  options?: any;
  icon?: string;
  showBackButton?: boolean;
  color?: string;
}

// ----------------------
// 2️⃣ Centralized Route Names
// ----------------------
export const AuthStackRoutes = {
  Login: 'Login',
  Signup: 'Signup',
  Onboard: 'Onboard',
  EditProfileScreen: 'EditProfileScreen',
  NotificationsScreen: 'NotificationsScreen',
  SettingsScreen: 'SettingsScreen',
  TermsScreen: 'TermsScreen',
  HelpScreen: 'HelpScreen',
  Subscription: 'Subscription',
  CategoryDetail: 'CategoryDetail',
  Journal: 'Journal',
  HomeGame: 'home',
  BoxBreathing: 'breathing',
  TapHappy: 'tapHappy',
  Scores: 'scores',
  PaymentWebView: 'PaymentWebView',
  PaymentSuccess: 'PaymentSuccess',
  VideoMeeting: 'Video',
  SubscriptionDetails: 'SubscriptionDetails',
  Main:"Main",
  ExtraFee:"ExtraFee"
} as const;

export const MainTabRoutes = {
  Home: 'Home',
  Consults: 'Consults',
  Profile: 'Profile',
} as const;

// ----------------------
// 3️⃣ Auth Stack Routes
// ----------------------
export const authRoutes: RouteConfig<keyof typeof AuthStackRoutes>[] = [
  { name: AuthStackRoutes.Login, component: LoginScreen, options: { headerShown: false } },
  { name: AuthStackRoutes.Signup, component: SignupScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.Onboard, component: ImageScreen, options: { headerShown: false } },
  { name: AuthStackRoutes.EditProfileScreen, component: EditProfileScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.NotificationsScreen, component: NotificationsScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.SettingsScreen, component: SettingsScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.TermsScreen, component: TermsScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.HelpScreen, component: SubscriptionandFeature, options: { headerShown: true } },
  { name: AuthStackRoutes.Subscription, component: SubscriptionScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.CategoryDetail, component: CategoryDetailScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.Journal, component: DailyJournalScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.HomeGame, component: HomeGame, options: { headerShown: false } },
  { name: AuthStackRoutes.BoxBreathing, component: BoxBreathingGame, options: { headerShown: true } },
  { name: AuthStackRoutes.TapHappy, component: TapHappyGame, options: { headerShown: false } },
  { name: AuthStackRoutes.Scores, component: ScoresScreen, options: { headerShown: false } },
  { name: AuthStackRoutes.PaymentWebView, component: PaymentWebView, options: { headerShown: false } },
  { name: AuthStackRoutes.PaymentSuccess, component: PaymentSuccessScreen, options: { headerShown: false } },
  { name: AuthStackRoutes.VideoMeeting, component: VideoMeetingScreen, options: { headerShown: false } },
  { name: AuthStackRoutes.SubscriptionDetails, component: SubscriptionDetailsScreen, options: { headerShown: true } },
  { name: AuthStackRoutes.ExtraFee, component: ExtraFeeScreen, options: { headerShown: false } },
];

// ----------------------
// 4️⃣ Main Tab Routes
// ----------------------
export const mainRoutes: RouteConfig<keyof typeof MainTabRoutes>[] = [
  { name: MainTabRoutes.Home, component: HomeScreen, icon: 'home', options: { headerShown: false,back:false }, color: 'red' },
  { name: MainTabRoutes.Consults, component: ConsultScreen, icon: 'message-text', options: { headerShown: true,back:true }, color: 'blue' },
  { name: MainTabRoutes.Profile, component: ProfileScreen, icon: 'account', options: { headerShown: true ,back:true}, color: 'pink' },
];



// ----------------------
// ✅ Usage Examples
// ----------------------
// navigation.navigate(AuthStackRoutes.Login)
// navigation.navigate(MainTabRoutes.Home)
