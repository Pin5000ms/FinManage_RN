import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import RowData from '../components/RowData';

import DraggableFlatList , {ScaleDecorator,} from "react-native-draggable-flatlist"


const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,

    },
    header:{
      fontSize: 40,
      textAlign: 'center',
      color: colors._3,
      fontWeight: 'bold',
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


function HomePage({navigation}) {

  
  const [data,setData] = useState(store.getState());


  const unsubscribe = store.subscribe(() => {
    setData(store.getState())
  })

  const totalValue = data.reduce((sum, next) => {
    return sum + parseInt(next.value)
  }, 0)

  const renderItem = ({item, drag, isActive}) =>
  {
    return(
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <Text style = {styles.header}>Total Balance</Text>
      <Text style = {styles.header}>$ {totalValue}</Text>
      <DraggableFlatList 
        data={data}
        /*使用一個自定義的元件，將item和navigation傳入 */
        renderItem={
          ({item, drag, isActive}) => 
            <RowData
              curitem={item}
              navigation={navigation}
              drag = {drag}
              isActive = {isActive}
            />
        }
          /*告訴RN 每個item的辨別項是 叫做key (預設是id)*/
          keyExtractor={(item) => item.key}
          onDragEnd={({ data }) => setData(data)}
          containerStyle={{ flex : 1 }}
          // ItemSeparatorComponent ={
          //    <View style = {styles.separatorLine}></View>
          // }
      />
      
      <TouchableOpacity style={styles.add} onPress={() => {navigation.navigate('Add'); unsubscribe();}}>
            <Icon name = "plus" color ={colors._1} size={30}/>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;