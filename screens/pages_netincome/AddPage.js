import { View, Text, TextInput, TouchableOpacity } from "react-native"
import AddEditStyles from "../components/Styles" 
import { posIncomeAdded, negIncomeAdded } from "../../store/incomes"
import { useState } from "react";
import store from "../../store/configureStore";


function AddPage({route, navigation}){
    const {type} = route.params;

    const [inputText, setText] = useState('');
    const [inputValue, setVal] = useState(0);
    const handleValChange = (value) => {
        var newValue = parseFloat(value)
        if(value === ''){
          newValue = 0;
        }
        setVal(newValue);
    };
    return(
        <View>
            <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
                <View style = {{flexDirection:'row', alignItems: 'center'}}>
                <TextInput flex = {1}
                        style={AddEditStyles.textInput}
                        onChangeText={setText}
                        placeholder="請輸入名稱"
                    />
                </View>
            
                <View style = {{flexDirection:'row', alignItems: 'center'}}>
                    <TextInput flex = {1}
                        style={AddEditStyles.textInput}
                        onChangeText={handleValChange}  
                        placeholder="總價值"
                        keyboardType="numeric"
                        value={inputValue.toString()}
                    />
                </View>
            </View>
            <TouchableOpacity style={AddEditStyles.button} onPress = {() => {
                    type == 'pos'? 
                    store.dispatch(posIncomeAdded({name: inputText, value: inputValue})):
                    store.dispatch(negIncomeAdded({name: inputText, value: inputValue}))
                    ,navigation.navigate('NetIncomePage') }  }>
                <Text style={AddEditStyles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
                navigation.navigate('NetIncomePage') }  }>
                <Text style={AddEditStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}
export default AddPage;