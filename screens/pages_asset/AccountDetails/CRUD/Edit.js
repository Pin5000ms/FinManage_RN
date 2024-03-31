import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../../../components/SwitchIconSrc';
import AddEditStyles from '../../../components/Styles';
import { accountHistoryEdited } from '../../../../store/accountHistory';
import store from '../../../../store/configureStore';
import { AssetTag, EditAccountTag, AccountDetailTag, EditRecordTag} from '../../../components/NavigationTag';


function EditArea({navigation, record}){
    const accountId = record.accountId
    const id = record.itemId
    const name = record.itemName
    const value = record.itemVal
    const amount = record.amount
    const unit = record.unitVal
    const type = record.type
    const time = record.timeStamp

    //const [inputType, setType] = useState(type);
    const [inputName, setName] = useState(name);
    const [inputVal, setVal] = useState(value);

    const [inputAmount, setAmount] = useState(amount);
    const [inputUnit, setUnit] = useState(unit);

    if(type === 'bank' || type === 'cash')
    {
        return(
            <View style={{flexDirection: 'column', alignItems:'center'}}>
                <TextInput
                  style={AddEditStyles.textInput}
                  onChangeText={setName}
                  placeholder="請輸入名稱"
                  value= {inputName}
                />

                <TextInput 
                    placeholder="請輸入價值"
                    value={inputVal.toString()}
                    keyboardType='numeric'
                    onChangeText={setVal}
                />

                {/* 儲存 */}
                <TouchableOpacity style={AddEditStyles.button} onPress = 
                    {() => 
                        { 
                            //
                            const editItem = {accountId: accountId, itemId: id, itemName: inputName, itemVal: inputVal, timeStamp: time};
                            store.dispatch(accountHistoryEdited(editItem));
                            navigation.goBack()
                        }  
                    }>
                    <Text style={AddEditStyles.buttonText}>Save</Text>
                </TouchableOpacity>

                {/* 取消 */}
                <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
                    navigation.goBack() }  }>
                    <Text style={AddEditStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else
    {
        return(
            <View style={{flexDirection: 'column', alignItems:'center'}}>
                <TextInput
                  style={AddEditStyles.textInput}
                  onChangeText={setName}
                  placeholder="請輸入名稱"
                  value= {inputName}
                />

                <View style={{flexDirection: 'row'}}>
                    

                    <TextInput 
                        placeholder="請輸入單位價值"
                        value={inputUnit.toString()}
                        keyboardType='numeric'
                        onChangeText={setUnit}
                    />

                    <Text> x </Text>

                    <TextInput 
                        placeholder="請輸入數量"
                        value={inputAmount.toString()}
                        keyboardType='numeric'
                        onChangeText={setAmount}
                    />

                </View>

                

                {/* 儲存 */}
                <TouchableOpacity style={AddEditStyles.button} onPress = 
                    {() => 
                        { 
                            //
                            const editItem = {accountId: accountId, itemId: id, itemName: inputName, unitVal: inputUnit, amount: inputAmount ,timeStamp: time} ;
                            store.dispatch(accountHistoryEdited(editItem))
                            navigation.goBack()
                        }  
                    }>
                    <Text style={AddEditStyles.buttonText}>Save</Text>
                </TouchableOpacity>

                {/* 取消 */}
                <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
                    navigation.goBack() }  }>
                    <Text style={AddEditStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

}


function EditRecord({navigation, route}){
    const {record} = route.params;

    return(
        <EditArea navigation={navigation} record={record}/>
    )
}


export default EditRecord;