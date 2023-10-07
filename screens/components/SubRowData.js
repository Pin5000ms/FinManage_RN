import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../config/colors';

import { Swipeable } from 'react-native-gesture-handler';
import { SwitchIconSrc } from './SwitchIconSrc';

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


export default function SubRowData ({curitem, navigation}) {
    return (
        <View style={styles.container}>
        <TouchableOpacity>

            <View flex= {3} style = {{flexDirection:'row', alignItems: 'center'}} >
                <View style={{flexDirection: 'column',alignItems:"flex-start"}}>
                    <Text style={styles.itemText}>$ {curitem.value}  </Text>
                    <Text style={styles.itemText}>{curitem.timeStamp} </Text>
                </View>
            </View>
        </TouchableOpacity> 
    </View>

    );
};