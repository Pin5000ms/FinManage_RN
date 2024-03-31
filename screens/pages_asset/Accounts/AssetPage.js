import { Animated, StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react';
import colors from '../../../config/colors';
import store from '../../../store/configureStore';
import AccountData from './AccountData';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { getTotalSum } from '../../components/Utility';

//import { DraggableFlatListProps } from "react-native-draggable-flatlist"

//向上滾動時，設定scrollY (0~70)  => 經過clamp(超過70輸出70) => 內插輸出成 moveY (0~-70) 
//https://muhammetaydinn.medium.com/hide-header-when-scrolling-down-in-react-native-without-package-2bc74c35e23
const scrollY = new Animated.Value(0);
const diffClamp = Animated.diffClamp(scrollY, 0, 70);
const moveY = diffClamp.interpolate({
  inputRange: [ 0, 70],
  outputRange: [ 0, -70],
  extrapolate:'clamp'
});


const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
        backgroundColor: colors._6
    },
    listContainer: {
      flexDirection:'column', //避免下面的導覽列擋到
      flex : 1,
      backgroundColor: colors._6,
      //transform: [{translateY: moveY}], //透過moveY控制移動
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
      marginLeft: 15,
      marginRight: 15,
      width: Dimensions.get("window").width - 30,
      height: 50,
      backgroundColor:colors.white,
      zIndex:1, //auto hide when scroll up
      position: 'absolute', //auto hide when scroll up
      top:115, //auto hide when scroll up
      transform: [{translateY: moveY}], //透過moveY控制移動
    }
  });


function AssetPage({navigation}) {

  //usestate 要放在function裡面
  const [accountList, setData] = useState(store.getState().accounts);

  //總額
  const [totalValue, setTotalValue] = useState(getTotalSum());


  //若store發生改變，觸發setData事件
  const unsubscribe = store.subscribe(() => {
    setData(store.getState().accounts)
    setTotalValue(getTotalSum())
  })





  //切換總額的可見性
  const [showBalance, setShowBalance] = useState(true); // 預設為顯示餘額
  const toggleBalance = () => {
    setShowBalance(!showBalance); 
  };


  //搜尋功能
  const filterList = (searchWord) => {
    const filteredData = store.getState().accounts.filter((item) => item.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) );
    return filteredData
  }

  const [search, setSearch] = useState(null);

  useEffect(()=>{
    if(search !== null && search !== undefined && search !== ''){
      setData(filterList(search))
    }
    else{
      setData(store.getState().accounts)
    }
  }, [search])

  


  return (

    <View style={styles.container}>
      {/* 資產總額 */}
      <View style={{marginTop:10, marginBottom: 10, marginLeft:10, marginRight:10, backgroundColor:colors._1, borderRadius: 8, zIndex:2}}>
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
          (<Text style={styles.header2}>{"$ " + totalValue.toLocaleString() + "  "}</Text>) : //toLocaleString()可以幫數字每3位加上逗號
          (<Text style={styles.header2}>********</Text>)}
      </View>

      {/* 搜尋欄 宣告成Animated.View, transform才有用*/}
      <Animated.View style={styles.searchBox}>
        <Icon name='search' style={{fontSize:25, color: colors._6, marginLeft:10}}></Icon>
        <TextInput style={{
          marginLeft:10, 
          fontSize:16, 
          width:Dimensions.get("window").width - 120,}}
          placeholder='搜尋帳戶'
          placeholderTextColor={colors._6}//單獨設定placeholder的顏色
          onChangeText={(val) => setSearch(val)}
        />
        <View style={styles.separatorLineV}></View>
        <TouchableOpacity onPress={{}}>
          <Icon name='filter' style={{fontSize:20, color: colors._6, marginLeft:10}}></Icon>
        </TouchableOpacity>
      </Animated.View>
      

      {/* auto hide when scroll up */}
      <ScrollView onScroll={e => {
          if(e.nativeEvent.contentOffset.y > 0){ //避免回彈效果造成diffClamp值增加
            scrollY.setValue(e.nativeEvent.contentOffset.y)
          }
        }}
      >
        
            {/** This View For AppBar Because zIndex 非常重要*/}
            <View style={{height: 50}}/>

            {/* 清單 */}
            <FlatList style={{marginTop:10}}
                data={accountList}
                /*使用一個自定義的元件AccountData，將item和navigation傳入 */
                renderItem={({item}) => 
                  <AccountData
                    account={item}
                    navigation={navigation}
                  />
                }
                /*告訴RN 每個item的辨別項是 叫做id (預設是id)*/
                keyExtractor={(item) => item.id}
                scrollEnabled={false}//FlatList要裝在ScrollView裡面，本身的滾動功能要停用才不會報錯
                // ItemSeparatorComponent ={
                //    <View style = {styles.separatorLineH}></View>
                // }
            />
        
      </ScrollView>

    </View>
      
    
  );
}

export default AssetPage;