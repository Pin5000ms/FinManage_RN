import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store  from '../../store/configureStore';
import { accountAdded } from '../../store/account';


import { SwitchIconSrc } from '../components/SwitchIconSrc';



const styles = StyleSheet.create({
  textInput: {
    height: 50,
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    },
  Button: {
    backgroundColor: colors._2,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ButtonText: {
    textAlign: 'center',
    color: colors._3,
    fontWeight: 'bold',
  },

  selected: {
    backgroundColor: colors._1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  unselected: {
    backgroundColor: colors._2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  icon: {
    /*圖示大小*/
    width: 100,
    height: 100,
    /*圖示右側與文字的間隔*/
    marginLeft : 10,
    marginRight : 10,
    /*圓形圖示*/
    borderRadius : 10
  },


});

function SwitchNormalDetailEdit({navigation, id}){

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

  if (id == 'stock' || id == 'foreign' || id == 'gold' || id == 'digit')
  {
    return (
      <>
      <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
          <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={setText}
                placeholder="請輸入名稱"
              />
        </View>
      
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValChange}  
                placeholder="總價值"
                keyboardType="numeric"
                value={inputValue.toString()}
              />
              <Text>=</Text>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleAmountChange}
                placeholder="數量"
                keyboardType="numeric"

              />
              <Text>x</Text>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValPerUnitChange}  
                placeholder="單價"
                keyboardType="numeric"

              />
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountAdded({name: inputText, value: inputValue, type: id, amount: inputAmount, unitValue: inputUnitVal})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
        navigation.navigate('HomeStack') }  }>
        <Text style={styles.ButtonText}>Cancle</Text>
      </TouchableOpacity>
      </>
    )
    
  }
  else
  {
    return(
      <>
      <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
          <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={setText}
                placeholder="請輸入名稱"
              />
        </View>
      
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValChange}  
                placeholder="總價值"
                keyboardType="numeric"
                value={inputValue.toString()}
              />
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountAdded({name: inputText, value: inputValue, type: id})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
        navigation.navigate('HomeStack') }  }>
        <Text style={styles.ButtonText}>Cancle</Text>
      </TouchableOpacity>
      </>
      
    )
  }

}


function AddPage ({navigation}) {





    const [inputType, setType] = useState('bank');
    function RadioButton( {label , id}) {
      return (
        <TouchableOpacity style={inputType === id ? styles.selected : styles.unselected} 
                 onPress = {  () => setType(id)  }>
                  <Text style={styles.ButtonText}>{label}</Text>
        </TouchableOpacity>
        
      );
    }
    
  
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View flex= {1}>
            <Image
                style={styles.icon}
                source={SwitchIconSrc(inputType)} //根據type選擇Icon
              />
          </View>
          <View flex= {3} style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton label={'銀行'} id={'bank'}></RadioButton>
              <RadioButton label={'現金'} id={'cash'} ></RadioButton>
              <RadioButton label={'股票'} id={'stock'} ></RadioButton>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton label={'外幣'} id={'foreign'} ></RadioButton>
              <RadioButton label={'黃金'} id={'gold'} ></RadioButton>
              <RadioButton label={'數位'} id={'digit'} ></RadioButton>
            </View>
          </View>
        </View>

        <SwitchNormalDetailEdit navigation={navigation} id={inputType}/>
        
      </View>
    );
  
}

export default AddPage;