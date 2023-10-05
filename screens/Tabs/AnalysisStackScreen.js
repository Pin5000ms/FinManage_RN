import { createStackNavigator } from '@react-navigation/stack';

import PieChartPage from '../pages_analysis/PieChartPage';
import LineChartPage from '../pages_analysis/LineChartPage';
import OverViewPage from '../pages_analysis/OverViewPage';

const Stack = createStackNavigator();

function AnalysisStackScreen() {
  return(
    <Stack.Navigator initialRouteName="OverView" screenOptions={{headerShown: false}}>
      <Stack.Screen name="OverView" component={OverViewPage} />
      <Stack.Screen name="PieChart" component={PieChartPage} />
      <Stack.Screen name="LineChart" component={LineChartPage} />
   </Stack.Navigator>
  );
}


export default AnalysisStackScreen;