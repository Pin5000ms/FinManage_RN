import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import SubRowData from '../components/SubRowData';


const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
    },
    header1:{
      fontSize: 20,
      textAlign: 'center',
      color: colors._3,
      fontWeight: 'bold',
    },
    header2:{
      fontSize: 30,
      textAlign: 'center',
      color: colors._3,
      fontWeight: 'bold',
    },

    headerContainer: {
      flex:0.1,
      backgroundColor: '#1E90FF',
      marginTop:StatusBar.currentHeight
    },
    add: {
        backgroundColor: colors._2,
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        position: 'absolute',
        right: 15,
        bottom: 15
    },
    separatorLine:{
      height : 1,
      backgroundColor: colors.black,
    }
    });

function AccountPage({route, navigation}) {
    const {Id} = route.params;
    const {Name} = route.params;
    const {Val} = route.params;
    const {Type} = route.params;
    const {Amount} = route.params;
    const {UnitVal} = route.params;

    console.log(store.getState().assetHistory)
    //usestate 要放在function裡面
    const [data, setData] = useState(store.getState().assetHistory);
  
  
    //若store發生改變，觸發setData事件
    const unsubscribe = store.subscribe(() => {
      setData(store.getState().assetHistory)
    })
  

  
    return (
  
      <View style={styles.container}>
  
        {/* <View style={styles.headerContainer}>
          <Text >Asset</Text>
        </View> */}
  
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View style={{marginBottom:15,flex:3}}>
            <Text>{Name}</Text>
          </View>
        </View>
        
        <FlatList style={styles.container}
          data={data}
          /*使用一個自定義的元件RowData，將item和navigation傳入 */
          renderItem={({item}) => 
            <SubRowData
              curitem={item}
              navigation={navigation}
            />
          }
          /*告訴RN 每個item的辨別項是 叫做key (預設是id)*/
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent ={
          //    <View style = {styles.separatorLine}></View>
          // }
        />
        
      </View>
        
      
    );
  }
  
  export default AccountPage;