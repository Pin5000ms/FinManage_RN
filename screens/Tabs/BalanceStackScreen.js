import { createStackNavigator } from '@react-navigation/stack';

import BalancePage from '../pages_netincome/BalancePage';
import AddPage from '../pages_netincome/AddPage';

const IncomeStack = createStackNavigator();

function BalanceStackScreen() {
  return(
    <IncomeStack.Navigator initialRouteName="BalancePage" screenOptions={{headerShown: true}}>
      <IncomeStack.Screen name="BalancePage" component={BalancePage} />        
      <IncomeStack.Screen name="Add" component={AddPage} />     
   </IncomeStack.Navigator>
  );
}


export default BalanceStackScreen;