import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import colors from '../../../config/colors';
import { AssetTag, EditAccountTag, AccountDetailTag, EditRecordTag } from '../../components/NavigationTag';

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

function DisplayArea({record})
{
    if(record.type === 'bank' || record.type === 'cash')
    {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemText}>{record.itemName} </Text>
                <Text style={styles.itemText}>{record.itemVal} </Text>
            </View>
        )
    }
    else
    {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemText}>{record.itemName} </Text>
                <Text style={styles.itemText}>{record.unitVal*record.amount} </Text>
                <Text style={styles.itemText}> = </Text>
                <Text style={styles.itemText}>{record.unitVal} </Text>
                <Text style={styles.itemText}> x </Text>
                <Text style={styles.itemText}>{record.amount} </Text>
            </View>
        )
    }
}


export default function HistoryData ({record, navigation}) {
    const toEditPage = ()=> navigation.navigate(EditRecordTag,{record})
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toEditPage}>
                <View flex= {3} style = {{flexDirection:'row', alignItems: 'center'}} >
                    <View style={{flexDirection: 'column',alignItems:"flex-start"}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.itemText}>{record.accountId}</Text>
                            <Text style={styles.itemText}> : </Text>
                            <Text style={styles.itemText}>{record.itemId}  </Text>
                        </View>
                        
                        <DisplayArea record={record}/>
                        <Text style={styles.itemText}>{record.timeStamp} </Text>
                    </View>
                </View>
            </TouchableOpacity> 
        </View>

    );
};