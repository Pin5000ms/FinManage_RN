import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import store from '../store/configureStore';
import colors from '../config/colors';


const styles = StyleSheet.create({
    /*整個List的容器 */
    container_income:{
        backgroundColor: colors._1,
        flexDirection:'row',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container_outcome:{
        backgroundColor: colors._4,
        flexDirection:'row',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    seperater_vertical:{
        width:2,
        height:'100%',
        backgroundColor: colors.gray,
    },
    column: {
        flexDirection:'column',
        flex:1,
    },
    columnWithBackground: {
        flexDirection:'column',
        backgroundColor:colors.gray,
        flex:1,
    },
    row:{
        flexDirection:'row',
        flex:1,
    },
    add1: {
        backgroundColor: colors._1,
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        position: 'absolute',
        right: 15,
        bottom: 15
    },
    add2: {
        backgroundColor: colors._4,
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        position: 'absolute',
        right: 15,
        bottom: 15
    },
});

const renderItem_income = ({ item }) => (
    <View style = {styles.container_income}>
        <Text>{item.name}  </Text>
        <Text>$ {item.value}</Text>
    </View>
    
  );

const renderItem_outcome = ({ item }) => (
<View style = {styles.container_outcome}>
    <Text>{item.name}  </Text>
    <Text>$ {item.value}</Text>
</View>

);
function NetIncomeScreen(){
    const [income,setData1] = useState([{key: 0, name:'薪水', value: 84000}]);
    
    const [outcome,setData2] = useState([
        {key: 0,name:'房租', value: 10000}, 
        {key: 1,name:'生活費', value: 10000},
        {key: 2,name:'學貸', value: 3000}, 
        {key: 3,name:'家用', value: 6000},
        {key: 4,name:'手機', value: 1000},
    ]);
    const totalIncome = income.reduce((sum, next) => {
        return sum + parseInt(next.value)
      }, 0)
    const totalOutcome = outcome.reduce((sum, next) => {
    return sum + parseInt(next.value)
    }, 0)
    return(
        <View style = {styles.column}>
            <Text>淨收入 =  ${totalIncome} - ${totalOutcome} = ${totalIncome - totalOutcome}</Text>
            <View style = {styles.row}>
                <View style = {styles.column}>
                    <Text>
                        Income  $ {totalIncome}
                    </Text>
                    <FlatList style={styles.column}
                        data={income}
                        renderItem={renderItem_income}
                        keyExtractor={(item) => item.key}
                    />
                    <TouchableOpacity style={styles.add1}>
                            <Icon name = "plus" color ={colors._2} size={30}/>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.seperater_vertical}></View> */}
                <View style = {styles.column}>
                    <Text>
                        Outcome  $ {totalOutcome}
                    </Text>
                    <FlatList style={styles.column}
                        data={outcome}
                        renderItem={renderItem_outcome}
                        keyExtractor={(item) => item.key}
                    />
                    <TouchableOpacity style={styles.add2}>
                            <Icon name = "plus" color ={colors._2} size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default NetIncomeScreen;