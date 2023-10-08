import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import RowData from '../components/RowData';
import { TextInput } from 'react-native-gesture-handler';
import { getAccountById, getLatestAsset } from '../components/Utility';

//import { DraggableFlatListProps } from "react-native-draggable-flatlist"


const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
        backgroundColor: colors._6
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
    separatorLineH:{
      height : 1,
      backgroundColor: colors._6,
    },
    separatorLineV:{
      width : 2,
      height:40,
      backgroundColor: colors._6,
    },
    button: {
      marginTop: 5,
      padding: 5,
      borderRadius: 5,
    },
    searchBox:{
      flexDirection:'row',
      alignItems:'center',
      borderRadius: 20,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 15,
      marginRight: 15,
      height:50,
      backgroundColor:colors.white

    }
  });


function AssetPage({navigation}) {

  //usestate 要放在function裡面
  const [data, setData] = useState(getLatestAsset());


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(getLatestAsset())
  })


  //總額
  const totalValue = getLatestAsset().reduce((sum, next) => {
    return sum + parseInt(next.value)
  }, 0)


  //切換總額的可見性
  const [showBalance, setShowBalance] = useState(true); // 預設為顯示餘額
  const toggleBalance = () => {
    setShowBalance(!showBalance); 
  };


  //搜尋功能
  const filterList = (searchWord) => {
    const filteredData = getLatestAsset().filter((item) => getAccountById(item.id).name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) );
    return filteredData
  }
  
  const [search, setSearch] = useState(null);

  useEffect(()=>{
    if(search !== null && search !== undefined && search !== ''){
      setData(filterList(search))
    }
    else{
      setData(getLatestAsset())
    }
  }, [search])


  return (

    
    <View style={styles.container}>

      {/* 資產總額 */}
      <View style={{marginTop:10, marginBottom:10, marginLeft:10, marginRight:10, backgroundColor:colors._1, borderRadius: 8}}>
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
          (<Text style={styles.header2}>{"$ " + totalValue.toLocaleString() + "  "}</Text>) : //toLocaleString()可以幫數字每3位加上,
          (<Text style={styles.header2}>********</Text>)}
      </View>
      

      {/* 搜尋欄 */}
      <View style={styles.searchBox}>
        <Icon name='search' style={{fontSize:25, color: colors._6, marginLeft:10}}></Icon>
        <TextInput style={{
          marginLeft:10, 
          fontSize:16, 
          width:Dimensions.get("window").width - 140,}}
          placeholder='搜尋帳戶'
          placeholderTextColor={colors._6}//單獨設定placeholder的顏色
          onChangeText={(val) => setSearch(val)}
        />
        <View style={styles.separatorLineV}></View>
        <TouchableOpacity onPress={{}}>
          <Icon name='filter' style={{fontSize:20, color: colors._6, marginLeft:10}}></Icon>
        </TouchableOpacity>
      </View>


      {/* 清單 */}
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
          //    <View style = {styles.separatorLineH}></View>
          // }
      />

    </View>
      
    
  );
}

export default AssetPage;