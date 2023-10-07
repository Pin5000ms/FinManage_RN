import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import RowData from '../components/RowData';

//import { DraggableFlatListProps } from "react-native-draggable-flatlist"


const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
    },
    header1:{
      fontSize: 20,
      textAlign: 'center',
      color: colors._2,
      fontWeight: 'bold',
    },
    header2:{
      fontSize: 30,
      textAlign: 'center',
      color: colors._2,
      fontWeight: 'bold',
      marginBottom: 10
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
    },
    container2: {
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      marginBottom:15,
      flex:3
    },
    button: {
      marginTop: 5,
      padding: 5,
      borderRadius: 5,
    },
  });


function AssetPage({navigation}) {

  //usestate 要放在function裡面
  const [data,setData] = useState(store.getState().accounts);


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(store.getState().accounts)
  })



  const totalValue = data.reduce((sum, next) => {
    return sum + parseInt(next.value)
  }, 0)


  const [showBalance, setShowBalance] = useState(true); // 預設為顯示餘額
  const toggleBalance = () => {
    setShowBalance(!showBalance); // 切換餘額的可見性
  };

  return (

    <View style={styles.container}>

      {/* <View style={styles.headerContainer}>
        <Text >Asset</Text>
      </View> */}

      
      <View style={{marginTop:15, marginBottom:15, marginLeft:10, marginRight:10, backgroundColor:colors._1, borderRadius: 8}}>
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
          <Text style = {styles.header1}>資產總覽 </Text>
          <TouchableOpacity onPress={toggleBalance} style={styles.button}>
            <Icon name={showBalance ? 'eye' : 'eye-slash'} // 根據 showBalance 切換Icon
              size={25}
              color= {colors._2}>
            </Icon>
          </TouchableOpacity>
        </View>

        {showBalance ? 
          (<Text style={styles.header2}>{totalValue.toLocaleString()}</Text>) : //toLocaleString()可以幫數字每3位加上,
          (<Text style={styles.header2}>********</Text>)}
      </View>
        
      
      
      <FlatList style={styles.container}
          data={data}
          /*使用一個自定義的元件RowData，將item和navigation傳入 */
          renderItem={({item}) => 
            <RowData
              curitem={item}
              navigation={navigation}
            />
          }
          /*告訴RN 每個item的辨別項是 叫做id (預設是id)*/
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent ={
          //    <View style = {styles.separatorLine}></View>
          // }
      />
    </View>
      
    
  );
}

export default AssetPage;