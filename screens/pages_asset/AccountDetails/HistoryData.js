import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
    /*List中每個item的樣式 */
    container: {
      /*控制圖示及文字是以水平方式排列*/
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      /*item中的物件與邊緣的間隔 */
      padding: 10,
      /*每個item的上下間隔 */
      marginVertical: 1,
      marginHorizontal: 10,
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
        fontSize: 15,
        color: colors._1,
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


export default function HistoryData ({eachdata, navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View flex= {3} style = {{flexDirection:'row', alignItems: 'center'}} >
                    <View style={{flexDirection: 'column',alignItems:"flex-start"}}>
                        <Text style={styles.itemText}>{eachdata.itemId}  </Text>
                        <Text style={styles.itemText}>{eachdata.itemName} </Text>
                        <Text style={styles.itemText}>{eachdata.itemVal} </Text>
                    </View>
                </View>
            </TouchableOpacity> 
        </View>

    );
};