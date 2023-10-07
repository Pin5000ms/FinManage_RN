import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../config/colors';

import { Swipeable } from 'react-native-gesture-handler';
import { SwitchIconSrc } from './SwitchIconSrc';
import { Animated } from 'react-native';
import { DeleteAccount } from './Utility';

const styles = StyleSheet.create({
    /*List中每個item的樣式 */
    container: {
      /*控制圖示及文字是以水平方式排列*/
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors._1,
      /*item中的物件與邊緣的間隔 */
      padding: 20,
      /*每個item的上下間隔 */
      marginVertical: 6,
      marginHorizontal: 10,
      borderRadius: 10,
      shadowColor: colors.black,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,//每張卡片下要有陰影

    },
    deleteBox: {
        flex:1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    editBox: {
        flex:1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    itemText: {
        fontSize: 20,
        color: colors._2,
      },
    icon: {
      /*圖示大小*/
      width: 50,
      height: 50,
      /*圖示右側與文字的間隔*/
      marginRight : 20,
      /*圓形圖示*/
      borderRadius : 10,
    },


    });


/*自定義元件，開頭必須大寫 */
export default function RowData ({curitem, navigation}) {
    //右滑動作
    const swipeRight = (progress, dragX) =>{

        const scale = dragX.interpolate({
            inputRange: [-500, -100, 0, 100, 500],
            outputRange: [1, 1, 0.2, 1, 1],//大於100或小於-100都設為1
        });

        //右滑動作產生控件
        return (
            <>
                <Animated.View style ={ {transform:[{scale:scale}]}}>
                    <TouchableOpacity style = {styles.deleteBox} onPress={()=> DeleteAccount(curitem.key)}>
                        <Icon name = "trash" size={25} color ={colors._2} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style ={ {transform:[{scale:scale}]}}>
                    <TouchableOpacity style = {styles.editBox} onPress={() => navigation.navigate('Edit', 
                    {
                        Key: curitem.key, 
                        Name : curitem.name, 
                        Val : curitem.value, 
                        Type: curitem.type, 
                        Amount: curitem.amount, 
                        UnitVal: curitem.unitValue})}>
                        <Icon name = "edit" size={25} color ={colors._2} />
                    </TouchableOpacity> 
                </Animated.View>
            </>
        )
    }
    return (
            <Swipeable renderLeftActions={swipeRight} rightThreshold={0.7} friction={1.5}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => 
                        navigation.navigate('Edit', 
                           {Id: curitem.id, 
                            Name : curitem.name, 
                            Val : curitem.value, 
                            Type: curitem.type, 
                            Amount: curitem.amount, 
                            UnitVal: curitem.unitValue})
                        }>

                            <View flex= {3} style = {{flexDirection:'row', alignItems: 'center'}} >
                                <Image
                                    style={styles.icon}
                                    source={SwitchIconSrc(curitem.type)} //根據type選擇Icon
                                />
                                <View style={{flexDirection: 'column',alignItems:"flex-start"}}>
                                    <Text style={styles.itemText}> {curitem.name}  </Text>
                                    <Text style={styles.itemText}>$ {curitem.value} </Text>
                                </View>
                            </View>
                        </TouchableOpacity> 
                        {/* <View flex= {1} >
                            <TouchableOpacity onPress={() => navigation.navigate('Edit', {Key: curitem.key, Name : curitem.name, Val : curitem.value})}>
                                <Icon style={styles.editdelete} name = "edit"  size={25} color ={colors.shironeri} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> store.dispatch(accountDeleted(curitem.key))}>
                                <Icon style={styles.editdelete} name = "trash" size={25} color ={colors.shironeri} />
                            </TouchableOpacity>                        
                        </View> */}
                    </View>
                    
            </Swipeable>

    );
  };
