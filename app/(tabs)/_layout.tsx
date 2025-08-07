import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from './TaskScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Tab.Navigator>
          <Tab.Screen name="Tasks" component={TaskScreen} />
          {/* other tabs if needed */}
        </Tab.Navigator>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}