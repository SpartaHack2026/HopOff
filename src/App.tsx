import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SetupMenuScreen from './screens/SetUpMenuScreen';
import ChooseAppScreen from './screens/AppChoiceScreen';
import OpeningPageScreen from './screens/OpeningPageScreen';

// TEMP: later replace with AsyncStorage/DB
async function loadUserHobbiesOrTasks(): Promise<string[]> {
  // return []  -> first-time user
  // return ['gym'] -> returning user
  return [];
}

export type RootStackParamList = {
  SetupMenu: undefined;
  ChooseApp: undefined;
  OpeningPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [hasSetupData, setHasSetupData] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await loadUserHobbiesOrTasks();
      setHasSetupData(list.length > 0);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  // Decide which flow starts first
  const initialRouteName: keyof RootStackParamList = hasSetupData
    ? 'OpeningPage'
    : 'SetupMenu';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SetupMenu" component={SetupMenuScreen} />
          <Stack.Screen name="ChooseApp" component={ChooseAppScreen} />
          <Stack.Screen name="OpeningPage" component={OpeningPageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
