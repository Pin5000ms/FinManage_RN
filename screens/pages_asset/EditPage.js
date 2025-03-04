import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../components/SwitchIconSrc';
import AddEditStyles from '../components/Styles';
import { EditAccount, DeleteAccount } from '../components/Utility';




function SwitchNormalDetailEdit({navigation, type, Id, p1, p2, p3, p4}){

  const [inputText, setText] = useState(p1);
  const [inputValue, setVal] = useState(p2);

  let defaultAmount = 0;
  let defaultUnitVal = 0;
  if(p3 !== undefined){
    defaultAmount = p3;
  }
  if(p4 !== undefined){
    defaultUnitVal = p4;
  }
  

  const [inputAmount, setAmount] = useState(defaultAmount);
  const [inputUnitVal, setValPerUnit] = useState(defaultUnitVal);

  

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
                defaultValue={p1}
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
                defaultValue={defaultAmount.toString()}
              />
              <Text>x</Text>
              <TextInput flex = {1}
                style={AddEditStyles.textInput}
                onChangeText={handleValPerUnitChange}  
                placeholder="單價"
                keyboardType="numeric"
                defaultValue={defaultUnitVal.toString()}

              />
        </View>
      </View>
      <TouchableOpacity style={AddEditStyles.button} onPress = //Save
          {() => 
            { 
              EditAccount(Id, inputText, inputValue, type, inputAmount, inputUnitVal)
              navigation.navigate('AssetPage');
            }  
          }>
          <Text style={AddEditStyles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AddEditStyles.button} onPress = //Delete
        {() => 
          { 
            DeleteAccount(Id)
            navigation.navigate('AssetPage');
          }
        }>
        <Text style={AddEditStyles.buttonText}>Delete</Text>
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
                defaultValue={p1}
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
              EditAccount(Id, inputText, inputValue, type)
              navigation.navigate('AssetPage');
            }  
          }>
          <Text style={AddEditStyles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AddEditStyles.button} onPress = 
        {() => 
          { 
            DeleteAccount(Id)
            navigation.navigate('AssetPage');
          }  
        }>
        <Text style={AddEditStyles.buttonText}>Delete</Text>
      </TouchableOpacity>
      </>
      
    )
  }

}



function EditPage ({route, navigation}) {
    const {Id} = route.params;
    const {Name} = route.params;
    const {Val} = route.params;
    const {Type} = route.params;
    const {Amount} = route.params;
    const {UnitVal} = route.params;
  
    const [inputType, setType] = useState(Type);
    function RadioButton(props) {
      return (
          <TouchableOpacity style={inputType === props.type ? AddEditStyles.selected : AddEditStyles.unselected} 
                 onPress = {  () => setType(props.type)  }>
                  <Text style={AddEditStyles.buttonText}>{props.label}</Text>
          </TouchableOpacity>
      );
    }

    
    return (
      <View flex= {1}>
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

        <SwitchNormalDetailEdit navigation={navigation} type={inputType} Id={Id} p1={Name} p2={Val} p3={Amount} p4={UnitVal}/>
        
      </View>
    );
  
}

export default EditPage;