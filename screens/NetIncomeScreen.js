import { StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useState } from 'react';
import store from '../store/configureStore';

const income = 
    [{key: 0, name:'薪水', value: 70000},
        {key: 1, name:'薪水', value: 70000},
        {key: 2, name:'薪水', value: 70000}];

const outcome = [{key: 0,name:'房租', value: 10000}]


const styles = StyleSheet.create({
    /*整個List的容器 */
    column: {
        flexDirection:'column', //避免下面的導覽列擋到
        flex:1,
    },
    row:{
        flexDirection:'row',
        flex:1,
    }
});

const renderItem = ({ item }) => (
    <View>
        <Text>{item.name}</Text>
        <Text>{item.value}</Text>
    </View>
    
  );
function NetIncomeScreen(){
    return(
        <View style = {styles.column}>
            <Text>NetIncome</Text>
            <View style = {styles.row}>
                <View style = {styles.column}>
                    <Text>
                        Income
                    </Text>
                    <FlatList style={styles.column}
                        data={income}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                    />
                </View>
                <View style = {styles.column}>
                    <Text>
                        Outcome
                    </Text>
                    <FlatList style={styles.column}
                        data={outcome}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                    />
                </View>
            </View>
        </View>
    )
}
export default NetIncomeScreen;