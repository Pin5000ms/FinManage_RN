import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../config/colors';

import { Swipeable } from 'react-native-gesture-handler';
import { SwitchIconSrc } from './SwitchIconSrc';
import { Animated } from 'react-native';
import { DeleteAccount, getLatestAsset, getAccountById } from './Utility';

function getLastestDate(dateString) 
{
    const parts = dateString.split("-");
    // 提取 "-" 之前的部分
    const result = parts[0];
    return result;
}


const styles = StyleSheet.create({
    /*List中每個item的樣式 */
    container: {
      /*控制圖示及文字是以水平方式排列*/
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.white,
      /*item中的物件與邊緣的間隔 */
      padding: 20,
      /*每個item的上下間隔 */
      marginVertical: 6,
      marginHorizontal: 10,
      borderRadius: 10,
      //shadowColor: colors.black,
      //shadowOffset: {
      //  width: 5,
      //  height: 5,
      //},
      //shadowOpacity: 0.5,
      //shadowRadius: 10,
      //elevation: 5,//每張卡片下要有陰影
    },
    deleteBox: {
        flex:1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    editBox: {
        flex:1,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    itemContainer: {
        flexDirection:'column',
        width: Dimensions.get("window").width - 220
      },
    itemName: {
        fontSize: 16,
        color: colors.black,
      },
    itemValue: {
        fontSize: 20,
        fontWeight:'bold',
        color: colors._1,
    },
    itemTime: {
        alignSelf:'flex-end', //從下面開始排
        marginBottom: -10, //再往下10
        fontSize: 14,
        color: colors._6,
        width:80,
    },
    icon: {
      /*圖示大小*/
      width: 50,
      height: 50,
      /*圖示右側與文字的間隔*/
      marginRight : 20,
      /*圓形圖示*/
      borderRadius : 50,
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
                    <TouchableOpacity style = {styles.deleteBox} onPress={()=> DeleteAccount(curitem.id)}>
                        <Icon name = "trash" size={25} color ={colors._2} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style ={ {transform:[{scale:scale}]}}>
                    <TouchableOpacity style = {styles.editBox} onPress={() => navigation.navigate('Edit', 
                    {
                        Id: curitem.id, 
                        Name : getAccountById(curitem.id).name, 
                        Val : getAccountById(curitem.id).value, 
                        Type: getAccountById(curitem.id).type, 
                        Amount: getAccountById(curitem.id).amount, 
                        UnitVal: getAccountById(curitem.id).unitValue})}>
                        <Icon name = "edit" size={25} color ={colors._2} />
                    </TouchableOpacity> 
                </Animated.View>
            </>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style ={{flex:1}}
            onPress={() => navigation.navigate('Edit', 
            {Id: curitem.id, 
                Name : getAccountById(curitem.id).name, 
                Val : getAccountById(curitem.id).value, 
                Type: getAccountById(curitem.id).type, 
                Amount: getAccountById(curitem.id).amount, 
                UnitVal: getAccountById(curitem.id).unitValue})
            }>

                <View style = {{flexDirection:'row', alignItems: 'center', flex: 1}} >
                    <Image style={styles.icon}
                        source={SwitchIconSrc(getAccountById(curitem.id).type)} //根據type選擇Icon
                    />
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}> {getAccountById(curitem.id).name} </Text>
                        <Text style={styles.itemValue}>$ {curitem.value.toLocaleString()} </Text>
                    </View>
                    <Text style={styles.itemTime}>{getLastestDate(curitem.timeStamp)}</Text>
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

        // <Swipeable renderLeftActions={swipeRight} rightThreshold={0.7} friction={1.5}>
                
        // </Swipeable>
    );
  };
