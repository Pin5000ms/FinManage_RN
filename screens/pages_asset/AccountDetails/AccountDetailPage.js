import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import colors from '../../../config/colors';
import store from '../../../store/configureStore';
import AccountDetailData from './AccountDetailData';


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

function AccountDetailPage({route, navigation}) {
    const {id} = route.params;
    console.log(id)
    console.log(store.getState().accountHistory)
    //usestate 要放在function裡面
    const [data, setData] = useState(store.getState().accountHistory.filter(item => item.accountId === id ));
  
  
    //若store發生改變，觸發setData事件
    const unsubscribe = store.subscribe(() => {
      setData(store.getState().accountHistory)
    })
  

  
    return (
  
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={data}
          /*使用一個自定義的元件RowData，將item和navigation傳入 */
          renderItem={({item}) => 
            <AccountDetailData
              accountDetail={item}
              navigation={navigation}
            />
          }
          keyExtractor={(item) => item.itemId}
          //ItemSeparatorComponent={Separator}
        />
        
      </View>
        
      
    );
  }
  
  export default AccountDetailPage;