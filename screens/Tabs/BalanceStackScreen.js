import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/NavigationHeader';
import BalancePage from '../pages_netincome/BalancePage';
import AddPage from '../pages_netincome/AddPage';

const Stack = createStackNavigator();

function BalanceStackScreen() {
  return(
    <Stack.Navigator initialRouteName="BalancePage" screenOptions={{headerShown: true}}>
      <Stack.Screen 
        name="BalancePage" 
        component={BalancePage} 
        options={{ header: (props) => <Header iconName={"table"}  title="每月收支"  {...props}/>}}
      />        
      <Stack.Screen name="Add" component={AddPage} />     
   </Stack.Navigator>
  );
}


export default BalanceStackScreen;