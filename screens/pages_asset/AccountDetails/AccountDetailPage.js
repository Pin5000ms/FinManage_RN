import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../../config/colors';
import store from '../../../store/configureStore';
import HistoryData from './HistoryData';
import { accountHistoryAdded } from '../../../store/accountHistory';
import { generateUniqueItemId, getAccountHistoryByAccountId, getCurrentTimeStamp} from '../../components/Utility';




const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
    },
    separatorLine:{
      height : 1,
      backgroundColor: colors.black,
    }
});

const Separator = () => <View style={styles.separatorLine} />;


function InputArea({account}){
  const [inputName, setName] = useState('');
  const [inputVal, setVal] = useState(0);
  const [inputUnitVal, setUnitVal] = useState(0);
  const [inputAmount, setAmount] = useState(0);
  //console.log(account)
  
  if(account.type == 'bank' || account.type == 'cash'){
    const depositClick = () => {
      //console.log(inputName)
      //console.log(inputVal)
      
      let newItem = {
        accountId: account.id, 
        itemId: generateUniqueItemId(account.id), 
        itemName: inputName, 
        itemVal: inputVal, 
        type: account.type, 
        timeStamp: getCurrentTimeStamp()}
      
      store.dispatch(accountHistoryAdded(newItem))
    }
    const withdrawClick = () => {
      //console.log(inputName)
      //console.log(inputVal)
      
      let newItem = {
        accountId: account.id, 
        itemId: generateUniqueItemId(account.id), 
        itemName: inputName, 
        itemVal: -inputVal, 
        type: account.type, 
        timeStamp: getCurrentTimeStamp()}
      
      store.dispatch(accountHistoryAdded(newItem))
    }
    return(
      <>
        <TextInput 
          placeholder="請輸入描述"
          value={inputName}
          onChangeText={setName}
        />
        <TextInput 
          placeholder="請輸入數值"
          value={inputVal.toString()}
          keyboardType='numeric'
          onChangeText={setVal}
        />
        <View style={{flexDirection: 'row', alignItems:"flex-end"}}>
          <Button onPress={depositClick} title="存入"></Button>
          <Button onPress={withdrawClick} title="提/支出"></Button>
        </View>
      </>
    )
  }
  else{
    const addClick = () => {
      //console.log(inputName)
      //console.log(inputVal)
      
      let newItem = {
        accountId: account.id, 
        itemId: generateUniqueItemId(account.id), 
        itemName: inputName, 
        unitVal: inputUnitVal, amount: inputAmount, 
        type: account.type, 
        timeStamp: getCurrentTimeStamp()}
      
      store.dispatch(accountHistoryAdded(newItem))
    }
    return(
      <>
        <TextInput 
          placeholder="請輸入名稱"
          value={inputName}
          onChangeText={setName}
        />
        <View style={{flexDirection: 'row', alignItems:"flex-end"}}>
          <TextInput 
            placeholder="請輸入單位價值"
            value={inputUnitVal.toString()}
            keyboardType='numeric'
            onChangeText={setUnitVal}
          />
          <TextInput 
            placeholder="請輸入數量"
            value={inputAmount.toString()}
            keyboardType='numeric'
            onChangeText={setAmount}
          />
        </View>
        
        <View style={{flexDirection: 'row', alignItems:"flex-end"}}>
          <Button onPress={addClick} title="新增"></Button>
        </View>
      </>
    )
  }
  
}


function AccountDetailPage({navigation, route}) {
  const {account} = route.params;

  //console.log(accountId)

  //usestate 要放在function裡面
  const [historyList, setData] = useState(getAccountHistoryByAccountId(account.id));


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(getAccountHistoryByAccountId(account.id))
  })

  

  

  

  return (
    <View style={styles.container}>
      <FlatList style={styles.container}
        data={historyList}
        renderItem={({item}) => 
          <HistoryData
            record={item}
            navigation={navigation}
          />
        }
        keyExtractor={(item) => item.itemId}
        //ItemSeparatorComponent={Separator}
      />
      <View style={{alignItems:'flex-end'}}>
        <InputArea account={account} />
      </View>
      
      

    </View>
  );
}
export default AccountDetailPage;