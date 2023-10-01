import { Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../components/SwitchIconSrc';
import AddEditStyles from '../components/Styles';
import { AddAccount, generateUniqueKey } from '../components/Utility';


function SwitchNormalDetailEdit({navigation, type}){

  const [inputText, setText] = useState('');
  const [inputValue, setVal] = useState(0);
  const [inputAmount, setAmount] = useState(0);
  const [inputUnitVal, setValPerUnit] = useState(0);

  const handleValChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setVal(newValue);
  };

  const handleAmountChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setAmount(newValue);
    
    const totalValue = value * inputUnitVal;
    setVal(totalValue);
  };

  const handleValPerUnitChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setValPerUnit(newValue);

    const totalValue = inputAmount * value;
    setVal(totalValue);
  };

  //股票、外幣、黃金、虛擬貨幣，等有單位價值的東西
  if (type == 'stock' || type == 'foreign' || type == 'gold' || type == 'digit')
  {
    return (
      <>
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
              <Text>=</Text>
              <TextInput flex = {1}
                style={AddEditStyles.textInput}
                onChangeText={handleAmountChange}
                placeholder="數量"
                keyboardType="numeric"

              />
              <Text>x</Text>
              <TextInput flex = {1}
                style={AddEditStyles.textInput}
                onChangeText={handleValPerUnitChange}  
                placeholder="單價"
                keyboardType="numeric"
              />
        </View>
      </View>
      <TouchableOpacity style={AddEditStyles.button} onPress = 
          {() => 
            { 
              AddAccount(generateUniqueKey(), inputText, inputValue, inputAmount, inputUnitVal, type)
              navigation.navigate('AssetPage');
            }  
          }>
          <Text style={AddEditStyles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
        navigation.navigate('AssetPage') }  }>
        <Text style={AddEditStyles.buttonText}>Cancle</Text>
      </TouchableOpacity>
      </>
    )
    
  }
  //銀行存款、現金等沒有單位價值的東西
  else
  {
    return(
      <>
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
      <TouchableOpacity style={AddEditStyles.button} onPress = 
          {() => 
            { 
              AddAccount(generateUniqueKey(), inputText, inputValue, type)
              navigation.navigate('AssetPage');
            }  
          }>
          <Text style={AddEditStyles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
        navigation.navigate('AssetPage') }  }>
        <Text style={AddEditStyles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      </>
      
    )
  }

}


function AddPage ({navigation}) {

    const [inputType, setType] = useState('bank');
    function RadioButton( {label , type}) {
      return (
        <TouchableOpacity style={inputType === type ? AddEditStyles.selected : AddEditStyles.unselected} 
                 onPress = {  () => setType(type)  }>
                  <Text style={AddEditStyles.buttonText}>{label}</Text>
        </TouchableOpacity>
        
      );
    }
    
  
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View flex= {1}>
            <Image
                style={AddEditStyles.icon}
                source={SwitchIconSrc(inputType)} //根據type選擇Icon
              />
          </View>
          <View flex= {2} style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton label={'銀行'} type={'bank'}></RadioButton>
              <RadioButton label={'現金'} type={'cash'} ></RadioButton>
              <RadioButton label={'股票'} type={'stock'} ></RadioButton>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton label={'外幣'} type={'foreign'} ></RadioButton>
              <RadioButton label={'黃金'} type={'gold'} ></RadioButton>
              <RadioButton label={'數位'} type={'digit'} ></RadioButton>
            </View>
          </View>
        </View>

        <SwitchNormalDetailEdit navigation={navigation} type={inputType}/>
        
      </View>
    );
  
}

export default AddPage;