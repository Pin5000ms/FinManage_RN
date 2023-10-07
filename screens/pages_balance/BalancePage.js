import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import store from '../../store/configureStore';
import colors from '../../config/colors';
import { posIncomeDeleted, negIncomeDeleted } from '../../store/incomes';


const styles = StyleSheet.create({
    /*整個List的容器 */
    container_income_header:{
        backgroundColor: colors.sora,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginVertical: 6,

        borderRadius: 5,
    },
    container_outcome_header:{
        backgroundColor: colors.pink,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginVertical: 6,
        borderRadius: 5,
    },


    container_income_list:{
        backgroundColor: colors._1,
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container_outcome_list:{
        backgroundColor: colors._4,
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container_income:{
        backgroundColor: colors.sora,
        flexDirection:'column',
        alignItems:'center',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container_outcome:{
        backgroundColor: colors.pink,
        flexDirection:'column',
        alignItems:'center',
        flex:1,
        padding:10,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container_net:{
        backgroundColor: colors._3,
        flexDirection:'column',
        justifyContent:'center',
        marginVertical: 6,
        marginHorizontal: 10,
        padding:10,
        flex:1,
        borderRadius: 5,
    },
    container_sign:{
        flexDirection:'row',
        alignItems:'center',
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
    columnWithBackground1: {
        flexDirection:'column',
        backgroundColor:colors.sora,
        flex:1,
    },
    columnWithBackground2: {
        flexDirection:'column',
        backgroundColor:colors.pink,
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
    },
    add2: {
        backgroundColor: colors._4,
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
    },
});

const renderItem_income = ({item }) => (
    <View style = {styles.container_income_list}>
        <Text>{item.name}  </Text>
        <Text>$ {item.value}</Text>
        <View style={{ flexDirection:'row', flex:1 ,justifyContent: 'flex-end'}}>
            <TouchableOpacity  onPress={()=> {store.dispatch(posIncomeDeleted({id: item.id}))}}>
                <Icon name='window-close' color={colors._2} size={20}></Icon>
            </TouchableOpacity>
        </View>
    </View>
    
  );

const renderItem_outcome = ({ item }) => (
<View style = {styles.container_outcome_list}>
    <Text>{item.name}  </Text>
    <Text>$ {item.value}</Text>
    <View style={{ flexDirection:'row', flex:1 ,justifyContent: 'flex-end'}}>
            <TouchableOpacity  onPress={()=> {store.dispatch(negIncomeDeleted({id: item.id}))}}>
                <Icon name='window-close' color={colors._2} size={20}></Icon>
            </TouchableOpacity>
    </View>
</View>

);


function BalancePage({navigation}){
    const [income, setData1] = useState(store.getState().incomes.posIncomes);
    const unsubscribe1 = store.subscribe(() => {
        setData1(store.getState().incomes.posIncomes)
      })

    const [outcome, setData2] = useState(store.getState().incomes.negIncomes);
    const unsubscribe2 = store.subscribe(() => {
        setData2(store.getState().incomes.negIncomes)
    })

    const totalIncome = income.reduce((sum, next) => {
        return sum + parseInt(next.value)
      }, 0)
    const totalOutcome = outcome.reduce((sum, next) => {
    return sum + parseInt(next.value)
    }, 0)
    return(
        <View style = {styles.column}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.container_net}>
                    <Text style={{color:colors._2, fontSize:12}}>淨收入: </Text>
                    <Text style={{color:colors._2, fontSize:20}}>${totalIncome - totalOutcome}</Text>
                </View>
                <View style={styles.container_sign}>
                    <Text>=</Text>
                </View>
                <View style={styles.container_income}>
                    <Text style={{color:colors._2, fontSize:12}}>收入: </Text>
                    <Text style={{color:colors._2, fontSize:20}}>${totalIncome}</Text>
                </View>
                <View style={styles.container_sign}>
                    <Text>-</Text>
                </View>
                <View style={styles.container_outcome}>
                    <Text style={{color:colors._2, fontSize:12}}>支出: </Text>
                    <Text style={{color:colors._2, fontSize:20}}>${totalOutcome}</Text>
                </View>
            </View>
            <View style = {styles.row}>
                <View style = {styles.column}>
                    
                    <View style = {styles.columnWithBackground1}>
                        <FlatList style={styles.column}
                            data={income}
                            renderItem={renderItem_income}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={[styles.container_income_header]}>
                        <Text style={{color:colors._2, fontSize:25, flex:3}}>${totalIncome}</Text>
                        <TouchableOpacity style={styles.add1} onPress={() => {navigation.navigate('Add',{type:'pos'});}}>
                            <Icon name = "plus" color ={colors._2} size={30}/>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                {/* <View style={styles.seperater_vertical}></View> */}
                <View style = {styles.column}>
                    
                    <View style = {styles.columnWithBackground2}>
                        <FlatList style={styles.column}
                            data={outcome}
                            renderItem={renderItem_outcome}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={[styles.container_outcome_header]}>
                        <Text style={{color:colors._2, fontSize:25, flex:3}}>${totalOutcome}</Text>
                        <TouchableOpacity style={styles.add2} onPress={() => {navigation.navigate('Add',{type:'neg'});}}>
                            <Icon name = "plus" color ={colors._2} size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>               
            </View>
        </View>
    )
}
export default BalancePage;