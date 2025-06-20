import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from './store';
import JobListScreen from './screens/JobListScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';
import { CoopleLogo } from './components/CoopleLogo';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const LogoTitle = ({ title }: { title: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'visible' }}>
    <CoopleLogo width={130} height={24} style={{ marginRight: 10 }} />
    <Text style={{ color: '#22223b', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
  </View>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Jobs') iconName = focused ? 'briefcase' : 'briefcase-outline';
          else if (route.name === 'Favourites') iconName = focused ? 'star' : 'star-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f50057',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
        tabBarStyle: { paddingBottom: 4, height: 90 },
        headerShown: true,
        headerTitle: () => <LogoTitle title={route.name} />,
        headerStyle: { backgroundColor: '#fff0f5', shadowColor: 'transparent' },
        headerTitleAlign: 'center',
        headerTintColor: '#f50057',
      })}
    >
      <Tab.Screen name="Jobs" component={JobListScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
            <RootStack.Screen name="JobDetails" component={JobDetailsScreen} options={{
              headerShown: true,
              headerTitle: () => <LogoTitle title="Job Details" />,
              headerStyle: { backgroundColor: '#fff0f5', shadowColor: 'transparent' },
              headerTitleAlign: 'center',
              headerTintColor: '#f50057',
            }} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}