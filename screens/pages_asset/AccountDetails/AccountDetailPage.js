import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../../config/colors';
import store from '../../../store/configureStore';
import HistoryData from './HistoryData';
import { accountHistoryAdded } from '../../../store/accountHistory';
import { generateUniqueItemId, getAccountHistoryByAccountId} from '../../components/Utility';


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

function AccountDetailPage({navigation, route}) {
  const {accountId} = route.params;
  console.log(accountId)

  //usestate 要放在function裡面
  const [data, setData] = useState(getAccountHistoryByAccountId(accountId));


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(getAccountHistoryByAccountId(accountId))
  })

  

  const [inputName, setName] = useState('');
  const [inputVal, setVal] = useState(0);

  const handleClick = () => {
    //console.log(inputName)
    //console.log(inputVal)
    const newItem = {accountId:accountId, itemId: generateUniqueItemId(accountId), itemName:inputName, itemVal: inputVal}
    store.dispatch(accountHistoryAdded(newItem))
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.container}
        data={data}
        renderItem={({item}) => 
          <HistoryData
            eachdata={item}
            navigation={navigation}
          />
        }
        keyExtractor={(item) => item.itemId}
        //ItemSeparatorComponent={Separator}
      />
      <TextInput 
        placeholder="請輸入名稱"
        value={inputName}
        onChangeText={setName}
      />
      <TextInput 
        placeholder="請輸入數值"
        value={inputVal}
        keyboardType='numeric'
        onChangeText={setVal}
      />
      <button onClick={handleClick}>新增</button>

    </View>
  );
}
export default AccountDetailPage;