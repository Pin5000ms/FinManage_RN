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


function AssetPage({navigation}) {

  
  const [data,setData] = useState(store.getState().accounts);


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(store.getState().accounts)
  })



  const totalValue = data.reduce((sum, next) => {
    return sum + parseInt(next.value)
  }, 0)

  return (

    <View style={styles.container}>

      {/* <View style={styles.headerContainer}>
        <Text >Asset</Text>
      </View> */}

      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View style={{flex:1, marginLeft:20, marginRight:20}}>
          <TouchableOpacity onPress={() => {navigation.navigate('PieChart');}}>
                <Icon name = "chart-pie" color ={colors._3} size={50}/>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:15,flex:3}}>
          <Text style = {styles.header1}>Total Balance :</Text>
          <Text style = {styles.header2}>$ {totalValue}</Text>
        </View>
        <View style={{flex:1}}>
        </View>
        <View style={{flex:1, marginRight:20}}>
          <TouchableOpacity onPress={() => {navigation.navigate('LineChart');}}>
                <Icon name = "chart-line" color ={colors._3} size={50}/>
          </TouchableOpacity>
        </View>
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
          /*告訴RN 每個item的辨別項是 叫做key (預設是id)*/
          keyExtractor={(item) => item.key}
          // ItemSeparatorComponent ={
          //    <View style = {styles.separatorLine}></View>
          // }
      />
      
      
      <TouchableOpacity style={styles.add} onPress={() => {navigation.navigate('Add');}}>
            <Icon name = "plus" color ={colors._1} size={30}/>
      </TouchableOpacity>

    </View>
      
    
  );
}

export default AssetPage;