
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
  EditProfileScreen: 'Edit Profile',
  NotificationsScreen: 'Notifications',
  SettingsScreen: 'Settings',
  TermsScreen: 'Terms & Condition',
  HelpScreen: 'My Subscription Plan',
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
