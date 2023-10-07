import { createStackNavigator } from '@react-navigation/stack';
import OverViewPage from '../pages_analysis/OverViewPage';

import Header from '../components/NavigationHeader';

const Stack = createStackNavigator();

function AnalysisStackScreen() {
  return(
    <Stack.Navigator initialRouteName="OverView" screenOptions={{headerShown: true}}>
      <Stack.Screen 
        name="OverView" 
        component={OverViewPage}
        options={{ header: (props) => <Header iconName={"chart-line"}  title="分析" {...props} />}} 
      />
      {/* <Stack.Screen name="PieChart" component={PieChartPage} />
      <Stack.Screen name="LineChart" component={LineChartPage} /> */}
   </Stack.Navigator>
  );
}


export default AnalysisStackScreen;