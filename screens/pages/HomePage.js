import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import colors from '../../config/colors';


import store from '../../redux/store'
import { accountDeleted } from '../../redux/actionCreator';





const styles = StyleSheet.create({
    /*整個List的容器 */
    container: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex : 1,
    },
    /*List中每個item的樣式 */
    item: {
      /*控制圖示及文字是以水平方式排列*/
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.kurenai,
      /*item中的物件與邊緣的間隔 */
      padding: 20,
      /*每個item的上下間隔 */
      marginVertical: 6,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    itemText: {
      fontSize: 20,
      color: colors.yamabuki,
    },
    icon: {
      /*圖示大小*/
      width: 50,
      height: 50,
      /*圖示右側與文字的間隔*/
      marginRight : 20,
      /*圓形圖示*/
      borderRadius : 100,
    },
    header:{
      fontSize: 40,
      textAlign: 'center',
      color: colors.uguisucha,
      fontWeight: 'bold',
    },
    editButton: {
      backgroundColor: colors.shironeri,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    editButtonText: {
      textAlign: 'center',
      color: colors.uguisucha,
      fontWeight: 'bold',
    },
    editdelete: {
        paddingVertical: 10,
      },
    add: {
        backgroundColor: colors.shironeri,
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        position: 'absolute',
        right: 15,
        bottom: 15
    },
    textInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
    });

/*自定義元件，開頭必須大寫 */
function Account ({curitem, navigation}) {
    return (
        <View style={styles.item}>

          <View flex= {3} style = {{flexDirection:'row', alignItems: 'center'}} >
            <Image
              style={styles.icon}
              source={curitem.icon}
            />
            <View style={{flexDirection: 'column',alignItems:"flex-start"}}>
              <Text style={styles.itemText}> {curitem.name}  </Text>
              <Text style={styles.itemText}>$ {curitem.value} </Text>
            </View>
          </View>

          <View flex= {1} >
            <TouchableOpacity onPress={() => navigation.navigate('Edit', {Key: curitem.key, Name : curitem.name, Val : curitem.value})}>
                <Icon style={styles.editdelete} name = "edit"  size={25} color ={colors.shironeri} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> store.dispatch(accountDeleted(curitem.key))}>
                <Icon style={styles.editdelete} name = "trash" size={25} color ={colors.shironeri} />
            </TouchableOpacity>
            
          </View>

        </View>
    );
  };

function HomePage({navigation}) {

  
  const [data,setData] = useState(store.getState());


  const unsubscribe = store.subscribe(() => {
    setData(store.getState())
  })

  const totalValue = data.reduce((sum, next) => {
    return sum + parseInt(next.value)
  }, 0)

  return (
    <View style={styles.container}>
      <Text style = {styles.header}>Total Balance</Text>
      <Text style = {styles.header}>$ {totalValue}</Text>
      
      <FlatList style={styles.container}
          data={data}
          /*使用一個自定義的元件，將item和navigation傳入 */
          renderItem={({item}) => 
          <Account
            curitem={item}
            navigation={navigation}
          />}
          /*告訴RN 每個item的辨別項是 叫做key (預設是id)*/
          keyExtractor={(item) => item.key}
      />
      
      <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Add')}>
            <Icon  name = "plus" color ={colors.kurenai} size={30}/>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;